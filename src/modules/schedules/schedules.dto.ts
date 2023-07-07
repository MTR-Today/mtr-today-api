import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { LineCode, StopCode } from 'mtr-kit'

import { defaultMaxLimit } from '../../constants/pagination.js'

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

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  offset?: number

  @Type(() => Number)
  @IsInt()
  @Max(defaultMaxLimit)
  @Min(0)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  limit?: number
}
