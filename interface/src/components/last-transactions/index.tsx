import { HistoryIcon } from 'lucide-react';
import React from 'react';

import { Card, CardBody, CardHeader } from '../card';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
}

interface LastTransactionsProps {
  transactions: Transaction[];
}

const LastTransactions = ({ transactions }: LastTransactionsProps) => {
  const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) {
      return isoDateString;
    }
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  const formatCurrency = (value: number) => {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card>
      <CardHeader title="Últimas Transações" icon={<HistoryIcon />} />
      <CardBody>
        <div className="flex flex-col">
          {transactions.length === 0 ? (
            <div className="py-6 text-center text-gray-400">
              <p>Nenhuma transação recente encontrada.</p>
            </div>
          ) : (
            transactions.map(transaction => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-3 px-1 border-b border-gray-700 hover:bg-gray-800/60 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="text-xs font-medium text-gray-200">
                      {transaction.description}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {formatDate(transaction.date)}{' '}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-right ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
                >
                  <p className="text-xs font-semibold">
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}{' '}
                  </p>
                  <p className="text-xs text-gray-400">
                    <span
                      style={{ backgroundColor: transaction.category.color }}
                      className="inline-block px-1.5 py-0.5 rounded-full text-[10px] text-gray-900 font-medium mt-1"
                    >
                      {transaction.category.name}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default LastTransactions;
