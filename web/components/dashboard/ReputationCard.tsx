import React from 'react';
import { Award, Zap } from 'lucide-react';

interface ReputationCardProps {
  totalPoints: number;
  level: string;
}

export default function ReputationCard({ totalPoints, level }: ReputationCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-500" />
          My Reputation
        </h3>
        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {level}
        </span>
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
          {totalPoints.toLocaleString()}
        </span>
        <span className="text-gray-500 dark:text-gray-400 font-medium pb-1">
          Points
        </span>
      </div>
      
      <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 flex items-start gap-3">
        <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Earn more points by reporting new issues and verifying community reports!
        </p>
      </div>
    </div>
  );
}
