import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { IssueImageInfo } from '@/services/issue-details';

interface IssueGalleryProps {
  images: IssueImageInfo[];
}

export default function IssueGallery({ images }: IssueGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700 mb-8">
        <ImageIcon className="w-12 h-12 mb-3" />
        <span className="font-medium text-sm">No images attached</span>
      </div>
    );
  }

  const primaryImage = images[0];

  return (
    <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-gray-900 mb-8 relative">
      <img
        src={primaryImage.image_url}
        alt="Issue"
        className="w-full h-full object-cover"
      />
      {primaryImage.is_ai_analyzed && (
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20 shadow-sm">
          AI Analyzed
        </div>
      )}
    </div>
  );
}
