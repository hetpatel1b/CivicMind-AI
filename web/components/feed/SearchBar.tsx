'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-indigo-400/70 group-focus-within:text-indigo-400 transition-colors drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]" aria-hidden="true" />
      </div>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-12 pr-12 py-3.5 border border-white/10 rounded-2xl leading-5 bg-[#0a0f1c]/50 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 sm:text-sm transition-all shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:bg-[#0a0f1c]/70 hover:border-white/20"
        placeholder="Search civic intelligence..."
        aria-label="Search reports"
      />
      
      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
          aria-label="Clear search"
        >
          <div className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <X className="h-4 w-4" aria-hidden="true" />
          </div>
        </button>
      )}
    </div>
  );
}
