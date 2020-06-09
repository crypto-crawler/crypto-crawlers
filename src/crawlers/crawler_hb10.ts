import { strict as assert } from 'assert';
import { crawlHB10, HB10IndexMsg } from 'crypto-crawler/dist/crawler/huobi';
import path from 'path';
import yargs from 'yargs';
import { Publisher, RotatedFileWriterNew } from '../utils';
import { Heartbeat } from '../utils/heartbeat';
import { createLogger } from '../utils/logger';

const commandModule: yargs.CommandModule = {
  command: 'crawler_hb10',
  describe: 'Crawl Huobi HB10 Index',
  // eslint-disable-next-line no-shadow
  builder: (yargs) => yargs.options({}),
  handler: async () => {
    const logger = createLogger(`crawler-hb10`);
    const heartbeat = new Heartbeat(logger);

    assert.ok(process.env.DATA_DIR, 'Please define a DATA_DIR environment variable in .envrc');

    const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

    const publisher = new Publisher<HB10IndexMsg>(REDIS_URL);
    // interval -> writer
    const fileWriters = new Map<string, RotatedFileWriterNew>();

    crawlHB10(
      async (msg: HB10IndexMsg): Promise<void> => {
        heartbeat.updateHeartbeat();

        if (!fileWriters.has(msg.interval)) {
          fileWriters.set(
            msg.interval,
            new RotatedFileWriterNew(
              path.join(process.env.DATA_DIR!, 'Kline', 'hb10', msg.interval),
            ),
          );
        }

        publisher.publish(`brick-mover:hb10_kline_${msg.interval}`, msg);
        fileWriters.get(msg.interval)!.write(msg);
      },
    );
  },
};

export default commandModule;
