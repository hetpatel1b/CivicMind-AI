import React from 'react';
import { History, PlusCircle } from 'lucide-react';
import ReputationEmptyState from './ReputationEmptyState';

interface PointsHistoryProps {
   
  events: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */;
}

export default function PointsHistory({ events }: PointsHistoryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <div className="flex items-center gap-3 mb-6">
        <History className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Points</h3>
      </div>
      
      {events.length === 0 ? (
        <ReputationEmptyState 
          icon={<History className="w-8 h-8" />}
          title="No Points History"
          description="You haven't earned any reputation points yet."
        />
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5 capitalize">
                  {event.type.replace(/_/g, ' ').toLowerCase()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(event.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-lg">
                <PlusCircle className="w-3.5 h-3.5" />
                {event.points}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
