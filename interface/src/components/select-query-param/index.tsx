import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';

import { MonthSelect, YearSelect } from '../dates';

interface SelectQueryParamProps {
  year: number;
  month: number;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
}

const SelectQueryParam = ({
  year,
  month,
  onChangeYear,
  onChangeMonth,
}: SelectQueryParamProps) => {
  const handlePrevious = () => {
    const currentDate = new Date(year, month - 1, 1);
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    onChangeMonth(previousMonth.getMonth() + 1);
    onChangeYear(previousMonth.getFullYear());
  };

  const handleNext = () => {
    const currentDate = new Date(year, month - 1, 1);
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    onChangeMonth(nextMonth.getMonth() + 1);
    onChangeYear(nextMonth.getFullYear());
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeYear(Number(e.target.value));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeMonth(Number(e.target.value));
  };

  return (
    <div className="flex items-center justify-between gap-2 mb-4 bg-gray-700 p-2 rounded-md">
      <button
        aria-label="Anterior"
        title="Anterior"
        onClick={handlePrevious}
        className="cursor-pointer"
      >
        <ArrowBigLeft className="text-primary-500" />
      </button>
      {/* Aqui as classes serão passadas implicitamente pelos estilos internos do MonthSelect/YearSelect */}
      <MonthSelect value={month} onChange={handleMonthChange} />
      <YearSelect value={year} onChange={handleYearChange} />
      <button
        aria-label="Próximo"
        title="Próximo"
        onClick={handleNext}
        className="cursor-pointer"
      >
        <ArrowBigRight className="text-primary-500" />
      </button>
    </div>
  );
};

export default SelectQueryParam;
