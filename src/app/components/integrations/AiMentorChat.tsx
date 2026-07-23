import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, Mic, PanelLeftOpen, Plus, SendHorizontal, X } from 'lucide-react';
import { Legacito, LegacitoActionButton } from '@fit-legacy/shared';
import { MentorService, ChatMessage, LegacitoMode, MODE_META } from '@/lib/integrations/perplexity';
import { useBioLedgerStore } from '@/lib/bioledger-store';
import { useWorkoutStore } from '@/lib/store';

const MODE_CHIP: Record<LegacitoMode, { active: string; marker: string }> = {
  tecnico: {
    active: 'border-zinc-200 bg-zinc-100 text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_5px_12px_rgba(0,0,0,0.2)]',
    marker: 'bg-zinc-900',
  },
  ajuste: {
    active: 'border-zinc-400 bg-zinc-500 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_5px_12px_rgba(0,0,0,0.24)]',
    marker: 'bg-zinc-100',
  },
  sargento: {
    active: 'border-zinc-600 bg-zinc-800 text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_5px_12px_rgba(0,0,0,0.3)]',
    marker: 'bg-zinc-300',
  },
};

const SUGGESTIONS = [
  'Forjar mi entrenamiento',
  'Optimizar mi nutrición',
  'Planificar mi semana',
];

const SUBTITLES = [
  'Volviste hoy: retomemos sin perder contexto.',
  'Elegí una referencia o escribí una duda: salimos con una acción.',
  'Decime el objetivo y armamos el siguiente paso.',
];

