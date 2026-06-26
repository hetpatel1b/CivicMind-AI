import React from 'react';
import { MapPin, Image as ImageIcon } from 'lucide-react';

interface ReportPreviewProps {
  title: string;
  category: string;
  severity: string;
  description: string;
  latitude: string;
  longitude: string;
  imagePreviewUrl: string | null;
}

export default function ReportPreview({
  title, category, severity, description, latitude, longitude, imagePreviewUrl
}: ReportPreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Live Preview</h3>
      
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden border-b border-gray-200 dark:border-gray-700">
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 dark:text-gray-600 flex flex-col items-center">
              <ImageIcon className="w-10 h-10 mb-2" />
              <span className="text-sm font-medium">No image provided</span>
            </div>
          )}
        </div>
        
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {category ? (
              <span className="px-2.5 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold rounded-md uppercase tracking-wider">
                {category}
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-500 text-xs font-semibold rounded-md uppercase tracking-wider">
                Category
              </span>
            )}
            {severity ? (
              <span className="px-2.5 py-1 bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-xs font-semibold rounded-md uppercase tracking-wider border border-gray-300 dark:border-gray-600">
                Severity: {severity}
              </span>
            ) : null}
          </div>
          
          <h4 className="text-lg font-bold text-gray-900 dark:text-white break-words">
            {title || 'Issue Title'}
          </h4>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {description || 'Detailed description will appear here...'}
          </p>
          
          <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-500">
            <MapPin className="w-4 h-4" />
            {latitude && longitude ? `${latitude}, ${longitude}` : 'Location not set'}
          </div>
        </div>
      </div>
    </div>
  );
}
