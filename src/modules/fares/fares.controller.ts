import { Controller, Get } from '@nestjs/common'

import { FaresService } from './fares.service.js'

@Controller('/api/v1/fares')
export class FaresController {
  constructor(private readonly fareService: FaresService) {}

  @Get()
  listFares() {
    return this.fareService.listFares()
  }
}
