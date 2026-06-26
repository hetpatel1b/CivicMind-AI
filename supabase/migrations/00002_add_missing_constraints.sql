-- =========================================
-- MIGRATION: ADD MISSING CONSTRAINTS
-- Enforces NOT NULL on FKs, fixes defaults, and adds CHECK constraints
-- =========================================

-- 1. ADD NOT NULL TO EXISTING FOREIGN KEYS
ALTER TABLE public.issues ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.issue_images ALTER COLUMN issue_id SET NOT NULL;
ALTER TABLE public.verifications ALTER COLUMN issue_id SET NOT NULL;
ALTER TABLE public.verifications ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.comments ALTER COLUMN issue_id SET NOT NULL;
ALTER TABLE public.comments ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.notifications ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.user_badges ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.user_badges ALTER COLUMN badge_id SET NOT NULL;
-- (verifications.verification_type technically is not a FK, but making it NOT NULL)
ALTER TABLE public.verifications ALTER COLUMN verification_type SET NOT NULL;

-- 2. ADD NOT NULL TO EXISTING TIMESTAMPS
ALTER TABLE public.users ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.issues ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.issues ALTER COLUMN updated_at SET NOT NULL;
ALTER TABLE public.issue_images ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.verifications ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.comments ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.notifications ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.badges ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.user_badges ALTER COLUMN earned_at SET NOT NULL;
ALTER TABLE public.analytics_events ALTER COLUMN created_at SET NOT NULL;

-- 3. FIX INCORRECT DEFAULT CONSTRAINTS
-- Schema previously defaulted to 'Reported', but the moderation service strictly expects 'PENDING'
ALTER TABLE public.issues ALTER COLUMN status SET DEFAULT 'PENDING';

-- 4. ADD STRICT CHECK CONSTRAINTS
-- Ensure issue status precisely aligns with the ModerationStatus type
ALTER TABLE public.issues ADD CONSTRAINT issues_status_check 
CHECK (status IN ('PENDING', 'VERIFIED', 'RESOLVED', 'REJECTED', 'Reported'));

-- Ensure notification types strictly align with the NotificationType type
ALTER TABLE public.notifications ADD CONSTRAINT notifications_type_check 
CHECK (type IN ('ISSUE_SUPPORTED', 'COMMENT_RECEIVED', 'BADGE_EARNED', 'ISSUE_VERIFIED', 'ISSUE_RESOLVED'));
