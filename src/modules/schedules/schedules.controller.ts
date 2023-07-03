import { Controller, Get } from '@nestjs/common'

import { ScheduleService } from './schedules.service.js'

@Controller('/api/v1/schedules')
export class SchedulesController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  listSchedules() {
    return this.scheduleService.listSchedules()
  }
}
