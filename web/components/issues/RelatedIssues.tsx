'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { Layers, ArrowRight } from 'lucide-react';

interface RelatedIssuesProps {
  currentIssueId: string;
  category: string;
}

export default function RelatedIssues({ currentIssueId, category }: RelatedIssuesProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('issues')
          .select('id, title, status')
          .eq('category', category)
          .neq('id', currentIssueId)
          .limit(3);

        if (!error && data) {
          setIssues(data);
        }
      } catch (err) {
        console.error('Failed to load related issues:', err);
      } finally {
        setLoading(false);
      }
    }

    if (category) {
      fetchRelated();
    }
  }, [category, currentIssueId]);

  if (loading) {
    return (
      <div className="bg-[#0a0f1c]/50 backdrop-blur-3xl rounded-[2rem] p-6 shadow-sm border border-white/10 animate-pulse">
        <div className="h-6 bg-white/10 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-16 bg-white/5 rounded-2xl"></div>
          <div className="h-16 bg-white/5 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (issues.length === 0) return null;

  return (
    <div className="bg-[#0a0f1c]/50 backdrop-blur-3xl rounded-[2rem] p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5 relative">
      <h3 className="text-lg font-black text-white mb-5 tracking-tight flex items-center gap-2">
        <Layers className="w-5 h-5 text-indigo-400" />
        Related Intelligence
      </h3>
      
      <div className="space-y-3">
        {issues.map((issue) => (
          <Link
            key={issue.id}
            href={`/issues/${issue.id}`}
            className="group block p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/10 hover:border-indigo-500/50 transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
          >
            <h4 className="text-sm font-bold text-gray-200 group-hover:text-white truncate mb-2 pr-4 transition-colors">
              {issue.title}
            </h4>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-black/40 rounded border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                {issue.status}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
