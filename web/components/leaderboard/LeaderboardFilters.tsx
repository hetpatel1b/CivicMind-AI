import React, { useState } from 'react';
import { Search, Filter, X, Globe, MapPin, Users, SortDesc } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  roleFilter: string;
  setRoleFilter: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export default function LeaderboardFilters({ 
  searchQuery, setSearchQuery, 
  roleFilter, setRoleFilter, 
  sortBy, setSortBy 
}: LeaderboardFiltersProps) {
  // UI Placeholder state for Scope
  const [scope, setScope] = useState<'global' | 'local' | 'friends'>('global');

  return (
    <div className="flex flex-col gap-6">
      {/* Scope Chips (UI Placeholder for future backend support) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
        {[
          { id: 'global', label: 'Global Ranking', icon: Globe },
          { id: 'local', label: 'My District', icon: MapPin },
          { id: 'friends', label: 'Friends', icon: Users },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = scope === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setScope(item.id as 'global' | 'local' | 'friends')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                isActive 
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-gray-500'}`} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 backdrop-blur-md p-3 rounded-[1.5rem] border border-white/10 shadow-inner">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-indigo-400/70" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search citizens by name..."
            aria-label="Search citizens"
            className="w-full pl-12 pr-10 py-3.5 border border-white/10 bg-[#050505]/50 rounded-xl text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all outline-none text-sm placeholder:text-gray-500 shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white focus-visible:outline-none focus-visible:text-indigo-400 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none group">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              aria-label="Filter by role"
              className="w-full md:w-auto appearance-none pl-11 pr-10 py-3.5 border border-white/10 bg-white/5 rounded-xl text-indigo-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none text-sm font-bold cursor-pointer hover:bg-white/10 transition-all shadow-inner"
            >
              <option value="all" className="bg-[#0a0f1c] text-white">All Roles</option>
              <option value="citizen" className="bg-[#0a0f1c] text-white">Citizens</option>
              <option value="moderator" className="bg-[#0a0f1c] text-white">Moderators</option>
              <option value="official" className="bg-[#0a0f1c] text-white">Officials</option>
            </select>
            <Filter className="w-4 h-4 text-indigo-400/70 group-hover:text-indigo-400 transition-colors absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          </div>

          <div className="relative flex-1 md:flex-none group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort by"
              className="w-full md:w-auto appearance-none pl-11 pr-10 py-3.5 border border-white/10 bg-white/5 rounded-xl text-indigo-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none text-sm font-bold cursor-pointer hover:bg-white/10 transition-all shadow-inner"
            >
              <option value="reputation" className="bg-[#0a0f1c] text-white">Highest XP</option>
              <option value="reports" className="bg-[#0a0f1c] text-white">Most Reports</option>
              <option value="supports" className="bg-[#0a0f1c] text-white">Most Supports</option>
              <option value="comments" className="bg-[#0a0f1c] text-white">Most Comments</option>
              <option value="alphabetical" className="bg-[#0a0f1c] text-white">Alphabetical (A-Z)</option>
            </select>
            <SortDesc className="w-4 h-4 text-indigo-400/70 group-hover:text-indigo-400 transition-colors absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
