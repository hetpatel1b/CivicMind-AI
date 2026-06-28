import { getIssues } from '@/services/issues';
import { getAuthContext } from '@/services/auth';
import React from 'react';

import VerificationList from '@/components/admin/VerificationList';

export const dynamic = 'force-dynamic';

export default async function AdminVerificationPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const pageStr = typeof searchParams.page === 'string' ? searchParams.page : undefined;
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const limit = 20;

  // Fetch pending issues. Wait, what status is pending? Usually 'Reported' or 'Pending'.
  // Let's use status='Reported' since that's the default schema status for new issues.
  const result = await getIssues({
    page,
    limit,
    status: 'Reported', 
  });

  const authCtx = await getAuthContext();

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Issue Verification</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Review and verify community reported issues before they are assigned to departments.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {result.count} Pending
            </span>
          </div>
        </div>
      </div>

      <VerificationList 
        initialIssues={result.issues} 
        totalCount={result.count} 
        currentPage={page} 
        adminId={authCtx.user?.id || ''} 
      />
    </div>
  );
}
