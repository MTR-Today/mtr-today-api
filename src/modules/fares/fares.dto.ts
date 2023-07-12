import { ArgsType, Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { StopCode } from 'mtr-kit'

@ArgsType()
export class ListFaresQueryDto {
  @IsEnum(StopCode)
  @IsOptional()
  @Field(() => StopCode, { nullable: true })
  @ApiProperty({ enum: StopCode })
  from?: StopCode

  @IsEnum(StopCode)
  @IsOptional()
  @Field(() => StopCode, { nullable: true })
  @ApiProperty({ enum: StopCode })
  to?: StopCode
}
