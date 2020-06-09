export interface TimestampMsg {
  exchange: string;
  pair?: string;
  timestamp: number;
}

export interface MsgWriter {
  // eslint-disable-next-line @typescript-eslint/ban-types
  write(message: TimestampMsg): Promise<void>;
}
