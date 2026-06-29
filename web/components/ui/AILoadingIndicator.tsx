import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AILoadingIndicatorProps {
  message?: string;
  messages?: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  inline?: boolean;
}

export default function AILoadingIndicator({ 
  message = "AI is thinking...", 
  messages,
  size = 'md',
  className = '',
  inline = false
}: AILoadingIndicatorProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages]);

  const displayMessage = messages ? messages[currentMessageIndex] : message;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (inline) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="relative flex items-center justify-center">
          <Loader2 className={`${sizeClasses[size]} text-indigo-500 animate-spin opacity-50`} />
          <Sparkles className={`w-3 h-3 text-purple-400 absolute animate-pulse`} />
        </div>
        <AnimatePresence mode="wait">
          <motion.span 
            key={displayMessage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`${textClasses[size]} text-gray-400 font-medium tracking-wide`}
          >
            {displayMessage}
          </motion.span>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative flex items-center justify-center p-3">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-xl rounded-full animate-pulse" />
        <div className="relative flex items-center justify-center">
          <Loader2 className={`${sizeClasses[size]} text-indigo-400 animate-spin`} />
          <Sparkles className={`absolute w-1/2 h-1/2 text-purple-300 animate-pulse`} />
        </div>
      </div>
      <div className="h-6 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p 
            key={displayMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`${textClasses[size]} text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold tracking-widest uppercase`}
          >
            {displayMessage}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
