import { Controller, Get, Query } from '@nestjs/common';

import type { ListSchedulesQueryDto } from './schedules.dto.js';
import type { SchedulesService } from './schedules.service.js';

@Controller('/api/v1/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  listSchedules(
    @Query()
    { line, stop }: ListSchedulesQueryDto,
  ) {
    return this.schedulesService.listSchedules({ line, stop });
  }
}
