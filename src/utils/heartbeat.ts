import { Logger } from 'winston';

// eslint-disable-next-line import/prefer-default-export
export class Heartbeat {
  private logger: Logger;

  private lastHeartbeat: Date;

  private threshold: number;

  private startTime: number = Date.now();

  // default 300 seconds
  constructor(logger: Logger, threshold = 300) {
    this.logger = logger;
    this.lastHeartbeat = new Date();
    this.threshold = threshold;
    setInterval(this.checkHealth.bind(this), threshold * 500); // check every half threashold seconds
  }

  public updateHeartbeat(): void {
    this.lastHeartbeat = new Date();
  }

  public checkHealth(): void {
    const current = new Date();
    if ((current.getTime() - this.lastHeartbeat.getTime()) / 1000 > this.threshold) {
      this.logger.error(
        `Hearbeat timeout, last hearbeat:${
          this.lastHeartbeat
        }, current time:${current}, gap: ${Math.floor(
          (current.getTime() - this.lastHeartbeat.getTime()) / 1000,
        )} seconds, duration: ${Math.floor((current.getTime() - this.startTime) / 1000)} seconds`,
      );
      process.exit(1); // exit the process, pm2 will restart it
    }
  }
}
