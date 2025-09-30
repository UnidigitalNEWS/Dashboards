
import React from 'react';
import Card from './Card';

const TrendingUpIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const EuroIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.879A6 6 0 0112.025 10a6 6 0 012.096-5.879m-2.096 11.758A6 6 0 016 12a6 6 0 015.879-2.096m0 4.192H6m11 0h-2.5a2.5 2.5 0 00-5 0H6.5" />
    </svg>
);

const ClockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const metrics = [
    {
        title: 'Effizienzsteigerung',
        value: '+28%',
        Icon: TrendingUpIcon,
        description: 'Automatisierung von Routineaufgaben'
    },
    {
        title: 'Kosteneinsparung',
        value: '€1.2M',
        Icon: EuroIcon,
        description: 'Jährlich durch Prozessoptimierung'
    },
    {
        title: 'Zeitersparnis',
        value: '15.000 h',
        Icon: ClockIcon,
        description: 'Mitarbeiterstunden pro Jahr'
    }
];

const KeyMetrics: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map(metric => (
                <Card key={metric.title} className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                        <metric.Icon />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">{metric.title}</p>
                        <p className="text-2xl font-bold text-white">{metric.value}</p>
                        <p className="text-xs text-gray-500">{metric.description}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default KeyMetrics;
