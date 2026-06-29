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
    <div className="flex items-center gap-2">
      <button
        onClick={onMarkAllAsRead}
        disabled={!hasUnread}
        aria-label="Mark all notifications as read"
        className={`group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 border ${
          hasUnread 
            ? 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 shadow-inner' 
            : 'text-gray-600 border-transparent bg-transparent cursor-not-allowed'
        }`}
      >
        <CheckCheck className={`w-4 h-4 ${hasUnread ? 'text-indigo-400 group-hover:scale-110 transition-transform' : ''}`} aria-hidden="true" />
        Mark all read
      </button>
      <button
        onClick={onClearAll}
        disabled={!hasAny}
        aria-label="Clear all notifications"
        className={`group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 border ${
          hasAny 
            ? 'text-rose-300 border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 shadow-inner' 
            : 'text-gray-600 border-transparent bg-transparent cursor-not-allowed'
        }`}
      >
        <Trash2 className={`w-4 h-4 ${hasAny ? 'text-rose-400 group-hover:rotate-12 transition-transform' : ''}`} aria-hidden="true" />
        Clear all
      </button>
    </div>
  );
}
