import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface LocationPickerProps {
  latitude: string;
  longitude: string;
  onChange: (lat: string, lng: string) => void;
}

export default function LocationPicker({ latitude, longitude, onChange }: LocationPickerProps) {
  const [locating, setLocating] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange(position.coords.latitude.toString(), position.coords.longitude.toString());
        setLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Could not get your location. Please enter coordinates manually.');
        setLocating(false);
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location Coordinates
        </label>
        <button
          type="button"
          onClick={handleGetLocation}
          disabled={locating}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 disabled:opacity-50"
        >
          <Navigation className="w-4 h-4" />
          {locating ? 'Locating...' : 'Use Current Location'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lat" className="sr-only">Latitude</label>
          <input
            id="lat"
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => onChange(e.target.value, longitude)}
            placeholder="Latitude (e.g. 40.7128)"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="lng" className="sr-only">Longitude</label>
          <input
            id="lng"
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => onChange(latitude, e.target.value)}
            placeholder="Longitude (e.g. -74.0060)"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          />
        </div>
      </div>
    </div>
  );
}
