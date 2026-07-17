import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MentorService, ChatMessage, LegacitoMode, MODE_META } from '@/lib/integrations/perplexity';
import { Send, X, Crosshair, SlidersHorizontal, Flame, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBioLedgerStore } from '@/lib/bioledger-store';
import { useWorkoutStore } from '@/lib/store';

const MODE_ICONS: Record<LegacitoMode, React.ReactNode> = {
  tecnico: <Crosshair className="w-3.5 h-3.5" />,
  ajuste: <SlidersHorizontal className="w-3.5 h-3.5" />,
  sargento: <Flame className="w-3.5 h-3.5" />,
};

const MODE_BORDER: Record<LegacitoMode, string> = {
  tecnico: 'border-[#E0793C]',
  ajuste: 'border-[#F2A468]',
  sargento: 'border-[#8A2F14]',
};

const MODE_BG: Record<LegacitoMode, string> = {
  tecnico: 'bg-[#E0793C]',
  ajuste: 'bg-[#F2A468]',
  sargento: 'bg-[#8A2F14]',
};

export const AiMentorChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<LegacitoMode>('tecnico');
  const [modeJustSwitched, setModeJustSwitched] = useState(false);
  const [showModePicker, setShowModePicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bioStats = useBioLedgerStore(s => s.stats);
  const sessions = useBioLedgerStore(s => s.sessions);
  const routine = useWorkoutStore(s => s.currentRoutine);

  const athleteContext = useMemo(() => {
    const lines: string[] = [];
    if (bioStats) {
      lines.push(`- Nivel: ${bioStats.level}`);
      lines.push(`- XP total: ${bioStats.totalXp}`);
      lines.push(`- Racha actual: ${bioStats.currentStreak} días`);
      lines.push(`- Racha record: ${bioStats.longestStreak} días`);
      lines.push(`- Sesiones totales: ${bioStats.totalSessions}`);
      lines.push(`- Coincitos: ${bioStats.coincitos}`);
    }
    if (sessions?.length) {
      const last = sessions[sessions.length - 1];
      const daysSince = Math.floor((Date.now() - new Date(last.date).getTime()) / 86400000);
      lines.push(`- Última sesión: ${daysSince === 0 ? 'hoy' : `hace ${daysSince} día${daysSince > 1 ? 's' : ''}`}`);
    }
    if (routine?.exercises?.length) {
      lines.push(`- Ejercicios en rutina actual: ${routine.exercises.map(e => e.name).join(', ')}`);
    }
    if (!lines.length) return undefined;
    return lines.join('\n');
  }, [bioStats, sessions, routine]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleModeSwitch = (newMode: LegacitoMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    setModeJustSwitched(true);
    setTimeout(() => setModeJustSwitched(false), 2000);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setShowModePicker(false);
    const userMsg: ChatMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await MentorService.getMentorResponse(updatedMessages, mode, athleteContext);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Mis pensamientos están nublados. Inténtalo de nuevo, guerrero." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#16130F] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 z-50 border border-[#E0793C]/40"
      >
        <Flame className="text-[#E0793C] w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[90vw] h-[580px] rounded-[2rem] flex flex-col shadow-2xl z-50 overflow-hidden bg-[#16130F] border border-[#2A2520]"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-3 flex flex-col gap-3 bg-[#1E1A16]/60 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-full ${MODE_BG[mode]}`}>
                    {MODE_ICONS[mode]}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#FAF5EC] tracking-tight leading-none text-sm">Legacito</h3>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-[#6E6558] hover:text-[#FAF5EC] transition-colors p-1.5 hover:bg-[#2A2520] rounded-full">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
              {modeJustSwitched && (
                <div className={`text-center py-2 px-4 rounded-xl border ${MODE_BORDER[mode]} bg-[#1E1A16]`}>
                  <p className="text-[11px] font-medium text-[#FAF5EC]">Modo {MODE_META[mode].label} activado</p>
                </div>
              )}

              {messages.length === 0 && !modeJustSwitched && (
                <div className="text-center py-10 px-4 flex flex-col items-center justify-center h-full">
                  <div className={`p-3 rounded-full ${MODE_BG[mode]} mb-4`}>
                    {MODE_ICONS[mode]}
                  </div>
                  <p className="text-sm font-medium text-[#FAF5EC] mb-2">{MODE_META[mode].title}</p>
                  <p className="text-xs text-[#6E6558] leading-relaxed">{MODE_META[mode].greeting}</p>
                </div>
              )}

              {messages.map((msg, i) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[88%] px-4 py-2.5 text-[14px] leading-relaxed ${
                      isUser
                        ? `${MODE_BG[mode]} text-[#FAF5EC] rounded-2xl rounded-tr-sm`
                        : 'bg-[#2A2520] text-[#FAF5EC] rounded-2xl rounded-tl-sm border border-[#3A3228]'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#2A2520] px-4 py-3 rounded-2xl rounded-tl-sm border border-[#3A3228] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#6E6558] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#6E6558] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#6E6558] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input + Model picker */}
            <div className="p-4 pt-3 pb-4 bg-[#1E1A16]/80 backdrop-blur-md border-t border-[#2A2520] relative">
              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => setShowModePicker(!showModePicker)}
                  className={`flex shrink-0 items-center gap-1.5 px-3 py-2 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                    MODE_BG[mode]} text-[#FAF5EC] shadow-lg hover:opacity-85`}
                >
                  {MODE_ICONS[mode]}
                  {MODE_META[mode].label}
                  <ChevronUp className={`w-3 h-3 transition-transform ${showModePicker ? 'rotate-180' : ''}`} />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    mode === 'sargento' ? 'Decime, en qué andás...' :
                    mode === 'ajuste' ? 'Cómo estás hoy?' :
                    'Describime el ejercicio...'
                  }
                  className="flex-1 bg-[#2A2520] border border-[#3A3228] rounded-full pl-4 pr-11 py-2.5 text-[14px] text-[#FAF5EC] placeholder:text-[#6E6558] focus:outline-none focus:ring-2 focus:ring-[#E0793C]/30 transition-all shadow-inner"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`absolute right-3.5 p-1.5 ${MODE_BG[mode]} disabled:bg-[#2A2520] text-[#FAF5EC] rounded-full hover:opacity-80 transition-all shadow-md disabled:opacity-40`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mode picker dropdown */}
              <AnimatePresence>
                {showModePicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.12 }}
                    className="absolute bottom-full left-4 mb-2 flex gap-1 rounded-2xl border border-[#2A2520] bg-[#1E1A16] p-1.5 shadow-2xl"
                  >
                    {(Object.keys(MODE_META) as LegacitoMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => { handleModeSwitch(m); setShowModePicker(false); }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                          mode === m
                            ? `${MODE_BG[m]} text-[#FAF5EC] shadow-lg`
                            : 'text-[#6E6558] hover:text-[#FAF5EC] hover:bg-[#2A2520]'
                        }`}
                      >
                        {MODE_ICONS[m]}
                        {MODE_META[m].label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
