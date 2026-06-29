import { createClient } from '@/lib/supabase-browser';
import { SupabaseClient } from '@supabase/supabase-js';
import { 
  ReputationEventType, 
  ReputationProfile, 
  ReputationSummary 
} from '@/types/reputation';

// Define strictly typed, central reward constants for the gamification economy
const REWARD_ISSUE_REPORTED = 10;
const REWARD_ISSUE_SUPPORTED = 2;
const REWARD_COMMENT_CREATED = 3;
const REWARD_ISSUE_VERIFIED = 20;
const REWARD_ISSUE_RESOLVED = 50;

/**
 * Validates if a string is a properly formatted UUID v4.
 */
function isValidUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Retrieves the defined point value for a specific reputation event type.
 * 
 * @param type The specific ReputationEventType
 * @returns The numeric point value awarded for the action
 */
export function getPointsForEvent(type: ReputationEventType): number {
  switch (type) {
    case 'ISSUE_REPORTED':
      return REWARD_ISSUE_REPORTED;
    case 'ISSUE_SUPPORTED':
      return REWARD_ISSUE_SUPPORTED;
    case 'COMMENT_CREATED':
      return REWARD_COMMENT_CREATED;
    case 'ISSUE_VERIFIED':
      return REWARD_ISSUE_VERIFIED;
    case 'ISSUE_RESOLVED':
      return REWARD_ISSUE_RESOLVED;
    default:
      return 0; // Failsafe for unknown event types
  }
}

/**
 * Calculates a user's gamification tier (level) based on their total cumulative points.
 * 
 * Level Thresholds:
 * 0-49: Citizen
 * 50-149: Active Citizen
 * 150-299: Community Leader
 * 300+: Civic Champion
 * 
 * @param totalPoints The user's total accrued points
 * @returns A string representing the user's earned tier level
 */
export function calculateLevel(totalPoints: number): string {
  if (totalPoints >= 300) {
    return 'Civic Champion';
  }
  if (totalPoints >= 150) {
    return 'Community Leader';
  }
  if (totalPoints >= 50) {
    return 'Active Citizen';
  }
  return 'Citizen';
}

/**
 * Calculates and retrieves a user's lightweight gamification profile.
 * Aggregates all their earned points and determines their current level.
 * 
 * @param userId The unique identifier of the user
 * @returns A fully hydrated ReputationProfile
 * @throws Error if the database query fails or inputs are invalid
 */
export async function getReputationProfile(userId: string, supabaseClient?: SupabaseClient): Promise<ReputationProfile> {
  if (!userId || !isValidUUID(userId)) {
    throw new Error('Validation Error: A valid userId is required to fetch a reputation profile.');
  }

  const supabase = supabaseClient || createClient();

  try {
    // Perform an aggregate sum directly inside Supabase if possible, or fetch and reduce.
    // We will fetch and reduce defensively to ensure type safety.
    const { data, error } = await supabase
      .from('reputation_events')
      .select('points')
      .eq('user_id', userId);

    if (error) {
      console.error('[Reputation Service] Error fetching reputation profile:', error.message);
      throw new Error('Failed to retrieve reputation data.');
    }

    const totalPoints = (data || []).reduce((sum, record) => sum + (record.points || 0), 0);
    const level = calculateLevel(totalPoints);

    return {
      userId,
      totalPoints,
      level
    };

  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('An unexpected system error occurred while fetching reputation profile.');
  }
}

/**
 * Compiles a comprehensive summary of a user's platform engagement and gamification metrics.
 * Analyzes the user's historical event logs to determine activity counts.
 * 
 * @param userId The unique identifier of the user
 * @returns A fully hydrated ReputationSummary
 * @throws Error if the database query fails or inputs are invalid
 */
export async function getReputationSummary(userId: string, supabaseClient?: SupabaseClient): Promise<ReputationSummary> {
  if (!userId || !isValidUUID(userId)) {
    throw new Error('Validation Error: A valid userId is required to fetch a reputation summary.');
  }

  const supabase = supabaseClient || createClient();

  try {
    const { data, error } = await supabase
      .from('reputation_summary')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('[Reputation Service] Error fetching reputation summary:', error.message);
      throw new Error('Failed to retrieve detailed reputation summary.');
    }

    return {
      totalPoints: data?.total_points || 0,
      totalReports: data?.total_reports || 0,
      totalSupports: data?.total_supports || 0,
      totalComments: data?.total_comments || 0,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('An unexpected system error occurred while fetching reputation summary.');
  }
}
