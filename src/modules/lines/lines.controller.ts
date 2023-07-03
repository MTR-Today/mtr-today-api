import { Controller, Get, Param } from '@nestjs/common'
import { StopCode } from 'mtr-kit'
import { LineCode, lineMap, lines } from 'mtr-kit'

import { FaresService } from '../fares/fares.service.js'
import { ScheduleService } from '../schedules/schedules.service.js'

@Controller('/api/v1/lines')
export class LinesController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly faresService: FaresService
  ) {}

  @Get()
  listLines() {
    return lines
  }

  @Get(':line')
  getLine(@Param() { line }: { line: LineCode }) {
    return lineMap[line]
  }

  @Get(':line/schedules')
  listLineSchedules(@Param() { line }: { line: LineCode }) {
    return this.scheduleService.listLineSchedules(line)
  }

  @Get(':line/stops')
  listLinesStops(@Param() { line }: { line: LineCode }) {
    return lineMap[line].stops
  }

  @Get(':line/stops/:stop/schedules')
  listLinesStopsSchedules(
    @Param() { line, stop }: { line: LineCode; stop: StopCode }
  ) {
    return this.scheduleService.listLineStopSchedules(line, stop)
  }

  @Get(':line/stops/:stop/schedules')
  listLinesStopsFares(@Param() { stop }: { line: LineCode; stop: StopCode }) {
    return this.faresService.listStopFare(stop)
  }
}
