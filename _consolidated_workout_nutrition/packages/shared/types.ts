// 🏛️ SHARED TYPES — FitLegacy Ecosystem
// Single source of truth for Road and Academy data structures.

export type NodeCategory = 'mente' | 'cuerpo' | 'legado' | 'alma' | 'especial';
export type NodeType = 'lesson' | 'challenge' | 'reflection' | 'bossBattle' | 'milestone';

export type LegacyCategory = 'filosofiaEstoica' | 'fuerza' | 'cardio' | 'flexibilidad' | 'nutricion' | 'habitos' | 'mentalidad' | 'cuerpo' | 'mente' | 'alma' | 'legado';

export type QuestionType = 'text' | 'boolean' | 'image' | 'build-phrase';

export interface RoadQuestion {
  type?: QuestionType; // Defaults to 'text' if undefined
  question: string;
  options: string[];
  correctAnswer: number; // index into options
  explanation: string;
}

export interface RoadNode {
  id: number;
  level: number;
  fase: number;
  title: string;
  concept: string;
  type: NodeType;
  category: NodeCategory;
  emoji: string;
  color: string;
  bgColor: string;
  bcReward: number;
  xpReward: number;
  isMilestone: boolean;
  isMystery: boolean;
  isCheckpoint: boolean;
  isPremium?: boolean;
  questions: RoadQuestion[];
}

// ─── ACADEMY TYPES ────────────────────────────────────────────────────────────

export type LessonPillar = 'cuerpo' | 'mente' | 'alma' | 'legado';
export type LessonDifficulty = 'principiante' | 'intermedio' | 'avanzado' | 'experto' | 'aprendiz' | 'adepto' | 'maestro' | 'leyenda';

export interface AcademyExercise {
  statement: string;
  isCorrect: boolean;
}

export interface AcademyLesson {
  id: string;
  numero: number;
  title: string;
  subtitle?: string;
  content?: string;           // markdown content (may be stripped in JSON)
  pillar: LessonPillar;
  difficulty: LessonDifficulty;
  modulo?: number;
  durationMinutes?: number;
  isPremium?: boolean;
  coinReward?: number;
  xpReward?: number;
  keyTakeaways?: string[];
  quiz?: RoadQuestion[];
  ejercicios?: AcademyExercise[];
  author?: string;
  quote?: string;
  tips?: string;
  requiredLeaguePoints?: number;
  legacyCategory?: LegacyCategory;
}

export interface AcademyModule {
  id: string;
  numero: number;
  titulo: string;
  descripcion: string;
  icon: string;
  color: string;
  requiredLeaguePoints: number;
  lessons: string[]; // IDs de lecciones
}

// ─── SHARED PLAN TYPES ──────────────────────────────────────────────────────

export type SharedPlanBlockType = 'routine' | 'nutrition';
export type SharedPlanDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface SharedPlanExercise {
  id: string;
  name: string;
  sets?: number;
  reps?: string;
  restSeconds?: number;
  rpe?: number;
  notes?: string;
}

export interface SharedPlanRoutineBlock {
  title: string;
  focus?: string;
  exercises: SharedPlanExercise[];
}

export interface SharedPlanMeal {
  id: string;
  name: string;
  time?: string;
  calories?: number;
  notes?: string;
}

export interface SharedPlanNutritionBlock {
  dailyCalories?: number;
  meals: SharedPlanMeal[];
}

export interface SharedPlanDay {
  id: string;
  label: string;
  routine?: SharedPlanRoutineBlock;
  nutrition?: SharedPlanNutritionBlock;
  legacitoMessage?: string;
}

export interface SharedPlanMeta {
  planName: string;
  coachName?: string;
  clientName?: string;
  weekLabel?: string;
  objective?: string;
  difficulty?: SharedPlanDifficulty;
  generatedByAi?: boolean;
}

export interface SharedPlanPayload {
  version: '1.0';
  meta: SharedPlanMeta;
  days: SharedPlanDay[];
}
