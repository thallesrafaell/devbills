import {
  ArrowDownIcon,
  ArrowUpIcon,
  CarIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  HistoryIcon,
  HomeIcon,
  PlaneIcon,
  ShoppingBagIcon,
  UtensilsIcon,
} from 'lucide-react';

import { Card, CardBody, CardHeader } from '../card';

// Interface para as transações
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: {
    id: string;
    name: string;
    icon: React.ReactNode;
  };
}

// Mock de dados para as últimas transações
const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário mensal',
    amount: 5000,
    type: 'income',
    date: '15/06/2023',
    category: {
      id: 'cat1',
      name: 'Receitas',
      icon: <ArrowUpIcon size={16} className="text-green-500" />,
    },
  },
  {
    id: '2',
    description: 'Supermercado',
    amount: 450,
    type: 'expense',
    date: '12/06/2023',
    category: {
      id: 'cat2',
      name: 'Alimentação',
      icon: <UtensilsIcon size={16} className="text-orange-500" />,
    },
  },
  {
    id: '3',
    description: 'Curso de programação',
    amount: 800,
    type: 'expense',
    date: '10/06/2023',
    category: {
      id: 'cat3',
      name: 'Educação',
      icon: <GraduationCapIcon size={16} className="text-blue-500" />,
    },
  },
  {
    id: '4',
    description: 'Freelance site',
    amount: 2000,
    type: 'income',
    date: '08/06/2023',
    category: {
      id: 'cat1',
      name: 'Receitas',
      icon: <ArrowUpIcon size={16} className="text-green-500" />,
    },
  },

  {
    id: '5',
    description: 'Shopping nova coleção',
    amount: 350,
    type: 'expense',
    date: '05/06/2023',
    category: {
      id: 'cat4',
      name: 'Compras',
      icon: <ShoppingBagIcon size={16} className="text-purple-500" />,
    },
  },
];

const LastTransactions = () => {
  return (
    <Card>
      <CardHeader title="Últimas Transações" icon={<HistoryIcon />} />
      <CardBody className="">
        <div className="flex flex-col ">
          {mockTransactions.map(transaction => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-3 px-1 border-b border-gray-700 hover:bg-gray-800/60 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  {transaction.category.icon}
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-200">
                    {transaction.description}
                  </h4>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <div
                className={`text-right ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
              >
                <p className="text-xs font-semibold">
                  {transaction.type === 'income' ? '+' : '-'}
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.amount)}
                </p>
                <p className="text-xs text-gray-400">
                  {transaction.category.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {mockTransactions.length === 0 && (
          <div className="py-6 text-center text-gray-400">
            <p>Nenhuma transação recente</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default LastTransactions;
