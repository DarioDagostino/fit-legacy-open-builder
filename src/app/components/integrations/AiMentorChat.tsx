import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import '@/styles/legacy-coach-ui.css';
import { ChevronUp, Copy, Link as LinkIcon, MessageCircle, PanelLeftOpen, Plus, SendHorizontal, Share2, SlidersHorizontal, X, Zap } from 'lucide-react';
import { Legacito, LegacitoActionButton, type LegacitoMood, type LegacitoSkin, resolveFitLegacyAppUrls, SocialJoin } from '@fit-legacy/shared';
import { MentorService, ChatMessage, LegacitoMode, MODE_META } from '@/lib/integrations/perplexity';
import { useBioLedgerStore } from '@/lib/bioledger-store';
import { useWorkoutStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

const APP_URLS = resolveFitLegacyAppUrls(import.meta.env);
const BUILDER_APP_URL = APP_URLS.builder;
const ROAD_APP_URL = APP_URLS.road;
const ANALYTICS_APP_URL = APP_URLS.analytics;
const CHAT_HISTORY_KEY = 'fit_legacy_builder_chat_history_v1';
const MAX_HISTORY_CONVERSATIONS = 20;
const MAX_HISTORY_MESSAGES = 80;
const MAX_INPUT_LENGTH = 2000;

type ChatConversation = {
  id: string;
  title: string;
  mode: LegacitoMode;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
};

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

const createConversationId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const historyStorageKey = (userId: string) => `${CHAT_HISTORY_KEY}:${userId}`;

const readStoredConversations = (userId: string): ChatConversation[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(historyStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry): entry is ChatConversation => Boolean(entry?.id && Array.isArray(entry.messages)))
      .map((entry) => ({
        id: String(entry.id),
        title: String(entry.title || 'Nueva conversación'),
        mode: Object.prototype.hasOwnProperty.call(MODE_META, entry.mode) ? entry.mode : 'tecnico',
        messages: entry.messages
          .filter((message: ChatMessage) => message?.role === 'user' || message?.role === 'assistant')
          .map((message: ChatMessage) => ({ role: message.role, content: String(message.content).slice(0, MAX_INPUT_LENGTH) }))
          .slice(-MAX_HISTORY_MESSAGES),
        createdAt: String(entry.createdAt || new Date().toISOString()),
        updatedAt: String(entry.updatedAt || entry.createdAt || new Date().toISOString()),
      }))
      .filter((entry) => entry.messages.length > 0)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, MAX_HISTORY_CONVERSATIONS);
  } catch {
    return [];
  }
};

export const LEGACITO_SKIN_OPTIONS: Array<{ value: LegacitoSkin; label: string; description: string }> = [
  { value: 'legacy-ai', label: 'Cyan · Legacy IA', description: 'Mentor cian · chasis oscuro' },
  { value: 'rose', label: 'Rose', description: 'Energía rosa · foco y atención' },
  { value: 'gold', label: 'Gold', description: 'Progreso dorado · celebración' },
  { value: 'aurora', label: 'Aurora', description: 'Paleta multicolor · mood dinámico' },
  { value: 'none', label: 'Builder base', description: 'Paleta original por estado' },
  { value: 'crown', label: 'Crown', description: 'Modo celebración' },
  { value: 'band', label: 'Band', description: 'Modo disciplina' },
  { value: 'glasses', label: 'Glasses', description: 'Modo análisis' },
];

