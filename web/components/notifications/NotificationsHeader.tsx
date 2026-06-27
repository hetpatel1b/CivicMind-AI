import React from 'react';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';

interface NotificationsHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function NotificationsHeader({ onRefresh, isRefreshing }: NotificationsHeaderProps = {}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Notifications
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Stay updated on your civic impact and community activity.
        </p>
      </div>
      <div className="flex items-center gap-3">
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors shadow-sm disabled:opacity-50"
            title="Refresh notifications"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        )}
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Dashboard
        </Link>
        <Link
          href="/profile"
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
