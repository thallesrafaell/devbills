import type { FastifyReply, FastifyRequest } from 'fastify';
import admin from 'firebase-admin';

//Extend FastifyRequest to include userId
declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

/**
 * Auth middleware to check if the user is authenticated
 * and attach userId to the request object.
 */

export const authMiddleware = async (
  req: FastifyRequest,
  res: FastifyReply,
): Promise<void> => {
  // Check if the user is authenticated
  const authHeader = req.headers.authorization;

  // If no authorization header is present, return 401 Unauthorized
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.log.error('Unauthorized');
    res.status(401).send('Unauthorized');
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // Attach userId to the request object
    req.userId = decodedToken.uid;
    req.log.info(`User authenticated: ${req.userId}`);
  } catch (error) {
    req.log.error(`Error verifying token: ${error}`);
    // If token verification fails, return 401 Unauthorized
    res.status(401).send('Unauthorized');
    return;
  }
};
