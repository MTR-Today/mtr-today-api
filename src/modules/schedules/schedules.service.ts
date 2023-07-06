import { Injectable } from '@nestjs/common'
import { LineCode, StopCode, lineMap, lines } from 'mtr-kit'

import { NormalizedSchedule, scheduleMap } from '../../worker.js'

@Injectable()
export class SchedulesService {
  listLineStopSchedules({ line, stop }: { line: LineCode; stop: StopCode }) {
    const schedule = scheduleMap.get(`${line}-${stop}`)
    return schedule ? [{ ...schedule, line, stop }] : []
  }

  listLineSchedules({ line }: { line: LineCode }) {
    return lineMap[line].stops
      .reduce<({ stop: StopCode } & NormalizedSchedule)[]>(
        (acc, { stop }) => [
          ...acc,
          ...this.listLineStopSchedules({ line, stop }),
        ],
        []
      )
      .filter((v): v is NonNullable<typeof v> => Boolean(v))
  }

  listStopSchedules({ stop }: { stop: StopCode }) {
    return lines
      .filter(line => line.stops.some(item => item.stop === stop))
      .reduce<({ line: LineCode } & NormalizedSchedule)[]>(
        (acc, { line }) => [
          ...acc,
          ...this.listLineStopSchedules({ line, stop }),
        ],
        []
      )
      .filter((v): v is NonNullable<typeof v> => Boolean(v))
  }

  listSchedules() {
    return lines.reduce<
      ({ line: LineCode; stop: StopCode } & NormalizedSchedule)[]
    >(
      (acc, { line }) => [
        ...acc,
        ...this.listLineSchedules({ line }).map(item => ({
          line,
          ...item,
        })),
      ],
      []
    )
  }
}
