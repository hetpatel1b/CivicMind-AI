import React, { useState } from 'react';
import { ChevronDown, ThumbsUp, ThumbsDown, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  relatedArticles?: { id: string; title: string }[];
  relatedFeatures?: { title: string; href: string }[];
}

interface FAQListProps {
  faqs: FAQ[];
  searchQuery?: string;
}

const HighlightText = ({ text, highlight }: { text: string; highlight?: string }) => {
  if (!highlight || !text) return <span>{text}</span>;
  
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-indigo-200 dark:bg-indigo-900/80 text-gray-900 dark:text-indigo-100 rounded px-1">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export default function FAQList({ faqs, searchQuery }: FAQListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'up' | 'down'>>({});

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleFeedback = (e: React.MouseEvent, id: string, type: 'up' | 'down') => {
    e.stopPropagation();
    setFeedbackState(prev => ({ ...prev, [id]: type }));
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq) => {
        const isExpanded = expandedId === faq.id;
        
        return (
          <div 
            key={faq.id} 
            className={`bg-white dark:bg-gray-900/50 border rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-xl ${
              isExpanded 
                ? 'border-indigo-300 dark:border-indigo-700/50 shadow-md ring-2 ring-indigo-500/20' 
                : 'border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm'
            }`}
          >
            <button
              id={`faq-button-${faq.id}`}
              aria-expanded={isExpanded}
              aria-controls={`faq-answer-${faq.id}`}
              onClick={() => toggleExpand(faq.id)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-800/50 rounded-3xl transition-colors"
            >
              <div className="flex flex-col gap-1 pr-6">
                <span className="text-xs font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                  {faq.category}
                </span>
                <h3 className={`text-lg font-bold transition-colors duration-300 ${isExpanded ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-900 dark:text-white'}`}>
                  <HighlightText text={faq.question} highlight={searchQuery} />
                </h3>
              </div>
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rotate-180' : 'bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-700'}`}>
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={`faq-answer-${faq.id}`} 
                  role="region" 
                  aria-labelledby={`faq-button-${faq.id}`} 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                      <HighlightText text={faq.answer} highlight={searchQuery} />
                    </div>
                    
                    {((faq.relatedArticles && faq.relatedArticles.length > 0) || 
                      (faq.relatedFeatures && faq.relatedFeatures.length > 0)) && (
                      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {faq.relatedArticles && faq.relatedArticles.length > 0 && (
                            <div>
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Related Articles</h4>
                              <ul className="space-y-2 text-sm">
                                {faq.relatedArticles.map((article) => (
                                  <li key={article.id}>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExpand(article.id);
                                      }}
                                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 transition-colors group"
                                    >
                                      <ArrowRight className="w-4 h-4 mr-1.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                      {article.title}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {faq.relatedFeatures && faq.relatedFeatures.length > 0 && (
                            <div>
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Related Features</h4>
                              <ul className="space-y-2 text-sm">
                                {faq.relatedFeatures.map((feature, idx) => (
                                  <li key={idx}>
                                    <Link 
                                      href={feature.href}
                                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 transition-colors group"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-1.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                                      {feature.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">Was this helpful?</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => handleFeedback(e, faq.id, 'up')}
                          aria-label={`Mark as helpful: ${faq.question}`}
                          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                            feedbackState[faq.id] === 'up' 
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button 
                          onClick={(e) => handleFeedback(e, faq.id, 'down')}
                          aria-label={`Mark as unhelpful: ${faq.question}`}
                          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                            feedbackState[faq.id] === 'down' 
                              ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' 
                              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
