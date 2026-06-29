'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { ThumbsUp, ArrowRight } from 'lucide-react';
import ProfileEmptyState from './ProfileEmptyState';

interface ProfileSupportsProps {
  userId: string;
}

export default function ProfileSupports({ userId }: ProfileSupportsProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [supports, setSupports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSupports() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('issue_upvotes')
          .select(`
            id,
            created_at,
            issue:issues(id, title, category, severity)
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(3);

        if (!error && data) {
          setSupports(data);
        }
      } catch (err) {
        console.error('Error fetching profile supports:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSupports();
  }, [userId]);

  if (loading) return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 animate-pulse h-64" />
  );

  return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <ThumbsUp className="w-6 h-6 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Community Support</h3>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Issues you&apos;ve backed</p>
        </div>
      </div>
      
      {supports.length === 0 ? (
        <ProfileEmptyState 
          icon={<ThumbsUp className="w-8 h-8" />}
          title="No Supports Yet"
          description="You haven't supported any community issues."
        />
      ) : (
        <div className="space-y-3 flex-1 relative z-10">
          {supports.map((support) => {
            const issue = support.issue;
            if (!issue) return null;
            return (
              <Link 
                key={support.id} 
                href={`/issues/${issue.id}`}
                className="block p-4 rounded-2xl border border-white/5 bg-[#0a0f1c]/80 backdrop-blur-md hover:border-white/20 transition-all duration-300 group/item hover:-translate-y-0.5 shadow-inner hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-bold text-white line-clamp-1 group-hover/item:text-emerald-400 transition-colors">
                    {issue.title}
                  </h4>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    {issue.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 font-bold">
                  <span>Supported {new Date(support.created_at).toLocaleDateString()}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      
      {supports.length > 0 && (
        <Link 
          href="/dashboard"
          className="mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-gray-300 transition-all shadow-inner relative z-10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        >
          View All in Dashboard
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
        </Link>
      )}
    </div>
  );
}
