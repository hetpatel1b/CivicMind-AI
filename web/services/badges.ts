import { createClient } from '@/lib/supabase-browser';
import { SupabaseClient } from '@supabase/supabase-js';
import { 
  BadgeType, 
  Badge, 
  UserBadge, 
  BadgeSummary
} from '@/types/badge';
import { ReputationProfile } from '@/types/reputation';

// Define the central authority for badge thresholds based on total reputation points
const REQUIREMENTS: Record<BadgeType, number> = {
  FIRST_REPORTER: 10,
  ACTIVE_CITIZEN: 50,
  COMMUNITY_LEADER: 150,
  CIVIC_CHAMPION: 300,
};

/**
 * Validates if a string is a properly formatted UUID v4.
 */
function isValidUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Retrieves the static, global definitions for all available badges in the platform.
 * Used for rendering badge galleries or lookup dictionaries.
 * 
 * @returns An array of fully defined Badge metadata objects
 */
export function getBadgeDefinitions(): Badge[] {
  return [
    {
      id: 'badge_first_reporter',
      type: 'FIRST_REPORTER',
      name: 'First Reporter',
      description: 'Awarded for taking the first step and reporting a civic issue.',
      icon: 'Megaphone', // Assuming Lucide icon name mapping
    },
    {
      id: 'badge_active_citizen',
      type: 'ACTIVE_CITIZEN',
      name: 'Active Citizen',
      description: 'Consistently engaging with the community and supporting local improvements.',
      icon: 'Activity',
    },
    {
      id: 'badge_community_leader',
      type: 'COMMUNITY_LEADER',
      name: 'Community Leader',
      description: 'A trusted voice whose reports and verifications drive real change.',
      icon: 'Award',
    },
    {
      id: 'badge_civic_champion',
      type: 'CIVIC_CHAMPION',
      name: 'Civic Champion',
      description: 'An elite contributor dedicated to the highest standards of civic engagement.',
      icon: 'Trophy',
    }
  ];
}

/**
 * Evaluates a user's total points against the gamification rules engine
 * to determine which badges they are eligible to hold.
 * 
 * @param totalPoints The user's cumulative reputation score
 * @returns An array of BadgeType enumerations the user is eligible for
 */
export function checkEligibleBadges(totalPoints: number): BadgeType[] {
  const eligible: BadgeType[] = [];
  
  if (totalPoints >= REQUIREMENTS.CIVIC_CHAMPION) {
    eligible.push('CIVIC_CHAMPION');
  }
  if (totalPoints >= REQUIREMENTS.COMMUNITY_LEADER) {
    eligible.push('COMMUNITY_LEADER');
  }
  if (totalPoints >= REQUIREMENTS.ACTIVE_CITIZEN) {
    eligible.push('ACTIVE_CITIZEN');
  }
  if (totalPoints >= REQUIREMENTS.FIRST_REPORTER) {
    eligible.push('FIRST_REPORTER');
  }
  
  return eligible;
}

/**
 * Persists a new badge award for a user into the database.
 * Defensively prevents duplicate awards by checking existence first.
 * 
 * @param userId The UUID of the user receiving the badge
 * @param badgeType The specific category of badge being awarded
 * @returns An object indicating success status
 */
export async function awardBadge(
  userId: string, 
  badgeType: BadgeType
): Promise<{ success: boolean; error?: string }> {
  if (!userId || !isValidUUID(userId)) {
    return { success: false, error: 'A valid userId is required to award a badge.' };
  }

  if (!badgeType) {
    return { success: false, error: 'A valid badgeType is required.' };
  }

  const supabase = createClient();

  try {
    // 1. Defensively check if the user already holds this badge to prevent duplicates
    const { data: existing, error: checkError } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', userId)
      .eq('badge_type', badgeType)
      .maybeSingle();

    if (checkError) {
      console.error('[Badges Service] Error checking existing badges:', checkError.message);
      return { success: false, error: 'Failed to verify existing badges.' };
    }

    if (existing) {
      // Return success if they already have it, treating it as an idempotent operation
      return { success: true };
    }

    // 2. Insert the new badge record
    const { error: insertError } = await supabase
      .from('user_badges')
      .insert({
        user_id: userId,
        badge_type: badgeType
      });

    if (insertError) {
      console.error('[Badges Service] Database insertion error:', insertError.message);
      return { success: false, error: 'Failed to award the badge.' };
    }

    return { success: true };

  } catch (err: unknown) {
    console.error('[Badges Service] Unexpected exception awarding badge:', err);
    return { success: false, error: 'An unexpected server error occurred.' };
  }
}

