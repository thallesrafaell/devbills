import { ArrowBigDownDashIcon, ArrowBigUpDashIcon, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

import BarChart, { type BarChartData } from '../components/bar-chart';
import { Card, CardBody, CardHeader, CardSubtitle } from '../components/card';
import Chart, { type ExpenseCategory } from '../components/charts';
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
};

const Dashboard = () => {
  const { authState } = useAuth();
  const [summary, setSummary] = useState<Summary>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Janeiro é 0, então adicionamos 1

  useEffect(() => {
    // Só executar quando a autenticação estiver pronta e o usuário estiver logado
    if (!authState.isLoading && authState.user) {
      async function getTransaction() {
        setIsLoading(true);
        try {
          // Formatar o mês para sempre ter dois dígitos (01, 02, etc.)
          const formattedMonth = month.toString().padStart(2, '0');

          const response: { data: Summary } = await api.get(
            `/transactions/resume?month=${formattedMonth}&year=${year}`,
          );
          setSummary(response.data);
        } catch (error) {
          console.error('Erro ao buscar transações:', error);
        } finally {
          setIsLoading(false);
        }
      }
      getTransaction();
    }
  }, [authState.isLoading, authState.user, year, month]);

  if (authState.isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="px-4 md:px-20 w-full">
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
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_250px] gap-4">
        <Chart expenseByCategory={summary.expenseByCategory} />
        <BarChart data={summary.lastFourMonths} />
        <LastTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
