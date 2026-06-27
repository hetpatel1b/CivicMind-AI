import React, { useState, useEffect } from 'react';
import { Search, X, Clock } from 'lucide-react';

interface HelpSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export default function HelpSearch({ value, onChange }: HelpSearchProps) {
  const [recent, setRecent] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const initRecent = () => {
      try {
        const stored = sessionStorage.getItem('civicmind_help_recent_searches');
        if (stored) {
          setRecent(JSON.parse(stored));
        }
      } catch {
        // Ignore
      }
    };
    initRecent();
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    try {
      const updated = [term, ...recent.filter(r => r !== term)].slice(0, 5);
      setRecent(updated);
      sessionStorage.setItem('civicmind_help_recent_searches', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveRecentSearch(value);
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleSelectRecent = (term: string) => {
    onChange(term);
    saveRecentSearch(term);
    setIsFocused(false);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative max-w-2xl w-full mb-12 group z-10">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 transition-colors ${isFocused ? 'text-blue-500' : 'text-gray-400'}`} aria-hidden="true" />
        </div>
        <input
          type="text"
          value={value}
          aria-label="Search help articles"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for articles, guides, and FAQs..."
          className="block w-full pl-11 pr-12 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-base transition-all"
        />
        {value && (
          <button 
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset rounded-r-2xl"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {isFocused && !value && recent.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50">
            Recent Searches
          </div>
          <ul>
            {recent.map((term, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleSelectRecent(term)}
                  className="w-full text-left px-4 py-3 flex items-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
                >
                  <Clock className="w-4 h-4 mr-3 text-gray-400" aria-hidden="true" />
                  {term}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
