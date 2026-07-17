export const ROUTINE_TEMPLATES: Record<string, {
  name: string;
  exercises: Array<{ id: string; sets: number; reps: number; weight: number }>;
}> = {
  strength: {
    name: 'Plan Strength — Fuerza 8 semanas',
    exercises: [
      { id: 'press_banca', sets: 4, reps: 8, weight: 0 },
      { id: 'peso_muerto', sets: 4, reps: 6, weight: 0 },
      { id: 'sentadilla', sets: 4, reps: 8, weight: 0 },
      { id: 'press_militar', sets: 3, reps: 10, weight: 0 },
      { id: 'remo_barra', sets: 3, reps: 10, weight: 0 },
      { id: 'curl_barra', sets: 3, reps: 12, weight: 0 },
      { id: 'fondos', sets: 3, reps: 12, weight: 0 },
      { id: 'peso_muerto_rumano', sets: 3, reps: 12, weight: 0 },
      { id: 'plancha_frente', sets: 3, reps: 30, weight: 0 },
    ],
  },
  conditioning: {
    name: 'Plan Conditioning — Cardio & HIIT',
    exercises: [
      { id: 'saltar_cuerda', sets: 3, reps: 60, weight: 0 },
      { id: 'burpees', sets: 3, reps: 15, weight: 0 },
      { id: 'mountain_climbers', sets: 3, reps: 30, weight: 0 },
      { id: 'sentadilla_peso_corporal', sets: 3, reps: 20, weight: 0 },
      { id: 'flexiones', sets: 3, reps: 15, weight: 0 },
      { id: 'estocadas', sets: 3, reps: 12, weight: 0 },
      { id: 'box_jumps', sets: 3, reps: 10, weight: 0 },
      { id: 'plancha_dinamica', sets: 3, reps: 20, weight: 0 },
      { id: 'sprints', sets: 3, reps: 30, weight: 0 },
    ],
  },
};
