import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { calculateAgios } from '../utils/calculations';
import { ResultCard } from './ResultCard';
import { useCalculation } from '../contexts/CalculationContext';
import { HistoryPanel } from './HistoryPanel';
import { ResetButton } from './ResetButton';

// 1. Typage des données du formulaire
type FormInputs = {
  nominal: number;
  rate: number;
  days: number;
  commission: number;
  tva: number;
};

export function Agios() {
  const [results, setResults] = useState<{
    agiosHT: number;
    agiosTTC: number;
    netHT: number;
    netTTC: number;
  } | null>(null);

  const { addToHistory } = useCalculation();

  // 2. Utilisation de useForm avec typage
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  // 3. Typage de la fonction de soumission
  const handleCalculate: SubmitHandler<FormInputs> = (data) => {
    const results = calculateAgios(
      data.nominal,
      data.rate,
      data.days,
      data.commission,
      data.tva
    );
    setResults(results);

    addToHistory({
      type: 'agios',
      timestamp: new Date(),
      inputs: {
        'Valeur nominale': data.nominal,
        'Taux': `${data.rate}%`,
        'Jours': data.days,
        'Commission': `${data.commission}%`,
        'TVA': `${data.tva}%`,
      },
      results: {
        'Agios HT': results.agiosHT,
        'Agios TTC': results.agiosTTC,
        'Net HT': results.netHT,
        'Net TTC': results.netTTC,
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
          Module 3 : Agios et Coût de l'escompte
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
            {...register('nominal', { required: true, min: 0, valueAsNumber: true })}
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
            {...register('rate', { required: true, min: 0, max: 100, valueAsNumber: true })}
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
            {...register('days', { required: true, min: 1, max: 360, valueAsNumber: true })}
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
            {...register('commission', { required: true, min: 0, valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.commission && (
            <p className="mt-1 text-sm text-red-600">La commission est requise</p>
          )}
        </div>

        <div>
          <label htmlFor="tva" className="block text-sm font-medium text-gray-700">
            TVA (%)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('tva', { required: true, min: 0, valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.tva && (
            <p className="mt-1 text-sm text-red-600">La TVA est requise</p>
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
            label="Agios HT"
            value={results.agiosHT}
            formula="Agios HT = Escompte + Commission"
          />
          <ResultCard
            label="Agios TTC"
            value={results.agiosTTC}
            formula="Agios TTC = Agios HT × (1 + TVA)"
          />
          <ResultCard
            label="Net HT"
            value={results.netHT}
            formula="Net HT = Nominal - Agios HT"
          />
          <ResultCard
            label="Net TTC"
            value={results.netTTC}
            formula="Net TTC = Nominal - Agios TTC"
          />
        </div>
      )}

      <HistoryPanel type="agios" />
    </div>
  );
}
