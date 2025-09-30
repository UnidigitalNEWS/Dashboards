import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getAIAssistantResponse } from '../services/geminiService';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';

// Daten aus dem Dashboard, um dem Assistenten Kontext zu geben
const keyMetrics = [
    { title: 'Effizienzsteigerung', value: '+28%', description: 'Automatisierung von Routineaufgaben' },
    { title: 'Kosteneinsparung', value: '€1.2M', description: 'Jährlich durch Prozessoptimierung' },
    { title: 'Zeitersparnis', value: '15.000 h', description: 'Mitarbeiterstunden pro Jahr' }
];

const efficiencyChartData = [
  { month: 'Jan', 'Effizienzsteigerung (%)': 12, 'Kosteneinsparung (Tsd. €)': 80 },
  { month: 'Feb', 'Effizienzsteigerung (%)': 15, 'Kosteneinsparung (Tsd. €)': 110 },
  { month: 'Mär', 'Effizienzsteigerung (%)': 18, 'Kosteneinsparung (Tsd. €)': 130 },
  { month: 'Apr', 'Effizienzsteigerung (%)': 22, 'Kosteneinsparung (Tsd. €)': 160 },
  { month: 'Mai', 'Effizienzsteigerung (%)': 25, 'Kosteneinsparung (Tsd. €)': 190 },
  { month: 'Jun', 'Effizienzsteigerung (%)': 28, 'Kosteneinsparung (Tsd. €)': 220 },
];

const aiDeploymentData = [
  { name: 'Marketing', value: 25 },
  { name: 'Kundenservice', value: 30 },
  { name: 'Betrieb', value: 20 },
  { name: 'Personalwesen', value: 15 },
  { name: 'F&E', value: 10 },
];

const dataContext = `
**Kennzahlen:**
${JSON.stringify(keyMetrics, null, 2)}

**Monatliche Entwicklung (Effizienz & Kosten):**
${JSON.stringify(efficiencyChartData, null, 2)}

**KI-Einsatz nach Abteilung (Anteil in %):**
${JSON.stringify(aiDeploymentData, null, 2)}
`;


const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Hallo! Ich bin Ihr Daten-Assistent. Fragen Sie mich etwas über die angezeigten Daten, z.B. "Welcher Monat hatte die höchste Kosteneinsparung?"'}
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const query = input;
    const userMessage: ChatMessage = { sender: 'user', text: query };
    const newMessages: ChatMessage[] = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Übergebe den bisherigen Verlauf (ohne die aktuelle Nachricht des Benutzers)
      const aiResponse = await getAIAssistantResponse(query, dataContext, messages);
      setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages([...newMessages, { sender: 'ai', text: 'Entschuldigung, ein Fehler ist aufgetreten.' }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-4">KI-Datenassistent</h2>
      <div className="flex-grow bg-base-100 rounded-md p-4 mb-4 overflow-y-auto h-64">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-base-300 text-gray-300'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><LoadingSpinner/></div>}
        <div ref={chatEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Fragen Sie nach den Daten..."
          className="flex-grow bg-base-300 border border-base-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-white"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Senden
        </button>
      </div>
    </Card>
  );
};

export default AIAssistant;