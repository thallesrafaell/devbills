import { FastifyReply, FastifyRequest } from 'fastify';

import prisma from '../../config/prisma';
import {
  CreateTransactionSchema,
  createTransactionSchema,
} from '../../schemas/transaction.schema';

const createTransaction = async (
  req: FastifyRequest<{ Body: CreateTransactionSchema }>,
  res: FastifyReply,
) => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).send('Unauthorized');
    return;
  }

  const result = createTransactionSchema.safeParse(req.body);
  // Validate the request body against the schema
  if (!result.success) {
    const message = result.error.errors[0].message || 'Invalid request body';
    res.status(400).send({ error: message });
    return;
  }
  // Info validated
  const transaction = result.data;

  try {
    const parsedDate = new Date(transaction.date);
    const category = await prisma.category.findUnique({
      where: { id: transaction.categoryId, type: transaction.type },
    });

    if (!category) {
      res.status(404).send({ error: 'Category not found' });
      return;
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parsedDate,
      },
      include: {
        category: true,
      },
    });

    res.status(201).send(newTransaction);
  } catch (error) {
    req.log.error('Error creating transaction:', error);
    res.status(500).send('Internal Server Error');
    return;
  }
};

export default createTransaction;
