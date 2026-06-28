import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProfileCompletionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userMetadata: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reputationProfile: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  badgeSummary: any;
}

export default function ProfileCompletion({ userMetadata, reputationProfile, badgeSummary }: ProfileCompletionProps) {
  
  const tasks = [
    {
      id: 'avatar',
      label: 'Upload profile picture',
      completed: !!userMetadata?.avatarUrl,
      href: '/settings',
      time: '1 min'
    },
    {
      id: 'name',
      label: 'Add full name',
      completed: !!userMetadata?.fullName,
      href: '/settings',
      time: '1 min'
    },
    {
      id: 'report',
      label: 'Submit first report',
      completed: (reputationProfile?.totalPoints || 0) > 0, // Simplified check
      href: '/report',
      time: '5 mins'
    },
    {
      id: 'badge',
      label: 'Earn first badge',
      completed: (badgeSummary?.totalBadges || 0) > 0,
      href: '/reputation',
      time: 'Ongoing'
    }
  ];

  const completedCount = tasks.filter(t => t.completed).length;
  const percentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Profile Completion</h3>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{percentage}%</span>
      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-6 overflow-hidden">
        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0" />
              )}
              <span className={`text-sm font-medium ${task.completed ? 'text-gray-900 dark:text-white line-through opacity-70' : 'text-gray-900 dark:text-white'}`}>
                {task.label}
              </span>
            </div>
            
            {!task.completed && (
              <Link 
                href={task.href}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                {task.time}
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
