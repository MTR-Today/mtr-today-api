import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { StopCode } from 'mtr-kit';

import { FaresService } from '../fares/fares.service.js';
import { SchedulesService } from '../schedules/schedules.service.js';
import { StopsService } from './stops.service.js';

@Controller('/api/v1/stops')
export class StopsController {
  constructor(
    private readonly stopsService: StopsService,
    private readonly schedulesService: SchedulesService,
    private readonly faresService: FaresService,
  ) {}

  @Get()
  listStops() {
    return this.stopsService.listStop();
  }

  @Get(':stop')
  @ApiParam({
    name: 'stop',
    required: true,
    enum: StopCode,
  })
  getStop(@Param() { stop }: { stop: StopCode }) {
    return this.stopsService.getStop({ stop });
  }

  @Get(':stop/lines')
  @ApiParam({
    name: 'stop',
    required: true,
    enum: StopCode,
  })
  listStopLines(@Param() { stop }: { stop: StopCode }) {
    return this.stopsService.listStopLines({ stop });
  }

  @Get(':stop/schedules')
  @ApiParam({
    name: 'stop',
    required: true,
    enum: StopCode,
  })
  listStopSchedules(@Param() { stop }: { stop: StopCode }) {
    return this.schedulesService.listSchedules({ stop });
  }

  @Get(':stop/fares')
  @ApiParam({
    name: 'stop',
    required: true,
    enum: StopCode,
  })
  listStopFares(@Param() { stop }: { stop: StopCode }) {
    return this.faresService.listFares({ from: stop });
  }
}
