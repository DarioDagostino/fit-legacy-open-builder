import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Legacito, type LegacitoSkin } from '@fit-legacy/shared';
import { useWorkoutStore, type SelectedExercise } from '@/lib/store';
import { useBioLedgerStore } from '@/lib/bioledger-store';
import { UiIcon } from '../UiIcon';

interface WeeklyCoachSummaryPanelProps {
  skinId?: LegacitoSkin;
  onNavigate?: (tab: 'home' | 'build' | 'train' | 'calendar') => void;
}

const MUSCLE_LABELS: Record<string, string> = {
  chest: 'Pecho',
  back: 'Espalda',
  legs: 'Piernas',
  quads: 'Cuádriceps',
  hamstrings: 'Isquios',
  glutes: 'Glúteos',
  shoulders: 'Hombros',
  biceps: 'Bíceps',
  triceps: 'Tríceps',
  core: 'Core',
  abs: 'Abdominales',
  calves: 'Pantorrillas',
  full: 'Cuerpo Completo',
  push: 'Empuje',
  pull: 'Tirón',
  default: 'General',
};

const MUSCLE_COLORS: Record<string, string> = {
  chest: '#FB7185',
  back: '#E0793C',
  legs: '#F472B6',
  quads: '#F472B6',
  hamstrings: '#FDA4AF',
  glutes: '#FB923C',
  shoulders: '#E0793C',
  biceps: '#F472B6',
  triceps: '#FB7185',
  core: '#F59E0B',
  default: '#E0793C',
};

const WEEKDAY_NAMES = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

