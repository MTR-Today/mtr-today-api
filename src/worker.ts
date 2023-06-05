import { Worker, isMainThread, parentPort } from 'worker_threads'
import * as url from 'url'
import {
  LineCode,
  ScheduleItem,
  StopCode,
  lines,
  stopScheduleApi,
} from 'mtr-kit'
import { flatten, splitEvery } from 'ramda'
import { convertTimeRecursive } from './utils/convertTimeRecursive'
import { sleep } from './utils/sleep'

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
  line: LineCode
  stop: StopCode
}

export const scheduleMap = new Map<`${LineCode}-${StopCode}`, Schedule>()

if (isMainThread) {
  const worker = new Worker(url.fileURLToPath(import.meta.url))
  worker.on('message', (msg: Schedule) => {
    scheduleMap.set(`${msg.line}-${msg.stop}`, msg)
  })
  worker.on('error', err => console.error(err))
  worker.on('exit', code => console.log(`Worker exited with code ${code}.`))
} else {
  const lineStops = flatten(
    lines.map(({ code, stops }) =>
      stops.map(stop => ({ line: code, stop: stop.code }))
    )
  )

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
      console.error(e)
    }
  }

  const loop = async () => {
    for (const { stop, line } of lineStops) {
      const schedule = await getStopSchedules(line, stop)
      if (schedule) {
        parentPort?.postMessage({
          line,
          stop: stop,
          ...schedule,
        })
      }
      await sleep(500)
    }
  }

  while (true) {
    await loop()
  }
}
