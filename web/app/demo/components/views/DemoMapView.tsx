'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DemoMapViewInternal = dynamic(() => import('./DemoMapViewInternal'), {
  ssr: false,
  loading: () => <p className="p-4 text-gray-500">Loading Map...</p>
});

export default function DemoMapView({ onNavigate }: { onNavigate: (view: string, id?: string | null) => void }) {
  return (
    <div className="w-full relative h-[600px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <DemoMapViewInternal onNavigate={onNavigate} />
    </div>
  );
}
