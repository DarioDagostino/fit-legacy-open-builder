import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  CirclePlus,
} from 'lucide-react';
import CalendarAnalyticsDashboard from './CalendarAnalyticsDashboard';
import { scopedLocalStorageGet, scopedLocalStorageSet } from '../../lib/userScope';
import { UiIcon } from '../UiIcon';

// ── Types ────────────────────────────────────────────────────────────────────

export interface CalendarEntry {
  date: string; // ISO date key YYYY-MM-DD
  type: 'workout' | 'nutrition' | 'mixed';
  name: string;
  exercises: number;
  foods: number;
  totalVolume: number;
  totalCalories: number;
  slug?: string;
  views?: number;
  completions?: number;
  reshares?: number;
  avgTimeSpent?: number;
}

export type CalendarActionType = 'workout' | 'meal' | 'reminder';

export interface CalendarAction {
  id: string;
  date: string;
  title: string;
  type: CalendarActionType;
  time?: string;
  notes?: string;
  completed: boolean;
}

interface CalendarPanelProps {
  /** All saved routine entries. Each is timestamped by date. */
  entries: CalendarEntry[];
  /** User-created actions and reminders, separate from shared routine analytics. */
  actions?: CalendarAction[];
  onActionsChange?: (actions: CalendarAction[]) => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const DAY_LABELS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

function isSameDay(a: string, b: string) {
  return a === b;
}

const panelVariants = {
  initial: { opacity: 0, y: 18, scale: 0.985 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
      when: 'beforeChildren',
      staggerChildren: 0.055,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.992,
    transition: { duration: 0.18, ease: 'easeInOut' as const },
  },
};

const sectionVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.16, ease: 'easeInOut' as const },
  },
};

const quietPanelVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.16 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

// ── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'fl-builder-calendar';
const ACTIONS_STORAGE_KEY = 'fl-builder-calendar-actions';

export function loadCalendarEntries(): CalendarEntry[] {
  return scopedLocalStorageGet<CalendarEntry[]>(STORAGE_KEY, []);
}

export function saveCalendarEntry(entry: CalendarEntry) {
  const existing = loadCalendarEntries();
  const idx = existing.findIndex((e) => e.date === entry.date);
  if (idx >= 0) {
    const previous = existing[idx];
    const sameActivity = previous.name === entry.name && previous.type === entry.type;
    const mergedType = previous.type === entry.type ? previous.type : 'mixed';
    existing[idx] = {
      ...previous,
      ...entry,
      type: sameActivity ? entry.type : mergedType,
      name: sameActivity ? entry.name : `${previous.name} · ${entry.name}`.slice(0, 120),
      exercises: sameActivity ? entry.exercises : previous.exercises + entry.exercises,
      foods: sameActivity ? entry.foods : previous.foods + entry.foods,
      totalVolume: sameActivity ? entry.totalVolume : previous.totalVolume + entry.totalVolume,
      totalCalories: sameActivity ? entry.totalCalories : previous.totalCalories + entry.totalCalories,
      slug: entry.slug || previous.slug,
      views: previous.views,
      completions: previous.completions,
      reshares: previous.reshares,
      avgTimeSpent: previous.avgTimeSpent,
    };
  } else {
    existing.push(entry);
  }
  scopedLocalStorageSet(STORAGE_KEY, existing);
  return existing;
}

export function saveCalendarEntries(entries: CalendarEntry[]) {
  scopedLocalStorageSet(STORAGE_KEY, entries);
  return entries;
}

