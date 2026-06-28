import React, { useState } from 'react';
import { useDemo } from '../../context/DemoProvider';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface AdminDemoIssuesViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function AdminDemoIssuesView({ onNavigate }: AdminDemoIssuesViewProps) {
  const { issues, updateIssueStatus } = useDemo();
  const [filter, setFilter] = useState('all');
  
  const filteredIssues = issues.filter(issue => filter === 'all' || issue.status === filter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Issues</h1>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Issues</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Issue Title</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Category</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Priority</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Status</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600" onClick={() => onNavigate('issue_details', issue.id)}>
                    {issue.title}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{issue.category}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      issue.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                      issue.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.urgency}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="capitalize text-sm font-medium flex items-center gap-1.5">
                      {issue.status === 'resolved' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {issue.status === 'pending' && <Clock className="w-4 h-4 text-orange-500" />}
                      {issue.status === 'verified' && <AlertCircle className="w-4 h-4 text-blue-500" />}
                      {issue.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    {issue.status === 'pending' && (
                      <button onClick={() => updateIssueStatus(issue.id, 'verified')} className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors">
                        Verify
                      </button>
                    )}
                    {issue.status === 'verified' && (
                      <button onClick={() => updateIssueStatus(issue.id, 'in_progress')} className="px-3 py-1.5 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg text-sm font-medium transition-colors">
                        Assign
                      </button>
                    )}
                    {issue.status === 'in_progress' && (
                      <button onClick={() => updateIssueStatus(issue.id, 'resolved')} className="px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-sm font-medium transition-colors">
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
