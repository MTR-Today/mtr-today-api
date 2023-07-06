import { IsEnum, IsOptional } from 'class-validator'
import { StopCode } from 'mtr-kit'

export class ListFaresQueryDto {
  @IsEnum(StopCode)
  @IsOptional()
  from?: StopCode

  @IsEnum(StopCode)
  @IsOptional()
  to?: StopCode
}