export function loadCalendarActions(): CalendarAction[] {
  const parsed = scopedLocalStorageGet<CalendarAction[]>(ACTIONS_STORAGE_KEY, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function saveCalendarActions(actions: CalendarAction[]) {
  scopedLocalStorageSet(ACTIONS_STORAGE_KEY, actions);
  return actions;
}

// ── Components ───────────────────────────────────────────────────────────────

export default function CalendarPanel({ entries, actions = [], onActionsChange }: CalendarPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(isoDate(today));
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState('');
  const [actionType, setActionType] = useState<CalendarActionType>('reminder');
  const [actionTime, setActionTime] = useState('');
  const [actionNotes, setActionNotes] = useState('');

  const entryMap = useMemo(() => {
    const map = new Map<string, CalendarEntry>();
    entries.forEach((e) => map.set(e.date, e));
    return map;
  }, [entries]);

  const actionDateSet = useMemo(() => new Set(actions.map((action) => action.date)), [actions]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const todayKey = isoDate(today);

  // Stats for the month
  const monthStats = useMemo(() => {
    const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    const monthEntries = entries.filter((e) => e.date.startsWith(prefix));
    const monthActions = actions.filter((action) => action.date.startsWith(prefix));
    const activeDates = new Set([
      ...monthEntries.map((entry) => entry.date),
      ...monthActions.map((action) => action.date),
    ]);
    return {
      entries: monthEntries,
      totalDays: activeDates.size,
      totalExercises: monthEntries.reduce((s, e) => s + e.exercises, 0),
      totalFoods: monthEntries.reduce((s, e) => s + e.foods, 0),
      totalVolume: monthEntries.reduce((s, e) => s + e.totalVolume, 0),
      totalCalories: monthEntries.reduce((s, e) => s + e.totalCalories, 0),
      totalViews: monthEntries.reduce((s, e) => s + (e.views || 0), 0),
      totalCompletions: monthEntries.reduce((s, e) => s + (e.completions || 0), 0),
      totalReshares: monthEntries.reduce((s, e) => s + (e.reshares || 0), 0),
      avgTimeSpent: monthEntries.length > 0
        ? Math.round(monthEntries.reduce((s, e) => s + (e.avgTimeSpent || 0), 0) / monthEntries.length)
        : 0,
      workoutEntries: monthEntries.filter((e) => e.type === 'workout').length,
      nutritionEntries: monthEntries.filter((e) => e.type === 'nutrition').length,
      mixedEntries: monthEntries.filter((e) => e.type === 'mixed').length,
      totalActions: monthActions.length,
      completedActions: monthActions.filter((action) => action.completed).length,
      pendingActions: monthActions.filter((action) => !action.completed).length,
    };
  }, [actions, entries, viewYear, viewMonth]);

  const liveAnalytics = useMemo(() => {
    const activeDayPercent = (monthStats.totalDays / daysInMonth) * 100;
    const exerciseGoal = Math.max(monthStats.totalExercises, 24);
    const mealGoal = Math.max(monthStats.totalFoods, 20);
    const volumeGoal = Math.max(monthStats.totalVolume, 24000);
    const calorieGoal = Math.max(monthStats.totalCalories, 42000);
    const viewGoal = Math.max(monthStats.totalViews, 30);
    const lastEntry = [...monthStats.entries].sort((a, b) => b.date.localeCompare(a.date))[0];

    return {
      activeDayPercent,
      exercisePercent: (monthStats.totalExercises / exerciseGoal) * 100,
      mealPercent: (monthStats.totalFoods / mealGoal) * 100,
      viewPercent: (monthStats.totalViews / viewGoal) * 100,
      completionPercent: monthStats.totalViews > 0 ? (monthStats.totalCompletions / monthStats.totalViews) * 100 : 0,
      outputPercent: ((monthStats.totalVolume / volumeGoal) * 50) + ((monthStats.totalCalories / calorieGoal) * 50),
      lastEntryLabel: lastEntry
        ? `${lastEntry.name} - ${new Date(lastEntry.date + 'T12:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}`
        : 'No shares yet this month',
    };
  }, [daysInMonth, monthStats]);

  // Streak calculation (consecutive days with entries ending on today)
  const streak = useMemo(() => {
    let count = 0;
    const d = new Date(today);
    while (true) {
      if (entryMap.has(isoDate(d)) || actionDateSet.has(isoDate(d))) {
        count++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }, [actionDateSet, entryMap, today]);

  const selectedEntry = selectedDate ? entryMap.get(selectedDate) : null;
  const selectedActions = useMemo(
    () => (selectedDate ? actions.filter((action) => action.date === selectedDate) : []),
    [actions, selectedDate],
  );

  const applyActions = (next: CalendarAction[]) => {
    onActionsChange?.(next);
  };

  const resetComposer = () => {
    setActionTitle('');
    setActionType('reminder');
    setActionTime('');
    setActionNotes('');
    setIsComposerOpen(false);
  };

  const addAction = () => {
    if (!selectedDate || !actionTitle.trim()) return;
    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `action-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    applyActions([
      ...actions,
      {
        id,
        date: selectedDate,
        title: actionTitle.trim(),
        type: actionType,
        time: actionTime || undefined,
        notes: actionNotes.trim() || undefined,
        completed: false,
      },
    ]);
    resetComposer();
  };

  const toggleAction = (id: string) => {
    applyActions(actions.map((action) => (
      action.id === id ? { ...action, completed: !action.completed } : action
    )));
  };

  const removeAction = (id: string) => {
    applyActions(actions.filter((action) => action.id !== id));
  };

  const navigateMonth = (dir: -1 | 1) => {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setViewMonth(m);
    setViewYear(y);
    setSelectedDate(null);
  };

  return (
    <motion.div
      key="calendar-panel"
      variants={shouldReduceMotion ? quietPanelVariants : panelVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full min-h-0 flex flex-col p-4 space-y-4 overflow-y-auto pb-28 sm:p-6 sm:space-y-5"
    >
      {/* Analytics Dashboard */}
      <CalendarAnalyticsDashboard
        data={{
          streak,
          days: monthStats.totalDays,
          exercises: monthStats.totalExercises,
          meals: monthStats.totalFoods,
          views: monthStats.totalViews,
          done: monthStats.totalCompletions,
          reShare: monthStats.totalReshares,
          activeMonth: { active: monthStats.totalDays, total: daysInMonth },
          training: { value: monthStats.totalExercises, percent: liveAnalytics.exercisePercent },
          nutrition: { value: monthStats.totalFoods, percent: liveAnalytics.mealPercent },
          viewsDetail: { value: monthStats.totalViews, percent: liveAnalytics.viewPercent },
          completed: { percent: liveAnalytics.completionPercent, sessions: monthStats.totalCompletions },
          liveMix: {
            shares: monthStats.entries.length,
            workout: monthStats.workoutEntries,
            meals: monthStats.nutritionEntries,
            mixed: monthStats.mixedEntries,
          },
          output: { percent: liveAnalytics.outputPercent, signal: liveAnalytics.lastEntryLabel },
          actions: monthStats.totalActions,
          pendingActions: monthStats.pendingActions,
          completedActions: monthStats.completedActions,
        }}
        month={MONTH_NAMES[viewMonth]}
      />

      {/* Calendar Grid */}
      <motion.section variants={sectionVariants} className="builder-apple-card shrink-0 p-4 space-y-3">
        {/* Month navigation */}
        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            aria-label="Mes anterior"
            onClick={() => navigateMonth(-1)}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
            className="builder-icon-button flex h-8 w-8 items-center justify-center"
          >
            <ChevronLeft size={18} />
          </motion.button>
          <p className="text-sm font-black uppercase tracking-widest text-[#F1F0F4]">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </p>
          <motion.button
            type="button"
            aria-label="Mes siguiente"
            onClick={() => navigateMonth(1)}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
            className="builder-icon-button flex h-8 w-8 items-center justify-center"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-[8px] font-black uppercase tracking-widest text-[#6E6558] py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateKey = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const entry = entryMap.get(dateKey);
            const isToday = isSameDay(dateKey, todayKey);
            const isSelected = selectedDate === dateKey;
            const hasEntry = !!entry;
            const dayActions = actions.filter((action) => action.date === dateKey);
            const hasActivity = hasEntry || dayActions.length > 0;

            return (
              <motion.button
                type="button"
                aria-label={`${day} de ${MONTH_NAMES[viewMonth]} de ${viewYear}${hasActivity ? ', tiene actividad' : ''}`}
                key={dateKey}
                onClick={() => setSelectedDate(isSelected ? null : dateKey)}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
                layout={!shouldReduceMotion}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className={`
                  aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-black transition-all relative
                  ${isSelected
                    ? 'bg-[#E0793C] text-white scale-110 shadow-lg shadow-[#E0793C]/30 z-10'
                    : isToday
                      ? 'bg-[#E0793C]/10 text-[#F1F0F4] ring-2 ring-[#E0793C]/30'
                      : hasActivity
                        ? 'bg-[#F2A468]/10 text-[#F2A468] hover:bg-[#F2A468]/15'
                        : 'text-[#6E6558] hover:bg-[#F1F0F4]/5'
                  }
                `}
              >
                <span className="text-[11px]">{day}</span>
                {hasActivity && !isSelected && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {(entry?.exercises ?? 0) > 0 && <div className="w-1 h-1 rounded-full bg-[#E0793C]" />}
                    {(entry?.foods ?? 0) > 0 && <div className="w-1 h-1 rounded-full bg-[#F2A468]" />}
                    {dayActions.length > 0 && <div className="w-1 h-1 rounded-full bg-[#C66BDE]" />}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Selected Day Detail */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3"
          >
            {selectedEntry ? (
              <>
                <div className="builder-apple-card p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#6E6558]">
                        {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </p>
                      <h3 className="text-lg font-black italic uppercase tracking-tight text-[#F1F0F4] mt-1">
                        {selectedEntry.name}
                      </h3>
                    </div>
                    <div className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest ${
                      selectedEntry.type === 'workout'
                        ? 'bg-[#E0793C]/12 text-[#E0793C]'
                        : selectedEntry.type === 'nutrition'
                          ? 'bg-[#F2A468]/12 text-[#F2A468]'
                          : 'bg-[#8A2F14]/12 text-[#8A2F14]'
                    }`}>
                      {selectedEntry.type === 'workout' ? 'Workout' : selectedEntry.type === 'nutrition' ? 'Nutrition' : 'Mixed'}
                    </div>
                  </div>

                    <div className="grid grid-cols-4 gap-2">
                    <div className="builder-apple-tile p-2.5 text-center">
                      <UiIcon name="dumbbell" className="mx-auto mb-1 h-3.5 w-3.5 text-[#E0793C]" />
                      <p className="text-[7px] font-black text-[#6E6558] uppercase">Exercises</p>
                      <p className="text-xs font-black text-[#F1F0F4]">{selectedEntry.exercises}</p>
                    </div>
                    <div className="builder-apple-tile p-2.5 text-center">
                      <UiIcon name="fuel_protein" variant="green" className="mx-auto mb-1 h-4 w-4" />
                      <p className="text-[7px] font-black text-[#6E6558] uppercase">Foods</p>
                      <p className="text-xs font-black text-[#F1F0F4]">{selectedEntry.foods}</p>
                    </div>
                    <div className="builder-apple-tile p-2.5 text-center">
                      <UiIcon name="graph-bar" variant="duo" className="mx-auto mb-1 h-4 w-4" />
                      <p className="text-[7px] font-black text-[#6E6558] uppercase">Volume</p>
                      <p className="text-xs font-black text-[#F1F0F4]">{Math.round(selectedEntry.totalVolume)}</p>
                    </div>
                    <div className="builder-apple-tile p-2.5 text-center">
                      <Flame className="mx-auto mb-1 h-3.5 w-3.5 text-[#E0793C]" />
                      <p className="text-[7px] font-black text-[#6E6558] uppercase">Kcal</p>
                      <p className="text-xs font-black text-[#F1F0F4]">{Math.round(selectedEntry.totalCalories)}</p>
                    </div>
                    </div>

                  {(selectedEntry.views || selectedEntry.completions || selectedEntry.reshares) && (
                    <div className="grid grid-cols-3 gap-2">
                      <div className="builder-apple-tile p-2.5 text-center">
                        <p className="text-[7px] font-black uppercase text-[#6E6558]">Views</p>
                        <p className="text-xs font-black text-[#E0793C]">{selectedEntry.views || 0}</p>
                      </div>
                      <div className="builder-apple-tile p-2.5 text-center">
                        <p className="text-[7px] font-black uppercase text-[#6E6558]">Done</p>
                        <p className="text-xs font-black text-[#F2A468]">{selectedEntry.completions || 0}</p>
                      </div>
                      <div className="builder-apple-tile p-2.5 text-center">
                        <p className="text-[7px] font-black uppercase text-[#6E6558]">Shares</p>
                        <p className="text-xs font-black text-[#E0793C]">{selectedEntry.reshares || 0}</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : null}

            <div className="builder-apple-card p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#6E6558]">Agenda del día</p>
                  <p className="mt-1 text-xs font-bold text-[#F1F0F4]">
                    {selectedActions.length > 0
                      ? `${selectedActions.filter((action) => action.completed).length}/${selectedActions.length} acciones completadas`
                      : 'Organizá tu próximo paso'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsComposerOpen((open) => !open)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#E0793C] px-3 py-2 text-[9px] font-black uppercase tracking-widest text-white transition hover:bg-[#F08B4A]"
                >
                  <CirclePlus size={14} />
                  Agregar
                </button>
              </div>

              {selectedActions.length > 0 && (
                <div className="space-y-2">
                  {selectedActions.map((action) => (
                    <div key={action.id} className={`flex items-start gap-3 rounded-2xl border px-3 py-3 transition ${action.completed ? 'border-[#8DAE93]/30 bg-[#8DAE93]/5' : 'border-[#F1F0F4]/10 bg-[#F1F0F4]/[0.03]'}`}>
                      <button
                        type="button"
                        onClick={() => toggleAction(action.id)}
                        aria-label={action.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${action.completed ? 'border-[#8DAE93] bg-[#8DAE93] text-[#080808]' : 'border-[#6E6558] text-transparent hover:border-[#E0793C]'}`}
                      >
                        <UiIcon name="validation-1" size={15} active={action.completed} />
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`truncate text-xs font-black ${action.completed ? 'text-[#8DAE93] line-through' : 'text-[#F1F0F4]'}`}>{action.title}</p>
                          <span className="rounded-md bg-[#C66BDE]/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-[#C66BDE]">
                            {action.type === 'workout' ? 'Workout' : action.type === 'meal' ? 'Meal' : 'Reminder'}
                          </span>
                        </div>
                        {(action.time || action.notes) && (
                          <p className="mt-1 text-[10px] font-medium text-[#6E6558]">
                            {action.time ? `${action.time}${action.notes ? ' · ' : ''}` : ''}{action.notes || ''}
                          </p>
                        )}
                      </div>
                      <button type="button" onClick={() => removeAction(action.id)} aria-label="Eliminar acción" className="rounded-lg p-1 text-[#6E6558] transition hover:bg-[#E0793C]/10 hover:text-[#E0793C]"><UiIcon name="cancel-2" size={14} variant="duo" /></button>
                    </div>
                  ))}
                </div>
              )}

              {selectedActions.length === 0 && !isComposerOpen && (
                <div className="rounded-2xl border border-dashed border-[#F1F0F4]/10 px-4 py-5 text-center">
                  <UiIcon name="alert" className="mx-auto h-6 w-6 text-[#6E6558]" />
                  <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-[#6E6558]">Sin acciones programadas</p>
                  <p className="mt-1 text-[10px] font-medium text-[#6E6558]">Agregá un recordatorio, entrenamiento o comida.</p>
                </div>
              )}

              {isComposerOpen && (
                <div className="space-y-3 rounded-2xl border border-[#E0793C]/25 bg-[#E0793C]/[0.04] p-3">
                  <input value={actionTitle} onChange={(event) => setActionTitle(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addAction(); }} autoFocus placeholder="Ej. Preparar rutina de piernas" className="builder-apple-input w-full px-3 py-2 text-xs font-bold focus:outline-none" />
                  <div className="grid grid-cols-2 gap-2">
                    <select value={actionType} onChange={(event) => setActionType(event.target.value as CalendarActionType)} className="builder-select w-full px-3 py-2 text-[10px] font-black uppercase tracking-widest focus:outline-none">
                      <option value="reminder">Recordatorio</option>
                      <option value="workout">Entrenamiento</option>
                      <option value="meal">Comida</option>
                    </select>
                    <input type="time" value={actionTime} onChange={(event) => setActionTime(event.target.value)} className="builder-apple-input w-full px-3 py-2 text-xs font-bold focus:outline-none" />
                  </div>
                  <textarea value={actionNotes} onChange={(event) => setActionNotes(event.target.value)} placeholder="Nota opcional" rows={2} className="builder-apple-input w-full resize-none px-3 py-2 text-xs font-bold focus:outline-none" />
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={resetComposer} className="rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-widest text-[#6E6558] hover:bg-[#F1F0F4]/5">Cancelar</button>
                    <button type="button" disabled={!actionTitle.trim()} onClick={addAction} className="rounded-xl bg-[#E0793C] px-3 py-2 text-[9px] font-black uppercase tracking-widest text-white disabled:cursor-not-allowed disabled:opacity-40">Guardar acción</button>
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Monthly Analytics */}
      {monthStats.totalDays > 0 && (
        <motion.section variants={sectionVariants} className="builder-apple-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <UiIcon name="reward" className="h-4 w-4 text-[#E0793C]" active />
            <p className="text-[10px] font-black uppercase tracking-widest text-[#6E6558]">
              Monthly summary
            </p>
          </div>

          {/* Volume bar chart (simple visual) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#6E6558]">Total volume</p>
              <p className="text-xs font-black text-[#F1F0F4]">{Math.round(monthStats.totalVolume).toLocaleString()} kg</p>
            </div>
            <div className="h-2 bg-[#F1F0F4]/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (monthStats.totalVolume / 50000) * 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="builder-apple-progress h-full rounded-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#6E6558]">Total calories</p>
              <p className="text-xs font-black text-[#F1F0F4]">{Math.round(monthStats.totalCalories).toLocaleString()} kcal</p>
            </div>
            <div className="h-2 bg-[#F1F0F4]/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (monthStats.totalCalories / 60000) * 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="builder-apple-progress h-full rounded-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#6E6558]">Active days</p>
              <p className="text-xs font-black text-[#F1F0F4]">{monthStats.totalDays} / {daysInMonth}</p>
            </div>
            <div className="h-2 bg-[#F1F0F4]/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(monthStats.totalDays / daysInMonth) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="builder-apple-progress h-full rounded-full"
              />
            </div>
          </div>
        </motion.section>
      )}

      {/* Streak badge */}
      {streak >= 3 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="builder-apple-card flex items-center gap-3 p-4"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E0793C]/10">
            <UiIcon name="reward" className="h-7 w-7" variant="duo" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#E0793C]">
              {streak} day streak!
            </p>
            <p className="text-[10px] font-bold text-[#E0793C]/70">
              Keep building routines every day to grow your streak.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
