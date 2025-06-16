import dotenv from 'dotenv';

import app from './app';
import { connectToDatabase } from './config /prisma';
import { iniitializeGlobalCategories } from './services/globalCategories.service';

// Carrega variáveis de .env.local
dotenv.config();

const PORT = Number(process.env.PORT) || 3001;

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
