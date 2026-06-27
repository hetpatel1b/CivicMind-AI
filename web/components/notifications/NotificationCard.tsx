import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { NotificationRecord } from '@/types/notification';
import NotificationIcon from './NotificationIcon';
import NotificationBadge from './NotificationBadge';

interface NotificationCardProps {
  notification: NotificationRecord;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationCard({ notification, onMarkAsRead, onDelete }: NotificationCardProps) {
  const { id, type, title, message, isRead, createdAt } = notification;

  // Function to determine related URL
  const getHref = () => {
    if (type.includes('ISSUE')) return `/dashboard`; // Simplified for demo
    if (type === 'BADGE_EARNED') return `/reputation`;
    return `/profile`;
  };

  return (
    <article 
      className={`group relative flex items-start gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-200 ${
        isRead 
          ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700' 
          : 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 shadow-sm'
      }`}
      aria-labelledby={`notification-title-${id}`}
    >
      <div className="pt-3">
        <NotificationBadge isRead={isRead} />
      </div>
      
      <NotificationIcon type={type} />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 id={`notification-title-${id}`} className={`text-sm font-bold truncate ${isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
            {title}
          </h4>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 shrink-0 whitespace-nowrap">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <p className={`text-sm mb-3 line-clamp-2 ${isRead ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
          {message}
        </p>

        <div className="flex items-center gap-4">
          <Link 
            href={getHref()}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            aria-label={`View details for ${title}`}
          >
            View Details
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          
          <div className="flex items-center gap-3">
            {!isRead && (
              <button
                onClick={() => onMarkAsRead(id)}
                className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 rounded px-1"
                aria-label={`Mark "${title}" as read`}
              >
                Mark as read
              </button>
            )}
            <button
              onClick={() => onDelete(id)}
              className="text-xs font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-1"
              aria-label={`Delete notification "${title}"`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
