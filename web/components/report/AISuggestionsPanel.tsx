'use client';

import React from 'react';
import { AIAnalysisResult } from '@/types/ai';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/design-system/motion/variants';

interface AISuggestionsPanelProps {
  hasImage: boolean;
  loading: boolean;
  error: string | null;
  suggestions: AIAnalysisResult | null;
  onAnalyze: () => void;
  onApply: (suggestions: AIAnalysisResult) => void;
  onDismissError: () => void;
}

export default function AISuggestionsPanel({
  suggestions
}: AISuggestionsPanelProps) {
  
  if (!suggestions) {
    return null;
  }

  return (
    <motion.div 
      variants={fadeUp}
      className="mb-8 p-5 rounded-[1.5rem] bg-indigo-500/10 border border-indigo-500/30 shadow-[0_10px_30px_rgba(99,102,241,0.1)] flex items-start gap-4 relative overflow-hidden backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none" />
      
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.4)] mt-1 relative z-10 border border-white/20">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-base font-bold text-white flex items-center gap-1.5">
            AI Assistant Pre-filled Details
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </h3>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-lg bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
              AI Generated
            </span>
            <span className="inline-flex items-center rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
              Editable
            </span>
            {suggestions.confidence > 0 && (
              <span className="inline-flex items-center rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300 uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                {Math.round(suggestions.confidence * 100)}% Match
              </span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed font-medium">
          Based on your image, we&apos;ve identified the issue as <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded-md">{suggestions.category}</strong> with <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded-md">{suggestions.severity}</strong> severity. Please review and edit the details below if necessary.
        </p>
      </div>
    </motion.div>
  );
}
