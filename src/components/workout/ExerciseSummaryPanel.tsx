import { motion } from 'framer-motion';
import { Plus, Rocket, Trash2 } from 'lucide-react';
import { useWorkoutStore } from '../../lib/store';
import type { CalendarAction, CalendarEntry } from './CalendarPanel';
import { UiIcon } from '../UiIcon';

interface ExerciseSummaryPanelProps {
  calendarEntry?: CalendarEntry;
  calendarAction?: CalendarAction;
  onOpenCatalog: () => void;
  onTrain: () => void;
}

function entryMoment(entry?: CalendarEntry, action?: CalendarAction) {
  const now = new Date();
  const date = entry?.date ? new Date(`${entry.date}T12:00:00`) : now;
  const day = date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
  const time = action?.time || now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
  return `${day} · ${time}`;
}

export function ExerciseSummaryPanel({ calendarEntry, calendarAction, onOpenCatalog, onTrain }: ExerciseSummaryPanelProps) {
  const routine = useWorkoutStore((state) => state.currentRoutine);
  const removeExercise = useWorkoutStore((state) => state.removeExercise);
  const totalSets = routine.exercises.reduce((total, exercise) => total + (Number(exercise.sets) || 0), 0);
  const totalReps = routine.exercises.reduce((total, exercise) => total + (Number(exercise.sets) || 0) * (Number(exercise.reps) || 0), 0);
  const totalVolume = routine.exercises.reduce((total, exercise) => total + (Number(exercise.sets) || 0) * (Number(exercise.reps) || 0) * (Number(exercise.weight) || 0), 0);
  const hasExercises = routine.exercises.length > 0;
  const routineName = !routine.name.trim() || routine.name === 'Untitled routine' ? 'Mi rutina' : routine.name;
  const moment = entryMoment(calendarEntry, calendarAction);
  const metrics = [
    { label: 'Ejercicios', value: routine.exercises.length, icon: 'dumbbell' as const, tone: 'text-[var(--builder-accent-soft)]' },
    { label: 'Series', value: totalSets, icon: 'graph-bar' as const, tone: 'text-[var(--builder-accent)]' },
    { label: 'Reps', value: totalReps, icon: 'graph-pie' as const, tone: 'text-[#9CA0A6]' },
    { label: 'Volumen', value: `${Math.round(totalVolume)}kg`, icon: 'rocket-launch-chart' as const, tone: 'text-[var(--builder-accent-deep)]' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex h-full flex-col gap-5 overflow-y-auto px-4 pt-3 pb-28 sm:px-6">
      <div className="grid grid-cols-4 gap-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="builder-apple-tile p-3 text-center">
            <div className="mb-1 flex justify-center"><UiIcon name={metric.icon} size={16} active={metric.label === 'Ejercicios'} /></div>
            <p className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium uppercase text-[#6E6558]">{metric.label}</p>
            <p className={`font-['Big_Shoulders_Display',sans-serif] text-2xl font-black leading-none ${metric.tone}`}>{metric.value}</p>
          </div>
        ))}
      </div>

      {!hasExercises ? (
        <div className="flex flex-1 flex-col items-center justify-center space-y-6 p-8 text-center">
          <UiIcon name="dumbbell" size={64} className="opacity-40" />
          <div className="space-y-2">
            <p className="font-['Big_Shoulders_Display',sans-serif] text-sm font-bold uppercase tracking-widest text-[#9CA0A6]">Sin rutina todavía</p>
            <p className="max-w-xs text-xs font-medium leading-relaxed text-[#6E6558]">Elegí ejercicios y construí tu primera rutina. Se guardará automáticamente en Calendar.</p>
            <button type="button" onClick={onOpenCatalog} className="builder-cta-primary mt-2 inline-flex items-center gap-2 px-4 py-3 text-[10px] font-black uppercase tracking-widest"><Plus size={14} /> Crear rutina</button>
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-3">
          <section className="builder-apple-card p-4">
            <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/[0.06] pb-3">
              <div className="min-w-0"><h3 className="truncate text-lg font-black uppercase text-[#F1F0F4]">{routineName}</h3><p className="mt-1 font-['IBM_Plex_Mono',monospace] text-[8px] font-semibold uppercase tracking-[0.12em] text-[#6E6558]">{moment}</p></div>
              <span className="builder-status-chip shrink-0">{routine.exercises.length} ejercicios</span>
            </div>
            <div className="space-y-2">
              {routine.exercises.map((exercise) => (
                <div key={exercise.id} className="flex items-center justify-between gap-3 border-b border-white/[0.05] py-2 last:border-0">
                  <div className="flex min-w-0 items-center gap-3"><UiIcon name="dumbbell" size={26} active /><div className="min-w-0"><p className="truncate text-xs font-bold uppercase text-[#F1F0F4]">{exercise.name}</p><p className="font-['IBM_Plex_Mono',monospace] text-[8px] uppercase tracking-wider text-[#6E6558]">{exercise.sets} series · {exercise.reps} reps · {exercise.weight || 0} kg</p></div></div>
                  <button type="button" onClick={() => removeExercise(exercise.id)} className="builder-icon-button flex h-8 w-8 shrink-0 items-center justify-center text-[#6E6558] hover:text-red-400" aria-label={`Quitar ${exercise.name}`}><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          </section>
          <div className="grid grid-cols-2 gap-2"><button type="button" onClick={onOpenCatalog} className="builder-cta-ghost px-3 py-3 text-[10px] font-black uppercase tracking-widest">Agregar ejercicio</button><button type="button" onClick={onTrain} className="builder-cta-primary inline-flex items-center justify-center gap-2 px-3 py-3 text-[10px] font-black uppercase tracking-widest"><Rocket size={14} /> Entrenar</button></div>
        </div>
      )}
    </motion.div>
  );
}

