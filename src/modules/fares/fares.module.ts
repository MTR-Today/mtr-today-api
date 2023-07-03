import { Module } from '@nestjs/common'

import { FaresController } from './fares.controller.js'
import { FaresService } from './fares.service.js'

@Module({
  exports: [FaresService],
  controllers: [FaresController],
  providers: [FaresService],
})
export class FaresModule {}
