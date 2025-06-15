import type { FastifyInstance } from 'fastify';

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
}

export default routes;
