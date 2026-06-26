import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { NotificationRecord } from '@/types/notification';
import NotificationIcon from './NotificationIcon';
import NotificationBadge from './NotificationBadge';

interface NotificationCardProps {
  notification: NotificationRecord;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
  const { id, type, title, message, isRead, createdAt } = notification;

  // Function to determine related URL
  const getHref = () => {
    if (type.includes('ISSUE')) return `/dashboard`; // Simplified for demo
    if (type === 'BADGE_EARNED') return `/reputation`;
    return `/profile`;
  };

  return (
    <div 
      className={`group relative flex items-start gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-200 ${
        isRead 
          ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700' 
          : 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 shadow-sm'
      }`}
    >
      <div className="pt-3">
        <NotificationBadge isRead={isRead} />
      </div>
      
      <NotificationIcon type={type} />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className={`text-sm font-bold truncate ${isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
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
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            View Details
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          
          {!isRead && (
            <button
              onClick={() => onMarkAsRead(id)}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
