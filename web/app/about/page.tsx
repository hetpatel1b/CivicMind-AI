'use client';

import React, { useState, useEffect } from 'react';
import AboutHeader from '@/components/about/AboutHeader';
import ProductJourney from '@/components/about/ProductJourney';
import CoreBenefits from '@/components/about/CoreBenefits';
import UserGroups from '@/components/about/UserGroups';
import FeaturesSection from '@/components/about/FeaturesSection';
import TechnologySection from '@/components/about/TechnologySection';
import ImpactSection from '@/components/about/ImpactSection';
import FAQPreview from '@/components/about/FAQPreview';
import CallToAction from '@/components/about/CallToAction';
import AboutSkeleton from '@/components/about/AboutSkeleton';
import AboutError from '@/components/about/AboutError';
import { DashboardStatistics } from '@/types/analytics';

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStatistics | null>(null);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.analytics?.dashboard) {
            if (mounted) setStats(data.analytics.dashboard);
          }
        }
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    init();
    return () => { mounted = false; };
  }, []);

  if (isLoading) {
    return <AboutSkeleton />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutError error={error} onRetry={() => setError(null)} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] selection:bg-blue-100 dark:selection:bg-blue-900/50">
      <AboutHeader />
      <ImpactSection stats={stats} />
      <ProductJourney />
      <CoreBenefits />
      <UserGroups />
      <FeaturesSection />
      <TechnologySection />
      <FAQPreview />
      <CallToAction />
    </main>
  );
}
