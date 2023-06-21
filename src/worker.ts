import * as url from 'url'
import { Worker, isMainThread, parentPort } from 'worker_threads'

import dayjs from 'dayjs'
import {
  LineCode,
  ScheduleItem,
  StopCode,
  lines,
  stopScheduleApi,
} from 'mtr-kit'
import PromiseThrottle from 'promise-throttle'

import { convertTimeRecursive } from './utils/convertTimeRecursive.js'

export type Schedule = {
  currTime: string
  isDelay: boolean
  sysTime: string
  schedule: {
    up:
      | {
          plat: number
          dest: string
          time: string
        }[]
      | undefined
    down:
      | {
          plat: number
          dest: string
          time: string
        }[]
      | undefined
  }
}

export const scheduleMap = new Map<`${LineCode}-${StopCode}`, Schedule>()

if (isMainThread) {
  const worker = new Worker(url.fileURLToPath(import.meta.url))
  worker.on(
    'message',
    ({
      line,
      stop,
      ...schedule
    }: Schedule & { line: LineCode; stop: StopCode }) => {
      scheduleMap.set(`${line}-${stop}`, schedule)
    }
  )

  // eslint-disable-next-line no-console
  worker.on('error', err => console.error(err))
  // eslint-disable-next-line no-console
  worker.on('exit', code => console.log(`Worker exited with code ${code}.`))
} else {
  const threadMap = new Map<`${LineCode}-${StopCode}`, Schedule>()

  const formatScheduleItem = (items: ScheduleItem[]) =>
    items
      .filter(({ valid }) => valid === 'Y')
      .sort((a, b) => Number(a.seq) - Number(b.seq))
      .map(({ dest, plat, time }) => ({
        plat: Number(plat),
        dest,
        time,
      }))

  const getStopSchedules = async (line: LineCode, stop: StopCode) => {
    try {
      const response = await stopScheduleApi.get({ line, stop })

      if (response.status === 0) return null
      const { data, curr_time, isdelay, sys_time } = response
      const { UP, DOWN } = data[`${line}-${stop}`]

      return convertTimeRecursive(
        {
          currTime: curr_time,
          isDelay: isdelay !== 'N',
          sysTime: sys_time,
          schedule: {
            up: UP ? formatScheduleItem(UP) : UP,
            down: DOWN ? formatScheduleItem(DOWN) : DOWN,
          },
        },
        'YYYY-MM-DD HH:mm:ss'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      return null
    }
  }

  const getAndPost = async (line: LineCode, stop: StopCode) => {
    const schedule = await getStopSchedules(line, stop)
    if (schedule) {
      threadMap.set(`${line}-${stop}`, schedule)
      parentPort?.postMessage({
        line,
        stop: stop,
        ...schedule,
      })
    }
  }

  const loop = async (ignoreUndefined: boolean) => {
    const lineStops = lines
      .map(({ code, stops }) =>
        stops.map(stop => ({ line: code, stop: stop.code }))
      )
      .flat()
      .map(({ stop, line }) => {
        const lastSchedule = threadMap.get(`${line}-${stop}`)
        const allTime = [
          ...(lastSchedule?.schedule.down || []),
          ...(lastSchedule?.schedule.up || []),
        ]
          .map(({ time }) => dayjs(time))
          .sort((a, b) => (a.isSame(b) ? 0 : a.isBefore(b) ? -1 : 1))

        return { line, stop, closestTs: allTime[0] }
      })
      .sort((a, b) => {
        if (!a.closestTs) return 1
        if (!b.closestTs) return -1
        return a.closestTs?.isSame(b.closestTs) || a.closestTs === b.closestTs
          ? 0
          : a.closestTs?.isBefore(b.closestTs)
          ? -1
          : 1
      })
      .map(({ closestTs, ...rest }) => ({
        ...rest,
        closestTs: closestTs?.toISOString(),
      }))

    const promiseThrottle =
      new (PromiseThrottle as unknown as typeof PromiseThrottle.default)({
        requestsPerSecond: 2,
        promiseImplementation: Promise,
      })

    await Promise.all(
      (ignoreUndefined
        ? lineStops.filter(({ closestTs }) => closestTs)
        : lineStops
      ).map(({ stop, line }) =>
        promiseThrottle.add(getAndPost.bind(this, line, stop))
      )
    )
  }

  let counter = 0

  // eslint-disable-next-line no-constant-condition
  while (true) {
    counter++
    await loop(counter % 10 !== 0)
    if (counter >= 100) counter = 0
  }
}
