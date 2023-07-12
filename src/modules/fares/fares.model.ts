import { Field, Float, ObjectType } from '@nestjs/graphql'
import { StopCode } from 'mtr-kit'

@ObjectType()
export class OctopusCardFare {
  @Field(() => Float)
  child!: number

  @Field(() => Float)
  adult!: number

  @Field(() => Float)
  student!: number

  @Field(() => Float)
  elderly!: number

  @Field(() => Float)
  joyYou!: number

  @Field(() => Float)
  pwd!: number
}

@ObjectType()
export class SingleJourneyTicketFare {
  @Field(() => Float)
  child!: number

  @Field(() => Float)
  adult!: number

  @Field(() => Float)
  elderly!: number
}

@ObjectType()
export class Fare {
  @Field(() => StopCode)
  from?: StopCode

  @Field(() => StopCode)
  to?: StopCode

  @Field(() => OctopusCardFare)
  octopusCard!: OctopusCardFare

  @Field(() => SingleJourneyTicketFare)
  singleJourneyTicket!: SingleJourneyTicketFare
}
