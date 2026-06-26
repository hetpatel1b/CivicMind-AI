import React from 'react';

const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];

interface SeveritySelectorProps {
  value: string;
  onChange: (severity: string) => void;
}

export default function SeveritySelector({ value, onChange }: SeveritySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Severity Level
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SEVERITIES.map((sev) => {
          const isSelected = value === sev;
          let colorClass = '';
          if (isSelected) {
            switch(sev) {
              case 'Low': colorClass = 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-500 dark:text-green-300'; break;
              case 'Medium': colorClass = 'bg-yellow-50 border-yellow-500 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-500 dark:text-yellow-300'; break;
              case 'High': colorClass = 'bg-orange-50 border-orange-500 text-orange-700 dark:bg-orange-900/30 dark:border-orange-500 dark:text-orange-300'; break;
              case 'Critical': colorClass = 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/30 dark:border-red-500 dark:text-red-300'; break;
            }
          } else {
            colorClass = 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:dark:border-gray-600';
          }
          return (
            <button
              key={sev}
              type="button"
              onClick={() => onChange(sev)}
              className={`p-3 text-sm font-medium rounded-xl border text-center transition-colors ${colorClass}`}
            >
              {sev}
            </button>
          );
        })}
      </div>
    </div>
  );
}
