import React from 'react';
import { FileText, ThumbsUp, MessageCircle } from 'lucide-react';

interface QuickStatsProps {
  totalReports: number;
  totalSupports: number;
  totalComments: number;
}

export default function QuickStats({ totalReports, totalSupports, totalComments }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400">Total Reports</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalReports}</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400">Total Supports</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalSupports}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400">Total Comments</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalComments}</p>
      </div>
    </div>
  );
}
