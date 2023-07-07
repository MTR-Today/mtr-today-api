import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

import { defaultMaxLimit } from '../../constants/pagination.js'

@ArgsType()
export class ListStopsQueryDto {
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
