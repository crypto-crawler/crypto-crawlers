import { Msg } from 'crypto-crawler';

export const REDIS_TOPIC_PREFIX = 'crypto-trader';

// Topics
// eslint-disable-next-line import/prefer-default-export
export function calcRedisTopic(msg: Msg): string {
  switch (msg.channelType) {
    case 'BBO':
      return `${REDIS_TOPIC_PREFIX}:bbo-${msg.exchange}-${msg.marketType}`;
    case 'Ticker':
      return `${REDIS_TOPIC_PREFIX}:ticker-${msg.exchange}-${msg.marketType}`;
    case 'Trade':
      return `${REDIS_TOPIC_PREFIX}:trade-${msg.exchange}-${msg.marketType}`;
    default:
      throw new Error(`Unknown channelType ${msg.channelType}`);
  }
}

export const REDIS_TOPIC_SPOT_INDEX_PRICE = `${REDIS_TOPIC_PREFIX}:spot_index_price`;
