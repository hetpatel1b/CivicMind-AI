'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { MessageSquare, ExternalLink } from 'lucide-react';
import ProfileCard from './ProfileCard';
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
          .from('comments')
          .select(`
            id,
            content,
            created_at,
            issues (
              id,
              title
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5);

        if (!error && data) {
          const validComments = data.filter(d => d.issues);
          setComments(validComments);
        }
      } catch (err) {
        console.error('Error fetching profile comments:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [userId]);

  if (loading) return null;

  return (
    <ProfileCard title="Recent Comments" icon={<MessageSquare className="w-5 h-5" />}>
      {comments.length === 0 ? (
        <ProfileEmptyState 
          icon={<MessageSquare className="w-8 h-8" />}
          title="No Comments"
          description="You haven't participated in any discussions yet."
        />
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => {
            const issue = Array.isArray(comment.issues) ? comment.issues[0] : comment.issues;
            return (
              <Link 
                key={comment.id} 
                href={`/issues/${issue.id}`}
                className="group block p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">
                    On: {issue.title}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
                </div>
                <p className="text-sm text-gray-900 dark:text-white line-clamp-2 break-words">
                  &quot;{comment.content}&quot;
                </p>
                <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </ProfileCard>
  );
}
