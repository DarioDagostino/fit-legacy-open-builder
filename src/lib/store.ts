import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Exercise, UNIFIED_EXERCISES, UNIFIED_FOODS } from '@fit-legacy/shared';

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
}

export interface SelectedExercise extends Exercise {
  sets: number;
  reps: number;
  weight: number;
  section: string;
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
  updateFood: (id: string, quantity: number) => void;
  setCoverImage: (url: string) => void;
  clearRoutine: () => void;
  loadRoutine: (data: any) => void;
  getShareableLink: () => string;
}

// MINIFICATION MAPPING (Senior Strategy)
// n: name, c: coverImageUrl, e: exercises, f: foods
// Exercise: i: id, s: sets, r: reps, w: weight
// Food: i: id, q: quantity

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentRoutine: {
        name: 'NUEVO_PROTOCOLO',
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

          const newExercise: SelectedExercise = {
            ...exercise,
            sets: 3,
            reps: 10,
            weight: 0,
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

      updateFood: (id: string, quantity: number) => set((state) => ({
        currentRoutine: {
          ...state.currentRoutine,
          foods: state.currentRoutine.foods.map(f => f.id === id ? { ...f, quantity } : f)
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
          currentRoutine: { name: "NUEVO_PROTOCOLO", exercises: [], foods: [], coverImageUrl: null }
        });
      },

      loadRoutine: (data: any) => {
        // HYDRATION LOGIC (Senior)
        // Check if it's minified format (has 'n' instead of 'name')
        if (data.n) {
          const exercises = (data.e || []).map((minEx: any) => {
            // Find base info in MASTER data
            const allExercises = Object.values(UNIFIED_EXERCISES).flatMap(sections => sections.flatMap(s => s.exercises));
            const base = allExercises.find(ex => ex.id === minEx.i);
            return {
              ...base,
              id: minEx.i,
              sets: minEx.s,
              reps: minEx.r,
              weight: minEx.w,
              section: base?.section || 'custom'
            };
          }).filter((ex: any) => ex.id);

          const foods = (data.f || []).map((minFood: any) => {
            const allFoods = Object.values(UNIFIED_FOODS).flat();
            const base = allFoods.find(f => f.id === minFood.i);
            return {
              ...base,
              id: minFood.i,
              quantity: minFood.q
            };
          }).filter((f: any) => f.id);

          set({
            currentRoutine: {
              name: data.n,
              coverImageUrl: data.c || null,
              exercises,
              foods
            }
          });
        } else {
          // Legacy format
          set({
            currentRoutine: {
              name: data.name || "Protocolo Cargado",
              exercises: data.exercises || [],
              foods: data.foods || [],
              coverImageUrl: data.coverImageUrl || null,
            }
          });
        }
      },

      getShareableLink: () => {
        const { currentRoutine } = get();
        
        // MINIFICATION (Senior Strategy)
        const minified = {
          n: currentRoutine.name,
          c: currentRoutine.coverImageUrl,
          e: currentRoutine.exercises.map(ex => ({
            i: ex.id,
            s: ex.sets,
            r: ex.reps,
            w: ex.weight
          })),
          f: currentRoutine.foods.map(f => ({
            i: f.id,
            q: f.quantity
          }))
        };
        
        const routineData = JSON.stringify(minified);
        const encoded = btoa(unescape(encodeURIComponent(routineData)));
        const baseUrl = window.location.origin;
        // Ruta a la Edge Function de OG — WhatsApp ve meta-tags, usuarios reales son redirigidos al SPA
        return `${baseUrl}/api/og?data=${encoded}`;
      },
    }),
    {
      name: 'fit-legacy-workout-builder',
    }
  )
);
