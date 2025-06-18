import { TrendingUpIcon } from 'lucide-react';
import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Card, CardHeader } from '../card';

export interface ExpenseCategory {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  percentage: number;
}

interface ChartProps {
  expenseByCategory?: ExpenseCategory[];
}

// Dados padrão para quando não houver dados

const Chart: React.FC<ChartProps> = ({ expenseByCategory = [] }) => {
  return (
    <Card>
      <CardHeader title="Despesas por categoria" icon={<TrendingUpIcon />} />
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="amount"
              nameKey="categoryName"
              data={expenseByCategory}
              label={({ percentage }) => ` ${percentage}%`}
            >
              {expenseByCategory.map(entry => (
                <Cell
                  key={`cell-${entry.categoryId}`}
                  fill={entry.categoryColor}
                />
              ))}
            </Pie>
            <div className="hiden md:block">
              <Tooltip
                formatter={value => `R$ ${value.toLocaleString()}`}
                labelFormatter={name => name}
              />
            </div>
            <Tooltip
              formatter={value => `R$ ${value.toLocaleString()}`}
              labelFormatter={name => name}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Chart;
