#!/usr/bin/env node
import yargs from 'yargs';
import crawlerBitMEXInstrumentModule from './crawlers/crawler_bitmex_instrument';
import crawlerHB10Module from './crawlers/crawler_hb10';
import crawlerSpotIndexPriceModule from './crawlers/crawler_spot_index_price';
import crawlerTickerModule from './crawlers/crawler_ticker';
import crawlerTradeModule from './crawlers/crawler_trade';

// eslint-disable-next-line no-unused-expressions
yargs
  .command(crawlerBitMEXInstrumentModule)
  .command(crawlerHB10Module)
  .command(crawlerSpotIndexPriceModule)
  .command(crawlerTickerModule)
  .command(crawlerTradeModule)
  .wrap(null)
  .demandCommand(1, '').argv;
