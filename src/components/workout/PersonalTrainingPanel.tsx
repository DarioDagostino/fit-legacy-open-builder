import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TimerReset, Play, Plus, Minus,
  Trophy, Check, X, ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { useWorkoutStore, type SelectedExercise } from '@/lib/store';
import { useBioLedgerStore } from '@/lib/bioledger-store';
import { scopedLocalStorageGet, scopedLocalStorageSet } from '@/lib/userScope';

const ACTIVE_SESSION_KEY = 'fl-personal-active-session-v2';

type SetLog = {
  weight: number;
  reps: number;
  completed: boolean;
};

type ActiveSession = {
  routineName: string;
  startedAt: number | null;
  logs: Record<string, SetLog[]>;
};

const EMPTY_SESSION: ActiveSession = {
  routineName: '',
  startedAt: null,
  logs: {},
};

export function PersonalTrainingPanel({ onOpenPlan, onComplete }: { onOpenPlan: () => void; onComplete: () => void }) {
  const currentRoutine = useWorkoutStore((state) => state.currentRoutine);
  const addSession = useBioLedgerStore((state) => state.addSession);
  const incrementXp = useBioLedgerStore((state) => state.incrementXp);

  const [session, setSession] = useState<ActiveSession>(() => scopedLocalStorageGet(ACTIVE_SESSION_KEY, EMPTY_SESSION));
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Rest Timer State
  const [restDuration, setRestDuration] = useState<number>(90);
  const [restRemaining, setRestRemaining] = useState<number | null>(null);
  const [restActive, setRestActive] = useState<boolean>(false);

  // Celebration Modal
  const [celebrationData, setCelebrationData] = useState<{
    volume: number;
    sets: number;
    reps: number;
    duration: number;
    xp: number;
    coincitos: number;
  } | null>(null);

  const routineName = currentRoutine.name && currentRoutine.name !== 'Untitled routine'
    ? currentRoutine.name
    : 'Mi entrenamiento';

  useEffect(() => {
    if (session.routineName && session.routineName !== routineName) {
      setSession(EMPTY_SESSION);
      return;
    }
    scopedLocalStorageSet(ACTIVE_SESSION_KEY, session);
  }, [routineName, session]);

  // Elapsed Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (session.startedAt) {
      const update = () => {
        setElapsedSeconds(Math.max(0, Math.floor((Date.now() - session.startedAt!) / 1000)));
      };
      update();
      interval = setInterval(update, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session.startedAt]);

  // Rest Timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (restActive && restRemaining !== null && restRemaining > 0) {
      timer = setInterval(() => {
        setRestRemaining((prev) => {
          if (prev === null || prev <= 1) {
            setRestActive(false);
            try {
              if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
            } catch {
              // ignore
            }
            toast.success('¡Descanso listo!');
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [restActive, restRemaining]);

  const startRestTimer = useCallback((seconds: number) => {
    setRestDuration(seconds);
    setRestRemaining(seconds);
    setRestActive(true);
  }, []);

  const adjustRestTimer = useCallback((delta: number) => {
    setRestRemaining((prev) => (prev ? Math.max(5, prev + delta) : null));
  }, []);

  const cancelRestTimer = useCallback(() => {
    setRestActive(false);
    setRestRemaining(null);
  }, []);

  const formattedElapsedTime = useMemo(() => {
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [elapsedSeconds]);

  const getExerciseLogs = useCallback((exercise: SelectedExercise): SetLog[] => {
    if (session.logs[exercise.id] && session.logs[exercise.id].length === exercise.sets) {
      return session.logs[exercise.id];
    }
    return Array.from({ length: exercise.sets }, () => ({
      weight: exercise.weight || 0,
      reps: exercise.reps || 10,
      completed: false,
    }));
  }, [session.logs]);

  const { completedSetsCount, plannedSetsCount, totalVolumeLifted, totalRepsLifted } = useMemo(() => {
    let completedSets = 0;
    let plannedSets = 0;
    let volume = 0;
    let reps = 0;

    for (const ex of currentRoutine.exercises) {
      plannedSets += ex.sets;
      const logs = session.logs[ex.id] || [];
      for (const log of logs) {
        if (log.completed) {
          completedSets += 1;
          volume += (log.weight > 0 ? log.weight : 20) * log.reps;
          reps += log.reps;
        }
      }
    }
    return {
      completedSetsCount: completedSets,
      plannedSetsCount: plannedSets,
      totalVolumeLifted: volume,
      totalRepsLifted: reps,
    };
  }, [currentRoutine.exercises, session.logs]);

  const progressPct = plannedSetsCount > 0 ? Math.min(100, Math.round((completedSetsCount / plannedSetsCount) * 100)) : 0;

  const startSession = () => {
    const initialLogs: Record<string, SetLog[]> = {};
    for (const ex of currentRoutine.exercises) {
      initialLogs[ex.id] = Array.from({ length: ex.sets }, () => ({
        weight: ex.weight || 0,
        reps: ex.reps || 10,
        completed: false,
      }));
    }

    setSession({
      routineName,
      startedAt: Date.now(),
      logs: initialLogs,
    });
  };

  const toggleSetComplete = (exercise: SelectedExercise, setIndex: number) => {
    setSession((current) => {
      const exerciseLogs = current.logs[exercise.id] || Array.from({ length: exercise.sets }, () => ({
        weight: exercise.weight || 0,
        reps: exercise.reps || 10,
        completed: false,
      }));

      const isNowComplete = !exerciseLogs[setIndex]?.completed;
      const updatedLogs = exerciseLogs.map((log, idx) =>
        idx === setIndex ? { ...log, completed: isNowComplete } : log
      );

      if (isNowComplete) {
        startRestTimer(90);
      }

      return {
        ...current,
        startedAt: current.startedAt || Date.now(),
        logs: {
          ...current.logs,
          [exercise.id]: updatedLogs,
        },
      };
    });
  };

  const updateSetValues = (exerciseId: string, setIndex: number, deltaWeight: number, deltaReps: number) => {
    setSession((current) => {
      const exerciseLogs = current.logs[exerciseId] || [];
      const updated = exerciseLogs.map((log, idx) => {
        if (idx === setIndex) {
          return {
            ...log,
            weight: Math.max(0, Math.round((log.weight + deltaWeight) * 10) / 10),
            reps: Math.max(1, log.reps + deltaReps),
          };
        }
        return log;
      });
      return {
        ...current,
        logs: { ...current.logs, [exerciseId]: updated },
      };
    });
  };

  const resetSession = () => {
    setSession(EMPTY_SESSION);
    scopedLocalStorageSet(ACTIVE_SESSION_KEY, EMPTY_SESSION);
    cancelRestTimer();
  };

  const finishSession = () => {
    if (!session.startedAt || completedSetsCount === 0) return;

    const completedExercises = currentRoutine.exercises.filter((ex) =>
      (session.logs[ex.id] || []).some((l) => l.completed)
    );

    const totalCalories = currentRoutine.foods.reduce(
      (total, food) => total + Math.round((food.calories * food.quantity) / 100),
      0,
    );

    const durationMin = Math.max(1, Math.round((Date.now() - session.startedAt) / 60000));
    const earnedXp = Math.max(50, completedSetsCount * 15 + Math.round(totalVolumeLifted / 100));
    const earnedCoincitos = Math.max(10, completedSetsCount * 2);

    addSession({
      date: new Date().toISOString(),
      exerciseCount: completedExercises.length,
      totalSets: completedSetsCount,
      totalReps: totalRepsLifted,
      foodItems: currentRoutine.foods.length,
      totalCalories,
      duration: durationMin,
      notes: `Sesión · ${routineName}`,
    });

    incrementXp(earnedXp);

    setCelebrationData({
      volume: totalVolumeLifted,
      sets: completedSetsCount,
      reps: totalRepsLifted,
      duration: durationMin,
      xp: earnedXp,
      coincitos: earnedCoincitos,
    });

    resetSession();
  };

  if (currentRoutine.exercises.length === 0) {
    return (
      <div className="grid h-full place-items-center p-6 text-center">
        <div className="max-w-xs space-y-5">
          <h2 className="font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-[#F1F0F4]">
            Sin rutina
          </h2>
          <p className="text-[13px] font-medium text-[#7A756E]">
            Agregá ejercicios desde el catálogo para iniciar tu sesión.
          </p>
          <button
            type="button"
            onClick={onOpenPlan}
            className="fl-cut-cta fl-cut-cta--primary w-full py-3.5 text-[11px] font-black uppercase tracking-[0.16em]"
          >
            Preparar Rutina
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key="personal-training"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="h-full overflow-y-auto p-5 pb-36 sm:p-8 lg:pb-12 custom-scrollbar"
    >
      <div className="mx-auto max-w-2xl space-y-6">

        {/* ── Top HUD (sticky bar) ── */}
        <section className="sticky top-0 z-30 -mx-5 -mt-5 bg-[#080808]/95 px-5 pb-4 pt-5 backdrop-blur-xl sm:-mx-8 sm:px-8 border-b border-white/[0.04]">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase tracking-[0.15em] text-[#6E6558]">
                {completedSetsCount}/{plannedSetsCount} series · {progressPct}%
              </span>
              <h1 className="mt-0.5 truncate font-[var(--font-display)] text-2xl font-extrabold tracking-tight text-[#F1F0F4]">
                {routineName}
              </h1>
            </div>
            <div className="text-right pb-0.5">
              <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase text-[#6E6558]">Tiempo</span>
              <p className="font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--builder-accent-soft)]">
                {session.startedAt ? formattedElapsedTime : '00:00'}
              </p>
            </div>
          </div>

          {/* Progress line */}
          <div className="mt-3 h-[2px] overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full bg-[var(--builder-accent)] rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>

          {!session.startedAt && (
            <div className="pt-3">
              <button
                type="button"
                onClick={startSession}
                className="fl-cut-cta fl-cut-cta--primary flex min-h-12 w-full items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.16em]"
              >
                <Play size={15} fill="currentColor" /> Comenzar Sesión
              </button>
            </div>
          )}
        </section>

        {/* ── Rest Timer Pill (Cut Styling) ── */}
        <AnimatePresence>
          {restActive && restRemaining !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fl-cut-card sticky top-28 z-40 flex items-center justify-between px-4 py-3 backdrop-blur-xl border-[var(--builder-accent)]/30"
            >
              <div className="flex items-center gap-2.5">
                <TimerReset size={16} className="text-[var(--builder-accent-soft)] animate-spin-slow" />
                <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase tracking-wider text-[#9CA0A6]">
                  Descanso:
                </span>
                <span className="font-[var(--font-display)] text-2xl font-extrabold tracking-tight text-[#F1F0F4]">
                  {Math.floor(restRemaining / 60)}:{String(restRemaining % 60).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => adjustRestTimer(-15)}
                  className="fl-cut-sm px-2.5 py-1.5 text-[9px]"
                >
                  −15s
                </button>
                <button
                  type="button"
                  onClick={() => adjustRestTimer(+15)}
                  className="fl-cut-sm px-2.5 py-1.5 text-[9px]"
                >
                  +15s
                </button>
                <button
                  type="button"
                  onClick={cancelRestTimer}
                  className="fl-cut-sm h-8 w-8 text-[#7A756E] hover:text-white"
                  title="Saltar descanso"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Exercises ── */}
        <div className="space-y-6">
          {currentRoutine.exercises.map((exercise) => {
            const logs = session.logs[exercise.id] || getExerciseLogs(exercise);
            const isComplete = logs.length > 0 && logs.every((l) => l.completed);
            const completedCount = logs.filter((l) => l.completed).length;

            return (
              <article key={exercise.id} className="space-y-2.5">
                {/* Exercise header */}
                <div className="flex items-baseline justify-between">
                  <h2 className={`font-[var(--font-display)] text-lg font-extrabold tracking-tight ${isComplete ? 'text-emerald-400' : 'text-[#F1F0F4]'}`}>
                    {exercise.name}
                  </h2>
                  <span className="font-[var(--font-mono)] text-[9px] font-bold text-[#6E6558]">
                    {isComplete ? '✓ LISTO' : `${completedCount}/${exercise.sets} SERIES`} · {exercise.weight > 0 ? `${exercise.weight}kg` : 'BW'}
                  </span>
                </div>

                {/* Set rows with Cut Steppers */}
                <div className="space-y-1.5">
                  {logs.map((log, setIdx) => (
                    <div
                      key={setIdx}
                      className={`grid grid-cols-[24px_1fr_1fr_36px] items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
                        log.completed ? 'bg-emerald-500/8 border border-emerald-500/20' : 'bg-white/[0.02]'
                      }`}
                    >
                      {/* Set # */}
                      <span className={`text-center font-[var(--font-mono)] text-[11px] font-bold ${log.completed ? 'text-emerald-400' : 'text-[#4A4540]'}`}>
                        {setIdx + 1}
                      </span>

                      {/* Weight Stepper */}
                      <div className="fl-cut-sm flex w-full items-center justify-between p-1">
                        <button
                          type="button"
                          onClick={() => updateSetValues(exercise.id, setIdx, -2.5, 0)}
                          className="flex h-6 w-6 items-center justify-center text-[#7A756E] hover:text-white transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-[var(--font-display)] text-[15px] font-extrabold text-[#F1F0F4]">
                          {log.weight}<span className="text-[10px] font-semibold text-[#6E6558]">kg</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => updateSetValues(exercise.id, setIdx, +2.5, 0)}
                          className="flex h-6 w-6 items-center justify-center text-[#7A756E] hover:text-white transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Reps Stepper */}
                      <div className="fl-cut-sm flex w-full items-center justify-between p-1">
                        <button
                          type="button"
                          onClick={() => updateSetValues(exercise.id, setIdx, 0, -1)}
                          className="flex h-6 w-6 items-center justify-center text-[#7A756E] hover:text-white transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-[var(--font-display)] text-[15px] font-extrabold text-[#F1F0F4]">
                          {log.reps}<span className="text-[10px] font-semibold text-[#6E6558]">r</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => updateSetValues(exercise.id, setIdx, 0, +1)}
                          className="flex h-6 w-6 items-center justify-center text-[#7A756E] hover:text-white transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Check Button (Cut Pill) */}
                      <button
                        type="button"
                        onClick={() => toggleSetComplete(exercise, setIdx)}
                        className={`fl-cut-sm h-8 w-8 transition-all ${
                          log.completed
                            ? 'bg-emerald-500 border-emerald-400 text-black shadow-md'
                            : 'border-white/10 text-transparent hover:border-white/30'
                        }`}
                      >
                        <Check size={14} strokeWidth={3} className={log.completed ? 'text-black' : 'text-transparent'} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subtle divider between exercises */}
                <div className="h-px bg-white/[0.04] pt-1" />
              </article>
            );
          })}
        </div>

        {/* ── Action Footer (Segmented Cut Bar) ── */}
        {session.startedAt && (
          <section className="sticky bottom-20 z-30 flex w-full items-stretch pt-2 sm:bottom-6">
            <button
              type="button"
              onClick={resetSession}
              className="fl-cut-cta fl-cut-cta--secondary flex-1 min-h-12 text-[10px] font-black uppercase tracking-[0.14em]"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={finishSession}
              disabled={completedSetsCount === 0}
              className="fl-cut-cta fl-cut-cta--primary flex flex-[2] -ml-px min-h-12 items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] disabled:opacity-40"
            >
              <ShieldCheck size={16} /> Finalizar ({completedSetsCount}/{plannedSetsCount})
            </button>
          </section>
        )}

      </div>

      {/* ── Celebration Modal ── */}
      <AnimatePresence>
        {celebrationData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <div className="fl-cut-card w-full max-w-sm space-y-6 p-8 text-center border-white/15">
              <div className="mx-auto flex items-center justify-center text-[var(--builder-accent-soft)]">
                <Trophy size={28} />
              </div>

              <h2 className="font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-[#F1F0F4]">
                Sesión Completada
              </h2>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase tracking-[0.12em] text-[#6E6558]">Volumen</span>
                  <p className="font-[var(--font-display)] text-2xl font-extrabold text-[#F1F0F4]">
                    {celebrationData.volume.toLocaleString('es-AR')}<span className="text-sm text-[#6E6558]"> kg</span>
                  </p>
                </div>
                <div>
                  <span className="font-[var(--font-mono)] text-[9px] font-bold uppercase tracking-[0.12em] text-[#6E6558]">Duración</span>
                  <p className="font-[var(--font-display)] text-2xl font-extrabold text-[#F1F0F4]">
                    {celebrationData.duration}<span className="text-sm text-[#6E6558]"> min</span>
                  </p>
                </div>
              </div>

              <div className="fl-cut-card p-3 border-[var(--builder-accent)]/30 bg-[var(--builder-accent)]/10">
                <p className="font-[var(--font-display)] text-xl font-extrabold text-[var(--builder-accent-soft)]">
                  +{celebrationData.xp} XP · +{celebrationData.coincitos} $COIN
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCelebrationData(null);
                  onComplete();
                }}
                className="fl-cut-cta fl-cut-cta--primary min-h-12 w-full text-[11px] font-black uppercase tracking-[0.16em]"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
