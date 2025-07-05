import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { LineCode, StopCode } from "mtr-kit";

import { Schedule } from "../schedules/schedules.model.js";

registerEnumType(LineCode, {
  name: "LineCode",
});

@ObjectType()
export class LineStopDirection {
  @Field(() => [Int])
  platforms!: number[];

  @Field(() => [StopCode], { nullable: true })
  nextStops?: StopCode[] | null;
}

@ObjectType()
export class LineStop {
  @Field(() => StopCode)
  line!: LineCode;

  @Field(() => StopCode)
  stop!: StopCode;

  @Field(() => LineStopDirection)
  up!: LineStopDirection;

  @Field(() => LineStopDirection)
  down!: LineStopDirection;

  @Field(() => [Schedule])
  schedules!: Schedule[];
}

@ObjectType()
export class LineBase {
  @Field(() => LineCode)
  line!: LineCode;

  @Field()
  nameEn!: string;

  @Field()
  nameZh!: string;

  @Field()
  color!: string;
}

@ObjectType()
export class Line extends LineBase {
  @Field(() => [LineStop])
  stops!: LineStop;
}
