/**
 * Represents the fundamental statuses that a civic issue can have across its lifecycle.
 */
export type IssueStatus = 
  | 'PENDING'
  | 'VERIFIED'
  | 'RESOLVED'
  | 'REJECTED';

/**
 * Provides a high-level, aggregate summary of core platform metrics.
 * Designed to power the top-level metric cards in the Admin Dashboard.
 */
export interface DashboardStatistics {
  /** The total number of civic issues reported */
  totalIssues: number;
  /** The number of issues currently awaiting review */
  pendingIssues: number;
  /** The number of issues that have been confirmed but not yet resolved */
  verifiedIssues: number;
  /** The number of issues successfully completed or fixed */
  resolvedIssues: number;
  /** The number of issues marked as invalid or unactionable */
  rejectedIssues: number;
  /** The total number of registered users on the platform */
  totalUsers: number;
  /** The cumulative number of supports (upvotes) across all issues */
  totalSupports: number;
  /** The cumulative number of comments posted across all issues */
  totalComments: number;
}

/**
 * Represents analytical data grouped by issue category.
 * Useful for rendering pie charts or bar graphs detailing category distribution.
 */
export interface CategoryAnalytics {
  /** The specific issue category being measured */
  category: string;
  /** The absolute count of issues belonging to this category */
  count: number;
  /** The relative percentage this category represents against the total */
  percentage: number;
}

/**
 * Represents analytical data grouped by issue severity.
 * Useful for rendering charts or identifying high-priority areas.
 */
export interface SeverityAnalytics {
  /** The specific severity level being measured (e.g., CRITICAL, HIGH) */
  severity: string;
  /** The absolute count of issues with this severity level */
  count: number;
  /** The relative percentage this severity level represents against the total */
  percentage: number;
}

/**
 * Represents a time-series data point for daily platform activity.
 * Useful for rendering line charts or activity graphs over time.
 */
export interface DailyAnalytics {
  /** The specific date represented in ISO format (YYYY-MM-DD) */
  date: string;
  /** The number of new issues reported on this specific date */
  reports: number;
  /** The number of issues that were marked as resolved on this specific date */
  resolved: number;
}

/**
 * Represents aggregated engagement metrics for a specific user.
 * Designed for rendering leaderboards or top contributor lists.
 */
export interface UserAnalytics {
  /** The unique identifier of the user */
  userId: string;
  /** The full name of the user, if provided */
  fullName: string | null;
  /** The total number of issues reported by this user */
  reports: number;
  /** The total number of supports (upvotes) given by this user */
  supports: number;
  /** The total number of comments posted by this user */
  comments: number;
  /** The total reputation points accumulated by this user */
  reputationPoints: number;
}

/**
 * Provides a comprehensive, multi-dimensional view of the platform's analytical state.
 * Acts as the complete payload for the Admin Dashboard overview.
 */
export interface AnalyticsSummary {
  /** High-level metric aggregates */
  dashboard: DashboardStatistics;
  /** Detailed breakdown of issues by category */
  categories: CategoryAnalytics[];
  /** Detailed breakdown of issues by severity */
  severity: SeverityAnalytics[];
  /** Time-series data reflecting daily activity trends */
  daily: DailyAnalytics[];
  /** A ranked list of the most active or impactful users */
  topUsers: UserAnalytics[];
}
