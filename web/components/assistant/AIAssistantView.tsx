'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, RefreshCw, Trash2, ShieldAlert, Sparkles, MapPin, Target, Trophy, Info, FileText } from 'lucide-react';
import { ChatMessage } from '@/services/gemini';
import AILoadingIndicator from '@/components/ui/AILoadingIndicator';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTED_PROMPTS = [
  { text: "Report an issue", icon: MapPin },
  { text: "Find nearby reports", icon: Target },
  { text: "How reputation works", icon: Trophy },
  { text: "Explain AI analysis", icon: Sparkles },
  { text: "Privacy policy", icon: ShieldAlert },
  { text: "Track report", icon: FileText }
];

function formatMessage(text: string) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i} className="mb-2 last:mb-0">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold text-white">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default function AIAssistantView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length === 0) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, loading]);

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
          routeContext: 'AI Assistant Page'
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

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {/* Hero Section */}
      {messages.length === 0 && (
        <div className="flex-1 overflow-y-auto px-4 py-12 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.2)] rounded-full flex items-center justify-center text-indigo-400">
              <Sparkles className="w-10 h-10 drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
              Civic AI Assistant
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
              Your intelligent civic companion. Ask questions, understand reports, learn platform features, and receive instant guidance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
              {[
                { title: 'Explain platform', icon: Info },
                { title: 'Guide reporting', icon: MapPin },
                { title: 'Track reports', icon: Target },
                { title: 'Answer civic questions', icon: MessageSquare }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#0a0f1c]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-inner hover:bg-white/5 hover:border-white/10 transition-all group"
                >
                  <div className="w-10 h-10 mb-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-left">{card.title}</h3>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  onClick={() => handleSend(prompt.text)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-indigo-200 border border-indigo-500/20 hover:border-indigo-500/40 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <prompt.icon className="w-4 h-4" /> {prompt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Active Chat Area */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-8 pb-12">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-500/30 rounded-xl shadow-inner flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-5 h-5 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                </div>
                <div>
                  <h2 className="text-white font-bold">Civic AI Assistant</h2>
                  <p className="text-xs font-black uppercase tracking-wider text-gray-500">Live Session</p>
                </div>
              </div>
              <button
                onClick={clearConversation}
                className="px-4 py-2 bg-white/5 hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 rounded-xl border border-white/5 hover:border-rose-500/20 text-sm font-bold transition-all shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            </div>

            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-6 py-4 shadow-inner ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white border border-indigo-500/50 rounded-br-sm' 
                        : 'bg-[#0a0f1c]/80 backdrop-blur-md text-gray-300 border border-white/10 rounded-bl-sm'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <p className="font-medium">{msg.text}</p>
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none text-gray-300 prose-p:leading-relaxed">
                        {formatMessage(msg.text)}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/10 rounded-2xl rounded-bl-sm px-6 py-4 shadow-inner flex items-center gap-3">
                  <AILoadingIndicator size="sm" inline={true} message="AI is thinking..." />
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl shadow-inner"
              >
                <p className="text-sm font-bold text-rose-400 mb-4 text-center">{error}</p>
                <button 
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(244,63,94,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                >
                  <RefreshCw className="w-4 h-4" /> Retry Message
                </button>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-4 md:p-6 bg-[#050505]/80 backdrop-blur-xl border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-3 relative"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI Assistant..."
              disabled={loading}
              className="flex-1 bg-[#0a0f1c] border border-white/10 focus:border-indigo-500 focus:bg-[#0a0f1c] focus:ring-1 focus:ring-indigo-500/50 rounded-2xl px-5 py-4 text-[15px] font-medium transition-all disabled:opacity-50 text-white shadow-inner placeholder:text-gray-600 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:shadow-none disabled:hover:bg-indigo-600 transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest px-2 gap-4">
            <div className="flex items-center gap-4">
              <a href="/help" className="hover:text-indigo-400 transition-colors">Help Center</a>
              <a href="/contact" className="hover:text-indigo-400 transition-colors">Contact Humans</a>
            </div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3 h-3" />
              <span>AI can make mistakes. Verify important info.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