export const AiMentorChat: React.FC<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Render the compact desktop panel instead of the floating phone dock. */
  embedded?: boolean;
  skinId?: LegacitoSkin;
  onSkinChange?: (skinId: LegacitoSkin) => void;
}> = ({
  open,
  onOpenChange,
  embedded = false,
  skinId = 'none',
  onSkinChange,
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryPrompt, setRetryPrompt] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [subIdx, setSubIdx] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [showMascotSettings, setShowMascotSettings] = useState(false);
  const [mobileWorkspace, setMobileWorkspace] = useState<'chat' | 'canvas'>('chat');
  const [mobileHeaderTab, setMobileHeaderTab] = useState<'canvas' | 'legacito'>('legacito');
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const rapidClicksRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const easterEggCountRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeConversationIdRef = useRef<string | null>(null);
  const requestControllerRef = useRef<AbortController | null>(null);
  const requestTimeoutRef = useRef<number | null>(null);
  const historyPanelRef = useRef<HTMLDivElement>(null);
  const historyCloseRef = useRef<HTMLButtonElement>(null);
  const conversationsRef = useRef<ChatConversation[]>([]);
  const mascotTimeoutsRef = useRef<number[]>([]);

  const bioStats = useBioLedgerStore((state) => state.stats);
  const sessions = useBioLedgerStore((state) => state.sessions);
  const routine = useWorkoutStore((state) => state.currentRoutine);

  const canvasPreviewStats = useMemo(() => {
    const exercises = routine?.exercises ?? [];
    const foods = routine?.foods ?? [];
    return {
      exerciseCount: exercises.length,
      foodCount: foods.length,
      sets: exercises.reduce((total, exercise) => total + (Number(exercise.sets) || 0), 0),
      kcal: foods.reduce((total, food) => total + ((Number(food.calories) || 0) * ((Number(food.quantity) || 100) / 100)), 0),
      volume: exercises.reduce((total, exercise) => total + ((Number(exercise.sets) || 0) * (Number(exercise.reps) || 0) * (Number(exercise.weight) || 0)), 0),
    };
  }, [routine]);

  useEffect(() => {
    let mounted = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setAuthUserId(data.session?.user?.id ?? null);
      setAuthChecking(false);
    }).catch(() => {
      if (mounted) setAuthChecking(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setAuthUserId(session?.user?.id ?? null);
        setAuthChecking(false);
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      requestControllerRef.current?.abort();
      setIsHistoryOpen(false);
      setMobileWorkspace('chat');
      setMobileHeaderTab('legacito');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isHistoryOpen) return;
    const panel = historyPanelRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusable = () => panel ? Array.from(panel.querySelectorAll<HTMLElement>('button, select, input, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute('disabled')) : [];
    historyCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsHistoryOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const elements = focusable();
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.();
    };
  }, [isHistoryOpen]);

  const isAuthenticated = Boolean(authUserId);

  useEffect(() => {
    if (!authUserId) {
      setConversations([]);
      conversationsRef.current = [];
      setMessages([]);
      setActiveConversationId(null);
      activeConversationIdRef.current = null;
      return;
    }

    const stored = readStoredConversations(authUserId);
    setConversations(stored);
    conversationsRef.current = stored;
    const latest = stored[0];
    if (latest) {
      setMessages(latest.messages);
      setMode(latest.mode);
      setActiveConversationId(latest.id);
      activeConversationIdRef.current = latest.id;
    } else {
      setMessages([]);
      setActiveConversationId(null);
      activeConversationIdRef.current = null;
    }
  }, [authUserId]);

  useEffect(() => {
    if (!authUserId || typeof window === 'undefined') return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== historyStorageKey(authUserId)) return;
      const stored = readStoredConversations(authUserId);
      conversationsRef.current = stored;
      setConversations(stored);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [authUserId]);

  const persistConversation = (nextMessages: ChatMessage[], nextMode = mode) => {
    if (!authUserId || nextMessages.length === 0 || typeof window === 'undefined') return;
    const now = new Date().toISOString();
    const id = activeConversationIdRef.current || createConversationId();
    const firstUserMessage = nextMessages.find((message) => message.role === 'user')?.content || 'Nueva conversación';
    const conversation: ChatConversation = {
      id,
      title: firstUserMessage.replace(/\s+/g, ' ').trim().slice(0, 48) || 'Nueva conversación',
      mode: nextMode,
      messages: nextMessages.slice(-MAX_HISTORY_MESSAGES),
      createdAt: conversationsRef.current.find((entry) => entry.id === id)?.createdAt || now,
      updatedAt: now,
    };
    activeConversationIdRef.current = id;
    setActiveConversationId(id);
    setConversations((previous) => {
      const next = [conversation, ...previous.filter((entry) => entry.id !== id)]
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, MAX_HISTORY_CONVERSATIONS);
      try {
        window.localStorage.setItem(historyStorageKey(authUserId), JSON.stringify(next));
      } catch {
        // Storage may be unavailable in private browsing; the live chat still works.
      }
      conversationsRef.current = next;
      return next;
    });
  };

  const announce = (message: string) => {
    setFeedbackMessage(message);
    window.setTimeout(() => setFeedbackMessage((current) => current === message ? null : current), 2600);
  };

  const openLegacyAiLogin = () => {
    const target = new URL('/agent-chat', `${APP_URLS.ai.replace(/\/$/, '')}/`);
    target.searchParams.set('source', 'builder');
    if (typeof window !== 'undefined') target.searchParams.set('return_to', window.location.href);
    window.location.assign(target.toString());
  };

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
    if (!embedded || !isOpen || messages.length > 0) return;
    const id = window.setInterval(() => setSubIdx((i) => (i + 1) % SUBTITLES.length), 4200);
    return () => window.clearInterval(id);
  }, [embedded, isOpen, messages.length]);

  const handleSend = async (text?: string, retry = false) => {
    const cleanInput = (text ?? input).trim().slice(0, MAX_INPUT_LENGTH);
    if (!cleanInput || isTyping) return;
    if (!isAuthenticated) return;

    setErrorMessage(null);
    setRetryPrompt(null);
    const userMsg: ChatMessage = { role: 'user', content: cleanInput };
    const updated = retry ? messages : [...messages, userMsg];
    if (!retry) {
      setMessages(updated);
      persistConversation(updated);
      setInput('');
    }
    setModeOpen(false);
    setIsTyping(true);
    const controller = new AbortController();
    requestControllerRef.current = controller;
    requestTimeoutRef.current = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await MentorService.getMentorResponse(updated, mode, athleteContext, controller.signal);
      const completed = [...updated, { role: 'assistant' as const, content: response }];
      setMessages(completed);
      persistConversation(completed);
    } catch (error) {
      const isTimeout = error instanceof Error && error.name === 'AbortError';
      setErrorMessage(isTimeout ? 'La respuesta tardó demasiado.' : 'No pude conectar con Legacito.');
      setRetryPrompt(cleanInput);
    } finally {
      if (requestTimeoutRef.current) window.clearTimeout(requestTimeoutRef.current);
      requestTimeoutRef.current = null;
      requestControllerRef.current = null;
      setIsTyping(false);
    }
  };

  useEffect(() => () => {
    requestControllerRef.current?.abort();
    if (requestTimeoutRef.current) window.clearTimeout(requestTimeoutRef.current);
    mascotTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
  }, []);

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

  const shareMessage = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Legacito AI - Fit Legacy', text });
        announce('Mensaje compartido');
      } catch {
        // Cancelar el diálogo nativo no debe mostrar un error.
      }
      return;
    }
    const copied = await copyToClipboard(text);
    announce(copied ? 'Mensaje copiado para compartir' : 'No se pudo compartir el mensaje');
  };

  const startNewChat = () => {
    setMessages([]);
    setInput('');
    setErrorMessage(null);
    setRetryPrompt(null);
    setMode('tecnico');
    setActiveConversationId(null);
    activeConversationIdRef.current = null;
    setIsHistoryOpen(false);
  };

  const loadConversation = (conversation: ChatConversation) => {
    setMessages(conversation.messages);
    setMode(conversation.mode);
    setActiveConversationId(conversation.id);
    activeConversationIdRef.current = conversation.id;
    setErrorMessage(null);
    setRetryPrompt(null);
    setIsHistoryOpen(false);
    setMobileWorkspace('chat');
    setMobileHeaderTab('legacito');
  };

  const selectMobileHeaderTab = (tab: 'canvas' | 'legacito') => {
    setMobileHeaderTab(tab);
    if (tab === 'canvas') {
      setMobileWorkspace('canvas');
      return;
    }
    setMobileWorkspace('chat');
  };

  const handleRequestCanvas = () => {
    setIsHistoryOpen(false);
    selectMobileHeaderTab('canvas');
  };

  const mascotMood: LegacitoMood = isTyping ? 'thinking' : messages.length > 0 ? 'celebrating' : 'neutral';

  const scheduleMascot = (callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(() => {
      mascotTimeoutsRef.current = mascotTimeoutsRef.current.filter((id) => id !== timeoutId);
      callback();
    }, delay);
    mascotTimeoutsRef.current.push(timeoutId);
  };

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
      const nextMessages = [...messages, { role: 'assistant' as const, content: msg }];
      setMessages(nextMessages);
      persistConversation(nextMessages);
      scheduleMascot(() => setMessages((prev) => prev.filter((m) => m.content !== msg)), 4000);
      if (Math.random() > 0.5) {
        setIsShaking(true);
        scheduleMascot(() => setIsShaking(false), 500);
      } else {
        setIsDancing(true);
        scheduleMascot(() => setIsDancing(false), 2500);
      }
    } else {
      setIsShaking(true);
      scheduleMascot(() => setIsShaking(false), 150);
    }
  };

  if (embedded) {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#0d0e0e] text-[#f6f3ed]">
        <div className="relative shrink-0 overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-white/[0.07] via-white/[0.025] to-transparent px-4 pb-3 pt-4">
          <div className="pointer-events-none absolute -right-12 -top-16 size-44 rounded-full bg-[var(--builder-accent)]/[0.09] blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute left-10 top-5 h-px w-32 bg-gradient-to-r from-transparent via-[var(--builder-accent)]/45 to-transparent" aria-hidden="true" />
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <motion.div
                onClick={handleMascotClick}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleMascotClick();
                  }
                }}
                role="button"
                tabIndex={0}
                className="relative flex size-12 shrink-0 cursor-pointer items-center justify-center"
                animate={
                  isShaking
                    ? { x: [0, -4, 4, -2, 2, 0], rotate: [0, -4, 4, -2, 2, 0] }
                    : isDancing
                      ? { y: [0, -4, 0, -3, 0], rotate: [0, -5, 5, -3, 3, 0] }
                      : {}
                }
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                aria-label="Interactuar con Legacito"
              >
                <Legacito size={46} mood={mascotMood} skinId={skinId} />
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)]" aria-label="Legacito online" />
              </motion.div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowMascotSettings((visible) => !visible)}
                className={`grid size-8 place-items-center rounded-full border transition-colors ${showMascotSettings ? 'border-[var(--builder-accent)]/60 bg-[var(--builder-accent)]/10 text-[var(--builder-accent-soft)]' : 'border-white/[0.1] text-white/45 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'}`}
                aria-expanded={showMascotSettings}
                aria-label="Configurar mascota y skin"
                title="Configurar mascota y skin"
              >
                <SlidersHorizontal size={14} />
              </button>
              <button
                type="button"
                onClick={() => onOpenChange?.(false)}
                className="grid size-8 place-items-center rounded-full border border-white/[0.1] text-white/45 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                aria-label="Volver al canvas"
                title="Volver al canvas"
              >
                <X size={14} />
              </button>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {showMascotSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                className="mt-2 space-y-2 overflow-hidden rounded-xl border border-[var(--builder-accent)]/20 bg-black/20 p-2.5"
              >
                <label className="block space-y-1.5">
                  <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-[0.14em] text-white/35">Mascota</span>
                  <select value="legacito" disabled className="builder-select w-full" aria-label="Seleccionar mascota">
                    <option value="legacito">Legacito · Mentor fitness</option>
                  </select>
                </label>
                <label className="block space-y-1.5">
                  <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-[0.14em] text-white/35">Skin</span>
                  <select
                    value={skinId}
                    disabled={!onSkinChange}
                    onChange={(event) => onSkinChange?.(event.target.value as LegacitoSkin)}
                    className="builder-select w-full"
                    aria-label="Seleccionar skin de Legacito"
                  >
                    {LEGACITO_SKIN_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label} · {option.description}</option>
                    ))}
                  </select>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {authChecking ? (
          <div className="flex min-h-0 flex-1 items-center justify-center px-6 text-center">
            <div className="space-y-2">
              <span className="mx-auto block size-6 animate-pulse rounded-full border border-[var(--builder-accent)]/50" />
              <p className="font-['IBM_Plex_Mono',monospace] text-[9px] uppercase tracking-[0.14em] text-white/40">Verificando sesión</p>
            </div>
          </div>
        ) : !isAuthenticated ? (
          <div className="flex min-h-0 flex-1 items-center justify-center px-6 text-center">
            <div className="max-w-[270px] space-y-3">
              <p className="text-[14px] font-black tracking-[-0.02em] text-white/90">Iniciá sesión en Legacy IA</p>
              <p className="text-[11px] leading-relaxed text-white/50">El chat de Legacito usa tu identidad y tus datos del ecosistema Fit Legacy.</p>
              <button type="button" onClick={openLegacyAiLogin} className="mx-auto inline-flex items-center justify-center rounded-xl bg-[var(--builder-accent)] px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.13em] text-white transition hover:brightness-110">Ir a Legacy IA</button>
            </div>
          </div>
        ) : (
        <>
        <div ref={scrollRef} aria-live="polite" aria-label="Conversación con Legacito" className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex min-h-full flex-col justify-center py-4">
              <p className="text-center font-['IBM_Plex_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--builder-accent-soft)]">Legacito te acompaña</p>
              <p className="mt-2 text-center text-[15px] font-black tracking-[-0.02em] text-white/90">Tu plan empieza acá.</p>
              <p className="mx-auto mt-2 max-w-[250px] text-center text-[11px] leading-relaxed text-white/55">{SUBTITLES[subIdx]}</p>
              <div className="mt-4 grid gap-2">
                {SUGGESTIONS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => { if (isAuthenticated) void handleSend(label); else openLegacyAiLogin(); }}
                    className="group flex items-center justify-between rounded-xl border border-white/[0.09] bg-white/[0.035] px-3 py-2.5 text-left text-[11px] font-semibold text-white/75 transition-all hover:-translate-y-0.5 hover:border-[var(--builder-accent)]/45 hover:bg-[var(--builder-accent)]/10 hover:text-white"
                  >
                    <span>{label}</span>
                    <Zap size={12} className="text-[var(--builder-accent-soft)] opacity-70 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2 font-['IBM_Plex_Mono',monospace] text-[8px] uppercase tracking-[0.12em] text-white/25">
                <span className="size-1.5 rounded-full bg-emerald-400/70" />
                <span>{routine?.exercises?.length || 0} ejercicios conectados al canvas</span>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[92%] rounded-2xl px-3 py-2.5 text-[11px] leading-relaxed ${message.role === 'user' ? 'rounded-br-md bg-[var(--builder-accent)]/20 text-white/90' : 'rounded-bl-md border border-white/[0.08] bg-white/[0.045] text-white/72'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1 px-2 py-1 text-[10px] text-white/35">
                  <span className="size-1.5 animate-pulse rounded-full bg-[var(--builder-accent)]" />
                  <span className="size-1.5 animate-pulse rounded-full bg-[var(--builder-accent)] [animation-delay:120ms]" />
                  <span className="size-1.5 animate-pulse rounded-full bg-[var(--builder-accent)] [animation-delay:240ms]" />
                  Legacito está pensando
                </div>
              )}
            </>
          )}
        </div>

        <div className="shrink-0 border-t border-white/[0.08] bg-[#0d0e0e] px-3 pb-3 pt-3">
          {errorMessage && (
            <div className="mb-2 flex items-center justify-between gap-2 rounded-xl border border-red-300/20 bg-red-950/40 px-3 py-2 text-[10px] text-red-100/80" role="alert">
              <span>{errorMessage}</span>
              {retryPrompt && (
                <button type="button" onClick={() => void handleSend(retryPrompt, true)} className="shrink-0 rounded-lg border border-red-200/25 px-2 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200">Reintentar</button>
              )}
            </div>
          )}
          <div className="relative flex items-center rounded-2xl border border-white/[0.1] bg-white/[0.045] focus-within:border-[var(--builder-accent)]/60">
            <input
              value={input}
              maxLength={MAX_INPUT_LENGTH}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void handleSend();
                }
              }}
              placeholder="Preguntale a Legacito..."
              disabled={isTyping || authChecking}
              aria-label="Escribir mensaje para Legacito"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[11px] font-semibold text-white outline-none placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-[var(--builder-accent)]"
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!input.trim() || isTyping}
              className="mr-1.5 grid min-h-10 min-w-10 shrink-0 place-items-center rounded-xl bg-[var(--builder-accent)] text-white transition-all hover:brightness-110 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--builder-accent)]"
              aria-label="Enviar mensaje"
            >
              <SendHorizontal size={14} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between px-1 font-['IBM_Plex_Mono',monospace] text-[8px] uppercase tracking-[0.1em] text-white/25">
            <span>{routine?.exercises?.length || 0} ejercicios en canvas</span>
            <span className="text-[var(--builder-accent-soft)]">A2A listo</span>
          </div>
        </div>
        </>
        )}
      </div>
    );
  }

  const ui = (
    <>
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            className="fixed bottom-5 left-1/2 z-[100001] -translate-x-1/2 rounded-full border border-white/15 bg-[#171717]/95 px-4 py-2 text-[10px] font-semibold text-white/85 shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
            role="status"
            aria-live="polite"
          >
            {feedbackMessage}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Legacito — same as Legacy IA */}
      {!isOpen && (
        <div className="builder-legacito-anchor fixed z-[99990]">
          <div className="builder-legacito-glitch relative drop-shadow-[0_16px_34px_rgba(74,55,24,0.18)] sm:bottom-0">
            <LegacitoActionButton
              onClick={() => setIsOpen(true)}
              mood="thinking"
              size={66}
              skinId={skinId}
              label="Consultar a Legacito"
              buttonSizeClass="size-[68px] sm:size-24"
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
                              aria-describedby="legacito-dock-description"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[99999] flex h-[100dvh] items-end justify-center sm:items-center sm:justify-end sm:p-5"
            >
              <div className="relative h-[min(100dvh,860px)] max-h-[100dvh] w-full sm:h-[min(826px,calc(100dvh-2.5rem))] sm:w-[min(389px,calc(100vw-2.5rem))]">
                {/* Outer phone bezel */}
                <div
                  className="relative flex h-full w-full flex-col overflow-hidden rounded-t-[2rem] border border-b-0 p-[5px] pb-[max(5px,env(safe-area-inset-bottom))] sm:rounded-[3.25rem] sm:border sm:p-[7px]"
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
                    className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[1.65rem] sm:rounded-[2.78rem] sm:border"
                    style={{
                      background: '#080a09',
                      borderColor: '#272A28',
                      boxShadow: '0 22px 50px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.035)',
                    }}
                  >
                    <span id="legacito-dock-description" className="sr-only">Chat de Legacito para construir y ajustar tu plan de fitness.</span>
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
                        {/* Mobile workspace switch — names map to the two live functions. */}
                        <div className="mb-3 flex justify-center sm:hidden">
                          <div className="inline-flex items-center rounded-full border border-white/[0.1] bg-black/30 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.2)]" role="tablist" aria-label="Cambiar entre Cowork y Legacito">
                            <button
                              type="button"
                              role="tab"
                              aria-selected={mobileHeaderTab === 'canvas'}
                              aria-controls="legacito-cowork-panel"
                              tabIndex={mobileHeaderTab === 'canvas' ? 0 : -1}
                              onKeyDown={(event) => {
                                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                                  event.preventDefault();
                                  selectMobileHeaderTab('legacito');
                                }
                              }}
                              onClick={() => selectMobileHeaderTab('canvas')}
                              className={`flex min-h-10 items-center gap-1 rounded-full px-3.5 text-[9px] font-black uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--builder-accent)] ${mobileHeaderTab === 'canvas' ? 'bg-white/[0.12] text-white' : 'text-white/55 hover:bg-white/[0.06] hover:text-white/80'}`}
                            >
                              <SlidersHorizontal size={11} />
                              <span title="Vista previa del plan">Cowork</span>
                            </button>
                            <button
                              type="button"
                              role="tab"
                              aria-selected={mobileHeaderTab === 'legacito'}
                              aria-controls="legacito-chat-panel"
                              tabIndex={mobileHeaderTab === 'legacito' ? 0 : -1}
                              onKeyDown={(event) => {
                                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                                  event.preventDefault();
                                  selectMobileHeaderTab('canvas');
                                }
                              }}
                              onClick={() => selectMobileHeaderTab('legacito')}
                              className={`flex min-h-10 items-center gap-1 rounded-full px-3.5 text-[9px] font-black uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--builder-accent)] ${mobileHeaderTab === 'legacito' ? 'bg-white/[0.12] text-white' : 'text-white/55 hover:bg-white/[0.06] hover:text-white/80'}`}
                            >
                              <MessageCircle size={11} />
                              <span title="Chat con Legacito">Legacito</span>
                            </button>
                          </div>
                        </div>
                      {mobileWorkspace === 'canvas' && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          id="legacito-cowork-panel"
                          role="tabpanel"
                          className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 pb-5 [scrollbar-width:none]"
                          aria-label="Preview del canvas de trabajo"
                        >
                          <div className="flex items-start justify-between gap-3 px-1">
                            <div>
                              <p className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--builder-accent-soft)]">Live canvas</p>
                              <h2 className="mt-1 truncate text-xl font-black uppercase tracking-[-0.04em] text-white">{routine?.name && routine.name !== 'Untitled routine' ? routine.name : 'Tu plan empieza acá'}</h2>
                            </div>
                            <span className="rounded-full border border-white/10 px-2 py-1 font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-[0.12em] text-white/45">Preview</span>
                          </div>

                          <div className="mt-3 grid grid-cols-4 gap-1.5">
                            {[
                              ['Blocks', canvasPreviewStats.exerciseCount],
                              ['Sets', canvasPreviewStats.sets],
                              ['Kcal', Math.round(canvasPreviewStats.kcal)],
                              ['Volume', Math.round(canvasPreviewStats.volume)],
                            ].map(([label, value]) => (
                              <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-2 py-2 text-center">
                                <p className="font-['IBM_Plex_Mono',monospace] text-[7px] font-bold uppercase tracking-[0.1em] text-white/30">{label}</p>
                                <p className="mt-1 text-sm font-black text-white/85">{value}</p>
                              </div>
                            ))}
                          </div>

                          {canvasPreviewStats.exerciseCount === 0 && canvasPreviewStats.foodCount === 0 ? (
                            <div className="mt-4 flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
                              <span className="grid size-11 place-items-center rounded-2xl border border-[var(--builder-accent)]/35 bg-[var(--builder-accent)]/10 text-2xl text-[var(--builder-accent-soft)]">+</span>
                              <p className="mt-4 text-[15px] font-black uppercase tracking-[-0.02em] text-white/85">Canvas vacío</p>
                              <p className="mt-1 max-w-[220px] text-[10px] leading-relaxed text-white/40">Agregá ejercicios o comidas desde el catálogo para verlos acá.</p>
                            </div>
                          ) : (
                            <div className="mt-4 space-y-2">
                              {routine.exercises.map((exercise, index) => (
                                <div key={exercise.id || `${exercise.name}-${index}`} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2.5">
                                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[var(--builder-accent)]/15 font-['IBM_Plex_Mono',monospace] text-[9px] font-bold text-[var(--builder-accent-soft)]">{String(index + 1).padStart(2, '0')}</span>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-[11px] font-bold text-white/80">{exercise.name}</p>
                                    <p className="mt-0.5 font-['IBM_Plex_Mono',monospace] text-[8px] uppercase tracking-[0.1em] text-white/35">{exercise.sets || 0} sets · {exercise.reps || 0} reps</p>
                                  </div>
                                </div>
                              ))}
                              {routine.foods.map((food) => (
                                <div key={food.id} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2.5">
                                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-400/10 text-sm text-emerald-300">⌁</span>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-[11px] font-bold text-white/80">{food.name}</p>
                                    <p className="mt-0.5 font-['IBM_Plex_Mono',monospace] text-[8px] uppercase tracking-[0.1em] text-white/35">{Math.round(food.calories || 0)} kcal · {food.portion || 'porción'}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                      <div ref={scrollRef} id="legacito-chat-panel" role="tabpanel" aria-live="polite" aria-label="Conversación con Legacito" className={`${mobileWorkspace === 'canvas' ? 'hidden' : 'flex'} relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 pb-16 [scrollbar-width:none]`}>
                        {messages.length === 0 ? (
                          <div className="flex min-h-full flex-col items-center justify-start px-2 pt-6 pb-10 text-center">
                            <motion.h1
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mx-auto w-full max-w-[320px] text-center text-balance text-[2rem] font-black uppercase leading-[0.9] tracking-[-0.035em] text-[#fbfaf6]"
                            >
                              ¿En qué puedo ayudarte hoy?
                            </motion.h1>
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
                                          onClick={async () => announce((await copyToClipboard(msg.content)) ? 'Mensaje copiado' : 'No se pudo copiar')}
                                          className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--builder-accent)]"
                                          title="Copiar"
                                          aria-label="Copiar respuesta"
                                        >
                                          <Copy size={14} />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => void shareMessage(msg.content)}
                                          className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--builder-accent)]"
                                          title="Compartir"
                                          aria-label="Compartir respuesta"
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

                      <div className={`${mobileWorkspace === 'canvas' ? 'hidden' : 'block'} shrink-0 space-y-2.5`}>
                        {/* Login prompt appears only after an unauthenticated user starts typing. */}
                        <AnimatePresence initial={false}>
                          {!authChecking && !isAuthenticated && input.trim() && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.98 }}
                              className="relative z-20 mx-2 mb-1 flex items-center justify-between gap-3 rounded-xl border border-[var(--builder-accent)]/30 bg-[#1a120c]/95 px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.38)]"
                              role="status"
                            >
                              <span className="text-[9px] font-semibold text-white/65">Iniciá sesión para usar el chat.</span>
                              <button type="button" onClick={openLegacyAiLogin} className="shrink-0 text-[8px] font-black uppercase tracking-[0.1em] text-[var(--builder-accent-soft)]">Login</button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence initial={false}>
                          {errorMessage && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              className="mx-2 flex items-center justify-between gap-3 rounded-xl border border-red-300/20 bg-red-950/40 px-3 py-2 text-[10px] text-red-100/80"
                              role="alert"
                            >
                              <span>{errorMessage}</span>
                              {retryPrompt && (
                                <button
                                  type="button"
                                  onClick={() => void handleSend(retryPrompt, true)}
                                  className="shrink-0 rounded-lg border border-red-200/25 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-red-100 transition hover:bg-red-100/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
                                >
                                  Reintentar
                                </button>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* COMPOSER */}
                        <div className="relative z-10 shrink-0 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-2">
                          <div className="mx-auto flex min-h-[76px] w-full flex-col gap-2 rounded-[1.5rem] border border-white/10 bg-[#111111]/95 p-2 shadow-[0_16px_48px_-34px_rgba(0,0,0,0.95)]">
                            <div className="relative flex items-center gap-1.5 rounded-[1.25rem] border border-white/10 bg-[#070707] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
                              <div className="relative">
                                      <button
                                        type="button"
                                        onClick={() => setModeOpen((v) => !v)}
                                        className={`flex min-h-10 shrink-0 items-center gap-1 rounded-full border px-3 text-[9px] font-black uppercase tracking-[0.12em] transition-all active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--builder-accent)] ${MODE_CHIP[mode].active}`}
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
                                  maxLength={MAX_INPUT_LENGTH}
                                  onChange={(e) => setInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      void handleSend();
                                    }
                                  }}
                                  disabled={isTyping || authChecking}
                                  aria-label="Escribir mensaje para Legacito"
                                  placeholder={authChecking ? 'Verificando sesión…' : isAuthenticated ? 'Escribí para hablar con Legacito…' : 'Iniciá sesión para usar el chat…'}
                                  className="relative z-10 w-full rounded-full border border-transparent bg-transparent py-2.5 pl-3 pr-12 text-[14px] font-semibold text-[#f6f3ed] outline-none placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-[var(--builder-accent)]"
                                />
                                <button
                                  type="button"
                                  onClick={() => void handleSend()}
                                  disabled={!isAuthenticated || !input.trim() || isTyping || authChecking}
                                  className="absolute right-1 z-20 flex min-h-10 min-w-10 items-center justify-center rounded-full border border-bronze-600/70 bg-gradient-to-br from-[#4a3718] to-[#5c4620] text-[#f0ede7] shadow-[0_8px_20px_rgba(74,55,24,0.12)] transition-all hover:from-[#5c4620] hover:to-[#6d5428] hover:scale-105 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--builder-accent)]"
                                  aria-label="Enviar mensaje"
                                >
                                  <SendHorizontal size={14} />
                                </button>
                              </div>
                            </div>
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
                        ref={historyPanelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Historial de conversaciones"
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
                              ref={historyCloseRef}
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
                            <button
                              type="button"
                              onClick={handleRequestCanvas}
                              className="mt-2 flex min-h-11 w-full items-center justify-between rounded-[0.85rem] border border-white/10 bg-white/[0.035] px-3 text-left text-white/80 transition-colors hover:border-[var(--builder-accent)]/45 hover:bg-[var(--builder-accent)]/10 hover:text-white"
                            >
                              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em]">
                                <SlidersHorizontal size={14} className="text-[var(--builder-accent)]" />
                                Canvas de trabajo
                              </span>
                              <span className="text-[10px] font-medium text-white/35">Volver</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowMascotSettings((visible) => !visible)}
                              className={`mt-2 flex min-h-11 w-full items-center justify-between rounded-[0.85rem] border px-3 text-left transition-colors ${showMascotSettings ? 'border-[var(--builder-accent)]/45 bg-[var(--builder-accent)]/10 text-white' : 'border-white/10 bg-white/[0.035] text-white/75 hover:border-white/20 hover:bg-white/[0.06]'}`}
                              aria-expanded={showMascotSettings}
                              aria-controls="legacito-customize-panel"
                            >
                              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em]">
                                <SlidersHorizontal size={14} className="text-[var(--builder-accent)]" />
                                Personalizar
                              </span>
                              <span className="text-[10px] font-medium text-white/35">Mascota y skin</span>
                            </button>
                            <AnimatePresence initial={false}>
                              {showMascotSettings && (
                                <motion.div
                                  id="legacito-customize-panel"
                                  initial={{ opacity: 0, height: 0, y: -4 }}
                                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                                  exit={{ opacity: 0, height: 0, y: -4 }}
                                  className="space-y-2 overflow-hidden rounded-[0.85rem] border border-[var(--builder-accent)]/20 bg-white/[0.025] p-2.5"
                                >
                                  <label className="block space-y-1.5">
                                    <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-[0.14em] text-white/35">Mascota</span>
                                    <select value="legacito" disabled className="builder-select w-full" aria-label="Seleccionar mascota">
                                      <option value="legacito">Legacito · Mentor fitness</option>
                                    </select>
                                  </label>
                                  <label className="block space-y-1.5">
                                    <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-[0.14em] text-white/35">Skin</span>
                                    <select
                                      value={skinId}
                                      disabled={!onSkinChange}
                                      onChange={(event) => onSkinChange?.(event.target.value as LegacitoSkin)}
                                      className="builder-select w-full"
                                      aria-label="Seleccionar skin de Legacito"
                                    >
                                      {LEGACITO_SKIN_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label} · {option.description}</option>
                                      ))}
                                    </select>
                                  </label>
                                </motion.div>
                              )}
                            </AnimatePresence>
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
                        <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-4">
                          {conversations.length > 0 ? conversations.map((conversation) => (
                            <button
                              key={conversation.id}
                              type="button"
                              onClick={() => loadConversation(conversation)}
                              className={`rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--builder-accent)] ${activeConversationId === conversation.id ? 'border-[var(--builder-accent)]/45 bg-[var(--builder-accent)]/10' : 'border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.06]'}`}
                              aria-label={`Abrir conversación ${conversation.title}`}
                            >
                              <span className="block truncate text-[11px] font-semibold text-white/82">{conversation.title}</span>
                              <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.1em] text-white/32">
                                {new Date(conversation.updatedAt).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })} · {conversation.messages.length} mensajes
                              </span>
                            </button>
                          )) : (
                            <div className="flex flex-1 items-center justify-center px-4 py-8 text-center">
                              <p className="text-[11px] font-medium text-white/30">Tus conversaciones aparecerán acá.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* Legacito peeking outside phone */}
                <div className="pointer-events-none absolute -bottom-3 -left-12 z-20 hidden sm:block">
                  <Legacito size={78} mood="thinking" skinId={skinId} className="drop-shadow-[0_14px_28px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .builder-legacito-glitch::before,
          .builder-legacito-glitch::after,
          .builder-legacito-glitch > * {
            animation: none !important;
          }
        }
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
