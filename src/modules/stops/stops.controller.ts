import { Controller, Get, Param, Query } from '@nestjs/common'
import { StopCode } from 'mtr-kit'

import { defaultLimit, defaultOffset } from '../../constants/pagination.js'
import { FaresService } from '../fares/fares.service.js'
import { SchedulesService } from '../schedules/schedules.service.js'
import { ListStopsQueryDto } from './stops.dto.js'
import { StopsService } from './stops.service.js'

@Controller('/api/v1/stops')
export class StopsController {
  constructor(
    private readonly stopsService: StopsService,
    private readonly schedulesService: SchedulesService,
    private readonly faresService: FaresService
  ) {}

  @Get()
  listStops(
    @Query()
    { offset = defaultOffset, limit = defaultLimit }: ListStopsQueryDto
  ) {
    return this.stopsService.listStop({ offset, limit })
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
    return this.schedulesService.listSchedules({ stop })
  }

  @Get(':stop/fares')
  listStopFares(@Param() { stop }: { stop: StopCode }) {
    return this.faresService.listFares({ from: stop })
  }
}
