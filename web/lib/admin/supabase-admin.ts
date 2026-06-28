import { createServerClient } from '@supabase/ssr';

/**
 * Creates an Admin Supabase client using the Service Role Key.
 * DANGER: This client bypasses all Row Level Security (RLS) policies.
 * Use strictly for trusted backend operations (e.g., webhook processing, inserting analytics).
 */
export async function createAdminClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase Service Role Key or URL is not set.');
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
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
