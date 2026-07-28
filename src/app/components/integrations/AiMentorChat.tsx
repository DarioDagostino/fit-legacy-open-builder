import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import '@/styles/legacy-coach-ui.css';
import { ChevronUp, Copy, FileText, Image as ImageIcon, Link as LinkIcon, Mic, PanelLeftOpen, PhoneOff, Plus, SendHorizontal, Share2, Trophy, Volume2, X, Zap } from 'lucide-react';
import { Legacito, LegacitoActionButton, LegacitoMood, resolveFitLegacyAppUrls, SocialJoin } from '@fit-legacy/shared';
import { MentorService, ChatMessage, LegacitoMode, MODE_META } from '@/lib/integrations/perplexity';
import { useBioLedgerStore } from '@/lib/bioledger-store';
import { useWorkoutStore } from '@/lib/store';

const APP_URLS = resolveFitLegacyAppUrls(import.meta.env);
const BUILDER_APP_URL = APP_URLS.builder;
const ROAD_APP_URL = APP_URLS.road;
const ANALYTICS_APP_URL = APP_URLS.analytics;
const CHAT_HISTORY_KEY = 'fit_legacy_builder_chat_history_v1';

type CoachChatMode = 'text' | 'agent' | 'link' | 'media' | 'document';

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

const RAPID_CLICK_WINDOW_MS = 1800;
const EASTER_EGG_THRESHOLD = 3;
const EASTER_EGG_MESSAGES = [
  'Conócete a ti mismo. — Sócrates ⚡',
  'La disciplina es el puente entre metas y logros. — Jim Rohn',
  'Lo que no se mide, no se mejora. — Peter Drucker',
  'Sé el cambio que quieres ver en el mundo. — Gandhi',
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
  const [showOptions, setShowOptions] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [chatSubMode, setChatSubMode] = useState<CoachChatMode>('text');
  const [subIdx, setSubIdx] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const rapidClicksRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const easterEggCountRef = useRef(0);
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

  const startVoiceSession = () => {
    setIsVoiceActive(true);
  };

  const stopVoiceSession = () => {
    setIsVoiceActive(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text.trim());
        return true;
      }
    } catch { /* fallback */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = text.trim();
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch { return false; }
  };

  const shareMessage = (text: string) => {
    if (navigator.share) {
      navigator.share({ title: 'Legacito AI - Fit Legacy', text }).catch(() => {});
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setIsHistoryOpen(false);
  };

  const mascotMood: LegacitoMood = isTyping || isVoiceActive ? 'thinking' : messages.length > 0 ? 'celebrating' : 'neutral';

  const handleMascotClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < RAPID_CLICK_WINDOW_MS) {
      rapidClicksRef.current += 1;
    } else {
      rapidClicksRef.current = 1;
    }
    lastClickTimeRef.current = now;

    if (rapidClicksRef.current >= EASTER_EGG_THRESHOLD) {
      rapidClicksRef.current = 0;
      easterEggCountRef.current += 1;
      const idx = (easterEggCountRef.current - 1) % EASTER_EGG_MESSAGES.length;
      const msg = EASTER_EGG_MESSAGES[idx];
      setMessages((prev) => [...prev, { role: 'assistant', content: msg }]);
      setTimeout(() => setMessages((prev) => prev.filter((m) => m.content !== msg)), 4000);
      if (Math.random() > 0.5) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      } else {
        setIsDancing(true);
        setTimeout(() => setIsDancing(false), 2500);
      }
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 150);
    }
  };

  const ui = (
    <>
      {/* Floating Legacito — same as Legacy IA */}
      {!isOpen && (
        <div className="builder-legacito-anchor fixed z-[99990]">
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
                        onClick={() => setIsHistoryOpen(true)}
                        className="legacy-coach-header-action legacy-coach-header-action--history pointer-events-auto"
                        aria-label="Ver Historial"
                        title="Historial"
                      >
                        <PanelLeftOpen size={16} strokeWidth={1.8} />
                      </button>
                    </div>
                    <div className="absolute right-3 top-3 z-40">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="legacy-coach-header-action legacy-coach-header-action--close pointer-events-auto"
                        aria-label="Cerrar chat"
                      >
                        <X size={16} strokeWidth={1.8} />
                      </button>
                    </div>

<div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-4 pt-12 sm:px-5 sm:pb-5 sm:pt-14">
                        {/* HEADER MASCOT — Legacito con easter egg click */}
                        <div className="mb-1 flex flex-col items-center">
                          <div className="relative select-none">
                            <motion.div
                              onClick={handleMascotClick}
                              className="pointer-events-auto cursor-pointer transition-transform active:scale-95"
                              animate={
                                isShaking
                                  ? { x: [0, -6, 6, -4, 4, -2, 2, 0], rotate: [0, -5, 5, -3, 3, 0] }
                                  : isDancing
                                    ? { y: [0, -8, 0, -5, 0], rotate: [0, -8, 8, -5, 5, 0] }
                                    : {}
                              }
                              transition={
                                isShaking
                                  ? { duration: 0.5, ease: 'easeInOut' }
                                  : isDancing
                                    ? { duration: 0.5, repeat: 4, ease: 'easeInOut' }
                                    : {}
                              }
                            >
                              <Legacito size={44} mood={mascotMood} />
                            </motion.div>
                            {isVoiceActive && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-[3px] border-[#080a09] bg-emerald-500"
                              />
                            )}
                            {isDancing && (
                              <>
                                {[0, 1, 2, 3].map((i) => (
                                  <motion.div
                                    key={`mascot-sparkle-${i}`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                      opacity: [0, 1, 0],
                                      scale: [0, 1.2, 0],
                                      x: [0, (i % 2 === 0 ? 1 : -1) * (18 + i * 6)],
                                      y: [0, -(12 + i * 8)],
                                    }}
                                    transition={{ duration: 0.8, delay: i * 0.15, repeat: 2, ease: 'easeOut' }}
                                    className="pointer-events-none absolute left-1/2 top-1/2 size-2 rounded-full"
                                    style={{
                                      background: ['#FFD700', '#AEEAF2', '#C084FC', '#FF6B6B'][i],
                                      boxShadow: `0 0 8px ${['#FFD700', '#AEEAF2', '#C084FC', '#FF6B6B'][i]}`,
                                    }}
                                  />
                                ))}
                              </>
                            )}
                          </div>
                          <p className="text-center text-[7px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                            Mentor y Coach
                          </p>
                        </div>

                      <div ref={scrollRef} className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 pb-16 [scrollbar-width:none]">
                        {messages.length === 0 ? (
                          <div className="flex min-h-full flex-col items-center justify-start px-2 pt-6 pb-10 text-center">
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="max-w-[320px] text-balance text-[2rem] font-black uppercase leading-[0.9] tracking-[-0.035em] text-[#fbfaf6]"
                            >
                              ¿En qué puedo ayudarte hoy?
                            </motion.p>
                            <p className="mt-2 max-w-[280px] text-[11px] font-medium leading-relaxed text-[#a8b4ad]">
                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={SUBTITLES[subIdx]}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  transition={{ duration: 0.28 }}
                                  className="inline-block"
                                >
                                  {SUBTITLES[subIdx]}
                                </motion.span>
                              </AnimatePresence>
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-6 pb-4">
                            {messages.map((msg, i) => {
                              const isUser = msg.role === 'user';
                              return (
                                <motion.div
                                  key={`${msg.role}-${i}`}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}
                                >
                                  <div
                                    className={`legacy-chat-panel legacy-chat-text group relative max-w-[90%] select-text px-4 py-3 text-[15px] leading-relaxed shadow-[0_18px_42px_-32px_rgba(0,0,0,0.9)] sm:max-w-[86%] sm:px-5 ${
                                      isUser
                                        ? 'legacy-chat-panel--user border border-bronze-300/18 bg-bronze-100/[0.92] text-[#111715]'
                                        : 'legacy-chat-panel--assistant border border-white/9 bg-white/[0.055] text-[#f6f3ed]'
                                    }`}
                                  >
                                    {msg.content}
                                    {!isUser && (
                                      <div className="mt-3 flex items-center gap-1 border-t border-white/5 pt-2">
                                        <button
                                          type="button"
                                          onClick={() => { /* TTS placeholder */ }}
                                          className="rounded-lg p-1.5 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
                                          title="Escuchar"
                                        >
                                          <Volume2 size={14} />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => void copyToClipboard(msg.content)}
                                          className="rounded-lg p-1.5 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
                                          title="Copiar"
                                        >
                                          <Copy size={14} />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => shareMessage(msg.content)}
                                          className="rounded-lg p-1.5 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
                                          title="Compartir"
                                        >
                                          <Share2 size={14} />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                            {isTyping && (
                              <div className="flex justify-start">
                                <div className="legacy-chat-panel legacy-chat-panel--assistant legacy-glass-panel flex items-center gap-2 border border-white/8 px-5 py-3">
                                  <span className="legacy-thinking-switch legacy-thinking-switch--coach" aria-label="Legacito está escribiendo">
                                    <span className="legacy-thinking-switch__word">Legacito AI</span>
                                    <span className="legacy-thinking-switch__dots" aria-hidden="true">
                                      <i />
                                      <i />
                                      <i />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 space-y-2.5">
                        {showPro && (
                          <div className="relative z-10 shrink-0 px-2 pb-1">
                            <div className="flex w-full items-center gap-2 rounded-xl border border-white/8 bg-[#0d0d0d]/60 px-3 py-1.5 text-left text-[9px] font-bold text-[#f6f3ed]">
                              <span className="truncate">Legacy Pro</span>
                              <span className="shrink-0 text-[8px] text-white/70">Actualizar</span>
                              <button
                                type="button"
                                onClick={() => setShowPro(false)}
                                className="grid size-5 shrink-0 place-items-center rounded-full text-white/40 transition-colors hover:bg-white/8 hover:text-white"
                                aria-label="Cerrar aviso de Legacy Pro"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          </div>
                        )}

                        {messages.length === 0 && (
                          <div className="relative z-10 shrink-0 px-2 pb-2">
                            <div className="flex gap-1.5 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
                              {SUGGESTIONS.map((label) => (
                                <button
                                  key={label}
                                  type="button"
                                  onClick={() => void handleSend(label)}
                                  className="shrink-0 touch-manipulation rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[9px] font-bold text-white/55 transition-colors hover:border-white/18 hover:bg-white/6 hover:text-white"
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* COMPOSER */}
                        <div className="relative z-10 shrink-0 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-2">
                          <div className="mx-auto flex min-h-[72px] w-full flex-col gap-2 rounded-[1.5rem] border border-white/10 bg-[#111111]/95 p-2 shadow-[0_16px_48px_-34px_rgba(0,0,0,0.95)]">
                            <AnimatePresence initial={false} mode="wait">
                              {isVoiceActive ? (
                                <motion.div
                                  key="voice-composer"
                                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                  exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
                                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                  className="relative flex items-center gap-2 rounded-[1.65rem] border border-white/10 bg-[#070707] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-18px_36px_rgba(255,255,255,0.025)]"
                                >
                                  <button
                                    type="button"
                                    onClick={() => setIsVoiceActive(false)}
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/8 bg-transparent text-white/65 transition-all hover:bg-white/8 hover:text-white"
                                    aria-label="Volver al chat"
                                  >
                                    <SendHorizontal size={20} />
                                  </button>
                                  <div className="relative flex h-11 flex-1 items-center justify-center overflow-hidden px-4 sm:h-12">
                                    <div className="flex items-center gap-1.5">
                                      {[...Array(9)].map((_, i) => (
                                        <motion.div
                                          key={i}
                                          className="w-1 rounded-full"
                                          style={{ background: '#22d3ee' }}
                                          animate={{ height: [8, 20 + Math.sin(i) * 12 * 0.5, 8] }}
                                          transition={{ duration: 0.35 + (i % 3) * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                                        />
                                      ))}
                                      <span className="ml-3 text-[10px] font-black uppercase tracking-[0.15em] text-bronze-400">Te escucho...</span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={stopVoiceSession}
                                    className="flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-red-300/25 bg-red-500/18 px-3 text-[10px] font-black uppercase tracking-[0.12em] text-red-100 animate-pulse"
                                  >
                                    <PhoneOff size={13} /> Cortar
                                  </button>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="chat-composer"
                                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                  exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
                                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                  className="flex flex-col gap-3"
                                >
                                  <AnimatePresence>
                                    {showOptions && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="mb-1 grid grid-cols-5 gap-1.5 rounded-2xl border border-white/10 bg-[#090909] p-2"
                                      >
                                        {[
                                          { key: 'agent', icon: Zap, label: 'Agente' },
                                          { key: 'link', icon: LinkIcon, label: 'Link' },
                                          { key: 'media', icon: ImageIcon, label: 'Media' },
                                          { key: 'document', icon: FileText, label: 'Doc' },
                                          { key: 'voice', icon: Volume2, label: 'Voz' },
                                        ].map(({ key, icon: Icon, label }) => (
                                          <button
                                            key={key}
                                            type="button"
                                            onClick={() => {
                                              if (key === 'voice') { startVoiceSession(); return; }
                                              setChatSubMode(key as CoachChatMode);
                                              setShowOptions(false);
                                            }}
                                            className={`flex flex-col items-center gap-1 rounded-xl border p-2 transition-all ${
                                              chatSubMode === key
                                                ? 'border-amber-500/30 bg-amber-500/20 text-amber-400'
                                                : 'border-transparent bg-white/5 text-neutral-400 hover:border-white/10 hover:bg-white/8 hover:text-white'
                                            }`}
                                          >
                                            <Icon size={18} />
                                            <span className="text-[9px] font-black uppercase tracking-tight">{label}</span>
                                          </button>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  <div className="relative flex items-center gap-1.5 rounded-[1.25rem] border border-white/10 bg-[#070707] p-1">
                                    <button
                                      type="button"
                                      onClick={() => setShowOptions((v) => !v)}
                                      aria-label="Agregar contexto"
                                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/8 transition-all ${
                                        showOptions ? 'rotate-45 bg-white/15 text-white' : 'bg-transparent text-white/65 hover:bg-white/8 hover:text-white'
                                      }`}
                                    >
                                      <Plus size={16} />
                                    </button>

                                    <div className="relative">
                                      <button
                                        type="button"
                                        onClick={() => setModeOpen((v) => !v)}
                                        className={`flex h-8 shrink-0 items-center gap-1 rounded-full border px-2.5 text-[8px] font-black uppercase tracking-[0.12em] transition-all active:translate-y-px ${MODE_CHIP[mode].active}`}
                                        aria-label={`Modelo ${MODE_META[mode].label}. Cambiar modelo`}
                                        aria-expanded={modeOpen}
                                      >
                                        <span className={`size-1.5 rounded-full ${MODE_CHIP[mode].marker}`} aria-hidden="true" />
                                        <span>{MODE_META[mode].label}</span>
                                        <ChevronUp className={`size-2.5 transition-transform duration-200 ${modeOpen ? 'rotate-180' : ''}`} />
                                      </button>
                                      <AnimatePresence>
                                        {modeOpen && (
                                          <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                            transition={{ duration: 0.12 }}
                                            className="absolute bottom-full left-0 z-30 mb-2 grid w-36 gap-1 rounded-2xl border border-zinc-700/80 bg-zinc-950/95 p-1.5 shadow-[0_18px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                                          >
                                            {(Object.keys(MODE_META) as LegacitoMode[]).map((m) => (
                                              <button
                                                key={m}
                                                type="button"
                                                onClick={() => {
                                                  setMode(m);
                                                  setModeOpen(false);
                                                }}
                                                className={`flex min-h-9 items-center gap-2 rounded-xl border px-2.5 text-left text-[9px] font-black uppercase tracking-[0.1em] transition-all active:translate-y-px ${
                                                  mode === m
                                                    ? MODE_CHIP[m].active
                                                    : 'border-transparent text-zinc-500 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-200'
                                                }`}
                                              >
                                                <span className={`size-1.5 shrink-0 rounded-full ${MODE_CHIP[m].marker}`} aria-hidden="true" />
                                                <span>{MODE_META[m].label}</span>
                                              </button>
                                            ))}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>

                                    <div className="relative flex flex-1 items-center">
                                      <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            void handleSend();
                                          }
                                        }}
                                        placeholder=""
                                        disabled={isTyping}
                                        aria-label="Escribir mensaje para Legacito"
                                        className="relative z-10 w-full rounded-full border border-transparent bg-transparent py-2.5 pl-3 pr-[5.2rem] text-[14px] font-semibold text-[#f6f3ed] outline-none focus:ring-0"
                                      />
                                      <button
                                        type="button"
                                        onClick={startVoiceSession}
                                        className="absolute right-[2.6rem] z-20 flex h-8 w-8 items-center justify-center rounded-full text-[#f6f3ed] transition-colors hover:bg-white/8"
                                        title="Sesión de voz"
                                        aria-label="Abrir sesión de voz"
                                      >
                                        <Mic size={16} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => void handleSend()}
                                        disabled={!input.trim() || isTyping}
                                        className="absolute right-1 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-bronze-600/70 bg-gradient-to-br from-[#4a3718] to-[#5c4620] text-[#f0ede7] shadow-[0_8px_20px_rgba(74,55,24,0.12)] transition-all hover:from-[#5c4620] hover:to-[#6d5428] hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
                                        aria-label="Enviar mensaje"
                                      >
                                        <SendHorizontal size={14} />
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HISTORY PANEL */}
                <AnimatePresence>
                  {isHistoryOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsHistoryOpen(false)}
                        className="absolute inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
                      />
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-y-0 left-0 z-50 flex w-[280px] flex-col overflow-y-auto border-r border-white/6 bg-[#090909] pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[18px_0_60px_rgba(0,0,0,0.58)] sm:w-[320px]"
                      >
<div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/6 bg-[#090909]/96 px-4 py-4 text-white">
                            <div>
                              <h4 className="text-sm font-semibold tracking-[-0.01em]">Historial</h4>
                              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/30">Legacy AI</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsHistoryOpen(false)}
                              className="grid size-10 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-white/[0.045] hover:text-white"
                              aria-label="Cerrar historial"
                            >
                              <X size={20} />
                            </button>
                          </div>
                          <div className="shrink-0 border-b border-white/6 px-4 py-3">
                            <button
                              onClick={startNewChat}
                              className="legacy-brush-button flex min-h-11 w-full items-center justify-center gap-2 bg-white py-2 text-xs font-black uppercase tracking-[0.12em] text-black transition-transform active:scale-[0.98]"
                            >
                              <Plus size={15} /> Nuevo chat
                            </button>
                          </div>
                          <div className="shrink-0 space-y-2 border-b border-white/6 px-4 py-3">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/34">Aplicaciones</p>
                            <div className="grid gap-1">
                              {[
                                { url: BUILDER_APP_URL, icon: 'fl', label: 'Builder', desc: 'Crear planes y links .wir' },
                                { url: ROAD_APP_URL, icon: 'Road', label: 'The Road', desc: 'Rachas, progreso y tienda' },
                                { url: ANALYTICS_APP_URL, icon: 'AN', label: 'Analytics', desc: 'Estado, carga y progreso' },
                              ].map(({ url, icon, label, desc }) => (
                                <button
                                  key={label}
                                  type="button"
                                  onClick={() => { window.location.href = url; }}
                                  className="legacy-brush-row group flex items-center gap-3 px-2 py-2 text-left transition-colors hover:bg-white/[0.045]"
                                >
                                  <span className="grid size-8 shrink-0 place-items-center bg-white/[0.045] text-[10px] font-black lowercase tracking-[-0.08em] text-white/58 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]">{icon}</span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-[12px] font-semibold text-white/88">{label}</span>
                                    <span className="block truncate text-[10px] font-medium text-white/32">{desc}</span>
                                  </span>
                                  <LinkIcon size={13} className="text-white/28 transition-transform group-hover:translate-x-0.5" />
                                </button>
                              ))}
                            </div>
                          </div>
                        <SocialJoin
                          className="shrink-0 border-b border-white/6 px-4 py-3"
                          title="Únete"
                          variant="dark"
                          align="left"
                          compact
                        />
                        <div className="flex flex-1 items-center justify-center px-4 py-8 text-center">
                          <p className="text-[11px] font-medium text-white/30">Sin conversaciones guardadas</p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

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
