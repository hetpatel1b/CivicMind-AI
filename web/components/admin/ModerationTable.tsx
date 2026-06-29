import React from 'react';
import { IssueModeration, ModerationStatus } from '@/types/moderation';
import { 
  CheckCircle2, 
  ShieldCheck, 
  XCircle, 
  Clock3,
  Sparkles
} from 'lucide-react';
import IssueInsightsRow from './IssueInsightsRow';
import { Card } from '@/design-system/components/Card';

interface ModerationTableProps {
  /** The list of issues currently loaded in the moderation queue */
  issues: IssueModeration[];
  /** Callback triggered when an admin approves an issue */
  onVerify: (issueId: string) => void;
  /** Callback triggered when an admin marks an issue as resolved */
  onResolve: (issueId: string) => void;
  /** Callback triggered when an admin invalidates an issue */
  onReject: (issueId: string) => void;
}

/**
 * Returns a styled badge component based on the issue's moderation status.
 */
function StatusBadge({ status }: { status: ModerationStatus }) {
  let colorStyles = '';
  let label = '';

  switch (status) {
    case 'PENDING':
      colorStyles = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50';
      label = 'Pending';
      break;
    case 'VERIFIED':
      colorStyles = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50';
      label = 'Verified';
      break;
    case 'RESOLVED':
      colorStyles = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50';
      label = 'Resolved';
      break;
    case 'REJECTED':
      colorStyles = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50';
      label = 'Rejected';
      break;
  }

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorStyles}`}
      aria-label={`Status: ${label}`}
    >
      {label}
    </span>
  );
}

/**
 * A responsive, premium table designed for administrators to rapidly review
 * and moderate user-reported civic issues.
 */
export default function ModerationTable({ issues, onVerify, onResolve, onReject }: ModerationTableProps) {
  const [expandedIssueId, setExpandedIssueId] = React.useState<string | null>(null);

  // Graceful empty state representation
  if (!issues || issues.length === 0) {
    return (
      <Card className="p-16 flex flex-col items-center justify-center text-center transition-all duration-300">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-full mb-5 ring-8 ring-gray-50/50 dark:ring-gray-800/50 shadow-inner">
          <Clock3 className="w-10 h-10 text-blue-500 dark:text-blue-400" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Queue is Clear</h3>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-md">
          There are currently no pending issues requiring moderation. Excellent work maintaining the platform!
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Title</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Category</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Severity</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {issues.map((issue) => (
              <React.Fragment key={issue.issueId}>
                <tr 
                  className={`hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors duration-200 ease-in-out group ${
                    expandedIssueId === issue.issueId ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white max-w-xs truncate" title={issue.title}>
                    {issue.title}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                    {issue.category}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                    {issue.severity}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={issue.status} />
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => setExpandedIssueId(expandedIssueId === issue.issueId ? null : issue.issueId)}
                      className={`inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 hover:scale-110 active:scale-95 ${
                        expandedIssueId === issue.issueId 
                          ? 'text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/40 ring-2 ring-indigo-500' 
                          : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 focus-visible:ring-indigo-500'
                      }`}
                      aria-label="View AI Insights"
                      title="AI Insights"
                    >
                      <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => onVerify(issue.issueId)}
                      className="inline-flex items-center justify-center p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:scale-110 active:scale-95"
                      aria-label={`Verify issue ${issue.title}`}
                      title="Verify Issue"
                    >
                      <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => onResolve(issue.issueId)}
                      className="inline-flex items-center justify-center p-2 text-green-600 bg-green-50 hover:bg-green-100 dark:text-green-400 dark:bg-green-900/20 dark:hover:bg-green-900/40 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-green-500 hover:scale-110 active:scale-95"
                      aria-label={`Resolve issue ${issue.title}`}
                      title="Resolve Issue"
                    >
                      <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => onReject(issue.issueId)}
                      className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-red-500 hover:scale-110 active:scale-95"
                      aria-label={`Reject issue ${issue.title}`}
                      title="Reject Issue"
                    >
                      <XCircle className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </td>
                </tr>
                {expandedIssueId === issue.issueId && (
                  <IssueInsightsRow issueId={issue.issueId} />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
