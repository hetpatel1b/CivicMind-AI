import React from 'react';

const CATEGORIES = [
  'Road Damage', 'Garbage', 'Street Light', 'Water Supply', 
  'Drainage', 'Traffic', 'Public Safety', 'Other'
];

interface CategorySelectorProps {
  value: string;
  onChange: (category: string) => void;
}

export default function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
        Issue Category
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`p-3 text-sm font-medium rounded-xl border text-center transition-colors ${
              value === cat 
                ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/40 dark:border-blue-500 dark:text-blue-300' 
                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-500/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
