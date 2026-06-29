import React from 'react';
import { NotificationRecord } from '@/types/notification';
import { FilterType } from './NotificationFilter';
import NotificationCard from './NotificationCard';
import NotificationEmptyState from './NotificationEmptyState';
import NotificationSkeleton from './NotificationSkeleton';
import { motion } from 'framer-motion';

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
    <div className="relative pt-4 pb-8 pl-4 md:pl-8">
      {/* Timeline spine */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-indigo-500/30" />
      
      <div className="space-y-10">
        {groupOrder.map(group => {
          const groupNotifications = grouped[group];
          if (!groupNotifications || groupNotifications.length === 0) return null;

          return (
            <div key={group} className="relative">
              {/* Timeline dot for group header */}
              <div className="absolute -left-1.5 top-2 w-3 h-3 bg-[#0a0f1c] rounded-full border-2 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10" />
              
              <h3 className="text-sm font-black text-indigo-300 pl-6 uppercase tracking-widest mb-6 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                {group}
              </h3>
              
              <div className="space-y-4 pl-6">
                {groupNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    {/* Horizontal connection line to card */}
                    <div className="absolute -left-6 top-8 w-4 h-px bg-indigo-500/30" />
                    <NotificationCard 
                      notification={notification} 
                      onMarkAsRead={onMarkAsRead}
                      onDelete={onDelete}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
