'use client';

import React, { useState, useEffect } from 'react';
import { Send, Info, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';

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
    }, 800);
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
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm h-full relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Send us a message</h3>
        <button 
          type="button" 
          onClick={handleClear}
          className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1 transition-colors"
        >
          Clear Form
        </button>
      </div>
      
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl flex items-start text-blue-800 dark:text-blue-300">
        <Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <p className="text-sm leading-relaxed">
          <strong>Demo Mode:</strong> Support submission is currently unavailable in this demo. Form validations are active, but messages will not be sent to our backend.
        </p>
      </div>

      {isAuthenticated && (
        <div className="mb-6 p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl flex items-center text-green-800 dark:text-green-300">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-sm font-bold">{name.charAt(0) || 'U'}</span>
          </div>
          <p className="text-sm font-medium">Signed in as {name}. Basic details pre-filled.</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-xl text-green-700 dark:text-green-400 text-sm font-medium">
          Message validated successfully! (Demo mode: no data was actually sent).
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Name *</label>
            <input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={isAuthenticated}
              placeholder="Jane Doe"
              className={`w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${isAuthenticated ? 'opacity-70 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email *</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={isAuthenticated}
              placeholder="jane@example.com"
              className={`w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${isAuthenticated ? 'opacity-70 cursor-not-allowed' : ''}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Category *</label>
            <select 
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none"
            >
              <option value="">Select a category</option>
              <option value="support">General Support</option>
              <option value="bug">Report Bug</option>
              <option value="feature">Feature Request</option>
              <option value="feedback">Community Feedback</option>
            </select>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Subject *</label>
            <input 
              type="text" 
              id="subject" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of your message"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-white">Message *</label>
            <span className={`text-xs font-medium ${message.length < 10 && message.length > 0 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
              {message.length} / 500
            </span>
          </div>
          <textarea 
            id="message" 
            rows={5}
            maxLength={500}
            value={message}
            onChange={handleMessageChange}
            placeholder="How can we help you today?"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              Processing...
              <Loader2 className="w-5 h-5 ml-2 animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              Send Message
              <Send className="w-5 h-5 ml-2" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
