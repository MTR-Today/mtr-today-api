import { LineCode, StopCode, lineMap, lines } from 'mtr-kit'

import { Schedule, scheduleMap } from '../worker.js'

const getLineStopSchedule = (line: LineCode, stop: StopCode) =>
  scheduleMap.get(`${line}-${stop}`)

const getStopSchedules = (stop: StopCode): ({ line: LineCode } & Schedule)[] =>
  lines
    .filter(line => line.stops.includes(stop))
    .map(line => {
      const schedule = getLineStopSchedule(line.code, stop)
      return schedule
        ? {
            line: line.code,
            ...schedule,
          }
        : null
    })
    .filter((v): v is NonNullable<typeof v> => Boolean(v))

const getLineSchedule = (code: LineCode): ({ stop: StopCode } & Schedule)[] =>
  lineMap[code].stops
    .map(stop => {
      const schedule = getLineStopSchedule(code, stop)
      return schedule
        ? {
            stop,
            ...schedule,
          }
        : null
    })
    .filter((v): v is NonNullable<typeof v> => Boolean(v))

const getSchedule = async () =>
  lines.reduce<({ line: LineCode; stop: StopCode } & Schedule)[]>(
    (acc, line) => [
      ...acc,
      ...getLineSchedule(line.code).map(item => ({ line: line.code, ...item })),
    ],
    []
  )

export const scheduleService = {
  getLineSchedule,
  getSchedule,
  getLineStopSchedule,
  getStopSchedules,
}
