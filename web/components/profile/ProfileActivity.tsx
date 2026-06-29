'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Activity, ShieldAlert, ThumbsUp, MessageSquare, Trophy } from 'lucide-react';
import ProfileEmptyState from './ProfileEmptyState';
import { motion } from 'framer-motion';

interface ProfileActivityProps {
  userId: string;
}

export default function ProfileActivity({ userId }: ProfileActivityProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('reputation_events')
          .select('id, type, points, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10);

        if (!error && data) {
          setEvents(data);
        }
      } catch (err) {
        console.error('Error fetching activity:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivity();
  }, [userId]);

  const getEventMeta = (type: string) => {
    switch(type) {
      case 'ISSUE_REPORTED': return { icon: ShieldAlert, text: 'Reported an issue', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400' };
      case 'ISSUE_SUPPORTED': return { icon: ThumbsUp, text: 'Supported an issue', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' };
      case 'COMMENT_CREATED': return { icon: MessageSquare, text: 'Added a comment', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30 text-purple-400' };
      case 'ISSUE_VERIFIED': return { icon: ShieldAlert, text: 'Issue was verified', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' };
      case 'ISSUE_RESOLVED': return { icon: Trophy, text: 'Issue was resolved', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400' };
      default: return { icon: Activity, text: 'Performed an action', color: 'text-gray-400', bg: 'bg-white/10 border-white/20 text-gray-400' };
    }
  };

  if (loading) return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 animate-pulse h-64" />
  );

  return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 relative overflow-hidden group">
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <Activity className="w-6 h-6 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Contribution Timeline</h3>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Your recent civic activities</p>
        </div>
      </div>
      
      {events.length === 0 ? (
        <ProfileEmptyState 
          icon={<Activity className="w-8 h-8" />}
          title="No Activity Yet"
          description="You haven't performed any civic actions on the platform."
        />
      ) : (
        <div className="relative border-l-2 border-indigo-500/30 ml-4 space-y-6 pt-2 pb-2 z-10">
          {events.map((event, index) => {
            const meta = getEventMeta(event.type);
            const Icon = meta.icon;
            
            return (
              <motion.div 
                key={event.id} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative pl-8 group/item"
              >
                <span className={`absolute -left-[19px] top-2 rounded-full p-2 border-[4px] border-[#0a0f1c] group-hover/item:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(99,102,241,0.3)] ${meta.bg}`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>
                
                <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/5 p-4 rounded-2xl group-hover/item:border-white/20 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {meta.text}
                    </h4>
                    <span className="text-xs font-semibold text-gray-500 mt-0.5 block">
                      {new Date(event.created_at).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {event.points > 0 && (
                    <div className="shrink-0 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest rounded-lg border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)] group-hover/item:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                      +{event.points} XP
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
