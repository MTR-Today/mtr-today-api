import { ArgsType, Field } from '@nestjs/graphql'
import { IsEnum, IsOptional } from 'class-validator'
import { LineCode, StopCode } from 'mtr-kit'

@ArgsType()
export class ListSchedulesQueryDto {
  @IsEnum(LineCode)
  @IsOptional()
  @Field(() => LineCode, { nullable: true })
  line?: LineCode

  @IsEnum(StopCode)
  @IsOptional()
  @Field(() => StopCode, { nullable: true })
  stop?: StopCode
}
