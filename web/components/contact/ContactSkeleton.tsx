import React from 'react';
import { Skeleton } from '@/design-system/components/Skeleton';

export default function ContactSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09090b] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Skeleton */}
        <div className="mb-12">
          <Skeleton className="h-[300px] w-full rounded-[2.5rem]" />
        </div>
        
        {/* Options Skeleton */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-40 rounded-[1.5rem]" />
            ))}
          </div>
        </div>

        {/* Form Skeleton */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <Skeleton className="h-[500px] rounded-[2rem]" />
            </div>
            <div className="lg:col-span-5">
              <Skeleton className="h-[500px] rounded-[2rem]" />
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
