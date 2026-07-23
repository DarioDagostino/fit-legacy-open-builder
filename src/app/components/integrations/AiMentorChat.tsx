import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MentorService, ChatMessage, LegacitoMode, MODE_META } from '@/lib/integrations/perplexity';
import { Crosshair, Flame, Send, SlidersHorizontal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBioLedgerStore } from '@/lib/bioledger-store';
import { useWorkoutStore } from '@/lib/store';

const MODE_ICONS: Record<LegacitoMode, React.ReactNode> = {
  tecnico: <Crosshair className="h-3.5 w-3.5" />,
  ajuste: <SlidersHorizontal className="h-3.5 w-3.5" />,
  sargento: <Flame className="h-3.5 w-3.5" />,
};

const MODE_BG: Record<LegacitoMode, string> = {
  tecnico: 'bg-[#E0793C]',
  ajuste: 'bg-[#B86F42]',
  sargento: 'bg-[#7D351F]',
};

const MODE_COPY: Record<LegacitoMode, { hint: string; placeholder: string }> = {
  tecnico: {
    hint: 'Describí tu situación. Analizo la técnica y te marco el siguiente paso.',
    placeholder: 'Describime el ejercicio...',
  },
  ajuste: {
    hint: 'Contame cómo venís y ajustamos carga, volumen o recuperación.',
    placeholder: '¿Cómo estás hoy?',
  },
  sargento: {
    hint: 'Vamos directo: contexto, decisión y la próxima acción.',
    placeholder: 'Decime en qué andás...',
  },
};

