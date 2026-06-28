'use client';

import React, { useEffect, useState } from 'react';
import { IssueFeedItem } from '@/services/feed';
import { getFeedIssues } from '@/services/feed';
import IssueCard from '@/components/feed/IssueCard';
import FeedFilters from '@/components/feed/FeedFilters';
import SearchBar from '@/components/feed/SearchBar';
import AICommunityHighlights from '@/components/feed/AICommunityHighlights';
import { AlertCircle, Loader2, RefreshCcw } from 'lucide-react';

export default function FeedPage() {
  const [issues, setIssues] = useState<IssueFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Client-side filtering and search states
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadFeed = async (showLoading = true) => {
    try {
      if (showLoading === true) setIsLoading(true);
      setError(null);
      // Fetch latest issues via the dedicated Supabase service
      const data = await getFeedIssues();
      setIssues(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred while loading the community feed.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFeed(false);
  }, []);

  // Filter issues purely on the client side based on category and search term
  const filteredIssues = issues.filter((issue) => {
    const matchesCategory = selectedCategory ? issue.category === selectedCategory : true;
    
    if (!matchesCategory) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchTitle = issue.title.toLowerCase().includes(term);
      const matchDesc = (issue.description || '').toLowerCase().includes(term);
      const matchCat = issue.category.toLowerCase().includes(term);
      
      return matchTitle || matchDesc || matchCat;
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Community Feed
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-lg">
              Stay updated with the latest infrastructure reports in your area.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Bar Component */}
            <div className="w-full sm:w-72 lg:w-80">
              <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
              />
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => loadFeed(true)}
              disabled={isLoading}
              className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors shrink-0"
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        {!isLoading && !error && (
          <FeedFilters 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
        )}

        {/* AI Intelligence Layer */}
        {!isLoading && !error && issues.length > 0 && (
          <AICommunityHighlights issues={issues} />
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
              Loading community feed...
            </p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="p-6 mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl flex items-start animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Unable to load feed</h3>
              <p className="text-red-600 dark:text-red-400 mt-1 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredIssues.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 mt-8 bg-white/50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 backdrop-blur-sm shadow-sm animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              {searchTerm || selectedCategory 
                ? 'No matching reports found.' 
                : 'No community reports found yet.'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md text-lg">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search or clearing the filters to see more results.' 
                : 'Be the first to report an issue and help improve your community infrastructure.'}
            </p>
          </div>
        )}

        {/* Data Grid */}
        {!isLoading && !error && filteredIssues.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
