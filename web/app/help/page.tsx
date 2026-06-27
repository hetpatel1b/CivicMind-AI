'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Flag, Bell, Settings, Rss, Trophy, Mail, BookOpen, ShieldAlert, Home, Map as MapIcon, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';
import Link from 'next/link';

import HelpHeader from '@/components/help/HelpHeader';
import HelpSearch from '@/components/help/HelpSearch';
import HelpCategories from '@/components/help/HelpCategories';
import HelpSection from '@/components/help/HelpSection';
import FAQList from '@/components/help/FAQList';
import HelpCard from '@/components/help/HelpCard';
import HelpSkeleton from '@/components/help/HelpSkeleton';
import HelpError from '@/components/help/HelpError';
import HelpEmpty from '@/components/help/HelpEmpty';

const CATEGORIES = [
  { id: 'started', name: 'Getting Started' },
  { id: 'issues', name: 'Reporting Issues' },
  { id: 'account', name: 'Account Management' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'leaderboard', name: 'Leaderboard' },
  { id: 'privacy', name: 'Privacy' },
  { id: 'security', name: 'Security' },
  { id: 'technical', name: 'Technical Issues' },
];

const FAQS = [
  { 
    id: 'faq-1', 
    category: 'Getting Started',
    question: 'How do I report an issue?', 
    answer: 'Reporting an issue is easy. Navigate to the Report Issue page from the Quick Actions menu. You will need to provide a description, exact location on the map, and optionally a photo of the civic issue. Once submitted, it will be reviewed by the community.',
    relatedFeatures: [{ title: 'Report Issue Form', href: '/report' }]
  },
  { 
    id: 'faq-2', 
    category: 'Account Management',
    question: 'How does reputation work?', 
    answer: 'Reputation is earned by actively participating in the community. You gain points when you report verified issues, receive upvotes on your comments, and when your reported issues are resolved by local authorities. High reputation unlocks new leaderboard badges.',
    relatedArticles: [{ id: 'faq-3', title: 'How are badges earned?' }],
    relatedFeatures: [{ title: 'Leaderboard', href: '/leaderboard' }]
  },
  { 
    id: 'faq-3', 
    category: 'Account Management',
    question: 'How are badges earned?', 
    answer: 'Badges are milestone achievements unlocked by reaching specific reputation thresholds. For example, the "Civic Pioneer" badge is awarded to users who are among the first to report issues in a new neighborhood. Badges are displayed proudly on your public profile.',
    relatedFeatures: [{ title: 'Profile Settings', href: '/settings' }]
  },
  { 
    id: 'faq-4', 
    category: 'Account Management',
    question: 'How do I update my profile?', 
    answer: 'You can update your profile information, including your display name and notification preferences, by visiting the Account Settings page. Changes are saved automatically when you click the save button at the bottom of the form.',
    relatedFeatures: [{ title: 'Account Settings', href: '/settings' }]
  },
  { 
    id: 'faq-5', 
    category: 'Notifications',
    question: 'How do notifications work?', 
    answer: 'Notifications keep you informed about updates to issues you reported or commented on. You can choose to receive alerts via email or push notifications. Customize your preferences in the Account Settings menu.',
    relatedFeatures: [{ title: 'View Notifications', href: '/notifications' }, { title: 'Notification Preferences', href: '/settings' }]
  },
  { 
    id: 'faq-6', 
    category: 'Privacy',
    question: 'Is my personal information public?', 
    answer: 'No. Only your chosen Display Name and earned badges are visible to the public. Your email address, exact home location, and private activity logs remain secure and are never shared with third parties.',
    relatedFeatures: [{ title: 'Privacy Settings', href: '/settings' }]
  },
];

