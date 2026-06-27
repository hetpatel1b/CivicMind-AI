import { NotificationRecord } from '@/types/notification';

export async function getNotifications(userId: string, page = 1, limit = 20): Promise<NotificationRecord[]> {
  const res = await fetch(`/api/notifications?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch notifications');
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed');
  return data.data.notifications || [];
}

export async function markAsRead(notificationId: string): Promise<void> {
  const res = await fetch('/api/notifications', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'MARK_READ', notificationId })
  });
  if (!res.ok) throw new Error('Failed to mark read');
}

export async function markAllAsRead(): Promise<void> {
  const res = await fetch('/api/notifications', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'MARK_ALL_READ' })
  });
  if (!res.ok) throw new Error('Failed to mark all read');
}

export async function deleteNotification(notificationId: string): Promise<void> {
  const res = await fetch('/api/notifications', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'DELETE_ONE', notificationId })
  });
  if (!res.ok) throw new Error('Failed to delete notification');
}

export async function deleteAllNotifications(): Promise<void> {
  const res = await fetch('/api/notifications', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'DELETE_ALL' })
  });
  if (!res.ok) throw new Error('Failed to delete all notifications');
}