export const AiMentorChat: React.FC<{ open?: boolean; onOpenChange?: (open: boolean) => void }> = ({ open, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = (v: boolean) => {
    if (onOpenChange) onOpenChange(v);
    else setInternalOpen(v);
  };
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<LegacitoMode>('tecnico');
  const [modeJustSwitched, setModeJustSwitched] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bioStats = useBioLedgerStore((state) => state.stats);
  const sessions = useBioLedgerStore((state) => state.sessions);
  const routine = useWorkoutStore((state) => state.currentRoutine);

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
      lines.push(`- Ejercicios en rutina actual: ${routine.exercises.map((exercise) => exercise.name).join(', ')}`);
    }

    return lines.length ? lines.join('\n') : undefined;
  }, [bioStats, sessions, routine]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: 'Bienvenido. Contame qué querés trabajar y lo resolvemos paso a paso.' }]);
    }
  }, [isOpen]);

  const handleModeSwitch = (newMode: LegacitoMode) => {
    if (newMode === mode) return;

    setMode(newMode);
    setModeJustSwitched(true);
    window.setTimeout(() => setModeJustSwitched(false), 1800);
  };

  const handleSend = async () => {
    const cleanInput = input.trim();
    if (!cleanInput || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: cleanInput };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await MentorService.getMentorResponse(updatedMessages, mode, athleteContext);
      setMessages((previous) => [...previous, { role: 'assistant', content: response }]);
    } catch {
      setMessages((previous) => [
        ...previous,
        { role: 'assistant', content: 'No pude leer la señal ahora. Probá otra vez en unos segundos.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
        {isOpen && (
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Chat con Legacito"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed inset-0 z-[60] flex h-[100dvh] flex-col overflow-hidden bg-[#12100E] text-[#F9F4EC] shadow-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(720px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-[28px] sm:border sm:border-[#3A3128]"
          >
            <header className="flex items-center justify-between border-b border-[#2C2721] bg-[#0c0c0e]/96 px-4 py-3 backdrop-blur-xl sm:px-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <motion.span
                  key={mode}
                  initial={{ scale: 0.75, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#FFF8F0] ${MODE_BG[mode]}`}
                >
                  {MODE_ICONS[mode]}
                </motion.span>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold tracking-[-0.02em]">Legacito</h2>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#8C8174]">Coach de bolsillo · en línea</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
                className="grid h-10 w-10 place-items-center rounded-full text-[#8C8174] transition-colors hover:bg-[#27211C] hover:text-[#F9F4EC]"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <main ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 sm:px-5">
              <AnimatePresence mode="wait">
                {messages.length === 0 && !modeJustSwitched ? (
                  <motion.div
                    key={`empty-${mode}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="mx-auto flex min-h-[50dvh] max-w-[290px] flex-col items-center justify-center pb-10 text-center"
                  >
                    <span className={`mb-4 grid h-12 w-12 place-items-center rounded-full text-[#FFF8F0] shadow-[0_0_0_8px_rgba(224,121,60,0.07)] ${MODE_BG[mode]}`}>
                      {MODE_ICONS[mode]}
                    </span>
                    <h3 className="text-base font-semibold tracking-[-0.02em]">{MODE_META[mode].title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#887D70]">{MODE_COPY[mode].hint}</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3 pb-4">
                    {modeJustSwitched && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto w-fit rounded-full border border-[#3A3128] bg-[#1A1613] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B9AEA0]"
                      >
                        Modo {MODE_META[mode].label} activado
                      </motion.p>
                    )}

                    {messages.map((message, index) => {
                      const isUser = message.role === 'user';

                      return (
                        <motion.article
                          key={`${message.role}-${index}-${message.content.slice(0, 20)}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.18, delay: Math.min(index * 0.025, 0.12) }}
                          className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[86%] ${isUser ? 'text-right' : 'text-left'}`}>
                            {!isUser && <p className="mb-1 px-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8C8174]">Legacito</p>}
                            <p className={`rounded-[18px] px-3.5 py-3 text-[13px] leading-relaxed ${
                              isUser
                                ? `${MODE_BG[mode]} rounded-br-[4px] text-[#FFF9F1]`
                                : 'rounded-bl-[4px] border border-[#332B24] bg-[#201B17] text-[#E6DED4]'
                            }`}>
                              {message.content}
                            </p>
                          </div>
                        </motion.article>
                      );
                    })}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="rounded-[18px] rounded-bl-[4px] border border-[#332B24] bg-[#201B17] px-3.5 py-3">
                          <div className="flex items-center gap-1.5" aria-label="Legacito está escribiendo">
                            {[0, 1, 2].map((dot) => (
                              <span key={dot} className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#A69A8C]" style={{ animationDelay: `${dot * 120}ms` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </main>

            <footer className="border-t border-[#2C2721] bg-[#171410]/98 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl sm:px-4">
              <div className="mb-3 grid grid-cols-3 rounded-2xl border border-[#302921] bg-[#1F1A16] p-1" role="tablist" aria-label="Modo de Legacito">
                {(Object.keys(MODE_META) as LegacitoMode[]).map((availableMode) => {
                  const isActive = mode === availableMode;

                  return (
                    <button
                      key={availableMode}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleModeSwitch(availableMode)}
                      className={`flex min-h-10 items-center justify-center gap-1.5 rounded-xl px-1 text-[9px] font-bold uppercase tracking-[0.09em] transition-all ${
                        isActive
                          ? `${MODE_BG[availableMode]} text-[#FFF8F0] shadow-[0_6px_16px_rgba(0,0,0,0.2)]`
                          : 'text-[#877B6D] hover:bg-[#28211B] hover:text-[#E8E0D6]'
                      }`}
                    >
                      {MODE_ICONS[availableMode]}
                      <span>{MODE_META[availableMode].label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 rounded-[18px] border border-[#393027] bg-[#24201C] p-1.5 shadow-inner">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      void handleSend();
                    }
                  }}
                  placeholder={MODE_COPY[mode].placeholder}
                  aria-label="Mensaje para Legacito"
                  className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-sm text-[#F5EDE3] outline-none placeholder:text-[#766C61]"
                />
                <motion.button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={!input.trim() || isTyping}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Enviar mensaje"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#FFF8F0] transition-opacity disabled:cursor-not-allowed disabled:opacity-30 ${MODE_BG[mode]}`}
                >
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>
  );
};
