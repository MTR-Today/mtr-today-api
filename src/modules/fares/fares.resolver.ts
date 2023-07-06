import { Args, Query, Resolver } from '@nestjs/graphql'
import { StopCode } from 'mtr-kit'

import { Fare } from './fares.model.js'
import { FaresService } from './fares.service.js'

@Resolver(() => Fare)
export class FaresResolver {
  constructor(private readonly faresService: FaresService) {}

  @Query(() => [Fare])
  fares(
    @Args('from', { type: () => StopCode, nullable: true }) from: StopCode,
    @Args('to', { type: () => StopCode, nullable: true }) to: StopCode
  ) {
    return this.faresService.listFares({ from, to })
  }
}
