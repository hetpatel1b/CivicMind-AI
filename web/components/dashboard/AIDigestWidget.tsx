'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Activity, CheckCircle2, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  async function handleGenerateDigest() {
    if (!summary) return;
    
    try {
      setHasStarted(true);
      setLoading(true);
      setError(null);
      const response = await fetch('/api/dashboard/insights/digest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary, badgeSummary, recentReports, recentEvents })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch digest');
      }

      const data = await response.json();
      setDigest(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error generating AI digest');
    } finally {
      setLoading(false);
    }
  }

  if (!summary) return null;

  return (
    <motion.div 
      layout
      variants={fadeUp}
      className={`relative overflow-hidden bg-[#0a0f1c]/40 backdrop-blur-3xl rounded-[2rem] border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] mb-8 ring-1 ring-white/5 ${!hasStarted ? 'flex flex-col items-center justify-center p-12 min-h-[300px]' : 'p-6 md:p-10'}`}
    >
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div 
            key="start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            className="text-center max-w-lg mx-auto z-10"
          >
            <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-[1.25rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
              <Sparkles className="w-10 h-10 text-indigo-400" />
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">AI Intelligence Briefing</h3>
            <p className="text-gray-400 mb-10 font-medium leading-relaxed">
              Get a smart, personalized summary of your civic progress, recent activities, and actionable recommendations based on your profile.
            </p>
            <button 
              onClick={handleGenerateDigest}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_50px_rgba(79,70,229,0.5)] mx-auto outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 border border-indigo-400 active:scale-95"
            >
              <Zap className="w-5 h-5 text-indigo-200" />
              Generate Daily Briefing
            </button>
          </motion.div>
        ) : loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="flex flex-col items-center justify-center min-h-[300px] z-10"
          >
            <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(99,102,241,0.4)]"></div>
            <p className="text-indigo-400 font-bold tracking-widest uppercase text-xs">Synthesizing civic intelligence...</p>
          </motion.div>
        ) : digest && !error ? (
          <motion.div 
            key="results"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="w-full relative z-10"
          >
            {/* Ambient Background for Results */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen opacity-50" />

            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-xl shadow-inner">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
                AI Intelligence Briefing
              </h2>
            </div>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl font-medium leading-relaxed">
              {digest.digest}
            </motion.p>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Observations */}
              <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <Activity className="w-24 h-24 text-emerald-500" />
                </div>
                <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-lg relative z-10">
                  <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  Civic Progress
                </h3>
                <ul className="space-y-5 relative z-10">
                  {digest.observations.map((obs, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-gray-400 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400/80 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{obs}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Timeline */}
              <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <Trophy className="w-24 h-24 text-amber-500" />
                </div>
                <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-lg relative z-10">
                  <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                    <Trophy className="w-4 h-4 text-amber-400" />
                  </div>
                  Activity Highlights
                </h3>
                <div className="space-y-6 relative z-10">
                  {digest.timeline.map((event, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-white/10 text-sm text-gray-400 font-medium pb-2 last:pb-0">
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]"></div>
                      <span className="leading-relaxed">{event}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col hover:bg-white/10 transition-colors duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="w-24 h-24 text-purple-500" />
                </div>
                <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-lg relative z-10">
                  <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  Recommendations
                </h3>
                <div className="flex-1 mb-8 relative z-10">
                  <p className="text-sm text-purple-100 font-medium leading-relaxed bg-purple-500/10 p-5 rounded-2xl border border-purple-500/20 shadow-inner">
                    {digest.primaryRecommendation}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                  {digest.quickActions.slice(0, 2).map((action, i) => (
                    <Link 
                      key={i} 
                      href={action.href}
                      className="inline-flex items-center text-xs font-bold bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 px-4 py-2.5 rounded-xl transition-all text-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
                    >
                      {action.title}
                      <ArrowRight className="w-3 h-3 ml-2 text-indigo-400" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
