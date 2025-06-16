import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectToDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('✅ Connected to the database successfully');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    throw error;
  }
};

export default prisma;
