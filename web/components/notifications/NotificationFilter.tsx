import React from 'react';

export type FilterType = 'All' | 'Unread' | 'Read' | 'System' | 'Activity';

interface NotificationFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: FilterType[] = ['All', 'Unread', 'Read', 'System', 'Activity'];

export default function NotificationFilter({ currentFilter, onFilterChange }: NotificationFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            currentFilter === filter
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
