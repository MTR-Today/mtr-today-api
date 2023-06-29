import { LineCode, StopCode, lineMap, lines } from 'mtr-kit'

import { Schedule, scheduleMap } from '../worker.js'

const listLineStopSchedule = (line: LineCode, stop: StopCode): Schedule[] => {
  const schedule = scheduleMap.get(`${line}-${stop}`)
  return schedule ? [schedule] : []
}

const listStopSchedules = (stop: StopCode): ({ line: LineCode } & Schedule)[] =>
  lines
    .filter(line => line.stops.includes(stop))
    .reduce<({ line: LineCode } & Schedule)[]>(
      (acc, line) => [
        ...acc,
        ...listLineStopSchedule(line.code, stop).map(schedule => ({
          line: line.code,
          ...schedule,
        })),
      ],
      []
    )
    .filter((v): v is NonNullable<typeof v> => Boolean(v))

const listLineSchedule = (code: LineCode): ({ stop: StopCode } & Schedule)[] =>
  lineMap[code].stops
    .reduce<({ stop: StopCode } & Schedule)[]>(
      (acc, stop) => [
        ...acc,
        ...listLineStopSchedule(code, stop).map(schedule => ({
          stop,
          ...schedule,
        })),
      ],
      []
    )
    .filter((v): v is NonNullable<typeof v> => Boolean(v))

const listSchedule = async () =>
  lines.reduce<({ line: LineCode; stop: StopCode } & Schedule)[]>(
    (acc, line) => [
      ...acc,
      ...listLineSchedule(line.code).map(item => ({
        line: line.code,
        ...item,
      })),
    ],
    []
  )

export const scheduleService = {
  listLineSchedule,
  listSchedule,
  listStopSchedules,
  listLineStopSchedule,
}
