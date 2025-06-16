import app from './app';
import { env } from './config/env';
import initializeFirebaseAdmin from './config/firebase';
import logger from './config/logger';
import prisma, { connectToDatabase } from './config/prisma';
import { iniitializeGlobalCategories } from './services/globalCategories.service';

const PORT = env.PORT;

// Initialize Firebase Admin SDK
initializeFirebaseAdmin();

const startServer = async () => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Initialize global categories
    await iniitializeGlobalCategories();

    // Start the Fastify server
    await app.listen({ port: PORT });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing HTTP server');
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
});
