import { ArrowBigDownDashIcon, ArrowBigUpDashIcon, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Card, CardBody, CardHeader, CardSubtitle } from '../components/card';
import Chart, { type ExpenseCategory } from '../components/charts';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

type Summary = {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  expenseByCategory: ExpenseCategory[];
};

const Dashboard = () => {
  const { authState } = useAuth();
  const [summary, setSummary] = useState<Summary>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Só executar quando a autenticação estiver pronta e o usuário estiver logado
    if (!authState.isLoading && authState.user) {
      async function getTransaction() {
        setIsLoading(true);
        try {
          const response = await api.get(
            '/transactions/resume?month=04&year=2025',
          );
          console.log(response.data);
          setSummary(response.data);
        } catch (error) {
          console.error('Erro ao buscar transações:', error);
        } finally {
          setIsLoading(false);
        }
      }
      getTransaction();
    }
  }, [authState.isLoading, authState.user]);

  if (authState.isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="px-4 md:px-20">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader title="Saldo" icon={<Wallet />} />
          <CardSubtitle subtitle="Saldo total do mês" />
          <CardBody>
            <p
              className={`text-xl font-bold ${summary?.totalBalance < 0 ? 'text-red-500' : 'text-green-500'}`}
            >
              {summary
                ? Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(summary.totalBalance)
                : 'Carregando...'}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Receitas" icon={<ArrowBigUpDashIcon />} />
          <CardSubtitle subtitle="Receitas totais do mês" />
          <CardBody>
            <p
              className={`text-xl font-bold ${summary?.totalIncome < 0 ? 'text-red-500' : 'text-green-500'}`}
            >
              {summary
                ? Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(summary.totalIncome)
                : 'Carregando...'}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Saldo" icon={<ArrowBigDownDashIcon />} />
          <CardSubtitle subtitle="Despesas totais do mês" />
          <CardBody>
            <p className={`text-xl font-bold text-red-500`}>
              {summary
                ? Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(summary.totalExpense)
                : 'Carregando...'}
            </p>
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Chart expenseByCategory={summary.expenseByCategory} />
        <Chart expenseByCategory={summary.expenseByCategory} />
      </div>
    </div>
  );
};

export default Dashboard;
