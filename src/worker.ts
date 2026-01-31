import * as url from 'node:url';
import { isMainThread, parentPort, Worker } from 'node:worker_threads';

import dayjs from 'dayjs';
import {
  type LineCode,
  lines,
  type ScheduleItem,
  type StopCode,
  stopScheduleApi,
} from 'mtr-kit';
import PromiseThrottle from 'promise-throttle';

import { convertTimeRecursive } from './utils/convertTimeRecursive.js';

export type NormalizedScheduleItem = {
  platform: number;
  destination: string;
  timestamp: string;
};

export type NormalizedSchedule = {
  currentTime: string;
  isDelayed: boolean;
  systemTime: string;
  schedule: {
    up: NormalizedScheduleItem[] | undefined;
    down: NormalizedScheduleItem[] | undefined;
  };
};

export const scheduleMap = new Map<
  `${LineCode}-${StopCode}`,
  NormalizedSchedule
>();

if (isMainThread) {
  const worker = new Worker(url.fileURLToPath(import.meta.url));
  worker.on(
    'message',
    ({
      line,
      stop,
      ...schedule
    }: NormalizedSchedule & { line: LineCode; stop: StopCode }) => {
      scheduleMap.set(`${line}-${stop}`, schedule);
    },
  );

  // eslint-disable-next-line no-console
  worker.on('error', (err) => console.error(err));
  // eslint-disable-next-line no-console
  worker.on('exit', (code) => console.log(`Worker exited with code ${code}.`));
} else {
  const threadMap = new Map<`${LineCode}-${StopCode}`, NormalizedSchedule>();

  const formatScheduleItem = (items: ScheduleItem[]) =>
    items
      .filter(({ valid }) => valid === 'Y')
      .sort((a, b) => Number(a.seq) - Number(b.seq))
      .map(({ dest, plat, time }) => ({
        platform: Number(plat),
        destination: dest,
        timestamp: time,
      }));

  const getStopSchedules = async (line: LineCode, stop: StopCode) => {
    try {
      const response = await stopScheduleApi.get({ line, stop });

      if (response.status === 0) return null;
      const { data, curr_time, isdelay, sys_time } = response;
      const { UP, DOWN } = data[`${line}-${stop}`];

      return convertTimeRecursive(
        {
          currentTime: curr_time,
          isDelayed: isdelay !== 'N',
          systemTime: sys_time,
          schedule: {
            up: UP ? formatScheduleItem(UP) : UP,
            down: DOWN ? formatScheduleItem(DOWN) : DOWN,
          },
        },
        'YYYY-MM-DD HH:mm:ss',
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return null;
    }
  };

  const getAndPost = async (line: LineCode, stop: StopCode) => {
    const schedule = await getStopSchedules(line, stop);
    if (schedule) {
      threadMap.set(`${line}-${stop}`, schedule);
      parentPort?.postMessage({
        line,
        stop: stop,
        ...schedule,
      });
    }
  };

  const loop = async (ignoreUndefined: boolean) => {
    const lineStops = lines
      .flatMap(({ line, stops }) => stops.map((stop) => ({ line, stop })))
      .map(({ stop, line }) => {
        const lastSchedule = threadMap.get(`${line}-${stop.stop}`);
        const allTime = [
          ...(lastSchedule?.schedule.down || []),
          ...(lastSchedule?.schedule.up || []),
        ]
          .map(({ timestamp }) => dayjs(timestamp))
          .sort((a, b) => (a.isSame(b) ? 0 : a.isBefore(b) ? -1 : 1));

        return { line, stop, closestTs: allTime[0] };
      })
      .sort((a, b) => {
        if (!a.closestTs) return 1;
        if (!b.closestTs) return -1;
        return a.closestTs?.isSame(b.closestTs) || a.closestTs === b.closestTs
          ? 0
          : a.closestTs?.isBefore(b.closestTs)
            ? -1
            : 1;
      })
      .map(({ closestTs, ...rest }) => ({
        ...rest,
        closestTs: closestTs?.toISOString(),
      }));

    const promiseThrottle = new (
      PromiseThrottle as unknown as typeof PromiseThrottle.default
    )({
      requestsPerSecond: 1,
      promiseImplementation: Promise,
    });

    await Promise.all(
      (ignoreUndefined
        ? lineStops.filter(({ closestTs }) => closestTs)
        : lineStops
      ).map(({ stop, line }) =>
        promiseThrottle.add(getAndPost.bind(this, line, stop.stop)),
      ),
    );
  };

  let counter = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    counter++;
    await loop(counter % 10 !== 0);
    if (counter >= 100) counter = 0;
  }
}
