'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2, ArrowRight, Activity, CheckCircle2, Trophy } from 'lucide-react';
import Link from 'next/link';
import { UserDashboardDigest } from '@/types/ai';
import { ReputationSummary } from '@/types/reputation';
import { BadgeSummary } from '@/types/badge';

interface AIDigestWidgetProps {
  summary: ReputationSummary | null;
  badgeSummary: BadgeSummary | null;
  recentReports: { id: string; title: string; status: string; created_at: string; }[];
  recentEvents: { id: string; type: string; points: number; created_at: string; }[];
}

export default function AIDigestWidget({ summary, badgeSummary, recentReports, recentEvents }: AIDigestWidgetProps) {
  const [digest, setDigest] = useState<UserDashboardDigest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchDigest() {
      if (!summary) return; // Wait until data is loaded
      
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard/insights/digest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ summary, badgeSummary, recentReports, recentEvents })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch digest');
        }

        const data = await response.json();
        if (mounted) {
          setDigest(data);
        }
      } catch (err: unknown) {
        if (mounted) setError(err instanceof Error ? err.message : 'Error generating AI digest');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchDigest();

    return () => { mounted = false; };
  }, [summary, badgeSummary, recentReports, recentEvents]);

  if (!summary) return null;

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#020817] rounded-xl border border-blue-100 dark:border-blue-900 shadow-sm p-6 mb-8 flex flex-col items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">AI is generating your personalized dashboard digest...</p>
      </div>
    );
  }

  if (error || !digest) {
    return null; // Fail gracefully, don't break the dashboard
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border border-blue-100 dark:border-purple-900/30 shadow-sm p-6 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-32 h-32 text-blue-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your AI Digest</h2>
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
          {digest.digest}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Observations */}
          <div className="bg-white/60 dark:bg-black/40 rounded-xl p-5 border border-white dark:border-gray-800 backdrop-blur-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              Civic Progress
            </h3>
            <ul className="space-y-3">
              {digest.observations.map((obs, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="bg-white/60 dark:bg-black/40 rounded-xl p-5 border border-white dark:border-gray-800 backdrop-blur-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {digest.timeline.map((event, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-blue-200 dark:border-blue-800 text-sm text-gray-600 dark:text-gray-400">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500"></div>
                  {event}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations & Quick Actions */}
          <div className="bg-white/60 dark:bg-black/40 rounded-xl p-5 border border-white dark:border-gray-800 backdrop-blur-sm flex flex-col">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Recommendations
            </h3>
            <ul className="space-y-2 mb-6 flex-1">
              {digest.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-purple-500 font-bold shrink-0">•</span>
                  {rec}
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {digest.quickActions.slice(0, 2).map((action, i) => (
                <Link 
                  key={i} 
                  href={action.href}
                  className="inline-flex items-center text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                >
                  {action.title}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
