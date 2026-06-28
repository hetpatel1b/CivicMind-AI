/**
 * Represents the specific categories of notifications a user can receive.
 */
export type NotificationType =
  | 'ISSUE_SUPPORTED'
  | 'COMMENT_RECEIVED'
  | 'BADGE_EARNED'
  | 'ISSUE_VERIFIED'
  | 'ISSUE_ASSIGNED'
  | 'ISSUE_REJECTED'
  | 'ISSUE_RESOLVED';

/**
 * Represents a single raw notification record directly mapping to the database schema.
 */
export interface NotificationRecord {
  /** The unique identifier of the notification */
  id: string;
  /** The unique identifier of the user who is receiving the notification */
  userId: string;
  /** The category or type of the notification */
  type: NotificationType;
  /** The brief, human-readable title of the notification */
  title: string;
  /** The detailed textual content or explanation of the notification */
  message: string;
  /** Indicates whether the user has viewed or acknowledged this notification */
  isRead: boolean;
  /** The ISO 8601 timestamp representing when the notification was generated */
  createdAt: string;
}

/**
 * Represents the required payload structure for programmatically generating a new notification.
 */
export interface CreateNotificationInput {
  /** The unique identifier of the user who will receive the notification */
  userId: string;
  /** The category or type of the notification being sent */
  type: NotificationType;
  /** The brief, human-readable title of the notification */
  title: string;
  /** The detailed textual content or explanation of the notification */
  message: string;
}

/**
 * Provides an aggregated, high-level overview of a user's current notification state.
 * Designed for rendering notification badges or inbox headers efficiently.
 */
export interface NotificationSummary {
  /** The absolute total number of notifications the user has (both read and unread) */
  totalNotifications: number;
  /** The count of notifications that the user has not yet viewed or acknowledged */
  unreadCount: number;
}
