import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Exercise } from '@fit-legacy/shared';
import { encodeWir, validateWir, hydrateWir, type WirDocument } from './wir';

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

interface WorkoutState {
  currentRoutine: {
    name: string;
    exercises: SelectedExercise[];
    foods: FoodItem[];
    coverImageUrl: string | null;
  };
  builderMode: 'workout' | 'nutrition';
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
  getShareableLink: (paletteId?: 'clean' | 'mist' | 'navy' | 'forest' | 'ember') => string;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentRoutine: {
        name: 'NUEVA RUTINA',
        exercises: [],
        foods: [],
        coverImageUrl: null,
      },
      builderMode: 'workout',

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
          currentRoutine: { name: "NUEVA RUTINA", exercises: [], foods: [], coverImageUrl: null }
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
            currentRoutine: {
              name: data?.name || "Rutina Importada",
              exercises: data?.exercises || [],
              foods: data?.foods || [],
              coverImageUrl: data?.coverImageUrl || null,
            }
          });
        } catch (error) {
          console.error("Error loading routine", error);
        }
      },

      getShareableLink: (paletteId) => {
        const { currentRoutine } = get();
        const hasExercises = currentRoutine.exercises.length > 0;
        const hasFoods = currentRoutine.foods.length > 0;

        const templateType: 'routine' | 'meal' | 'mixed' = hasExercises && hasFoods
          ? 'mixed'
          : hasFoods
            ? 'meal'
            : 'routine';
        
        // Build WIR document
        const wirDoc: WirDocument = {
          v: 1,
          t: templateType,
          p: paletteId,
          n: currentRoutine.name,
          c: currentRoutine.coverImageUrl || undefined,
          e: currentRoutine.exercises.length > 0 ? currentRoutine.exercises.map(ex => ({
            i: ex.id,
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

        try {
          const encoded = encodeWir(wirDoc);
          const baseUrl = window.location.origin;
          
          // Route can be /r/wir or /api/og - configure as needed
          return `${baseUrl}/?data=${encoded}`;
        } catch (error) {
          console.error("Failed to encode WIR", error);
          return "";
        }
      },
    }),
    {
      name: 'fit-legacy-workout-builder',
    }
  )
);
