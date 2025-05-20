import React, { createContext, useContext, useState } from 'react';

interface CalculationResult {
  type: 'commercial' | 'rational' | 'agios' | 'rates' | 'equivalent';
  timestamp: Date;
  inputs: Record<string, any>;
  results: Record<string, any>;
}

interface CalculationContextType {
  history: CalculationResult[];
  addToHistory: (result: CalculationResult) => void;
  clearHistory: (type?: CalculationResult['type']) => void;
}

const CalculationContext = createContext<CalculationContextType | undefined>(undefined);

export function CalculationProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<CalculationResult[]>([]);

  const addToHistory = (result: CalculationResult) => {
    setHistory((prev) => {
      const moduleHistory = prev.filter(entry => entry.type === result.type);
      const otherHistory = prev.filter(entry => entry.type !== result.type);
      
      // Keep only last 10 entries per module type
      const newModuleHistory = [result, ...moduleHistory].slice(0, 10);
      
      return [...newModuleHistory, ...otherHistory];
    });
  };

  const clearHistory = (type?: CalculationResult['type']) => {
    if (type) {
      // Clear history only for specific module type
      setHistory(prev => prev.filter(entry => entry.type !== type));
    } else {
      // Clear all history
      setHistory([]);
    }
  };

  return (
    <CalculationContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </CalculationContext.Provider>
  );
}

export function useCalculation() {
  const context = useContext(CalculationContext);
  if (context === undefined) {
    throw new Error('useCalculation must be used within a CalculationProvider');
  }
  return context;
}