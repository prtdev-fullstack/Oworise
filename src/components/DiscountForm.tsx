import React from 'react';
import { useForm } from 'react-hook-form';

interface DiscountFormProps {
  onCalculate: (data: { nominal: number; rate: number; days: number }) => void;
  onReset?: () => void;
}

export function DiscountForm({ onCalculate, onReset }: DiscountFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  React.useEffect(() => {
    if (onReset) {
      onReset();
    }
  }, [onReset]);

  return (
    <form onSubmit={handleSubmit((data) => onCalculate(data as any))} className="space-y-4">
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

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Calculer
      </button>
    </form>
  );
}