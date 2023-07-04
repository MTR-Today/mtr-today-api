import { Injectable } from '@nestjs/common'
import { LineCode, StopCode, lineMap, lines } from 'mtr-kit'

import { Schedule, scheduleMap } from '../../worker.js'

@Injectable()
export class ScheduleService {
  listLineStopSchedules(line: LineCode, stop: StopCode) {
    const schedule = scheduleMap.get(`${line}-${stop}`)
    return schedule ? [schedule] : []
  }

  listLineSchedules(code: LineCode) {
    return lineMap[code].stops
      .reduce<({ stop: StopCode } & Schedule)[]>(
        (acc, { stop }) => [
          ...acc,
          ...this.listLineStopSchedules(code, stop).map(schedule => ({
            stop,
            ...schedule,
          })),
        ],
        []
      )
      .filter((v): v is NonNullable<typeof v> => Boolean(v))
  }

  listStopSchedules(stop: StopCode) {
    return lines
      .filter(line => line.stops.some(item => item.stop === stop))
      .reduce<({ line: LineCode } & Schedule)[]>(
        (acc, { line }) => [
          ...acc,
          ...this.listLineStopSchedules(line, stop).map(schedule => ({
            line: line,
            ...schedule,
          })),
        ],
        []
      )
      .filter((v): v is NonNullable<typeof v> => Boolean(v))
  }

  listSchedules() {
    return lines.reduce<({ line: LineCode; stop: StopCode } & Schedule)[]>(
      (acc, { line }) => [
        ...acc,
        ...this.listLineSchedules(line).map(item => ({
          line,
          ...item,
        })),
      ],
      []
    )
  }
}
