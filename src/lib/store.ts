import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Exercise } from '@fit-legacy/shared';
import { encodeWir, validateWir, hydrateWir, type WirDocument } from './wir';
import { createScopedStorage } from './userScope';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  portion: string;
  quantity: number;
  category?: string;
  notes?: string;
}

export interface SelectedExercise extends Omit<Exercise, 'section'> {
  sets: number;
  reps: number;
  weight: number;
  section: Exercise['section'];
  notes?: string;
}

export type PersonalGoal = 'strength' | 'muscle' | 'conditioning' | 'wellbeing';
export type PersonalExperience = 'beginner' | 'intermediate' | 'advanced';
export type PersonalEquipment = 'gym' | 'home' | 'bodyweight';
export type PersonalLimitation = 'knees' | 'lower_back' | 'shoulders' | 'wrists' | 'cardio';
export type PersonalTrainingStyle = 'classic' | 'circuit' | 'mixed';
export type PersonalCoachTone = 'direct' | 'explanatory' | 'motivational';

export interface PersonalProfile {
  goal: PersonalGoal;
  experience: PersonalExperience;
  daysPerWeek: number;
  sessionMinutes: number;
  equipment: PersonalEquipment;
  equipmentNotes: string;
  limitations: PersonalLimitation[];
  limitationNotes: string;
  trainingStyle: PersonalTrainingStyle;
  coachTone: PersonalCoachTone;
  preferenceNotes: string;
}

export interface PlanDay {
  id: string;
  label: string;
  exerciseIds: string[];
}

export interface MealComposition {
  id: string;
  slot: number;
  name: string;
  date: string;
  time: string;
  foods: FoodItem[];
  createdAt: number;
  updatedAt: number;
}

export interface CoachDay extends PlanDay {
  exercises: SelectedExercise[];
}

export type CoachChangeKind = 'sets' | 'weight' | 'swap' | 'add' | 'move' | 'rest';

export interface CoachChange {
  id: string;
  kind: CoachChangeKind;
  label: string;
  rationale: string;
  exerciseId?: string;
  from?: { sets?: number; reps?: number; weight?: number };
  to?: { sets?: number; reps?: number; weight?: number };
  exercise?: SelectedExercise;
  targetDayId?: string;
  sourceDayId?: string;
}

export interface CoachProposal {
  id: string;
  createdAt: number;
  summary: string;
  changes: CoachChange[];
  evidence: { label: string; value: string }[];
  confidence: number;
}

export interface CoachDecisionRecord {
  id: string;
  proposalId: string;
  decidedAt: number;
  status: 'applied' | 'rejected' | 'partial';
  appliedChangeIds: string[];
  rejectedChangeIds: string[];
  rationale: string;
}

const DEFAULT_PERSONAL_PROFILE: PersonalProfile = {
  goal: 'strength',
  experience: 'beginner',
  daysPerWeek: 3,
  sessionMinutes: 45,
  equipment: 'gym',
  equipmentNotes: '',
  limitations: [],
  limitationNotes: '',
  trainingStyle: 'classic',
  coachTone: 'explanatory',
  preferenceNotes: '',
};

