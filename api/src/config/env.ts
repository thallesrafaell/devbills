import dotenv from 'dotenv';
// src/config/env.ts
import { z } from 'zod';

// import dotenv from 'dotenv';
dotenv.config();

// Define settings for environment variables using Zod
const envSchema = z.object({
  // Variables required for the application to run
  PORT: z.string().transform(Number).default('3000'),
  NODE_ENV: z.enum(['dev', 'prod', 'test']),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),
  CORS_ORIGIN: z.string(),

  // Firebase variables
  FIREBASE_TYPE: z.string().optional(),
  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_PRIVATE_KEY_ID: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_CLIENT_ID: z.string().optional(),
  FIREBASE_AUTH_URI: z.string().optional(),
  FIREBASE_TOKEN_URI: z.string().optional(),
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: z.string().optional(),
  FIREBASE_CLIENT_X509_CERT_URL: z.string().optional(),
});

// Validate the environment variables against the schema
const _env = envSchema.safeParse(process.env);

// If validation fails, log errors and terminate the application
if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

// Export validated and typed environment variables
export const env = _env.data;
