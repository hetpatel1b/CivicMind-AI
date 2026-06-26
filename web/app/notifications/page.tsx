'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { NotificationRecord } from '@/types/notification';

import { 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  clearReadNotifications 
} from '@/components/notifications/service';

import NotificationsHeader from '@/components/notifications/NotificationsHeader';
import NotificationFilter, { FilterType } from '@/components/notifications/NotificationFilter';
import NotificationActions from '@/components/notifications/NotificationActions';
import NotificationList from '@/components/notifications/NotificationList';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('All');

  const fetchNotifications = async (uid: string) => {
    setLoading(true);
    try {
      const data = await getNotifications(uid);
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function init() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        window.location.href = '/login';
        return;
      }
      
      setUserId(user.id);
      await fetchNotifications(user.id);
    }
    init();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    if (!userId) return;
    try {
      // Optimistic update
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      await markAsRead(id);
    } catch (err) {
      console.error('Failed to mark as read', err);
      // Revert on fail if needed
      await fetchNotifications(userId);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!userId) return;
    try {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      await markAllAsRead(userId);
    } catch (err) {
      console.error('Failed to mark all as read', err);
      await fetchNotifications(userId);
    }
  };

  const handleClearRead = async () => {
    if (!userId) return;
    try {
      setNotifications(prev => prev.filter(n => !n.isRead));
      await clearReadNotifications(userId);
    } catch (err) {
      console.error('Failed to clear read', err);
      await fetchNotifications(userId);
    }
  };

  const hasUnread = notifications.some(n => !n.isRead);
  const hasRead = notifications.some(n => n.isRead);

  if (!userId && !loading) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <NotificationsHeader />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
            <NotificationFilter 
              currentFilter={filter} 
              onFilterChange={setFilter} 
            />
            <NotificationActions 
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearRead={handleClearRead}
              hasUnread={hasUnread}
              hasRead={hasRead}
            />
          </div>

          <NotificationList 
            notifications={notifications}
            loading={loading}
            filter={filter}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
        
      </div>
    </main>
  );
}
