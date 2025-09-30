
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeSeriesDataPoint } from '../types';
import Card from './Card';

const data: TimeSeriesDataPoint[] = [
  { month: 'Jan', 'Effizienzsteigerung (%)': 12, 'Kosteneinsparung (Tsd. €)': 80 },
  { month: 'Feb', 'Effizienzsteigerung (%)': 15, 'Kosteneinsparung (Tsd. €)': 110 },
  { month: 'Mär', 'Effizienzsteigerung (%)': 18, 'Kosteneinsparung (Tsd. €)': 130 },
  { month: 'Apr', 'Effizienzsteigerung (%)': 22, 'Kosteneinsparung (Tsd. €)': 160 },
  { month: 'Mai', 'Effizienzsteigerung (%)': 25, 'Kosteneinsparung (Tsd. €)': 190 },
  { month: 'Jun', 'Effizienzsteigerung (%)': 28, 'Kosteneinsparung (Tsd. €)': 220 },
];

const EfficiencyChart: React.FC = () => {
  return (
    <Card className="h-full flex flex-col">
        <h2 className="text-xl font-semibold text-white mb-4">Monatliche Entwicklung</h2>
        <div className="flex-grow">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" tick={{ fill: '#9ca3af' }} stroke="#4b5563" />
                    <YAxis yAxisId="left" orientation="left" stroke="#58a6ff" tick={{ fill: '#9ca3af' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#3fb950" tick={{ fill: '#9ca3af' }} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            color: '#e5e7eb' 
                        }} 
                        cursor={{fill: 'rgba(255, 255, 255, 0.1)'}}
                    />
                    <Legend wrapperStyle={{ color: '#9ca3af' }} />
                    <Bar yAxisId="left" dataKey="Effizienzsteigerung (%)" fill="#58a6ff" />
                    <Bar yAxisId="right" dataKey="Kosteneinsparung (Tsd. €)" fill="#3fb950" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </Card>
  );
};

export default EfficiencyChart;
