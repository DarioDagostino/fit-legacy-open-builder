import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  DotsThreeVertical, 
  CheckCircle, 
  ClockCounterClockwise, 
  Timer as TimerIcon
} from 'lucide-react';

// Types (simplified based on the Flutter model)
interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  isCompleted: boolean;
}

interface Exercise {
  id: string;
  name: string;
  section: string;
  sets: WorkoutSet[];
}

interface ActiveWorkout {
  id: string;
  title: string;
  exercises: Exercise[];
}

const ActiveWorkoutScreen: React.FC = () => {
  // State
  const [workout, setWorkout] = useState<ActiveWorkout>({
    id: '1',
    title: 'PECHO Y TRÍCEPS',
    exercises: [
      {
        id: 'ex1',
        name: 'Press de Banca Plano',
        section: 'Pecho',
        sets: [
          { id: 's1', weight: 80, reps: 10, isCompleted: false },
          { id: 's2', weight: 80, reps: 8, isCompleted: false },
        ]
      }
    ]
  });

  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [showRestTimer, setShowRestTimer] = useState(false);

  // Refs for timers
  const chronometerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const restTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 1. Chronometer Logic
  useEffect(() => {
    if (!isPaused) {
      chronometerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (chronometerRef.current) clearInterval(chronometerRef.current);
    }
    return () => {
      if (chronometerRef.current) clearInterval(chronometerRef.current);
    };
  }, [isPaused]);

  // 2. Rest Timer Logic
  useEffect(() => {
    if (showRestTimer && restTime > 0) {
      restTimerRef.current = setInterval(() => {
        setRestTime(prev => {
          if (prev <= 1) {
            setShowRestTimer(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    }
    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    };
  }, [showRestTimer, restTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 3. Immutable State Updates (Fixing the mutation bugs found in Flutter)
  const toggleSet = (exerciseIndex: number, setIndex: number) => {
    const newWorkout = { ...workout };
    const exercise = { ...newWorkout.exercises[exerciseIndex] };
    const sets = [...exercise.sets];
    const set = { ...sets[setIndex] };

    const wasCompleted = set.isCompleted;
    set.isCompleted = !wasCompleted;
    sets[setIndex] = set;
    exercise.sets = sets;
    newWorkout.exercises[exerciseIndex] = exercise;

    setWorkout(newWorkout);

    // Trigger Rest Timer on completion
    if (!wasCompleted) {
      setRestTime(60); // 60 seconds default
      setShowRestTimer(true);
    }
  };

  const updateSetData = (exerciseIndex: number, setIndex: number, weight?: number, reps?: number) => {
    setWorkout(prev => {
      const newExercises = [...prev.exercises];
      const exercise = { ...newExercises[exerciseIndex] };
      const newSets = [...exercise.sets];
      newSets[setIndex] = { 
        ...newSets[setIndex], 
        ...(weight !== undefined && { weight }),
        ...(reps !== undefined && { reps })
      };
      exercise.sets = newSets;
      newExercises[exerciseIndex] = exercise;
      return { ...prev, exercises: newExercises };
    });
  };

  const addSet = (exerciseIndex: number) => {
    setWorkout(prev => {
      const newExercises = [...prev.exercises];
      const exercise = { ...newExercises[exerciseIndex] };
      const lastSet = exercise.sets[exercise.sets.length - 1];
      exercise.sets = [
        ...exercise.sets,
        { 
          id: Math.random().toString(36).substr(2, 9), 
          weight: lastSet?.weight || 0, 
          reps: lastSet?.reps || 0, 
          isCompleted: false 
        }
      ];
      newExercises[exerciseIndex] = exercise;
      return { ...prev, exercises: newExercises };
    });
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      {/* 4. Top Navigation Bar (AppBar equivalent) */}
      <header className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800">
        <div className="flex flex-col">
          <h1 className="text-sm font-black tracking-widest text-zinc-500 uppercase">En Entrenamiento</h1>
          <span className="text-xl font-black text-amber-500 drop-shadow-sm">{workout.title}</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">
            <TimerIcon size={16} className="text-amber-500 animate-pulse" />
            <span className="text-lg font-mono font-bold tracking-tighter w-14 text-center">
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>
      </header>

      {/* 5. Rest Timer Overlay Banner */}
      {showRestTimer && (
        <div className="bg-amber-500 text-black py-2 px-6 flex items-center justify-between animate-in slide-in-from-top duration-300">
          <span className="font-black text-xs tracking-tighter uppercase">Tiempo de Descanso</span>
          <div className="flex items-center gap-3">
            <span className="text-xl font-mono font-black">{formatTime(restTime)}</span>
            <button onClick={() => setShowRestTimer(false)} className="bg-black/20 p-1 rounded hover:bg-black/30">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 6. Active Workout Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {workout.exercises.map((exercise, exerciseIndex) => (
          <div key={exercise.id} className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
            {/* Exercise Header */}
            <div className="p-5 flex items-center justify-between bg-zinc-800/50 border-b border-white/5">
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">{exercise.section}</span>
                <h2 className="text-lg font-black text-white">{exercise.name}</h2>
              </div>
              <button className="text-zinc-500 hover:text-white transition-colors">
                <DotsThreeVertical size={20} />
              </button>
            </div>

            {/* Sets Header */}
            <div className="grid grid-cols-12 gap-2 px-5 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
              <div className="col-span-2 text-center">SET</div>
              <div className="col-span-4 text-center">KG / LBS</div>
              <div className="col-span-4 text-center">REPS</div>
              <div className="col-span-2 text-center">CHECK</div>
            </div>

            {/* Sets List */}
            <div className="space-y-1 p-2">
              {exercise.sets.map((set, setIndex) => (
                <div 
                  key={set.id} 
                  className={`grid grid-cols-12 gap-2 items-center p-3 rounded-2xl transition-all ${
                    set.isCompleted ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-black/40 border border-transparent'
                  }`}
                >
                  <div className="col-span-2 flex justify-center">
                    <span className="text-sm font-black text-zinc-500">{setIndex + 1}</span>
                  </div>
                  
                  <div className="col-span-4 px-2">
                    <input 
                      type="number"
                      value={set.weight}
                      onChange={(e) => updateSetData(exerciseIndex, setIndex, parseFloat(e.target.value))}
                      className="w-full bg-zinc-800/50 rounded-xl px-3 py-2 text-center text-sm font-bold border border-transparent focus:border-amber-500/50 outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-4 px-2">
                    <input 
                      type="number"
                      value={set.reps}
                      onChange={(e) => updateSetData(exerciseIndex, setIndex, undefined, parseInt(e.target.value))}
                      className="w-full bg-zinc-800/50 rounded-xl px-3 py-2 text-center text-sm font-bold border border-transparent focus:border-amber-500/50 outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <button 
                      onClick={() => toggleSet(exerciseIndex, setIndex)}
                      className={`p-2 rounded-xl transition-all ${
                        set.isCompleted ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      <CheckCircle size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Set Button */}
            <div className="p-4 flex justify-center border-t border-white/5">
              <button 
                onClick={() => addSet(exerciseIndex)}
                className="text-[10px] font-black tracking-widest text-amber-500 hover:text-amber-400 transition-colors uppercase py-2 px-4 rounded-full bg-amber-500/5"
              >
                + AGREGAR SERIE
              </button>
            </div>
          </div>
        ))}
        
        {/* Finish Workout Button */}
        <div className="pt-6 pb-24">
          <button className="w-full bg-amber-500 py-4 rounded-2xl text-black font-black tracking-widest shadow-[0_8px_0_0_#9d7310] active:translate-y-1 active:shadow-none transition-all">
            FINALIZAR ENTRENAMIENTO
          </button>
        </div>
      </main>

      {/* 7. Bottom Action Bar (Floating Logic) */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
        <div className="max-w-md mx-auto flex items-center justify-center gap-4 pointer-events-auto">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="bg-zinc-800 p-4 rounded-2xl border border-white/10 text-white shadow-xl hover:bg-zinc-700 transition-all"
          >
            {isPaused ? <Play size={24} weight="fill" /> : <Pause size={24} weight="fill" />}
          </button>
          
          <button className="flex-1 bg-white p-4 rounded-2xl flex items-center justify-center gap-2 text-black font-black tracking-widest shadow-xl hover:bg-zinc-200 transition-all">
            <ClockCounterClockwise size={20} />
            HISTORIAL
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ActiveWorkoutScreen;

