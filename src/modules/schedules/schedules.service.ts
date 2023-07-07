import { Injectable } from '@nestjs/common'
import { LineCode, StopCode, lineMap, lines } from 'mtr-kit'
import { drop, take } from 'ramda'

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

  listSchedules({
    line,
    stop,
    offset,
    limit,
  }: {
    line?: LineCode
    stop?: StopCode
    offset?: number
    limit?: number
  }) {
    const res = lines
      .reduce<({ line: LineCode; stop: StopCode } & NormalizedSchedule)[]>(
        (acc, item) => [
          ...acc,
          ...this.listLineSchedules({ line: item.line }).map(scheduleItem => ({
            line: item.line,
            ...scheduleItem,
          })),
        ],
        []
      )
      .filter(
        item => (!line || item.line === line) && (!stop || item.stop === stop)
      )

    const withOffset = offset ? drop(offset, res) : res
    const withLimit = limit ? take(limit, withOffset) : withOffset
    return withLimit
  }
}
