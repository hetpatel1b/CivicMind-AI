import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProductShowcaseSection from '@/components/landing/ProductShowcaseSection';
import WhyCivicMindSection from '@/components/landing/WhyCivicMindSection';
import FeatureSection from '@/components/landing/FeatureSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import AIFeaturesSection from '@/components/landing/AIFeaturesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import StatsSection from '@/components/landing/StatsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020817] font-sans">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProductShowcaseSection />
        <WhyCivicMindSection />
        <FeatureSection />
        <HowItWorksSection />
        <AIFeaturesSection />
        <BenefitsSection />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
