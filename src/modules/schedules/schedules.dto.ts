import { ArgsType, Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { LineCode, StopCode } from 'mtr-kit'

@ArgsType()
export class ListSchedulesQueryDto {
  @IsEnum(LineCode)
  @IsOptional()
  @Field(() => LineCode, { nullable: true })
  @ApiProperty({ enum: LineCode })
  line?: LineCode

  @IsEnum(StopCode)
  @IsOptional()
  @Field(() => StopCode, { nullable: true })
  @ApiProperty({ enum: StopCode })
  stop?: StopCode
}
