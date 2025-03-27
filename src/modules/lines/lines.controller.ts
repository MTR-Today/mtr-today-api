import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { LineCode, type StopCode } from 'mtr-kit';

import type { SchedulesService } from '../schedules/schedules.service.js';
import type { LinesService } from './lines.service.js';

@Controller('/api/v1/lines')
export class LinesController {
  constructor(
    private readonly linesService: LinesService,
    private readonly schedulesService: SchedulesService,
  ) {}

  @Get()
  listLines() {
    return this.linesService.listLines();
  }

  @Get(':line')
  @ApiParam({
    name: 'line',
    required: true,
    enum: LineCode,
  })
  getLine(@Param() { line }: { line: LineCode }) {
    return this.linesService.getLine({ line });
  }

  @Get(':line/stops')
  @ApiParam({
    name: 'line',
    required: true,
    enum: LineCode,
  })
  listLinesStops(@Param() { line }: { line: LineCode }) {
    return this.linesService.listLineStop({ line });
  }

  @Get(':line/stops/:stop')
  @ApiParam({
    name: 'line',
    required: true,
    enum: LineCode,
  })
  getLinesStop(@Param() { line, stop }: { line: LineCode; stop: StopCode }) {
    return this.linesService.getLineStop({ line, stop });
  }

  @Get(':line/stops/:stop/schedules')
  @ApiParam({
    name: 'line',
    required: true,
    enum: LineCode,
  })
  listLinesStopsSchedules(
    @Param() { line, stop }: { line: LineCode; stop: StopCode },
  ) {
    return this.schedulesService.listLineStopSchedules({ line, stop });
  }
}
