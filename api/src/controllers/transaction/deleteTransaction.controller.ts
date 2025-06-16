import { FastifyReply, FastifyRequest } from 'fastify';

import prisma from '../../config/prisma';
import { DeleteTransactionSchema } from '../../schemas/transaction.schema';

export const deleteTransaction = async (
  req: FastifyRequest<{ Params: DeleteTransactionSchema }>,
  res: FastifyReply,
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    req.log.error('User not authenticated');
    res.status(401).send('Unauthorized');
    return;
  }

  const { transactionId } = req.params;

  // Validate transaction ID
  if (!transactionId) {
    req.log.error('Transaction ID is required');
    res.status(400).send('Transaction ID is required');
    return;
  }
  try {
    await prisma.transaction.delete({
      where: {
        id: transactionId,
        userId: userId, // Ensure the transaction belongs to the authenticated user
      },
    });
    res.status(204).send(); // No content response
  } catch (error: unknown) {
    req.log.error(`Error deleting transaction: ${error}`);
    if (error instanceof Error) {
      res.status(500).send('Internal Server Error: ' + error.message);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
};
