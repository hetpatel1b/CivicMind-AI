import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a Supabase client configured for the browser.
 * This client safely accesses public environment variables and 
 * handles browser cookie parsing automatically.
 */
export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Supabase public environment variables are not set.');
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
