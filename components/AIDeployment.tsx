
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChartDataPoint } from '../types';
import Card from './Card';

const data: PieChartDataPoint[] = [
  { name: 'Marketing', value: 25 },
  { name: 'Kundenservice', value: 30 },
  { name: 'Betrieb', value: 20 },
  { name: 'Personalwesen', value: 15 },
  { name: 'F&E', value: 10 },
];

const COLORS = ['#1f6feb', '#58a6ff', '#3fb950', '#e3b341', '#a371f7'];

const AIDeployment: React.FC = () => {
  return (
    <Card className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-4">KI-Einsatz nach Abteilung</h2>
      <div className="flex-grow flex items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
                contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    color: '#e5e7eb' 
                }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AIDeployment;
