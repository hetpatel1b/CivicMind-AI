'use client';

import React, { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { MapIssue } from '@/types/map';
import { getSeverityColor } from '@/utils/map-marker-colors';

/**
 * Helper to generate a custom, dynamically colored Leaflet divIcon.
 * Bypasses the need for static image assets, ensuring strict Next.js compatibility 
 * and perfect GCP static hosting behavior.
 * 
 * @param severity The severity of the issue determining the marker color
 * @returns A Leaflet divIcon instance
 */
const createCustomIcon = (severity: MapIssue['severity']) => {
  const colorClass = getSeverityColor(severity);

  // We utilize a simple, highly-performant HTML circle with a central dot
  // and a white border. This scales perfectly at all zoom levels.
  return L.divIcon({
    className: 'custom-leaflet-marker', // Prevents default leaflet background styling
    html: `
      <div class="relative w-6 h-6 rounded-full border-2 border-white shadow-[0_2px_5px_rgba(0,0,0,0.3)] flex items-center justify-center ${colorClass} transition-transform hover:scale-110 ease-in-out cursor-pointer">
        <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12], // Centers the icon directly over the coordinate
  });
};

interface IssueMarkerProps {
  /** The civic issue geospatial data to be plotted */
  issue: MapIssue;
  /** Optional child elements like Popups or Tooltips */
  children?: React.ReactNode;
}

/**
 * Renders a single custom-styled Map Marker for a civic issue.
 * Deliberately decoupled from Popups and Navigation to ensure pure, fast GIS plotting.
 */
export default function IssueMarker({ issue, children }: IssueMarkerProps) {
  // Memoize the icon to prevent unnecessary recreation on every React render cycle,
  // drastically improving performance when plotting hundreds of markers.
  const icon = useMemo(() => createCustomIcon(issue.severity), [issue.severity]);

  // Defensively ensure coordinates exist before attempting to render a plot
  if (typeof issue.latitude !== 'number' || typeof issue.longitude !== 'number') {
    return null;
  }

  return (
    <Marker 
      position={[issue.latitude, issue.longitude]} 
      icon={icon}
    >
      {children}
    </Marker>
  );
}
