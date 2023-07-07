import { Args, Query, Resolver } from '@nestjs/graphql'

import { defaultLimit, defaultOffset } from '../../constants/pagination.js'
import { ListSchedulesQueryDto } from './schedules.dto.js'
import { Schedule } from './schedules.model.js'
import { SchedulesService } from './schedules.service.js'

@Resolver(() => Schedule)
export class SchedulesResolver {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Query(() => [Schedule])
  schedules(
    @Args()
    {
      line,
      stop,
      offset = defaultOffset,
      limit = defaultLimit,
    }: ListSchedulesQueryDto
  ) {
    return this.schedulesService.listSchedules({ line, stop, offset, limit })
  }
}
