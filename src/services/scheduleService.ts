import { LineCode, lines } from '../constants/line'
import { StopCode } from '../constants/stop'
import { mtrApi, ScheduleItem } from '../apis/getSchedules'
import { convertTimeRecursive } from '../utils/convertTimeRecursive'
import memoize from 'memoizee'

const formatScheduleItem = (items: ScheduleItem[]) =>
  items
    .filter(({ valid }) => valid === 'Y')
    .sort((a, b) => Number(a.seq) - Number(b.seq))
    .map(({ dest, plat, time }) => ({
      plat: Number(plat),
      dest,
      time,
    }))

const getStopSchedules = memoize(
  async (line: LineCode, stop: StopCode) => {
    const response = await mtrApi.getSchedules({ line, stop })
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
  },
  { primitive: true, promise: true, maxAge: 20000, preFetch: true }
)

const getLineSchedule = async (code: LineCode) => {
  const stops = lines.find(item => item.code === code)?.stops || []

  let result: {
    code: StopCode
    schedule: Awaited<ReturnType<typeof getStopSchedules>>
  }[] = []

  for (const stop of stops) {
    const schedule = await getStopSchedules(code, stop.code)

    result = [...result, { code: stop.code, schedule }]
  }

  return result
}

const getSchedule = async () => {
  let result: {
    code: LineCode
    stops: Awaited<ReturnType<typeof getLineSchedule>>
  }[] = []

  for (const line of lines) {
    const schedule = await getLineSchedule(line.code)

    result = [...result, { code: line.code, stops: schedule }]
  }

  return result
}

export const scheduleService = {
  getStopSchedules,
  getLineSchedule,
  getSchedule,
}
