import React from 'react';
import { BellOff } from 'lucide-react';
import { FilterType } from './NotificationFilter';

interface NotificationEmptyStateProps {
  filter: FilterType;
}

export default function NotificationEmptyState({ filter }: NotificationEmptyStateProps) {
  let title = 'No notifications yet';
  let desc = "You're all caught up! Check back later for new updates.";

  if (filter === 'Unread') {
    title = 'No unread notifications';
    desc = "You've read all your notifications.";
  } else if (filter === 'Read') {
    title = 'No read notifications';
    desc = "You haven't read any notifications yet.";
  } else if (['System', 'Moderation', 'Reputation', 'Reports'].includes(filter)) {
    title = `No ${filter.toLowerCase()} notifications`;
    desc = `You don't have any notifications matching the '${filter}' filter.`;
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900/50 rounded-full flex items-center justify-center text-gray-400 mb-4 border border-gray-100 dark:border-gray-700">
        <BellOff className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        {desc}
      </p>
    </div>
  );
}
