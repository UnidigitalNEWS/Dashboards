
import React from 'react';
import Header from './components/Header';
import KeyMetrics from './components/KeyMetrics';
import EfficiencyChart from './components/EfficiencyChart';
import AIDeployment from './components/AIDeployment';
import CaseStudies from './components/CaseStudies';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-base-100">
      <Header />
      <main className="mt-6">
        <KeyMetrics />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <EfficiencyChart />
          </div>
          <div className="lg:col-span-2">
            <AIDeployment />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
           <div className="lg:col-span-3">
            <CaseStudies />
          </div>
          <div className="lg:col-span-2">
            <AIAssistant />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
