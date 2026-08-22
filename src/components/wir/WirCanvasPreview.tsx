import { useState, useMemo, useEffect, useCallback } from 'react';
import { assetUrl, localAssetUrl, ASSET_BASE_URL } from '../../lib/cdn';
import { motion, AnimatePresence } from 'framer-motion';
import { FoodIconRenderer as FoodIcon } from '../workout/FoodIconRenderer';
import { UiIcon } from '../UiIcon';

export interface CanvasExercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
  section?: string;
}

export interface CanvasFood {
  name: string;
  quantity: number;
  protein: number;
  calories: number;
  notes?: string;
  category?: string;
}

const ICON_MAP: Record<string, string> = {
  pecho: 'icono_pecho.svg',
  espalda: 'icono_espalda.svg',
  hombros: 'icono_hombros.svg',
  brazos: 'icono_brazos.svg',
  legs: 'icono_legs.svg',
  cardio: 'icono_cardio.svg',
  cycling: 'icono_ciclismo.svg',
  crossfit: 'icono_crossfit.svg',
  fullbody: 'icono_fullbody.svg',
  meditation: 'icono_meditacion.svg',
  boxing: 'icono_boxeo.svg',
  custom: 'icono_personalizado.svg',
  calisthenics: 'icono_calistenia.svg',
};

const ExerciseIcon = ({ section, className = 'h-5 w-5' }: { section?: string; className?: string }) => {
  const normalizedSection = (section || '').toLowerCase().trim();
  const iconFile = ICON_MAP[normalizedSection] || 'icono_personalizado.svg';

  return (
    <img
      src={`${ASSET_BASE_URL}/assets/icons/workouts/${iconFile}`}
      className={`${className} object-contain shrink-0`}
      alt={section || 'exercise'}
    />
  );
};

interface WirCanvasPreviewProps {
  template: 'routine' | 'meal' | 'mixed';
  palette?: 'ember' | 'onyx' | 'midnight' | 'bloom';
  title: string;
  exercises: CanvasExercise[];
  foods: CanvasFood[];
  checkedItems?: Set<string>;
  onToggleItem?: (id: string) => void;
  isPreview?: boolean;
}

type CanvasTheme = {
  background: string;
  surface: string;
  mutedSurface: string;
  border: string;
  text: string;
  onSurface: string;
  mutedText: string;
  subtle: string;
  accent: string;
  accentSoft: string;
  noteBg: string;
  trackBg: string;
  glowFrom: string;
  glowTo: string;
};

const THEMES: Record<string, CanvasTheme> = {
  ember: {
    background: '#080808',
    surface: '#111114',
    mutedSurface: '#18181c',
    border: 'rgba(255,255,255,0.07)',
    text: '#F1F0F4',
    onSurface: '#F1F0F4',
    mutedText: '#7E7A75',
    subtle: '#9CA0A6',
    accent: '#E0793C',
    accentSoft: 'rgba(224,121,60,0.12)',
    noteBg: 'rgba(255,255,255,0.03)',
    trackBg: 'rgba(255,255,255,0.06)',
    glowFrom: 'rgba(224,121,60,0.09)',
    glowTo: 'rgba(244,114,182,0.09)',
  },
  onyx: {
    background: '#09090b',
    surface: '#141417',
    mutedSurface: '#1e1e24',
    border: 'rgba(255,255,255,0.08)',
    text: '#F1F0F4',
    onSurface: '#F1F0F4',
    mutedText: '#888888',
    subtle: '#9CA0A6',
    accent: '#F472B6',
    accentSoft: 'rgba(244,114,182,0.12)',
    noteBg: 'rgba(255,255,255,0.04)',
    trackBg: 'rgba(255,255,255,0.06)',
    glowFrom: 'rgba(244,114,182,0.08)',
    glowTo: 'rgba(224,121,60,0.08)',
  },
  midnight: {
    background: '#0a0d14',
    surface: '#121824',
    mutedSurface: '#192234',
    border: 'rgba(255,255,255,0.06)',
    text: '#DEE6F0',
    onSurface: '#DEE6F0',
    mutedText: '#7A8B9E',
    subtle: '#95A5B8',
    accent: '#F5C45E',
    accentSoft: 'rgba(245,196,94,0.12)',
    noteBg: 'rgba(255,255,255,0.04)',
    trackBg: 'rgba(255,255,255,0.06)',
    glowFrom: 'rgba(245,196,94,0.07)',
    glowTo: 'rgba(224,121,60,0.09)',
  },
  bloom: {
    background: '#0e0b0e',
    surface: '#181218',
    mutedSurface: '#241a24',
    border: 'rgba(255,255,255,0.07)',
    text: '#F5EDF5',
    onSurface: '#F5EDF5',
    mutedText: '#9A829A',
    subtle: '#B8A4B8',
    accent: '#FB7185',
    accentSoft: 'rgba(251,113,133,0.14)',
    noteBg: 'rgba(255,255,255,0.04)',
    trackBg: 'rgba(255,255,255,0.06)',
    glowFrom: 'rgba(251,113,133,0.08)',
    glowTo: 'rgba(224,121,60,0.08)',
  },
};

