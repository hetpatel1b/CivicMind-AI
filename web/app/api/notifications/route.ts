import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  deleteNotification, 
  deleteAllNotifications,
  getNotificationSummary
} from '@/services/notifications';
import { getNotificationsQuerySchema, patchNotificationSchema, deleteNotificationSchema, formatZodError } from '@/lib/validations';
import { logger } from '@/lib/logger';

/**
 * GET handler to retrieve the authenticated user's notifications.
 * Supports pagination and an 'unreadOnly' filter via query parameters.
 * 
 * Query Parameters:
 * ?page=1
 * ?limit=20
 * ?unreadOnly=true
 * ?summary=true (Optional, fetches the count summary instead of the list)
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the notifications payload
 */
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate Request
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to view notifications.' },
        { status: 401 }
      );
    }

    // 2. Parse and validate query parameters using Zod
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validationResult = getNotificationsQuerySchema.safeParse(queryParams);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    const { page, limit, unreadOnly, summary } = validationResult.data;

    // 3. Handle Summary Request
    if (summary) {
      const summaryData = await getNotificationSummary(user.id);
      return NextResponse.json({
        success: true,
        message: 'Notification summary retrieved successfully.',
        data: summaryData
      });
    }

    // 5. Delegate to service layer
    const result = await getUserNotifications(user.id, { page, limit, unreadOnly });

    return NextResponse.json({
      success: true,
      message: 'Notifications retrieved successfully.',
      data: {
        pagination: {
          page,
          limit,
          unreadOnly,
          total: result.count
        },
        notifications: result.notifications
      }
    });
    
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[Notifications API GET] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while retrieving notifications.' 
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH handler to mark notifications as read.
 * 
 * Expected JSON payload:
 * {
 *   "action": "MARK_READ" | "MARK_ALL_READ",
 *   "notificationId": "string" (Required if action is MARK_READ)
 * }
 */
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate Request
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to modify notifications.' },
        { status: 401 }
      );
    }

    // 2. Defensively parse payload
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    const validationResult = patchNotificationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    // 3. Delegate to service based on action
    if (validationResult.data.action === 'MARK_ALL_READ') {
      const success = await markAllNotificationsAsRead(user.id);
      if (!success) throw new Error('Service returned failure for mark all read.');
      
      return NextResponse.json({ success: true, message: 'All notifications marked as read.' });
    } 
    
    if (validationResult.data.action === 'MARK_READ') {
      const success = await markNotificationAsRead(validationResult.data.notificationId, user.id);
      if (!success) {
        // Assume failure means it doesn't exist or isn't owned by the user
        return NextResponse.json(
          { success: false, error: 'Not Found', message: 'Notification not found or access denied.' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, message: 'Notification marked as read.' });
    }
    
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[Notifications API PATCH] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while updating notifications.' 
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler to remove notifications.
 * 
 * Expected JSON payload:
 * {
 *   "action": "DELETE_ONE" | "DELETE_ALL",
 *   "notificationId": "string" (Required if action is DELETE_ONE)
 * }
 */
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate Request
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to delete notifications.' },
        { status: 401 }
      );
    }

    // 2. Defensively parse payload
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    const validationResult = deleteNotificationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    // 3. Delegate to service based on action
    if (validationResult.data.action === 'DELETE_ALL') {
      const success = await deleteAllNotifications(user.id);
      if (!success) throw new Error('Service returned failure for delete all.');
      
      return NextResponse.json({ success: true, message: 'All notifications deleted successfully.' });
    } 
    
    if (validationResult.data.action === 'DELETE_ONE') {
      const success = await deleteNotification(validationResult.data.notificationId, user.id);
      if (!success) {
        return NextResponse.json(
          { success: false, error: 'Not Found', message: 'Notification not found or access denied.' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, message: 'Notification deleted successfully.' });
    }
    
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[Notifications API DELETE] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while deleting notifications.' 
      },
      { status: 500 }
    );
  }
}
