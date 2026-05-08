/**
 * @package @fit-legacy/gamification
 * Microservicio de gamificación — Fit Legacy
 *
 * Fuente canónica de toda la lógica de gamificación:
 *  • Tokens (re-export de @fit-legacy/shared)
 *  • REWARDS por acción
 *  • Ligas (Iniciado → Leyenda) con subdivisiones IV–I
 *  • Niveles de XP (1-100)
 *  • Streak tiers + multiplicadores
 *  • Badges canónicos
 */

// ─── Token re-exports ────────────────────────────────────────────────────────
export {
  TOKEN_IDS,
  TOKENS,
  COINCITO_PER_LGCY,
  MIN_COINCITOS_TO_TRANSMUTE,
  coincitosToLgcy,
  lgcyToCoincitos,
  canTransmute,
  getTokenById,
} from '../../shared/tokens';

export type { TokenId, TokenDefinition } from '../../shared/tokens';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. REWARDS — Coincitos + XP por acción base
// ═══════════════════════════════════════════════════════════════════════════════

export const REWARDS = {
  WORKOUT_COMPLETE:       { coincitos: 50,   xp: 100 },
  ACADEMY_LESSON:         { coincitos: 30,   xp: 75  },
  LEGACY_PATH_NODE:       { coincitos: 20,   xp: 50  },
  LEGACY_PATH_MILESTONE:  { coincitos: 200,  xp: 500 },
  DAILY_STREAK_BONUS:     { coincitos: 10,   xp: 25  },
  FIRST_WORKOUT_DAY:      { coincitos: 100,  xp: 200 },
  LEAGUE_PROMOTION:       { coincitos: 500,  xp: 1000 },
  QUIZ_PERFECT_SCORE:     { coincitos: 50,   xp: 100 },
  DAILY_CHECKIN:          { coincitos: 5,    xp: 10  },
  REFERRAL_ACTIVE:        { coincitos: 200,  xp: 300 },
} as const;

export type RewardKey = keyof typeof REWARDS;

