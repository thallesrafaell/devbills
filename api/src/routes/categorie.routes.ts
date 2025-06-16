import { FastifyInstance } from 'fastify';

import logger from '../config/logger';
import { getCategory } from '../controllers/category.controller';

const categoryRoutes = async (fastify: FastifyInstance): Promise<void> => {
  logger.info('Registering category routes');
  fastify.get('/', getCategory);
  logger.info('Category routes registered successfully');
};

export default categoryRoutes;
