import { Query, Resolver } from '@nestjs/graphql'

import { Schedule } from './schedules.model.js'
import { SchedulesService } from './schedules.service.js'

@Resolver(() => Schedule)
export class SchedulesResolver {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Query(() => [Schedule])
  stops() {
    return this.schedulesService.listSchedules()
  }
}
