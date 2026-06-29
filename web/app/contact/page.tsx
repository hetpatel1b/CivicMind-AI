'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import ContactHeader from '@/components/contact/ContactHeader';
import SupportOptions from '@/components/contact/SupportOptions';
import ContactForm from '@/components/contact/ContactForm';
import ContactInformation from '@/components/contact/ContactInformation';
import ContactFAQ from '@/components/contact/ContactFAQ';
import HelpfulResources from '@/components/contact/HelpfulResources';
import SupportWorkflow from '@/components/contact/SupportWorkflow';
import ContactSkeleton from '@/components/contact/ContactSkeleton';
import ContactError from '@/components/contact/ContactError';
export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Scaffold loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ContactSkeleton />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-[#09090b] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactError error={error} onRetry={() => setError(null)} />
        </div>
      </main>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09090b] pt-24 pb-24 selection:bg-indigo-100 dark:selection:bg-indigo-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ContactHeader />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <SupportOptions />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <SupportWorkflow />
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
              <div className="lg:col-span-5">
                <ContactInformation />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ContactFAQ />
          </motion.div>

          <motion.div variants={itemVariants}>
            <HelpfulResources />
          </motion.div>
          
        </motion.div>
      </div>
    </main>
  );
}
