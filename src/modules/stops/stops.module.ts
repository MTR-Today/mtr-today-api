import { Module } from '@nestjs/common'

import { FaresModule } from '../fares/fares.module.js'
import { SchedulesModule } from '../schedules/schedules.module.js'
import { StopsController } from './stops.controller.js'
import { StopsResolver } from './stops.resolver.js'
import { StopsService } from './stops.service.js'

@Module({
  controllers: [StopsController],
  providers: [StopsService, StopsResolver],
  imports: [SchedulesModule, FaresModule],
})
export class StopsModule {}
