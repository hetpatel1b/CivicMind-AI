import React from 'react';
import { Skeleton } from '@/design-system/components/Skeleton';

export default function HelpSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09090b] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Skeleton */}
        <div className="mb-12">
          <Skeleton className="h-[300px] w-full rounded-[2rem]" />
        </div>
        
        {/* Search Skeleton */}
        <div className="mb-16 flex justify-center">
          <Skeleton className="h-16 w-full max-w-3xl rounded-3xl" />
        </div>

        {/* Categories Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-32 rounded-3xl" />
            ))}
          </div>
        </div>

        {/* FAQs Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-20 rounded-3xl" />
            ))}
          </div>
        </div>
        
      </div>
    </main>
  );
}
