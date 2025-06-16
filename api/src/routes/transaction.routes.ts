import { FastifyInstance } from 'fastify';
import zodToJsonSchema from 'zod-to-json-schema';

import createTransaction from '../controllers/transaction/createTransaction.controller';
import { getTransactions } from '../controllers/transaction/getTransactions.controller';
import {
  createTransactionSchema,
  getTransactionSchema,
} from '../schemas/transaction.schema';

const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {
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
};

export default transactionRoutes;
