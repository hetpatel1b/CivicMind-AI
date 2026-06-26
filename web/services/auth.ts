import { createClient } from '@/lib/supabase-server';
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'citizen' | 'guest';

export interface AuthContext {
  user: User | null;
  session: Session | null;
  role: UserRole;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

/**
 * Retrieves the raw authenticated user from the current session.
 * Utilizes the deeply verified `getUser()` method for strict security.
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  const supabase = await createClient();
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch {
    return null;
  }
}

/**
 * Retrieves the current authentication session.
 */
export async function getCurrentSession(): Promise<Session | null> {
  const supabase = await createClient();
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;
    return session;
  } catch {
    return null;
  }
}

/**
 * Retrieves the application-specific role for a given user UUID.
 * Queries the `public.users` table where RBAC is strictly defined.
 * 
 * @param userId The UUID of the authenticated user
 */
export async function getUserRole(userId: string): Promise<UserRole> {
  if (!userId) return 'guest';

  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error || !data?.role) return 'citizen'; // Default fallback per schema

    return (data.role.toLowerCase() === 'admin') ? 'admin' : 'citizen';
  } catch {
    return 'citizen';
  }
}

/**
 * Verifies if the current request has a valid, unexpired authentication session.
 */
export async function verifyAuthentication(): Promise<boolean> {
  const user = await getAuthenticatedUser();
  return user !== null;
}

/**
 * Verifies if the currently authenticated user holds Administrator privileges.
 */
export async function verifyAdministratorRole(): Promise<boolean> {
  const user = await getAuthenticatedUser();
  if (!user) return false;

  const role = await getUserRole(user.id);
  return role === 'admin';
}

/**
 * Verifies if the currently authenticated user is a standard Citizen.
 */
export async function verifyCitizenRole(): Promise<boolean> {
  const user = await getAuthenticatedUser();
  if (!user) return false;

  const role = await getUserRole(user.id);
  return role === 'citizen' || role === 'admin'; // Admins typically inherit citizen rights
}

/**
 * Compiles a complete authentication and authorization context for the current request.
 * Useful for resolving permissions efficiently in a single payload.
 */
export async function getAuthContext(): Promise<AuthContext> {
  const [user, session] = await Promise.all([
    getAuthenticatedUser(),
    getCurrentSession()
  ]);

  const isAuthenticated = user !== null;
  const role = user ? await getUserRole(user.id) : 'guest';
  const isAdmin = role === 'admin';

  return {
    user,
    session,
    role,
    isAuthenticated,
    isAdmin
  };
}

/**
 * Evaluates whether the current user has permission to perform sensitive actions.
 * 
 * @param requiredRole The minimum role required ('admin' or 'citizen')
 * @returns boolean indicating if the action is authorized
 */
export async function hasPermission(requiredRole: UserRole): Promise<boolean> {
  const ctx = await getAuthContext();
  
  if (!ctx.isAuthenticated) return false;
  if (requiredRole === 'admin' && !ctx.isAdmin) return false;
  
  return true;
}
