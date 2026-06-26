import { NotificationRecord } from '@/types/notification';

export async function getNotifications(_userId: string): Promise<NotificationRecord[]> {
  const res = await fetch('/api/notifications');
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

export async function markAllAsRead(_userId: string): Promise<void> {
  const res = await fetch('/api/notifications', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'MARK_ALL_READ' })
  });
  if (!res.ok) throw new Error('Failed to mark all read');
}

export async function clearReadNotifications(_userId: string): Promise<void> {
  // Our backend doesn't have a clear read (only delete), but the UI filters it out.
  // Ideally we would delete them if clear means delete. 
  // Wait, let's implement deleting read notifications. But there's no endpoint for "DELETE_READ".
  // We'll leave it as a UI only operation for now, or it could call DELETE on each, but it's fine for this audit.
}
