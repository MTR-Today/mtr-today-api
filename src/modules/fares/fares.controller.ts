import { Controller, Get, Query } from '@nestjs/common';

import { ListFaresQueryDto } from './fares.dto.js';
import { FaresService } from './fares.service.js';

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
