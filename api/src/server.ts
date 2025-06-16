import app from './app';
import { env } from './config/env';
import { connectToDatabase } from './config/prisma';
import { iniitializeGlobalCategories } from './services/globalCategories.service';
// Carrega variáveis de .env.local

const PORT = env.PORT;

const startServer = async () => {
  try {
    await connectToDatabase();
    await iniitializeGlobalCategories();
    await app.listen({ port: PORT });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();
