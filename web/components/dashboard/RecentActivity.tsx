import React from 'react';
import { Activity, Plus, Minus } from 'lucide-react';
import EmptyState from './EmptyState';

interface ReputationEvent {
  id: string;
  type: string;
  points: number;
  created_at: string;
}

interface RecentActivityProps {
  events: ReputationEvent[];
}

const EventFormat = (type: string) => {
  switch (type) {
    case 'ISSUE_REPORTED': return 'Reported a new civic issue';
    case 'ISSUE_SUPPORTED': return 'Supported a community issue';
    case 'COMMENT_CREATED': return 'Commented on an issue';
    case 'ISSUE_VERIFIED': return 'Issue was officially verified';
    case 'ISSUE_RESOLVED': return 'Issue was resolved';
    default: return type.replace(/_/g, ' ');
  }
};

export default function RecentActivity({ events }: RecentActivityProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          Recent Activity
        </h3>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {events.length === 0 ? (
          <EmptyState 
            icon={Activity} 
            title="No recent activity" 
            description="Your reputation events will appear here once you start participating." 
          />
        ) : (
          <div className="space-y-4 w-full relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
            {events.map((event) => {
              const isPositive = event.points > 0;
              return (
                <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-800 bg-gray-50 dark:bg-gray-700 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {EventFormat(event.type)}
                      </p>
                      <time className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(event.created_at).toLocaleString()}
                      </time>
                    </div>
                    <div className={`flex items-center gap-1 font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isPositive ? <Plus className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                      {Math.abs(event.points)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
