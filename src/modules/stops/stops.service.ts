import { Injectable } from '@nestjs/common'
import { StopCode, lines, stopMap, stops } from 'mtr-kit'
import { drop, omit, take } from 'ramda'

@Injectable()
export class StopsService {
  listStop({ offset, limit }: { offset?: number; limit?: number }) {
    const res = stops
    const withOffset = offset ? drop(offset, res) : res
    const withLimit = limit ? take(limit, withOffset) : withOffset
    return withLimit
  }

  getStop({ stop }: { stop: StopCode }) {
    return stopMap[stop]
  }

  listStopLines({ stop }: { stop: StopCode }) {
    return lines
      .filter(line => line.stops.some(item => item.stop === stop))
      .map(omit(['stop']))
  }
}
