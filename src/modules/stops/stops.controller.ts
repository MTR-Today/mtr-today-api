import { Controller, Get, Param } from '@nestjs/common'
import { StopCode, lines } from 'mtr-kit'
import { stopMap, stops } from 'mtr-kit'
import { omit } from 'ramda'

import { FaresService } from '../fares/fares.service.js'
import { ScheduleService } from '../schedules/schedules.service.js'

@Controller('/api/v1/stops')
export class StopsController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly faresService: FaresService
  ) {}

  @Get()
  listStops() {
    return stops
  }

  @Get(':stop')
  getStop(@Param() { stop }: { stop: StopCode }) {
    return stopMap[stop]
  }

  @Get(':stop/lines')
  getStopLines(@Param() { stop }: { stop: StopCode }) {
    return lines
      .filter(line => line.stops.some(item => item.stop === stop))
      .map(({ stops: lineStops, ...rest }) => {
        const lineStopItem = lineStops.find(item => item.stop === stop)
        if (!lineStopItem) throw new Error(`Line Stop ${stop} not found`)
        return {
          ...rest,
          ...omit(['stop'], lineStopItem),
        }
      })
  }

  @Get(':stop/schedules')
  listStopSchedules(@Param() { stop }: { stop: StopCode }) {
    return this.scheduleService.listStopSchedules(stop)
  }

  @Get(':stop/fares')
  listStopFares(@Param() { stop }: { stop: StopCode }) {
    return this.faresService.listStopFare(stop)
  }
}
