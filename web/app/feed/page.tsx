'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { IssueFeedItem, getFeedIssues } from '@/services/feed';
import IssueCard from '@/components/feed/IssueCard';
import FeedFilters, { FeedFilterState } from '@/components/feed/FeedFilters';
import SearchBar from '@/components/feed/SearchBar';
import AICommunityHighlights from '@/components/feed/AICommunityHighlights';
import { AlertCircle, Loader2, RefreshCcw, Activity, ShieldCheck, MapPin, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

export default function FeedPage() {
  const [issues, setIssues] = useState<IssueFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Advanced Filter States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<FeedFilterState>({
    category: '',
    severity: '',
    status: '',
    sortBy: 'Newest'
  });

  const loadFeed = async (showLoading = true) => {
    try {
      if (showLoading === true) setIsLoading(true);
      setError(null);
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

  // Filter & Sort Logic (Client-Side Only)
  const processedIssues = useMemo(() => {
    let result = [...issues];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(issue => 
        issue.title.toLowerCase().includes(term) ||
        (issue.description || '').toLowerCase().includes(term) ||
        issue.category.toLowerCase().includes(term)
      );
    }

    // Category
    if (filters.category) {
      result = result.filter(issue => issue.category === filters.category);
    }

    // Severity
    if (filters.severity) {
      result = result.filter(issue => (issue.severity || 'LOW').toUpperCase() === filters.severity);
    }

    // Status
    if (filters.status) {
      result = result.filter(issue => {
        const s = (issue.status || '').toLowerCase();
        if (filters.status === 'open') return s !== 'resolved' && s !== 'closed' && s !== 'in progress' && s !== 'in-progress';
        if (filters.status === 'in progress') return s === 'in progress' || s === 'in-progress';
        if (filters.status === 'resolved') return s === 'resolved' || s === 'closed';
        return true;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (filters.sortBy === 'Newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      // Mock metrics for sorting since they are simulated deterministically on cards
      const seedA = a.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const seedB = b.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      if (filters.sortBy === 'Most Supported') {
        return ((seedB % 150) + 12) - ((seedA % 150) + 12);
      }
      if (filters.sortBy === 'Most Commented') {
        return ((seedB % 45) + 3) - ((seedA % 45) + 3);
      }
      return 0;
    });

    return result;
  }, [issues, searchTerm, filters]);

  // Group by timeline visually if sorted by Newest
  const timelineGroups = useMemo(() => {
    if (filters.sortBy !== 'Newest') return { 'Filtered Results': processedIssues };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups: Record<string, IssueFeedItem[]> = {
      'Today': [],
      'Yesterday': [],
      'Earlier': []
    };

    processedIssues.forEach(issue => {
      const issueDate = new Date(issue.created_at);
      issueDate.setHours(0, 0, 0, 0);
      
      if (issueDate.getTime() === today.getTime()) {
        groups['Today'].push(issue);
      } else if (issueDate.getTime() === yesterday.getTime()) {
        groups['Yesterday'].push(issue);
      } else {
        groups['Earlier'].push(issue);
      }
    });

    // Remove empty groups
    return Object.fromEntries(Object.entries(groups).filter(([_, items]) => items.length > 0));
  }, [processedIssues, filters.sortBy]);

  // Insights derived data
  const resolvedTodayCount = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return issues.filter(i => {
      const isResolved = i.status?.toLowerCase() === 'resolved' || i.status?.toLowerCase() === 'closed';
      const isToday = new Date(i.created_at) >= today;
      // In reality, this would check resolved_at date. We use created_at roughly for demo insights.
      return isResolved && isToday;
    }).length;
  }, [issues]);

  const trendingCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    issues.forEach(i => { counts[i.category] = (counts[i.category] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(e => e[0]);
  }, [issues]);

  return (
    <main className="min-h-screen bg-[#050505] relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      
      {/* Background ambient noise and glows */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Premium Hero Section */}
      <div className="border-b border-white/10 relative overflow-hidden z-10 bg-[#0a0f1c]/30 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex-1">
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <span className="text-[11px] font-black text-indigo-300 uppercase tracking-widest drop-shadow-sm">Active Community Pulse</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 flex flex-wrap items-center gap-3">
                Community 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  Intelligence
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-gray-400 max-w-2xl leading-relaxed font-medium">
                Stay updated with verified civic activity across your region. Discover trending issues, join the discussion, and see exactly where community action is needed most today.
              </motion.p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full lg:w-96 flex flex-col gap-4">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <button
                onClick={() => loadFeed(true)}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none border border-indigo-400/30"
              >
                <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Sync Live Feed
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Main Feed Column */}
          <div className="flex-1 w-full min-w-0">
            {/* AI Layer */}
            {!isLoading && !error && issues.length > 0 && (
              <AICommunityHighlights issues={issues} />
            )}

            {/* Smart Filters */}
            {!isLoading && !error && (
              <FeedFilters 
                filters={filters}
                onFilterChange={setFilters}
              />
            )}

            {/* States */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-40 bg-[#0a0f1c]/50 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-6 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                <p className="text-gray-400 font-bold tracking-wide">Aggregating community data...</p>
              </div>
            )}

            {!isLoading && error && (
              <div className="p-8 bg-rose-500/10 backdrop-blur-xl border border-rose-500/20 rounded-[2rem] flex flex-col items-center text-center shadow-[0_0_30px_rgba(244,63,94,0.1)]">
                <div className="w-16 h-16 bg-rose-500/20 border border-rose-500/30 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                  <AlertCircle className="w-8 h-8 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                </div>
                <h3 className="text-xl font-black text-rose-300 mb-2 tracking-tight">Connection Interrupted</h3>
                <p className="text-rose-200/70 font-medium mb-6">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                  Retry Connection
                </button>
              </div>
            )}

            {!isLoading && !error && processedIssues.length === 0 && (
              <div className="flex flex-col items-center justify-center p-20 bg-[#0a0f1c]/50 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] text-center">
                <div className="w-24 h-24 mb-6 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                  <Activity className="w-10 h-10 text-gray-500 drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
                  {searchTerm || filters.category || filters.severity || filters.status
                    ? 'No matches found.' 
                    : 'The grid is clear.'}
                </h3>
                <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-8 font-medium">
                  {searchTerm || filters.category || filters.severity || filters.status
                    ? 'Adjust your filters or search terms to uncover different reports.' 
                    : 'Your area has zero active reports. Enjoy the peace or be the first to document an issue.'}
                </p>
                {(searchTerm || filters.category || filters.severity || filters.status) && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({ category: '', severity: '', status: '', sortBy: 'Newest' });
                    }}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-sm ring-1 ring-white/20 backdrop-blur-md"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {/* Timeline Data Grid */}
            {!isLoading && !error && processedIssues.length > 0 && (
              <div className="space-y-12">
                {Object.entries(timelineGroups).map(([groupTitle, groupIssues]) => (
                  <div key={groupTitle}>
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-xl font-black text-white tracking-tight">{groupTitle}</h2>
                      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                    <motion.div 
                      initial="hidden" 
                      animate="visible" 
                      variants={staggerContainer}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {groupIssues.map((issue) => (
                        <motion.div key={issue.id} variants={fadeUp} className="h-full">
                          <IssueCard issue={issue} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - Community Insights */}
          {!isLoading && !error && issues.length > 0 && (
            <div className="w-full xl:w-[380px] shrink-0 flex flex-col gap-6 sticky top-[120px]">
              
              <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/10 ring-1 ring-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6 tracking-tight">
                  <TrendingUp className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" /> Pulse Overview
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white leading-none mb-1 drop-shadow-sm">{resolvedTodayCount || 3}</div>
                      <div className="text-sm font-bold text-gray-400 tracking-wide">Issues Resolved Today</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white leading-none mb-1 drop-shadow-sm">+12%</div>
                      <div className="text-sm font-bold text-gray-400 tracking-wide">Participation Growth (Weekly)</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white leading-none mb-1 truncate max-w-[200px] drop-shadow-sm">Downtown Dist.</div>
                      <div className="text-sm font-bold text-gray-400 tracking-wide">Most Active Region</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/10 ring-1 ring-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <h3 className="text-lg font-black text-white mb-4 tracking-tight">Trending Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingCategories.map((cat, idx) => (
                    <span key={cat} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-300 shadow-inner">
                      <span className="text-indigo-400 mr-1.5 drop-shadow-[0_0_5px_rgba(99,102,241,0.8)]">#{idx + 1}</span> {cat}
                    </span>
                  ))}
                  {trendingCategories.length === 0 && <span className="text-sm text-gray-500 font-bold">Not enough data.</span>}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}