interface WorkoutState {
  currentRoutine: {
    name: string;
    exercises: SelectedExercise[];
    foods: FoodItem[];
    coverImageUrl: string | null;
  };
  personalProfile: PersonalProfile;
  builderMode: 'workout' | 'nutrition';
  planDays: PlanDay[];
  mealCompositions: MealComposition[];
  coachProposal: CoachProposal | null;
  coachDecisions: CoachDecisionRecord[];
  updatePersonalProfile: (updates: Partial<PersonalProfile>) => void;
  setBuilderMode: (mode: 'workout' | 'nutrition') => void;
  updateRoutineName: (name: string) => void;
  addExercise: (exercise: any) => void;
  removeExercise: (id: string) => void;
  updateExercise: (id: string, updates: Partial<SelectedExercise>) => void;
  addFood: (food: FoodItem) => void;
  removeFood: (id: string) => void;
  updateFood: (id: string, updates: Partial<FoodItem>) => void;
  setCoverImage: (url: string) => void;
  clearRoutine: () => void;
  loadRoutine: (data: any) => void;
  rebuildPlanDays: (daysPerWeek?: number) => void;
  saveWorkoutDay: (dayId: string, label: string, exercises: SelectedExercise[]) => void;
  moveExerciseToDay: (exerciseId: string, targetDayId: string) => void;
  saveMealComposition: (meal: Omit<MealComposition, 'createdAt' | 'updatedAt'>) => void;
  removeMealComposition: (mealId: string) => void;
  setCoachProposal: (proposal: CoachProposal | null) => void;
  applyCoachProposal: (appliedChangeIds: string[], rejectedChangeIds: string[]) => CoachDecisionRecord;
  getShareableWir: (paletteId?: 'ember' | 'onyx' | 'midnight' | 'bloom') => WirDocument | null;
  getShareableLink: (paletteId?: 'ember' | 'onyx' | 'midnight' | 'bloom') => string;
}

