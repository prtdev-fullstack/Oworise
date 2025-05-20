import  { useState } from 'react';
import { calculateCommercialDiscount } from '../utils/calculations';
import { DiscountForm } from './DiscountForm';
import { ResultCard } from './ResultCard';
import { useCalculation } from '../contexts/CalculationContext';
import { HistoryPanel } from './HistoryPanel';
import { ResetButton } from './ResetButton';

export function CommercialDiscount() {
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
      ...calculateCommercialDiscount(data.nominal, data.rate, data.days),
      inputRate: data.rate,
      inputDays: data.days
    };
    setResults(results);
    
    addToHistory({
      type: 'commercial',
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
          Module 1 : Escompte Commercial
        </h2>
        <ResetButton onReset={handleReset} />
      </div>
      
      <DiscountForm key={resetKey} onCalculate={handleCalculate} />
      
      {results && (
        <div className="mt-6 space-y-4">
          <ResultCard
            label="Escompte commercial (ec)"
            value={results.discount}
            formula="ec = (Cn × i × n) / 360"
            explanation="L'escompte commercial représente la retenue effectuée par la banque sur la valeur nominale de l'effet. Il est proportionnel au montant, au taux et à la durée."
            inputs={{
              'Cn': `${results.discount + results.presentValue} €`,
              'i': `${results.inputRate}%`,
              'n': `${results.inputDays} jours`
            }}
          />
          <ResultCard
            label="Valeur actuelle commerciale (C0c)"
            value={results.presentValue}
            formula="C0c = Cn - ec"
            explanation="La valeur actuelle commerciale est le montant effectivement versé au client, obtenu en déduisant l'escompte de la valeur nominale."
            inputs={{
              'Cn': `${results.discount + results.presentValue} €`,
              'ec': `${results.discount} €`
            }}
          />
        </div>
      )}
      
      <HistoryPanel type="commercial" />
    </div>
  );
}