'use client';

import React from 'react';
import { Popup } from 'react-leaflet';
import Link from 'next/link';
import { MapIssue } from '@/types/map';
import { Calendar, ExternalLink } from 'lucide-react';

interface IssuePopupProps {
  /** The civic issue data to display inside the popup */
  issue: MapIssue;
}

/**
 * Renders an interactive Leaflet Popup containing key issue details.
 * Optimized for rapid data presentation without heavy network calls.
 * Includes a direct link to the full issue details page.
 */
export default function IssuePopup({ issue }: IssuePopupProps) {
  // Format the creation date to be compact yet highly readable
  const formattedDate = new Date(issue.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Popup 
      className="custom-leaflet-popup" 
      closeButton={true}
      minWidth={280}
      maxWidth={320}
    >
      <div className="flex flex-col font-sans p-1 text-gray-900 dark:text-gray-100">
        
        {/* Header Tags: Category & Severity */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm">
            {issue.category}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
            issue.severity === 'CRITICAL' ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800/50' :
            issue.severity === 'HIGH' ? 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/50' :
            issue.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800/50' :
            'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800/50'
          }`}>
            {issue.severity}
          </span>
        </div>

        {/* Issue Title */}
        <h3 className="font-extrabold text-base leading-snug mb-2 line-clamp-2 text-gray-900">
          {issue.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
          <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
          <span>Reported {formattedDate}</span>
        </div>

        {/* Action Button */}
        <Link 
          href={`/issues/${issue.id}`}
          className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 shadow-sm"
          aria-label={`View detailed report for ${issue.title}`}
        >
          <span>View Details</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </Link>
      </div>
    </Popup>
  );
}
