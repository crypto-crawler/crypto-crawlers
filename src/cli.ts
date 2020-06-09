#!/usr/bin/env node
import yargs from 'yargs';
import crawlerHB10Module from './crawlers/crawler_hb10';
import crawlerSpotIndexPriceModule from './crawlers/crawler_spot_index_price';
import crawlerTradeModule from './crawlers/crawler_trade';

// eslint-disable-next-line no-unused-expressions
yargs
  .command(crawlerHB10Module)
  .command(crawlerSpotIndexPriceModule)
  .command(crawlerTradeModule)
  .wrap(null)
  .demandCommand(1, '').argv;
