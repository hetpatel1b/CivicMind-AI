'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import AboutHeader from '@/components/about/AboutHeader';
import ProductJourney from '@/components/about/ProductJourney';
import MeetPlatform from '@/components/about/MeetPlatform';
import TrustTransparency from '@/components/about/TrustTransparency';
import CoreBenefits from '@/components/about/CoreBenefits';
import ImpactSection from '@/components/about/ImpactSection';
import VisionSection from '@/components/about/VisionSection';
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
      <main className="min-h-screen bg-gray-50 dark:bg-[#09090b] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutError error={error} onRetry={() => setError(null)} />
        </div>
      </main>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09090b] pt-24 pb-24 selection:bg-indigo-100 dark:selection:bg-indigo-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AboutHeader />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <ImpactSection stats={stats} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ProductJourney />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <MeetPlatform />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TrustTransparency />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <CoreBenefits />
          </motion.div>

          <motion.div variants={itemVariants}>
            <VisionSection />
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
