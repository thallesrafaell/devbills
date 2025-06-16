import { TransactionType } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

const isValidObjectId = (value: string): boolean => ObjectId.isValid(value);

export const createTransactionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z
    .number()
    .positive('Amount must be a positive number')
    .min(0, 'Amount must be at least 0'),
  date: z.coerce.date({
    errorMap: () => ({ message: 'Invalid date format' }),
  }),
  categoryId: z.string().refine(isValidObjectId, {
    message: 'Invalid category ID',
  }),
  type: z.enum([TransactionType.income, TransactionType.expense], {
    errorMap: () => ({ message: 'Type must be either "income" or "expense"' }),
  }),
});
