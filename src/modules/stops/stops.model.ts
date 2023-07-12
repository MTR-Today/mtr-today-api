import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { StopCode } from 'mtr-kit'

import { Fare } from '../fares/fares.model.js'
import { LineBase } from '../lines/lines.model.js'
import { Schedule } from '../schedules/schedules.model.js'

registerEnumType(StopCode, {
  name: 'StopCode',
})

@ObjectType()
export class StopBase {
  @Field(() => StopCode)
  stop!: StopCode

  @Field()
  nameEn!: string

  @Field()
  nameZh!: string

  @Field()
  color!: string

  @Field()
  textColor!: string
}

@ObjectType()
export class Stop extends StopBase {
  @Field(() => [LineBase])
  lines!: LineBase[]

  @Field(() => [Fare])
  fares!: Fare[]

  @Field(() => [Schedule])
  schedules!: Schedule[]
}
