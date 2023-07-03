import { Module } from '@nestjs/common'

import { SchedulesController } from './schedules.controller.js'
import { ScheduleService } from './schedules.service.js'

@Module({
  exports: [ScheduleService],
  controllers: [SchedulesController],
  providers: [ScheduleService],
})
export class SchedulesModule {}
