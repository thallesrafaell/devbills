import type { FastifyInstance } from 'fastify';

import categoryRoutes from './categorie.routes';
import transactionRoutes from './transaction.routes';

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      nodeVersion: process.version,
      platform: process.platform,
    };
  });

  // Register other routes here
  fastify.register(categoryRoutes, { prefix: '/categories' });
  fastify.register(transactionRoutes, { prefix: '/transactions' });
}

export default routes;
