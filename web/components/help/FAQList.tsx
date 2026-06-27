import React, { useState } from 'react';
import { ChevronDown, ThumbsUp, ThumbsDown, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

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
          <span key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-gray-900 dark:text-yellow-100 rounded px-0.5">
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
            className={`bg-white dark:bg-gray-900 border rounded-2xl overflow-hidden transition-all duration-300 ${
              isExpanded 
                ? 'border-blue-200 dark:border-blue-900/50 shadow-md ring-1 ring-blue-500/10' 
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
            }`}
          >
            <button
              id={`faq-button-${faq.id}`}
              aria-expanded={isExpanded}
              aria-controls={`faq-answer-${faq.id}`}
              onClick={() => toggleExpand(faq.id)}
              className="w-full flex items-start justify-between p-6 text-left focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-800/50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset rounded-2xl"
            >
              <div className="flex flex-col gap-2 pr-6">
                <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                  {faq.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  <HighlightText text={faq.question} highlight={searchQuery} />
                </h3>
              </div>
              <div className={`mt-1 flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </div>
            </button>

            {isExpanded && (
              <div 
                id={`faq-answer-${faq.id}`} 
                role="region" 
                aria-labelledby={`faq-button-${faq.id}`} 
                className="px-6 pb-6 animate-in slide-in-from-top-2 fade-in duration-300"
              >
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none">
                  <HighlightText text={faq.answer} highlight={searchQuery} />
                </div>
                
                {((faq.relatedArticles && faq.relatedArticles.length > 0) || 
                  (faq.relatedFeatures && faq.relatedFeatures.length > 0)) && (
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {faq.relatedArticles && faq.relatedArticles.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Related Articles</h4>
                          <ul className="space-y-2 text-sm">
                            {faq.relatedArticles.map((article) => (
                              <li key={article.id}>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpand(article.id);
                                  }}
                                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                                >
                                  <ArrowRight className="w-3 h-3 mr-1.5" aria-hidden="true" />
                                  {article.title}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {faq.relatedFeatures && faq.relatedFeatures.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Related Features</h4>
                          <ul className="space-y-2 text-sm">
                            {faq.relatedFeatures.map((feature, idx) => (
                              <li key={idx}>
                                <Link 
                                  href={feature.href}
                                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1.5" aria-hidden="true" />
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
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Was this helpful?</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => handleFeedback(e, faq.id, 'up')}
                      aria-label={`Mark as helpful: ${faq.question}`}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                        feedbackState[faq.id] === 'up' 
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${feedbackState[faq.id] === 'up' ? 'fill-current' : ''}`} aria-hidden="true" />
                      Yes
                    </button>
                    <button 
                      onClick={(e) => handleFeedback(e, faq.id, 'down')}
                      aria-label={`Mark as not helpful: ${faq.question}`}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${
                        feedbackState[faq.id] === 'down' 
                          ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <ThumbsDown className={`w-4 h-4 ${feedbackState[faq.id] === 'down' ? 'fill-current' : ''}`} aria-hidden="true" />
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
