/**
 * Represents the distinct administrative actions that can be taken on a civic issue.
 */
export type ModerationAction = 
  | 'VERIFY'
  | 'RESOLVE'
  | 'REJECT';

/**
 * Represents the current moderation lifecycle state of a civic issue.
 */
export type ModerationStatus = 
  | 'PENDING'
  | 'VERIFIED'
  | 'RESOLVED'
  | 'REJECTED';

/**
 * Represents a single audit log entry documenting an administrative action 
 * performed on an issue, mapping directly to the database schema.
 */
export interface ModerationRecord {
  /** The unique identifier of the moderation log entry */
  id: string;
  /** The unique identifier of the issue being moderated */
  issueId: string;
  /** The unique identifier of the administrator who performed the action */
  adminId: string;
  /** The specific administrative action taken */
  action: ModerationAction;
  /** The resulting status of the issue after the action was applied */
  status: ModerationStatus;
  /** Optional context or reasoning provided by the administrator */
  notes: string | null;
  /** The ISO 8601 timestamp representing when the action occurred */
  createdAt: string;
}

/**
 * Provides a lightweight, high-level summary of an issue for moderation queues
 * or administrative list views, minimizing payload size.
 */
export interface IssueModeration {
  /** The unique identifier of the issue */
  issueId: string;
  /** The human-readable title of the issue */
  title: string;
  /** The category classification of the issue */
  category: string;
  /** The assigned severity level of the issue */
  severity: string;
  /** The current moderation lifecycle state */
  status: ModerationStatus;
  /** The ISO 8601 timestamp representing when the issue was originally reported */
  reportedAt: string;
}

/**
 * Aggregates the complete chronological audit trail of administrative actions
 * performed on a specific civic issue.
 */
export interface ModerationHistory {
  /** The unique identifier of the issue */
  issueId: string;
  /** The chronological list of moderation actions taken */
  records: ModerationRecord[];
}

/**
 * Provides a high-level statistical overview of the current moderation queue workload.
 * Useful for rendering administrative metric cards or health indicators.
 */
export interface ModerationSummary {
  /** The number of issues currently awaiting initial review */
  pending: number;
  /** The number of issues confirmed but not yet resolved */
  verified: number;
  /** The number of issues successfully resolved or closed */
  resolved: number;
  /** The number of issues marked as invalid or rejected */
  rejected: number;
}
