#!/usr/bin/env node
import yargs from 'yargs';
import crawlerSpotIndexPriceModule from './crawlers/crawler_spot_index_price';
import crawlerTradeModule from './crawlers/crawler_trade';

// eslint-disable-next-line no-unused-expressions
yargs
  .command(crawlerSpotIndexPriceModule)
  .command(crawlerTradeModule)
  .wrap(null)
  .demandCommand(1, '').argv;
