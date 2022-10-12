import { Line } from '../constants/line'
import { linesStops, Stop } from '../constants/stop'
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
  async (line: Line, stop: Stop) => {
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

const getLineSchedule = async (line: Line) => {
  const stops = linesStops[line as Line]

  let result = {}

  for (const stop of Object.keys(stops)) {
    const schedule = await getStopSchedules(line as Line, stop as Stop)

    result = { ...result, [stop]: schedule }
  }

  return result
}

const getSchedule = async () => {
  let result = {}

  for (const line of Object.keys(linesStops)) {
    const schedule = await getLineSchedule(line as Line)

    result = { ...result, [line]: schedule }
  }

  return result
}

export const scheduleService = {
  getStopSchedules,
  getLineSchedule,
  getSchedule,
}
