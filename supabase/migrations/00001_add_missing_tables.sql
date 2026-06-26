-- =========================================
-- MIGRATION: ADD MISSING TABLES
-- Supports, Reputation Events, Moderation History
-- =========================================

-- =========================================
-- 1. SUPPORTS TABLE
-- =========================================
CREATE TABLE public.supports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(issue_id, user_id)
);

CREATE INDEX idx_supports_issue ON public.supports(issue_id);

ALTER TABLE public.supports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Supports are viewable by everyone." 
ON public.supports FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert supports." 
ON public.supports FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own supports." 
ON public.supports FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Supports cannot be updated." 
ON public.supports FOR UPDATE USING (false);


-- =========================================
-- 2. REPUTATION EVENTS TABLE
-- =========================================
CREATE TABLE public.reputation_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('ISSUE_REPORTED', 'ISSUE_SUPPORTED', 'COMMENT_CREATED', 'ISSUE_VERIFIED', 'ISSUE_RESOLVED')),
    points INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reputation_events_user ON public.reputation_events(user_id);

ALTER TABLE public.reputation_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reputation events are viewable by everyone." 
ON public.reputation_events FOR SELECT USING (true);

CREATE POLICY "Authenticated users can log reputation events." 
ON public.reputation_events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Reputation events cannot be updated." 
ON public.reputation_events FOR UPDATE USING (false);

CREATE POLICY "Reputation events cannot be deleted." 
ON public.reputation_events FOR DELETE USING (false);


-- =========================================
-- 3. MODERATION HISTORY TABLE
-- =========================================
CREATE TABLE public.moderation_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL CHECK (action IN ('VERIFY', 'RESOLVE', 'REJECT')),
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'VERIFIED', 'RESOLVED', 'REJECTED')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_moderation_history_issue ON public.moderation_history(issue_id);

ALTER TABLE public.moderation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Moderation history is viewable by everyone." 
ON public.moderation_history FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert moderation history." 
ON public.moderation_history FOR INSERT WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Moderation history cannot be updated." 
ON public.moderation_history FOR UPDATE USING (false);

CREATE POLICY "Moderation history cannot be deleted." 
ON public.moderation_history FOR DELETE USING (false);
