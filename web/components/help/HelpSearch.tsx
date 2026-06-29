import React, { useState, useEffect } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpSearchProps {
  value: string;
  onChange: (val: string) => void;
}

const POPULAR_SEARCHES = ['Report issue', 'Earn badges', 'Change password', 'Verify account'];

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
    <div className="relative w-full max-w-3xl mx-auto mb-16 z-20">
      <div className={`relative bg-white dark:bg-gray-900/80 backdrop-blur-xl border-2 rounded-3xl transition-all duration-300 shadow-lg flex items-center ${isFocused ? 'border-indigo-500 shadow-indigo-500/10 dark:shadow-indigo-500/20 scale-[1.02]' : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-xl'}`}>
        <div className="pl-6 pr-3 flex items-center pointer-events-none">
          <Search className={`h-6 w-6 transition-colors duration-300 ${isFocused ? 'text-indigo-500' : 'text-gray-400'}`} aria-hidden="true" />
        </div>
        <input
          type="text"
          value={value}
          aria-label="Search help articles"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for guides, workflows, or FAQs..."
          className="w-full py-5 px-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg font-medium"
        />
        <AnimatePresence>
          {value && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              aria-label="Clear search"
              className="mr-4 p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none rounded-full transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isFocused && !value && (recent.length > 0 || POPULAR_SEARCHES.length > 0) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white dark:bg-gray-900/95 backdrop-blur-2xl border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            {recent.length > 0 && (
              <div className="p-2">
                <div className="px-4 py-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Recent Searches
                </div>
                <ul>
                  {recent.map((term, idx) => (
                    <li key={`recent-${idx}`}>
                      <button
                        onClick={() => handleSelectRecent(term)}
                        className="w-full text-left px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors group"
                      >
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-3 text-gray-400 group-hover:text-indigo-500 transition-colors" aria-hidden="true" />
                          {term}
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {POPULAR_SEARCHES.length > 0 && (
              <div className={`p-2 ${recent.length > 0 ? 'border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20' : ''}`}>
                <div className="px-4 py-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Popular Topics
                </div>
                <div className="flex flex-wrap gap-2 px-4 pb-4">
                  {POPULAR_SEARCHES.map((term, idx) => (
                    <button
                      key={`popular-${idx}`}
                      onClick={() => handleSelectRecent(term)}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900/50 rounded-full text-sm font-semibold transition-all hover:shadow-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
