import { Args, Query, Resolver } from "@nestjs/graphql";

import { ListFaresQueryDto } from "./fares.dto.js";
import { Fare } from "./fares.model.js";
import { FaresService } from "./fares.service.js";

@Resolver(() => Fare)
export class FaresResolver {
  constructor(private readonly faresService: FaresService) {}

  @Query(() => [Fare])
  fares(
    @Args()
    { from, to }: ListFaresQueryDto,
  ) {
    return this.faresService.listFares({ from, to });
  }
}
