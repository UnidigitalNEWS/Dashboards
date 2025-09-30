import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCaseStudySummary = async (industry: string): Promise<string> => {
  try {
    const prompt = `Erstelle eine kurze, prägnante Fallstudie (ca. 150 Wörter) darüber, wie ein fiktives Unternehmen im Bereich '${industry}' künstliche Intelligenz zur Effizienzsteigerung eingesetzt hat. Konzentriere dich auf das Problem, die KI-Lösung und die messbaren Ergebnisse. Die Tonalität sollte professionell und informativ sein. Formatiere die Antwort in einfachem Text ohne Markdown.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating case study summary:", error);
    return "Fehler beim Abrufen der Fallstudie. Bitte versuchen Sie es später erneut.";
  }
};


export const getAIAssistantResponse = async (query: string, dataContext: string, history: ChatMessage[]): Promise<string> => {
    try {
        const systemInstruction = `Du bist ein spezialisierter KI-Assistent für ein Business-Intelligence-Dashboard. Deine Aufgabe ist es, Fragen zu den Dashboard-Daten zu beantworten. Antworte ausschließlich auf Basis der bereitgestellten Daten. Sei präzise und hilfsbereit. Die Daten sind auf Deutsch, also antworte auch auf Deutsch. Hier sind die relevanten Daten, die du für die Beantwortung der Fragen verwenden sollst:\n\n${dataContext}`;
        
        const contents = history.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));
        
        contents.push({
            role: 'user',
            parts: [{ text: query }]
        });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.2,
                maxOutputTokens: 250,
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error getting AI assistant response:", error);
        return "Es gab ein Problem bei der Verarbeitung Ihrer Anfrage.";
    }
}