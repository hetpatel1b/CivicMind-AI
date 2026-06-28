import { createAdminClient } from '@/lib/supabase-server';
import { ReputationEventType } from '@/types/reputation';
import { getPointsForEvent } from '@/services/reputation';
import { checkEligibleBadges } from '@/services/badges';
import { createNotification } from '@/services/notifications-server';

function isValidUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

export async function awardReputation(
  userId: string, 
  type: ReputationEventType
): Promise<{ success: boolean; pointsAwarded?: number; error?: string }> {
  if (!userId || !isValidUUID(userId)) {
    return { success: false, error: 'A valid userId is required to award reputation.' };
  }

  if (!type) {
    return { success: false, error: 'A valid event type is required.' };
  }

  const points = getPointsForEvent(type);
  if (points === 0) {
    return { success: false, error: 'Unknown or invalid reputation event type.' };
  }

  // Use the admin client to securely award points without RLS blocking it
  const supabase = await createAdminClient();

  try {
    const { error } = await supabase
      .from('reputation_events')
      .insert({
        user_id: userId,
        type: type,
        points: points
      });

    if (error) {
      console.error('[Gamification Service] Database insertion error:', error.message);
      return { success: false, error: 'Failed to record reputation event.' };
    }

    // Update the authoritative users table
    const { data: userData } = await supabase
      .from('users')
      .select('reputation_points')
      .eq('id', userId)
      .single();

    const currentPoints = userData?.reputation_points || 0;
    
    await supabase
      .from('users')
      .update({ reputation_points: currentPoints + points })
      .eq('id', userId);

    // Check for new badges
    const newTotal = currentPoints + points;
    const eligibleBadges = checkEligibleBadges(newTotal);

    for (const badge of eligibleBadges) {
      // Defensively check if they already have it
      const { data: existing } = await supabase
        .from('user_badges')
        .select('id')
        .eq('user_id', userId)
        .eq('badge_type', badge)
        .maybeSingle();

      if (!existing) {
        await supabase.from('user_badges').insert({
          user_id: userId,
          badge_type: badge
        });
        
        // Create a notification for the newly earned badge
        await createNotification(userId, 'BADGE_EARNED', `Congratulations! You've earned the ${badge.replace('_', ' ')} badge!`);
      }
    }

    return { 
      success: true, 
      pointsAwarded: points 
    };

  } catch (err: unknown) {
    console.error('[Gamification Service] Unexpected error awarding reputation:', err);
    return { success: false, error: 'An unexpected system error occurred.' };
  }
}
