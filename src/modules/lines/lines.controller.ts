import { Controller, Get, Param, Query } from '@nestjs/common'
import { LineCode, StopCode } from 'mtr-kit'

import { defaultLimit, defaultOffset } from '../../constants/pagination.js'
import { SchedulesService } from '../schedules/schedules.service.js'
import { ListLinesQueryDto } from './lines.dto.js'
import { LinesService } from './lines.service.js'

@Controller('/api/v1/lines')
export class LinesController {
  constructor(
    private readonly linesService: LinesService,
    private readonly schedulesService: SchedulesService
  ) {}

  @Get()
  listLines(
    @Query()
    { offset = defaultOffset, limit = defaultLimit }: ListLinesQueryDto
  ) {
    return this.linesService.listLines({ offset, limit })
  }

  @Get(':line')
  getLine(@Param() { line }: { line: LineCode }) {
    return this.linesService.getLine({ line })
  }

  @Get(':line/stops')
  listLinesStops(@Param() { line }: { line: LineCode }) {
    return this.linesService.listLineStop({ line })
  }

  @Get(':line/stops/:stop')
  getLinesStop(@Param() { line, stop }: { line: LineCode; stop: StopCode }) {
    return this.linesService.getLineStop({ line, stop })
  }

  @Get(':line/stops/:stop/schedules')
  listLinesStopsSchedules(
    @Param() { line, stop }: { line: LineCode; stop: StopCode }
  ) {
    return this.schedulesService.listLineStopSchedules({ line, stop })
  }
}
