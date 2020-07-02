# crypto-crawlers

The All-in-one Solution to crawl data from cryptocurrency exchanges.

## Download Data

**For most people, don't bother to run crawlers, I'm publishing data to the following places**:

1. BaiduNetDisk <https://pan.baidu.com/s/187YGeS5LHuJruq57zZLvmg>, code: 3142.
2. BitTorrent. See the table below.

**Download Links:**

| File Name | Size | Magnet Link | Comment |
| --- | --- | --- | --- |
| trade-2020-04.zip | 1.2G | magnet:?xt=urn:btih:0687d9b0cd1fea2908131845c6adb83796cdeef7&dn=trade-2020-04.zip&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969 | April 2020 |
| trade-2020-05.zip | 12G | magnet:?xt=urn:btih:029302fcc40a9a8bf322933da22aacf85744d116&dn=trade-2020-05.zip&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969 | May 2020 |
| trade-202006.zip | 6.4G | magnet:?xt=urn:btih:dcdbe1ae0ef476ce374784c63b467b2b6c2a8dd9&dn=trade-2020-06.zip&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969 | June 2020 |

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
