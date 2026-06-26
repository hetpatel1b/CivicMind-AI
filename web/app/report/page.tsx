import React from 'react';
import ReportForm from '@/components/report/ReportForm';
import { AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Report Issue | CivicMind AI',
  description: 'Report a new civic issue in your community.',
};

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                Report an Issue
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Help improve your community by reporting civic problems.
              </p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <ReportForm />
        
      </div>
    </main>
  );
}
