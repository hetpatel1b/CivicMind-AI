'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Activity, ShieldAlert, ThumbsUp, MessageSquare, Trophy } from 'lucide-react';
import ProfileCard from './ProfileCard';
import ProfileEmptyState from './ProfileEmptyState';

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
      case 'ISSUE_REPORTED': return { icon: ShieldAlert, text: 'Reported an issue', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' };
      case 'ISSUE_SUPPORTED': return { icon: ThumbsUp, text: 'Supported an issue', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
      case 'COMMENT_CREATED': return { icon: MessageSquare, text: 'Added a comment', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' };
      case 'ISSUE_VERIFIED': return { icon: ShieldAlert, text: 'Issue was verified', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
      case 'ISSUE_RESOLVED': return { icon: Trophy, text: 'Issue was resolved', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
      default: return { icon: Activity, text: 'Performed an action', color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800' };
    }
  };

  if (loading) return null;

  return (
    <ProfileCard title="Recent Activity Feed" icon={<Activity className="w-5 h-5" />}>
      {events.length === 0 ? (
        <ProfileEmptyState 
          icon={<Activity className="w-8 h-8" />}
          title="No Activity Yet"
          description="You haven't performed any civic actions on the platform."
        />
      ) : (
        <div className="relative border-l-2 border-gray-100 dark:border-gray-700 ml-3 space-y-6 pt-2">
          {events.map((event) => {
            const meta = getEventMeta(event.type);
            const Icon = meta.icon;
            
            return (
              <div key={event.id} className="relative pl-6">
                <span className={`absolute -left-[17px] top-0 rounded-full p-1.5 border-4 border-white dark:border-gray-800 ${meta.bg}`}>
                  <Icon className={`w-3 h-3 ${meta.color}`} />
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {meta.text}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(event.created_at).toLocaleString()}
                  </span>
                </div>
                {event.points > 0 && (
                  <p className="text-xs font-medium text-green-600 dark:text-green-400 mt-1">
                    +{event.points} Reputation Points
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </ProfileCard>
  );
}
