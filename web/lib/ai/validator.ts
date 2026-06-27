/**
 * Validation Layer for AI Infrastructure.
 * Provides explicit input validation before burning API tokens.
 */

export const aiValidator = {
  /**
   * Validates if a provided string is a likely accessible public URL
   */
  validateImageUrl: (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  }
};
