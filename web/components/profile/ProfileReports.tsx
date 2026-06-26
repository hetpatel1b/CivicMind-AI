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
          .select('id, title, status, created_at')
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
        <div className="space-y-3">
          {reports.map((report) => (
            <Link 
              key={report.id} 
              href={`/issues/${report.id}`}
              className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
            >
              <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate mb-1">
                  {report.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>{new Date(report.created_at).toLocaleDateString()}</span>
                  <span className="capitalize">{report.status.toLowerCase()}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </ProfileCard>
  );
}
