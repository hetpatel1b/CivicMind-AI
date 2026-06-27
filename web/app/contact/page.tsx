'use client';

import React, { useState, useEffect } from 'react';
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
      <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactError error={error} onRetry={() => setError(null)} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] selection:bg-blue-100 dark:selection:bg-blue-900/50">
      <ContactHeader />
      <SupportOptions />
      
      <HelpfulResources />
      <SupportWorkflow />
      
      <section className="py-20 bg-white dark:bg-[#020817] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
            <div className="lg:col-span-4">
              <ContactInformation />
            </div>
          </div>
        </div>
      </section>

      <ContactFAQ />
    </main>
  );
}
