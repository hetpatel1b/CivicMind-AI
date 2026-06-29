import React from 'react';
import { motion } from 'framer-motion';

export type FilterType = 'All' | 'Unread' | 'Read' | 'System' | 'Moderation' | 'Reputation' | 'Reports';

interface NotificationFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: FilterType[] = ['All', 'Unread', 'Read', 'System', 'Moderation', 'Reputation', 'Reports'];

export default function NotificationFilter({ currentFilter, onFilterChange }: NotificationFilterProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label="Notification filters">
      {FILTERS.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          aria-pressed={currentFilter === filter}
          className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 overflow-hidden border ${
            currentFilter === filter
              ? 'text-white border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] bg-indigo-500/10'
              : 'text-gray-400 border-white/10 bg-white/5 hover:text-white hover:bg-white/10 hover:border-white/20'
          }`}
        >
          {currentFilter === filter && (
            <motion.div
              layoutId="active-filter-pill"
              className="absolute inset-0 bg-indigo-500/20 mix-blend-screen"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{filter}</span>
        </button>
      ))}
    </nav>
  );
}
