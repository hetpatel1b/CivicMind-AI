import React from 'react';
import Link from 'next/link';
import { FileText, ChevronRight, Clock, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';
import EmptyState from './EmptyState';

interface RecentReport {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

interface RecentReportsProps {
  reports: RecentReport[];
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'VERIFIED':
      return <ShieldCheck className="w-4 h-4 text-blue-500" />;
    case 'RESOLVED':
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case 'REJECTED':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-yellow-500" />;
  }
};

const StatusColor = ({ status }: { status: string }) => {
  switch (status) {
    case 'VERIFIED':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    case 'RESOLVED':
      return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
    case 'REJECTED':
      return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
    default:
      return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
  }
};

export default function RecentReports({ reports }: RecentReportsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-400" />
          Recent Reports
        </h3>
        {reports.length > 0 && (
          <Link href="/profile" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
            View all
          </Link>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {reports.length === 0 ? (
          <EmptyState 
            icon={FileText} 
            title="No reports found" 
            description="You haven't submitted any civic issues yet. Be the first to report!" 
          />
        ) : (
          <div className="space-y-3 w-full">
            {reports.map((report) => (
              <Link 
                key={report.id} 
                href={`/issues/${report.id}`}
                className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate mb-1">
                    {report.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${StatusColor({ status: report.status })}`}>
                    <StatusIcon status={report.status} />
                    {report.status}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