export function WeeklyCoachSummaryPanel({
  skinId = 'rose',
  onNavigate,
}: WeeklyCoachSummaryPanelProps) {
  const currentRoutine = useWorkoutStore((state) => state.currentRoutine);
  const planDays = useWorkoutStore((state) => state.planDays);
  const profile = useWorkoutStore((state) => state.personalProfile);
  const sessions = useBioLedgerStore((state) => state.sessions);

  const [activeFilter, setActiveFilter] = useState<'all' | 'workout' | 'nutrition'>('all');

  const exercises = currentRoutine.exercises || [];
  const foods = currentRoutine.foods || [];

  // ─── Nutrition Calculations ───
  const nutritionSummary = useMemo(() => {
    let totalKcal = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    foods.forEach((food) => {
      const factor = (Number(food.quantity) || 100) / 100;
      totalKcal += (Number(food.calories) || 0) * factor;
      totalProtein += (Number(food.protein) || 0) * factor;
      totalCarbs += (Number(food.carbs) || 0) * factor;
      totalFats += (Number(food.fats) || 0) * factor;
    });

    const roundedKcal = Math.round(totalKcal);
    const roundedProtein = Math.round(totalProtein);
    const roundedCarbs = Math.round(totalCarbs);
    const roundedFats = Math.round(totalFats);

    return {
      dailyKcal: roundedKcal,
      dailyProtein: roundedProtein,
      dailyCarbs: roundedCarbs,
      dailyFats: roundedFats,
      weeklyKcal: roundedKcal * 7,
      weeklyProtein: roundedProtein * 7,
      foodCount: foods.length,
    };
  }, [foods]);

  // ─── Workout & Volume Calculations ───
  const workoutSummary = useMemo(() => {
    let totalSets = 0;
    let totalReps = 0;
    let totalVolume = 0;
    const muscleVolume: Record<string, { sets: number; volume: number; name: string }> = {};

    exercises.forEach((ex) => {
      const sets = Number(ex.sets) || 0;
      const reps = Number(ex.reps) || 0;
      const weight = Number(ex.weight) || 0;
      const effectiveWeight = weight > 0 ? weight : 1;
      const vol = sets * reps * effectiveWeight;

      totalSets += sets;
      totalReps += sets * reps;
      totalVolume += vol;

      const group = (ex.section || 'default').toLowerCase();
      if (!muscleVolume[group]) {
        muscleVolume[group] = {
          sets: 0,
          volume: 0,
          name: MUSCLE_LABELS[group] || ex.section || 'General',
        };
      }
      muscleVolume[group].sets += sets;
      muscleVolume[group].volume += vol;
    });

    const plannedDaysCount = Math.max(1, planDays.length > 0 ? planDays.length : (profile.daysPerWeek || 3));
    const completedDaysThisWeek = Math.min(plannedDaysCount, Math.max(1, sessions.length));
    const weeklyAdherence = Math.min(100, Math.round((completedDaysThisWeek / plannedDaysCount) * 100));

    return {
      totalSets,
      totalReps,
      totalVolume,
      muscleVolume,
      plannedDaysCount,
      completedDaysThisWeek,
      weeklyAdherence,
      exerciseCount: exercises.length,
    };
  }, [exercises, planDays, profile, sessions]);

  // ─── Active Days (only active training days + compact rest strip) ───
  const { activeDays, restDayCount } = useMemo(() => {
    let restCount = 0;
    const active = WEEKDAY_NAMES.map((dayName, idx) => {
      const isRest = idx >= workoutSummary.plannedDaysCount;
      if (isRest) {
        restCount++;
        return null;
      }
      const isCompleted = idx < workoutSummary.completedDaysThisWeek;
      
      const dayPlan = planDays[idx];
      let dayExercises: SelectedExercise[] = [];
      if (dayPlan && dayPlan.exerciseIds.length > 0) {
        dayExercises = exercises.filter((ex) => dayPlan.exerciseIds.includes(ex.id));
      } else {
        const sliceSize = Math.ceil(exercises.length / workoutSummary.plannedDaysCount);
        const start = idx * sliceSize;
        dayExercises = exercises.slice(start, start + sliceSize);
        if (dayExercises.length === 0) dayExercises = exercises.slice(0, 2);
      }

      return {
        idx,
        dayName,
        isCompleted,
        exercises: dayExercises,
      };
    }).filter(Boolean) as Array<{
      idx: number;
      dayName: string;
      isCompleted: boolean;
      exercises: SelectedExercise[];
    }>;

    return { activeDays: active, restDayCount: restCount };
  }, [workoutSummary, planDays, exercises]);

  const coachScore = useMemo(() => {
    const adherencePart = workoutSummary.weeklyAdherence * 0.4;
    const nutritionPart = (nutritionSummary.dailyKcal > 0 ? 30 : 15);
    const volumePart = (workoutSummary.totalSets >= 10 ? 30 : 15);
    return Math.min(100, Math.round(adherencePart + nutritionPart + volumePart));
  }, [workoutSummary, nutritionSummary]);

  return (
    <div className="mx-auto flex min-h-full max-w-4xl flex-col gap-6 pb-20 text-[#F1F0F4]">
      {/* ─── Unified Coach Header: Free-standing Coach + Diagnosis + Quick Actions ─── */}
      <section className="relative overflow-hidden pt-1 pb-2">
        {/* Ambient Dark Matte Lighting */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[#E0793C]/[0.07] blur-[70px]" />
        <div className="pointer-events-none absolute right-0 -top-20 h-72 w-72 rounded-full bg-[#F472B6]/[0.08] blur-[80px]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Legacito + Live Coach Diagnosis (Unificado) */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0 select-none">
              <div className="pointer-events-none absolute inset-0 -m-2 rounded-full bg-gradient-to-tr from-[#E0793C]/25 to-[#F472B6]/25 blur-lg" />
              <Legacito
                mood="celebrating"
                size={68}
                skinId={skinId}
                className="relative z-10 drop-shadow-[0_0_24px_rgba(244,114,182,0.35)]"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-black uppercase tracking-[0.2em] text-[#F472B6]">
                  IA COACH 1.1
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.14em] text-[#E0793C]">
                  {workoutSummary.weeklyAdherence === 100 ? 'RITMO ÓPTIMO' : 'EN PROGRESO'}
                </span>
              </div>
              <h1 className="mt-0.5 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                Sobrecarga Progresiva Estable
              </h1>
              <p className="mt-0.5 max-w-lg font-['Outfit',sans-serif] text-xs font-medium leading-relaxed text-[#9CA0A6]">
                {workoutSummary.totalSets >= 10
                  ? `${workoutSummary.totalSets} series efectivas y ${nutritionSummary.dailyProtein}g proteína promedio. Adaptación neuromuscular activa.`
                  : `${workoutSummary.totalSets} series programadas. Suma volumen para optimizar resultados.`}
              </p>
            </div>
          </div>

          {/* Score + Action CTA */}
          <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] pt-3 sm:border-t-0 sm:pt-0 sm:flex-col sm:items-end">
            <div className="flex items-baseline gap-1.5">
              <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-black uppercase tracking-widest text-[#7E7A75]">
                SCORE
              </span>
              <span className="font-['Big_Shoulders_Display',sans-serif] text-4xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-[#E0793C] via-[#FB7185] to-[#F472B6]">
                {coachScore}
              </span>
              <span className="font-mono text-xs font-semibold text-white/30">/100</span>
            </div>

            {onNavigate && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('train')}
                  className="fl-cut-cta fl-cut-cta--primary !min-h-[36px] !px-4 !text-[9px]"
                >
                  ENTRENAR
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('build')}
                  className="fl-cut-cta fl-cut-cta--secondary !min-h-[36px] !px-3 !text-[9px]"
                >
                  MI PLAN
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ─── Athletic Minimalist KPIs Row ─── */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-y border-white/[0.06] py-4 sm:grid-cols-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[#7E7A75]">
              <UiIcon name="dumbbell" size={16} />
              <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.16em]">
                SESIONES
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black tabular-nums text-white">
              {workoutSummary.completedDaysThisWeek}
              <span className="text-xs font-medium text-white/35">/{workoutSummary.plannedDaysCount} DÍAS</span>
            </div>
            <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-wider text-[#10B981]">
              {workoutSummary.weeklyAdherence}% ADHERENCIA
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[#7E7A75]">
              <UiIcon name="graph-bar" size={16} />
              <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.16em]">
                VOLUMEN
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black tabular-nums text-white">
              {workoutSummary.totalVolume > 0 ? (workoutSummary.totalVolume).toLocaleString() : '0'}
              <span className="text-xs font-medium text-white/35">KG</span>
            </div>
            <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-wider text-[#F472B6]">
              {workoutSummary.totalSets} SERIES TOTALES
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[#7E7A75]">
              <UiIcon name="fuel_protein" size={16} />
              <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.16em]">
                ENERGÍA
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black tabular-nums text-white">
              {nutritionSummary.dailyKcal > 0 ? nutritionSummary.dailyKcal.toLocaleString() : '0'}
              <span className="text-xs font-medium text-white/35">KCAL/D</span>
            </div>
            <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-wider text-[#E0793C]">
              {nutritionSummary.weeklyKcal.toLocaleString()} KCAL SEMANA
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[#7E7A75]">
              <UiIcon name="shaker" size={16} />
              <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.16em]">
                PROTEÍNA
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black tabular-nums text-white">
              {nutritionSummary.dailyProtein > 0 ? nutritionSummary.dailyProtein : '0'}
              <span className="text-xs font-medium text-white/35">G/DÍA</span>
            </div>
            <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-wider text-[#F472B6]">
              {nutritionSummary.dailyCarbs}G C · {nutritionSummary.dailyFats}G G
            </span>
          </div>
        </div>
      </section>

      {/* ─── Compact Filter Bar ─── */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2.5">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`fl-cut-sm px-3.5 py-1.5 text-[9px] ${activeFilter === 'all' ? 'fl-cut-sm--active !border-[#F472B6]/60 !text-[#F472B6]' : ''}`}
        >
          RESUMEN GLOBAL
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('workout')}
          className={`fl-cut-sm px-3.5 py-1.5 text-[9px] ${activeFilter === 'workout' ? 'fl-cut-sm--active !border-[#E0793C]/60 !text-[#E0793C]' : ''}`}
        >
          ENTRENAMIENTOS ({workoutSummary.exerciseCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('nutrition')}
          className={`fl-cut-sm px-3.5 py-1.5 text-[9px] ${activeFilter === 'nutrition' ? 'fl-cut-sm--active !border-[#F472B6]/60 !text-[#F472B6]' : ''}`}
        >
          COMIDAS ({nutritionSummary.foodCount})
        </button>
      </div>

      {/* ─── Main 2-Column Consolidated Dashboard ─── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Workouts & Active Sessions */}
        {(activeFilter === 'all' || activeFilter === 'workout') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UiIcon name="dumbbell" size={18} />
                <h2 className="font-['Big_Shoulders_Display',sans-serif] text-xl font-black uppercase tracking-tight text-white">
                  Sesiones Semanales
                </h2>
              </div>
              <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase text-[#7E7A75]">
                {workoutSummary.totalSets} SERIES EN TOTAL
              </span>
            </div>

            {/* Active Training Days (Compact cards) */}
            <div className="space-y-2">
              {activeDays.map((day) => (
                <div
                  key={day.idx}
                  className={`rounded-xl border p-3 transition-all ${
                    day.isCompleted
                      ? 'border-[#10B981]/25 bg-[#10B981]/[0.03]'
                      : 'border-white/[0.06] bg-[#0c0c0e]/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Big_Shoulders_Display',sans-serif] text-base font-black uppercase text-white">
                      {day.dayName}
                    </span>
                    <span
                      className={`font-['IBM_Plex_Mono',monospace] text-[8px] font-black uppercase tracking-wider ${
                        day.isCompleted ? 'text-[#10B981]' : 'text-[#E0793C]'
                      }`}
                    >
                      {day.isCompleted ? '✓ COMPLETADO' : 'PLANIFICADO'}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1 border-t border-white/[0.04] pt-2">
                    {day.exercises.map((ex) => (
                      <div key={ex.id} className="flex items-center justify-between text-xs">
                        <span className="truncate pr-2 font-medium text-white/80">{ex.name}</span>
                        <span className="shrink-0 font-['IBM_Plex_Mono',monospace] text-[9px] font-bold text-white/40">
                          {ex.sets}x{ex.reps} {ex.weight > 0 ? `· ${ex.weight}kg` : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Condensed Rest Days Bar */}
              {restDayCount > 0 && (
                <div className="flex items-center justify-between rounded-lg border border-white/[0.03] px-3 py-2 text-[10px] text-[#7E7A75]">
                  <span className="font-['IBM_Plex_Mono',monospace] uppercase tracking-wider">
                    {restDayCount} Días de recuperación activa
                  </span>
                  <span className="font-mono text-[9px] text-white/30">Descanso programado</span>
                </div>
              )}
            </div>

            {/* Muscle Volume Progress */}
            <div className="space-y-2 pt-2">
              <h3 className="font-['IBM_Plex_Mono',monospace] text-[8px] font-black uppercase tracking-[0.16em] text-[#7E7A75]">
                VOLUMEN POR GRUPO MUSCULAR
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {Object.entries(workoutSummary.muscleVolume).map(([key, data]) => {
                  const barColor = MUSCLE_COLORS[key] || MUSCLE_COLORS.default;
                  const progressPct = Math.min(100, Math.round((data.sets / 18) * 100));

                  return (
                    <div
                      key={key}
                      className="rounded-lg border border-white/[0.05] bg-[#0c0c0e]/60 p-2.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: barColor }} />
                          {data.name}
                        </span>
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-sm font-black text-white">
                          {data.sets}s
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.05]">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${progressPct}%`, backgroundColor: barColor }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Nutrition & Foods */}
        {(activeFilter === 'all' || activeFilter === 'nutrition') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UiIcon name="shaker" size={18} />
                <h2 className="font-['Big_Shoulders_Display',sans-serif] text-xl font-black uppercase tracking-tight text-white">
                  Nutrición y Macros
                </h2>
              </div>
              <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase text-[#7E7A75]">
                {nutritionSummary.dailyKcal.toLocaleString()} KCAL / DÍA
              </span>
            </div>

            {/* Macro Summary Trio */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-[#F472B6]/20 bg-[#F472B6]/[0.03] p-3 text-center">
                <div className="font-['IBM_Plex_Mono',monospace] text-[8px] font-black uppercase text-[#F472B6]">
                  PROTEÍNAS
                </div>
                <div className="mt-0.5 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black text-white">
                  {nutritionSummary.dailyProtein}G
                </div>
                <div className="text-[8px] font-mono text-white/35">
                  {nutritionSummary.weeklyProtein}g / sem
                </div>
              </div>

              <div className="rounded-xl border border-[#E0793C]/20 bg-[#E0793C]/[0.03] p-3 text-center">
                <div className="font-['IBM_Plex_Mono',monospace] text-[8px] font-black uppercase text-[#E0793C]">
                  CARBOS
                </div>
                <div className="mt-0.5 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black text-white">
                  {nutritionSummary.dailyCarbs}G
                </div>
                <div className="text-[8px] font-mono text-white/35">
                  {nutritionSummary.dailyCarbs * 7}g / sem
                </div>
              </div>

              <div className="rounded-xl border border-[#FDA4AF]/20 bg-[#FDA4AF]/[0.03] p-3 text-center">
                <div className="font-['IBM_Plex_Mono',monospace] text-[8px] font-black uppercase text-[#FDA4AF]">
                  GRASAS
                </div>
                <div className="mt-0.5 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black text-white">
                  {nutritionSummary.dailyFats}G
                </div>
                <div className="text-[8px] font-mono text-white/35">
                  {nutritionSummary.dailyFats * 7}g / sem
                </div>
              </div>
            </div>

            {/* Foods list */}
            <div className="space-y-2">
              <h3 className="font-['IBM_Plex_Mono',monospace] text-[8px] font-black uppercase tracking-[0.16em] text-[#7E7A75]">
                ALIMENTOS REGISTRADOS ({foods.length})
              </h3>

              {foods.length === 0 ? (
                <p className="py-4 text-center font-mono text-xs text-[#7E7A75]">
                  Sin comidas en el plan.
                </p>
              ) : (
                <div className="space-y-1.5">
                  {foods.map((food) => {
                    const factor = (Number(food.quantity) || 100) / 100;
                    const cals = Math.round((Number(food.calories) || 0) * factor);
                    const prot = Math.round((Number(food.protein) || 0) * factor);

                    return (
                      <div
                        key={food.id}
                        className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-[#0c0c0e]/70 px-3 py-2.5"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="truncate text-xs font-bold text-white">
                            {food.name}
                          </div>
                          <div className="font-mono text-[9px] text-white/40">
                            {food.quantity || 100}g · {food.portion || 'Porción'}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-['Big_Shoulders_Display',sans-serif] text-base font-black text-[#E0793C]">
                            {cals} KCAL
                          </span>
                          <span className="ml-2 font-mono text-[9px] font-bold text-[#F472B6]">
                            {prot}g
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
