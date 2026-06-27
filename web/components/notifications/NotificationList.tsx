import React from 'react';
import { NotificationRecord } from '@/types/notification';
import { FilterType } from './NotificationFilter';
import NotificationCard from './NotificationCard';
import NotificationEmptyState from './NotificationEmptyState';
import NotificationSkeleton from './NotificationSkeleton';

interface NotificationListProps {
  notifications: NotificationRecord[];
  loading: boolean;
  filter: FilterType;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationList({ notifications, loading, filter, onMarkAsRead, onDelete }: NotificationListProps) {
  if (loading && notifications.length === 0) {
    return (
      <div className="space-y-4">
        <NotificationSkeleton />
        <NotificationSkeleton />
        <NotificationSkeleton />
      </div>
    );
  }

  // Apply filtering
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'Unread': return !notification.isRead;
      case 'Read': return notification.isRead;
      case 'System': 
        return notification.type === 'BADGE_EARNED'; 
      case 'Moderation':
        return ['ISSUE_VERIFIED', 'ISSUE_RESOLVED'].includes(notification.type);
      case 'Reputation':
        return ['BADGE_EARNED'].includes(notification.type);
      case 'Reports':
        return ['ISSUE_SUPPORTED', 'COMMENT_RECEIVED', 'ISSUE_VERIFIED', 'ISSUE_RESOLVED'].includes(notification.type);
      case 'All':
      default:
        return true;
    }
  });

  if (filteredNotifications.length === 0) {
    return <NotificationEmptyState filter={filter} />;
  }

  // Group notifications by date
  const grouped = filteredNotifications.reduce((acc, notification) => {
    const date = new Date(notification.createdAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let group = 'Older';
    
    if (date.toDateString() === today.toDateString()) {
      group = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      group = 'Yesterday';
    } else if (date.getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000) {
      group = 'Earlier This Week';
    }

    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(notification);
    return acc;
  }, {} as Record<string, NotificationRecord[]>);

  const groupOrder = ['Today', 'Yesterday', 'Earlier This Week', 'Older'];

  return (
    <div className="space-y-8">
      {groupOrder.map(group => {
        const groupNotifications = grouped[group];
        if (!groupNotifications || groupNotifications.length === 0) return null;

        return (
          <div key={group} className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 pl-1 uppercase tracking-wider">
              {group}
            </h3>
            <div className="space-y-4">
              {groupNotifications.map(notification => (
                <NotificationCard 
                  key={notification.id} 
                  notification={notification} 
                  onMarkAsRead={onMarkAsRead}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
