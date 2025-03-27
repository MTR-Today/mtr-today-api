import { Controller, Get, Query } from '@nestjs/common';

import type { ListFaresQueryDto } from './fares.dto.js';
import type { FaresService } from './fares.service.js';

@Controller('/api/v1/fares')
export class FaresController {
  constructor(private readonly fareService: FaresService) {}

  @Get()
  listFares(
    @Query()
    { from, to }: ListFaresQueryDto,
  ) {
    return this.fareService.listFares({ from, to });
  }
}
