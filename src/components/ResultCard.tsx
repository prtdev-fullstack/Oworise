

interface ResultCardProps {
  label: string;
  value: string | number | Date;
  formula: string;
  explanation?: string;
  inputs?: Record<string, any>;
  valueType?: 'currency' | 'number' | 'date' | 'days';
  valueOptions?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
}

export function ResultCard({
  label,
  value,
  formula,
  explanation,
  inputs,
  valueType = 'number',
  valueOptions = {}
}: ResultCardProps) {
  const formatValue = () => {
    if (value instanceof Date || valueType === 'date') {
      const date = value instanceof Date ? value : new Date(value);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...(valueOptions as Intl.DateTimeFormatOptions)
      });
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    switch (valueType) {
      case 'currency':
        return numericValue.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          ...valueOptions
        });
      case 'days':
        return `${numericValue.toLocaleString('fr-FR')} jours`;
      default:
        return numericValue.toLocaleString('fr-FR', valueOptions);
    }
  };

  return (
    <div className="financial-card p-6 hover-scale animate-scale-in">
      <div className="relative z-10">
        <h3 className="text-sm font-medium text-blue-600">{label}</h3>
        <p className="mt-2 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          {formatValue()}
        </p>
        
        <div className="mt-4 space-y-3">
          <div className="bg-white bg-opacity-50 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-700">Formule :</p>
            <p className="mt-1 text-sm text-gray-600 font-mono bg-white bg-opacity-50 p-2 rounded">
              {formula}
            </p>
          </div>

          {inputs && (
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-700">Valeurs :</p>
              <ul className="mt-1 text-sm text-gray-600 space-y-1">
                {Object.entries(inputs).map(([key, val]) => (
                  <li key={key} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    {key} = {val}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {explanation && (
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">{explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}