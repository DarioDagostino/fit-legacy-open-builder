import type { ExerciseSection } from '@fit-legacy/shared/builder';

type TemplateExercise = {
  id: string;
  name: string;
  section: ExerciseSection;
  sets: number;
  reps: number;
  weight: number;
};

export const ROUTINE_TEMPLATES: Record<string, {
  name: string;
  exercises: TemplateExercise[];
}> = {
  strength: {
    name: 'Plan Strength — Fuerza 8 semanas',
    exercises: [
      { id: 'bench_press', name: 'Press de Banca', section: 'chest', sets: 4, reps: 8, weight: 0 },
      { id: 'deadlift', name: 'Peso Muerto', section: 'back', sets: 4, reps: 6, weight: 0 },
      { id: 'squat', name: 'Sentadilla con Barra', section: 'legs', sets: 4, reps: 8, weight: 0 },
      { id: 'military_press', name: 'Press Militar', section: 'shoulders', sets: 3, reps: 10, weight: 0 },
      { id: 'bk_4', name: 'Remo con Barra Prono', section: 'back', sets: 3, reps: 10, weight: 0 },
      { id: 'bicep_curl', name: 'Curl de Bíceps', section: 'arms', sets: 3, reps: 12, weight: 0 },
      { id: 'ch_20', name: 'Fondos', section: 'chest', sets: 3, reps: 12, weight: 0 },
      { id: 'leg_press', name: 'Prensa de Piernas', section: 'legs', sets: 3, reps: 12, weight: 0 },
      { id: 'fb_2', name: 'Plancha Abdominal', section: 'core', sets: 3, reps: 30, weight: 0 },
    ],
  },
  conditioning: {
    name: 'Plan Conditioning — Cardio & HIIT',
    exercises: [
      { id: 'cardio_3', name: 'Saltar la Cuerda', section: 'cardio', sets: 3, reps: 60, weight: 0 },
      { id: 'fb_1', name: 'Burpees', section: 'cardio', sets: 3, reps: 15, weight: 0 },
      { id: 'fb_3', name: 'Mountain Climbers', section: 'cardio', sets: 3, reps: 30, weight: 0 },
      { id: 'squat', name: 'Sentadilla', section: 'legs', sets: 3, reps: 20, weight: 0 },
      { id: 'ch_16', name: 'Flexiones', section: 'chest', sets: 3, reps: 15, weight: 0 },
      { id: 'lunge', name: 'Zancadas', section: 'legs', sets: 3, reps: 12, weight: 0 },
      { id: 'cf_4', name: 'Box Jumps', section: 'crossfit', sets: 3, reps: 10, weight: 0 },
      { id: 'fb_2', name: 'Plancha Abdominal', section: 'core', sets: 3, reps: 20, weight: 0 },
      { id: 'cardio_1', name: 'Cinta de Correr', section: 'cardio', sets: 3, reps: 30, weight: 0 },
    ],
  },
};
