import { motion } from 'framer-motion';
import { Pencil, Plus, Rocket, Trash2, Dumbbell, Activity } from 'lucide-react';
import { useWorkoutStore } from '../../lib/store';
import type { CalendarAction, CalendarEntry } from './CalendarPanel';
import { UiIcon } from '../UiIcon';

interface ExerciseSummaryPanelProps {
  calendarEntry?: CalendarEntry;
  calendarAction?: CalendarAction;
  onOpenCatalog: () => void;
  onTrain: () => void;
  onEditDay: (dayId: string) => void;
}

function entryMoment(entry?: CalendarEntry, action?: CalendarAction) {
  const now = new Date();
  const date = entry?.date ? new Date(`${entry.date}T12:00:00`) : now;
  const day = date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
  const time = action?.time || now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
  return `${day} · ${time}`;
}

/* ─── Canonical Chamfered CTA Button ─── */
function EliteChamferButton({
  children,
  onClick,
  variant = 'cyan',
  className = '',
  icon,
  type = 'button',
  disabled = false,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'cyan' | 'white' | 'dark' | 'danger';
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  const isCyan = variant === 'cyan';
  const isWhite = variant === 'white';
  const isDanger = variant === 'danger';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2, scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 0 }}
      transition={{ type: 'spring', stiffness: 480, damping: 26 }}
      className={`group relative min-h-[46px] px-5 py-2.5 flex items-center justify-center gap-2 font-mono text-[11px] font-black uppercase tracking-[0.14em] select-none ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      } ${className}`}
      style={{
        clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
        background: isCyan
          ? 'linear-gradient(135deg, #00d2ee 0%, #0284c7 100%)'
          : isWhite
          ? 'linear-gradient(135deg, #ffffff 0%, #dbe0ea 100%)'
          : isDanger
          ? 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)'
          : 'linear-gradient(135deg, #16161b 0%, #0a0a0d 100%)',
        color: isCyan || isWhite ? '#000000' : '#ffffff',
        boxShadow: isCyan
          ? '-2px 2px 0px #71f6ff, 0 8px 24px rgba(0, 210, 238, 0.4)'
          : isWhite
          ? '-2px 2px 0px var(--builder-accent, #00d2ee), 0 8px 24px rgba(0, 210, 238, 0.25)'
          : isDanger
          ? '-1px 1px 0px #fda4af, 0 6px 20px rgba(244, 63, 94, 0.35)'
          : '-1px 1px 0px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      }}
    >
      {(isCyan || isWhite) && (
        <span className="absolute inset-0 bg-gradient-to-t from-black/[0.06] to-white/40 pointer-events-none opacity-90" />
      )}
      {icon && <span className="relative z-10 shrink-0">{icon}</span>}
      {children && <span className="relative z-10">{children}</span>}
    </motion.button>
  );
}

