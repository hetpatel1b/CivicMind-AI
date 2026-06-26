import React from 'react';
import { User, Calendar } from 'lucide-react';
import { ReporterInfo } from '@/services/issue-details';

interface IssueInformationProps {
  description: string | null;
  reporter: ReporterInfo | null;
  createdAt: string;
}

export default function IssueInformation({ description, reporter, createdAt }: IssueInformationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
          {description || 'No detailed description provided.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 overflow-hidden">
            {reporter?.avatar_url ? (
              <img src={reporter.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Reported by</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {reporter?.full_name || 'Anonymous Citizen'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Date Reported</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {new Date(createdAt).toLocaleDateString(undefined, { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
