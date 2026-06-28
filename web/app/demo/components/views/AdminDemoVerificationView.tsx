import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface AdminDemoVerificationViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function AdminDemoVerificationView({ onNavigate }: AdminDemoVerificationViewProps) {
  const { issues, updateIssueStatus } = useDemo();
  
  const pendingIssues = issues.filter(i => i.status === 'pending');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verification Queue</h1>
        <p className="text-gray-500">Review newly reported issues to verify authenticity and assign urgency.</p>
      </div>

      {pendingIssues.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl text-center border border-gray-100 dark:border-gray-700">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">All Caught Up!</h2>
          <p className="text-gray-500">There are no pending issues in the verification queue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pendingIssues.map(issue => (
            <div key={issue.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
              {issue.images && issue.images.length > 0 && (
                <div className="h-48 w-full shrink-0">
                  <img src={issue.images[0]} alt="Issue" className="w-full h-full object-cover rounded-t-2xl" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
                      {issue.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{issue.title}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    issue.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                    issue.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {issue.urgency}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 flex-1">
                  {issue.description}
                </p>
                
                <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                  <button 
                    onClick={() => updateIssueStatus(issue.id, 'rejected')}
                    className="flex-1 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-medium transition-colors"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => updateIssueStatus(issue.id, 'verified')}
                    className="flex-1 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-colors shadow-sm shadow-blue-600/20"
                  >
                    Approve & Verify
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
