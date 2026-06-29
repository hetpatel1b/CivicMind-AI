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
import LeaderboardCoach from '@/components/leaderboard/LeaderboardCoach';
import { fetchLeaderboardData } from '@/components/leaderboard/service';
import { createClient } from '@/lib/supabase-browser';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX } from 'lucide-react';

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
    <main className="min-h-screen bg-[#050505] relative pt-24 pb-12 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Ambient OS Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Deep ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-3/4 left-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <LeaderboardHeader onRefresh={handleRefresh} isRefreshing={loading} />

        <div className="mb-6 flex justify-center">
          <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        {activeTab !== 'Overall' && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm font-medium text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400 py-2 px-4 rounded-xl max-w-fit mx-auto mb-8 border border-orange-100 dark:border-orange-800/50"
          >
            Timeframe filtering is currently unsupported by the backend. Showing overall data.
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LeaderboardSkeleton />
            </motion.div>
          ) : error ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LeaderboardError onRetry={handleRefresh} />
            </motion.div>
          ) : users.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LeaderboardEmpty />
            </motion.div>
          ) : (
            <motion.div 
              key="content" 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-12"
            >
              
              <LeaderboardCoach users={users} currentUserId={currentUserId} />

              {processedUsers.length > 0 && (
                <section aria-labelledby="podium-heading">
                  <h2 id="podium-heading" className="sr-only">Top 3 Citizens</h2>
                  <TopThreePodium users={processedUsers.slice(0, 3)} currentUserId={currentUserId} />
                </section>
              )}
              
              <motion.section 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                aria-labelledby="leaderboard-table-heading" 
                className="bg-[#0a0f1c]/60 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-3xl ring-1 ring-white/5 relative"
              >
                {/* Internal table glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                
                <h2 id="leaderboard-table-heading" className="sr-only">Leaderboard Rankings</h2>
                <div className="p-5 sm:p-6 lg:p-8 border-b border-white/10 bg-white/5 relative z-10">
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
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="p-16 text-center flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-900/20"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 shadow-inner">
                      <SearchX className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-black text-white mb-1 tracking-tight">No citizens found</h3>
                    <p className="text-sm font-medium text-gray-400">Try adjusting your filters or search query.</p>
                  </motion.div>
                ) : (
                  <LeaderboardTable users={processedUsers} currentUserId={currentUserId} />
                )}
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </main>
  );
}
