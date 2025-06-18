import {
  ArrowBigDownDashIcon,
  ArrowBigUpDashIcon,
  CalendarIcon,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Card, CardBody, CardHeader, CardSubtitle } from '../components/card';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const Dashboard = () => {
  const { authState } = useAuth();
  const [summary, setSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Só executar quando a autenticação estiver pronta e o usuário estiver logado
    if (!authState.isLoading && authState.user) {
      async function getTransaction() {
        setIsLoading(true);
        try {
          const response = await api.get('/resume?month=04&year=2025');
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
            {authState.user?.displayName}!
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader title="Despesas" icon={<Wallet />} />
          <CardSubtitle subtitle="Saldo total do mês" />
          <CardBody>
            <p>R$300,00</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Receitas" icon={<ArrowBigUpDashIcon />} />
          <CardSubtitle subtitle="Saldo total do mês" />
          <CardBody>
            <p>R$300,00</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Saldo" icon={<ArrowBigDownDashIcon />} />
          <CardSubtitle subtitle="Saldo total do mês" />
          <CardBody>
            <p>R$300,00</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
