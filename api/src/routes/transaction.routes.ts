import { FastifyInstance } from 'fastify';
import zodToJsonSchema from 'zod-to-json-schema';

import logger from '../config/logger';
import createTransaction from '../controllers/transaction/createTransaction.controller';
import { deleteTransaction } from '../controllers/transaction/deleteTransaction.controller';
import { getTransactions } from '../controllers/transaction/getTransactions.controller';
import { getTransactionsSummary } from '../controllers/transaction/getTransactionsSummary.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionSchema,
  getTransactionsSummarySchema,
} from '../schemas/transaction.schema';

const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {
  logger.info('Registering transaction routes');
  fastify.addHook('preHandler', authMiddleware);

  // Define the route for creating a transaction
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });
  // Define the route for getting transaction by date
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: zodToJsonSchema(getTransactionSchema),
    },
    handler: getTransactions,
  });

  // Define the route for getting resume by date
  fastify.route({
    method: 'GET',
    url: '/resume',
    schema: {
      querystring: zodToJsonSchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });

  // Define the route for deleting a transaction
  fastify.route({
    method: 'DELETE',
    url: '/:transactionId',
    schema: {
      params: zodToJsonSchema(deleteTransactionSchema),
    },
    handler: deleteTransaction,
  });
  logger.info('Transaction routes registered successfully');
};

export default transactionRoutes;
