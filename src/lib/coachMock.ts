import type {
  CoachChange,
  CoachProposal,
  PersonalProfile,
  SelectedExercise,
} from './store';

/** Contexto local y determinista para validar el flujo de propuesta/decisión.
 * La integración real con Legacito queda fuera de esta fase y no muta el plan
 * hasta que el usuario confirma los cambios.
 */
export interface CoachContext {
  profile: PersonalProfile;
  exercises: SelectedExercise[];
  planDayLabels: string[];
  sleepHours: number;
  adherence: number;
  sessionRendimientoDelta: number;
  lastSessionDaysAgo: number;
  missedDays: number;
}

export function simulateCoachContext(profile: PersonalProfile, exercises: SelectedExercise[]): CoachContext {
  return {
    profile,
    exercises,
    planDayLabels: Array.from({ length: Math.max(1, profile.daysPerWeek) }, (_, index) => `Día ${index + 1}`),
    sleepHours: 7,
    adherence: exercises.length > 0 ? 80 : 0,
    sessionRendimientoDelta: 0,
    lastSessionDaysAgo: exercises.length > 0 ? 1 : 0,
    missedDays: 0,
  };
}

export function generateCoachProposal(context: CoachContext): CoachProposal {
  const target = context.exercises.find((exercise) => exercise.sets > 3);
  const changes: CoachChange[] = target
    ? [{
        id: 'change-volume-1',
        kind: 'sets',
        label: `${target.name}: ${target.sets} series → ${target.sets - 1}`,
        rationale: 'Reducir una serie mantiene el estímulo y deja margen para recuperar.',
        exerciseId: target.id,
        from: { sets: target.sets },
        to: { sets: target.sets - 1 },
      }]
    : [{
        id: 'change-rest-1',
        kind: 'rest',
        label: 'Mantener el plan y registrar la próxima sesión',
        rationale: 'No hay una señal suficiente para cambiar tu rutina todavía.',
      }];

  return {
    id: `proposal-${Date.now()}`,
    createdAt: Date.now(),
    summary: target ? 'Propongo un ajuste pequeño de volumen.' : 'Propongo mantener el plan actual.',
    changes,
    evidence: [
      { label: 'Sueño', value: `${context.sleepHours.toFixed(1)}h` },
      { label: 'Adherencia', value: `${context.adherence}%` },
      { label: 'Última sesión', value: context.lastSessionDaysAgo ? `hace ${context.lastSessionDaysAgo} día(s)` : 'sin sesiones' },
    ],
    confidence: target ? 0.82 : 0.9,
  };
}
