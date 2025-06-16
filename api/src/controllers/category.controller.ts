import { FastifyReply, FastifyRequest } from 'fastify';

import prisma from '../config/prisma';

export const getCategory = async (
  req: FastifyRequest,
  res: FastifyReply,
): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    res.send(categories);
  } catch (error) {
    req.log.error('Error fetching categories:', error);
    res.status(500).send('Internal Server Error');
  }
};
