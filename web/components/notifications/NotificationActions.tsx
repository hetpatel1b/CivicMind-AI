import React from 'react';
import { CheckCheck, Trash2 } from 'lucide-react';

interface NotificationActionsProps {
  onMarkAllAsRead: () => void;
  onClearRead: () => void;
  hasUnread: boolean;
  hasRead: boolean;
}

export default function NotificationActions({ onMarkAllAsRead, onClearRead, hasUnread, hasRead }: NotificationActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onMarkAllAsRead}
        disabled={!hasUnread}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          hasUnread 
            ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' 
            : 'text-gray-400 cursor-not-allowed dark:text-gray-600'
        }`}
      >
        <CheckCheck className="w-4 h-4" />
        Mark all as read
      </button>
      <button
        onClick={onClearRead}
        disabled={!hasRead}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          hasRead 
            ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20' 
            : 'text-gray-400 cursor-not-allowed dark:text-gray-600'
        }`}
      >
        <Trash2 className="w-4 h-4" />
        Clear read
      </button>
    </div>
  );
}
