import { Injectable } from '@nestjs/common';
import { lines, StopCode, stopMap, stops } from 'mtr-kit';
import { omit } from 'ramda';

@Injectable()
export class StopsService {
  listStop() {
    return stops;
  }

  getStop({ stop }: { stop: StopCode }) {
    return stopMap[stop];
  }

  listStopLines({ stop }: { stop: StopCode }) {
    return lines
      .filter((line) => line.stops.some((item) => item.stop === stop))
      .map(omit(['stops']));
  }
}
