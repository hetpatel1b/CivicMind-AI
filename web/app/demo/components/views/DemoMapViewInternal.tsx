'use client';

import React from 'react';
import CivicMap from '../../../../components/map/CivicMap';
import IssueMarker from '../../../../components/map/IssueMarker';
import { useDemo } from '../../context/DemoProvider';
import { MapIssue } from '../../../../types/map';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import IssuePopup from '../../../../components/map/IssuePopup';

// Basic map icon for fallback if IssueMarker has issues outside context
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function DemoMapViewInternal({ onNavigate }: { onNavigate: (view: string, id?: string | null) => void }) {
  const { issues } = useDemo();

  return (
    <div className="w-full h-full relative z-0">
      <CivicMap>
        {issues.map((issue) => (
          <Marker 
            key={issue.id} 
            position={[issue.latitude, issue.longitude]}
            icon={defaultIcon}
          >
            <Popup className="civic-popup p-0 border-0 m-0">
              <IssuePopup issue={issue as any} allIssues={issues as any} />
            </Popup>
          </Marker>
        ))}
      </CivicMap>
    </div>
  );
}
