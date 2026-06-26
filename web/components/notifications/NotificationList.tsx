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
}

export default function NotificationList({ notifications, loading, filter, onMarkAsRead }: NotificationListProps) {
  if (loading) {
    return <NotificationSkeleton />;
  }

  // Apply filtering
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'Unread': return !notification.isRead;
      case 'Read': return notification.isRead;
      case 'System': 
      case 'Activity': 
        // Example categorization logic
        const isSystem = notification.type.includes('BADGE') || notification.type.includes('SYSTEM');
        return filter === 'System' ? isSystem : !isSystem;
      case 'All':
      default:
        return true;
    }
  });

  if (filteredNotifications.length === 0) {
    return <NotificationEmptyState filter={filter} />;
  }

  return (
    <div className="space-y-4">
      {filteredNotifications.map(notification => (
        <NotificationCard 
          key={notification.id} 
          notification={notification} 
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
}
