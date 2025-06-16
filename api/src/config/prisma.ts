import { PrismaClient } from '@prisma/client';

import logger from './logger';

const prisma = new PrismaClient();

export const connectToDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info('Successfully connected to the database');
  } catch (error) {
    logger.error('Error connecting to the database:', error);
    throw error;
  }
};

export default prisma;
