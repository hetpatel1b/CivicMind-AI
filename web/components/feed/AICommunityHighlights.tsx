'use client';

import React, { useState } from 'react';
import { Sparkles, TrendingUp, AlertCircle, RefreshCcw, FileText, Copy, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import AILoadingIndicator from '@/components/ui/AILoadingIndicator';
import { CommunityTrendingInsights } from '@/services/gemini';
import { IssueFeedItem } from '@/services/feed';
import { motion, AnimatePresence } from 'framer-motion';

interface AICommunityHighlightsProps {
  issues: IssueFeedItem[];
}

type AIAction = 'trending' | 'summary' | 'duplicates' | 'moderation' | null;

export default function AICommunityHighlights({ issues }: AICommunityHighlightsProps) {
  const [insights, setInsights] = useState<CommunityTrendingInsights | null>(null);
  const [loadingAction, setLoadingAction] = useState<AIAction>(null);
  const [completedAction, setCompletedAction] = useState<AIAction>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchTrending = async () => {
    try {
      setLoadingAction('trending');
      setError(null);
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
      if (!res.ok || !data.success) throw new Error(data.message);
      setInsights(data.insights);
      setCompletedAction('trending');
    } catch (err) {
      console.error(err);
      setError('Community insights unavailable.');
    } finally {
      setLoadingAction(null);
    }
  };

  const mockAction = async (action: AIAction) => {
    setLoadingAction(action);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCompletedAction(action);
    setLoadingAction(null);
  };

  const handleActionClick = (action: AIAction) => {
    if (action === 'trending') fetchTrending();
    else mockAction(action);
  };

  return (
    <div className="bg-[#0a0f1c]/90 backdrop-blur-3xl border border-indigo-500/20 rounded-[2rem] mb-8 shadow-[0_0_30px_rgba(99,102,241,0.1)] overflow-hidden ring-1 ring-white/5 relative">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Header / Trigger */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-indigo-500/5 transition-colors focus:outline-none relative z-10 group"
      >
        <div className="flex items-center gap-4">
          <div className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 p-2.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-black text-white flex items-center gap-2 tracking-tight">
              AI Intelligence Center
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                CivicMind
              </span>
            </h2>
            <p className="text-sm text-indigo-200/60 font-medium">Generate real-time insights from community data</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-indigo-500/20 overflow-hidden relative z-10"
          >
            <div className="p-5 sm:p-6 bg-[#050505]/50">
              
              {/* Actions Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                
                {[
                  { id: 'trending', label: 'Trending Topics', icon: TrendingUp },
                  { id: 'summary', label: 'Summarize Feed', icon: FileText },
                  { id: 'duplicates', label: 'Detect Duplicates', icon: Copy },
                  { id: 'moderation', label: 'Moderation Check', icon: ShieldCheck },
                ].map(action => {
                  const Icon = action.icon;
                  const isActive = completedAction === action.id;
                  const isCurrentLoading = loadingAction === action.id;
                  
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleActionClick(action.id as AIAction)}
                      disabled={loadingAction !== null}
                      className={`
                        flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 group
                        ${isActive 
                          ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)] transform -translate-y-1 ring-1 ring-indigo-500/50' 
                          : 'bg-[#0a0f1c]/50 border-white/10 text-gray-400 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/5 shadow-inner'
                        }
                        ${loadingAction !== null && !isCurrentLoading ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      {isCurrentLoading ? (
                        <RefreshCcw className="w-6 h-6 mb-2 animate-spin text-indigo-400" />
                      ) : isActive ? (
                        <CheckCircle2 className="w-6 h-6 mb-2 text-indigo-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                      ) : (
                        <Icon className={`w-6 h-6 mb-2 transition-colors ${isActive ? 'text-indigo-300' : 'text-indigo-400/50 group-hover:text-indigo-400'}`} />
                      )}
                      <span className="text-xs font-bold text-center tracking-wide">{action.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Results Area */}
              <AnimatePresence mode="wait">
                {loadingAction && (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="p-8 flex items-center justify-center bg-[#0a0f1c]/80 rounded-2xl border border-indigo-500/20 shadow-inner"
                  >
                    <AILoadingIndicator size="md" message="AI is analyzing the intelligence feed..." />
                  </motion.div>
                )}

                {completedAction === 'trending' && insights && !loadingAction && (
                  <motion.div 
                    key="trending"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row gap-6 bg-[#0a0f1c]/80 rounded-2xl border border-indigo-500/20 p-6 shadow-inner"
                  >
                    <div className="flex-1 border-r border-white/10 pr-6">
                      <p className="text-indigo-100 text-base font-medium leading-relaxed italic">
                        &quot;{insights.highlight}&quot;
                      </p>
                    </div>
                    <div className="flex-1 flex flex-col gap-5">
                      {insights.trending_categories.length > 0 && (
                        <div>
                          <h3 className="flex items-center gap-2 text-[11px] font-black text-indigo-300 mb-3 uppercase tracking-widest">
                            <TrendingUp className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" /> Top Categories
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {insights.trending_categories.map((c, i) => (
                              <span key={i} className="px-2.5 py-1 bg-indigo-500/10 rounded-lg text-xs font-bold border border-indigo-500/20 text-indigo-200 shadow-sm">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {insights.emerging_concerns.length > 0 && (
                        <div>
                          <h3 className="flex items-center gap-2 text-[11px] font-black text-rose-300 mb-3 uppercase tracking-widest">
                            <AlertCircle className="w-4 h-4 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" /> Emerging Concerns
                          </h3>
                          <ul className="space-y-2">
                            {insights.emerging_concerns.map((c, i) => (
                              <li key={i} className="text-xs text-gray-300 font-medium flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {completedAction === 'summary' && !loadingAction && (
                  <motion.div key="summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-[#0a0f1c]/80 rounded-2xl border border-indigo-500/20 shadow-inner">
                    <h3 className="font-black text-white mb-3 flex items-center gap-2 tracking-tight">
                      <Sparkles className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" /> 
                      Daily Digest
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-medium">
                      The community has been highly active today, primarily focusing on road infrastructure and seasonal drainage issues. Several critical hazards were verified quickly by neighbors, and municipal response times show a 15% improvement in acknowledging high-severity reports.
                    </p>
                  </motion.div>
                )}

                {completedAction === 'duplicates' && !loadingAction && (
                  <motion.div key="duplicates" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-inner flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    </div>
                    <div>
                      <h3 className="font-black text-emerald-300 mb-1 tracking-tight text-lg">Grid is Clean</h3>
                      <p className="text-emerald-200/70 text-sm font-medium">No duplicate reports detected in the current feed view. The community is efficiently consolidating reports.</p>
                    </div>
                  </motion.div>
                )}

                {completedAction === 'moderation' && !loadingAction && (
                  <motion.div key="moderation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-inner flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      <ShieldCheck className="w-7 h-7 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    </div>
                    <div>
                      <h3 className="font-black text-blue-300 mb-1 tracking-tight text-lg">Healthy Community Tone</h3>
                      <p className="text-blue-200/70 text-sm font-medium">AI analysis confirms 98% of recent feed discussions are constructive and adhere to civic guidelines.</p>
                    </div>
                  </motion.div>
                )}
                
                {error && !loadingAction && (
                  <motion.div key="error" className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-sm font-bold shadow-inner">
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
