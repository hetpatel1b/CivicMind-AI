import { createClient } from '@/lib/supabase-browser';
import { NotificationRecord, NotificationType, NotificationSummary } from '@/types/notification';

/**
 * Validates if a string is a properly formatted UUID v4.
 */
function isValidUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Derives a human-readable title from the strictly typed NotificationType enum.
 * This bridges the gap between the database (which omits 'title') and the TypeScript interfaces.
 */
function getTitleForType(type: string): string {
  switch (type as NotificationType) {
    case 'ISSUE_SUPPORTED':
      return 'New Support for Your Issue';
    case 'COMMENT_RECEIVED':
      return 'New Comment';
    case 'BADGE_EARNED':
      return 'Congratulations! New Badge';
    case 'ISSUE_VERIFIED':
      return 'Issue Verified';
    case 'ISSUE_RESOLVED':
      return 'Issue Resolved';
    default:
      return 'New Notification';
  }
}

/**
 * Maps a raw database row to the strict NotificationRecord TypeScript interface.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDatabaseRow(row: any): NotificationRecord {
  return {
    id: row.id,
    userId: row.user_id,
    type: row.type as NotificationType,
    title: getTitleForType(row.type), // Derived dynamically to satisfy the UI interface
    message: row.message,
    isRead: row.is_read,
    createdAt: row.created_at
  };
}

export interface GetNotificationsOptions {
  unreadOnly?: boolean;
  page?: number;
  limit?: number;
}

/**
 * Retrieves a paginated list of notifications for the specified user.
 * 
 * @param userId The unique identifier of the user
 * @param options Pagination and filtering parameters
 * @returns Array of fully hydrated NotificationRecord objects
 */
export async function getUserNotifications(
  userId: string, 
  options?: GetNotificationsOptions
): Promise<{ notifications: NotificationRecord[], count: number }> {
  if (!userId || !isValidUUID(userId)) {
    throw new Error('Validation Error: A valid userId is required.');
  }

  const supabase = createClient();
  const page = Math.max(1, options?.page || 1);
  const limit = Math.max(1, Math.min(100, options?.limit || 20)); // Cap limit at 100
  const offset = (page - 1) * limit;

  try {
    let query = supabase
      .from('notifications')
      .select('id, user_id, type, message, is_read, created_at', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (options?.unreadOnly) {
      query = query.eq('is_read', false);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error('[Notifications Service] Database error fetching notifications:', error.message);
      throw new Error('Failed to retrieve notifications.');
    }

    return { 
      notifications: (data || []).map(mapDatabaseRow), 
      count: count || 0 
    };
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error('An unexpected system error occurred while fetching notifications.');
  }
}

/**
 * Marks a specific single notification as read.
 * 
 * @param notificationId The UUID of the notification
 * @param userId The UUID of the authenticated user to verify ownership
 */
export async function markNotificationAsRead(notificationId: string, userId: string): Promise<boolean> {
  if (!notificationId || !isValidUUID(notificationId)) throw new Error('Invalid notification ID.');
  if (!userId || !isValidUUID(userId)) throw new Error('Invalid user ID.');

  const supabase = createClient();

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', userId);

    if (error) {
      console.error('[Notifications Service] Error marking read:', error.message);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Marks all of a user's unread notifications as read.
 * 
 * @param userId The UUID of the authenticated user
 */
export async function markAllNotificationsAsRead(userId: string): Promise<boolean> {
  if (!userId || !isValidUUID(userId)) throw new Error('Invalid user ID.');

  const supabase = createClient();

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false); // Only update those that need it

    if (error) {
      console.error('[Notifications Service] Error marking all read:', error.message);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Deletes a specific single notification.
 * 
 * @param notificationId The UUID of the notification
 * @param userId The UUID of the authenticated user to verify ownership
 */
export async function deleteNotification(notificationId: string, userId: string): Promise<boolean> {
  if (!notificationId || !isValidUUID(notificationId)) throw new Error('Invalid notification ID.');
  if (!userId || !isValidUUID(userId)) throw new Error('Invalid user ID.');

  const supabase = createClient();

  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', userId);

    if (error) {
      console.error('[Notifications Service] Error deleting notification:', error.message);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Deletes all notifications for a specific user.
 * 
 * @param userId The UUID of the authenticated user
 */
export async function deleteAllNotifications(userId: string): Promise<boolean> {
  if (!userId || !isValidUUID(userId)) throw new Error('Invalid user ID.');

  const supabase = createClient();

  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('[Notifications Service] Error deleting all notifications:', error.message);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Retrieves the total count of unread and total notifications for rendering badges.
 * 
 * @param userId The UUID of the authenticated user
 */
export async function getNotificationSummary(userId: string): Promise<NotificationSummary> {
  if (!userId || !isValidUUID(userId)) throw new Error('Invalid user ID.');

  const supabase = createClient();

  try {
    // We execute two concurrent count queries. Head requests do not fetch rows.
    const [totalRes, unreadRes] = await Promise.all([
      supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('is_read', false)
    ]);

    return {
      totalNotifications: totalRes.count || 0,
      unreadCount: unreadRes.count || 0
    };
  } catch {
    return { totalNotifications: 0, unreadCount: 0 };
  }
}
