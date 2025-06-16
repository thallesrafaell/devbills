import { FastifyInstance } from 'fastify';

import { getCategory } from '../controllers/category.controller';

const categoryRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/', getCategory);
};

export default categoryRoutes;
