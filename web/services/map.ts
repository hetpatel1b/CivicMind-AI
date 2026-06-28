import { createClient } from '@/lib/supabase-browser';
import { MapIssue, MapSeverity } from '@/types/map';

// Private interface matching the exact structure returned by our Supabase query
interface DatabaseMapIssue {
  id: string;
  title: string;
  category: string;
  severity: string;
  status: string;
  description: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

/**
 * Fetches all civic issues from the database that possess valid geospatial coordinates.
 * Returns a lightweight array of MapIssue objects specifically formatted and optimized 
 * for rendering on the Interactive Civic Map.
 * 
 * In the event of a database failure or network exception, it acts defensively
 * and returns an empty array to prevent the map UI from crashing.
 *
 * @returns {Promise<MapIssue[]>} An array of strictly typed MapIssue objects.
 */
export async function getMapIssues(): Promise<MapIssue[]> {
  try {
    const supabase = createClient();

    // Query the database for map-specific fields only, drastically reducing payload size.
    // We enforce NOT NULL filters strictly so the map does not attempt to plot invalid points.
    const { data, error } = await supabase
      .from('issues')
      .select('id, title, category, severity, status, description, latitude, longitude, created_at')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null);

    if (error) {
      console.error('[Map Service] Database error occurred while fetching map issues:', error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Cast the raw data to our expected schema to ensure type safety without `any`
    const rawIssues = data as DatabaseMapIssue[];

    // Map over the results to ensure strict adherence to the exported MapIssue contract
    return rawIssues.map((issue) => ({
      id: issue.id,
      title: issue.title,
      category: issue.category,
      severity: issue.severity as MapSeverity,
      status: issue.status,
      description: issue.description,
      latitude: issue.latitude,
      longitude: issue.longitude,
      created_at: issue.created_at
    }));

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown exception occurred';
    console.error('[Map Service] Unexpected error fetching map issues:', errorMessage);
    
    // Fail gracefully on unexpected crashes
    return [];
  }
}
