import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../components/button';
import { Card, CardBody, CardHeader } from '../components/card';
import CreateTransactionModal from '../components/CreateTransaction';
import SelectQueryParam from '../components/select-query-param';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: Category;
}

interface Category {
  color: string;
  name: string;
  type: 'income' | 'expense';
}

const Transaction = () => {
  const { authState } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [searchTerm, setSearchTerm] = useState('');

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const openNewTransactionModal = () => setIsNewTransactionModalOpen(true);
  const closeNewTransactionModal = () => setIsNewTransactionModalOpen(false);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const formattedMonth = month.toString().padStart(2, '0');
      const response = await api.get<Transaction[]>(
        `/transactions?month=${formattedMonth}&year=${year}`,
      );

      const sortedTransactions = response.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      setTransactions(sortedTransactions);
      console.log(
        'Transações atualizadas após fetch e ordenação:',
        sortedTransactions,
      );
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    if (!authState.isLoading && authState.user) {
      fetchTransactions();
    }
  }, [authState.isLoading, authState.user, fetchTransactions]);

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await api.delete(`/transactions/${transactionId}`);
      fetchTransactions();
      toast.success('Transação excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir transação: ' + error);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const descriptionMatches = transaction.description
      .toLowerCase()
      .includes(lowerCaseSearchTerm);
    const categoryMatches = transaction.category.name
      .toLowerCase()
      .includes(lowerCaseSearchTerm);

    return descriptionMatches || categoryMatches;
  });

  const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);

    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  const formatCurrency = (value: number) => {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="px-4 md:px-20 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div>
          <h2 className="flex gap-2 text-2xl font-bold text-gray-200  flex-col">
            Transações{' '}
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
        <Button onClick={openNewTransactionModal}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Nova Transação
        </Button>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        {/** Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar transações..."
            className="px-4 py-2 rounded-2xl bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-64"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <SelectQueryParam
          onChangeYear={setYear}
          onChangeMonth={setMonth}
          year={year}
          month={month}
        />
      </div>

      {/** Tabela de transações / Mensagens de estado */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center text-gray-400 mt-8">
            Carregando transações...
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            Nenhuma transação encontrada para o período ou busca selecionada.
          </div>
        ) : (
          <>
            {/* Tabela para telas maiores */}
            <table className="min-w-full bg-gray-800 text-gray-200 rounded-2xl p-4 overflow-hidden hidden md:table">
              <thead>
                <tr className="bg-gray-700 text-gray-300 rounded-2xl">
                  <th className="p-2">Descrição</th>
                  <th className="p-2">Data</th>
                  <th className="p-2">Categoria</th>
                  <th className="p-2">Valor</th>
                  <th className="p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {/* As transações já estarão ordenadas aqui */}
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="p-2 text-center">
                      {transaction.description}
                    </td>
                    <td className="p-2 text-center">
                      {formatDate(transaction.date)}{' '}
                    </td>
                    <td className="p-2 text-center">
                      <span
                        style={{
                          backgroundColor: transaction.category.color,
                        }}
                        className="inline-block px-2 py-1 rounded-full text-xs text-gray-900 font-semibold"
                      >
                        {transaction.category.name}
                      </span>
                    </td>
                    <td
                      className={`p-2 text-center ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        title="Excluir transação"
                        aria-label="Excluir transação"
                        className="text-red-700 cursor-pointer"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <Trash2Icon className="w-4 h-4 text-red-700 hover:text-red-500 transition-colors" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Layout de cartão para telas menores */}
            <div className="md:hidden">
              {filteredTransactions.map(transaction => (
                <div key={transaction.id} className="mb-4">
                  <Card>
                    <div className="relative">
                      <CardHeader title={transaction.description} />
                      <button
                        title="Excluir transação"
                        aria-label="Excluir transação"
                        className="text-red-700 cursor-pointer absolute top-4 right-4"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <Trash2Icon className="w-4 h-4 text-red-700 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                    <CardBody>
                      <div className="mb-2">
                        <span className="font-semibold text-gray-400">
                          Data:{' '}
                        </span>
                        {formatDate(transaction.date)}{' '}
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold text-gray-400">
                          Categoria:{' '}
                        </span>
                        <span
                          style={{
                            backgroundColor: transaction.category.color,
                          }}
                          className="inline-block px-2 py-1 rounded-full text-xs text-gray-900 font-semibold"
                        >
                          {transaction.category.name}
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold text-gray-400">
                          Valor:{' '}
                        </span>
                        <span
                          className={`${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
                        >
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <CreateTransactionModal
        isNewTransactionModalOpen={isNewTransactionModalOpen}
        closeNewTransactionModal={closeNewTransactionModal}
        onSuccess={fetchTransactions}
      />
    </div>
  );
};

export default Transaction;
