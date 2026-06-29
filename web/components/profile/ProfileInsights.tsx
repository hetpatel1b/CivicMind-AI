import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, TrendingUp, ShieldCheck, Target, Zap, Activity, Award, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InsightData {
  score: number;
  strengths: string[];
  weaknesses: string[];
  summary: string;
  prediction: string;
  recommendation: string;
  impact: string;
}

export default function ProfileInsights() {
  const [analyzing, setAnalyzing] = useState(false);
  const [insights, setInsights] = useState<null | InsightData>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setInsights(null);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setInsights({
        score: 92,
        strengths: ["Detailed reporting", "Consistent verification"],
        weaknesses: ["Low engagement in discussions"],
        summary: "Top 15% of active reporters this month.",
        prediction: "On track for 'Community Leader' next week.",
        recommendation: "Review and verify 3 more reports to boost score.",
        impact: "Saved approx. 14 hours of city response time."
      });
    }, 2000);
  };

  return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
      
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Sparkles className="w-5 h-5 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">AI Insights</h3>
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Civic Impact Analysis</p>
          </div>
        </div>
        
        {insights && (
          <button 
            onClick={() => setInsights(null)}
            className="text-xs font-bold text-indigo-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
          >
            Reset
          </button>
        )}
      </div>
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!analyzing && !insights ? (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center text-center py-4"
            >
              <div className="w-14 h-14 bg-[#0a0f1c] border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.1)] rounded-full flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              </div>
              <p className="text-gray-400 text-sm font-medium mb-5 max-w-[200px]">
                Analyze your civic impact and get personalized growth suggestions.
              </p>
              <button 
                onClick={handleAnalyze}
                className="w-full py-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Generate Insights
              </button>
            </motion.div>
          ) : analyzing ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center text-center py-8"
            >
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-3 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              <p className="text-gray-400 text-sm font-bold animate-pulse">
                Crunching community data...
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3"
            >
              {/* Contribution Score */}
              <div className="flex items-center justify-between p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl shadow-inner">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-300">Contribution Score</span>
                </div>
                <span className="text-lg font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{insights?.score}/100</span>
              </div>

              {/* Strengths & Weaknesses Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                  <div className="text-[10px] font-black uppercase text-emerald-400 mb-1 flex items-center gap-1"><Zap className="w-3 h-3"/> Strengths</div>
                  <div className="text-xs text-emerald-100 font-medium leading-tight">{insights?.strengths.join(", ")}</div>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
                  <div className="text-[10px] font-black uppercase text-rose-400 mb-1 flex items-center gap-1"><Target className="w-3 h-3"/> Areas to Grow</div>
                  <div className="text-xs text-rose-100 font-medium leading-tight">{insights?.weaknesses.join(", ")}</div>
                </div>
              </div>

              {/* Summary & Impact */}
              <div className="bg-[#0a0f1c]/80 border border-white/5 rounded-xl p-3 space-y-2">
                <div>
                  <div className="text-[10px] font-black uppercase text-gray-500 flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-blue-400"/> Weekly Summary</div>
                  <div className="text-xs text-gray-300 font-medium">{insights?.summary}</div>
                </div>
                <div className="w-full h-[1px] bg-white/5"></div>
                <div>
                  <div className="text-[10px] font-black uppercase text-gray-500 flex items-center gap-1"><Network className="w-3 h-3 text-purple-400"/> Community Impact</div>
                  <div className="text-xs text-gray-300 font-medium">{insights?.impact}</div>
                </div>
              </div>

              {/* Prediction & Action */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                <div className="text-[10px] font-black uppercase text-amber-500 mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Growth Prediction</div>
                <div className="text-xs text-amber-100 font-bold mb-2">{insights?.prediction}</div>
                <div className="bg-amber-500/20 rounded-lg p-2 text-[11px] text-amber-200 font-medium border border-amber-500/30">
                  <span className="font-bold">Suggestion:</span> {insights?.recommendation}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
