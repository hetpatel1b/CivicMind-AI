-- =========================================
-- MIGRATION: SERVICE COMPATIBILITY FIXES
-- Bridges the gap between TypeScript service payloads and strict schema definitions
-- =========================================

-- 1. FIX ISSUES SERVICE COMPATIBILITY
-- The web/services/issues.ts file forces the insertion of 'department' and 'created_by'.
-- We add these columns to prevent 500 Server Errors during issue creation.
ALTER TABLE public.issues ADD COLUMN department TEXT;
ALTER TABLE public.issues ADD COLUMN created_by UUID;

-- Since `user_id` is legally required (NOT NULL) for analytics and referential integrity,
-- we use a trigger to dynamically map the incoming `created_by` payload to `user_id` 
-- BEFORE the NOT NULL constraint is evaluated.
CREATE OR REPLACE FUNCTION sync_issue_user_id() RETURNS trigger AS $$
BEGIN
  IF NEW.created_by IS NOT NULL THEN
    NEW.user_id := NEW.created_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER issues_sync_user_id_trigger
BEFORE INSERT ON public.issues
FOR EACH ROW EXECUTE FUNCTION sync_issue_user_id();


-- 2. FIX GAMIFICATION GAMIFICATION SERVICE COMPATIBILITY
-- The web/services/badges.ts file natively uses 'badge_type' instead of 'badge_id',
-- and expects an 'awarded_at' timestamp rather than 'earned_at'.
ALTER TABLE public.user_badges ADD COLUMN badge_type TEXT;
ALTER TABLE public.user_badges ADD COLUMN awarded_at TIMESTAMPTZ DEFAULT NOW();

-- Because badges.ts does not provide 'badge_id', the insert would fail. 
-- We must drop the NOT NULL constraint on badge_id to allow successful execution.
ALTER TABLE public.user_badges ALTER COLUMN badge_id DROP NOT NULL;

-- Finally, we enforce gamification integrity by ensuring a user cannot hold 
-- duplicate instances of the same badge_type.
ALTER TABLE public.user_badges ADD CONSTRAINT user_badges_user_id_badge_type_key UNIQUE (user_id, badge_type);
