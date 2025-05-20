import React, { useState } from 'react';
import { useCalculation } from '../contexts/CalculationContext';
import { Trash2, History, ChevronDown, ChevronUp } from 'lucide-react';

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(date);
};

const getTypeLabel = (type: string) => {
  const labels = {
    commercial: 'Escompte Commercial',
    rational: 'Escompte Rationnel',
    agios: 'Agios',
    rates: 'Taux',
    equivalent: 'Dates d\'équivalence',
  };
  return labels[type as keyof typeof labels] || type;
};

interface HistoryPanelProps {
  type: 'commercial' | 'rational' | 'agios' | 'rates' | 'equivalent';
}

export function HistoryPanel({ type }: HistoryPanelProps) {
  const { history, clearHistory } = useCalculation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter history for this specific module type
  const moduleHistory = history.filter(entry => entry.type === type);

  if (moduleHistory.length === 0) {
    return null;
  }

  const clearModuleHistory = () => {
    clearHistory(type);
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-900 hover:text-gray-700"
        >
          <History className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium">Historique des calculs</h3>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        <button
          onClick={clearModuleHistory}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          Effacer l'historique
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-4">
          {moduleHistory.map((entry, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-medium text-gray-900">
                  {getTypeLabel(entry.type)}
                </h4>
                <span className="text-xs text-gray-500">
                  {formatDate(entry.timestamp)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-1">Entrées</h5>
                  {Object.entries(entry.inputs).map(([key, value]) => (
                    <p key={key} className="text-sm text-gray-700">
                      {key}: {value}
                    </p>
                  ))}
                </div>
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-1">Résultats</h5>
                  {Object.entries(entry.results).map(([key, value]) => (
                    <p key={key} className="text-sm text-gray-700">
                      {key}: {typeof value === 'number' 
                        ? value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
                        : value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}