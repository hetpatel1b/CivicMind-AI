/**
 * Represents a single raw comment record directly mapping to the database schema.
 */
export interface CommentRecord {
  /** The unique identifier of the comment */
  id: string;
  /** The unique identifier of the civic issue the comment belongs to */
  issueId: string;
  /** The unique identifier of the user who authored the comment */
  userId: string;
  /** The textual content of the comment */
  content: string;
  /** The ISO 8601 timestamp representing when the comment was created */
  createdAt: string;
}

/**
 * Represents the summarized public profile of a comment's author.
 */
export interface CommentAuthor {
  /** The unique identifier of the author */
  id: string;
  /** The full name of the author, if available */
  fullName: string | null;
  /** The URL pointing to the author's avatar image, if available */
  avatarUrl: string | null;
}

/**
 * Represents a fully hydrated comment ready for UI consumption.
 * Includes the raw comment data securely joined with public author details.
 */
export interface IssueComment {
  /** The unique identifier of the comment */
  id: string;
  /** The unique identifier of the civic issue the comment belongs to */
  issueId: string;
  /** The textual content of the comment */
  content: string;
  /** The ISO 8601 timestamp representing when the comment was created */
  createdAt: string;
  /** The summarized profile of the comment's author */
  author: CommentAuthor;
}

/**
 * Represents the required payload for creating a new comment.
 */
export interface CreateCommentInput {
  /** The unique identifier of the civic issue being commented on */
  issueId: string;
  /** The unique identifier of the user creating the comment */
  userId: string;
  /** The textual content of the comment to be created */
  content: string;
}

/**
 * The structured response returned by the API or service layer when a comment is created.
 */
export interface CreateCommentResponse {
  /** Indicates whether the comment was successfully created and saved */
  success: boolean;
  /** The newly created, fully hydrated comment object, if successful */
  comment?: IssueComment;
  /** A human-readable error message, if the creation failed */
  error?: string;
}
