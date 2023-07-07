import { Controller, Get, Query } from '@nestjs/common'

import { defaultLimit, defaultOffset } from '../../constants/pagination.js'
import { ListSchedulesQueryDto } from './schedules.dto.js'
import { SchedulesService } from './schedules.service.js'

@Controller('/api/v1/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  listSchedules(
    @Query()
    {
      line,
      stop,
      offset = defaultOffset,
      limit = defaultLimit,
    }: ListSchedulesQueryDto
  ) {
    return this.schedulesService.listSchedules({ line, stop, offset, limit })
  }
}
