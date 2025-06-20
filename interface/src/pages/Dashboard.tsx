import {
  ArrowBigDownDashIcon,
  ArrowBigUpDashIcon,
  PlusIcon,
  Wallet,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import BarChart from '../components/bar-chart';
import { Card, CardBody, CardHeader, CardSubtitle } from '../components/card';
import Chart, { type ExpenseCategory } from '../components/charts';
import CreateTransactionModal from '../components/CreateTransaction';
import LastTransactions from '../components/last-transactions';
import SelectQueryParam from '../components/select-query-param';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

type Summary = {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  expenseByCategory: ExpenseCategory[];
  lastFourMonths: BarChartData[];
  recentTransactions: {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: 'income' | 'expense';
    category: {
      id: string;
      name: string;
      color: string;
      type: 'income' | 'expense';
    };
  }[];
};

type BarChartData = {
  month: string;
  income: number;
  expense: number;
  balance: number;
};

const Dashboard = () => {
  const { authState } = useAuth();
  const [summary, setSummary] = useState<Summary>({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    expenseByCategory: [],
    lastFourMonths: [],
    recentTransactions: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const openNewTransactionModal = () => setIsNewTransactionModalOpen(true);
  const closeNewTransactionModal = () => setIsNewTransactionModalOpen(false);

  const getTransactionSummary = useCallback(async () => {
    setIsLoading(true);
    try {
      const formattedMonth = month.toString().padStart(2, '0');
      const response = await api.get<Summary>(
        `/transactions/resume?month=${formattedMonth}&year=${year}`,
      );
      setSummary(response.data);
    } catch (error) {
      console.error('Erro ao buscar resumo de transações:', error);
      setSummary({
        totalBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        expenseByCategory: [],
        lastFourMonths: [],
        recentTransactions: [],
      });
    } finally {
      setIsLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    if (!authState.isLoading && authState.user) {
      getTransactionSummary();
    }
  }, [authState.isLoading, authState.user, getTransactionSummary]);

  const formatCurrency = (value: number) => {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="px-4 md:px-20 w-full relative min-h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div>
          <h2 className="flex gap-2 text-2xl font-bold text-gray-200  flex-col">
            Dashboard{' '}
            <span className="text-gray-400 text-[10px] font-normal ">
              {new Date().toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </h2>
          <p className="text-gray-200 mb-4">
            Bem-vindo,{' '}
            <span className="font-semibold text-primary-500">
              {authState.user?.displayName}
            </span>
            !
          </p>
        </div>
        <SelectQueryParam
          onChangeYear={setYear}
          onChangeMonth={setMonth}
          year={year}
          month={month}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader title="Saldo" icon={<Wallet />} />
          <CardSubtitle subtitle="Saldo total do mês" />
          <CardBody>
            <p
              className={`text-xl font-bold ${summary.totalBalance < 0 ? 'text-red-500' : 'text-green-500'}`}
            >
              {formatCurrency(summary.totalBalance)}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Receitas" icon={<ArrowBigUpDashIcon />} />
          <CardSubtitle subtitle="Receitas totais do mês" />
          <CardBody>
            <p
              className={`text-xl font-bold ${summary.totalIncome < 0 ? 'text-red-500' : 'text-green-500'}`}
            >
              {formatCurrency(summary.totalIncome)}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Despesas" icon={<ArrowBigDownDashIcon />} />
          <CardSubtitle subtitle="Despesas totais do mês" />
          <CardBody>
            <p className={`text-xl font-bold text-red-500`}>
              {formatCurrency(summary.totalExpense)}
            </p>
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_250px] gap-4">
        <Chart expenseByCategory={summary.expenseByCategory} />
        <BarChart data={summary.lastFourMonths} />
        <LastTransactions transactions={summary.recentTransactions} />
      </div>
      {/* Botão Flutuante (FAB) - LIGADO AO MODAL */}
      <button
        className="fixed bottom-6 right-6 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75"
        aria-label="Adicionar nova transação"
        onClick={openNewTransactionModal}
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {/* --- RENDERIZAR O MODAL AQUI --- */}
      <CreateTransactionModal
        isNewTransactionModalOpen={isNewTransactionModalOpen}
        closeNewTransactionModal={closeNewTransactionModal}
        onSuccess={getTransactionSummary}
      />
    </div>
  );
};

export default Dashboard;
