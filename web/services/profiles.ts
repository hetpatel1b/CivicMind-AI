import { createClient } from '@/lib/supabase-browser';
import { getReputationProfile } from '@/services/reputation';
import { getBadgeSummary } from '@/services/badges';

/**
 * Core interface mapping to the public.users database schema.
 */
export interface UserProfile {
  id: string;
  fullName: string | null;
  avatarUrl: string | null;
  reputationPoints: number;
  role: string;
  createdAt: string;
}

/**
 * Represents the safely exposed version of a user's profile for public consumption.
 */
export interface PublicProfile {
  id: string;
  fullName: string | null;
  avatarUrl: string | null;
  reputationPoints: number;
  role: string;
  createdAt: string;
}

export interface ProfileUpdateInput {
  fullName?: string;
  avatarUrl?: string;
}

/**
 * Validates if a string is a properly formatted UUID v4.
 */
function isValidUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDatabaseRow(row: any): UserProfile {
  return {
    id: row.id,
    fullName: row.full_name,
    avatarUrl: row.avatar_url,
    reputationPoints: row.reputation_points,
    role: row.role,
    createdAt: row.created_at
  };
}

/**
 * Retrieves the full profile for the authenticated user.
 * 
 * @param userId The UUID of the user
 */
export async function getProfile(userId: string): Promise<UserProfile | null> {
  if (!userId || !isValidUUID(userId)) throw new Error('Validation Error: A valid userId is required.');

  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('[Profiles Service] Database error fetching profile:', error.message);
    throw new Error('Failed to retrieve profile.');
  }

  return mapDatabaseRow(data);
}

/**
 * Retrieves a sanitized, public-facing profile for a given user ID.
 * 
 * @param userId The UUID of the requested user
 */
export async function getPublicProfile(userId: string): Promise<PublicProfile | null> {
  if (!userId || !isValidUUID(userId)) throw new Error('Validation Error: A valid userId is required.');

  const supabase = createClient();
  // We strictly select only safe fields, though RLS could also govern this.
  const { data, error } = await supabase
    .from('users')
    .select('id, full_name, avatar_url, reputation_points, role, created_at')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('[Profiles Service] Database error fetching public profile:', error.message);
    throw new Error('Failed to retrieve public profile.');
  }

  return {
    id: data.id,
    fullName: data.full_name,
    avatarUrl: data.avatar_url,
    reputationPoints: data.reputation_points,
    role: data.role,
    createdAt: data.created_at
  };
}

/**
 * Safely updates a user's profile information.
 * Enforces strict filtering to ensure protected fields (like role, points) cannot be modified.
 * 
 * @param userId The UUID of the authenticated user
 * @param updates The strictly typed update payload
 */
export async function updateProfile(userId: string, updates: ProfileUpdateInput): Promise<boolean> {
  if (!userId || !isValidUUID(userId)) throw new Error('Validation Error: A valid userId is required.');

  const supabase = createClient();

  // 1. Build the update payload dynamically to only include provided fields
  // Using explicit mapping prevents prototype pollution and unintended field updates
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: any = {};
  
  if (updates.fullName !== undefined) {
    // Basic validation
    if (updates.fullName.length > 100) throw new Error('Full name cannot exceed 100 characters.');
    payload.full_name = updates.fullName.trim();
  }
  
  if (updates.avatarUrl !== undefined) {
    if (updates.avatarUrl && !updates.avatarUrl.startsWith('http')) {
      throw new Error('Avatar URL must be a valid fully qualified URL.');
    }
    payload.avatar_url = updates.avatarUrl ? updates.avatarUrl.trim() : null;
  }

  if (Object.keys(payload).length === 0) {
    return true; // Nothing to update
  }

  // 2. Perform the update securely
  // The 'users' table has RLS enforcing `auth.uid() = id` for UPDATE operations
  try {
    const { error } = await supabase
      .from('users')
      .update(payload)
      .eq('id', userId);

    if (error) {
      console.error('[Profiles Service] Database error updating profile:', error.message);
      return false;
    }

    return true;
  } catch (err: unknown) {
    console.error('[Profiles Service] Unexpected exception updating profile:', err);
    return false;
  }
}

/**
 * Aggregates all comprehensive profile statistics (Gamification + Badges).
 * 
 * @param userId The UUID of the requested user
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getProfileStatistics(userId: string): Promise<any> {
  if (!userId || !isValidUUID(userId)) throw new Error('Validation Error: A valid userId is required.');
  
  try {
    // Concurrently fetch reputation and badges using the existing verified services
    const [reputation, badges] = await Promise.all([
      getReputationProfile(userId).catch(() => null),
      getBadgeSummary(userId).catch(() => null)
    ]);

    return {
      reputation,
      badges
    };
  } catch (err: unknown) {
    console.error('[Profiles Service] Error fetching profile statistics:', err);
    throw new Error('Failed to retrieve profile statistics.');
  }
}
