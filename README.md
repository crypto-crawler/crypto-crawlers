# crypto-crawlers

The All-in-one Solution to crawl data from cryptocurrency exchanges.

## Download Data

**For most people, don't bother to run crawlers, I'm publishing data via [Syncthing](https://syncthing.net/), the sharing key is XXX**. Data is published hourly.

Directory structure:

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
