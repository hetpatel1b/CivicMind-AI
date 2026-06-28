import { z } from 'zod';

// ============================================================================
// COMMON SCHEMAS
// ============================================================================

export const uuidSchema = z.string().uuid('A valid UUID is required.');

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const searchSchema = z.object({
  search: z.string().trim().optional(),
});

// ============================================================================
// ISSUES
// ============================================================================

export const createIssueSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.'),
  description: z.string().trim().min(1, 'Description is required.'),
  category: z.string().trim().min(1, 'Category is required.'),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
  department: z.string().trim().optional(),
  imageUrl: z.string().url('Must be a valid URL.').optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  locationName: z.string().trim().optional(),
}).strict();

export const updateIssueSchema = z.object({
  title: z.string().trim().optional(),
  description: z.string().trim().optional(),
  category: z.string().trim().optional(),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
  department: z.string().trim().optional(),
  status: z.enum(['Reported', 'Pending', 'Verified', 'In Progress', 'Resolved', 'Rejected', 'PENDING', 'VERIFIED', 'RESOLVED', 'REJECTED']).optional(),
  locationName: z.string().trim().optional(),
}).strict();

export const getIssuesQuerySchema = paginationSchema.merge(searchSchema).extend({
  category: z.string().trim().optional(),
  severity: z.string().trim().optional(),
  status: z.string().trim().optional(),
  department: z.string().trim().optional(),
  sort: z.enum(['newest', 'oldest', 'severity', 'popularity']).default('newest'),
  verifiedOnly: z.coerce.boolean().optional(),
  resolvedOnly: z.coerce.boolean().optional(),
});

// ============================================================================
// COMMENTS
// ============================================================================

export const createCommentSchema = z.object({
  issueId: uuidSchema,
  userId: uuidSchema,
  content: z.string().trim().min(1, 'Comment content cannot be empty.').max(5000, 'Comment is too long. Maximum allowed is 5000 characters.'),
}).strict();

export const getCommentsQuerySchema = paginationSchema.extend({
  issueId: uuidSchema,
});

// ============================================================================
// MODERATION
// ============================================================================

export const moderationActionSchema = z.object({
  issueId: uuidSchema,
  adminId: uuidSchema,
  action: z.enum(['VERIFY', 'RESOLVE', 'REJECT']),
  notes: z.string().trim().optional(),
}).strict();

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export const getNotificationsQuerySchema = paginationSchema.extend({
  unreadOnly: z.coerce.boolean().optional(),
  summary: z.coerce.boolean().optional(),
});

export const patchNotificationSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('MARK_ALL_READ') }).strict(),
  z.object({ action: z.literal('MARK_READ'), notificationId: uuidSchema }).strict(),
]);

export const deleteNotificationSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('DELETE_ALL') }).strict(),
  z.object({ action: z.literal('DELETE_ONE'), notificationId: uuidSchema }).strict(),
]);

// ============================================================================
// PROFILES
// ============================================================================

export const getProfileQuerySchema = z.object({
  id: uuidSchema.optional(),
  public: z.coerce.boolean().optional(),
});

export const updateProfileSchema = z.object({
  display_name: z.string().trim().min(1, 'Display name cannot be empty.').max(100, 'Display name exceeds maximum length of 100 characters.').optional(),
  avatar_url: z.string().url('Avatar URL must be a valid http(s) URL.').optional(),
}).strict().refine(data => data.display_name !== undefined || data.avatar_url !== undefined, {
  message: 'No valid fields provided for update.'
});

// ============================================================================
// REPUTATION & BADGES (Admin Tools)
// ============================================================================

export const awardReputationSchema = z.object({
  type: z.enum(['ISSUE_REPORTED', 'ISSUE_SUPPORTED', 'COMMENT_CREATED', 'ISSUE_VERIFIED', 'ISSUE_RESOLVED']),
}).strict();

export const awardBadgeSchema = z.object({
  userId: uuidSchema,
  badgeType: z.enum(['FIRST_REPORTER', 'ACTIVE_CITIZEN', 'COMMUNITY_LEADER', 'CIVIC_CHAMPION']),
}).strict();

// ============================================================================
// AUTHENTICATION
// ============================================================================

export const authHeaderSchema = z.string().startsWith('Bearer ', 'Malformed Authorization header. Must be Bearer token.');

// ============================================================================
// HELPER FOR STANDARDIZED ZOD ERROR RESPONSES
// ============================================================================

export function formatZodError(error: z.ZodError): string {
  // Return the first intuitive error message
  const firstError = error.issues[0];
  if (firstError) {
    return firstError.message;
  }
  return 'Validation failed.';
}
