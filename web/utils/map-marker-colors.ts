import { MapSeverity } from '@/types/map';

/**
 * Maps a given civic issue severity level to a corresponding Tailwind CSS background color class.
 * Ensures consistent visual prioritization across the interactive map.
 * 
 * LOW       → green
 * MEDIUM    → yellow
 * HIGH      → orange
 * CRITICAL  → red
 * Default   → blue
 *
 * @param severity The severity level of the issue.
 * @returns A Tailwind CSS background color class string.
 */
export function getSeverityColor(severity: MapSeverity | string): string {
  switch (severity) {
    case 'LOW':
      return 'bg-green-500';
    case 'MEDIUM':
      return 'bg-yellow-500';
    case 'HIGH':
      return 'bg-orange-500';
    case 'CRITICAL':
      return 'bg-red-500';
    default:
      return 'bg-blue-500';
  }
}
