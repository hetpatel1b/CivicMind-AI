import React from 'react';
import { Card } from '@/design-system/components/Card';
import { Skeleton } from '@/design-system/components/Skeleton';

export function ErrorSkeleton() {
  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] flex items-center justify-center p-4">
      <Card className="p-8 md:p-12 md:rounded-3xl w-full max-w-2xl text-center">
        
        {/* Header */}
        <Skeleton className="h-4 w-24 mx-auto mb-4" />
        
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>
        
        {/* Content */}
        <Skeleton className="h-8 w-3/4 mx-auto mb-6" />
        <Skeleton className="h-4 w-full mx-auto mb-3" />
        <Skeleton className="h-4 w-5/6 mx-auto mb-8" />
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Skeleton className="h-12 rounded-xl w-full sm:w-40" />
          <Skeleton className="h-12 rounded-xl w-full sm:w-40" />
        </div>
        
        {/* Footer */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <div className="flex justify-center gap-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </Card>
    </main>
  );
}
