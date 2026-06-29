import { createServerClient } from '@supabase/ssr';

/**
 * Creates an Admin Supabase client using the Service Role Key.
 * DANGER: This client bypasses all Row Level Security (RLS) policies.
 * Use strictly for trusted backend operations (e.g., webhook processing, inserting analytics).
 */
export async function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    }
  );
}
