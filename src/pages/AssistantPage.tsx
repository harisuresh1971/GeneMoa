import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2, Trash2, Copy } from 'lucide-react';
import api from '../lib/api';
import ReactMarkdown from 'react-markdown';
import { getAssistantResponse } from '../services/geminiService';

export const AssistantPage = () => {
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: 'Hello! I am the GeneMOA Intelligence Assistant. How can I help you with your drug discovery research today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const text = await getAssistantResponse(input, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I am having trouble connecting to my knowledge base right now.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-50">
      <div className="flex-1 overflow-y-auto p-8 space-y-8" ref={scrollRef}>
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                msg.role === 'assistant' ? 'bg-primary text-white' : 'bg-white text-slate-900 border border-slate-200'
              }`}>
                {msg.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
              </div>
              
              <div className={`max-w-[80%] p-6 rounded-3xl shadow-sm ${
                msg.role === 'assistant' ? 'bg-white text-slate-800' : 'bg-primary text-white'
              }`}>
                <div className="prose prose-slate max-w-none prose-sm">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <div className="mt-4 flex items-center gap-3 opacity-0 hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Synthesizing Response...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about MOA prediction or bioinformatics..."
            className="w-full bg-slate-50 border border-slate-200 rounded-[24px] py-5 pl-8 pr-20 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-lg font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        <div className="max-w-4xl mx-auto mt-4 flex gap-3 overflow-x-auto pb-2">
          {[
            "Explain HDAC inhibitors",
            "Interpret my last prediction",
            "How does SHAP work?",
            "Compare models"
          ].map((prompt, i) => (
            <button 
              key={i}
              onClick={() => setInput(prompt)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all whitespace-nowrap flex items-center gap-2"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
