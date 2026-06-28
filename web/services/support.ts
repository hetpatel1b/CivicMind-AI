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

  try {
    const response = await fetch('/api/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ issueId, userId }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || result.error || 'Failed to toggle support.');
    }

    return {
      success: true,
      totalSupports: result.totalSupports,
      userHasSupported: result.userHasSupported,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected system error occurred while toggling support.');
  }
}
