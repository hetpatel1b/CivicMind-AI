import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import { Activity, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

interface AdminDemoDashboardViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function AdminDemoDashboardView({ onNavigate }: AdminDemoDashboardViewProps) {
  const { issues, stats, currentUser } = useDemo();

  const pendingIssues = issues.filter(i => i.status === 'pending');
  const verifiedIssues = issues.filter(i => i.status === 'verified');
  const resolvedIssues = issues.filter(i => i.status === 'resolved');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Admin Command Center</h2>
        <p className="text-gray-300">Welcome back, {currentUser?.full_name}. Here is the current status of your city.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg"><Activity className="text-blue-600 w-5 h-5" /></div>
            <h3 className="font-medium text-gray-600 dark:text-gray-400">Total Reports</h3>
          </div>
          <p className="text-3xl font-bold">{issues.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg"><Clock className="text-orange-600 w-5 h-5" /></div>
            <h3 className="font-medium text-gray-600 dark:text-gray-400">Pending Review</h3>
          </div>
          <p className="text-3xl font-bold">{pendingIssues.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg"><ShieldAlert className="text-purple-600 w-5 h-5" /></div>
            <h3 className="font-medium text-gray-600 dark:text-gray-400">Verified</h3>
          </div>
          <p className="text-3xl font-bold">{verifiedIssues.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg"><CheckCircle2 className="text-green-600 w-5 h-5" /></div>
            <h3 className="font-medium text-gray-600 dark:text-gray-400">Resolved</h3>
          </div>
          <p className="text-3xl font-bold">{resolvedIssues.length}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4">Recent High Priority Issues</h3>
        <div className="space-y-4">
          {issues.filter(i => i.urgency === 'high' || i.urgency === 'critical').slice(0, 5).map((issue: any) => (
            <div key={issue.id} className="flex items-center justify-between p-4 border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-xl">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{issue.title}</h4>
                <p className="text-sm text-gray-500">{issue.address}</p>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold uppercase tracking-wide">
                {issue.urgency}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
