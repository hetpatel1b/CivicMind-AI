/**
 * Represents the specific categories of gamification badges a user can earn.
 */
export type BadgeType =
  | 'FIRST_REPORTER'
  | 'ACTIVE_CITIZEN'
  | 'COMMUNITY_LEADER'
  | 'CIVIC_CHAMPION';

/**
 * Defines the metadata and visual representation of a gamification badge.
 * Typically used as a lookup dictionary or configuration object in the platform.
 */
export interface Badge {
  /** The unique identifier for the badge definition */
  id: string;
  /** The specific category of the badge */
  type: BadgeType;
  /** The human-readable title of the badge */
  name: string;
  /** A brief explanation of how the badge is earned or what it signifies */
  description: string;
  /** An identifier (e.g., an emoji, a Lucide icon name, or image URL) representing the badge */
  icon: string;
}

/**
 * Represents a historical record of a badge being awarded to a specific user.
 * Maps directly to the `user_badges` table in the database schema.
 */
export interface UserBadge {
  /** The unique identifier of the award record */
  id: string;
  /** The unique identifier of the user who earned the badge */
  userId: string;
  /** The specific category of badge that was awarded */
  badgeType: BadgeType;
  /** The ISO 8601 timestamp representing exactly when the badge was earned */
  awardedAt: string;
}

/**
 * Defines the structural criteria required to unlock a specific badge.
 * Currently, badges are awarded based on cumulative reputation point thresholds.
 */
export interface BadgeRequirement {
  /** The category of badge being evaluated */
  badgeType: BadgeType;
  /** The minimum cumulative reputation points required to unlock this badge */
  minimumPoints: number;
}

/**
 * Provides a summarized view of a user's achieved badges.
 * Designed for rendering public profiles or gamification dashboards.
 */
export interface BadgeSummary {
  /** The total count of unique badges the user has earned */
  totalBadges: number;
  /** The detailed array of fully populated Badge objects the user possesses */
  badges: Badge[];
}
