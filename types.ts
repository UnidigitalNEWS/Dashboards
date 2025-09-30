
export interface TimeSeriesDataPoint {
  month: string;
  'Effizienzsteigerung (%)': number;
  'Kosteneinsparung (Tsd. €)': number;
}

export interface PieChartDataPoint {
    name: string;
    value: number;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}
