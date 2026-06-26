-- =========================================
-- MIGRATION: ROW LEVEL SECURITY COMPLETION
-- Grants required Admin & User permissions
-- =========================================

-- 1. SECURE ADMIN HELPER FUNCTION
-- Used in RLS policies to evaluate if the authenticated user holds the 'admin' role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 2. ADMIN MODERATION POLICIES (public schemas)
-- Grants administrators the ability to moderate (update/delete) issues, images, and comments

CREATE POLICY "Admins can update any issue." 
ON public.issues FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admins can delete any issue." 
ON public.issues FOR DELETE 
USING (public.is_admin());

CREATE POLICY "Admins can delete any comment." 
ON public.comments FOR DELETE 
USING (public.is_admin());

CREATE POLICY "Admins can delete any issue image." 
ON public.issue_images FOR DELETE 
USING (public.is_admin());


-- 3. USER MANAGEMENT POLICIES
-- Allow users to delete their own uploaded issue images (requires joining with issues to verify ownership)
CREATE POLICY "Users can delete own issue images." 
ON public.issue_images FOR DELETE 
USING (
  auth.uid() IN (
    SELECT user_id FROM public.issues WHERE id = issue_id
  )
);


-- 4. SUPABASE STORAGE POLICIES
-- Complete the storage permissions allowing Users and Admins to delete files from the bucket

CREATE POLICY "Users can delete own storage images." 
ON storage.objects FOR DELETE 
USING (bucket_id = 'civic-images' AND auth.uid() = owner);

CREATE POLICY "Admins can delete any storage image." 
ON storage.objects FOR DELETE 
USING (bucket_id = 'civic-images' AND public.is_admin());
