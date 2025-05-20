import  { useState } from 'react';
import { calculateRationalDiscount } from '../utils/calculations';
import { DiscountForm } from './DiscountForm';
import { ResultCard } from './ResultCard';
import { useCalculation } from '../contexts/CalculationContext';
import { HistoryPanel } from './HistoryPanel';
import { ResetButton } from './ResetButton';

export function RationalDiscount() {
  const [results, setResults] = useState<{
    discount: number;
    presentValue: number;
    inputRate: number;
    inputDays: number;
  } | null>(null);
  
  const { addToHistory } = useCalculation();
  const [resetKey, setResetKey] = useState(0);

  const handleCalculate = (data: { nominal: number; rate: number; days: number }) => {
    const results = {
      ...calculateRationalDiscount(data.nominal, data.rate, data.days),
      inputRate: data.rate,
      inputDays: data.days
    };
    setResults(results);
    
    addToHistory({
      type: 'rational',
      timestamp: new Date(),
      inputs: {
        'Valeur nominale': data.nominal,
        'Taux': `${data.rate}%`,
        'Jours': data.days,
      },
      results: {
        'Escompte': results.discount,
        'Valeur actuelle': results.presentValue,
      },
    });
  };

  const handleReset = () => {
    setResults(null);
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Module 2 : Escompte Rationnel
        </h2>
        <ResetButton onReset={handleReset} />
      </div>
      
      <DiscountForm key={resetKey} onCalculate={handleCalculate} />
      
      {results && (
        <div className="mt-6 space-y-4">
          <ResultCard
            label="Escompte rationnel (er)"
            value={results.discount}
            formula="er = Cn × [1 - 1/(1 + (i × n/360))]"
            explanation="L'escompte rationnel est calculé sur la valeur actuelle plutôt que sur la valeur nominale, ce qui le rend plus avantageux pour le client."
            inputs={{
              'Cn': `${results.discount + results.presentValue} €`,
              'i': `${results.inputRate}%`,
              'n': `${results.inputDays} jours`
            }}
          />
          <ResultCard
            label="Valeur actuelle rationnelle (C0r)"
            value={results.presentValue}
            formula="C0r = Cn / (1 + (i × n/360))"
            explanation="La valeur actuelle rationnelle représente le capital qui, placé au taux i pendant n jours, donnera la valeur nominale."
            inputs={{
              'Cn': `${results.discount + results.presentValue} €`,
              'er': `${results.discount} €`
            }}
          />
        </div>
      )}
      
      <HistoryPanel type="rational" />
    </div>
  );
}