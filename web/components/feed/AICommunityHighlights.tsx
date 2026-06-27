'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { CommunityTrendingInsights } from '@/services/gemini';
import { IssueFeedItem } from '@/services/feed';

interface AICommunityHighlightsProps {
  issues: IssueFeedItem[];
}

export default function AICommunityHighlights({ issues }: AICommunityHighlightsProps) {
  const [insights, setInsights] = useState<CommunityTrendingInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchInsights = async () => {
      // Only run if we have some issues to analyze
      if (!issues || issues.length === 0) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        // Take a sample of the most recent issues to analyze (to save tokens)
        const recentIssuesSample = issues.slice(0, 15).map(i => ({
          title: i.title,
          category: i.category,
          severity: i.severity,
          status: i.status
        }));
        
        const res = await fetch('/api/community/insights/trending', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recentIssuesSample)
        });
        
        const data = await res.json();
        
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Failed to generate insights');
        }
        
        if (isMounted) {
          setInsights(data.insights);
        }
      } catch (err: unknown) {
        console.error('AI Community Insights error:', err);
        if (isMounted) {
          setError('Community insights are temporarily unavailable.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchInsights();
    
    return () => {
      isMounted = false;
    };
  }, [issues]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-100 dark:border-blue-800/50 rounded-3xl p-6 mb-8 flex items-center justify-center min-h-[120px]">
        <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-sm font-medium">Analyzing community trends...</p>
        </div>
      </div>
    );
  }

  if (error || !insights) {
    return null; // Fail gracefully
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-100 dark:border-blue-800/50 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        
        {/* Main Highlight */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 text-white p-2 rounded-xl shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Community Intelligence
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">AI Beta</span>
              </h2>
            </div>
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-base font-medium leading-relaxed">
            {insights.highlight}
          </p>
        </div>

        {/* Data Points */}
        <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
          {/* Trending Categories */}
          {insights.trending_categories.length > 0 && (
            <div className="flex-1 bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-blue-100/50 dark:border-blue-800/30">
              <h3 className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-teal-500" /> Trending Topics
              </h3>
              <ul className="space-y-2">
                {insights.trending_categories.map((cat, i) => (
                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Emerging Concerns */}
          {insights.emerging_concerns.length > 0 && (
            <div className="flex-1 bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 border border-blue-100/50 dark:border-blue-800/30">
              <h3 className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-blue-500" /> Key Concerns
              </h3>
              <ul className="space-y-2">
                {insights.emerging_concerns.map((concern, i) => (
                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
