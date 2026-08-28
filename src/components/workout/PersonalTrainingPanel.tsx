import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TimerReset, Play, Plus, Minus,
  Trophy, Check, X, ShieldCheck, Dumbbell, Activity, RotateCcw
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

export function PersonalTrainingPanel({
  onOpenPlan,
  onComplete,
}: {
  onOpenPlan: () => void;
  onComplete: () => void;
}) {
  const currentRoutine = useWorkoutStore((state) => state.currentRoutine);
  const addSession = useBioLedgerStore((state) => state.addSession);
  const incrementXp = useBioLedgerStore((state) => state.incrementXp);

  const [session, setSession] = useState<ActiveSession>(() =>
    scopedLocalStorageGet(ACTIVE_SESSION_KEY, EMPTY_SESSION)
  );
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

  const routineName =
    currentRoutine.name && currentRoutine.name !== 'Untitled routine'
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

  const getExerciseLogs = useCallback(
    (exercise: SelectedExercise): SetLog[] => {
      if (session.logs[exercise.id] && session.logs[exercise.id].length === exercise.sets) {
        return session.logs[exercise.id];
      }
      return Array.from({ length: exercise.sets }, () => ({
        weight: exercise.weight || 0,
        reps: exercise.reps || 10,
        completed: false,
      }));
    },
    [session.logs],
  );

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

  const progressPct =
    plannedSetsCount > 0 ? Math.min(100, Math.round((completedSetsCount / plannedSetsCount) * 100)) : 0;

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
      const exerciseLogs =
        current.logs[exercise.id] ||
        Array.from({ length: exercise.sets }, () => ({
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

  const updateSetValues = (
    exerciseId: string,
    setIndex: number,
    deltaWeight: number,
    deltaReps: number
  ) => {
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
      <div className="grid h-full place-items-center p-6 text-center !bg-[#000000]">
        <div className="max-w-xs space-y-4">
          <Dumbbell size={48} className="mx-auto text-white/30" />
          <h2 className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-black italic uppercase text-white">
            Sin rutina
          </h2>
          <p className="text-xs text-[#6E6558] leading-relaxed">
            Agregá ejercicios desde el catálogo para iniciar tu sesión de entrenamiento.
          </p>
          <EliteChamferButton
            variant="cyan"
            onClick={onOpenPlan}
            className="w-full mt-2"
          >
            PREPARAR RUTINA
          </EliteChamferButton>
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
      className="h-full overflow-y-auto p-4 pb-36 sm:p-6 lg:pb-12 !bg-[#000000]"
    >
      <div className="mx-auto max-w-xl space-y-4">
        
        {/* ── Top HUD Sticky Header ── */}
        <section className="sticky top-0 z-30 -mx-4 -mt-4 bg-[#000000]/95 px-4 pb-3 pt-4 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1 pr-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--builder-accent-soft,#5ce1e6)] flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--builder-accent,#00d2ee)] animate-pulse" />
                {completedSetsCount}/{plannedSetsCount} SERIES · {progressPct}%
              </span>
              <h1 className="mt-1 truncate font-['Big_Shoulders_Display',sans-serif] text-2xl font-black italic tracking-tight text-white leading-none">
                {routineName}
              </h1>
            </div>

            <div className="text-right shrink-0">
              <span className="font-mono text-[8px] font-bold uppercase text-[#6E6558]">TIEMPO</span>
              <p className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-black italic tracking-tight text-[var(--builder-accent,#00d2ee)] leading-none mt-0.5">
                {session.startedAt ? formattedElapsedTime : '00:00'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--builder-accent,#00d2ee)] to-sky-300 rounded-full shadow-[0_0_8px_rgba(0,210,238,0.5)]"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>

          {!session.startedAt && (
            <div className="pt-3">
              <EliteChamferButton
                variant="cyan"
                onClick={startSession}
                icon={<Play size={15} fill="currentColor" />}
                className="w-full !min-h-[48px]"
              >
                COMENZAR SESIÓN
              </EliteChamferButton>
            </div>
          )}
        </section>

        {/* ── Rest Timer Active Banner ── */}
        <AnimatePresence>
          {restActive && restRemaining !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl bg-[#07070a] border border-[var(--builder-accent,#00d2ee)]/40 p-3 flex items-center justify-between shadow-[0_8px_24px_rgba(0,210,238,0.2)] sticky top-24 z-40 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2.5">
                <TimerReset size={16} className="text-[var(--builder-accent,#00d2ee)] animate-spin-slow" />
                <div>
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#9CA0A6] block">
                    Descanso
                  </span>
                  <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black italic text-white leading-none">
                    {Math.floor(restRemaining / 60)}:{String(restRemaining % 60).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => adjustRestTimer(-15)}
                  className="px-2 py-1 rounded-lg bg-white/[0.04] hover:bg-white/10 font-mono text-[9px] font-bold text-white border border-white/[0.08]"
                >
                  −15s
                </button>
                <button
                  type="button"
                  onClick={() => adjustRestTimer(+15)}
                  className="px-2 py-1 rounded-lg bg-white/[0.04] hover:bg-white/10 font-mono text-[9px] font-bold text-white border border-white/[0.08]"
                >
                  +15s
                </button>
                <button
                  type="button"
                  onClick={cancelRestTimer}
                  className="h-7 w-7 flex items-center justify-center rounded-lg bg-white/[0.04] text-[#6E6558] hover:text-white"
                  title="Saltar descanso"
                >
                  <X size={13} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Exercise List (Clean, uncrowded cards) ── */}
        <div className="space-y-3 pt-1">
          {currentRoutine.exercises.map((exercise) => {
            const logs = session.logs[exercise.id] || getExerciseLogs(exercise);
            const isComplete = logs.length > 0 && logs.every((l) => l.completed);
            const completedCount = logs.filter((l) => l.completed).length;

            return (
              <article
                key={exercise.id}
                className={`rounded-[1.5rem] bg-[#07070a] border p-4 space-y-3 transition-colors ${
                  isComplete ? 'border-emerald-500/30' : 'border-white/[0.08]'
                }`}
              >
                {/* Header: Title + clean set counter */}
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.05] pb-2.5">
                  <h2 className="font-mono text-[12px] font-bold uppercase tracking-wide text-white truncate">
                    {exercise.name}
                  </h2>
                  <span className={`font-mono text-[9px] font-black px-2 py-0.5 rounded-md shrink-0 ${
                    isComplete
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/[0.04] text-[#9CA0A6]'
                  }`}>
                    {isComplete ? '✓ COMPLETADO' : `${completedCount}/${exercise.sets} SERIES`}
                  </span>
                </div>

                {/* Set Rows with Tactile Capsule Steppers */}
                <div className="space-y-2">
                  {logs.map((log, setIdx) => (
                    <div
                      key={setIdx}
                      className={`grid grid-cols-[20px_1fr_1fr_36px] items-center gap-2 rounded-xl p-1.5 transition-colors ${
                        log.completed
                          ? 'bg-emerald-500/[0.06] border border-emerald-500/20'
                          : 'bg-white/[0.02] border border-white/[0.04]'
                      }`}
                    >
                      {/* Set Index */}
                      <span className={`font-mono text-[11px] font-black text-center ${
                        log.completed ? 'text-emerald-400' : 'text-[#6E6558]'
                      }`}>
                        {setIdx + 1}
                      </span>

                      {/* Weight Stepper Capsule */}
                      <div className="flex items-center justify-between rounded-lg bg-[#000000] border border-white/[0.08] p-1 h-8">
                        <button
                          type="button"
                          onClick={() => updateSetValues(exercise.id, setIdx, -2.5, 0)}
                          className="h-6 w-6 flex items-center justify-center text-[#6E6558] hover:text-white transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-base font-black text-white italic">
                          {log.weight} <small className="text-[8px] font-mono text-[#6E6558]">kg</small>
                        </span>
                        <button
                          type="button"
                          onClick={() => updateSetValues(exercise.id, setIdx, +2.5, 0)}
                          className="h-6 w-6 flex items-center justify-center text-[#6E6558] hover:text-white transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Reps Stepper Capsule */}
                      <div className="flex items-center justify-between rounded-lg bg-[#000000] border border-white/[0.08] p-1 h-8">
                        <button
                          type="button"
                          onClick={() => updateSetValues(exercise.id, setIdx, 0, -1)}
                          className="h-6 w-6 flex items-center justify-center text-[#6E6558] hover:text-white transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-base font-black text-white italic">
                          {log.reps} <small className="text-[8px] font-mono text-[#6E6558]">r</small>
                        </span>
                        <button
                          type="button"
                          onClick={() => updateSetValues(exercise.id, setIdx, 0, +1)}
                          className="h-6 w-6 flex items-center justify-center text-[#6E6558] hover:text-white transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Check Complete Button */}
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        type="button"
                        onClick={() => toggleSetComplete(exercise, setIdx)}
                        className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                          log.completed
                            ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                            : 'bg-white/[0.04] text-[#6E6558] hover:border-white/30 border border-white/[0.08]'
                        }`}
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Action Footer Bar ── */}
        {session.startedAt && (
          <section className="sticky bottom-20 z-30 grid grid-cols-[1fr_2fr] gap-2 pt-2 sm:bottom-6">
            <EliteChamferButton
              variant="dark"
              onClick={resetSession}
              icon={<RotateCcw size={13} />}
              className="!min-h-[48px] !text-[10px]"
            >
              CANCELAR
            </EliteChamferButton>

            <EliteChamferButton
              variant="cyan"
              onClick={finishSession}
              disabled={completedSetsCount === 0}
              icon={<ShieldCheck size={15} />}
              className="!min-h-[48px] !text-[11px]"
            >
              FINALIZAR ({completedSetsCount}/{plannedSetsCount})
            </EliteChamferButton>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <div className="w-full max-w-sm rounded-[2rem] bg-[#07070a] border border-white/15 p-6 text-center space-y-5 shadow-2xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--builder-accent,#00d2ee)]/15 text-[var(--builder-accent,#00d2ee)]">
                <Trophy size={28} />
              </div>

              <div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--builder-accent-soft,#5ce1e6)]">
                  ¡SESIÓN COMPLETADA!
                </span>
                <h2 className="font-['Big_Shoulders_Display',sans-serif] text-4xl font-black italic text-white mt-1">
                  Misión Cumplida
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div>
                  <span className="font-mono text-[8px] font-bold uppercase text-[#6E6558] block">Volumen</span>
                  <p className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black italic text-white">
                    {celebrationData.volume.toLocaleString('es-AR')} <small className="text-xs font-mono text-[#6E6558]">kg</small>
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[8px] font-bold uppercase text-[#6E6558] block">Duración</span>
                  <p className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black italic text-white">
                    {celebrationData.duration} <small className="text-xs font-mono text-[#6E6558]">min</small>
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--builder-accent,#00d2ee)]/10 border border-[var(--builder-accent,#00d2ee)]/30">
                <p className="font-mono text-[11px] font-black text-[var(--builder-accent-soft,#5ce1e6)] uppercase tracking-wider">
                  +{celebrationData.xp} XP · +{celebrationData.coincitos} $COIN
                </p>
              </div>

              <EliteChamferButton
                variant="cyan"
                onClick={() => {
                  setCelebrationData(null);
                  onComplete();
                }}
                className="w-full !min-h-[48px]"
              >
                CONTINUAR
              </EliteChamferButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
