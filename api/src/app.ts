import Fastify, { FastifyInstance } from 'fastify';

import routes from './routes';
//Initialize Fastify instance
const app: FastifyInstance = Fastify({
  logger: true,
});

// Register routes
app.register(routes);

// export the Fastify instance
export default app;
