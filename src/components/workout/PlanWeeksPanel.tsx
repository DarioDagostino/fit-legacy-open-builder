import { useEffect, useMemo, useState } from 'react';
// Canonical panel: the mirror receives this file through sync-builder.mjs.
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Minus, Moon,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';
import { useWorkoutStore, type CoachDay, type SelectedExercise } from '@/lib/store';
import { generateCoachProposal, simulateCoachContext } from '@/lib/coachMock';
import { localAssetUrl } from '@/lib/cdn';
import { UiIcon } from '../UiIcon';

const ICON_MAP: Record<string, string> = {
  chest: 'icono_pecho.svg',
  back: 'icono_espalda.svg',
  legs: 'icono_piernas.svg',
  shoulders: 'icono_hombros.svg',
  arms: 'icono_brazos.svg',
  core: 'icono_core.svg',
  cardio: 'icono_cardio.svg',
  boxing: 'icono_boxeo.svg',
  calisthenics: 'icono_calistenia.svg',
  cycling: 'icono_ciclismo.svg',
  crossfit: 'icono_crossfit.svg',
  meditation: 'icono_meditacion.svg',
  custom: 'icono_personalizado.svg',
};

function ExerciseIcon({ section, className = 'w-7 h-7' }: { section: string; className?: string }) {
  const iconFile = ICON_MAP[section?.toLowerCase()] || ICON_MAP.custom;
  return (
    <img
      src={localAssetUrl(`/assets/icons/workouts/${iconFile}`)}
      alt={`Icono de ${section}`}
      className={`${className} object-cover`}
      onError={(e) => {
        const image = e.currentTarget;
        const fallback = localAssetUrl('/assets/icons/workouts/icono_personalizado.svg');
        if (!image.src.endsWith(fallback)) image.src = fallback;
      }}
    />
  );
}

const KIND_META: Record<string, { label: string; iconName?: string; active?: boolean; icon?: React.ComponentType<{ size: number }> }> = {
  sets: { label: 'Volumen', iconName: 'graph-bar' },
  weight: { label: 'Carga', iconName: 'rocket-launch-chart', active: true },
  swap: { label: 'Cambio de ejercicio', icon: ChevronRight },
  add: { label: 'Agregar', icon: Plus },
  move: { label: 'Mover día', iconName: 'date-time-setting' },
  rest: { label: 'Descanso', icon: Moon },
};

