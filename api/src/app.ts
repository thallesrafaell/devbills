import cors from '@fastify/cors';
import Fastify, { FastifyInstance } from 'fastify';

import { env } from './config/env';
import routes from './routes';
//Initialize Fastify instance
const app: FastifyInstance = Fastify({
  logger: {
    level: env.NODE_ENV === 'dev' ? 'info' : 'error',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        colorize: true,
      },
    },
  },
});

// Register CORS plugin
app.register(cors, {
  origin: 'http://localhost:5173', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
});

// Register routes
app.register(routes, { prefix: '/api' });

// export the Fastify instance
export default app;
