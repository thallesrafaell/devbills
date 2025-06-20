import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { api } from '../../services/api';
import { Modal, ModalContent, ModalDescription, ModalHeader } from '../modal';

interface CreateTransactionModalProps {
  isNewTransactionModalOpen: boolean;
  closeNewTransactionModal: () => void;
  onSuccess: () => void;
}

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) {
    return '';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const unformatCurrency = (value: string): number | null => {
  if (!value) {
    return null;
  }
  const cleanedValue = value
    .replace(/[R$ ]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const parsedValue = parseFloat(cleanedValue);
  return isNaN(parsedValue) ? null : parsedValue;
};

const schema = z.object({
  type: z
    .enum(['expense', 'income'], {
      errorMap: () => ({ message: 'Selecione um tipo de transação' }),
    })
    .default('expense')
    .transform(val => val as 'expense' | 'income'),
  description: z
    .string()
    .min(1, { message: 'Descrição é obrigatória' })
    .max(100, { message: 'Máximo de 100 caracteres' }),
  amount: z.coerce
    .number({
      invalid_type_error: 'Valor deve ser um número válido',
    })
    .min(0.01, { message: 'Valor deve ser maior que zero' })
    .max(999999.99, { message: 'Valor máximo é R$ 999.999,99' })
    .nullable()
    .refine(val => val !== null && val > 0, {
      message: 'Valor é obrigatório e deve ser maior que zero',
    }),
  date: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Data inválida',
  }),
  categoryId: z.string().optional(),
});

type CreateTransactionFormValues = z.infer<typeof schema>;

const CreateTransactionModal = ({
  isNewTransactionModalOpen,
  closeNewTransactionModal,
  onSuccess,
}: CreateTransactionModalProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<CreateTransactionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'expense',
      description: '',
      amount: null,
      date: new Date().toISOString().split('T')[0], // Ensure date is yyyy-mm-dd for input[type="date"]
      categoryId: undefined,
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<Category[]>('/categories');
        setCategories(response.data);
      } catch (error) {
        toast.error(
          'Erro ao buscar categorias. Recarregue a página e tente novamente.',
        );
      }
    };
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedType = watch('type');
  const amountValue = watch('amount');

  const amountInputRef = form.register('amount');

  const [displayAmount, setDisplayAmount] = useState<string>(
    formatCurrency(amountValue),
  );

  const filteredCategories = categories.filter(
    category => category.type === selectedType,
  );

  useEffect(() => {
    const currentCategoryId = watch('categoryId');
    if (currentCategoryId) {
      const isCurrentCategoryStillValid = filteredCategories.some(
        cat => cat.id === currentCategoryId,
      );
      if (!isCurrentCategoryStillValid) {
        setValue('categoryId', undefined);
      }
    }
  }, [selectedType, filteredCategories, setValue, watch]);

  const onSubmit = (data: CreateTransactionFormValues) => {
    const dateFromInput = data.date;
    const formattedDate = new Date(dateFromInput).toISOString();

    const formattedData = {
      ...data,
      amount: unformatCurrency(displayAmount),
      date: formattedDate,
    };
    api
      .post('/transactions', formattedData)
      .then(response => {
        closeNewTransactionModal();
        onSuccess();
        toast.success('Transação criada com sucesso!');
      })
      .catch(error => {
        toast.error(
          `Erro ao criar transação: ${error.response?.data?.message || 'Verifique o console.'}`,
        );
      });
  };

  return (
    <Modal
      isOpen={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <ModalHeader onClose={closeNewTransactionModal} showCloseButton={true}>
        Nova Transação
      </ModalHeader>

      <ModalDescription>
        Preencha os detalhes da sua nova transação (receita ou despesa).
      </ModalDescription>

      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Campo Tipo de Transação */}
          <div>
            <label className="block text-base font-bold text-gray-200 mb-1">
              Tipo de Transação
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setValue('type', 'expense')}
                className={`
                  flex-1 py-1.5 rounded-lg text-sm font-semibold
                  ${
                    selectedType === 'expense'
                      ? 'bg-red-700/20 text-red-500 border border-red-500'
                      : 'bg-gray-700 text-gray-400 border border-transparent hover:bg-gray-600 transition-colors'
                  }
                `}
              >
                Despesa
              </button>

              <button
                type="button"
                onClick={() => setValue('type', 'income')}
                className={`
                  flex-1 py-1.5 rounded-lg text-sm font-semibold
                  ${
                    selectedType === 'income'
                      ? 'bg-green-700/20 text-green-500 border border-green-500'
                      : 'bg-gray-700 text-gray-400 border border-transparent hover:bg-gray-600 transition-colors'
                  }
                `}
              >
                Receita
              </button>
            </div>
            {errors.type && (
              <p className="text-red-500 text-xs mt-0.5">
                {errors.type.message}
              </p>
            )}
            <input type="hidden" {...register('type')} />
          </div>

          {/* Campo Descrição */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-400"
            >
              Descrição
            </label>
            <input
              type="text"
              id="description"
              {...register('description')}
              className="mt-1 block w-full px-3 py-1.5 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Ex: Supermercado, Salário, etc."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-0.5">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Campo Valor - COM MÁSCARA MANUAL DE REAL */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-400"
            >
              Valor
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                R$
              </span>{' '}
              <input
                type="text"
                id="amount"
                {...amountInputRef}
                value={displayAmount}
                onChange={e => {
                  const rawValue = e.target.value;
                  setDisplayAmount(rawValue);
                }}
                onBlur={() => {
                  const unformatted = unformatCurrency(displayAmount);
                  setValue('amount', unformatted, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setDisplayAmount(formatCurrency(unformatted));
                }}
                onFocus={() => {
                  const unformatted = unformatCurrency(displayAmount);
                  setDisplayAmount(
                    unformatted !== null ? unformatted.toString() : '',
                  );
                }}
                className="block w-full pl-8 pr-3 py-1.5 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="0,00"
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-xs mt-0.5">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Campo Data */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-400"
            >
              Data
            </label>
            <input
              type="date"
              id="date"
              {...register('date')}
              className="mt-1 block w-full px-3 py-1.5 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-0.5">
                {errors.date.message}
              </p>
            )}
          </div>

          {/* Campo Categoria (Select) - AGORA COM FILTRAGEM */}
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-400"
            >
              Categoria
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9l-7 7-7-7"
                  ></path>
                </svg>
              </span>
              <select
                id="categoryId"
                {...register('categoryId')}
                className="block w-full pl-9 pr-3 py-1.5 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none"
              >
                <option value="">Selecione uma categoria</option>
                {filteredCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </span>
            </div>
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-0.5">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={closeNewTransactionModal}
              className="px-3 py-1.5 text-sm font-medium text-gray-400 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm font-medium bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              Salvar Transação
            </button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateTransactionModal;
