'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { MessageSquare, ArrowRight } from 'lucide-react';
import ProfileEmptyState from './ProfileEmptyState';

interface ProfileCommentsProps {
  userId: string;
}

export default function ProfileComments({ userId }: ProfileCommentsProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('issue_comments')
          .select(`
            id,
            content,
            created_at,
            issue:issues(id, title)
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(3);

        if (!error && data) {
          setComments(data);
        }
      } catch (err) {
        console.error('Error fetching profile comments:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [userId]);

  if (loading) return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 animate-pulse h-64" />
  );

  return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <MessageSquare className="w-6 h-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Recent Discussions</h3>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Your latest community comments</p>
        </div>
      </div>
      
      {comments.length === 0 ? (
        <ProfileEmptyState 
          icon={<MessageSquare className="w-8 h-8" />}
          title="No Comments Yet"
          description="You haven't participated in any discussions."
        />
      ) : (
        <div className="space-y-4 relative z-10">
          {comments.map((comment) => {
            const issue = comment.issue;
            if (!issue) return null;
            return (
              <Link 
                key={comment.id} 
                href={`/issues/${issue.id}`}
                className="block p-5 rounded-2xl border border-white/5 bg-[#0a0f1c]/80 backdrop-blur-md hover:border-white/20 transition-all duration-300 group/item hover:-translate-y-0.5 shadow-inner hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/5 border border-white/10 rounded-lg shrink-0 mt-0.5 shadow-inner">
                    <MessageSquare className="w-4 h-4 text-purple-400 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed mb-2 font-medium">
                      &quot;{comment.content}&quot;
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-white line-clamp-1 group-hover/item:text-purple-400 transition-colors">
                        Re: {issue.title}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500 font-bold">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          
          <Link 
            href="/dashboard"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-gray-300 transition-all shadow-inner hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            Manage Comments
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>
      )}
    </div>
  );
}
