/**
 * Defines the strict severity levels allowed for mapping.
 */
export type MapSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

/**
 * Defines the exact visual colors permitted for map markers.
 * These correspond directly to Tailwind CSS or Leaflet Icon colors.
 */
export type MarkerColor = 'green' | 'yellow' | 'orange' | 'red';

/**
 * Represents a civic issue safely projected onto the interactive map.
 * Contains only the essential geospatial and display data to minimize payload.
 */
export interface MapIssue {
  id: string;
  title: string;
  category: string;
  severity: MapSeverity;
  latitude: number;
  longitude: number;
  created_at: string;
}

/**
 * Represents a rendered map marker plotted onto the map instance.
 * Abstracted away from the raw issue data to decouple GIS state from business logic.
 */
export interface MapMarker {
  issueId: string;
  position: [number, number]; // [latitude, longitude] tuple format required by Leaflet
  severity: MapSeverity;
  color: MarkerColor;
}

/**
 * Represents the data injected into a map popup when a user clicks a marker.
 * Flattened format optimized for rapid UI rendering.
 */
export interface MapPopupData {
  issueId: string;
  title: string;
  category: string;
  severity: MapSeverity;
  createdAt: string;
}
