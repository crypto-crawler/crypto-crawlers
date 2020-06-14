import { strict as assert } from 'assert';
import { crawlInstrument } from 'crypto-crawler/dist/crawler/bitmex';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import yargs from 'yargs';
import { Publisher } from '../utils';
import { Heartbeat } from '../utils/heartbeat';
import { createLogger } from '../utils/logger';

const commandModule: yargs.CommandModule = {
  command: 'crawler_bitmex_instrument',
  describe: 'Crawl BitMEX instrument',
  // eslint-disable-next-line no-shadow
  builder: (yargs) => yargs.options({}),
  handler: async () => {
    const logger = createLogger(`crawler-BitMEX-instrument`);
    const heartbeat = new Heartbeat(logger);

    assert.ok(process.env.DATA_DIR, 'Please define a DATA_DIR environment variable in .envrc');

    const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

    const publisher = new Publisher<string>(REDIS_URL);

    if (!fs.existsSync(path.join(process.env.DATA_DIR!, 'Index', 'BitMEX'))) {
      mkdirp.sync(path.join(process.env.DATA_DIR!, 'Index', 'BitMEX'));
    }
    const fileStream = fs.createWriteStream(
      path.join(process.env.DATA_DIR!, 'Index', 'BitMEX', 'instruments.json'),
      {
        flags: 'a',
        encoding: 'utf8',
      },
    );

    await crawlInstrument(
      async (msg: string): Promise<void> => {
        heartbeat.updateHeartbeat();

        fileStream.write(`${msg}\n`);

        publisher.publish('brick-mover:bitmex_instrument', msg);
      },
    );
  },
};

export default commandModule;
