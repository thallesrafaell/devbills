import 'dayjs/locale/pt-br'; // Adicione esta linha para importar o locale português

import { TransactionType } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FastifyReply, FastifyRequest } from 'fastify';

import prisma from '../../config/prisma';
import { GetTransactionsSummarySchema } from '../../schemas/transaction.schema';
import { CategorySummary } from '../../types/catetgory.type';
import { Summary } from '../../types/transaction.types';

dayjs.extend(utc);
dayjs.locale('pt-br');

export const getTransactionsSummary = async (
  req: FastifyRequest<{ Querystring: GetTransactionsSummarySchema }>,
  res: FastifyReply,
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    req.log.error('User not authenticated');
    res.status(401).send('Unauthorized');
    return;
  }
  const { month, year } = req.query;

  // Validate month and year
  if (!month || !year) {
    req.log.error('Month and year are required');
    res.status(400).send('Month and year are required');
    return;
  }

  // Validate month format (MM) and year format (YYYY)
  const startDate = dayjs.utc(`${year}-${month}-01`).startOf('month').toDate();
  const endDate = dayjs.utc(startDate).endOf('month').toDate();

  try {
    // Fetch transactions for the user within the specified date range
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    });

    // Initialize summary variables
    let totalExpense = 0;
    let totalIncome = 0;
    const groupedExpenses = new Map<string, CategorySummary>();

    //Agroup transactions by category and calculate totals
    for (const transaction of transactions) {
      if (transaction.type === TransactionType.expense) {
        totalExpense += transaction.amount;

        const existing = groupedExpenses.get(transaction.categoryId) ?? {
          categoryId: transaction.category.id,
          categoryName: transaction.category.name,
          categoryColor: transaction.category.color,
          amount: 0,
          percentage: 0,
        };

        existing.amount += transaction.amount;
        groupedExpenses.set(transaction.categoryId, existing);
      } else {
        totalIncome += transaction.amount;
      }
    }

    // Log the total income and expense for debugging
    const lastFourMonths = Array.from({ length: 4 }, (_, i) => {
      const date = dayjs
        .utc()
        .subtract(3 - i, 'month')
        .startOf('month');

      const start = date.toDate();
      const end = date.endOf('month').toDate();
      return {
        date, // keep the dayjs object for later use
        month:
          date.format('MMMM').charAt(0).toUpperCase() +
          date.format('MMMM').slice(1),

        year: date.year(),
        start,
        end,
      };
    });

    // Fetch transactions for the last four months
    const lastFourMonthsTransactions = await Promise.all(
      lastFourMonths.map(async ({ date, start, end }) => {
        const transactions = await prisma.transaction.findMany({
          where: {
            userId,
            date: {
              gte: start,
              lte: end,
            },
          },
          include: {
            category: true,
          },
        });
        let monthIncome = 0;
        let monthExpense = 0;
        const monthGroupedExpenses = new Map<string, CategorySummary>();
        for (const transaction of transactions) {
          if (transaction.type === TransactionType.expense) {
            monthExpense += transaction.amount;

            const existing = monthGroupedExpenses.get(
              transaction.categoryId,
            ) ?? {
              categoryId: transaction.category.id,
              categoryName: transaction.category.name,
              categoryColor: transaction.category.color,
              amount: 0,
              percentage: 0,
            };

            existing.amount += transaction.amount;
            monthGroupedExpenses.set(transaction.categoryId, existing);
          } else {
            monthIncome += transaction.amount;
          }
        }
        return {
          month:
            date.format('MMMM').charAt(0).toUpperCase() +
            date.format('MMMM').slice(1),

          year: date.year(),
          income: monthIncome,
          expense: monthExpense,
          balance: monthIncome - monthExpense,
        };
      }),
    );

    console.log('Last four months transactions:', lastFourMonthsTransactions);

    // Prepare the summary object
    const summary: Summary = {
      totalIncome,
      totalExpense,
      totalBalance: totalIncome - totalExpense,
      expenseByCategory: Array.from(groupedExpenses.values())
        .map(entry => ({
          ...entry,
          percentage: Number.parseFloat(
            ((entry.amount / totalExpense) * 100).toFixed(2),
          ),
        }))
        .sort((a, b) => b.amount - a.amount),
      lastFourMonths: lastFourMonthsTransactions,
    };

    res.send(summary);
  } catch (error) {
    req.log.error('Error fetching transactions:', error);
    res.status(500).send('Internal Server Error');
    return;
  }
};
