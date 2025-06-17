import { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const Dashboard = () => {
  const { authState } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Só executar quando a autenticação estiver pronta e o usuário estiver logado
    if (!authState.isLoading && authState.user) {
      async function getTransaction() {
        setIsLoading(true);
        try {
          const response = await api.get('/transactions');
          console.log(response.data);
          setTransactions(response.data);
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
    <div>
      <h1>Painel de Controle</h1>
    </div>
  );
};

export default Dashboard;
