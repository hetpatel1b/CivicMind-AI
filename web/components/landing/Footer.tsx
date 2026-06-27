import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Globe, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-50 dark:bg-black py-12 border-t border-gray-200 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ShieldAlert className="h-6 w-6 text-blue-600 dark:text-blue-500" aria-hidden="true" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                CivicMind AI
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Empowering citizens and city officials to collaborate efficiently using artificial intelligence.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Globe" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Email" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Phone" className="text-gray-400 hover:text-blue-700 transition-colors">
                <Phone className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/feed" className="hover:text-blue-600 dark:hover:text-blue-400">Live Feed</Link></li>
              <li><Link href="/map" className="hover:text-blue-600 dark:hover:text-blue-400">Interactive Map</Link></li>
              <li><Link href="/report" className="hover:text-blue-600 dark:hover:text-blue-400">Report Issue</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">User Dashboard</Link></li>
            </ul>
          </div>

          <div id="about">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#about" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</Link></li>
              <li><Link href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Press</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} CivicMind AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
