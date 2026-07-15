import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Dumbbell,
  Apple,
  TrendingUp,
  Calendar as CalendarIcon,
  Clock,
  Award,
} from 'lucide-react';
import CalendarAnalyticsDashboard from './CalendarAnalyticsDashboard';

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

interface CalendarPanelProps {
  /** All saved routine entries. Each is timestamped by date. */
  entries: CalendarEntry[];
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
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.055,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.992,
    transition: { duration: 0.18, ease: 'easeInOut' },
  },
};

const sectionVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.16, ease: 'easeInOut' },
  },
};

const quietPanelVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.16 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

// ── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'fl-builder-calendar';

export function loadCalendarEntries(): CalendarEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveCalendarEntry(entry: CalendarEntry) {
  const existing = loadCalendarEntries();
  const idx = existing.findIndex((e) => e.date === entry.date);
  if (idx >= 0) {
    existing[idx] = {
      ...existing[idx],
      ...entry,
      slug: entry.slug || existing[idx].slug,
      views: existing[idx].views,
      completions: existing[idx].completions,
      reshares: existing[idx].reshares,
      avgTimeSpent: existing[idx].avgTimeSpent,
    };
  } else {
    existing.push(entry);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  return existing;
}

// ── Components ───────────────────────────────────────────────────────────────

export default function CalendarPanel({ entries }: CalendarPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(isoDate(today));

  const entryMap = useMemo(() => {
    const map = new Map<string, CalendarEntry>();
    entries.forEach((e) => map.set(e.date, e));
    return map;
  }, [entries]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const todayKey = isoDate(today);

  // Stats for the month
  const monthStats = useMemo(() => {
    const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    const monthEntries = entries.filter((e) => e.date.startsWith(prefix));
    return {
      entries: monthEntries,
      totalDays: monthEntries.length,
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
    };
  }, [entries, viewYear, viewMonth]);

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
      if (entryMap.has(isoDate(d))) {
        count++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }, [entryMap, today]);

  const selectedEntry = selectedDate ? entryMap.get(selectedDate) : null;

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
      className="h-full flex flex-col p-4 space-y-4 overflow-y-auto pb-28 sm:p-6 sm:space-y-5"
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
        }}
        month={MONTH_NAMES[viewMonth]}
      />

      {/* Calendar Grid */}
      <motion.section variants={sectionVariants} className="builder-apple-card p-4 space-y-3">
        {/* Month navigation */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => navigateMonth(-1)}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
            className="builder-icon-button flex h-8 w-8 items-center justify-center"
          >
            <ChevronLeft size={18} />
          </motion.button>
          <p className="text-sm font-black uppercase tracking-widest text-[#141e30]">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </p>
          <motion.button
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
            <div key={d} className="text-center text-[8px] font-black uppercase tracking-widest text-[#9aa9ba] py-1">
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

            return (
              <motion.button
                key={dateKey}
                onClick={() => setSelectedDate(isSelected ? null : dateKey)}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
                layout={!shouldReduceMotion}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className={`
                  aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-black transition-all relative
                  ${isSelected
                    ? 'bg-[#0071e3] text-white scale-110 shadow-lg shadow-[#0071e3]/30 z-10'
                    : isToday
                      ? 'bg-[#eaf5ff] text-[#141e30] ring-2 ring-[#0071e3]/24'
                      : hasEntry
                        ? 'bg-[#f0f9f3] text-[#28623a] hover:bg-[#e0f2e5]'
                        : 'text-[#5b6472] hover:bg-[#f7f9fc]'
                  }
                `}
              >
                <span className="text-[11px]">{day}</span>
                {hasEntry && !isSelected && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {entry.exercises > 0 && <div className="w-1 h-1 rounded-full bg-[#35577d]" />}
                    {entry.foods > 0 && <div className="w-1 h-1 rounded-full bg-[#28623a]" />}
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
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#5b6472]">
                        {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </p>
                      <h3 className="text-lg font-black italic uppercase tracking-tight text-[#141e30] mt-1">
                        {selectedEntry.name}
                      </h3>
                    </div>
                    <div className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest ${
                      selectedEntry.type === 'workout'
                        ? 'bg-[#eff4fa] text-[#35577d]'
                        : selectedEntry.type === 'nutrition'
                          ? 'bg-[#f0f9f3] text-[#28623a]'
                          : 'bg-[#fdf2f2] text-[#6b1e23]'
                    }`}>
                      {selectedEntry.type === 'workout' ? 'Workout' : selectedEntry.type === 'nutrition' ? 'Nutrition' : 'Mixed'}
                    </div>
                  </div>

                    <div className="grid grid-cols-4 gap-2">
                    <div className="builder-apple-tile p-2.5 text-center">
                      <Dumbbell className="mx-auto mb-1 h-3.5 w-3.5 text-[#35577d]" />
                      <p className="text-[7px] font-black text-[#5b6472] uppercase">Exercises</p>
                      <p className="text-xs font-black text-[#141e30]">{selectedEntry.exercises}</p>
                    </div>
                    <div className="builder-apple-tile p-2.5 text-center">
                      <Apple className="mx-auto mb-1 h-3.5 w-3.5 text-[#28623a]" />
                      <p className="text-[7px] font-black text-[#5b6472] uppercase">Foods</p>
                      <p className="text-xs font-black text-[#141e30]">{selectedEntry.foods}</p>
                    </div>
                    <div className="builder-apple-tile p-2.5 text-center">
                      <TrendingUp className="mx-auto mb-1 h-3.5 w-3.5 text-[#6b1e23]" />
                      <p className="text-[7px] font-black text-[#5b6472] uppercase">Volume</p>
                      <p className="text-xs font-black text-[#141e30]">{Math.round(selectedEntry.totalVolume)}</p>
                    </div>
                    <div className="builder-apple-tile p-2.5 text-center">
                      <Flame className="mx-auto mb-1 h-3.5 w-3.5 text-[#e67700]" />
                      <p className="text-[7px] font-black text-[#5b6472] uppercase">Kcal</p>
                      <p className="text-xs font-black text-[#141e30]">{Math.round(selectedEntry.totalCalories)}</p>
                    </div>
                    </div>

                  {(selectedEntry.views || selectedEntry.completions || selectedEntry.reshares) && (
                    <div className="grid grid-cols-3 gap-2">
                      <div className="builder-apple-tile p-2.5 text-center">
                        <p className="text-[7px] font-black uppercase text-[#5b6472]">Views</p>
                        <p className="text-xs font-black text-[#35577d]">{selectedEntry.views || 0}</p>
                      </div>
                      <div className="builder-apple-tile p-2.5 text-center">
                        <p className="text-[7px] font-black uppercase text-[#5b6472]">Done</p>
                        <p className="text-xs font-black text-[#28623a]">{selectedEntry.completions || 0}</p>
                      </div>
                      <div className="builder-apple-tile p-2.5 text-center">
                        <p className="text-[7px] font-black uppercase text-[#5b6472]">Shares</p>
                        <p className="text-xs font-black text-[#c55a00]">{selectedEntry.reshares || 0}</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="builder-apple-card p-8 text-center space-y-3">
                <Clock className="mx-auto h-10 w-10 text-[#9aa9ba]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-[#5b6472]">
                  {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <p className="text-xs font-bold text-[#9aa9ba]">
                  No routine shared on this day
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Monthly Analytics */}
      {monthStats.totalDays > 0 && (
        <motion.section variants={sectionVariants} className="builder-apple-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[#35577d]" />
            <p className="text-[10px] font-black uppercase tracking-widest text-[#5b6472]">
              Monthly summary
            </p>
          </div>

          {/* Volume bar chart (simple visual) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#5b6472]">Total volume</p>
              <p className="text-xs font-black text-[#141e30]">{Math.round(monthStats.totalVolume).toLocaleString()} kg</p>
            </div>
            <div className="h-2 bg-[#f7f9fc] rounded-full overflow-hidden">
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
              <p className="text-xs font-bold text-[#5b6472]">Total calories</p>
              <p className="text-xs font-black text-[#141e30]">{Math.round(monthStats.totalCalories).toLocaleString()} kcal</p>
            </div>
            <div className="h-2 bg-[#f7f9fc] rounded-full overflow-hidden">
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
              <p className="text-xs font-bold text-[#5b6472]">Active days</p>
              <p className="text-xs font-black text-[#141e30]">{monthStats.totalDays} / {daysInMonth}</p>
            </div>
            <div className="h-2 bg-[#f7f9fc] rounded-full overflow-hidden">
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
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e67700]/10">
            <Award className="h-6 w-6 text-[#e67700]" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#c55a00]">
              {streak} day streak!
            </p>
            <p className="text-[10px] font-bold text-[#e67700]/80">
              Keep building routines every day to grow your streak.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
