import { Injectable } from '@nestjs/common'
import { LineCode, StopCode, fareApi, stops } from 'mtr-kit'

type NormalizedFare = {
  from?: StopCode
  to?: StopCode
  octopusCard: {
    child: number
    adult: number
    student: number
    elderly: number
    joyYou: number
    pwd: number
  }
  singleJourneyTicket: {
    child: number
    adult: number
    elderly: number
  }
}

@Injectable()
export class FaresService {
  async listNormalizedMtrFares(): Promise<NormalizedFare[]> {
    return (await fareApi.listMtrFares()).map(
      ({
        SRC_STATION_NAME,
        DEST_STATION_NAME,
        OCT_ADT_FARE,
        OCT_STD_FARE,
        OCT_JOYYOU_SIXTY_FARE,
        OCT_CON_CHILD_FARE,
        OCT_CON_ELDERLY_FARE,
        OCT_CON_PWD_FARE,

        SINGLE_ADT_FARE,
        SINGLE_CON_CHILD_FARE,
        SINGLE_CON_ELDERLY_FARE,
      }) => ({
        from: stops.find(
          ({ nameEn }) => nameEn === SRC_STATION_NAME.replace('-', ' ')
        )?.code,
        to: stops.find(
          ({ nameEn }) => nameEn === DEST_STATION_NAME.replace('-', ' ')
        )?.code,
        octopusCard: {
          child: OCT_CON_CHILD_FARE,
          adult: OCT_ADT_FARE,
          student: OCT_STD_FARE,
          elderly: OCT_CON_ELDERLY_FARE,
          joyYou: OCT_JOYYOU_SIXTY_FARE,
          pwd: OCT_CON_PWD_FARE,
        },
        singleJourneyTicket: {
          child: SINGLE_CON_CHILD_FARE,
          adult: SINGLE_ADT_FARE,
          elderly: SINGLE_CON_ELDERLY_FARE,
        },
      })
    )
  }

  async listNormalizedAirportExpressFares(): Promise<NormalizedFare[]> {
    return (await fareApi.listAirportExpressFares()).map(
      ({
        ST_FROM,
        ST_TO,
        OCT_ADT_FARE,
        OCT_CHD_FARE,

        SINGLE_ADT_FARE,
        SINGLE_CHD_FARE,
      }) => ({
        from: stops.find(({ nameEn }) => nameEn === ST_FROM.replace('-', ' '))
          ?.code,
        to: stops.find(({ nameEn }) => nameEn === ST_TO.replace('-', ' '))
          ?.code,
        octopusCard: {
          child: OCT_CHD_FARE,
          adult: OCT_ADT_FARE,
          student: OCT_ADT_FARE,
          elderly: OCT_ADT_FARE,
          joyYou: OCT_ADT_FARE,
          pwd: OCT_ADT_FARE,
        },
        singleJourneyTicket: {
          child: SINGLE_CHD_FARE,
          adult: SINGLE_ADT_FARE,
          elderly: SINGLE_ADT_FARE,
        },
      })
    )
  }

  async listFares() {
    return [
      ...(await this.listNormalizedMtrFares()),
      ...(await this.listNormalizedAirportExpressFares()),
    ]
  }

  async listStopFare(stop: StopCode) {
    return (await this.listFares()).filter(({ from }) => from === stop)
  }

  listLineStopFares(_: LineCode, stop: StopCode) {
    return this.listStopFare(stop)
  }
}
