'use client';

import React, { useState, useEffect, useMemo } from 'react';
import LeaderboardHeader from '@/components/leaderboard/LeaderboardHeader';
import LeaderboardTabs, { TimeframeTab } from '@/components/leaderboard/LeaderboardTabs';
import LeaderboardFilters from '@/components/leaderboard/LeaderboardFilters';
import LeaderboardTable, { LeaderboardUser } from '@/components/leaderboard/LeaderboardTable';
import TopThreePodium from '@/components/leaderboard/TopThreePodium';
import LeaderboardSkeleton from '@/components/leaderboard/LeaderboardSkeleton';
import LeaderboardEmpty from '@/components/leaderboard/LeaderboardEmpty';
import LeaderboardError from '@/components/leaderboard/LeaderboardError';
import { fetchLeaderboardData } from '@/components/leaderboard/service';
import { createClient } from '@/lib/supabase-browser';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<TimeframeTab>('Overall');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('reputation');

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);

      const data = await fetchLeaderboardData();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []); // Backend currently doesn't support timeframe filtering

  const handleRefresh = () => {
    loadData();
  };

  // Client-side filtering and sorting
  const processedUsers = useMemo(() => {
    let result = [...users];

    // Filter by Role
    if (roleFilter !== 'all') {
      result = result.filter(u => u.role.toLowerCase() === roleFilter.toLowerCase());
    }

    // Search Query
    if (searchQuery.trim() !== '') {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(lowerQ) || 
        (u.id.includes(lowerQ)) // Treating ID as proxy for username if not available
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'reports':
          return b.reports - a.reports;
        case 'supports':
          return b.supports - a.supports;
        case 'comments':
          return b.comments - a.comments;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'reputation':
        default:
          return b.reputation - a.reputation;
      }
    });

    // Re-assign ranks based on current sort
    return result.map((u, i) => ({ ...u, rank: i + 1 }));
  }, [users, searchQuery, roleFilter, sortBy]);

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <LeaderboardHeader onRefresh={handleRefresh} isRefreshing={loading} />
        </div>

        <div className="mb-4 flex justify-center">
          <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        {activeTab !== 'Overall' && (
          <p className="text-center text-sm text-gray-500 mb-8">
            Note: Timeframe filtering is currently unsupported by the backend. Showing overall data.
          </p>
        )}

        {loading ? (
          <LeaderboardSkeleton />
        ) : error ? (
          <LeaderboardError onRetry={handleRefresh} />
        ) : users.length === 0 ? (
          <LeaderboardEmpty />
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            {processedUsers.length > 0 && (
              <section aria-labelledby="podium-heading">
                <h2 id="podium-heading" className="sr-only">Top 3 Citizens</h2>
                <TopThreePodium users={processedUsers.slice(0, 3)} currentUserId={currentUserId} />
              </section>
            )}
            
            <section aria-labelledby="leaderboard-table-heading" className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
              <h2 id="leaderboard-table-heading" className="sr-only">Leaderboard Rankings</h2>
              <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <LeaderboardFilters 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  roleFilter={roleFilter}
                  setRoleFilter={setRoleFilter}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>
              {processedUsers.length === 0 ? (
                <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                  No citizens found matching your search.
                </div>
              ) : (
                <LeaderboardTable users={processedUsers} currentUserId={currentUserId} />
              )}
            </section>
          </div>
        )}
        
      </div>
    </main>
  );
}
