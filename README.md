# crypto-crawlers

The All-in-one Solution to crawl data from cryptocurrency exchanges.

## Download Data

**For most people, don't bother to run crawlers, I'm publishing data to the following places**:

1. BaiduNetDisk <https://pan.baidu.com/s/187YGeS5LHuJruq57zZLvmg>, code: 3142.
2. [Syncthing](https://syncthing.net/), the device ID is WKQ5RQX-JKO563V-R7ASK74-QPBWTXA-DK3F7FU-DVSDMDJ-FZUNZN3-O2RENQF. A new connected client needs to be approved manually by me, so this way is not scalable.

Data is published hourly.

Directory structure:

```text
trade              # trade messages, a.k.a., filled orders
└── Binance-Swap
    └── BTC_USDT
    └── ETH_USDT
        └── 2020-06-06T12.zip
        └── 2020-06-06T13.zip
spot_index_price   # Spot index price from OKEx
└── OKEx-BTC_USDT
    └── 2020-06-06T12.zip
    └── 2020-06-06T13.zip
spot_index_price_kline
└── OKEx-BTC_USDT  # Spot index price klines from OKEx
    └── 2020-06-06T12.zip
    └── 2020-06-06T13.zip
```

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
