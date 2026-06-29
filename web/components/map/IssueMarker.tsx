'use client';

import React, { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { MapIssue } from '@/types/map';
import { getSeverityColor } from '@/utils/map-marker-colors';

const getPremiumColor = (severity: MapIssue['severity']) => {
  switch (severity) {
    case 'CRITICAL': return { bg: 'bg-rose-500', text: 'text-rose-500', glow: 'shadow-[0_0_15px_rgba(244,63,94,0.6)]' };
    case 'HIGH': return { bg: 'bg-amber-500', text: 'text-amber-500', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.6)]' };
    case 'MEDIUM': return { bg: 'bg-emerald-500', text: 'text-emerald-500', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]' };
    default: return { bg: 'bg-indigo-500', text: 'text-indigo-500', glow: 'shadow-[0_0_15px_rgba(99,102,241,0.6)]' };
  }
};

/**
 * Helper to generate a custom, dynamically colored Leaflet divIcon.
 */
const createCustomIcon = (severity: MapIssue['severity']) => {
  const colors = getPremiumColor(severity);

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative w-7 h-7 rounded-full border border-white/20 bg-[#0a0f1c]/90 backdrop-blur-3xl ring-1 ring-white/5 ${colors.glow} flex items-center justify-center transition-all hover:scale-125 hover:border-white/50 ease-in-out cursor-pointer group">
        <div class="w-2.5 h-2.5 ${colors.bg} rounded-full group-hover:scale-150 transition-transform ${colors.glow}"></div>
        <div class="absolute inset-0 rounded-full animate-ping opacity-40 ${colors.bg}"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

interface IssueMarkerProps {
  issue: MapIssue;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function IssueMarker({ issue, children, onClick }: IssueMarkerProps) {
  const icon = useMemo(() => createCustomIcon(issue.severity), [issue.severity]);

  if (typeof issue.latitude !== 'number' || typeof issue.longitude !== 'number') {
    return null;
  }

  return (
    <Marker 
      position={[issue.latitude, issue.longitude]} 
      icon={icon}
      eventHandlers={{
        click: () => {
          if (onClick) onClick();
        }
      }}
    >
      {children}
    </Marker>
  );
}
