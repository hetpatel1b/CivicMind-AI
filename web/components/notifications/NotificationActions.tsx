import React from 'react';
import { CheckCheck, Trash2 } from 'lucide-react';

interface NotificationActionsProps {
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  hasUnread: boolean;
  hasAny: boolean;
}

export default function NotificationActions({ onMarkAllAsRead, onClearAll, hasUnread, hasAny }: NotificationActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onMarkAllAsRead}
        disabled={!hasUnread}
        aria-label="Mark all notifications as read"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 ${
          hasUnread 
            ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' 
            : 'text-gray-400 cursor-not-allowed dark:text-gray-600'
        }`}
      >
        <CheckCheck className="w-4 h-4" aria-hidden="true" />
        Mark all as read
      </button>
      <button
        onClick={onClearAll}
        disabled={!hasAny}
        aria-label="Clear all notifications"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
          hasAny 
            ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20' 
            : 'text-gray-400 cursor-not-allowed dark:text-gray-600'
        }`}
      >
        <Trash2 className="w-4 h-4" aria-hidden="true" />
        Clear all
      </button>
    </div>
  );
}
