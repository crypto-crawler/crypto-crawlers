/* eslint-disable @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-var-requires */
const assert = require('assert').strict;
const exchangePairs = require('./exchange_pairs');

assert.ok(process.env.DATA_DIR, 'Please define the DATA_DIR environment variable in .envrc');

const PAIRS = (process.env.PAIRS || ' ').split(' ').filter((x) => x);

const TICKER_EXCHANGES = ['Binance', 'Bitfinex', 'Huobi', 'OKEx'];

const apps = [];

Object.keys(exchangePairs)
  .filter((ex) => TICKER_EXCHANGES.includes(ex))
  .forEach((exchange) => {
    Object.keys(exchangePairs[exchange]).forEach((marketType) => {
      let pairs = exchangePairs[exchange][marketType];
      if (PAIRS.length > 0) {
        pairs = pairs.filter((x) => PAIRS.includes(x));
      }
      if (pairs.length <= 0) return;

      const app = {
        name: `crawler-ticker-${exchange}-${marketType}`,
        script: 'dist/cli.js',
        args: `crawler_ticker ${exchange} ${marketType} --pairs ${pairs.join(' ')}`,
        instances: 1,
        autorestart: true,
        watch: false,
      };

      apps.push(app);
    });
  });

module.exports = {
  apps,
};
