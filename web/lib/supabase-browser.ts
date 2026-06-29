import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a Supabase client configured for the browser.
 * This client safely accesses public environment variables and 
 * handles browser cookie parsing automatically.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  return createBrowserClient(url, key);
}
