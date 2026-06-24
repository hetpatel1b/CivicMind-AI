'use client';

import React, { useRef, useEffect } from 'react';

const CATEGORIES = [
  'All',
  'Road Damage',
  'Garbage',
  'Water Leakage',
  'Broken Streetlight',
  'Drainage Issue',
  'Traffic Signal Issue',
  'Public Safety Issue',
  'Other'
];

interface FeedFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FeedFilters({ selectedCategory, onCategoryChange }: FeedFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active filter into view on mount or change if necessary
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector('[aria-pressed="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedCategory]);

  return (
    <div className="w-full relative py-2 mb-4">
      {/* Scrollable Container with hidden scrollbars for clean UI */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto space-x-2 py-1 px-1 -mx-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        role="group"
        aria-label="Filter issues by category"
      >
        {CATEGORIES.map((category) => {
          // 'All' maps to an empty string internally to reset the filter
          const isActive = selectedCategory === category || (category === 'All' && selectedCategory === '');

          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category === 'All' ? '' : category)}
              aria-pressed={isActive}
              className={`
                whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out shrink-0
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-md dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white shadow-sm'
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Fade edges to indicate scrollability on small screens */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent sm:hidden" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent sm:hidden" />
    </div>
  );
}
