import React, { useEffect, useState } from 'react';

export interface YearSelectProps {
  value?: number | string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  id?: string;
}

export const YearSelect = ({
  value,
  onChange,
  className,
  id,
}: YearSelectProps) => {
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];

    // Gerar anos (do atual para 5 anos atrás)
    for (let i = 0; i <= 5; i++) {
      yearsArray.push(currentYear - i);
    }

    setYears(yearsArray);
  }, []);

  return (
    <select
      id={id}
      // --- Classes Tailwind CSS para o SELECT ---
      className={`
        px-2 py-1 rounded-md bg-gray-700 text-gray-200 border border-gray-600
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
        appearance-none cursor-pointer
        ${className || ''}
      `}
      value={value || ''}
      onChange={onChange}
      required
      aria-label="Selecione o ano"
      title="Selecione o ano"
    >
      <option
        value=""
        disabled
        // --- Classes Tailwind CSS para as OPTIONS (incluindo a desabilitada) ---
        className="bg-gray-800 text-gray-400"
      >
        Selecione o ano
      </option>
      {years.map(year => (
        <option
          key={year}
          value={year}
          // --- Classes Tailwind CSS para as OPTIONS ---
          className="bg-gray-800 text-gray-200 hover:bg-primary-500 hover:text-white"
        >
          {year}
        </option>
      ))}
    </select>
  );
};

export interface MonthSelectProps {
  value?: number | string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  id?: string;
}

export const MonthSelect = ({
  value,
  onChange,
  className,
  id,
}: MonthSelectProps) => {
  const months = [
    { value: 1, name: 'Janeiro' },
    { value: 2, name: 'Fevereiro' },
    { value: 3, name: 'Março' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Maio' },
    { value: 6, name: 'Junho' },
    { value: 7, name: 'Julho' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Setembro' },
    { value: 10, name: 'Outubro' },
    { value: 11, name: 'Novembro' },
    { value: 12, name: 'Dezembro' },
  ];

  return (
    <select
      id={id || 'month-select'}
      // --- Classes Tailwind CSS para o SELECT ---
      className={`
        px-2 py-1 rounded-md bg-gray-700 text-gray-200 border border-gray-600
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
        appearance-none cursor-pointer
        ${className || ''}
      `}
      value={value || ''}
      onChange={onChange}
      required
      title="Selecione o mês"
      aria-label="Selecione o mês"
    >
      <option
        value=""
        disabled
        // --- Classes Tailwind CSS para as OPTIONS (incluindo a desabilitada) ---
        className="bg-gray-800 text-gray-400"
      >
        Selecione o mês
      </option>
      {months.map(month => (
        <option
          key={month.value}
          value={month.value}
          // --- Classes Tailwind CSS para as OPTIONS ---
          className="bg-gray-800 text-gray-200 hover:bg-primary-500 hover:text-white"
        >
          {month.name}
        </option>
      ))}
    </select>
  );
};
