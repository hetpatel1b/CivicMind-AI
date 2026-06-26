'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';

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
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">Related Issues</h3>
      
      {issues.length === 0 ? (
        <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
          No similar issues found.
        </div>
      ) : (
        <div className="space-y-3">
          {issues.map((issue) => (
            <Link
              key={issue.id}
              href={`/issues/${issue.id}`}
              className="block p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-colors bg-gray-50 dark:bg-gray-900/50"
            >
              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate mb-1">
                {issue.title}
              </h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Status: {issue.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
