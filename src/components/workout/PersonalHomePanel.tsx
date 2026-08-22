import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame, Play, ChevronDown } from 'lucide-react';
import { LegacitoUiIcon } from '../UiIcon';
import { useWorkoutStore, type PersonalGoal } from '@/lib/store';
import { useBioLedgerStore } from '@/lib/bioledger-store';

type PersonalDestination = 'catalog' | 'build' | 'train' | 'calendar' | 'coach';

const GOAL_LABELS: Record<PersonalGoal, string> = {
  strength: 'Fuerza',
  muscle: 'Hipertrofia',
  conditioning: 'Rendimiento',
  wellbeing: 'Bienestar',
};

const DAYS_OF_WEEK = [
  { id: 1, name: 'L' },
  { id: 2, name: 'M' },
  { id: 3, name: 'M' },
  { id: 4, name: 'J' },
  { id: 5, name: 'V' },
  { id: 6, name: 'S' },
  { id: 0, name: 'D' },
];

export function PersonalHomePanel({ onNavigate }: { onNavigate: (destination: PersonalDestination) => void }) {
  const currentRoutine = useWorkoutStore((state) => state.currentRoutine);
  const profile = useWorkoutStore((state) => state.personalProfile);
  const updateProfile = useWorkoutStore((state) => state.updatePersonalProfile);
  const stats = useBioLedgerStore((state) => state.stats);
  const sessions = useBioLedgerStore((state) => state.sessions);

  const [showSettings, setShowSettings] = useState<boolean>(false);

  const hasPlan = currentRoutine.exercises.length > 0;
  const today = useMemo(() => new Date(), []);
  const currentDayIndex = today.getDay();

  const sessionsThisWeek = useMemo(() => {
    const threshold = new Date();
    threshold.setHours(0, 0, 0, 0);
    threshold.setDate(threshold.getDate() - 6);
    return sessions.filter((session) => new Date(session.date) >= threshold).length;
  }, [sessions]);

  const routineName = currentRoutine.name && currentRoutine.name !== 'Untitled routine'
    ? currentRoutine.name
    : 'Mi rutina personal';

  const totalPlannedSets = useMemo(
    () => currentRoutine.exercises.reduce((total, ex) => total + ex.sets, 0),
    [currentRoutine.exercises],
  );

  const totalPlannedVolume = useMemo(
    () => currentRoutine.exercises.reduce((total, ex) => total + (ex.sets * ex.reps * (ex.weight || 1)), 0),
    [currentRoutine.exercises],
  );

  const formattedDate = useMemo(() => {
    return today.toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
  }, [today]);

  return (
    <motion.div
      key="personal-home"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="h-full overflow-y-auto p-5 pb-32 sm:p-8 lg:pb-12 custom-scrollbar"
    >
      <div className="mx-auto max-w-2xl space-y-7">

        {/* ── Header ── */}
        <div className="space-y-1">
          <span className="font-[var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6E6558]">
            {formattedDate}
          </span>
          <div className="flex items-end justify-between">
            <h1 className="font-[var(--font-display)] text-[clamp(2.5rem,8vw,3.5rem)] font-extrabold leading-[0.9] tracking-tight text-[#F1F0F4]">
              Hoy
            </h1>
            <div className="flex items-center gap-2 pb-1">
              <div className="fl-cut-chip">
                <Flame size={12} className="text-[var(--builder-accent-soft)]" />
                <span className="font-bold text-[#F1F0F4]">{stats.currentStreak}d</span>
              </div>
              <div className="fl-cut-chip">
                <span className="text-[#6E6558]">Nv.</span>
                <span className="font-bold text-[#F1F0F4]">{stats.level}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Week Strip (Cut Corner Bar) ── */}
        <div className="flex items-center justify-between gap-1.5">
          {DAYS_OF_WEEK.map((d, index) => {
            const isToday = d.id === currentDayIndex;
            const isTargetDay = index < profile.daysPerWeek;
            return (
              <div
                key={index}
                className={`fl-cut-sm flex-1 flex-col py-2 transition-all ${
                  isToday ? 'fl-cut-sm--accent shadow-sm' : ''
                }`}
              >
                <span className={`font-[var(--font-mono)] text-[10px] font-bold ${isToday ? 'text-[var(--builder-accent-soft)]' : 'text-[#6E6558]'}`}>
                  {d.name}
                </span>
                <div className={`mt-1 h-1 w-1 rounded-full ${
                  isToday && isTargetDay ? 'bg-[var(--builder-accent)]' :
                  isTargetDay ? 'bg-white/30' : 'bg-transparent'
                }`} />
              </div>
            );
          })}
        </div>

        {/* ── Hero Section ── */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="font-[var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6558]">
              {hasPlan ? `Split · ${profile.daysPerWeek} días` : 'Empezar'}
            </span>
            <span className="font-[var(--font-mono)] text-[10px] font-semibold text-[#4A4540]">
              {hasPlan ? `~${profile.sessionMinutes} min · ${totalPlannedSets} series` : ''}
            </span>
          </div>

          <div>
            <h2 className="font-[var(--font-display)] text-[clamp(1.75rem,6vw,2.75rem)] font-extrabold leading-[1.05] tracking-tight text-[#F1F0F4]">
              {hasPlan ? routineName : 'Creá tu plan'}
            </h2>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#7A756E]">
              {hasPlan
                ? `${currentRoutine.exercises.length} ejercicios calibrados para ${GOAL_LABELS[profile.goal].toLowerCase()}.`
                : 'Armá tu rutina personalizada o pedile una sugerencia a Legacito.'}
            </p>
          </div>

          {/* Exercise tags (Cut Chips) */}
          {hasPlan && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentRoutine.exercises.slice(0, 5).map((ex) => (
                <span
                  key={ex.id}
                  className="fl-cut-chip"
                >
                  {ex.name} <span className="text-[#6E6558]">({ex.sets}s)</span>
                </span>
              ))}
              {currentRoutine.exercises.length > 5 && (
                <span className="fl-cut-chip text-[#6E6558]">
                  +{currentRoutine.exercises.length - 5}
                </span>
              )}
            </div>
          )}

          {/* Action Button matching the reference clipped primary style */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate(hasPlan ? 'train' : 'catalog')}
              className="fl-cut-cta fl-cut-cta--primary flex min-h-14 w-full items-center justify-center gap-3 px-6 text-[11px] font-black uppercase tracking-[0.18em]"
            >
              <Play size={16} fill="currentColor" />
              {hasPlan ? 'Iniciar Entrenamiento' : 'Crear Rutina'}
            </button>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="h-px bg-white/[0.06]" />

        {/* ── Stats Row (open layout — numbers dominate) ── */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase tracking-[0.15em] text-[#4A4540]">Semana</span>
            <p className="mt-1 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-[#F1F0F4]">
              {sessionsThisWeek}<span className="text-base font-semibold text-[#4A4540]">/{profile.daysPerWeek}</span>
            </p>
          </div>
          <div>
            <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase tracking-[0.15em] text-[#4A4540]">Volumen</span>
            <p className="mt-1 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-[#F1F0F4]">
              {hasPlan ? `${Math.round(totalPlannedVolume / 1000)}k` : '0'}
              <span className="text-base font-semibold text-[#4A4540]"> kg</span>
            </p>
          </div>
          <div>
            <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase tracking-[0.15em] text-[#4A4540]">Tokens</span>
            <p className="mt-1 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--builder-accent-soft)]">
              {stats.coincitos || 0}
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-white/[0.06]" />

        {/* ── Coach Insight (inline row, no generic card) ── */}
        <button
          type="button"
          onClick={() => onNavigate('coach')}
          className="group flex w-full items-center gap-3 text-left"
        >
          <div className="shrink-0">
            <LegacitoUiIcon size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--builder-accent-soft)]">
              Coach Legacito
            </span>
            <p className="truncate text-[12px] font-medium text-[#7A756E] group-hover:text-[#9CA0A6] transition-colors">
              {hasPlan ? 'Buscá +1 rep o +2.5kg en tu primer ejercicio pesado hoy.' : 'Definí tus días de entreno para crear el split ideal.'}
            </p>
          </div>
          <ArrowRight size={14} className="shrink-0 text-[#4A4540] group-hover:text-[var(--builder-accent)] transition-colors" />
        </button>

        {/* ── Quick Settings (Cut Accordion) ── */}
        <div className="fl-cut-card p-4">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="font-[var(--font-mono)] text-[10px] font-bold uppercase tracking-[0.12em] text-[#6E6558]">
              Ajustes · {profile.daysPerWeek}d · {GOAL_LABELS[profile.goal]}
            </span>
            <ChevronDown size={14} className={`text-[#6E6558] transition-transform ${showSettings ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-3.5 pt-4 pb-1">
                  <div className="space-y-1.5">
                    <span className="font-[var(--font-mono)] text-[8px] font-bold uppercase tracking-[0.12em] text-[#6E6558]">Días por semana</span>
                    <div className="grid grid-cols-4 gap-2">
                      {[2, 3, 4, 5].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => updateProfile({ daysPerWeek: d })}
                          className={`fl-cut-sm py-2 font-[var(--font-display)] text-sm font-extrabold transition-colors ${
                            profile.daysPerWeek === d
                              ? 'fl-cut-sm--active'
                              : ''
                          }`}
                        >
                          {d} días
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigate('build')}
                      className="font-[var(--font-mono)] text-[10px] font-bold text-[var(--builder-accent-soft)] hover:underline"
                    >
                      Editar ejercicios y cargas →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
