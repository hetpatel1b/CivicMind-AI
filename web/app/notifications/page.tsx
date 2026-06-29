'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { NotificationRecord } from '@/types/notification';
import { motion, AnimatePresence } from 'framer-motion';

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
import AICivicDigest from '@/components/notifications/AICivicDigest';
import { Loader2 } from 'lucide-react';

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
    <main className="min-h-screen bg-[#020817] pt-24 pb-12 overflow-x-hidden relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <AnimatePresence mode="wait">
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Premium Hero */}
            <NotificationsHeader onRefresh={handleRefresh} isRefreshing={loading} />

            {/* AI Assistant */}
            <AICivicDigest notifications={notifications} />

            {/* Activity Center Main Layout */}
            <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 p-6 md:p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 -ml-32 -mt-32 w-[35rem] h-[35rem] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
              
              {/* Intelligent Toolbar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10 relative z-10">
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

              {/* Modern Activity Timeline */}
              <div className="relative z-10">
                <NotificationList 
                  notifications={notifications}
                  loading={loading}
                  filter={filter}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              </div>

              {/* Enhanced Load More */}
              {!loading && hasMore && notifications.length > 0 && (
                <div className="mt-12 flex justify-center pb-4 relative z-10">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-bold text-gray-300 transition-all disabled:opacity-50 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] shadow-inner"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-400 drop-shadow-[0_0_5px_rgba(99,102,241,0.8)]" />
                        Loading history...
                      </>
                    ) : (
                      'Load older activity'
                    )}
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
        
      </div>
    </main>
  );
}
