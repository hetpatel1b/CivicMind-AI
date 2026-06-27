import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import InteractiveAIShowcase from '@/components/landing/InteractiveAIShowcase';
import AIFeaturesSection from '@/components/landing/AIFeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import AITrustSection from '@/components/landing/AITrustSection';
import StatsSection from '@/components/landing/StatsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import AssistantCTASection from '@/components/landing/AssistantCTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020817] font-sans">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <InteractiveAIShowcase />
        <AIFeaturesSection />
        <HowItWorksSection />
        <AITrustSection />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <AssistantCTASection />
      </main>
      <Footer />
    </div>
  );
}
