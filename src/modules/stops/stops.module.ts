import { Module } from '@nestjs/common'

import { FaresModule } from '../fares/fares.module.js'
import { SchedulesModule } from '../schedules/schedules.module.js'
import { StopsController } from './stops.controller.js'

@Module({
  controllers: [StopsController],
  imports: [SchedulesModule, FaresModule],
})
export class StopsModule {}
