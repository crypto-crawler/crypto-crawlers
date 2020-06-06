import fs from 'fs';
import JSZip from 'jszip';
import mkdirp from 'mkdirp';
import path from 'path';
import { MsgWriter, TimestampMsg } from './msg_writer';

// eslint-disable-next-line import/prefer-default-export
export class RotatedFileWriter implements MsgWriter {
  private rootDir: string;

  private interval: 'Minutely' | 'Hourly' | 'Daily' = 'Hourly';

  private timestamp: number; // current

  private fileStream: fs.WriteStream;

  constructor(rootDir: string, interval: 'Minutely' | 'Hourly' | 'Daily' = 'Hourly') {
    this.rootDir = rootDir;
    if (!fs.existsSync(rootDir)) {
      mkdirp.sync(rootDir);
    }

    this.interval = interval;

    const intervalMilliseconds = RotatedFileWriter.getIntervalMilliseconds(this.interval);
    this.timestamp = Math.floor(Date.now() / intervalMilliseconds) * intervalMilliseconds;

    this.fileStream = this.createWriteStream();
  }

  public async write(msg: TimestampMsg): Promise<void> {
    if (msg.timestamp < this.timestamp) return; // timeout, ignore this message

    const intervalMilliseconds = RotatedFileWriter.getIntervalMilliseconds(this.interval);
    const nextTimestamp = this.timestamp + intervalMilliseconds;

    if (msg.timestamp >= nextTimestamp) {
      const fileIn = this.fileStream.path as string;
      this.fileStream.end(() => {
        RotatedFileWriter.compress(fileIn, fileIn.replace('.json', '.zip'));
      });
      this.timestamp = nextTimestamp;
      this.fileStream = this.createWriteStream();
    }

    this.fileStream.write(`${JSON.stringify(msg)}\n`);
  }

  private static getIntervalMilliseconds(
    interval: 'Minutely' | 'Hourly' | 'Daily' = 'Hourly',
  ): number {
    switch (interval) {
      case 'Minutely':
        return 60 * 1000;
      case 'Hourly':
        return 3600 * 1000;
      case 'Daily':
        return 24 * 3600 * 1000;
      default:
        throw new Error(`Unknown interval ${interval}`);
    }
  }

  private createWriteStream(): fs.WriteStream {
    let filename = '';
    switch (this.interval) {
      case 'Minutely':
        filename = `${new Date(this.timestamp).toISOString().slice(0, 16)}.json`;
        break;
      case 'Hourly':
        filename = `${new Date(this.timestamp).toISOString().slice(0, 13)}.json`;
        break;
      case 'Daily':
        filename = `${new Date(this.timestamp).toISOString().slice(0, 10)}.json`;
        break;
      default:
        throw new Error(`Unknown interval ${this.interval}`);
    }

    const filePath = path.join(this.rootDir, filename);

    return fs.createWriteStream(filePath, {
      flags: 'a',
      encoding: 'utf8',
    });
  }

  private static async compress(fileIn: string, fileOut: string): Promise<void> {
    const zip = new JSZip();
    zip.file(path.parse(fileIn).base, fs.readFileSync(fileIn, 'utf8'));
    zip
      .generateNodeStream({
        type: 'nodebuffer',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 9,
        },
        streamFiles: true,
      })
      .pipe(fs.createWriteStream(fileOut))
      .on('finish', () => {
        fs.unlinkSync(fileIn);
      });
  }
}
