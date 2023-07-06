import { Controller, Get, Param } from '@nestjs/common'
import { StopCode } from 'mtr-kit'

import { FaresService } from '../fares/fares.service.js'
import { SchedulesService } from '../schedules/schedules.service.js'
import { StopsService } from './stops.service.js'

@Controller('/api/v1/stops')
export class StopsController {
  constructor(
    private readonly stopsService: StopsService,
    private readonly schedulesService: SchedulesService,
    private readonly faresService: FaresService
  ) {}

  @Get()
  listStops() {
    return this.stopsService.listStop()
  }

  @Get(':stop')
  getStop(@Param() { stop }: { stop: StopCode }) {
    return this.stopsService.getStop({ stop })
  }

  @Get(':stop/lines')
  listStopLines(@Param() { stop }: { stop: StopCode }) {
    return this.stopsService.listStopLines({ stop })
  }

  @Get(':stop/schedules')
  listStopSchedules(@Param() { stop }: { stop: StopCode }) {
    return this.schedulesService.listStopSchedules({ stop })
  }

  @Get(':stop/fares')
  listStopFares(@Param() { stop }: { stop: StopCode }) {
    return this.faresService.listFares({ from: stop })
  }
}
