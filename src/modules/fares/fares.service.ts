import { Injectable } from '@nestjs/common';
import { Interval, Timeout } from '@nestjs/schedule';
import { type LineCode, type StopCode, fareApi, stops } from 'mtr-kit';
import { drop, take } from 'ramda';

import { normalizeStopName } from '../../utils/normalizeStopName.js';

type NormalizedFare = {
  from?: StopCode;
  to?: StopCode;
  octopusCard: {
    child: number;
    adult: number;
    student: number;
    elderly: number;
    joyYou: number;
    pwd: number;
  };
  singleJourneyTicket: {
    child: number;
    adult: number;
    elderly: number;
  };
};

@Injectable()
export class FaresService {
  fares: NormalizedFare[] = [];

  async listNormalizedMtrFares(): Promise<NormalizedFare[]> {
    const fares = await fareApi.listMtrFares();
    return fares.map(
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
          ({ nameEn }) =>
            normalizeStopName(nameEn) === normalizeStopName(SRC_STATION_NAME),
        )?.stop,
        to: stops.find(
          ({ nameEn }) =>
            normalizeStopName(nameEn) === normalizeStopName(DEST_STATION_NAME),
        )?.stop,
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
      }),
    );
  }

  async listNormalizedAirportExpressFares(): Promise<NormalizedFare[]> {
    const fares = await fareApi.listAirportExpressFares();

    return fares.map(
      ({
        ST_FROM,
        ST_TO,
        OCT_ADT_FARE,
        OCT_CHD_FARE,

        SINGLE_ADT_FARE,
        SINGLE_CHD_FARE,
      }) => ({
        from: stops.find(
          ({ nameEn }) =>
            normalizeStopName(nameEn) === normalizeStopName(ST_FROM),
        )?.stop,
        to: stops.find(
          ({ nameEn }) =>
            normalizeStopName(nameEn) === normalizeStopName(ST_TO),
        )?.stop,
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
      }),
    );
  }

  @Timeout(0)
  @Interval(1000 * 60 * 60 * 24)
  async pullFares() {
    const [mtrFares, airportExpressFares] = await Promise.all([
      this.listNormalizedMtrFares(),
      this.listNormalizedAirportExpressFares(),
    ]);

    this.fares = [...mtrFares, ...airportExpressFares];
  }

  async listFares({
    from,
    to,
    offset,
    limit,
  }: {
    from?: StopCode;
    to?: StopCode;
    offset?: number;
    limit?: number;
  }) {
    const res = this.fares.filter(
      (item) => (!from || item.from === from) && (!to || item.to === to),
    );

    const withOffset = offset ? drop(offset, res) : res;
    const withLimit = limit ? take(limit, withOffset) : withOffset;
    return withLimit;
  }

  listLineStopFares(_: LineCode, stop: StopCode) {
    return this.listFares({ from: stop });
  }
}
