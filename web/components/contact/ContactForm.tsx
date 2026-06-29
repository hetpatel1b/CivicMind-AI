'use client';

import React, { useState, useEffect } from 'react';
import { Send, Info, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setIsAuthenticated(true);
          setName(data.user.user_metadata?.full_name || '');
          setEmail(data.user.email || '');
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!name.trim() || !email.trim() || !category || !subject.trim() || !message.trim()) {
      setError('Please fill out all required fields.');
      setSuccess(false);
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setSuccess(false);
      return;
    }

    if (message.length < 10) {
      setError('Message must be at least 10 characters long.');
      setSuccess(false);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Simulate demo submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      if (!isAuthenticated) {
        setName('');
        setEmail('');
      }
      setCategory('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  const handleClear = () => {
    if (!isAuthenticated) {
      setName('');
      setEmail('');
    }
    setCategory('');
    setSubject('');
    setMessage('');
    setError(null);
    setSuccess(false);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length < 10) {
      setError('Message must be at least 10 characters long.');
    } else {
      setError(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Submit a Request</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Our team is ready to assist you.</p>
        </div>
        <button 
          type="button" 
          onClick={handleClear}
          className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-3 py-1.5 transition-colors bg-indigo-50/50 dark:bg-indigo-900/20"
        >
          Clear Form
        </button>
      </div>
      
      <div className="mb-8 p-4 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl flex items-start text-indigo-800 dark:text-indigo-300">
        <Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <p className="text-sm font-medium leading-relaxed">
          <strong className="font-bold">Demo Mode:</strong> Support submission is currently unavailable in this demo. Form validations are active, but messages will not be sent to our backend.
        </p>
      </div>

      <AnimatePresence>
        {isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl flex items-center text-emerald-800 dark:text-emerald-300">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-sm font-bold">{name.charAt(0) || 'U'}</span>
              </div>
              <p className="text-sm font-medium">Signed in as <span className="font-bold">{name}</span>. Basic details pre-filled.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Full Name</label>
            <input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={isAuthenticated}
              placeholder="e.g. Jane Doe"
              className={`w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium placeholder:text-gray-400 ${isAuthenticated ? 'opacity-60 cursor-not-allowed' : 'hover:border-gray-300 dark:hover:border-gray-600'}`}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={isAuthenticated}
              placeholder="jane@example.com"
              className={`w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium placeholder:text-gray-400 ${isAuthenticated ? 'opacity-60 cursor-not-allowed' : 'hover:border-gray-300 dark:hover:border-gray-600'}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Request Category</label>
            <select 
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium hover:border-gray-300 dark:hover:border-gray-600 appearance-none"
            >
              <option value="" disabled>Select a category...</option>
              <option value="account">Account & Profile</option>
              <option value="bug">Report a Bug / Glitch</option>
              <option value="feature">Feature Request</option>
              <option value="moderation">Moderation Appeal</option>
              <option value="other">Other Inquiry</option>
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="subject" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Subject</label>
            <input 
              type="text" 
              id="subject" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of your request"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-end">
            <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Detailed Message</label>
            <span className={`text-xs font-bold ${message.length < 10 ? 'text-rose-500' : 'text-gray-400'}`}>
              {message.length} / 500
            </span>
          </div>
          <textarea 
            id="message" 
            rows={5}
            value={message}
            onChange={handleMessageChange}
            maxLength={500}
            placeholder="Please provide as much detail as possible to help us assist you..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 resize-none"
          ></textarea>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/30 rounded-xl flex items-center text-rose-600 dark:text-rose-400"
            >
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              <p className="text-sm font-bold">{error}</p>
            </motion.div>
          )}

          {success && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/30 rounded-xl flex items-center text-emerald-700 dark:text-emerald-400"
            >
              <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" />
              <p className="text-sm font-bold">Message validated successfully! (Demo mode: no data sent).</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 text-white rounded-xl text-base font-bold transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:active:scale-100 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                Submit Request
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
