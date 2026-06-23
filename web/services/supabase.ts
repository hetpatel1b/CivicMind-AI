import { createClient as createBrowserClient } from '@/lib/supabase-browser';

/**
 * SupabaseService
 * A foundational service wrapper to encapsulate all database interactions.
 * It accepts an injected Supabase client so it can seamlessly be used 
 * on both the Client (via createBrowserClient) and the Server (via createServerClient).
 */
export class SupabaseService {
  constructor(private supabase: any) {}

  // ==========================================
  // STORAGE
  // ==========================================
  
  /**
   * Uploads an image to the civic-images bucket and returns its public URL.
   * Crucial for bypassing Base64 limitations.
   */
  async uploadIssueImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `issues/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await this.supabase.storage
      .from('civic-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }

    const { data: publicUrlData } = this.supabase.storage
      .from('civic-images')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  }

  // ==========================================
  // ISSUES
  // ==========================================
  
  /**
   * Fetches all issues for the community feed.
   */
  async getIssues() {
    const { data, error } = await this.supabase
      .from('issues')
      .select('*, users(full_name, avatar_url)')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch issues: ${error.message}`);
    }

    return data;
  }

  /**
   * Submits a finalized issue report to the database.
   */
  async createIssue(issueData: any) {
    const { data, error } = await this.supabase
      .from('issues')
      .insert([issueData])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create issue: ${error.message}`);
    }

    return data;
  }

  // ==========================================
  // ANALYTICS
  // ==========================================
  
  /**
   * Logs an analytics event. 
   * NOTE: Due to RLS, if called from the client, this will fail unless RLS allows it.
   * Ideally, use `createAdminClient()` on the server to execute this method.
   */
  async logAnalyticsEvent(eventType: string, eventData: any) {
    const { error } = await this.supabase
      .from('analytics_events')
      .insert([{ event_type: eventType, event_data: eventData }]);

    if (error) {
      throw new Error(`Analytics logging failed: ${error.message}`);
    }
  }
}

// Convenience export for client-side usage across standard React components.
export const getBrowserSupabaseService = () => new SupabaseService(createBrowserClient());
