import React from 'react';
import { MapPin } from 'lucide-react';

interface IssueLocationCardProps {
  latitude: number;
  longitude: number;
  locationName: string | null;
}

export default function IssueLocationCard({ latitude, longitude, locationName }: IssueLocationCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-400" />
        Location Details
      </h3>
      
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          {locationName || 'Location Name Not Available'}
        </p>
        <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
          <span>LAT: {latitude}</span>
          <span>LNG: {longitude}</span>
        </div>
      </div>
    </div>
  );
}
