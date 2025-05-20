import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { calculateEquivalentDate } from '../utils/calculations';
import { ResultCard } from './ResultCard';
import { useCalculation } from '../contexts/CalculationContext';
import { HistoryPanel } from './HistoryPanel';
import { ResetButton } from './ResetButton';

interface Effect {
  amount: number;
  dueDate: string;
}

interface FormData {
  amount1: number;
  date1: string;
  amount2: number;
  date2: string;
}

export function EquivalentDates() {
  const [results, setResults] = useState<{
    equivalentDate: string;
    weightedDays: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const { addToHistory } = useCalculation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  // Fonction de calcul des dates d'équivalence
  const handleCalculate: SubmitHandler<FormData> = (data) => {
    setError(null);

    // Conversion explicite et validation des montants
    const amount1 = Number(data.amount1);
    const amount2 = Number(data.amount2);
    if (isNaN(amount1) || isNaN(amount2)) {
      setError("Les montants doivent être des nombres valides.");
      return;
    }

    const effects: Effect[] = [
      { amount: amount1, dueDate: data.date1 },
      { amount: amount2, dueDate: data.date2 },
    ];

    const results = calculateEquivalentDate(effects);
    if (!results) {
      setError("Impossible de calculer la date d'équivalence. Vérifiez les dates.");
      return;
    }

    // Vérification de l'existence du type pour le calcul des jours pondérés
    if (typeof results.weightedDays !== "number") {
      setError("Erreur interne : le calcul des jours moyens a échoué.");
      return;
    }

    setResults(results);

    // Ajouter les résultats dans l'historique
    addToHistory({
      type: 'equivalent',
      timestamp: new Date(),
      inputs: {
        'Montant 1': data.amount1,
        'Date 1': new Date(data.date1).toLocaleDateString('fr-FR'),
        'Montant 2': data.amount2,
        'Date 2': new Date(data.date2).toLocaleDateString('fr-FR'),
      },
      results: {
        'Date d\'équivalence': new Date(results.equivalentDate).toLocaleDateString('fr-FR'),
        'Jours moyens': results.weightedDays,
      },
    });
  };

  // Fonction de réinitialisation du formulaire
  const handleReset = () => {
    setResults(null);
    setError(null);
    reset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Module 5 : Dates d'équivalence
        </h2>
        <ResetButton onReset={handleReset} />
      </div>

      <form onSubmit={handleSubmit(handleCalculate)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Premier effet</h3>
            <div>
              <label htmlFor="amount1" className="block text-sm font-medium text-gray-700">
                Montant
              </label>
              <input
                type="number"
                step="0.01"
                {...register('amount1', { required: true, min: 0, valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.amount1 && (
                <p className="mt-1 text-sm text-red-600">Le montant est requis</p>
              )}
            </div>
            <div>
              <label htmlFor="date1" className="block text-sm font-medium text-gray-700">
                Date d'échéance
              </label>
              <input
                type="date"
                {...register('date1', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.date1 && (
                <p className="mt-1 text-sm text-red-600">La date est requise</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Deuxième effet</h3>
            <div>
              <label htmlFor="amount2" className="block text-sm font-medium text-gray-700">
                Montant
              </label>
              <input
                type="number"
                step="0.01"
                {...register('amount2', { required: true, min: 0, valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.amount2 && (
                <p className="mt-1 text-sm text-red-600">Le montant est requis</p>
              )}
            </div>
            <div>
              <label htmlFor="date2" className="block text-sm font-medium text-gray-700">
                Date d'échéance
              </label>
              <input
                type="date"
                {...register('date2', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.date2 && (
                <p className="mt-1 text-sm text-red-600">La date est requise</p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

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
            label="Date d'équivalence"
            value={results.equivalentDate}
            formula="Date moyenne pondérée par les montants"
            valueType="date"
          />
          <ResultCard
            label="Nombre de jours moyen"
            value={results.weightedDays}
            formula="Σ(Montant × Jours) / Σ(Montants)"
            valueType="days"
          />
        </div>
      )}

      <HistoryPanel type="equivalent" />
    </div>
  );
}
