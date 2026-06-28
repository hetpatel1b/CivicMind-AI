-- Migration: Add Assignment fields to Issues
-- Adds officer, priority, and assigned_at

ALTER TABLE public.issues
ADD COLUMN officer TEXT,
ADD COLUMN priority TEXT,
ADD COLUMN assigned_at TIMESTAMPTZ;

-- Notify Supabase PostgREST schema cache to reload
NOTIFY pgrst, 'reload schema';