const QUICK_ACTIONS = [
  { title: "Report Issue", description: "Log a new civic issue.", icon: Flag, href: "/report" },
  { title: "Community Feed", description: "Browse community issues.", icon: Rss, href: "/feed" },
  { title: "Leaderboard", description: "See ranking & reputation.", icon: Trophy, href: "/leaderboard" },
  { title: "Notifications", description: "Manage platform alerts.", icon: Bell, href: "/notifications" },
  { title: "Profile", description: "View your public profile.", icon: Trophy, href: "/profile" },
  { title: "Settings", description: "Update preferences & security.", icon: Settings, href: "/settings" },
  { title: "Map", description: "View interactive issue map.", icon: MapIcon, href: "/map" },
  { title: "Admin Dashboard", description: "Platform administration.", icon: Shield, href: "/admin", adminOnly: true },
];

export default function HelpPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted && session) {
          setIsAuthenticated(true);
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();
            
          if (roleData && roleData.role === 'admin') {
            setIsAdmin(true);
          }
        }
      } catch (err) {
        console.error('Help session check failed:', err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    init();
    
    return () => {
      mounted = false;
    };
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    return CATEGORIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return FAQS;
    return FAQS.filter(f => 
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredQuickActions = useMemo(() => {
    const available = QUICK_ACTIONS.filter(q => !q.adminOnly || isAdmin);
    if (!searchQuery.trim()) return available;
    return available.filter(q => 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, isAdmin]);

  const hasResults = filteredCategories.length > 0 || filteredFaqs.length > 0 || filteredQuickActions.length > 0;

  if (isLoading) {
    return <HelpSkeleton />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <HelpError error={error} onRetry={() => setError(null)} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-20 selection:bg-blue-100 dark:selection:bg-blue-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <HelpHeader 
          title="Knowledge Base & Support" 
          description="Search our knowledge base or browse categories below to find the answers you need."
        />
        
        <HelpSearch value={searchQuery} onChange={setSearchQuery} />

        {!hasResults ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <HelpEmpty 
              title="No matching help articles" 
              message="Try adjusting your search terms or browse the categories below."
            />
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Clear Search
              </button>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Browse Categories
              </button>
              <Link 
                href="/"
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredQuickActions.length > 0 && (
              <HelpSection title="Quick Navigation">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredQuickActions.map((action, idx) => (
                    <HelpCard 
                      key={idx}
                      title={action.title} 
                      description={action.description}
                      icon={action.icon}
                      href={!isAuthenticated && action.href !== '/feed' && action.href !== '/map' ? `/login?redirect=${encodeURIComponent(action.href)}` : action.href}
                    />
                  ))}
                </div>
              </HelpSection>
            )}

            {filteredFaqs.length > 0 && (
              <HelpSection title={searchQuery ? "Search Results" : "Interactive FAQ"} description={searchQuery ? "Matching knowledge base articles." : "Detailed articles covering our most common topics."}>
                <FAQList faqs={filteredFaqs} searchQuery={searchQuery} />
              </HelpSection>
            )}

            {filteredCategories.length > 0 && (
              <HelpSection title="Browse Categories" description={searchQuery ? "Matching categories" : "Find articles grouped by specific topics."}>
                <HelpCategories categories={filteredCategories} />
              </HelpSection>
            )}

            {!searchQuery && (
              <HelpSection title="Support Resources">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <HelpCard 
                    title="Community Guidelines" 
                    description="Learn about our rules and policies."
                    icon={ShieldAlert}
                    href="#"
                  />
                  <HelpCard 
                    title="Privacy Policy" 
                    description="How we protect your data."
                    icon={BookOpen}
                    href="#"
                  />
                  <HelpCard 
                    title="Terms of Service" 
                    description="Read our platform terms."
                    icon={BookOpen}
                    href="#"
                  />
                  <HelpCard 
                    title="Contact Support" 
                    description="Reach out to our moderation team."
                    icon={Mail}
                    href="#"
                  />
                  <HelpCard 
                    title="Documentation" 
                    description="Read the full API docs."
                    icon={BookOpen}
                    href="#"
                  />
                  <HelpCard 
                    title="GitHub Repository" 
                    description="View our open source code."
                    icon={BookOpen}
                    href="https://github.com"
                  />
                </div>
              </HelpSection>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
