import { strict as assert } from 'assert';
import { createClient } from 'redis';

// eslint-disable-next-line import/prefer-default-export
export class Subscriber<T> {
  private redisUrl: string;

  private channel: string;

  private consumeFunc: (msg: T) => Promise<void>;

  constructor(consumeFunc: (msg: T) => Promise<void>, channel: string, redisUrl: string) {
    this.consumeFunc = consumeFunc;
    this.channel = channel;
    this.redisUrl = redisUrl;
  }

  async run(): Promise<void> {
    const client = createClient({ url: this.redisUrl });

    client.on('subscribe', (channel: string, count: number) => {
      console.info(
        `Subscribed to ${channel} successfully! There are ${count} subscribers on this channel so far.`,
      );
    });

    client.on('message', (channel: string, message: string) => {
      assert.equal(channel, this.channel);
      const msg = JSON.parse(message) as T;
      this.consumeFunc(msg);
    });

    client.subscribe(this.channel);
  }
}
