import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { LineCode, StopCode } from 'mtr-kit'

import { defaultLimit, defaultOffset } from '../../constants/pagination.js'
import { Schedule } from '../schedules/schedules.model.js'
import { SchedulesService } from '../schedules/schedules.service.js'
import { ListLinesQueryDto } from './lines.dto.js'
import { Line, LineStop } from './lines.model.js'
import { LinesService } from './lines.service.js'

@Resolver(() => Line)
export class LinesResolver {
  constructor(private readonly linesService: LinesService) {}

  @Query(() => [Line])
  lines(
    @Args()
    { offset = defaultOffset, limit = defaultLimit }: ListLinesQueryDto
  ) {
    return this.linesService.listLines({ offset, limit })
  }

  @Query(() => Line)
  line(@Args('line', { type: () => LineCode }) line: LineCode) {
    return this.linesService.getLine({ line })
  }

  @Query(() => LineStop)
  lineStop(
    @Args('line', { type: () => LineCode }) line: LineCode,
    @Args('stop', { type: () => LineCode }) stop: StopCode
  ) {
    return this.linesService.getLineStop({ line, stop })
  }

  @ResolveField('stops', () => [LineStop])
  lineStops(@Parent() line: Line) {
    return this.linesService.listLineStop({ line: line.line })
  }
}

@Resolver(() => LineStop)
export class LineStopResolver {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ResolveField('schedules', () => [Schedule])
  lineStopSchedules(@Parent() lineStop: LineStop) {
    return this.schedulesService.listLineStopSchedules({
      line: lineStop.line,
      stop: lineStop.stop,
    })
  }
}
