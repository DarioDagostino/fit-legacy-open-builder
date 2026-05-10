import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Exercise } from '@fit-legacy/shared';
import { encodeWir, decodeWir, validateWir, hydrateWir, type WirDocument } from './wir';

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
              name: data?.name || "Protocolo Cargado",
              exercises: data?.exercises || [],
              foods: data?.foods || [],
              coverImageUrl: data?.coverImageUrl || null,
            }
          });
        } catch (error) {
          console.error("Error loading routine", error);
        }
      },

      getShareableLink: () => {
        const { currentRoutine } = get();
        
        // Build WIR document
        const wirDoc: WirDocument = {
          v: 1,
          n: currentRoutine.name,
          c: currentRoutine.coverImageUrl || undefined,
          e: currentRoutine.exercises.length > 0 ? currentRoutine.exercises.map(ex => ({
            i: ex.id,
            s: ex.sets,
            r: ex.reps,
            w: ex.weight
          })) : undefined,
          f: currentRoutine.foods.length > 0 ? currentRoutine.foods.map(f => ({
            i: f.id,
            q: f.quantity
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