/**
 * A comprehensive workflow function that evaluates a user's current standing,
 * compares it against their already awarded badges, and securely issues any missing badges.
 * 
 * @param userId The UUID of the user being evaluated
 * @param profile The user's current gamification profile containing their total score
 * @returns An array of the specific BadgeTypes that were newly awarded during this execution
 */
export async function checkAndAwardBadges(
  userId: string, 
  profile: ReputationProfile
): Promise<BadgeType[]> {
  if (!userId || !isValidUUID(userId) || !profile) {
    return [];
  }

  try {
    // 1. Determine what they *should* have based on points
    const eligibleTypes = checkEligibleBadges(profile.totalPoints);
    if (eligibleTypes.length === 0) {
      return [];
    }

    // 2. Fetch what they *currently* have from the database
    const currentBadges = await getUserBadges(userId);
    const currentTypes = new Set(currentBadges.map(b => b.badgeType));

    // 3. Calculate the delta (badges they are eligible for but don't hold yet)
    const newlyAwarded: BadgeType[] = [];

    // Execute awards sequentially to ensure data consistency and prevent race conditions on the DB
    for (const type of eligibleTypes) {
      if (!currentTypes.has(type)) {
        const result = await awardBadge(userId, type);
        if (result.success) {
          newlyAwarded.push(type);
        }
      }
    }

    return newlyAwarded;

  } catch (err: unknown) {
    console.error('[Badges Service] Error during badge evaluation and award cycle:', err);
    return [];
  }
}

/**
 * Retrieves the complete historical log of all badges a specific user has earned.
 * 
 * @param userId The UUID of the user
 * @returns An array of strictly typed UserBadge records
 * @throws Error if the database query fails
 */
export async function getUserBadges(userId: string, supabaseClient?: SupabaseClient): Promise<UserBadge[]> {
  if (!userId || !isValidUUID(userId)) {
    throw new Error('Validation Error: A valid userId is required to fetch user badges.');
  }

  const supabase = supabaseClient || createClient();

  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*')
      .eq('user_id', userId)
      .order('awarded_at', { ascending: false });

    if (error) {
      console.error('[Badges Service] Error fetching user badges:', error.message);
      throw new Error('Failed to retrieve user badges.');
    }

    interface UserBadgeRow {
      id: string;
      user_id: string;
      badge_type: string;
      awarded_at: string;
    }

    return (data || []).map((row: UserBadgeRow) => ({
      id: row.id,
      userId: row.user_id,
      badgeType: row.badge_type as BadgeType,
      awardedAt: row.awarded_at
    }));

  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('An unexpected system error occurred while fetching user badges.');
  }
}

/**
 * Constructs a comprehensive summary of a user's achieved badges, merging
 * their historical records with the static badge definitions for UI rendering.
 * 
 * @param userId The UUID of the user
 * @returns A fully hydrated BadgeSummary object
 * @throws Error if the database query fails
 */
export async function getBadgeSummary(userId: string, supabaseClient?: SupabaseClient): Promise<BadgeSummary> {
  if (!userId || !isValidUUID(userId)) {
    throw new Error('Validation Error: A valid userId is required to fetch a badge summary.');
  }

  try {
    const userBadges = await getUserBadges(userId, supabaseClient);
    const definitions = getBadgeDefinitions();

    // Map the user's earned badge types to the full badge metadata objects
    const populatedBadges: Badge[] = userBadges
      .map(ub => definitions.find(d => d.type === ub.badgeType))
      .filter((b): b is Badge => b !== undefined);

    return {
      totalBadges: populatedBadges.length,
      badges: populatedBadges
    };

  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('An unexpected system error occurred while fetching badge summary.');
  }
}
