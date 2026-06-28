import { createAdminClient } from '@/lib/admin/supabase-admin';
import { NotificationType } from '@/types/notification';

export async function createNotification(
  userId: string,
  type: NotificationType,
  message: string
): Promise<boolean> {
  if (!userId) return false;

  const supabase = await createAdminClient();

  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: type,
        message: message,
        is_read: false
      });

    if (error) {
      console.error('[Notification Service] Database insertion error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Notification Service] Unexpected error:', err);
    return false;
  }
}
