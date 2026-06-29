'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Check } from 'lucide-react';

const CATEGORIES = ['All', 'Road Damage', 'Garbage', 'Water Leakage', 'Broken Streetlight', 'Drainage Issue', 'Traffic Signal Issue', 'Public Safety Issue', 'Other'];
const SEVERITIES = ['All', 'Critical', 'High', 'Medium', 'Low'];
const STATUSES = ['All', 'Open', 'In Progress', 'Resolved'];
const SORTS = ['Newest', 'Most Supported', 'Most Commented'];

export interface FeedFilterState {
  category: string;
  severity: string;
  status: string;
  sortBy: string;
}

interface FeedFiltersProps {
  filters: FeedFilterState;
  onFilterChange: (filters: FeedFilterState) => void;
}

export default function FeedFilters({ filters, onFilterChange }: FeedFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<'severity' | 'status' | 'sort' | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDropdownClick = (e: React.MouseEvent, type: 'severity' | 'status' | 'sort') => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  const updateFilter = (key: keyof FeedFilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
    setActiveDropdown(null);
  };

  return (
    <div className="w-full relative mb-6 z-[100] sticky top-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0f1c]/90 backdrop-blur-3xl p-3 rounded-2xl border border-white/10 ring-1 ring-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        
        {/* Scrollable Category Chips */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto space-x-2 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {CATEGORIES.map((cat) => {
              const isActive = filters.category === cat || (cat === 'All' && filters.category === '');
              return (
                <button
                  key={cat}
                  onClick={() => updateFilter('category', cat === 'All' ? '' : cat)}
                  className={`
                    whitespace-nowrap px-4 py-1.5 text-sm font-semibold rounded-xl transition-all shrink-0
                    ${isActive 
                      ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                      : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {/* Scroll fade edges */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0a0f1c] to-transparent sm:hidden" />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2 pl-2 sm:border-l border-white/10 shrink-0">
          
          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={(e) => handleDropdownClick(e, 'sort')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-300 bg-[#050505]/50 border border-white/5 hover:bg-white/10 hover:text-white rounded-xl transition-colors shadow-inner"
            >
              <Filter className="w-3.5 h-3.5" />
              {filters.sortBy}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'sort' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'sort' && (
                <motion.div 
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-[#0a0f1c]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden py-1 ring-1 ring-white/5"
                >
                  {SORTS.map(sort => (
                    <button
                      key={sort}
                      onClick={() => updateFilter('sortBy', sort)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
                    >
                      {sort}
                      {filters.sortBy === sort && <Check className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Severity Dropdown */}
          <div className="relative hidden md:block">
            <button 
              onClick={(e) => handleDropdownClick(e, 'severity')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-300 bg-[#050505]/50 border border-white/5 hover:bg-white/10 hover:text-white rounded-xl transition-colors shadow-inner"
            >
              Sev: {filters.severity || 'All'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'severity' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'severity' && (
                <motion.div 
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-40 bg-[#0a0f1c]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden py-1 ring-1 ring-white/5"
                >
                  {SEVERITIES.map(sev => (
                    <button
                      key={sev}
                      onClick={() => updateFilter('severity', sev === 'All' ? '' : sev.toUpperCase())}
                      className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
                    >
                      {sev}
                      {(filters.severity === sev.toUpperCase() || (sev === 'All' && !filters.severity)) && <Check className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status Dropdown */}
          <div className="relative hidden md:block">
            <button 
              onClick={(e) => handleDropdownClick(e, 'status')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-300 bg-[#050505]/50 border border-white/5 hover:bg-white/10 hover:text-white rounded-xl transition-colors shadow-inner"
            >
              Status: {filters.status || 'All'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'status' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'status' && (
                <motion.div 
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-40 bg-[#0a0f1c]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden py-1 ring-1 ring-white/5"
                >
                  {STATUSES.map(stat => (
                    <button
                      key={stat}
                      onClick={() => updateFilter('status', stat === 'All' ? '' : stat.toLowerCase())}
                      className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
                    >
                      {stat}
                      {(filters.status === stat.toLowerCase() || (stat === 'All' && !filters.status)) && <Check className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
