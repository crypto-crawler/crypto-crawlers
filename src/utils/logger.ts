import { createLogger as createLoggerWinston, format, Logger, transports } from 'winston';

export { Logger } from 'winston';

export function createLogger(prefix: string): Logger {
  return createLoggerWinston({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
      // see https://github.com/winstonjs/winston/issues/1217
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.prettyPrint(),
          format.splat(),
          format.simple(),
          format.printf((info) => {
            //  https://github.com/winstonjs/winston/issues/1498
            if (typeof info.message === 'object') {
              info.message = JSON.stringify(info.message, null, 2); // eslint-disable-line no-param-reassign
            }
            return `${info.level}: ${info.message}`;
          }),
        ),
      }),
      new transports.File({
        filename: `logs/${prefix}-${new Date().toISOString().substring(0, 10)}.log`,
      }),
    ],
  });
}
