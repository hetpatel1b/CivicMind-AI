'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { IssueModerationInsights } from '@/services/gemini';

interface IssueInsightsRowProps {
  issueId: string;
}

export default function IssueInsightsRow({ issueId }: IssueInsightsRowProps) {
  const [insights, setInsights] = useState<IssueModerationInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullDescription, setFullDescription] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const fetchInsights = async () => {
    try {
      setHasStarted(true);
      setLoading(true);
      setError(null);
      
      // 1. Fetch full issue details
      const issueRes = await fetch(`/api/issues/${issueId}`);
      const issueData = await issueRes.json();
      
      if (!issueRes.ok || !issueData.success) {
        throw new Error('Failed to fetch issue details');
      }

      const title = issueData.data.title;
      const description = issueData.data.description;
      
      setFullDescription(description);

      // 2. Fetch AI Insights
      const insightsRes = await fetch('/api/admin/insights/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      
      const insightsData = await insightsRes.json();
      
      if (!insightsRes.ok || !insightsData.success) {
        throw new Error('Failed to generate moderation insights');
      }
      
      setInsights(insightsData.insights);
    } catch (err: unknown) {
      console.error('Moderation Insights error:', err);
      setError('AI insights unavailable for this issue.');
    } finally {
      setLoading(false);
    }
  };

  if (!hasStarted) {
    return (
      <tr className="bg-indigo-50/30 dark:bg-indigo-900/10 border-b border-indigo-100 dark:border-indigo-800/30 shadow-inner">
        <td colSpan={5} className="px-6 py-4">
          <div className="flex justify-center">
            <button
              onClick={fetchInsights}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Analyze Issue with AI
            </button>
          </div>
        </td>
      </tr>
    );
  }

  if (loading) {
    return (
      <tr className="bg-indigo-50/30 dark:bg-indigo-900/10 border-b border-indigo-100 dark:border-indigo-800/30 shadow-inner">
        <td colSpan={5} className="px-6 py-6">
          <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">Generating moderation insights...</span>
          </div>
        </td>
      </tr>
    );
  }

  if (error || !insights) {
    return (
      <tr className="bg-red-50/30 dark:bg-red-900/10 border-b border-red-100 dark:border-red-900/30 shadow-inner">
        <td colSpan={5} className="px-6 py-4 text-center text-sm text-red-600 dark:text-red-400">
          {error || 'Failed to load insights'}
        </td>
      </tr>
    );
  }

  return (
    <tr className="bg-indigo-50/30 dark:bg-indigo-900/10 border-b border-indigo-100 dark:border-indigo-800/30 shadow-inner">
      <td colSpan={5} className="px-6 py-6">
        <div className="flex flex-col gap-4 max-w-4xl">
          {/* AI Summary Header */}
          <div className="flex items-start gap-3">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">AI Summary</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{insights.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 ml-10">
            {/* Spam Detection */}
            <div className={`p-4 rounded-xl border ${
              insights.is_spam 
                ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50' 
                : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {insights.is_spam ? (
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                )}
                <h5 className={`text-sm font-bold ${
                  insights.is_spam ? 'text-red-900 dark:text-red-300' : 'text-green-900 dark:text-green-300'
                }`}>
                  {insights.is_spam ? 'Potential Spam Detected' : 'Content Appears Valid'}
                </h5>
              </div>
              {insights.spam_reason && (
                <p className={`text-xs ${insights.is_spam ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
                  {insights.spam_reason}
                </p>
              )}
            </div>

            {/* Duplicate Notes */}
            <div className="p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-indigo-100 dark:border-indigo-800/30">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-indigo-500" />
                <h5 className="text-sm font-bold text-gray-900 dark:text-white">Duplicate Detection Context</h5>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {insights.duplicate_notes}
              </p>
            </div>
          </div>

          {/* Original Description Toggle */}
          <div className="ml-10 mt-2">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none focus:underline"
            >
              {isExpanded ? 'Hide Original Description' : 'View Original Description'}
            </button>
            {isExpanded && fullDescription && (
              <div className="mt-3 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{fullDescription}</p>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
