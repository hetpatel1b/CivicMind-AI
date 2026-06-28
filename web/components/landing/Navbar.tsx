'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
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

    // Observe specific sections
    const sections = ['home', 'features', 'how-it-works', 'stats', 'about', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#features', label: 'Features', id: 'features' },
    { href: '#how-it-works', label: 'How It Works', id: 'how-it-works' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" onClick={handleLinkClick} className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-1">
              <ShieldAlert className="h-8 w-8 text-blue-600 dark:text-blue-500" aria-hidden="true" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                CivicMind AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.id}
                href={link.href} 
                className={`font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md px-2 py-1 ${
                  activeSection === link.id 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link 
              href="/admin/login" 
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md px-2 lg:px-3 py-2 transition-colors"
            >
              Admin Login
            </Link>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden lg:block"></div>
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md px-2 lg:px-3 py-2 transition-colors"
            >
              User Login
            </Link>
            <Link 
              href="/register" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-4 py-2 rounded-xl font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-black"
            >
              User Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden absolute w-full bg-white dark:bg-[#020817] border-b border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
          {navLinks.map((link) => (
            <Link 
              key={link.id}
              href={link.href} 
              onClick={handleLinkClick} 
              className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                activeSection === link.id
                  ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
                  : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2 px-3 pb-2">
            <Link 
              href="/login" 
              onClick={handleLinkClick}
              className="block text-center w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              User Login
            </Link>
            <Link 
              href="/register" 
              onClick={handleLinkClick}
              className="block text-center w-full px-4 py-2 bg-blue-600 text-white rounded-xl text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-[#020817]"
            >
              User Register
            </Link>
            <Link 
              href="/admin/login" 
              onClick={handleLinkClick}
              className="block text-center w-full px-4 py-2 mt-2 border border-transparent rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
