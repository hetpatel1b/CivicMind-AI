'use client';

import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
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
      
      // 1. Fetch 10 most recent issues in the same category (excluding current)
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

      // 2. Ask AI to analyze for duplicates
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
      <div className="mt-6 flex justify-center">
        <button 
          onClick={checkDuplicates}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 text-sm font-medium transition-colors"
        >
          <AlertCircle className="w-4 h-4" />
          Check for Duplicate Issues (AI)
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500 text-sm mt-6">
        <Loader2 className="w-4 h-4 animate-spin" />
        Checking for similar community reports...
      </div>
    );
  }

  if (error || !duplicateInfo || !duplicateInfo.is_duplicate || !duplicateInfo.duplicate_issue_id) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-start gap-4 animate-in fade-in zoom-in-95">
      <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-xl shrink-0 text-amber-600 dark:text-amber-400">
        <AlertCircle className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-1">
          Similar Discussion Exists
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-200 text-amber-800 dark:bg-amber-800/50 dark:text-amber-200 border border-amber-300 dark:border-amber-700">AI Note</span>
        </h3>
        <p className="text-xs text-amber-700 dark:text-amber-400/90 mb-3 leading-relaxed">
          {duplicateInfo.reason}
        </p>
        <a 
          href={`/issues/${duplicateInfo.duplicate_issue_id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 transition-colors focus:outline-none focus:underline"
        >
          View original discussion <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
