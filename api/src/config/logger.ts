import pino from 'pino';

import { env } from './env';

const logger = pino({
  level: env.NODE_ENV === 'dev' ? 'info' : 'error',
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: ['*.password', '*.token', '*.secret'],
    censor: '**REDACTED**',
  },
  ...(process.env.NODE_ENV !== 'production' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  }),
});

export default logger;
