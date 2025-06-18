import { Calendar1Icon } from 'lucide-react';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardHeader } from '../card';

export interface BarChartData {
  month: string;
  year: number;
  income: number;
  expense: number;
  balance: number;
}

const BarChart = ({ data }: { data: BarChartData[] }) => {
  return (
    <Card>
      <CardHeader title="Histórico mensal" icon={<Calendar1Icon />} />
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 35, // Aumente essa margem para dar mais espaço
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="month"
              stroke="#FFFFFF"
              tick={{
                fill: '#FFFFFF',
                fontSize: 12,
              }}
            />
            <YAxis
              stroke="#FFFFFF"
              tickFormatter={value => `R$\u00A0${value}`} // Espaço não-quebrável
              tick={{
                fill: '#FFFFFF',
                fontSize: 11, // Texto um pouco menor para caber melhor
              }}
              width={65} // Largura um pouco maior
            />
            <Tooltip
              formatter={value => `R$ ${value.toLocaleString('pt-BR')}`}
              labelFormatter={label => label.toUpperCase()}
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '4px',
              }}
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ color: '#FFFFFF' }} />
            <Bar
              name="Receitas"
              dataKey="income"
              fill="#4ade80"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              name="Despesas"
              dataKey="expense"
              fill="#f87171"
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BarChart;