export const AiMentorChat: React.FC<{ open?: boolean; onOpenChange?: (open: boolean) => void }> = ({
  open,
  onOpenChange,
}) => {
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
  const [modeOpen, setModeOpen] = useState(false);
  const [showPro, setShowPro] = useState(true);
  const [subIdx, setSubIdx] = useState(0);
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
      lines.push(`- Sesiones totales: ${bioStats.totalSessions}`);
    }
    if (sessions?.length) {
      const last = sessions[sessions.length - 1];
      const daysSince = Math.floor((Date.now() - new Date(last.date).getTime()) / 86400000);
      lines.push(`- Última sesión: ${daysSince === 0 ? 'hoy' : `hace ${daysSince} día${daysSince > 1 ? 's' : ''}`}`);
    }
    if (routine?.exercises?.length) {
      lines.push(`- Ejercicios en rutina actual: ${routine.exercises.map((e) => e.name).join(', ')}`);
    }
    return lines.length ? lines.join('\n') : undefined;
  }, [bioStats, sessions, routine]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen || messages.length > 0) return;
    const id = window.setInterval(() => setSubIdx((i) => (i + 1) % SUBTITLES.length), 4200);
    return () => window.clearInterval(id);
  }, [isOpen, messages.length]);

  const handleSend = async (text?: string) => {
    const cleanInput = (text ?? input).trim();
    if (!cleanInput || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: cleanInput };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setModeOpen(false);
    setIsTyping(true);

    try {
      const response = await MentorService.getMentorResponse(updated, mode, athleteContext);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'No pude leer la señal ahora. Probá otra vez en unos segundos.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const ui = (
    <>
      {/* Floating Legacito — same as Legacy IA */}
      {!isOpen && (
        <div
          className="fixed z-[99990]"
          style={{ bottom: 'calc(5.25rem + env(safe-area-inset-bottom, 0px))', right: '0.75rem' }}
        >
          <div className="builder-legacito-glitch relative drop-shadow-[0_16px_34px_rgba(74,55,24,0.18)] sm:bottom-0">
            <LegacitoActionButton
              onClick={() => setIsOpen(true)}
              mood="thinking"
              size={66}
              label="Consultar a Legacito"
              buttonSizeClass="size-20 sm:size-24"
              className="rounded-full"
              glowColor="radial-gradient(circle at 45% 36%, rgba(74, 55, 24, 0.20), rgba(166, 138, 78, 0.10) 48%, transparent 76%)"
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar Legacito"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[99998] bg-black/45 backdrop-blur-[3px]"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Legacito dock"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[99999] flex h-[100dvh] items-end justify-center sm:items-center sm:justify-end sm:p-5"
            >
              <div className="relative h-full w-full sm:h-[min(826px,calc(100dvh-2.5rem))] sm:w-[min(389px,calc(100vw-2.5rem))]">
                {/* Outer phone bezel */}
                <div
                  className="relative flex h-full w-full flex-col overflow-hidden sm:rounded-[3.25rem] sm:border sm:p-[7px]"
                  style={{
                    background: '#151716',
                    borderColor: '#2D302E',
                    boxShadow:
                      '0 34px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[3px] top-28 hidden h-16 w-[3px] rounded-l-full sm:block"
                    style={{ background: '#2D302E', boxShadow: 'inset 1px 0 rgba(255,255,255,0.08)' }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-[3px] top-36 hidden h-24 w-[3px] rounded-r-full sm:block"
                    style={{ background: '#2D302E', boxShadow: 'inset -1px 0 rgba(255,255,255,0.08)' }}
                  />

                  {/* Inner screen */}
                  <div
                    className="relative flex min-h-0 flex-1 flex-col overflow-hidden sm:rounded-[2.78rem] sm:border"
                    style={{
                      background: '#080a09',
                      borderColor: '#272A28',
                      boxShadow: '0 22px 50px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.035)',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 18%, rgba(255,255,255,0.07), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.035), transparent 42%)',
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                    />

                    {/* Dynamic island */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-3 z-30 flex h-6 w-[112px] -translate-x-1/2 items-center justify-end rounded-full pr-3"
                      style={{ background: '#020302', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.04)' }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: '#18272A', boxShadow: '0 0 7px rgba(99,205,219,0.45)' }}
                      />
                    </div>

                    <div className="absolute left-3 top-3 z-40">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full border text-white/50 hover:bg-white/10 hover:text-white"
                        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}
                        aria-label="Historial"
                      >
                        <PanelLeftOpen size={16} strokeWidth={1.8} />
                      </button>
                    </div>
                    <div className="absolute right-3 top-3 z-40">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border text-white/50 hover:bg-white/10 hover:text-white"
                        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}
                        aria-label="Cerrar chat"
                      >
                        <X size={16} strokeWidth={1.8} />
                      </button>
                    </div>

                    <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-4 pt-12 sm:px-5 sm:pb-5 sm:pt-14">
                      <p className="mb-1 text-center text-[7px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                        Mentor y Coach
                      </p>

                      <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                        {messages.length === 0 ? (
                          <div className="flex min-h-full flex-col items-center justify-center px-2 pb-6 text-center sm:px-6">
                            <motion.h3
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="max-w-[390px] text-balance font-black uppercase leading-[0.93] tracking-[-0.06em] text-[#F8F6F0]"
                              style={{ fontSize: 'clamp(2.1rem, 8vw, 3rem)' }}
                            >
                              ¿En qué puedo ayudarte hoy?
                            </motion.h3>
                            <p className="mt-5 max-w-[340px] text-balance text-[clamp(0.95rem,3.5vw,1.1rem)] font-semibold leading-[1.35] text-[#AEB5B0]">
                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={SUBTITLES[subIdx]}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  className="inline-block"
                                >
                                  {SUBTITLES[subIdx]}
                                </motion.span>
                              </AnimatePresence>
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4 px-1 py-2">
                            {messages.map((msg, i) => {
                              const isUser = msg.role === 'user';
                              return (
                                <div key={`${msg.role}-${i}`} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                  <div
                                    className={`max-w-[88%] px-4 py-3 text-[14px] leading-relaxed ${
                                      isUser
                                        ? 'rounded-[18px] rounded-tr-[4px] text-[#111715]'
                                        : 'rounded-[18px] rounded-tl-[4px] text-[#f6f3ed]'
                                    }`}
                                    style={{
                                      background: isUser ? 'rgba(232, 220, 196, 0.92)' : 'rgba(255,255,255,0.055)',
                                      border: isUser
                                        ? '1px solid rgba(196, 173, 124, 0.18)'
                                        : '1px solid rgba(255,255,255,0.09)',
                                    }}
                                  >
                                    {msg.content}
                                  </div>
                                </div>
                              );
                            })}
                            {isTyping && (
                              <div className="flex justify-start">
                                <div
                                  className="rounded-[18px] rounded-tl-[4px] px-4 py-3"
                                  style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.09)' }}
                                >
                                  <div className="flex gap-1.5" aria-label="Legacito está escribiendo">
                                    {[0, 1, 2].map((d) => (
                                      <span
                                        key={d}
                                        className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40"
                                        style={{ animationDelay: `${d * 120}ms` }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 space-y-2.5">
                        {showPro && (
                          <div
                            className="flex items-center justify-between rounded-[1.15rem] px-3.5 py-2.5"
                            style={{ border: '1px solid #272B29', background: 'rgba(255,255,255,0.015)' }}
                          >
                            <span className="text-[11px] font-black text-[#F8F6F0] sm:text-[13px]">Legacy Pro</span>
                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] font-black text-[#F8F6F0] sm:text-[13px]">Actualizar</span>
                              <button
                                type="button"
                                onClick={() => setShowPro(false)}
                                className="grid h-7 w-7 place-items-center rounded-full"
                                style={{ border: '1px solid #2C302E', color: '#8E938F' }}
                                aria-label="Cerrar Legacy Pro"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        )}

                        {messages.length === 0 && (
                          <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none]">
                            {SUGGESTIONS.map((label) => (
                              <button
                                key={label}
                                type="button"
                                onClick={() => void handleSend(label)}
                                className="shrink-0 rounded-full px-3.5 py-2 text-[10px] font-bold text-[#BCC1BD] transition-all hover:-translate-y-0.5 hover:text-[#F8F6F0] sm:text-[11px]"
                                style={{ border: '1px solid #272B29', background: 'rgba(255,255,255,0.01)' }}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Composer */}
                        <div className="rounded-[1.8rem] p-1.5 sm:p-2" style={{ border: '1px solid #292D2B', background: '#0B0D0C' }}>
                          <div
                            className="flex min-h-[64px] items-center gap-2 rounded-[1.35rem] px-2.5 sm:min-h-[72px] sm:px-3"
                            style={{ border: '1px solid #171A18', background: '#080908' }}
                          >
                            <button
                              type="button"
                              aria-label="Agregar contexto"
                              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#D4D8D5] hover:bg-white/[0.03] sm:h-11 sm:w-11"
                              style={{ border: '1px solid #292D2B' }}
                            >
                              <Plus className="h-5 w-5" />
                            </button>

                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setModeOpen((v) => !v)}
                                className={`flex h-10 items-center gap-1.5 rounded-full border px-3 text-[10px] font-black uppercase tracking-[0.12em] sm:h-11 sm:text-[11px] ${MODE_CHIP[mode].active}`}
                                aria-expanded={modeOpen}
                              >
                                <span className={`size-1.5 rounded-full ${MODE_CHIP[mode].marker}`} />
                                <span>{MODE_META[mode].label}</span>
                                <ChevronUp className={`h-3.5 w-3.5 transition-transform ${modeOpen ? 'rotate-180' : ''}`} />
                              </button>
                              <AnimatePresence>
                                {modeOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                    className="absolute bottom-full left-0 z-30 mb-2 grid w-32 gap-1 rounded-2xl border border-zinc-700/80 bg-zinc-950/95 p-1.5 shadow-[0_18px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                                  >
                                    {(Object.keys(MODE_META) as LegacitoMode[]).map((m) => (
                                      <button
                                        key={m}
                                        type="button"
                                        onClick={() => {
                                          setMode(m);
                                          setModeOpen(false);
                                        }}
                                        className={`flex min-h-9 items-center gap-2 rounded-xl border px-2.5 text-left text-[9px] font-black uppercase tracking-[0.1em] ${
                                          mode === m
                                            ? MODE_CHIP[m].active
                                            : 'border-transparent text-zinc-500 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-200'
                                        }`}
                                      >
                                        <span className={`size-1.5 shrink-0 rounded-full ${MODE_CHIP[m].marker}`} />
                                        <span>{MODE_META[m].label}</span>
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <input
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  void handleSend();
                                }
                              }}
                              placeholder="Armemos un plan..."
                              disabled={isTyping}
                              aria-label="Mensaje para Legacito"
                              className="min-w-0 flex-1 bg-transparent py-2 text-[14px] font-semibold text-[#F8F6F0] outline-none placeholder:text-white/25"
                            />

                            <button
                              type="button"
                              aria-label="Voz"
                              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#E6E8E5] hover:bg-white/[0.04] sm:h-10 sm:w-10"
                            >
                              <Mic className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleSend()}
                              disabled={!input.trim() || isTyping}
                              aria-label="Enviar mensaje"
                              className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all hover:-translate-y-0.5 disabled:opacity-40 sm:h-11 sm:w-11"
                              style={{ background: '#201A10', color: '#9B937F' }}
                            >
                              <SendHorizontal className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legacito peeking outside phone */}
                <div className="pointer-events-none absolute -bottom-3 -left-12 z-20 hidden sm:block">
                  <Legacito size={78} mood="thinking" className="drop-shadow-[0_14px_28px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .builder-legacito-glitch { isolation: isolate; }
        .builder-legacito-glitch::before,
        .builder-legacito-glitch::after {
          content: "";
          position: absolute;
          inset: 16px 14px;
          z-index: -1;
          border-radius: 999px;
          opacity: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          filter: blur(1px);
          animation: builder-legacito-soft-glitch 5.8s steps(1, end) infinite;
        }
        .builder-legacito-glitch::before {
          background: linear-gradient(90deg, transparent 0 18%, rgba(166,138,78,0.34) 18% 28%, transparent 28% 62%, rgba(196,173,124,0.22) 62% 70%, transparent 70% 100%);
          box-shadow: -2px 0 8px rgba(166,138,78,0.16);
        }
        .builder-legacito-glitch::after {
          background: linear-gradient(90deg, transparent 0 36%, rgba(109,84,40,0.28) 36% 45%, transparent 45% 74%, rgba(166,138,78,0.20) 74% 82%, transparent 82% 100%);
          box-shadow: 2px 0 8px rgba(109,84,40,0.12);
          animation-delay: 120ms;
        }
        .builder-legacito-glitch > * {
          animation: builder-legacito-core-glitch 6.2s steps(1, end) infinite;
        }
        @keyframes builder-legacito-soft-glitch {
          0%, 88%, 100% { opacity: 0; transform: translate3d(0,0,0) scale(1); clip-path: inset(0 0 0 0 round 999px); }
          89% { opacity: 0.58; transform: translate3d(-2px,1px,0) scale(1.018); clip-path: inset(12% 0 62% 0 round 999px); }
          90% { opacity: 0.35; transform: translate3d(2px,-1px,0) scale(0.992); clip-path: inset(58% 0 16% 0 round 999px); }
          91% { opacity: 0.46; transform: translate3d(-1px,0,0) scale(1.006); clip-path: inset(36% 0 38% 0 round 999px); }
          92% { opacity: 0; transform: translate3d(0,0,0) scale(1); clip-path: inset(0 0 0 0 round 999px); }
        }
        @keyframes builder-legacito-core-glitch {
          0%, 86%, 100% { transform: translate3d(0,0,0); filter: none; }
          87% { transform: translate3d(1px,0,0); filter: drop-shadow(-2px 0 5px rgba(166,138,78,0.28)) drop-shadow(2px 0 5px rgba(109,84,40,0.18)); }
          88% { transform: translate3d(-1px,1px,0); filter: drop-shadow(2px 0 5px rgba(196,173,124,0.20)) drop-shadow(-2px 0 6px rgba(166,138,78,0.22)); }
          89% { transform: translate3d(0,0,0); filter: none; }
        }
      `}</style>
    </>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(ui, document.body);
};