export function ExerciseSummaryPanel({
  calendarEntry,
  calendarAction,
  onOpenCatalog,
  onTrain,
  onEditDay,
}: ExerciseSummaryPanelProps) {
  const routine = useWorkoutStore((state) => state.currentRoutine);
  const planDays = useWorkoutStore((state) => state.planDays);
  const removeExercise = useWorkoutStore((state) => state.removeExercise);

  const totalSets = routine.exercises.reduce((total, exercise) => total + (Number(exercise.sets) || 0), 0);
  const totalReps = routine.exercises.reduce((total, exercise) => total + (Number(exercise.sets) || 0) * (Number(exercise.reps) || 0), 0);
  const totalVolume = routine.exercises.reduce((total, exercise) => total + (Number(exercise.sets) || 0) * (Number(exercise.reps) || 0) * (Number(exercise.weight) || 0), 0);
  
  const hasExercises = routine.exercises.length > 0;
  const routineName = !routine.name.trim() || routine.name === 'Untitled routine' ? 'Mi rutina' : routine.name;
  const moment = entryMoment(calendarEntry, calendarAction);

  const metrics = [
    { label: 'Ejercicios', value: routine.exercises.length, icon: 'dumbbell' as const, tone: 'text-[var(--builder-accent-soft,#5ce1e6)]' },
    { label: 'Series', value: totalSets, icon: 'graph-bar' as const, tone: 'text-[var(--builder-accent,#00d2ee)]' },
    { label: 'Reps', value: totalReps, icon: 'graph-pie' as const, tone: 'text-white' },
    { label: 'Volumen', value: `${Math.round(totalVolume)}kg`, icon: 'rocket-launch-chart' as const, tone: 'text-rose-400' },
  ];

  const summaryDays = planDays.length > 0
    ? planDays
    : [{ id: 'day-1', label: 'Día 1', exerciseIds: routine.exercises.map((exercise) => exercise.id) }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex h-full flex-col gap-4 overflow-y-auto p-4 pb-28 sm:p-6 !bg-[#000000]"
    >
      {/* ── 4 Metric Tiles ── */}
      <div className="grid grid-cols-4 gap-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl bg-[#07070a] border border-white/[0.08] p-3 text-center">
            <div className="mb-1 flex justify-center">
              <UiIcon name={metric.icon} size={15} active={metric.label === 'Ejercicios'} />
            </div>
            <p className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#6E6558]">{metric.label}</p>
            <p className={`font-['Big_Shoulders_Display',sans-serif] text-2xl font-black italic leading-none mt-0.5 ${metric.tone}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Plan Days Summary ── */}
      {hasExercises && (
        <section className="rounded-[1.75rem] bg-[#07070a] border border-white/[0.08] p-5 space-y-3" aria-label="Resumen de días del plan">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[var(--builder-accent-soft,#5ce1e6)]">
                PLAN SEMANAL
              </span>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black italic text-white leading-none mt-0.5">
                Días listos para editar
              </h2>
            </div>
            <span className="font-mono text-[9px] font-bold text-[#6E6558] px-2 py-0.5 rounded-md bg-white/[0.04]">
              {summaryDays.length} {summaryDays.length === 1 ? 'día' : 'días'}
            </span>
          </div>

          <div className="grid gap-2">
            {summaryDays.map((day) => (
              <article
                key={day.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-bold text-white uppercase">{day.label}</p>
                  <p className="font-mono text-[8px] text-[#6E6558]">
                    {day.exerciseIds.length} {day.exerciseIds.length === 1 ? 'ejercicio' : 'ejercicios'} · edición atómica
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onEditDay(day.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 font-mono text-[9px] font-bold text-[var(--builder-accent-soft,#5ce1e6)] flex items-center gap-1.5 transition-colors"
                  aria-label={`Editar ${day.label}`}
                >
                  <Pencil size={11} /> Editar
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Empty State vs Routine List ── */}
      {!hasExercises ? (
        <div className="flex flex-1 flex-col items-center justify-center space-y-4 p-8 text-center rounded-[1.75rem] bg-[#07070a] border border-white/[0.08]">
          <UiIcon name="dumbbell" size={54} className="opacity-30" />
          <div className="space-y-1.5">
            <h3 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black italic text-white uppercase">
              Sin rutina todavía
            </h3>
            <p className="max-w-xs text-xs text-[#6E6558] leading-relaxed">
              Elegí ejercicios y construí tu primera rutina. Se sincronizará automáticamente con tu Calendar.
            </p>
          </div>
          <EliteChamferButton
            variant="cyan"
            onClick={onOpenCatalog}
            icon={<Plus size={15} />}
            className="mt-2"
          >
            CREAR RUTINA
          </EliteChamferButton>
        </div>
      ) : (
        <div className="flex-1 space-y-3.5">
          <section className="rounded-[1.75rem] bg-[#07070a] border border-white/[0.08] p-5 space-y-3">
            <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-3">
              <div className="min-w-0">
                <h3 className="truncate font-['Big_Shoulders_Display',sans-serif] text-2xl font-black italic uppercase text-white leading-none">
                  {routineName}
                </h3>
                <p className="mt-1 font-mono text-[8px] font-bold uppercase tracking-wider text-[#6E6558]">
                  {moment}
                </p>
              </div>
              <span className="font-mono text-[8px] font-bold px-2 py-0.5 rounded-full bg-[var(--builder-accent,#00d2ee)]/15 text-[var(--builder-accent,#00d2ee)] shrink-0">
                {routine.exercises.length} ejercicios
              </span>
            </div>

            <div className="space-y-1.5">
              {routine.exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between gap-3 border-b border-white/[0.04] py-2.5 last:border-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <UiIcon name="dumbbell" size={24} active />
                    <div className="min-w-0">
                      <p className="truncate font-mono text-[11px] font-bold uppercase text-white">
                        {exercise.name}
                      </p>
                      <p className="font-mono text-[8px] uppercase tracking-wider text-[#6E6558]">
                        {exercise.sets} series · {exercise.reps} reps · {exercise.weight || 0} kg
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExercise(exercise.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#6E6558] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    aria-label={`Quitar ${exercise.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Action Deck */}
          <div className="grid grid-cols-2 gap-2.5">
            <EliteChamferButton
              variant="dark"
              onClick={onOpenCatalog}
              icon={<Plus size={14} />}
            >
              AGREGAR
            </EliteChamferButton>

            <EliteChamferButton
              variant="cyan"
              onClick={onTrain}
              icon={<Rocket size={14} fill="currentColor" />}
            >
              ENTRENAR
            </EliteChamferButton>
          </div>
        </div>
      )}
    </motion.div>
  );
}
