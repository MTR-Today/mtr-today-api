import { Injectable } from '@nestjs/common'
import { LineCode, StopCode, lineMap, lines } from 'mtr-kit'
import { drop, omit, take } from 'ramda'

@Injectable()
export class LinesService {
  listLines({ offset, limit }: { offset?: number; limit?: number }) {
    const res = lines.map(omit(['stops']))

    const withOffset = offset ? drop(offset, res) : res
    const withLimit = limit ? take(limit, withOffset) : withOffset
    return withLimit
  }

  getLine({ line }: { line: LineCode }) {
    return omit(['stops'], lineMap[line])
  }

  listLineStop({ line }: { line: LineCode }) {
    return lineMap[line].stops.map(item => ({ ...item, line }))
  }

  getLineStop({ line, stop }: { line: LineCode; stop: StopCode }) {
    const res = lineMap[line].stops.find(item => item.stop === stop)
    if (!res) return res
    return { ...res, line }
  }
}
