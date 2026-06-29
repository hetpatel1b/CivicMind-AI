import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, ShieldCheck, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AICivicCoach() {
  const [analyzing, setAnalyzing] = useState(false);
  const [insights, setInsights] = useState<null | { strengths: string, improvement: string, nextMilestone: string }>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setInsights(null);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setInsights({
        strengths: "Your consistent reporting of local hazards shows strong civic awareness.",
        improvement: "You could increase your community trust by verifying more reports submitted by neighbors.",
        nextMilestone: "You are very close to unlocking the 'Community Leader' badge. Keep it up!",
      });
    }, 2000);
  };

  return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-purple-500/20 text-white relative overflow-hidden h-full flex flex-col group ring-1 ring-purple-500/10">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[30rem] h-[30rem] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
      
      <div className="flex items-center gap-5 mb-8 relative z-10">
        <div className="p-4 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <Sparkles className="w-7 h-7 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">AI Civic Coach</h3>
          <p className="text-sm font-medium text-purple-200/70 mt-1">Personalized insights for your civic journey</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {!analyzing && !insights ? (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center items-center text-center py-8"
            >
              <div className="w-20 h-20 bg-[#0a0f1c] rounded-[1.25rem] flex items-center justify-center mb-6 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] relative ring-1 ring-purple-500/20 group-hover:rotate-6 transition-transform duration-500">
                <Target className="w-10 h-10 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              </div>
              <p className="text-purple-200/80 font-medium mb-8 max-w-sm leading-relaxed">
                I can analyze your reputation, identify your strengths, and recommend your next best action.
              </p>
              <button 
                onClick={handleAnalyze}
                className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 transition-all flex items-center gap-3 border border-purple-400/50"
              >
                <Sparkles className="w-5 h-5" /> Analyze My Reputation
              </button>
            </motion.div>
          ) : analyzing ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center items-center text-center py-12"
            >
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin mb-6 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              <p className="text-purple-200 font-medium animate-pulse text-lg">
                Analyzing civic contribution patterns...
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col gap-5"
            >
              <div className="bg-[#0a0f1c]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-inner">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-300">Identified Strengths</h4>
                </div>
                <p className="text-sm text-purple-100/90 leading-relaxed font-medium">
                  {insights?.strengths}
                </p>
              </div>
              
              <div className="bg-[#0a0f1c]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-inner">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-1.5 bg-amber-500/20 rounded-lg border border-amber-500/30">
                    <TrendingUp className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-amber-300">How to Improve</h4>
                </div>
                <p className="text-sm text-purple-100/90 leading-relaxed font-medium">
                  {insights?.improvement}
                </p>
              </div>
              
              <div className="bg-purple-500/10 backdrop-blur-md rounded-2xl p-5 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[30px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="p-1.5 bg-purple-500/30 rounded-lg border border-purple-400/50">
                    <Target className="w-4 h-4 text-purple-300 drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]" />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-purple-300">Recommended Milestone</h4>
                </div>
                <p className="text-sm text-white font-medium leading-relaxed relative z-10">
                  {insights?.nextMilestone}
                </p>
              </div>
              
              <button 
                onClick={() => setInsights(null)}
                className="mt-4 text-[11px] font-black text-purple-400 hover:text-purple-300 uppercase tracking-widest transition-colors flex items-center gap-1.5 mx-auto py-2 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5"
              >
                Reset Analysis <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
