import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FastifyReply, FastifyRequest } from 'fastify';

import prisma from '../../config/prisma';
import { GetTransactionSchema } from '../../schemas/transaction.schema';
import { TransactionFilter } from '../../types/transaction.types';

dayjs.extend(utc);

export const getTransactions = async (
  req: FastifyRequest<{ Querystring: GetTransactionSchema }>,
  res: FastifyReply,
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).send('Unauthorized');
    return;
  }

  const { month, type, year, categoryId } = req.query;
  const filter: TransactionFilter = {
    userId,
  };

  if (year && month) {
    const startDate = dayjs
      .utc(`${year}-${month}-01`)
      .startOf('month')
      .toDate();
    const endDate = dayjs.utc(startDate).endOf('month').toDate();
    filter.date = {
      gte: startDate,
      lte: endDate,
    };
  }

  if (type) filter.type = type;
  if (categoryId) filter.categoryId = categoryId;

  try {
    const transactions = await prisma.transaction.findMany({
      where: filter,
      orderBy: {
        date: 'desc',
      },
      include: {
        category: {
          select: {
            color: true,
            name: true,
            type: true,
          },
        },
      },
    });

    res.send(transactions);
  } catch (error) {
    req.log.error('Error fetching transactions:', error);
    res.status(500).send('Internal Server Error');
    return;
  }
};
