import { Field, Int, ObjectType } from "@nestjs/graphql";
import { LineCode, StopCode } from "mtr-kit";

@ObjectType()
export class ScheduleItem {
  @Field(() => Int)
  platform!: number;

  @Field()
  destination!: string;

  @Field()
  timestamp!: string;
}

@ObjectType()
export class ScheduleDetail {
  @Field(() => [ScheduleItem], { nullable: true })
  up?: ScheduleItem[];

  @Field(() => [ScheduleItem], { nullable: true })
  down?: ScheduleItem[];
}

@ObjectType()
export class Schedule {
  @Field(() => LineCode)
  line!: LineCode;

  @Field(() => StopCode)
  stop!: StopCode;

  @Field()
  currentTime!: string;

  @Field()
  isDelayed!: boolean;

  @Field()
  systemTime!: string;

  @Field()
  schedule!: ScheduleDetail;
}
