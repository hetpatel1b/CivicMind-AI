import { createClient } from '@/lib/supabase-browser';
import { SupportStatus, ToggleSupportResponse } from '@/types/support';

/**
 * Internal utility to centrally validate required parameters for support operations.
 * Throws a descriptive error if inputs are invalid, preventing malformed database queries.
 * 
 * @param issueId The UUID of the civic issue
 * @param userId The UUID of the authenticated user
 */
function validateInputs(issueId: string, userId: string) {
  if (!issueId || typeof issueId !== 'string' || issueId.trim() === '') {
    throw new Error('Validation Error: A valid issueId is required.');
  }
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    throw new Error('Validation Error: A valid userId is required.');
  }
}

/**
 * Retrieves the current support status of an issue for a specific user.
 * It checks if the user has already supported the issue and calculates the total support count.
 * 
 * @param issueId The UUID of the civic issue
 * @param userId The UUID of the authenticated user
 * @returns A strictly typed SupportStatus object representing the current state
 * @throws Error if database interactions fail
 */
export async function getSupportStatus(issueId: string, userId: string): Promise<SupportStatus> {
  validateInputs(issueId, userId);
  const supabase = createClient();

  try {
    // Perform concurrent requests to optimize network latency
    const [userSupportResponse, countResponse] = await Promise.all([
      // 1. Check if the specific user has an active support record
      supabase
        .from('supports')
        .select('id')
        .eq('issue_id', issueId)
        .eq('user_id', userId)
        .maybeSingle(),

      // 2. Count the total number of supports for the issue globally
      supabase
        .from('supports')
        .select('id', { count: 'exact', head: true })
        .eq('issue_id', issueId)
    ]);

    if (userSupportResponse.error) {
      console.error('[Support Service] Error checking user support status:', userSupportResponse.error.message);
      throw new Error('Failed to verify if the user has supported the issue.');
    }

    if (countResponse.error) {
      console.error('[Support Service] Error fetching total support count:', countResponse.error.message);
      throw new Error('Failed to retrieve the total support count for the issue.');
    }

    return {
      issueId,
      userHasSupported: !!userSupportResponse.data,
      totalSupports: countResponse.count || 0,
    };
  } catch (error) {
    // Re-throw standardized errors to be handled by the consumer UI
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected system error occurred while fetching support status.');
  }
}

/**
 * Toggles the user's support for a civic issue. 
 * If a support record exists, it removes it (undo support).
 * If no support record exists, it creates one (add support).
 * Recalculates and returns the updated state directly to power seamless optimistic UI updates.
 * 
 * @param issueId The UUID of the civic issue
 * @param userId The UUID of the authenticated user
 * @returns A ToggleSupportResponse indicating success and the new state
 * @throws Error if database mutations fail
 */
export async function toggleSupport(issueId: string, userId: string): Promise<ToggleSupportResponse> {
  validateInputs(issueId, userId);
  const supabase = createClient();

  try {
    // 1. Check current support state to determine the appropriate mutation
    const { data: existingSupport, error: checkError } = await supabase
      .from('supports')
      .select('id')
      .eq('issue_id', issueId)
      .eq('user_id', userId)
      .maybeSingle();

    if (checkError) {
      console.error('[Support Service] Error checking existing support:', checkError.message);
      throw new Error('Failed to determine current support state.');
    }

    const hasSupported = !!existingSupport;

    // 2. Execute the mutation (Toggle state)
    if (hasSupported) {
      // Remove the existing support record
      const { error: deleteError } = await supabase
        .from('supports')
        .delete()
        .eq('issue_id', issueId)
        .eq('user_id', userId);

      if (deleteError) {
        console.error('[Support Service] Error removing support:', deleteError.message);
        throw new Error('Failed to remove your support from this issue. Please try again.');
      }
    } else {
      // Create a new support record
      const { error: insertError } = await supabase
        .from('supports')
        .insert({ issue_id: issueId, user_id: userId });

      if (insertError) {
        console.error('[Support Service] Error adding support:', insertError.message);
        throw new Error('Failed to add your support to this issue. Please try again.');
      }
    }

    // 3. Recalculate the true source-of-truth total support count post-mutation
    const { count: newTotalSupports, error: countError } = await supabase
      .from('supports')
      .select('id', { count: 'exact', head: true })
      .eq('issue_id', issueId);

    if (countError) {
      console.error('[Support Service] Error recalculating support count:', countError.message);
      throw new Error('Support was toggled, but failed to fetch the updated count.');
    }

    return {
      success: true,
      totalSupports: newTotalSupports || 0,
      userHasSupported: !hasSupported, // The state is now cleanly inverted
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected system error occurred while toggling support.');
  }
}
