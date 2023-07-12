import { Args, Query, Resolver } from '@nestjs/graphql'

import { ListSchedulesQueryDto } from './schedules.dto.js'
import { Schedule } from './schedules.model.js'
import { SchedulesService } from './schedules.service.js'

@Resolver(() => Schedule)
export class SchedulesResolver {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Query(() => [Schedule])
  schedules(
    @Args()
    { line, stop }: ListSchedulesQueryDto
  ) {
    return this.schedulesService.listSchedules({ line, stop })
  }
}
