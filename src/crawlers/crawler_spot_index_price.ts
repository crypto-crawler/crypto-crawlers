import { strict as assert } from 'assert';
import { crawlIndex, IndexKlineMsg, IndexTickerMsg } from 'crypto-crawler/dist/crawler/okex';
import fetchMarkets from 'crypto-markets';
import path from 'path';
import yargs from 'yargs';
import { MsgWriter, Publisher, RotatedFileWriter } from '../utils';
import { Heartbeat } from '../utils/heartbeat';
import { createLogger } from '../utils/logger';
import { REDIS_TOPIC_SPOT_INDEX_PRICE } from './common';

const commandModule: yargs.CommandModule = {
  command: 'crawler_spot_index_price',
  describe: 'Crawl Spot index price',
  // eslint-disable-next-line no-shadow
  builder: (yargs) => yargs.options({}),
  handler: async () => {
    const swapMarkets = (await fetchMarkets('OKEx', 'Swap')).filter((m) => m.active);
    const okexIndexPairs = swapMarkets.map((m) => m.pair);

    assert.ok(process.env.PAIRS, 'Please define the PAIRS environment variable');
    const pairs = process.env.PAIRS!.split(' ').filter((x) => okexIndexPairs.includes(x));
    assert.ok(pairs.length > 0);

    const logger = createLogger(`crawler-spot-index-price`);
    const heartbeat = new Heartbeat(logger, 60);

    assert.ok(process.env.DATA_DIR, 'Please define a DATA_DIR environment variable in .envrc');

    const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

    const publisher = new Publisher<IndexTickerMsg>(REDIS_URL);
    const klinePublisher = new Publisher<IndexKlineMsg>(REDIS_URL);

    const fileWriters: { [key: string]: MsgWriter } = {};
    pairs.forEach((pair) => {
      fileWriters[pair] = new RotatedFileWriter(
        path.join(process.env.DATA_DIR!, 'spot_index_price', `OKEx-${pair}`),
      );
    });

    const klineFileWriters = new Map<string, MsgWriter>();

    // key=${exchange}-${pair}-${interval}
    const mymap = new Map<string, IndexKlineMsg>();

    crawlIndex(
      pairs,
      ['Ticker', 'Kline'],
      async (msg: IndexTickerMsg | IndexKlineMsg): Promise<void> => {
        heartbeat.updateHeartbeat();

        if ((msg as IndexKlineMsg).interval) {
          const klineMsg = msg as IndexKlineMsg;
          const key = `OKEx-${klineMsg.pair}-${klineMsg.interval}`;

          if (mymap.has(key)) {
            const prev = mymap.get(key)!;
            if (msg.timestamp > prev.timestamp) {
              klinePublisher.publish(
                `brick-mover:spot_index_price_kline_${klineMsg.interval}`,
                prev,
              );

              if (!klineFileWriters.has(key)) {
                klineFileWriters.set(
                  key,
                  new RotatedFileWriter(
                    path.join(
                      process.env.DATA_DIR!,
                      'spot_index_price_kline',
                      'OKEx',
                      `${klineMsg.interval}-${klineMsg.pair}`,
                    ),
                  ),
                );
              }

              klineFileWriters.get(key)!.write(prev);
            }
          }
          mymap.set(key, klineMsg);
        } else {
          const tickerMsg = msg as IndexTickerMsg;

          publisher.publish(REDIS_TOPIC_SPOT_INDEX_PRICE, tickerMsg);

          fileWriters[tickerMsg.pair].write(tickerMsg);
        }
      },
    );
  },
};

export default commandModule;
