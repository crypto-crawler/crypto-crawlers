import { createClient, RedisClient } from 'redis';

// eslint-disable-next-line import/prefer-default-export
export class Publisher<T> {
  private client: RedisClient;

  constructor(redisUrl: string) {
    this.client = createClient({ url: redisUrl });
  }

  async publish(topic: string, msg: T): Promise<void> {
    this.client.publish(topic, JSON.stringify(msg));
  }
}