/** Calcula recompensa aplicando multiplicador (p.e., streak 2×). */
export function calcReward(
  action: RewardKey,
  multiplier: number = 1,
): { coincitos: number; xp: number } {
  const base = REWARDS[action];
  return {
    coincitos: Math.floor(base.coincitos * multiplier),
    xp:        Math.floor(base.xp        * multiplier),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. LIGAS — Sistema jerárquico con subdivisiones IV → I
//    Alineado con landing_heroia/schema.sql + petición "Bronce 4 → Maestro"
// ═══════════════════════════════════════════════════════════════════════════════

export interface LeagueDefinition {
  id: string;            // 'bronce_iv', 'plata_i', 'maestro_ii'
  name: string;          // 'Bronce IV'
  tier: LeagueTier;      // 'bronce'
  division: number;      // 4=baja, 1=alta  (IV→I)
  minXp: number;
  icon: string;
  color: string;
}

export type LeagueTier =
  | 'iniciado'
  | 'bronce'
  | 'plata'
  | 'oro'
  | 'legionario'
  | 'centurion'
  | 'maestro'
  | 'leyenda';

const TIER_META: Record<LeagueTier, { icon: string; color: string }> = {
  iniciado:   { icon: '🌱', color: '#64748B' },
  bronce:     { icon: '🥉', color: '#CD7F32' },
  plata:      { icon: '🥈', color: '#C0C0C0' },
  oro:        { icon: '🥇', color: '#FFD700' },
  legionario: { icon: '⚔️',  color: '#DC2626' },
  centurion:  { icon: '🛡️',  color: '#7C3AED' },
  maestro:    { icon: '💎', color: '#3B82F6' },
  leyenda:    { icon: '👑', color: '#F59E0B' },
};

/**
 * Tabla canónica de ligas.
 * Cada tier (excepto Iniciado y Leyenda) tiene 4 divisiones (IV→I).
 * XP mínimo por liga — progresión exponencial suave.
 */
export const LEAGUES: LeagueDefinition[] = [
  // Iniciado (sin divisiones)
  { id: 'iniciado',       name: 'Iniciado',       tier: 'iniciado',   division: 0, minXp: 0,      ...TIER_META.iniciado },

  // Bronce IV – I
  { id: 'bronce_iv',      name: 'Bronce IV',      tier: 'bronce',     division: 4, minXp: 500,    ...TIER_META.bronce },
  { id: 'bronce_iii',     name: 'Bronce III',     tier: 'bronce',     division: 3, minXp: 800,    ...TIER_META.bronce },
  { id: 'bronce_ii',      name: 'Bronce II',      tier: 'bronce',     division: 2, minXp: 1200,   ...TIER_META.bronce },
  { id: 'bronce_i',       name: 'Bronce I',       tier: 'bronce',     division: 1, minXp: 1700,   ...TIER_META.bronce },

  // Plata IV – I
  { id: 'plata_iv',       name: 'Plata IV',       tier: 'plata',      division: 4, minXp: 2500,   ...TIER_META.plata },
  { id: 'plata_iii',      name: 'Plata III',      tier: 'plata',      division: 3, minXp: 3500,   ...TIER_META.plata },
  { id: 'plata_ii',       name: 'Plata II',       tier: 'plata',      division: 2, minXp: 4500,   ...TIER_META.plata },
  { id: 'plata_i',        name: 'Plata I',        tier: 'plata',      division: 1, minXp: 6000,   ...TIER_META.plata },

  // Oro IV – I
  { id: 'oro_iv',         name: 'Oro IV',         tier: 'oro',        division: 4, minXp: 8000,   ...TIER_META.oro },
  { id: 'oro_iii',        name: 'Oro III',        tier: 'oro',        division: 3, minXp: 10000,  ...TIER_META.oro },
  { id: 'oro_ii',         name: 'Oro II',         tier: 'oro',        division: 2, minXp: 13000,  ...TIER_META.oro },
  { id: 'oro_i',          name: 'Oro I',          tier: 'oro',        division: 1, minXp: 16000,  ...TIER_META.oro },

  // Legionario IV – I
  { id: 'legionario_iv',  name: 'Legionario IV',  tier: 'legionario', division: 4, minXp: 20000,  ...TIER_META.legionario },
  { id: 'legionario_iii', name: 'Legionario III', tier: 'legionario', division: 3, minXp: 26000,  ...TIER_META.legionario },
  { id: 'legionario_ii',  name: 'Legionario II',  tier: 'legionario', division: 2, minXp: 33000,  ...TIER_META.legionario },
  { id: 'legionario_i',   name: 'Legionario I',   tier: 'legionario', division: 1, minXp: 40000,  ...TIER_META.legionario },

  // Centurión IV – I
  { id: 'centurion_iv',   name: 'Centurión IV',   tier: 'centurion',  division: 4, minXp: 50000,  ...TIER_META.centurion },
  { id: 'centurion_iii',  name: 'Centurión III',  tier: 'centurion',  division: 3, minXp: 62000,  ...TIER_META.centurion },
  { id: 'centurion_ii',   name: 'Centurión II',   tier: 'centurion',  division: 2, minXp: 75000,  ...TIER_META.centurion },
  { id: 'centurion_i',    name: 'Centurión I',    tier: 'centurion',  division: 1, minXp: 90000,  ...TIER_META.centurion },

  // Maestro IV – I
  { id: 'maestro_iv',     name: 'Maestro IV',     tier: 'maestro',    division: 4, minXp: 110000, ...TIER_META.maestro },
  { id: 'maestro_iii',    name: 'Maestro III',    tier: 'maestro',    division: 3, minXp: 135000, ...TIER_META.maestro },
  { id: 'maestro_ii',     name: 'Maestro II',     tier: 'maestro',    division: 2, minXp: 165000, ...TIER_META.maestro },
  { id: 'maestro_i',      name: 'Maestro I',      tier: 'maestro',    division: 1, minXp: 200000, ...TIER_META.maestro },

  // Leyenda (sin divisiones — élite)
  { id: 'leyenda',        name: 'Leyenda',        tier: 'leyenda',    division: 0, minXp: 250000, ...TIER_META.leyenda },
];

/** Obtiene la liga actual dado un total de XP. */
export function getLeagueForXp(xp: number): LeagueDefinition {
  for (let i = LEAGUES.length - 1; i >= 0; i--) {
    if (xp >= LEAGUES[i].minXp) return LEAGUES[i];
  }
  return LEAGUES[0];
}

/** XP necesario para la siguiente liga (null si ya es Leyenda). */
export function getXpToNextLeague(xp: number): number | null {
  const current = getLeagueForXp(xp);
  const idx = LEAGUES.indexOf(current);
  if (idx >= LEAGUES.length - 1) return null;
  return LEAGUES[idx + 1].minXp - xp;
}

/** Compara dos ligas para detectar promoción. */
export function didPromote(prevXp: number, newXp: number): boolean {
  return getLeagueForXp(newXp).id !== getLeagueForXp(prevXp).id
    && newXp > prevXp;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. NIVELES DE XP — 1 a 100 con progresión cuadrática
//    XP requerido para nivel N: 100 * N^1.5 (redondeado)
// ═══════════════════════════════════════════════════════════════════════════════

export interface LevelDefinition {
  level: number;
  minXp: number;
}

function _buildLevelTable(max: number): LevelDefinition[] {
  const table: LevelDefinition[] = [];
  for (let n = 1; n <= max; n++) {
    table.push({ level: n, minXp: Math.round(100 * Math.pow(n, 1.5)) });
  }
  return table;
}

export const XP_LEVELS: LevelDefinition[] = _buildLevelTable(100);

/** Obtiene nivel actual dado XP total. */
export function getLevelForXp(xp: number): number {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].minXp) return XP_LEVELS[i].level;
  }
  return 1;
}

