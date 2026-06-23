import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

/**
 * A highly reusable guard utility for Next.js Server Components.
 * Fetches the user session and immediately redirects to login if invalid.
 * 
 * @returns The authenticated Supabase User object.
 */
export async function requireUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return user;
}

/**
 * Validates the user exists without throwing a redirect.
 * Useful for API routes or Server Actions that return JSON errors.
 */
export async function getUserOrNull() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
