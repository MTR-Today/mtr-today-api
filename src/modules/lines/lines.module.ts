import { Module } from '@nestjs/common'

import { FaresModule } from '../fares/fares.module.js'
import { SchedulesModule } from '../schedules/schedules.module.js'
import { LinesController } from './lines.controller.js'

@Module({
  controllers: [LinesController],
  imports: [FaresModule, SchedulesModule],
})
export class LinesModule {}
