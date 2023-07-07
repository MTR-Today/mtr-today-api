import { ArgsType, Field } from '@nestjs/graphql'
import { IsEnum, IsOptional } from 'class-validator'
import { StopCode } from 'mtr-kit'

@ArgsType()
export class ListFaresQueryDto {
  @IsEnum(StopCode)
  @IsOptional()
  @Field(() => StopCode, { nullable: true })
  from?: StopCode

  @IsEnum(StopCode)
  @IsOptional()
  @Field(() => StopCode, { nullable: true })
  to?: StopCode
}