/** XP necesario para el siguiente nivel. */
export function getXpToNextLevel(xp: number): number | null {
  const lvl = getLevelForXp(xp);
  if (lvl >= 100) return null;
  return XP_LEVELS[lvl].minXp - xp; // XP_LEVELS[lvl] es level lvl+1 (0-indexed)
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. STREAK TIERS — Multiplicadores progresivos
//    Fuente canónica (antes duplicada en the_road_app/badgesService.ts)
// ═══════════════════════════════════════════════════════════════════════════════

export interface StreakTier {
  id: string;
  name: string;
  minDays: number;
  multiplier: number;
  color: string;
  icon: string;
}

export const STREAK_TIERS: StreakTier[] = [
  { id: 'principiante', name: 'Principiante', minDays: 0,   multiplier: 1.0, color: '#64748B', icon: '🌑' },
  { id: 'consistente',  name: 'Consistente',  minDays: 7,   multiplier: 1.1, color: '#D4AF37', icon: '🔥' },
  { id: 'disciplinado', name: 'Disciplinado', minDays: 14,  multiplier: 1.3, color: '#6366F1', icon: '🌿' },
  { id: 'warrior',      name: 'Warrior',      minDays: 30,  multiplier: 1.5, color: '#F59E0B', icon: '⚔️' },
  { id: 'estoico',      name: 'Estoico',      minDays: 60,  multiplier: 1.7, color: '#10B981', icon: '🏛️' },
  { id: 'maestro',      name: 'Maestro',      minDays: 90,  multiplier: 1.9, color: '#3B82F6', icon: '💎' },
  { id: 'legendario',   name: 'Legendario',   minDays: 180, multiplier: 2.0, color: '#9333EA', icon: '🌟' },
  { id: 'inmortal',     name: 'Inmortal',     minDays: 365, multiplier: 2.5, color: '#FF6B35', icon: '👑' },
];

/** Obtiene el tier de streak según días consecutivos. */
export function getStreakTier(streak: number): StreakTier {
  for (let i = STREAK_TIERS.length - 1; i >= 0; i--) {
    if (streak >= STREAK_TIERS[i].minDays) return STREAK_TIERS[i];
  }
  return STREAK_TIERS[0];
}

/** Multiplicador de streak para días consecutivos. */
export function getStreakMultiplier(streak: number): number {
  return getStreakTier(streak).multiplier;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. $LGCY MILESTONES — Puntos donde se otorgan tokens duros
// ═══════════════════════════════════════════════════════════════════════════════

export interface LgcyMilestone {
  id: string;
  description: string;
  lgcyAmount: number;
  condition: { type: 'streak' | 'level' | 'league' | 'special'; value: number | string };
}

export const LGCY_MILESTONES: LgcyMilestone[] = [
  { id: 'streak_30',   description: 'Racha de 30 días',      lgcyAmount: 10, condition: { type: 'streak', value: 30  } },
  { id: 'streak_60',   description: 'Racha de 60 días',      lgcyAmount: 10, condition: { type: 'streak', value: 60  } },
  { id: 'streak_90',   description: 'Racha de 90 días',      lgcyAmount: 10, condition: { type: 'streak', value: 90  } },
  { id: 'streak_180',  description: 'Racha de 180 días',     lgcyAmount: 20, condition: { type: 'streak', value: 180 } },
  { id: 'streak_365',  description: 'Racha de 365 días',     lgcyAmount: 50, condition: { type: 'streak', value: 365 } },
  { id: 'level_5',     description: 'Alcanzar nivel 5',      lgcyAmount: 5,  condition: { type: 'level', value: 5  } },
  { id: 'level_10',    description: 'Alcanzar nivel 10',     lgcyAmount: 5,  condition: { type: 'level', value: 10 } },
  { id: 'level_15',    description: 'Alcanzar nivel 15',     lgcyAmount: 5,  condition: { type: 'level', value: 15 } },
  { id: 'level_20',    description: 'Alcanzar nivel 20',     lgcyAmount: 5,  condition: { type: 'level', value: 20 } },
  { id: 'level_25',    description: 'Alcanzar nivel 25',     lgcyAmount: 10, condition: { type: 'level', value: 25 } },
  { id: 'level_50',    description: 'Alcanzar nivel 50',     lgcyAmount: 25, condition: { type: 'level', value: 50 } },
  { id: 'level_100',   description: 'Alcanzar nivel 100',    lgcyAmount: 50, condition: { type: 'level', value: 100 } },
  { id: 'league_oro',  description: 'Ascender a Oro',        lgcyAmount: 10, condition: { type: 'league', value: 'oro' } },
  { id: 'league_maestro', description: 'Ascender a Maestro', lgcyAmount: 25, condition: { type: 'league', value: 'maestro' } },
  { id: 'league_leyenda', description: 'Ascender a Leyenda', lgcyAmount: 50, condition: { type: 'league', value: 'leyenda' } },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 6. SURFACES — Cómo cada app surface otorga COINCITO
// ═══════════════════════════════════════════════════════════════════════════════

export type AppSurface = 'the_road_app' | 'app_fit_legacy_full' | 'mobile_flutter_lite' | 'landing_heroia';

/** Mapeo de qué acciones se pueden ejecutar desde cada app surface. */
export const SURFACE_ACTIONS: Record<AppSurface, RewardKey[]> = {
  the_road_app:         ['LEGACY_PATH_NODE', 'LEGACY_PATH_MILESTONE', 'QUIZ_PERFECT_SCORE', 'DAILY_STREAK_BONUS', 'DAILY_CHECKIN'],
  app_fit_legacy_full:  ['WORKOUT_COMPLETE', 'ACADEMY_LESSON', 'LEGACY_PATH_NODE', 'LEGACY_PATH_MILESTONE', 'FIRST_WORKOUT_DAY', 'DAILY_STREAK_BONUS', 'QUIZ_PERFECT_SCORE', 'LEAGUE_PROMOTION', 'DAILY_CHECKIN'],
  mobile_flutter_lite:  ['WORKOUT_COMPLETE', 'DAILY_STREAK_BONUS', 'DAILY_CHECKIN', 'FIRST_WORKOUT_DAY'],
  landing_heroia:       [],  // Marketing only — no COINCITO awarding
};

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED SERVICES — GameService & MissionService
// ═══════════════════════════════════════════════════════════════════════════════

export * from './gameService';
export * from './missionService';
