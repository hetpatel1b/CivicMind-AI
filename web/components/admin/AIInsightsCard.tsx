'use client';

import React, { useState, useEffect } from 'react';
import { AnalyticsSummary } from '@/types/analytics';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, Loader2 } from 'lucide-react';
import { AdminDashboardInsights } from '@/services/gemini';

interface AIInsightsCardProps {
  analytics: AnalyticsSummary;
}

export default function AIInsightsCard({ analytics }: AIInsightsCardProps) {
  const [insights, setInsights] = useState<AdminDashboardInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchInsights = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch('/api/admin/insights/dashboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(analytics)
        });
        
        const data = await res.json();
        
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Failed to generate insights');
        }
        
        if (isMounted) {
          setInsights(data.insights);
        }
      } catch (err: unknown) {
        console.error('AI Insights error:', err);
        if (isMounted) {
          setError('AI insights are temporarily unavailable.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    // Only fetch if we have analytics data
    if (analytics && analytics.dashboard) {
      fetchInsights();
    }
    
    return () => {
      isMounted = false;
    };
  }, [analytics]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 rounded-3xl p-6 shadow-sm flex items-center justify-center min-h-[160px]">
        <div className="flex flex-col items-center gap-3 text-blue-600 dark:text-blue-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm font-medium">Generating AI Admin Insights...</p>
        </div>
      </div>
    );
  }

  if (error || !insights) {
    return null; // Gracefully fail without breaking dashboard
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-600 text-white p-2 rounded-xl shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            CivicMind AI Insights
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Beta</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Operational overview generated from current dashboard data</p>
        </div>
      </div>
      
      <p className="text-gray-800 dark:text-gray-200 text-base mb-6 leading-relaxed">
        {insights.summary}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trending */}
        {insights.trending_categories.length > 0 && (
          <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-blue-100/50 dark:border-blue-800/30">
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-blue-500" /> Trending
            </h3>
            <ul className="space-y-2">
              {insights.trending_categories.map((cat, i) => (
                <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {insights.recommendations.length > 0 && (
          <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-blue-100/50 dark:border-blue-800/30 md:col-span-1">
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Recommendations
            </h3>
            <ul className="space-y-2">
              {insights.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span className="leading-tight">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Alerts */}
        {insights.alerts.length > 0 && (
          <div className="bg-red-50/50 dark:bg-red-900/10 rounded-2xl p-4 border border-red-100 dark:border-red-900/30 md:col-span-1">
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-500" /> Needs Attention
            </h3>
            <ul className="space-y-2">
              {insights.alerts.map((alert, i) => (
                <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                  <span className="leading-tight">{alert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
