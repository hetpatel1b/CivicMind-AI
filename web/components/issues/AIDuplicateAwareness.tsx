'use client';

import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { DuplicateDetectionResult } from '@/services/gemini';
import { createClient } from '@/lib/supabase-browser';

interface AIDuplicateAwarenessProps {
  currentIssueId: string;
  category: string;
  title: string;
  description: string | null;
}

export default function AIDuplicateAwareness({ currentIssueId, category, title, description }: AIDuplicateAwarenessProps) {
  const [duplicateInfo, setDuplicateInfo] = useState<DuplicateDetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const checkDuplicates = async () => {
    try {
      setHasStarted(true);
      setLoading(true);
      setError(null);
      
      const supabase = createClient();
      const { data: recentIssues, error: dbError } = await supabase
        .from('issues')
        .select('id, title, description, status, created_at')
        .eq('category', category)
        .neq('id', currentIssueId)
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (dbError) throw dbError;
      
      if (!recentIssues || recentIssues.length === 0) {
        setLoading(false);
        setError('No recent issues in this category to compare against.');
        return;
      }

      const res = await fetch('/api/community/insights/duplicates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetIssue: { title, description },
          recentIssues
        })
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to detect duplicates');
      }
      
      setDuplicateInfo(data.insights);
    } catch (err: unknown) {
      console.error('Duplicate detection error:', err);
      setError('Failed to run duplicate check.');
    } finally {
      setLoading(false);
    }
  };

  if (!hasStarted) {
    return (
      <div className="mt-8 flex justify-center">
        <button 
          onClick={checkDuplicates}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold tracking-wide transition-all hover:scale-105 bg-indigo-500/10 px-6 py-3 rounded-xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
        >
          <Sparkles className="w-5 h-5" />
          Run AI Cross-Reference Check
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 text-indigo-400 font-bold mt-8 bg-indigo-500/5 py-4 rounded-2xl border border-indigo-500/10">
        <div className="w-5 h-5 border-t-2 border-indigo-400 rounded-full animate-spin" />
        Scanning civic database for duplicate records...
      </div>
    );
  }

  if (error || !duplicateInfo || !duplicateInfo.is_duplicate || !duplicateInfo.duplicate_issue_id) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-[2rem] flex flex-col sm:flex-row sm:items-start gap-6 animate-in fade-in zoom-in-95 shadow-[0_0_30px_rgba(245,158,11,0.15)] backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <AlertCircle className="w-48 h-48 text-amber-500" />
      </div>

      <div className="bg-amber-500/20 border border-amber-500/40 p-4 rounded-2xl shrink-0 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] relative z-10">
        <AlertCircle className="w-8 h-8 drop-shadow-md" />
      </div>
      
      <div className="flex-1 relative z-10">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className="text-lg font-black text-amber-400 tracking-tight">
            Potential Duplicate Detected
          </h3>
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            AI Matched
          </span>
        </div>
        
        <p className="text-amber-200/80 mb-5 font-medium leading-relaxed bg-black/20 p-4 rounded-xl border border-amber-500/20">
          {duplicateInfo.reason}
        </p>
        
        <a 
          href={`/issues/${duplicateInfo.duplicate_issue_id}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-[1.02]"
        >
          View Original Record <ArrowRight className="w-4 h-4" strokeWidth={3} />
        </a>
      </div>
    </div>
  );
}
