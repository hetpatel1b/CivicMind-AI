import { getIssues } from '@/services/issues';
import React from 'react';

import AssignmentList from '@/components/admin/AssignmentList';

export const dynamic = 'force-dynamic';

export default async function AdminAssignmentsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const pageStr = typeof searchParams.page === 'string' ? searchParams.page : undefined;
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const limit = 20;

  // Fetch verified issues that are not yet assigned
  const result = await getIssues({
    page,
    limit,
    status: 'VERIFIED', 
    unassignedOnly: true
  });

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Assignments</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Assign verified issues to the appropriate municipal departments.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {result.count} Ready to Assign
            </span>
          </div>
        </div>
      </div>

      <AssignmentList initialIssues={result.issues} />
    </div>
  );
}
