import { Module } from "@nestjs/common";

import { FaresController } from "./fares.controller.js";
import { FaresResolver } from "./fares.resolver.js";
import { FaresService } from "./fares.service.js";

@Module({
  exports: [FaresService],
  controllers: [FaresController],
  providers: [FaresService, FaresResolver],
})
export class FaresModule {}
