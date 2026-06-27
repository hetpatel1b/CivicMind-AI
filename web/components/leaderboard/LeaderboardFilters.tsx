import React from 'react';
import { Search, Filter, X } from 'lucide-react';

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
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative w-full sm:max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search members..."
          aria-label="Search members"
          className="w-full pl-10 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm placeholder:text-gray-400"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus-visible:outline-none focus-visible:text-blue-500"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            aria-label="Filter by role"
            className="w-full sm:w-auto appearance-none pl-10 pr-8 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="citizen">Citizen</option>
            <option value="moderator">Moderator</option>
            <option value="official">Official</option>
          </select>
          <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
        </div>

        <div className="relative flex-1 sm:flex-none">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort by"
            className="w-full sm:w-auto appearance-none px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm cursor-pointer"
          >
            <option value="reputation">Highest Reputation</option>
            <option value="reports">Most Reports</option>
            <option value="supports">Most Supports</option>
            <option value="comments">Most Comments</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
