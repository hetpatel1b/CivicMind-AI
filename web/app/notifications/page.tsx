'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { NotificationRecord } from '@/types/notification';

import { 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification,
  deleteAllNotifications
} from '@/components/notifications/service';

import NotificationsHeader from '@/components/notifications/NotificationsHeader';
import NotificationFilter, { FilterType } from '@/components/notifications/NotificationFilter';
import NotificationActions from '@/components/notifications/NotificationActions';
import NotificationList from '@/components/notifications/NotificationList';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifications = async (uid: string, pageNum: number, append = false) => {
    if (!append) setLoading(true);
    else setLoadingMore(true);
    
    try {
      const data = await getNotifications(uid, pageNum, 20);
      if (data.length < 20) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      
      if (append) {
        setNotifications(prev => [...prev, ...data]);
      } else {
        setNotifications(data);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
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
      await fetchNotifications(user.id, 1, false);
    }
    init();
  }, []);

  const handleLoadMore = () => {
    if (!userId) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotifications(userId, nextPage, true);
  };

  const handleRefresh = async () => {
    if (!userId) return;
    setPage(1);
    await fetchNotifications(userId, 1, false);
  };

  const handleMarkAsRead = async (id: string) => {
    if (!userId) return;
    try {
      // Optimistic update
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      await markAsRead(id);
    } catch (err) {
      console.error('Failed to mark as read', err);
      // Revert on fail if needed
      await handleRefresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!userId) return;
    try {
      setNotifications(prev => prev.filter(n => n.id !== id));
      await deleteNotification(id);
    } catch (err) {
      console.error('Failed to delete', err);
      await handleRefresh();
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      await markAllAsRead();
    } catch (err) {
      console.error('Failed to mark all as read', err);
      await handleRefresh();
    }
  };

  const handleClearAll = async () => {
    try {
      setNotifications([]);
      await deleteAllNotifications();
    } catch (err) {
      console.error('Failed to clear all', err);
      await handleRefresh();
    }
  };

  const hasUnread = notifications.some(n => !n.isRead);
  const hasAny = notifications.length > 0;

  if (!userId && !loading) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <NotificationsHeader onRefresh={handleRefresh} isRefreshing={loading} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
            <NotificationFilter 
              currentFilter={filter} 
              onFilterChange={setFilter} 
            />
            <NotificationActions 
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearAll={handleClearAll}
              hasUnread={hasUnread}
              hasAny={hasAny}
            />
          </div>

          <NotificationList 
            notifications={notifications}
            loading={loading}
            filter={filter}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />

          {!loading && hasMore && notifications.length > 0 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-full transition-colors disabled:opacity-50"
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
        
      </div>
    </main>
  );
}
