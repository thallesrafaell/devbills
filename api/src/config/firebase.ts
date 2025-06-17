import admin from 'firebase-admin';

import { env } from './env';
import logger from './logger';

const initializeFirebaseAdmin = (): void => {
  if (admin.apps.length > 0) {
    logger.info('Firebase Admin already initialized');
    return;
  }
  // Check if required environment variables are set
  if (
    !env.FIREBASE_PROJECT_ID ||
    !env.FIREBASE_CLIENT_EMAIL ||
    !env.FIREBASE_PRIVATE_KEY
  ) {
    logger.error('Missing Firebase configuration environment variables');
    throw new Error(
      'Firebase configuration is incomplete. Please check your environment variables.',
    );
  }

  try {
    if (admin.apps.length === 0) {
      if (env.FIREBASE_PROJECT_ID) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: env.FIREBASE_PROJECT_ID,
            clientEmail: env.FIREBASE_CLIENT_EMAIL,
            privateKey: env.FIREBASE_PRIVATE_KEY,
          }),
        });
      }
    }
    logger.info('Firebase Admin initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Firebase Admin:', error);
  }
};

export default initializeFirebaseAdmin;
