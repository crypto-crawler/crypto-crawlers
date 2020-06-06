// ['10s', '1m', '3m', '5m', '15m', '30m', '1H', '4H']
export const TIME_BAR_SIZES: { [key: string]: number[] } = {
  BTC: [10, 60, 180, 300, 900, 1800, 3600, 14400],
  ETH: [10, 60, 180, 300, 900, 1800, 3600, 14400],
};

export const TICK_BAR_SIZES: { [key: string]: number[] } = {
  BTC: [4, 8, 16, 32, 64, 128, 50, 100, 200, 500, 1000],
  ETH: [4, 8, 16, 32, 64, 128, 50, 100, 200, 500, 1000],
};

export const VOLUME_BAR_SIZES: { [key: string]: number[] } = {
  BTC: [1, 2, 4, 8, 16, 32],
  ETH: [10, 20, 40, 80, 160, 320],
};

export const DOLLAR_BAR_SIZES: { [key: string]: number[] } = {
  BTC: [1, 2, 4, 8, 16, 32].map((x) => x * 10000),
  ETH: [2000, 4000, 8000, 16000, 32000],
};