function getTheme(palette?: string): CanvasTheme {
  return THEMES[palette || 'ember'] || THEMES.ember;
}

const formatDisplayTitle = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return 'Rutina Interactiva';
  if (trimmed === trimmed.toUpperCase()) {
    return trimmed.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
  }
  return trimmed;
};

// Subtle Web Audio synthesizer for tactile haptic feedback
function playHapticTick(freq = 600, duration = 0.04) {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors
  }
}

export function WirCanvasPreview({
  template,
  palette,
  title,
  exercises,
  foods,
  checkedItems: externalCheckedItems,
  onToggleItem: externalOnToggleItem,
  isPreview = false,
}: WirCanvasPreviewProps) {
  const theme = getTheme(palette);

  // Internal state for interactive preview
  const [internalChecked, setInternalChecked] = useState<Set<string>>(new Set());
  const [completedSetsMap, setCompletedSetsMap] = useState<Record<string, number>>({});
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'done'>('all');

  // Rest Timer State
  const [restSeconds, setRestSeconds] = useState<number | null>(null);
  const [restRunning, setRestRunning] = useState(false);

  const checkedItems = externalCheckedItems || internalChecked;

  const handleToggle = useCallback((id: string) => {
    playHapticTick(750, 0.05);
    if (externalOnToggleItem) {
      externalOnToggleItem(id);
    }
    setInternalChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, [externalOnToggleItem]);

  const handleSetToggle = useCallback((exIdx: number, targetSets: number) => {
    playHapticTick(820, 0.04);
    const key = `ex_${exIdx}`;
    setCompletedSetsMap((prev) => {
      const current = prev[key] || 0;
      const nextCount = current >= targetSets ? 0 : current + 1;
      const updated = { ...prev, [key]: nextCount };

      if (nextCount >= targetSets) {
        handleToggle(key);
      } else if (checkedItems.has(key)) {
        handleToggle(key);
      }
      return updated;
    });
  }, [handleToggle, checkedItems]);

  // Rest Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (restRunning && restSeconds !== null && restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds((s) => (s && s > 1 ? s - 1 : 0));
      }, 1000);
    } else if (restSeconds === 0 && restRunning) {
      setRestRunning(false);
      playHapticTick(900, 0.2);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [restRunning, restSeconds]);

  const startRestTimer = (seconds: number) => {
    setRestSeconds(seconds);
    setRestRunning(true);
    playHapticTick(650, 0.08);
  };

  const totalMacros = useMemo(() => {
    return foods.reduce((acc, food) => ({
      calories: acc.calories + (Number(food.calories) || 0),
      protein: acc.protein + (Number(food.protein) || 0),
    }), { calories: 0, protein: 0 });
  }, [foods]);

  const totalVolume = useMemo(() => {
    return exercises.reduce((acc, ex) => {
      const sets = Number(ex.sets) || 0;
      const reps = Number(ex.reps) || 0;
      const weight = Number(ex.weight) || 1;
      return acc + sets * reps * weight;
    }, 0);
  }, [exercises]);

  const totalItems = exercises.length + foods.length;
  const progress = totalItems === 0 ? 0 : Math.round((checkedItems.size / totalItems) * 100);
  const totalSets = exercises.reduce((acc, ex) => acc + (Number(ex.sets) || 0), 0);

  const checkedExercises = exercises.filter((_, i) => checkedItems.has(`ex_${i}`)).length;
  const checkedFoods = foods.filter((_, i) => checkedItems.has(`food_${i}`)).length;
  const displayTitle = formatDisplayTitle(title);
  const templateLabel = template === 'meal' ? 'Comida' : template === 'mixed' ? 'Mixto' : 'Rutina';
  const hasExercises = exercises.length > 0;
  const hasFoods = foods.length > 0;
  const isAllComplete = totalItems > 0 && checkedItems.size === totalItems;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full overflow-hidden rounded-[2rem] border shadow-[0_26px_70px_-46px_rgba(0,0,0,0.8)]"
      style={{ background: theme.background, borderColor: theme.border }}
    >
      {/* ─── Header ─── */}
      <div className="border-b px-5 py-3.5" style={{ borderColor: theme.border, background: theme.mutedSurface }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg" style={{ background: theme.background }}>
              <img src={localAssetUrl('/cyan.svg')} alt="Fit Legacy" className="h-full w-full object-cover opacity-90" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-['Big_Shoulders_Display',sans-serif] text-sm font-bold uppercase tracking-wide" style={{ color: theme.onSurface }}>Fit Legacy</p>
              <div className="flex items-center gap-1.5">
                <motion.span className="h-1.5 w-1.5 rounded-full" style={{ background: theme.accent }}
                  animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} />
                <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-bold uppercase tracking-wider" style={{ color: theme.accent }}>Checklist Interactivo</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex shrink-0 items-center rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider" style={{ background: theme.accentSoft, color: theme.accent, fontFamily: "'IBM Plex Mono', monospace" }}>
              {templateLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative px-5 py-5" style={{ background: theme.background }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(55% 30% at 85% 0%, ${theme.glowFrom}, transparent 60%), radial-gradient(40% 25% at 15% 100%, ${theme.glowTo}, transparent 60%)`
          }}
        />

        <div className="relative space-y-5">
          {/* Title & Live Status */}
          <div className="space-y-1">
            <h1 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black uppercase leading-tight tracking-tight" style={{ color: theme.onSurface }}>
              {displayTitle}
            </h1>
            <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium leading-relaxed" style={{ color: theme.subtle }}>
              Tocá cada ejercicio o serie para marcar tu progreso en vivo.
            </p>
          </div>

          {/* ─── Interactive Rest Timer Bar ─── */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 px-3">
            <div className="flex items-center gap-2">
              <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-bold uppercase tracking-wider text-[#7E7A75]">
                ⏱️ DESCANSO:
              </span>
              <span className="font-['Big_Shoulders_Display',sans-serif] text-lg font-black tabular-nums text-white">
                {restSeconds !== null ? `${Math.floor(restSeconds / 60)}:${String(restSeconds % 60).padStart(2, '0')}` : '00:00'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => startRestTimer(60)}
                className="fl-cut-sm px-2.5 py-1 text-[9px] font-bold uppercase hover:text-white"
              >
                60s
              </button>
              <button
                type="button"
                onClick={() => startRestTimer(90)}
                className="fl-cut-sm px-2.5 py-1 text-[9px] font-bold uppercase hover:text-white"
              >
                90s
              </button>
              {restRunning && (
                <button
                  type="button"
                  onClick={() => { setRestRunning(false); setRestSeconds(null); }}
                  className="fl-cut-sm px-2 py-1 text-[9px] text-rose-400"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* ─── Interactive KPIs Row ─── */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border p-2.5" style={{ background: theme.surface, borderColor: theme.border }}>
              <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase text-[#7E7A75]">Ejercicios</span>
              <div className="mt-0.5 flex items-baseline gap-1 font-['Big_Shoulders_Display',sans-serif] text-2xl font-black text-white">
                {checkedExercises}<span className="text-xs text-white/40">/{exercises.length}</span>
              </div>
            </div>

            <div className="rounded-xl border p-2.5" style={{ background: theme.surface, borderColor: theme.border }}>
              <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase text-[#7E7A75]">Volumen</span>
              <div className="mt-0.5 flex items-baseline gap-1 font-['Big_Shoulders_Display',sans-serif] text-2xl font-black text-white">
                {totalVolume > 0 ? totalVolume.toLocaleString() : '—'}<span className="text-xs text-white/40">kg</span>
              </div>
            </div>

            <div className="rounded-xl border p-2.5" style={{ background: theme.surface, borderColor: theme.border }}>
              <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase text-[#7E7A75]">Comidas</span>
              <div className="mt-0.5 flex items-baseline gap-1 font-['Big_Shoulders_Display',sans-serif] text-2xl font-black text-white">
                {checkedFoods}<span className="text-xs text-white/40">/{foods.length}</span>
              </div>
            </div>

            <div className="rounded-xl border p-2.5" style={{ background: theme.surface, borderColor: theme.border }}>
              <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase text-[#7E7A75]">Proteína</span>
              <div className="mt-0.5 flex items-baseline gap-1 font-['Big_Shoulders_Display',sans-serif] text-2xl font-black text-[#FB7185]">
                {Math.round(totalMacros.protein)}<span className="text-xs text-white/40">g</span>
              </div>
            </div>
          </div>

          {/* ─── Interactive Dynamic Progress Ring & Filter Pills ─── */}
          {totalItems > 0 && (
            <div className="flex flex-col items-center gap-3 pt-1">
              <ProgressRing
                progress={progress}
                total={totalItems}
                done={checkedItems.size}
                accent={theme.accent}
                theme={theme}
              />

              {/* Completion Banner */}
              <AnimatePresence>
                {isAllComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-1.5 text-xs font-black uppercase text-emerald-400 font-mono"
                  >
                    <span>✓ ¡RUTINA COMPLETADA AL 100%!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`fl-cut-sm px-3 py-1 text-[9px] ${filterMode === 'all' ? 'fl-cut-sm--active !border-[#E0793C]' : ''}`}
                >
                  TODOS ({totalItems})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('pending')}
                  className={`fl-cut-sm px-3 py-1 text-[9px] ${filterMode === 'pending' ? 'fl-cut-sm--active !border-[#E0793C]' : ''}`}
                >
                  PENDIENTES ({totalItems - checkedItems.size})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('done')}
                  className={`fl-cut-sm px-3 py-1 text-[9px] ${filterMode === 'done' ? 'fl-cut-sm--active !border-[#10B981] !text-emerald-400' : ''}`}
                >
                  COMPLETADOS ({checkedItems.size})
                </button>
              </div>
            </div>
          )}

          {/* ─── Interactive Items List ─── */}
          <div className="space-y-4 pt-1">
            {hasExercises && (
              <InteractiveSection
                title="Entrenamiento & Series"
                items={exercises}
                type="ex"
                checkedItems={checkedItems}
                completedSetsMap={completedSetsMap}
                filterMode={filterMode}
                onToggle={handleToggle}
                onSetToggle={handleSetToggle}
                theme={theme}
              />
            )}

            {hasFoods && (
              <InteractiveSection
                title="Comidas & Nutrición"
                items={foods}
                type="food"
                checkedItems={checkedItems}
                completedSetsMap={completedSetsMap}
                filterMode={filterMode}
                onToggle={handleToggle}
                onSetToggle={handleSetToggle}
                theme={theme}
              />
            )}
          </div>
        </div>
      </div>

      {/* ─── Footer Action ─── */}
      <div className="border-t px-5 py-3 text-center" style={{ borderColor: theme.border, background: theme.mutedSurface }}>
        <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-bold text-[#7E7A75]">
          Tu progreso se guarda automáticamente en el navegador.
        </p>
      </div>
    </motion.div>
  );
}

function ProgressRing({ progress, total, done, accent, theme }: { progress: number; total: number; done: number; accent: string; theme: CanvasTheme }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);
  const isComplete = progress >= 100;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="108" height="108" className="-rotate-90">
        <circle cx="54" cy="54" r={radius} fill="none" stroke={theme.trackBg} strokeWidth="6" />
        <motion.circle
          cx="54" cy="54" r={radius}
          fill="none"
          stroke={isComplete ? '#10B981' : accent}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${isComplete ? '#10B981' : accent}55)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-black leading-none tracking-tight tabular-nums"
          style={{ color: isComplete ? '#10B981' : theme.onSurface }}
        >
          {Math.round(progress)}%
        </span>
        <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-bold text-[#7E7A75] mt-0.5">
          {done}/{total} items
        </span>
      </div>
    </div>
  );
}

interface InteractiveSectionProps {
  title: string;
  items: Array<CanvasExercise | CanvasFood>;
  type: 'ex' | 'food';
  checkedItems: Set<string>;
  completedSetsMap: Record<string, number>;
  filterMode: 'all' | 'pending' | 'done';
  onToggle: (id: string) => void;
  onSetToggle: (exIdx: number, totalSets: number) => void;
  theme: CanvasTheme;
}

function InteractiveSection({
  title,
  items,
  type,
  checkedItems,
  completedSetsMap,
  filterMode,
  onToggle,
  onSetToggle,
  theme,
}: InteractiveSectionProps) {
  const filtered = items.map((item, idx) => ({ item, idx })).filter(({ idx }) => {
    const isDone = checkedItems.has(`${type}_${idx}`);
    if (filterMode === 'pending') return !isDone;
    if (filterMode === 'done') return isDone;
    return true;
  });

  if (filtered.length === 0) return null;

  return (
    <section className="space-y-2.5">
      <h2 className="font-['IBM_Plex_Mono',monospace] text-[9px] font-black uppercase tracking-[0.16em] text-[#7E7A75]">
        {title} ({filtered.length})
      </h2>

      <div className="space-y-2">
        {filtered.map(({ item, idx }) => {
          const itemId = `${type}_${idx}`;
          const isDone = checkedItems.has(itemId);
          const isExercise = type === 'ex';
          const ex = item as CanvasExercise;
          const food = item as CanvasFood;
          const currentSets = completedSetsMap[itemId] || (isDone ? ex.sets : 0);

          return (
            <motion.div
              layout
              key={itemId}
              whileTap={{ scale: 0.985 }}
              className={`relative overflow-hidden rounded-xl border p-3.5 transition-all ${
                isDone
                  ? 'border-emerald-500/30 bg-emerald-500/[0.04]'
                  : 'border-white/[0.06] bg-[#0c0c0e]/80 hover:border-white/15'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Checkbox Trigger */}
                  <button
                    type="button"
                    onClick={() => onToggle(itemId)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all ${
                      isDone
                        ? 'border-emerald-400 bg-emerald-500 text-black font-black text-xs'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    {isDone ? '✓' : ''}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {isExercise ? (
                        <ExerciseIcon section={ex.section} className="h-5 w-5" />
                      ) : (
                        <FoodIcon category={food.category} name={food.name} className="h-5 w-5" />
                      )}
                      <h3
                        className={`truncate font-['Big_Shoulders_Display',sans-serif] text-base font-bold uppercase ${
                          isDone ? 'text-white/40 line-through' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </h3>
                    </div>

                    {/* Metadata */}
                    <div className="mt-1 flex flex-wrap gap-2 font-['IBM_Plex_Mono',monospace] text-[10px] font-bold text-white/50">
                      {isExercise ? (
                        <>
                          <span className="text-[var(--builder-accent-soft)]">{ex.sets} series</span>
                          <span>·</span>
                          <span>{ex.reps} reps</span>
                          {ex.weight > 0 && (
                            <>
                              <span>·</span>
                              <span className="text-white/80">{ex.weight} kg</span>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <span className="text-[#E0793C]">{food.quantity || 100}g</span>
                          <span>·</span>
                          <span>{food.calories} kcal</span>
                          <span>·</span>
                          <span className="text-[#FB7185]">{food.protein}g prot</span>
                        </>
                      )}
                    </div>

                    {/* Exercise Interactive Set-by-Set Pills */}
                    {isExercise && ex.sets > 1 && (
                      <div className="mt-2.5 flex items-center gap-1.5 pt-1 border-t border-white/[0.04]">
                        <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase text-[#7E7A75] mr-1">
                          SERIES:
                        </span>
                        {Array.from({ length: ex.sets }).map((_, setIndex) => {
                          const setDone = currentSets > setIndex;
                          return (
                            <button
                              key={setIndex}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetToggleClick(setIndex + 1);
                              }}
                              className={`flex h-6 min-w-[24px] px-1.5 items-center justify-center rounded-md text-[9px] font-mono font-bold transition-all ${
                                setDone
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-white/[0.04] text-white/40 border border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
                              }`}
                            >
                              {setDone ? `✓ S${setIndex + 1}` : `S${setIndex + 1}`}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );

          function handleSetToggleClick(targetCount: number) {
            onSetToggle(idx, ex.sets);
          }
        })}
      </div>
    </section>
  );
}