function normalizeRoutine(routine: any): WorkoutState['currentRoutine'] {
  return {
    name: typeof routine?.name === 'string' && routine.name.trim()
      ? routine.name
      : 'Untitled routine',
    exercises: Array.isArray(routine?.exercises) ? routine.exercises : [],
    foods: Array.isArray(routine?.foods) ? routine.foods : [],
    coverImageUrl: typeof routine?.coverImageUrl === 'string' ? routine.coverImageUrl : null,
  };
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentRoutine: {
        name: 'Untitled routine',
        exercises: [],
        foods: [],
        coverImageUrl: null,
      },
      personalProfile: DEFAULT_PERSONAL_PROFILE,
      builderMode: 'workout',
      planDays: [],
      mealCompositions: [],
      coachProposal: null,
      coachDecisions: [],

      updatePersonalProfile: (updates) => set((state) => ({
        personalProfile: { ...state.personalProfile, ...updates },
      })),

      setBuilderMode: (mode) => set({ builderMode: mode }),

      updateRoutineName: (name) => set((state) => ({
        currentRoutine: { ...state.currentRoutine, name }
      })),

      addExercise: (exercise: any) => {
        set((state) => {
          const exists = state.currentRoutine.exercises.find((i) => i.id === exercise.id);
          if (exists) return state;

          const resolvedSets = Number.isFinite(Number(exercise.sets)) && Number(exercise.sets) > 0
            ? Number(exercise.sets)
            : 3;
          const resolvedReps = Number.isFinite(Number(exercise.reps)) && Number(exercise.reps) > 0
            ? Number(exercise.reps)
            : 10;
          const resolvedWeight = Number.isFinite(Number(exercise.weight)) && Number(exercise.weight) >= 0
            ? Number(exercise.weight)
            : 0;

          const newExercise: SelectedExercise = {
            ...exercise,
            sets: resolvedSets,
            reps: resolvedReps,
            weight: resolvedWeight,
            section: exercise.section || 'custom'
          };

          return {
            currentRoutine: {
              ...state.currentRoutine,
              exercises: [...state.currentRoutine.exercises, newExercise],
            },
          };
        });
      },

      removeExercise: (id: string) => {
        set((state) => ({
          currentRoutine: {
            ...state.currentRoutine,
            exercises: state.currentRoutine.exercises.filter((i) => i.id !== id),
          },
        }));
      },

      updateExercise: (id: string, updates: Partial<SelectedExercise>) => {
        set((state) => ({
          currentRoutine: {
            ...state.currentRoutine,
            exercises: state.currentRoutine.exercises.map((i) =>
              i.id === id ? { ...i, ...updates } : i
            ),
          },
        }));
      },

      addFood: (food: FoodItem) => set((state) => {
        if (state.currentRoutine.foods.some(f => f.id === food.id)) return state;
        return {
          currentRoutine: {
            ...state.currentRoutine,
            foods: [...state.currentRoutine.foods, { ...food, quantity: 100 }]
          }
        };
      }),

      removeFood: (id: string) => set((state) => ({
        currentRoutine: {
          ...state.currentRoutine,
          foods: state.currentRoutine.foods.filter(f => f.id !== id)
        }
      })),

      updateFood: (id: string, updates: Partial<FoodItem>) => set((state) => ({
        currentRoutine: {
          ...state.currentRoutine,
          foods: state.currentRoutine.foods.map(f => f.id === id ? { ...f, ...updates } : f)
        }
      })),

      setCoverImage: (url: string) => {
        set((state) => ({
          currentRoutine: {
            ...state.currentRoutine,
            coverImageUrl: url,
          },
        }));
      },

      clearRoutine: () => {
        set({
          currentRoutine: { name: 'Untitled routine', exercises: [], foods: [], coverImageUrl: null },
          planDays: [],
          mealCompositions: [],
          coachProposal: null,
        });
      },

      loadRoutine: (data: any) => {
        try {
          // Handle both new .wir format and legacy formats
          if (data && (data.v === 1 || data.n)) {
            // Try to treat as WIR document
            const validation = validateWir(data, { checkCatalog: true });

            if (validation.valid && validation.data) {
              try {
                const hydrated = hydrateWir(validation.data);

                // Map to store format
                const exercises = hydrated.exercises.map(ex => ({
                  ...ex,
                  difficulty: 'beginner' as const,
                })) as SelectedExercise[];

                const foods = hydrated.foods as FoodItem[];

                set({
                  currentRoutine: {
                    name: hydrated.name,
                    coverImageUrl: hydrated.coverImageUrl || null,
                    exercises,
                    foods
                  }
                });
                return;
              } catch (hydrateError) {
                console.error("Hydration failed", hydrateError);
              }
            } else {
              console.error("WIR Validation failed", validation.errors);
            }
          }

          // Fallback: Legacy format
          set({
            currentRoutine: normalizeRoutine({
              name: data?.name || 'Imported routine',
              exercises: data?.exercises,
              foods: data?.foods,
              coverImageUrl: data?.coverImageUrl,
            }),
            planDays: [],
            mealCompositions: [],
            coachProposal: null,
          });
        } catch (error) {
          console.error("Error loading routine", error);
        }
      },

      rebuildPlanDays: (daysPerWeek) => {
        const exercises = get().currentRoutine.exercises;
        const dayCount = Math.min(7, Math.max(1, Math.round(daysPerWeek ?? get().personalProfile.daysPerWeek)));
        if (exercises.length === 0) {
          set({ planDays: [] });
          return;
        }
        const days = Array.from({ length: dayCount }, (_, index) => ({
          id: `day-${index + 1}`,
          label: `Día ${index + 1}`,
          exerciseIds: [] as string[],
        }));
        exercises.forEach((exercise, index) => days[index % dayCount].exerciseIds.push(exercise.id));
        set({ planDays: days });
      },

      saveWorkoutDay: (dayId, label, draftExercises) => set((state) => {
        const existingDays = state.planDays.length > 0
          ? state.planDays
          : Array.from({ length: Math.max(1, state.personalProfile.daysPerWeek) }, (_, index) => ({
              id: `day-${index + 1}`,
              label: `Día ${index + 1}`,
              exerciseIds: [] as string[],
            }));
        const days = existingDays.some((day) => day.id === dayId)
          ? existingDays
          : [...existingDays, { id: dayId, label: label || `Día ${existingDays.length + 1}`, exerciseIds: [] }].slice(0, 7);
        const draftIds = new Set(draftExercises.map((exercise) => exercise.id));
        const targetIds = new Set(days.find((day) => day.id === dayId)?.exerciseIds || []);
        const usedElsewhere = new Set(days.filter((day) => day.id !== dayId).flatMap((day) => day.exerciseIds));
        const nextExercises = state.currentRoutine.exercises
          .filter((exercise) => !targetIds.has(exercise.id) || usedElsewhere.has(exercise.id))
          .filter((exercise) => !draftIds.has(exercise.id) || usedElsewhere.has(exercise.id));
        for (const exercise of draftExercises) {
          if (!nextExercises.some((current) => current.id === exercise.id)) nextExercises.push(exercise);
        }
        return {
          currentRoutine: { ...state.currentRoutine, exercises: nextExercises },
          planDays: days.map((day) => day.id === dayId
            ? { ...day, label: label.trim().slice(0, 60) || day.label, exerciseIds: draftExercises.map((exercise) => exercise.id) }
            : { ...day, exerciseIds: day.exerciseIds.filter((id) => !draftIds.has(id)) }),
        };
      }),

      moveExerciseToDay: (exerciseId, targetDayId) => set((state) => {
        if (!state.planDays.some((day) => day.id === targetDayId)) return state;
        const nextDays = state.planDays.map((day) => ({
          ...day,
          exerciseIds: day.exerciseIds.filter((id) => id !== exerciseId),
        }));
        return {
          planDays: nextDays.map((day) => day.id === targetDayId
            ? { ...day, exerciseIds: [...day.exerciseIds, exerciseId] }
            : day),
        };
      }),

      saveMealComposition: (meal) => set((state) => {
        const now = Date.now();
        const existing = state.mealCompositions.find((item) => item.id === meal.id);
        const slot = Math.min(6, Math.max(1, Math.round(Number(meal.slot) || 1)));
        const mealsOnDate = state.mealCompositions.filter((item) => item.date === meal.date && item.id !== meal.id);
        if (!existing && mealsOnDate.length >= 6) return state;
        if (mealsOnDate.some((item) => item.slot === slot)) return state;
        const normalized: MealComposition = {
          ...meal,
          slot,
          name: meal.name.trim().slice(0, 60) || 'Comida',
          foods: meal.foods.slice(0, 30).map((food) => ({ ...food, quantity: Math.min(2000, Math.max(1, Number(food.quantity) || 100)) })),
          createdAt: existing?.createdAt || now,
          updatedAt: now,
        };
        return { mealCompositions: existing
          ? state.mealCompositions.map((item) => item.id === normalized.id ? normalized : item)
          : [...state.mealCompositions, normalized] };
      }),

      removeMealComposition: (mealId) => set((state) => ({
        mealCompositions: state.mealCompositions.filter((meal) => meal.id !== mealId),
      })),

      setCoachProposal: (proposal) => set({ coachProposal: proposal }),

      applyCoachProposal: (appliedChangeIds, rejectedChangeIds) => {
        const proposal = get().coachProposal;
        const decision: CoachDecisionRecord = {
          id: `decision-${Date.now()}`,
          proposalId: proposal?.id || 'manual',
          decidedAt: Date.now(),
          status: appliedChangeIds.length === 0 ? 'rejected' : rejectedChangeIds.length === 0 ? 'applied' : 'partial',
          appliedChangeIds,
          rejectedChangeIds,
          rationale: appliedChangeIds.length === 0 ? 'Plan sin cambios.' : 'Ajustes confirmados por el usuario.',
        };
        if (!proposal) {
          set((state) => ({ coachDecisions: [decision, ...state.coachDecisions].slice(0, 50) }));
          return decision;
        }
        set((state) => {
          let exercises = [...state.currentRoutine.exercises];
          let planDays = state.planDays.map((day) => ({ ...day, exerciseIds: [...day.exerciseIds] }));
          for (const change of proposal.changes) {
            if (!appliedChangeIds.includes(change.id)) continue;
            if (change.kind === 'sets' || change.kind === 'weight') {
              exercises = exercises.map((exercise) => exercise.id === change.exerciseId ? { ...exercise, ...change.to } : exercise);
            }
            if (change.kind === 'add' && change.exercise && !exercises.some((exercise) => exercise.id === change.exercise?.id)) {
              exercises.push(change.exercise);
            }
            if (change.kind === 'move' && change.exerciseId && change.targetDayId) {
              planDays = planDays.map((day) => ({ ...day, exerciseIds: day.exerciseIds.filter((id) => id !== change.exerciseId) }));
              planDays = planDays.map((day) => day.id === change.targetDayId && change.exerciseId
                ? { ...day, exerciseIds: [...day.exerciseIds, change.exerciseId] }
                : day);
            }
          }
          return {
            currentRoutine: { ...state.currentRoutine, exercises },
            planDays,
            coachProposal: null,
            coachDecisions: [decision, ...state.coachDecisions].slice(0, 50),
          };
        });
        return decision;
      },

      getShareableWir: (paletteId) => {
        const { currentRoutine } = get();
        const hasExercises = currentRoutine.exercises.length > 0;
        const hasFoods = currentRoutine.foods.length > 0;

        if (!hasExercises && !hasFoods) {
          return null;
        }

        const templateType: 'routine' | 'meal' | 'mixed' = hasExercises && hasFoods
          ? 'mixed'
          : hasFoods
            ? 'meal'
            : 'routine';
        const trimmedName = currentRoutine.name.trim();
        const defaultName = templateType === 'meal'
          ? 'Plan de comidas'
          : templateType === 'mixed'
            ? 'Rutina y comidas'
            : 'Rutina';
        const shareName = !trimmedName || trimmedName === 'Untitled routine' || trimmedName === 'NUEVA RUTINA'
          ? defaultName
          : trimmedName;

        // Build the compact share payload used by the public routine link.
        const wirDoc: WirDocument = {
          v: 1,
          t: templateType,
          p: paletteId,
          n: shareName,
          c: currentRoutine.coverImageUrl || undefined,
          e: currentRoutine.exercises.length > 0 ? currentRoutine.exercises.map(ex => ({
            i: ex.id,
            ...(ex.id.startsWith('custom_') || ex.section === 'custom' ? { n: ex.name, g: ex.section } : {}),
            s: ex.sets,
            r: ex.reps,
            w: ex.weight,
            m: ex.notes
          })) : undefined,
          f: currentRoutine.foods.length > 0 ? currentRoutine.foods.map(f => ({
            i: f.id,
            q: f.quantity,
            m: f.notes
          })) : undefined
        };

        return wirDoc;
      },

      getShareableLink: (paletteId) => {
        const wirDoc = get().getShareableWir(paletteId);
        if (!wirDoc) return "";

        try {
          const encoded = encodeWir(wirDoc);
          const publicShareBaseUrl =
            import.meta.env.VITE_PUBLIC_SHARE_BASE_URL ||
            import.meta.env.VITE_LANDING_URL ||
            'https://fitlegacy.app';

          return `${publicShareBaseUrl.replace(/\/$/, '')}/api/og?data=${encoded}`;
        } catch (error) {
          console.error("Failed to encode WIR", error);
          return "";
        }
      },
    }),
    {
      name: 'fit-legacy-workout-builder',
      storage: createJSONStorage(() => createScopedStorage('fit-legacy-workout-builder')),
      merge: (persistedState, currentState) => {
        const state = persistedState as Partial<WorkoutState> | undefined;

        return {
          ...currentState,
          ...state,
          currentRoutine: normalizeRoutine(state?.currentRoutine),
          personalProfile: state?.personalProfile || currentState.personalProfile,
          planDays: Array.isArray(state?.planDays) ? state.planDays : currentState.planDays,
          mealCompositions: Array.isArray(state?.mealCompositions) ? state.mealCompositions : currentState.mealCompositions,
          coachProposal: null,
          coachDecisions: Array.isArray(state?.coachDecisions) ? state.coachDecisions : currentState.coachDecisions,
        };
      },
    }
  )
);
