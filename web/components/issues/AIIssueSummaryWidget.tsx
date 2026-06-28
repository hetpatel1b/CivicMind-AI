'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, Info, ChevronDown, ChevronUp, MessageSquare, AlertTriangle, Lightbulb } from 'lucide-react';
import { IssueDetailsSummary } from '@/types/ai';
import { IssueDetail } from '@/services/issue-details';

interface AIIssueSummaryWidgetProps {
  issue: IssueDetail;
  comments: Record<string, unknown>[];
}

export default function AIIssueSummaryWidget({ issue, comments }: AIIssueSummaryWidgetProps) {
  const [summary, setSummary] = useState<IssueDetailsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  async function fetchSummary() {
    if (!issue) return;
    
    try {
      setHasStarted(true);
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/issues/${issue.id}/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue, comments })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data = await response.json();
      setSummary(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error generating AI summary');
    } finally {
      setLoading(false);
    }
  }

  if (!issue) return null;

  if (!hasStarted) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl border border-blue-100 dark:border-indigo-900/30 shadow-sm p-6 mb-8 flex flex-col items-center justify-center min-h-[150px]">
        <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full mb-3">
          <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">AI Reading Assistant</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4 max-w-sm">Generate a smart summary and key takeaways for this issue.</p>
        <button 
          onClick={fetchSummary}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-xl flex items-center gap-2 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Generate Summary
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#020817] rounded-xl border border-blue-100 dark:border-blue-900 shadow-sm p-6 mb-8 flex flex-col items-center justify-center min-h-[150px]">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin mb-3" />
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">AI is generating an issue summary...</p>
      </div>
    );
  }

  if (error || !summary) {
    return null; // Graceful degradation
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl border border-blue-100 dark:border-indigo-900/30 shadow-sm p-6 mb-8 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 rounded-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Reading Assistant</h2>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Info className="w-3.5 h-3.5" />
          <span>AI generated from existing data</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-gray-800 dark:text-gray-200 font-medium">{summary.overview}</p>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Status Context:</strong> {summary.statusExplanation}
        </div>

        {summary.takeaways && summary.takeaways.length > 0 && (
          <div className="bg-white/60 dark:bg-black/20 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Key Takeaways
            </h3>
            <ul className="space-y-1.5">
              {summary.takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-amber-500 mt-1 shrink-0">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {summary.discussionSummary && (
          <div className="border border-blue-200 dark:border-indigo-800/50 rounded-lg overflow-hidden bg-white/40 dark:bg-black/20">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between p-3 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-blue-100/50 dark:hover:bg-indigo-900/30 transition-colors focus:outline-none"
              aria-expanded={expanded}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                Community Discussion Summary
              </div>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {expanded && (
              <div className="p-4 border-t border-blue-200 dark:border-indigo-800/50 space-y-4">
                {summary.discussionSummary.sentiment && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Overall Sentiment:</strong> {summary.discussionSummary.sentiment}
                  </p>
                )}
                
                {summary.discussionSummary.mainConcerns.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      Main Concerns
                    </h4>
                    <ul className="space-y-1">
                      {summary.discussionSummary.mainConcerns.map((concern, idx) => (
                        <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-red-500 shrink-0">-</span>
                          {concern}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {summary.discussionSummary.commonSuggestions.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                      Common Suggestions
                    </h4>
                    <ul className="space-y-1">
                      {summary.discussionSummary.commonSuggestions.map((suggestion, idx) => (
                        <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-emerald-500 shrink-0">+</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
