
import React, { useState, useCallback } from 'react';
import { generateCaseStudySummary } from '../services/geminiService';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';

const industries = ['Logistik', 'Fertigung', 'Kundenservice', 'Finanzwesen'];

const CaseStudies: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleIndustryClick = useCallback(async (industry: string) => {
    setSelectedIndustry(industry);
    setIsLoading(true);
    setError('');
    setSummary('');
    try {
      const result = await generateCaseStudySummary(industry);
      setSummary(result);
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-4">KI-Fallstudien</h2>
      <p className="text-gray-400 mb-4">
        Wählen Sie eine Branche aus, um eine von der KI generierte Fallstudie zur Effizienzsteigerung anzuzeigen.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {industries.map((industry) => (
          <button
            key={industry}
            onClick={() => handleIndustryClick(industry)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
              ${selectedIndustry === industry ? 'bg-primary text-white' : 'bg-base-300 hover:bg-secondary'}
              ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {industry}
          </button>
        ))}
      </div>
      <div className="flex-grow bg-base-100 rounded-md p-4 min-h-[150px] overflow-y-auto">
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-red-500">{error}</p>}
        {summary && <p className="text-gray-300 whitespace-pre-wrap">{summary}</p>}
      </div>
    </Card>
  );
};

export default CaseStudies;
