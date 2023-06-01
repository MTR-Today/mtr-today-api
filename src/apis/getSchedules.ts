import { LineCode } from '../constants/line'
import { StopCode } from '../constants/stop'
import { apiClient } from './apiClient'

export type ScheduleItem = {
  seq: string
  dest: string
  plat: string
  time: string
  ttnt: string
  valid: string
  source: string
}

type Schedule = {
  sys_time: string
  curr_time: string
  data: {
    [key in `${LineCode}-${StopCode}`]: {
      curr_time: string
      sys_time: string
      UP?: ScheduleItem[]
      DOWN?: ScheduleItem[]
    }
  }
  status: number
  message: string
  isdelay: string
}

const getSchedules = ({ line, stop }: { line: LineCode; stop: StopCode }) =>
  apiClient
    .url('/transport/mtr/getSchedule.php')
    .query({ line, sta: stop })
    .get()
    .json<Schedule>()

export const mtrApi = { getSchedules }
