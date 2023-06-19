import { LineCode, StopCode, lines } from 'mtr-kit'

import { scheduleMap } from '../worker.js'

const getStopSchedules = (line: LineCode, stop: StopCode) =>
  scheduleMap.get(`${line}-${stop}`)

const getLineSchedule = (code: LineCode) => {
  const stops = lines.find(item => item.code === code)?.stops || []
  return stops
    .map(stop => {
      const schedule = getStopSchedules(code, stop.code)
      return schedule
        ? {
            code: stop.code,
            ...schedule,
          }
        : null
    })
    .filter((v): v is NonNullable<typeof v> => Boolean(v))
}

const getSchedule = async () =>
  lines.map(line => {
    const schedule = getLineSchedule(line.code)
    return { code: line.code, stops: schedule }
  })

export const scheduleService = {
  getLineSchedule,
  getSchedule,
  getStopSchedules,
}
