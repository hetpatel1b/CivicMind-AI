/**
 * Represents the distinct types of events that can positively or negatively affect a user's reputation.
 */
export type ReputationEventType =
  | 'ISSUE_REPORTED'
  | 'ISSUE_SUPPORTED'
  | 'COMMENT_CREATED'
  | 'ISSUE_VERIFIED'
  | 'ISSUE_RESOLVED';

/**
 * Represents a discrete, logged instance of a user earning (or losing) reputation points.
 * Maps directly to the `reputation_events` table in the database schema.
 */
export interface ReputationEvent {
  /** The unique identifier of the reputation event */
  id: string;
  /** The unique identifier of the user who triggered the event */
  userId: string;
  /** The specific category of action that resulted in the point change */
  type: ReputationEventType;
  /** The numeric value of the points awarded (or deducted) */
  points: number;
  /** The ISO 8601 timestamp representing when the event occurred */
  createdAt: string;
}

/**
 * Represents the aggregate gamification state for a specific user.
 */
export interface ReputationProfile {
  /** The unique identifier of the user */
  userId: string;
  /** The cumulative sum of all reputation points earned by the user */
  totalPoints: number;
  /** The calculated tier or rank achieved by the user based on their total points */
  level: string;
}

/**
 * Defines a structural mapping between an action type and its corresponding point value.
 * Used for centralizing and managing the platform's point economy.
 */
export interface ReputationActionReward {
  /** The category of action being rewarded */
  type: ReputationEventType;
  /** The fixed point value assigned to this specific action type */
  points: number;
}

/**
 * Provides a comprehensive snapshot of a user's overall engagement metrics and reputation.
 * Useful for rendering dashboards or detailed profile cards.
 */
export interface ReputationSummary {
  /** The user's cumulative reputation score */
  totalPoints: number;
  /** The total number of unique civic issues reported by the user */
  totalReports: number;
  /** The total number of civic issues supported (upvoted) by the user */
  totalSupports: number;
  /** The total number of comments posted by the user across all issues */
  totalComments: number;
}
