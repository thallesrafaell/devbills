import { TransactionType } from '@prisma/client';

import { CategorySummary } from './catetgory.type';

export interface TransactionFilter {
  userId: string;
  date?: {
    gte: Date;
    lte: Date;
  };
  type?: TransactionType;
  categoryId?: string;
}

export interface Summary {
  totalExpense: number;
  totalIncome: number;
  totalBalance: number;
  expenseByCategory: CategorySummary[];
  lastFourMonths: MonthSummary[];
}

export interface MonthSummary {
  month: string;
  year: number;
  income: number;
  expense: number;
  balance: number;
}

//{
//name: 'Março',
//despesas: 3200,
//receitas: 4500,
//saldo: 1300, // receitas - despesas
//}
