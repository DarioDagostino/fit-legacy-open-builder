import React, { useState, useRef, useEffect } from 'react';
import { MentorService, ChatMessage } from '@/lib/integrations/perplexity';
import { Send, X, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AiMentorChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await MentorService.getMentorResponse([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Mis pensamientos están nublados. Inténtalo de nuevo, guerrero." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-[#0A0A0A] to-[#2A2A2A] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 z-50 border border-white/10"
      >
        <Sparkles className="text-white w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[90vw] h-[550px] rounded-[2rem] flex flex-col shadow-2xl z-50 overflow-hidden bg-white/95 backdrop-blur-2xl border border-black/5"
          >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-black/5 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="bg-[#0A0A0A] p-2 rounded-full">
                  <ShieldCheck className="text-white w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A0A0A] tracking-tight leading-none">Mentor AI</h3>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mt-1">Legado en progreso</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-[#0A0A0A] transition-colors p-2 hover:bg-black/5 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 && (
                <div className="text-center py-12 px-4 flex flex-col items-center justify-center h-full opacity-60">
                  <Sparkles className="w-10 h-10 text-indigo-500/50 mb-4" />
                  <p className="text-sm font-medium text-[#0A0A0A] mb-1">La disciplina es la base de la libertad.</p>
                  <p className="text-xs text-neutral-500">¿En qué puedo orientarte hoy, atleta?</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3 text-[15px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-[#0A0A0A] text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-[#F3F2F8] text-[#0A0A0A] rounded-2xl rounded-tl-sm border border-black/5'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#F3F2F8] px-5 py-4 rounded-2xl rounded-tl-sm border border-black/5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/80 backdrop-blur-md border-t border-black/5">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Dime qué necesitas..."
                  className="w-full bg-[#F3F2F8] border border-black/5 rounded-full pl-5 pr-12 py-3.5 text-[15px] text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-1.5 p-2 bg-[#0A0A0A] disabled:bg-neutral-300 text-white rounded-full hover:bg-neutral-800 transition-colors shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
