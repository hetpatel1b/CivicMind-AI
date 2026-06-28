'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { AnalyticsSummary } from '@/types/analytics';
import { IssueModeration } from '@/types/moderation';
import DashboardCards from '@/components/admin/DashboardCards';
import AIInsightsCard from '@/components/admin/AIInsightsCard';
import StatisticsChart from '@/components/admin/StatisticsChart';
import CategoryChart from '@/components/admin/CategoryChart';
import SeverityChart from '@/components/admin/SeverityChart';
import ModerationTable from '@/components/admin/ModerationTable';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { createClient } from '@/lib/supabase-browser';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 260, damping: 20 } 
  }
};

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [pendingIssues, setPendingIssues] = useState<IssueModeration[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      
      const [analyticsRes, pendingRes] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/moderation?action=pending')
      ]);

      if (analyticsRes.status === 403 || pendingRes.status === 403 || analyticsRes.status === 401 || pendingRes.status === 401) {
        window.location.href = '/unauthorized';
        return;
      }

      if (!analyticsRes.ok || !pendingRes.ok) {
        throw new Error('Failed to load dashboard resources. The server responded with an error.');
      }

      const analyticsData = await analyticsRes.json();
      const pendingData = await pendingRes.json();

      if (analyticsData.success) {
        setAnalytics(analyticsData.analytics);
      } else {
        throw new Error(analyticsData.error || 'Analytics load failed.');
      }

      if (pendingData.success) {
        setPendingIssues(pendingData.data?.issues || []);
      } else {
        throw new Error(pendingData.error || 'Moderation queue load failed.');
      }

    } catch (err: unknown) {
      console.error('[Admin Dashboard] Data fetching error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred while loading the dashboard.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const initDashboard = async () => {
      // Fetch user first to set admin ID
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setAdminId(user?.id ?? null);
      
      // Then fetch dashboard data
      await fetchDashboardData();
    };
    
    initDashboard();
  }, [fetchDashboardData]);

  const handleModerationAction = async (issueId: string, action: string) => {
    if (!adminId) {
      alert('Administrator authentication required.');
      return;
    }

    try {
      const res = await fetch('/api/moderation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          issueId,
          adminId,
          action
        })
      });

      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || `Failed to apply ${action} action.`);
      }

      setIsRefreshing(true);
      await fetchDashboardData();

    } catch (err: unknown) {
      console.error(`[Admin Dashboard] Moderation action ${action} failed:`, err);
      alert(err instanceof Error ? err.message : 'Action failed due to an unexpected error.');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#f8fafc] dark:bg-[#020817] p-6 sm:p-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header Skeleton */}
          <div className="flex justify-between items-end">
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-64 animate-pulse"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-lg w-96 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-32 animate-pulse"></div>
          </div>
          
          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-3xl animate-pulse p-6 flex justify-between items-center">
                <div className="space-y-3 w-1/2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
              </div>
            ))}
          </div>

          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 h-96 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-3xl animate-pulse"></div>
            <div className="lg:col-span-1 h-96 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-3xl animate-pulse"></div>
            <div className="lg:col-span-2 h-96 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-3xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 min-h-[500px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/50 rounded-3xl p-10 max-w-lg w-full text-center shadow-xl"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-6">
            <AlertCircle className="w-8 h-8" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Dashboard Unavailable</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">{error || 'Unknown error occurred.'}</p>
          <button 
            onClick={() => { setIsLoading(true); fetchDashboardData(); }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:scale-105 active:scale-95"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Retry Connection
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] dark:bg-[#020817] text-gray-900 dark:text-gray-100 selection:bg-blue-100 dark:selection:bg-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          {/* Header Section */}
          <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                Civic Intelligence & Moderation Center
              </p>
            </div>
            <button 
              onClick={() => { setIsRefreshing(true); fetchDashboardData(); }}
              disabled={isRefreshing}
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 shadow-sm disabled:opacity-50 hover:scale-105 active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Syncing...' : 'Sync Data'}
            </button>
          </motion.header>

          {/* Section 1: KPI Cards */}
          <motion.section variants={itemVariants} aria-labelledby="kpi-heading">
            <h2 id="kpi-heading" className="sr-only">Key Performance Indicators</h2>
            <DashboardCards statistics={analytics.dashboard} />
          </motion.section>

          {/* AI Intelligence Layer */}
          <motion.section variants={itemVariants} aria-labelledby="ai-insights-heading">
            <h2 id="ai-insights-heading" className="sr-only">AI Operational Insights</h2>
            <AIInsightsCard analytics={analytics} />
          </motion.section>

          {/* Section 2: Analytical Charts */}
          <motion.section variants={itemVariants} aria-labelledby="analytics-heading">
            <h2 id="analytics-heading" className="sr-only">Platform Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ y: -4 }} 
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="lg:col-span-3"
              >
                <StatisticsChart data={analytics.daily} />
              </motion.div>
              <motion.div 
                whileHover={{ y: -4 }} 
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="lg:col-span-1"
              >
                <CategoryChart data={analytics.categories} />
              </motion.div>
              <motion.div 
                whileHover={{ y: -4 }} 
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="lg:col-span-2"
              >
                <SeverityChart data={analytics.severity} />
              </motion.div>
            </div>
          </motion.section>

          {/* Section 3: Moderation Queue */}
          <motion.section variants={itemVariants} aria-labelledby="moderation-heading">
            <div className="mb-6 flex items-center justify-between">
              <h2 id="moderation-heading" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Pending Moderation Queue
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {pendingIssues.length} Items
              </span>
            </div>
            <ModerationTable 
              issues={pendingIssues}
              onVerify={(id) => handleModerationAction(id, 'VERIFY')}
              onResolve={(id) => handleModerationAction(id, 'RESOLVE')}
              onReject={(id) => handleModerationAction(id, 'REJECT')}
            />
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}
