import { Line } from '../constants/line'
import { Stop } from '../constants/stop'
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

const getSchedules = memoize(
  async ({ line, stop }: { line: Line; stop: Stop }) => {
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
  { promise: true, maxAge: 10000, preFetch: true }
)

export const scheduleService = { getSchedules }
