import { Module } from '@nestjs/common'

import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { FaresModule } from './modules/fares/fares.module.js'
import { LinesModule } from './modules/lines/lines.module.js'
import { SchedulesModule } from './modules/schedules/schedules.module.js'
import { StopsModule } from './modules/stops/stops.module.js'

@Module({
  imports: [LinesModule, StopsModule, SchedulesModule, FaresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
