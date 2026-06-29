'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, RefreshCw, Trash2, ShieldAlert } from 'lucide-react';
import { chatWithAssistant, ChatMessage } from '@/services/gemini';
import AILoadingIndicator from '@/components/ui/AILoadingIndicator';
import { usePathname } from 'next/navigation';
import { Card } from '@/design-system/components/Card';
import { Button } from '@/design-system/components/Button';

const SUGGESTED_PROMPTS = [
  "How do I report an issue?",
  "Which department handles potholes?",
  "What does High severity mean?",
  "How do notifications work?"
];

// Helper to format simple markdown text from Gemini
function formatMessage(text: string) {
  // Very basic markdown formatting to handle bold tags and paragraphs
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    
    // Replace **bold** with <strong>bold</strong>
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i} className="mb-2 last:mb-0">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default function AssistantWidget({ embedded = false }: { embedded?: boolean }) {
  const [isOpen, setIsOpen] = useState(embedded);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const pathname = usePathname();
  const hiddenRoutes = ['/login', '/register', '/unauthorized', '/forbidden', '/offline'];
  
  // Clean up ongoing requests if the widget unmounts (e.g., navigating to hidden route)
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);



  const getRouteContext = () => {
    if (pathname === '/') return 'Home page';
    if (pathname === '/dashboard') return 'User Dashboard';
    if (pathname === '/report') return 'Report Issue page';
    if (pathname === '/map') return 'Civic Map page';
    if (pathname === '/feed') return 'Community Feed';
    if (pathname === '/admin') return 'Admin Dashboard';
    if (pathname.startsWith('/issues/')) return 'Issue Details page';
    if (pathname === '/help') return 'Help Center';
    return pathname;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const newMessages = [...messages, { role: 'user', text: trimmed } as ChatMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages,
          message: trimmed,
          routeContext: getRouteContext()
        }),
        signal: abortController.signal
      });

      if (abortController.signal.aborted) return;

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || 'Failed to get response');
      }

      setMessages(prev => [...prev, { role: 'model', text: data.text } as ChatMessage]);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      console.error('Assistant error:', err);
      setError('I am having trouble connecting right now. Please try again.');
      // Remove the last user message so they can retry, or just leave it and let them hit retry.
      // We will leave the user message in the array so they can see what they asked.
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }
  };

  const handleRetry = () => {
    if (messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'user') {
      const history = messages.slice(0, -1);
      setMessages(history);
      handleSend(lastMessage.text);
    }
  };

  const clearConversation = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setError(null);
    setLoading(false);
  };

  if (!embedded && hiddenRoutes.includes(pathname)) {
    return null;
  }

  const currentSuggestedPrompts = embedded ? [
    "How do I report an issue?",
    "Which department handles potholes?",
    "How can I track my report?",
    "What does High severity mean?",
    "How does the leaderboard work?",
    "How does AI help me?"
  ] : SUGGESTED_PROMPTS;

  return (
    <>
      {/* Floating Button */}
      {!embedded && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="primary"
          size="icon"
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
            isOpen 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 scale-90 hover:bg-gray-800' 
              : 'scale-100 hover:scale-105 shadow-blue-500/20'
          }`}
          aria-label={isOpen ? "Close Civic Assistant" : "Open Civic Assistant"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </Button>
      )}

      {/* Chat Window */}
      <Card 
        className={
          embedded 
            ? "relative w-full h-[600px] p-0 flex flex-col overflow-hidden" 
            : `fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] p-0 flex flex-col overflow-hidden shadow-2xl transition-all duration-300 origin-bottom-right ${
                isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
              }`
        }
        aria-hidden={!isOpen && !embedded}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold">Civic AI Assistant</h2>
              <p className="text-blue-100 text-xs">Always here to help</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearConversation}
              className="text-blue-100 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Clear conversation"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50" aria-live="polite">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full text-blue-600 dark:text-blue-400">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">How can I help you today?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  I can answer questions about reporting issues, navigating the platform, or finding resources.
                </p>
                <div className="flex flex-col gap-2 w-full max-w-[280px] mx-auto">
                  {currentSuggestedPrompts.map((prompt, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      onClick={() => handleSend(prompt)}
                      className="w-full justify-start text-left hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-sm' 
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <p>{msg.text}</p>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {formatMessage(msg.text)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                    <AILoadingIndicator size="sm" inline={true} message="Assistant is typing..." />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-xl">
                  <p className="text-sm text-red-600 dark:text-red-400 mb-3 text-center">{error}</p>
                  <button 
                    onClick={handleRetry}
                    className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-300 hover:underline focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-2"
                  >
                    <RefreshCw className="w-4 h-4" /> Retry
                  </button>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              className="flex-1 bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-sm transition-all disabled:opacity-50 text-gray-900 dark:text-white"
            />
            <Button
              type="submit"
              variant="primary"
              size="icon"
              disabled={!input.trim() || loading}
              className="shrink-0"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </Card>
    </>
  );
}
