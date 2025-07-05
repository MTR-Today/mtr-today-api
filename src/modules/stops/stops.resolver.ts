import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StopCode } from "mtr-kit";

import { Fare } from "../fares/fares.model.js";
import { FaresService } from "../fares/fares.service.js";
import { LineBase } from "../lines/lines.model.js";
import { Schedule } from "../schedules/schedules.model.js";
import { SchedulesService } from "../schedules/schedules.service.js";
import { Stop } from "./stops.model.js";
import { StopsService } from "./stops.service.js";

@Resolver(() => Stop)
export class StopsResolver {
  constructor(
    private readonly stopsService: StopsService,
    private readonly faresService: FaresService,
    private readonly schedulesService: SchedulesService,
  ) {}

  @Query(() => [Stop])
  stops() {
    return this.stopsService.listStop();
  }

  @Query(() => Stop)
  stop(@Args("stop", { type: () => StopCode }) stop: StopCode) {
    return this.stopsService.getStop({ stop });
  }

  @ResolveField("lines", () => [LineBase])
  stopLines(@Parent() stop: Stop) {
    return this.stopsService.listStopLines({ stop: stop.stop });
  }

  @ResolveField("fares", () => [Fare])
  async stopFares(@Parent() stop: Stop) {
    return this.faresService.listFares({ from: stop.stop });
  }

  @ResolveField("schedules", () => [Schedule])
  async stopSchedules(@Parent() stop: Stop) {
    return this.schedulesService.listSchedules({ stop: stop.stop });
  }
}
