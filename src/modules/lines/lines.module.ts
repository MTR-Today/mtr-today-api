import { Module } from '@nestjs/common'

import { FaresModule } from '../fares/fares.module.js'
import { SchedulesModule } from '../schedules/schedules.module.js'
import { LinesController } from './lines.controller.js'
import { LineStopResolver, LinesResolver } from './lines.resolver.js'
import { LinesService } from './lines.service.js'

@Module({
  controllers: [LinesController],
  providers: [LinesService, LinesResolver, LineStopResolver],
  imports: [FaresModule, SchedulesModule],
})
export class LinesModule {}
