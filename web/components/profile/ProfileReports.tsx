'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import ProfileCard from './ProfileCard';
import ProfileEmptyState from './ProfileEmptyState';

interface ProfileReportsProps {
  userId: string;
}

export default function ProfileReports({ userId }: ProfileReportsProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('issues')
          .select('id, title, status, category, severity, upvotes_count, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5);

        if (!error && data) {
          setReports(data);
        }
      } catch (err) {
        console.error('Error fetching profile reports:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, [userId]);

  if (loading) return null;

  return (
    <ProfileCard title="Recent Reports" icon={<ShieldAlert className="w-5 h-5" />}>
      {reports.length === 0 ? (
        <ProfileEmptyState 
          icon={<ShieldAlert className="w-8 h-8" />}
          title="No Reports Yet"
          description="You haven't reported any civic issues yet."
        />
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Link 
              key={report.id} 
              href={`/issues/${report.id}`}
              className="block p-5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 pr-4">
                  {report.title}
                </h4>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 shrink-0 mt-0.5" />
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  {report.category}
                </span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  report.severity === 'HIGH' || report.severity === 'CRITICAL' 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                }`}>
                  {report.severity}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 capitalize">
                  {report.status.toLowerCase()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{new Date(report.created_at).toLocaleDateString()}</span>
                {report.upvotes_count > 0 && (
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {report.upvotes_count} {report.upvotes_count === 1 ? 'Support' : 'Supports'}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </ProfileCard>
  );
}
