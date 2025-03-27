import { Injectable } from '@nestjs/common';
import { type LineCode, type StopCode, lineMap, lines } from 'mtr-kit';
import { omit } from 'ramda';

@Injectable()
export class LinesService {
  listLines() {
    return lines.map(omit(['stops']));
  }

  getLine({ line }: { line: LineCode }) {
    return omit(['stops'], lineMap[line]);
  }

  listLineStop({ line }: { line: LineCode }) {
    return lineMap[line].stops.map((item) => ({ ...item, line }));
  }

  getLineStop({ line, stop }: { line: LineCode; stop: StopCode }) {
    const res = lineMap[line].stops.find((item) => item.stop === stop);
    if (!res) return res;
    return { ...res, line };
  }
}