export function PlanWeeksPanel({ onOpenCatalog, onOpenTraining, onUseSample }: { onOpenCatalog: () => void; onOpenTraining: () => void; onUseSample?: () => void }) {
  const currentRoutine = useWorkoutStore((state) => state.currentRoutine);
  const planDays = useWorkoutStore((state) => state.planDays);
  const personalProfile = useWorkoutStore((state) => state.personalProfile);
  const coachProposal = useWorkoutStore((state) => state.coachProposal);
  const coachDecisions = useWorkoutStore((state) => state.coachDecisions);
  const updateRoutineName = useWorkoutStore((state) => state.updateRoutineName);
  const updateExercise = useWorkoutStore((state) => state.updateExercise);
  const removeExercise = useWorkoutStore((state) => state.removeExercise);
  const moveExerciseToDay = useWorkoutStore((state) => state.moveExerciseToDay);
  const setBuilderMode = useWorkoutStore((state) => state.setBuilderMode);
  const rebuildPlanDays = useWorkoutStore((state) => state.rebuildPlanDays);
  const setCoachProposal = useWorkoutStore((state) => state.setCoachProposal);
  const applyCoachProposal = useWorkoutStore((state) => state.applyCoachProposal);

  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [editingProposal, setEditingProposal] = useState(false);
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set());

  const exercisesById = useMemo(() => {
    const map = new Map<string, SelectedExercise>();
    for (const ex of currentRoutine.exercises) map.set(ex.id, ex);
    return map;
  }, [currentRoutine.exercises]);

  const dayRows = useMemo(() => {
    const rows: CoachDay[] = [];
    for (const day of planDays) {
      rows.push({ ...day, exercises: day.exerciseIds.map((id) => exercisesById.get(id)).filter(Boolean) as SelectedExercise[] });
    }
    return rows;
  }, [planDays, exercisesById]);

  useEffect(() => {
    if (planDays.length > 0 && (!selectedDayId || !planDays.some((d) => d.id === selectedDayId))) {
      setSelectedDayId(planDays[0].id);
    }
  }, [planDays, selectedDayId]);

  useEffect(() => {
    if (planDays.length === 0 && currentRoutine.exercises.length > 0) {
      rebuildPlanDays();
    }
  }, [planDays, currentRoutine.exercises.length, rebuildPlanDays]);

  useEffect(() => {
    if (coachProposal && !editingProposal) {
      setAcceptedIds(new Set(coachProposal.changes.map((c) => c.id)));
    }
  }, [coachProposal, editingProposal]);

  const totalSets = currentRoutine.exercises.reduce((total, ex) => total + ex.sets, 0);
  const hasExercises = currentRoutine.exercises.length > 0;
  const selectedDay = dayRows.find((d) => d.id === selectedDayId);

  const requestCoachAdjustment = () => {
    if (!hasExercises) {
      toast.info('Agregá al menos un ejercicio para que IA Coach 1.1 pueda analizar tu plan.');
      return;
    }
    setThinking(true);
    setEditingProposal(false);
    setCoachProposal(null);
    window.setTimeout(() => {
      const ctx = simulateCoachContext(personalProfile, currentRoutine.exercises);
      const proposal = generateCoachProposal(ctx);
      setCoachProposal(proposal);
      setThinking(false);
    }, 1400);
  };

  const toggleChangeCandidate = (id: string) => {
    setAcceptedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const applyOnly = (changeIds: string[]) => {
    if (!coachProposal) return;
    const allIds = coachProposal.changes.map((c) => c.id);
    const rejected = allIds.filter((id) => !changeIds.includes(id));
    applyCoachProposal(changeIds, rejected);
    setEditingProposal(false);
    toast.success('Ajuste aplicado a tu plan');
  };

  const acceptAll = () => {
    if (!coachProposal) return;
    applyOnly(coachProposal.changes.map((c) => c.id));
  };

  const rejectAll = () => {
    if (!coachProposal) return;
    applyOnly([]);
    toast('Plan sin cambios', { description: 'Mantenés tu plan actual y la propuesta queda registrada.' });
  };

  const changePosition = (exerciseId: string, direction: -1 | 1) => {
    const currentIndex = planDays.findIndex((d) => d.id === selectedDayId);
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= planDays.length) return;
    moveExerciseToDay(exerciseId, planDays[targetIndex].id);
  };

  // Muscle Volume Distribution (Sets per Muscle Group)
  const muscleVolume = useMemo(() => {
    const counts: Record<string, number> = {
      pecho: 0,
      espalda: 0,
      piernas: 0,
      hombros: 0,
      brazos: 0,
      core: 0,
    };

    for (const ex of currentRoutine.exercises) {
      const sec = (ex.section || '').toLowerCase();
      if (sec === 'chest') counts.pecho += ex.sets;
      else if (sec === 'back') counts.espalda += ex.sets;
      else if (sec === 'legs' || sec === 'cycling') counts.piernas += ex.sets;
      else if (sec === 'shoulders') counts.hombros += ex.sets;
      else if (sec === 'arms') counts.brazos += ex.sets;
      else if (sec === 'core') counts.core += ex.sets;
    }
    return counts;
  }, [currentRoutine.exercises]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="h-full flex flex-col p-4 sm:p-6 space-y-5 overflow-y-auto custom-scrollbar"
    >
      {/* Minimal Header */}
      <div className="space-y-1">
        <input
          type="text"
          value={currentRoutine.name}
          onChange={(e) => updateRoutineName(e.target.value)}
          className="w-full bg-transparent border-none p-0 font-[var(--font-display)] text-2xl sm:text-3xl font-extrabold uppercase tracking-tight focus:ring-0 placeholder:text-[#6E6558] text-[#F1F0F4]"
          placeholder="Mi Plan Semanal"
        />
        <p className="font-[var(--font-mono)] text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6E6558]">
          Split {personalProfile.daysPerWeek}d/sem · {totalSets} series · {currentRoutine.exercises.length} ejercicios
        </p>
      </div>

      {/* ── Segmented Action Button Bar (Cut Silhouette) ── */}
      <div className="flex w-full items-stretch">
        <button
          type="button"
          onClick={onOpenCatalog}
          className="fl-cut-cta fl-cut-cta--secondary flex-1 min-h-12 text-[10px] font-black uppercase tracking-[0.14em]"
        >
          + Ejercicio
        </button>
        <button
          type="button"
          onClick={() => { setBuilderMode('nutrition'); onOpenCatalog(); }}
          className="fl-cut-cta fl-cut-cta--secondary flex-1 min-h-12 -ml-px text-[10px] font-black uppercase tracking-[0.14em]"
        >
          Comidas
        </button>
        <button
          type="button"
          onClick={onOpenTraining}
          disabled={!hasExercises}
          className="fl-cut-cta fl-cut-cta--primary flex-1 min-h-12 -ml-px text-[10px] font-black uppercase tracking-[0.14em] disabled:opacity-40"
        >
          Entrenar
        </button>
      </div>

      {/* ── Muscle Volume Summary (Cut Chips) ── */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
        <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase tracking-wider text-[#6E6558] pr-1">
          Volumen:
        </span>
        {Object.entries(muscleVolume).map(([muscle, sets]) => {
          if (sets === 0) return null;
          return (
            <span
              key={muscle}
              className="fl-cut-chip capitalize"
            >
              {muscle} <span className={sets >= 10 ? 'text-emerald-400 font-bold' : 'text-[var(--builder-accent-soft)] font-bold'}>{sets}s</span>
            </span>
          );
        })}
      </div>

      {/* ── Split Days Strip (Cut Corner Pills) ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {dayRows.map((day) => {
          const isSelected = selectedDay?.id === day.id;
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => setSelectedDayId(day.id)}
              className={`fl-cut-sm min-w-[76px] flex-col py-2 px-3 ${isSelected ? 'fl-cut-sm--active' : ''}`}
            >
              <span className="text-[8px] tracking-widest text-[#7A756E] uppercase">{day.label}</span>
              <span className="font-[var(--font-display)] text-xl font-extrabold">{day.exercises.length}</span>
            </button>
          );
        })}
      </div>

      {/* ── Exercises List ── */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar pb-28">
        <AnimatePresence mode="wait">
          {selectedDay && (
            <motion.div
              key={selectedDay.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-[var(--font-display)] text-base font-extrabold uppercase tracking-wide text-[#F1F0F4]">
                  {selectedDay.label}
                </h3>
                <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase text-[#6E6558]">
                  {selectedDay.exercises.length} ejercicio{selectedDay.exercises.length !== 1 ? 's' : ''}
                </span>
              </div>

              {selectedDay.exercises.length === 0 ? (
                <div className="fl-cut-card flex flex-col items-center gap-3 p-8 text-center">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-dashed border-[#6E6558]/50 text-[#6E6558]">
                    <Plus size={16} />
                  </div>
                  <p className="font-[var(--font-mono)] text-[11px] font-medium text-[#6E6558]">
                    Día libre: agregá ejercicios desde el catálogo.
                  </p>
                </div>
              ) : (
                selectedDay.exercises.map((ex, index) => (
                  <div key={ex.id} className="fl-cut-card p-4 space-y-3.5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <ExerciseIcon section={ex.section || 'custom'} className="w-7 h-7 shrink-0 object-contain" />
                        <div>
                          <h4 className="font-[var(--font-display)] text-sm font-extrabold uppercase tracking-tight text-[#F1F0F4]">
                            {ex.name}
                          </h4>
                          <p className="font-[var(--font-mono)] text-[8px] uppercase tracking-wider text-[#6E6558]">
                            ejercicio {index + 1} del día
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => changePosition(ex.id, -1)}
                          className="fl-cut-sm h-8 w-8 text-[#7A756E] hover:text-white"
                          title="Mover a día anterior"
                        >
                          <ChevronLeft size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => changePosition(ex.id, 1)}
                          className="fl-cut-sm h-8 w-8 text-[#7A756E] hover:text-white"
                          title="Mover a día siguiente"
                        >
                          <ChevronRight size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeExercise(ex.id)}
                          className="fl-cut-sm h-8 w-8 text-[#7A756E] hover:text-red-400"
                          title="Quitar"
                        >
                          <UiIcon name="cancel-2" size={14} variant="duo" />
                        </button>
                      </div>
                    </div>

                    {/* Steppers in Cut Styling */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="space-y-1">
                        <label className="font-[var(--font-mono)] text-[8px] font-bold text-[#6E6558] uppercase">Sets</label>
                        <div className="fl-cut-sm flex w-full items-center justify-between p-1.5">
                          <button
                            type="button"
                            onClick={() => updateExercise(ex.id, { sets: Math.max(1, ex.sets - 1) })}
                            className="flex h-7 w-7 items-center justify-center text-[#7A756E] hover:text-white"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-[var(--font-display)] text-base font-extrabold text-[#F1F0F4]">{ex.sets}</span>
                          <button
                            type="button"
                            onClick={() => updateExercise(ex.id, { sets: ex.sets + 1 })}
                            className="flex h-7 w-7 items-center justify-center text-[#7A756E] hover:text-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-[var(--font-mono)] text-[8px] font-bold text-[#6E6558] uppercase">Reps</label>
                        <div className="fl-cut-sm flex w-full items-center justify-between p-1.5">
                          <button
                            type="button"
                            onClick={() => updateExercise(ex.id, { reps: Math.max(1, ex.reps - 1) })}
                            className="flex h-7 w-7 items-center justify-center text-[#7A756E] hover:text-white"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-[var(--font-display)] text-base font-extrabold text-[#F1F0F4]">{ex.reps}</span>
                          <button
                            type="button"
                            onClick={() => updateExercise(ex.id, { reps: ex.reps + 1 })}
                            className="flex h-7 w-7 items-center justify-center text-[#7A756E] hover:text-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-[var(--font-mono)] text-[8px] font-bold text-[#6E6558] uppercase">kg</label>
                        <div className="fl-cut-sm flex w-full items-center justify-between p-1.5">
                          <button
                            type="button"
                            onClick={() => updateExercise(ex.id, { weight: Math.max(0, ex.weight - 2.5) })}
                            className="flex h-7 w-7 items-center justify-center text-[#7A756E] hover:text-white"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-[var(--font-display)] text-base font-extrabold text-[#F1F0F4]">{ex.weight}</span>
                          <button
                            type="button"
                            onClick={() => updateExercise(ex.id, { weight: ex.weight + 2.5 })}
                            className="flex h-7 w-7 items-center justify-center text-[#7A756E] hover:text-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Coach Card & Proposals ── */}
      <div className="fl-cut-card p-4 space-y-3 shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="shrink-0">
              <UiIcon name="historial" size={18} active />
            </span>
            <div>
              <p className="font-[var(--font-mono)] text-[10px] font-black uppercase tracking-[0.12em] text-[#F1F0F4]">IA Coach 1.1</p>
              <p className="text-[10px] text-[#6E6558]">{hasExercises ? 'Analiza tu plan y propone ajustes' : 'Necesita un ejercicio para analizar'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={requestCoachAdjustment}
            disabled={thinking || !hasExercises}
            className="fl-cut-cta fl-cut-cta--secondary min-h-10 px-4 text-[9px] font-black uppercase tracking-wider disabled:opacity-40"
          >
            {thinking ? 'Analizando…' : 'Pedir ajuste'}
          </button>
        </div>

        <AnimatePresence>
          {thinking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--builder-accent)]" />
                <p className="text-[10px] font-medium text-[#9CA0A6]">
                  Leyendo sueño, adherencia y rendimiento de las últimas 2 sesiones…
                </p>
              </div>
            </motion.div>
          )}

          {coachProposal && !thinking && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-lg border border-[var(--builder-accent)]/20 bg-[var(--builder-accent)]/[0.06] px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <UiIcon name="historial" size={13} active className="mt-0.5 shrink-0 text-[var(--builder-accent-soft)]" />
                  <p className="text-[11px] font-semibold leading-relaxed text-[#E8E6E1]">{coachProposal.summary}</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {coachProposal.evidence.map((item) => (
                    <span key={item.label} className="fl-cut-chip text-[8px]">
                      {item.label} · {item.value}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {coachProposal.changes.map((change) => {
                  const meta = KIND_META[change.kind] || { label: change.kind, iconName: 'rocket-launch-chart', active: true };
                  const selected = acceptedIds.has(change.id);
                  return (
                    <div
                      key={change.id}
                      className={`fl-cut-card p-3 transition-colors ${
                        selected ? 'border-[var(--builder-accent)]/40 bg-[var(--builder-accent)]/[0.05]' : 'border-white/[0.06] opacity-55'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => editingProposal && toggleChangeCandidate(change.id)}
                          className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded border transition-colors ${
                            selected ? 'border-[var(--builder-accent)] bg-[var(--builder-accent)]' : 'border-[#5E637A]'
                          } ${editingProposal ? 'cursor-pointer' : 'cursor-default'}`}
                          aria-label={selected ? 'Aplicar' : 'No aplicar'}
                        >
                          {selected && <UiIcon name="validation-1" size={11} className="text-black" />}
                        </button>
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-[var(--builder-accent-soft)]">
                            {meta.iconName ? <UiIcon name={meta.iconName} size={11} active={meta.active} /> : <meta.icon size={11} />}
                            <span>{meta.label}</span>
                          </div>
                          <p className="text-[11px] font-bold text-[#F1F0F4]">{change.label}</p>
                          <p className="text-[10px] leading-relaxed text-[#9CA0A6]">{change.rationale}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="fl-cut-cta fl-cut-cta--primary flex-1 min-h-11 text-[10px] font-black uppercase tracking-widest"
                >
                  Aplicar ajustes
                </button>
                <button
                  type="button"
                  onClick={() => { setEditingProposal((v) => !v); }}
                  className="fl-cut-cta fl-cut-cta--secondary flex-1 min-h-11 text-[10px] font-black uppercase tracking-widest"
                >
                  {editingProposal ? 'Aplicar selección' : 'Editar propuesta'}
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="fl-cut-cta fl-cut-cta--secondary flex-1 min-h-11 text-[10px] font-black uppercase tracking-widest text-[#8B8B93]"
                >
                  Mantener mi plan
                </button>
              </div>
              {editingProposal && acceptedIds.size !== coachProposal.changes.length && (
                <button
                  type="button"
                  onClick={() => applyOnly([...acceptedIds])}
                  className="w-full py-2 font-[var(--font-mono)] text-[10px] font-black uppercase tracking-widest text-[var(--builder-accent-soft)]"
                >
                  Aplicar {acceptedIds.size} de {coachProposal.changes.length} cambios
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {coachDecisions.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <p className="font-[var(--font-mono)] text-[8px] font-medium uppercase tracking-widest text-[#6E6558]">
              Últimas decisiones
            </p>
            {coachDecisions.slice(0, 3).map((decision) => (
              <div key={decision.id} className="flex items-center gap-2 font-[var(--font-mono)] text-[9px] text-[#9CA0A6]">
                <span className={`size-1.5 rounded-full ${decision.status === 'applied' ? 'bg-emerald-400' : decision.status === 'partial' ? 'bg-amber-400' : 'bg-[#5E637A]'}`} />
                <span className="flex-1 truncate">
                  {decision.status === 'applied' ? 'Ajustes aplicados' : decision.status === 'partial' ? 'Ajustes parciales' : 'Propuesta rechazada'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
