import { Category, TransactionType } from '@prisma/client';

import logger from '../config/logger';
import prisma from '../config/prisma';
type GlobalCategoryInput = Pick<Category, 'name' | 'color' | 'type'>;

const globalCategories: GlobalCategoryInput[] = [
  // Despesas
  { name: 'Alimentação', color: '#FF5733', type: TransactionType.expense },
  { name: 'Transporte', color: '#33A8FF', type: TransactionType.expense },
  { name: 'Moradia', color: '#33FF57', type: TransactionType.expense },
  { name: 'Saúde', color: '#F033FF', type: TransactionType.expense },
  { name: 'Educação', color: '#FF3366', type: TransactionType.expense },
  { name: 'Lazer', color: '#FFBA33', type: TransactionType.expense },
  { name: 'Compras', color: '#33FFF6', type: TransactionType.expense },
  { name: 'Outros', color: '#B033FF', type: TransactionType.expense },

  // Receitas
  { name: 'Salário', color: '#33FF57', type: TransactionType.income },
  { name: 'Freelance', color: '#33A8FF', type: TransactionType.income },
  { name: 'Investimentos', color: '#FFBA33', type: TransactionType.income },
  { name: 'Outros', color: '#B033FF', type: TransactionType.income },
];

export const iniitializeGlobalCategories = async (): Promise<Category[]> => {
  const createCategory: Category[] = [];
  for (const category of globalCategories) {
    try {
      const existingCategory = await prisma.category.findFirst({
        where: {
          name: category.name,
          type: category.type,
        },
      });
      if (!existingCategory) {
        const newCategory = await prisma.category.create({
          data: {
            name: category.name,
            color: category.color,
            type: category.type,
          },
        });
        logger.info(`Category "${newCategory.name}" created successfully.`);
      }
    } catch (error) {
      logger.error(`Failed to create category "${category.name}": ${error}`);
      throw new Error(`Failed to create category "${category.name}": ${error}`);
    }
  }
  if (createCategory.length === 0) {
    logger.info(
      'No new categories were created. All global categories already exist.',
    );
  }
  return createCategory;
};
