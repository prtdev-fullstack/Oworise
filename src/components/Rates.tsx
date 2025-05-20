import { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { calculateRates } from '../utils/calculations';
import { ResultCard } from './ResultCard';
import { useCalculation } from '../contexts/CalculationContext';
import { HistoryPanel } from './HistoryPanel';
import { ResetButton } from './ResetButton';

// Définir le type FormData
interface FormData {
  nominal: number;
  rate: number;
  days: number;
  commission: number;
}

export function Rates() {
  const [results, setResults] = useState<{
    tre: number;
    tp: number;
    tr: number;
  } | null>(null);

  const { addToHistory } = useCalculation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>(); // Appliquer le type FormData ici

  const handleCalculate = (data: FormData) => {  // Ici, on spécifie que "data" est du type FormData
    const results = calculateRates(
      data.nominal,
      data.rate,
      data.days,
      data.commission
    );
    setResults(results);
    
    addToHistory({
      type: 'rates',
      timestamp: new Date(),
      inputs: {
        'Valeur nominale': data.nominal,
        'Taux': `${data.rate}%`,
        'Jours': data.days,
        'Commission': `${data.commission}%`,
      },
      results: {
        'TRE': `${results.tre}%`,
        'TP': `${results.tp}%`,
        'TR': `${results.tr}%`,
      },
    });
  };

  const handleReset = () => {
    setResults(null);
    reset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Module 4 : Taux
        </h2>
        <ResetButton onReset={handleReset} />
      </div>

      <form onSubmit={handleSubmit(handleCalculate)} className="space-y-4">
        <div>
          <label htmlFor="nominal" className="block text-sm font-medium text-gray-700">
            Valeur nominale (Cn)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('nominal', { required: true, min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.nominal && (
            <p className="mt-1 text-sm text-red-600">La valeur nominale est requise</p>
          )}
        </div>

        <div>
          <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
            Taux d'escompte (i) en %
          </label>
          <input
            type="number"
            step="0.01"
            {...register('rate', { required: true, min: 0, max: 100 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.rate && (
            <p className="mt-1 text-sm text-red-600">
              Le taux doit être compris entre 0 et 100
            </p>
          )}
        </div>

        <div>
          <label htmlFor="days" className="block text-sm font-medium text-gray-700">
            Nombre de jours (n)
          </label>
          <input
            type="number"
            {...register('days', { required: true, min: 1, max: 360 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.days && (
            <p className="mt-1 text-sm text-red-600">
              Le nombre de jours doit être compris entre 1 et 360
            </p>
          )}
        </div>

        <div>
          <label htmlFor="commission" className="block text-sm font-medium text-gray-700">
            Commission (%)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('commission', { required: true, min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.commission && (
            <p className="mt-1 text-sm text-red-600">La commission est requise</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Calculer
        </button>
      </form>

      {results && (
        <div className="mt-6 space-y-4">
          <ResultCard
            label="Taux réel d'escompte (TRE)"
            value={results.tre}
            formula="TRE = (Agios × 360) / (Nominal × Jours)"
          />
          <ResultCard
            label="Taux de placement (TP)"
            value={results.tp}
            formula="TP = (Agios × 360) / (Net × Jours)"
          />
          <ResultCard
            label="Taux de revient (TR)"
            value={results.tr}
            formula="TR = (Agios × 360) / (Net × Jours)"
          />
        </div>
      )}
      
      <HistoryPanel type="rates" />
    </div>
  );
}
