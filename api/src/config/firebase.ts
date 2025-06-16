import admin from 'firebase-admin';

import { env } from './env';
import logger from './logger';

const initializeFirebaseAdmin = (): void => {
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
    } else {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
    logger.info('Firebase Admin initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Firebase Admin:', error);
  }
};

export default initializeFirebaseAdmin;
