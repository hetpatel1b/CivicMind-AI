'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { ThumbsUp, ExternalLink } from 'lucide-react';
import ProfileCard from './ProfileCard';
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
          .from('supports')
          .select(`
            id,
            issues (
              id,
              title,
              status
            )
          `)
          .eq('user_id', userId)
          .limit(5);

        if (!error && data) {
          const validSupports = data.filter(d => d.issues);
          setSupports(validSupports);
        }
      } catch (err) {
        console.error('Error fetching profile supports:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSupports();
  }, [userId]);

  if (loading) return null;

  return (
    <ProfileCard title="Recent Supports" icon={<ThumbsUp className="w-5 h-5" />}>
      {supports.length === 0 ? (
        <ProfileEmptyState 
          icon={<ThumbsUp className="w-8 h-8" />}
          title="No Supported Issues"
          description="You haven't supported any civic issues yet."
        />
      ) : (
        <div className="space-y-3">
          {supports.map((support) => {
            const issue = Array.isArray(support.issues) ? support.issues[0] : support.issues;
            return (
              <Link 
                key={support.id} 
                href={`/issues/${issue.id}`}
                className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate mb-1">
                    {issue.title}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {issue.status.toLowerCase()}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
              </Link>
            );
          })}
        </div>
      )}
    </ProfileCard>
  );
}
