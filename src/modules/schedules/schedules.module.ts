import { Module } from '@nestjs/common';

import { SchedulesController } from './schedules.controller.js';
import { SchedulesResolver } from './schedules.resolver.js';
import { SchedulesService } from './schedules.service.js';

@Module({
  exports: [SchedulesService],
  controllers: [SchedulesController],
  providers: [SchedulesService, SchedulesResolver],
})
export class SchedulesModule {}
