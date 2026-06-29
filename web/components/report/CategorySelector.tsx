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
      <label className="block text-sm font-bold text-gray-300 mb-2">
        Issue Category
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`p-3.5 text-sm font-bold rounded-xl border text-center transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              value === cat 
                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                : 'bg-white/[0.02] border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
