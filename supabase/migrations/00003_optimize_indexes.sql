-- =========================================
-- MIGRATION: DATABASE INDEX OPTIMIZATION
-- Targets missing index paths for specific service queries
-- =========================================

-- 1. PRIMARY/FOREIGN KEY TARGET INDEXES
-- Optimizes the `getTopUsers()` query in analytics.ts (`ORDER BY reputation_points DESC`)
CREATE INDEX IF NOT EXISTS idx_users_reputation ON public.users(reputation_points DESC);

-- Optimizes `.in('user_id', ...)` filters heavily used in analytics.ts for top users
CREATE INDEX IF NOT EXISTS idx_issues_user ON public.issues(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON public.comments(user_id);

-- Optimizes `getSeverityAnalytics()` query in analytics.ts filtering/grouping by severity
CREATE INDEX IF NOT EXISTS idx_issues_severity ON public.issues(severity);

-- 2. COMPOSITE SEARCH INDEXES
-- Optimizes counting verifications specifically where `verification_type = 'UPVOTE'` for a user
CREATE INDEX IF NOT EXISTS idx_verifications_user_type ON public.verifications(user_id, verification_type);

-- Optimizes `getPendingIssues()` in moderation.ts (`.eq('status', 'PENDING').order('created_at', { ascending: false })`)
CREATE INDEX IF NOT EXISTS idx_issues_status_created ON public.issues(status, created_at DESC);

-- Optimizes `getIssueComments()` in comments.ts (`.eq('issue_id', issueId).order('created_at', { ascending: false })`)
CREATE INDEX IF NOT EXISTS idx_comments_issue_created ON public.comments(issue_id, created_at DESC);

-- Optimizes `getDailyAnalytics()` in analytics.ts which scans chronological issue creation events
CREATE INDEX IF NOT EXISTS idx_issues_created_at ON public.issues(created_at DESC);
