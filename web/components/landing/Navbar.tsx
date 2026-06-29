'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShieldAlert, ChevronDown, User as UserIcon, Building, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/design-system/components/Button';
import { createClient } from '@/lib/supabase-browser';
import { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        setAuthChecking(false);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside for mobile menu and portal dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (portalRef.current && !portalRef.current.contains(event.target as Node)) {
        setIsPortalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsPortalOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Intersection Observer for Active Links
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['home', 'features', 'how-it-works', 'about', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsPortalOpen(false);
  };

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#features', label: 'Features', id: 'features' },
    { href: '#how-it-works', label: 'How It Works', id: 'how-it-works' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <nav 
      ref={navRef} 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-2" 
          : "bg-transparent py-4"
      )}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" onClick={handleLinkClick} className="flex items-center gap-2.5 focus:outline-none group">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                <ShieldAlert className="h-4 w-4 text-indigo-400" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                CivicMind AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.id}
                href={link.href} 
                className={cn(
                  "font-medium transition-all focus:outline-none rounded-full px-4 py-1.5 text-sm relative group",
                  activeSection === link.id 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {activeSection !== link.id && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity -z-10" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {authChecking ? (
              <div className="w-24 h-8 bg-white/5 animate-pulse rounded-md"></div>
            ) : user ? (
              <Link 
                href="/dashboard" 
                className={buttonVariants('primary', 'sm', 'shadow-[0_0_15px_rgba(79,70,229,0.4)] font-semibold px-6 hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] !bg-indigo-600 hover:!bg-indigo-500 border-transparent text-white')}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <div className="relative" ref={portalRef}>
                  <button 
                    onClick={() => setIsPortalOpen(!isPortalOpen)}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
                    aria-expanded={isPortalOpen}
                    aria-haspopup="true"
                  >
                    Portal
                    <motion.div animate={{ rotate: isPortalOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isPortalOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl p-1 z-50 overflow-hidden"
                      >
                        <Link 
                          href="/login"
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                            <UserIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Citizen Login</div>
                            <div className="text-xs text-gray-400">Access your citizen account</div>
                          </div>
                        </Link>
                        
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        
                        <Link 
                          href="/admin/login"
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Admin Portal</div>
                            <div className="text-xs text-gray-400">Moderator & Admin access</div>
                          </div>
                        </Link>

                        <div className="h-px bg-white/10 my-1 mx-2" />
                        
                        <Link 
                          href="/demo/citizen"
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
                            <UserIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Citizen Demo</div>
                            <div className="text-xs text-gray-400">Experience as a citizen</div>
                          </div>
                        </Link>

                        <Link 
                          href="/demo/admin"
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/30 transition-colors">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Admin Demo</div>
                            <div className="text-xs text-gray-400">Experience as an admin</div>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <Link 
                  href="/register" 
                  className={buttonVariants('primary', 'sm', 'shadow-[0_0_15px_rgba(79,70,229,0.3)] font-semibold hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] !bg-indigo-600 hover:!bg-indigo-500 border-transparent text-white')}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2 bg-white/5 border border-white/10"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.id}
                  href={link.href} 
                  onClick={handleLinkClick} 
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-medium focus:outline-none transition-colors",
                    activeSection === link.id
                      ? 'text-white bg-white/10 border border-white/5'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3 pb-2">
                {!authChecking && user ? (
                  <Link 
                    href="/dashboard" 
                    onClick={handleLinkClick}
                    className={buttonVariants('primary', 'md', 'w-full !bg-indigo-600 font-bold border-transparent text-white')}
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      onClick={handleLinkClick}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      Citizen Login
                    </Link>
                    <Link 
                      href="/register" 
                      onClick={handleLinkClick}
                      className={buttonVariants('primary', 'md', 'w-full !bg-indigo-600 font-bold border-transparent text-white')}
                    >
                      Create an account
                    </Link>
                    
                    <div className="flex items-center gap-4 my-2">
                      <div className="h-px bg-white/10 flex-1" />
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Restricted</span>
                      <div className="h-px bg-white/10 flex-1" />
                    </div>
                    
                    <Link 
                      href="/admin/login" 
                      onClick={handleLinkClick}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 hover:text-indigo-200 font-medium rounded-xl transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Admin Portal
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

