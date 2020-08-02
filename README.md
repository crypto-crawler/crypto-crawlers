# crypto-crawlers

The All-in-one Solution to crawl data from cryptocurrency exchanges.

## Download Data

**For most people, don't bother to run crawlers, I'm publishing data to the following places**:

1. [Baidu NetDisk(百度网盘)](https://pan.baidu.com/s/187YGeS5LHuJruq57zZLvmg), code: 3142.
2. BitTorrent. See the table below.

**Download Links:**

| File Name | Compressed Size | Original Size | Magnet Link | Comment |
| --- | --- | --- | --- | --- |
| trade-2020-04.zip | 1.2G | 13G | magnet:?xt=urn:btih:2de10098310245057d6fe1081db0aee88f2e5481&dn=trade-2020-04.zip&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969 | April 2020 |
| trade-2020-05.zip | 12G | 167.0G | magnet:?xt=urn:btih:69fda39b186d68d60dc22253cd2f4a12b3944a49&dn=trade-2020-05.zip&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969 | May 2020 |
| trade-2020-06.zip | 6.4G | 94.8G | magnet:?xt=urn:btih:dcdbe1ae0ef476ce374784c63b467b2b6c2a8dd9&dn=trade-2020-06.zip&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969 | June 2020 |
| trade-2020-07.zip | 8.6G | 123.8G | in Baidupan | July 2020 |

The more seeders, the faster speed. Please help each other by seeding.

## How to run

## 1. Prerequisites

1. Install NodeJS
1. Run a Redis server at `localhost:6379`
1. Change the `DATA_DIR` variable in `.envrc` and load this file via `direnv`

### 2. Install typescript and pm2 globally

```bash
npm install typescript pm2 -g
```

### 3. Compile

```bash
npm install
npm run build
```

### 4. Run all crawlers

```bash
pm2 start pm2.misc.config.json
pm2 start pm2.trade.config.js
```

## How to contribute

Open this project in VSCode and you're all set.
