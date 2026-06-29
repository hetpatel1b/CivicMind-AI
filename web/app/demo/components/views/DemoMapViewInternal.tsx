'use client';

import React from 'react';
import CivicMap from '../../../../components/map/CivicMap';
import IssueMarker from '../../../../components/map/IssueMarker';
import AIRegionalInsights from '../../../../components/map/AIRegionalInsights';
import { useDemo } from '../../context/DemoProvider';

export default function DemoMapViewInternal({ onNavigate }: { onNavigate: (view: string, id?: string | null) => void }) {
  const { issues } = useDemo();

  return (
    <CivicMap>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <AIRegionalInsights issues={issues as any} />
      {issues.map((issue) => (
        <IssueMarker 
          key={issue.id} 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          issue={issue as any} 
          onClick={() => onNavigate('issue-details', issue.id)}
        />
      ))}
    </CivicMap>
  );
}
