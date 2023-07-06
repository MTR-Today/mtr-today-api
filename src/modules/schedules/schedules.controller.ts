import { Controller, Get } from '@nestjs/common'

import { SchedulesService } from './schedules.service.js'

@Controller('/api/v1/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  listSchedules() {
    return this.schedulesService.listSchedules()
  }
}
