import { strict as assert } from 'assert';
import fs from 'fs';
import JSZip from 'jszip';
import mkdirp from 'mkdirp';
import path from 'path';
import { MsgWriter, TimestampMsg } from './msg_writer';

const fsr = require('file-stream-rotator'); // eslint-disable-line @typescript-eslint/no-var-requires

// eslint-disable-next-line import/prefer-default-export
export class RotatedFileWriterNew implements MsgWriter {
  private rootDir: string;

  private filenamePrefix: string;

  private interval: 'Minutely' | 'Hourly' | 'Daily';

  private fileStream: fs.WriteStream;

  constructor(
    rootDir: string,
    filenamePrefix = '',
    interval: 'Minutely' | 'Hourly' | 'Daily' = 'Daily',
  ) {
    this.rootDir = rootDir;
    this.filenamePrefix = filenamePrefix;
    if (!fs.existsSync(rootDir)) {
      mkdirp.sync(rootDir);
    }

    this.interval = interval;

    this.fileStream = this.createWriteStream();
  }

  public async write(msg: TimestampMsg): Promise<void> {
    this.fileStream.write(`${JSON.stringify(msg)}\n`);
  }

  private createWriteStream(): fs.WriteStream {
    const filename = path.join(this.rootDir, `${this.filenamePrefix}%DATE%.json`);
    let frequency = 'daily';
    let dateFormat = 'YYYY-MM-DD';

    switch (this.interval) {
      case 'Minutely':
        frequency = '1m';
        dateFormat = 'YYYY-MM-DD-HH-mm';
        break;
      case 'Hourly':
        frequency = '1h';
        dateFormat = 'YYYY-MM-DD-HH';
        break;
      case 'Daily':
        frequency = 'daily';
        dateFormat = 'YYYY-MM-DD';
        break;
      default:
        throw new Error(`Unknown interval ${this.interval}`);
    }

    const writeStream = fsr.getStream({
      filename,
      frequency,
      verbose: false,
      date_format: dateFormat,
      utc: true,
      end_stream: true,
    });

    writeStream.on('rotate', (oldFile: string, newFile: string): void => {
      // console.info(oldFile, newFile);
      assert.ok(newFile);
      RotatedFileWriterNew.compress(oldFile, oldFile.replace('.json', '.zip'));
    });

    return writeStream;
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
