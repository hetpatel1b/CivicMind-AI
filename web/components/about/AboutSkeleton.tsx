import React from 'react';
import { Skeleton } from '@/design-system/components/Skeleton';

export default function AboutSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09090b] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-16">
          <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
        </div>
        {/* Story */}
        <div className="mb-24">
          <Skeleton className="h-8 w-64 mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-64 rounded-[2rem]" />
            <Skeleton className="h-64 rounded-[2rem]" />
            <Skeleton className="h-64 rounded-[2rem]" />
          </div>
        </div>
      </div>
    </main>
  );
}
