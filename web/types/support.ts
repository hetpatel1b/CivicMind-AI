/**
 * Represents a single instance of a user supporting (upvoting) a civic issue.
 * Maps directly to the `supports` table in the database schema.
 */
export interface SupportRecord {
  /** The unique identifier for this support record. */
  id: string;
  /** The unique identifier of the issue being supported. */
  issueId: string;
  /** The unique identifier of the user who cast the support. */
  userId: string;
  /** The ISO 8601 timestamp representing when the support was cast. */
  createdAt: string;
}

/**
 * Represents the aggregate count of support for a specific civic issue.
 * Useful for lightweight operations where only the total count is needed.
 */
export interface SupportCount {
  /** The unique identifier of the issue. */
  issueId: string;
  /** The total number of users who have supported this issue. */
  totalSupports: number;
}

/**
 * Represents the comprehensive support status for an issue relative to the current authenticated user.
 * Combines the aggregate count with the user's personal interaction state.
 */
export interface SupportStatus {
  /** The unique identifier of the issue. */
  issueId: string;
  /** Indicates whether the currently authenticated user has already supported this issue. */
  userHasSupported: boolean;
  /** The total number of users who have supported this issue. */
  totalSupports: number;
}

/**
 * The structured response returned by the API or service layer when a user toggles their support state.
 * Allows the frontend to cleanly manage optimistic updates.
 */
export interface ToggleSupportResponse {
  /** Indicates if the toggle operation (adding/removing support) was successfully committed to the database. */
  success: boolean;
  /** The newly calculated total support count for the issue after the toggle operation. */
  totalSupports: number;
  /** The new state of the user's support for the issue after the toggle operation. */
  userHasSupported: boolean;
}
