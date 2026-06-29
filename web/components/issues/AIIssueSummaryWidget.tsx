'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, Info, ChevronDown, ChevronUp, MessageSquare, AlertTriangle, Lightbulb, Activity, Zap } from 'lucide-react';
import AILoadingIndicator from '@/components/ui/AILoadingIndicator';
import { IssueDetailsSummary } from '@/types/ai';
import { IssueDetail } from '@/services/issue-details';
import { motion, AnimatePresence } from 'framer-motion';

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
      <div className="bg-[#0a0f1c]/50 backdrop-blur-3xl rounded-[2rem] border border-white/10 ring-1 ring-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <Sparkles className="w-10 h-10 text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
        </div>
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight">AI Investigation Center</h3>
        <p className="text-gray-400 mb-8 max-w-md text-lg font-medium">Generate a comprehensive intelligence brief, risk analysis, and community sentiment summary for this record.</p>
        <button 
          onClick={fetchSummary}
          className="relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl flex items-center gap-3 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-105 z-10 border border-indigo-400/30 group"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Generate Intelligence Brief</span>
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[#0a0f1c]/50 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] p-12 flex flex-col items-center justify-center min-h-[300px]">
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-wide mb-2">Analyzing Civic Data...</h3>
        <p className="text-gray-400 font-medium animate-pulse">Running cross-reference on historical records and community sentiment</p>
      </div>
    );
  }

  if (error || !summary) {
    return null; // Graceful degradation handled by parent
  }

  return (
    <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 ring-1 ring-white/5 shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
      
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-50" />
      
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Activity className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">AI Intelligence Brief</h2>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Generated by CivicMind Core</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs font-bold text-gray-400">
          <Info className="w-4 h-4 text-indigo-400" />
          <span>Real-time Analysis</span>
        </div>
      </div>

      <div className="p-8 space-y-8">
        
        {/* Executive Summary */}
        <div>
          <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" /> Executive Overview
          </h3>
          <p className="text-lg text-gray-300 font-medium leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/10 shadow-inner">
            {summary.overview}
          </p>
        </div>

        {/* Key Takeaways */}
        {summary.takeaways && summary.takeaways.length > 0 && (
          <div>
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Strategic Takeaways
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {summary.takeaways.map((takeaway, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] group">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors">{idx + 1}</span>
                    <span className="text-gray-300 font-medium text-sm leading-relaxed">{takeaway}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Context */}
        <div className="flex items-center gap-3 px-5 py-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
          <Info className="w-5 h-5 text-indigo-400 shrink-0" />
          <div className="text-sm text-indigo-200 font-medium">
            <strong className="text-indigo-400 mr-2">Context:</strong> {summary.statusExplanation}
          </div>
        </div>

        {/* Community Sentiment (Collapsible) */}
        {summary.discussionSummary && (
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between p-5 text-sm font-bold text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-expanded={expanded}
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-purple-500/20 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                </div>
                Community Sentiment Analysis
              </div>
              <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {expanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-white/10 bg-black/20 space-y-6">
                    {summary.discussionSummary.sentiment && (
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Aggregate Sentiment:</span>
                        <span className="px-3 py-1 bg-white/10 rounded-lg text-sm font-bold text-white border border-white/20">
                          {summary.discussionSummary.sentiment}
                        </span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {summary.discussionSummary.mainConcerns.length > 0 && (
                        <div className="bg-rose-500/5 p-4 rounded-xl border border-rose-500/10">
                          <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Primary Concerns
                          </h4>
                          <ul className="space-y-2">
                            {summary.discussionSummary.mainConcerns.map((concern, idx) => (
                              <li key={idx} className="text-sm text-gray-300 font-medium flex items-start gap-2">
                                <span className="text-rose-500 shrink-0 mt-1">•</span>
                                {concern}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {summary.discussionSummary.commonSuggestions.length > 0 && (
                        <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                          <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Key Suggestions
                          </h4>
                          <ul className="space-y-2">
                            {summary.discussionSummary.commonSuggestions.map((suggestion, idx) => (
                              <li key={idx} className="text-sm text-gray-300 font-medium flex items-start gap-2">
                                <span className="text-emerald-500 shrink-0 mt-1">•</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
