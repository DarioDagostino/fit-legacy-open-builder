import { describe, it, expect } from 'vitest';
import {
  REWARDS,
  calcReward,
  LEAGUES,
  getLeagueForXp,
  getXpToNextLeague,
  didPromote,
  XP_LEVELS,
  getLevelForXp,
  getXpToNextLevel,
  STREAK_TIERS,
  getStreakTier,
  getStreakMultiplier,
  LGCY_MILESTONES,
  SURFACE_ACTIONS,
} from './index';
import type { RewardKey, AppSurface } from './index';

// ═══════════════════════════════════════════════════════════════════════════════
// REWARDS
// ═══════════════════════════════════════════════════════════════════════════════
describe('REWARDS', () => {
  it('contiene 10 acciones', () => {
    expect(Object.keys(REWARDS)).toHaveLength(10);
  });

  it('cada acción tiene coincitos y xp positivos', () => {
    for (const [key, reward] of Object.entries(REWARDS)) {
      expect(reward.coincitos, `${key}.coincitos`).toBeGreaterThan(0);
      expect(reward.xp, `${key}.xp`).toBeGreaterThan(0);
    }
  });

  it('WORKOUT_COMPLETE otorga 50 coincitos y 100 xp', () => {
    expect(REWARDS.WORKOUT_COMPLETE).toEqual({ coincitos: 50, xp: 100 });
  });

  it('DAILY_CHECKIN es la acción de menor valor', () => {
    const minCoincitos = Math.min(...Object.values(REWARDS).map(r => r.coincitos));
    expect(REWARDS.DAILY_CHECKIN.coincitos).toBe(minCoincitos);
  });

  it('LEAGUE_PROMOTION es la acción de mayor valor en coincitos', () => {
    const maxCoincitos = Math.max(...Object.values(REWARDS).map(r => r.coincitos));
    expect(REWARDS.LEAGUE_PROMOTION.coincitos).toBe(maxCoincitos);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// calcReward
// ═══════════════════════════════════════════════════════════════════════════════
describe('calcReward()', () => {
  it('retorna base sin multiplicador', () => {
    const result = calcReward('WORKOUT_COMPLETE');
    expect(result).toEqual({ coincitos: 50, xp: 100 });
  });

  it('retorna base con multiplicador 1', () => {
    const result = calcReward('WORKOUT_COMPLETE', 1);
    expect(result).toEqual({ coincitos: 50, xp: 100 });
  });

  it('aplica multiplicador 2x', () => {
    const result = calcReward('WORKOUT_COMPLETE', 2);
    expect(result).toEqual({ coincitos: 100, xp: 200 });
  });

  it('aplica multiplicador 1.5x con floor', () => {
    const result = calcReward('DAILY_CHECKIN', 1.5);
    // 5 * 1.5 = 7.5 → floor = 7
    expect(result.coincitos).toBe(7);
    // 10 * 1.5 = 15 → floor = 15
    expect(result.xp).toBe(15);
  });

  it('aplica multiplicador streak Warrior (1.5×) a WORKOUT_COMPLETE', () => {
    const result = calcReward('WORKOUT_COMPLETE', 1.5);
    expect(result).toEqual({ coincitos: 75, xp: 150 });
  });

  it('aplica multiplicador streak Inmortal (2.5×) a LEGACY_PATH_MILESTONE', () => {
    const result = calcReward('LEGACY_PATH_MILESTONE', 2.5);
    expect(result).toEqual({ coincitos: 500, xp: 1250 });
  });

  it('funciona con todas las acciones del REWARDS', () => {
    for (const key of Object.keys(REWARDS) as RewardKey[]) {
      const result = calcReward(key, 1);
      expect(result.coincitos).toBe(REWARDS[key].coincitos);
      expect(result.xp).toBe(REWARDS[key].xp);
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// LEAGUES
// ═══════════════════════════════════════════════════════════════════════════════
describe('LEAGUES', () => {
  it('tiene 26 ligas (Iniciado + 6×4 divisiones + Leyenda)', () => {
    expect(LEAGUES).toHaveLength(26);
  });

  it('primera liga es Iniciado con minXp 0', () => {
    expect(LEAGUES[0].id).toBe('iniciado');
    expect(LEAGUES[0].minXp).toBe(0);
    expect(LEAGUES[0].tier).toBe('iniciado');
  });

  it('última liga es Leyenda con minXp 250000', () => {
    const last = LEAGUES[LEAGUES.length - 1];
    expect(last.id).toBe('leyenda');
    expect(last.minXp).toBe(250_000);
    expect(last.tier).toBe('leyenda');
  });

  it('XP mínimo es estrictamente creciente', () => {
    for (let i = 1; i < LEAGUES.length; i++) {
      expect(LEAGUES[i].minXp, `Liga ${LEAGUES[i].id}`).toBeGreaterThan(LEAGUES[i - 1].minXp);
    }
  });

  it('cada liga tiene ID único', () => {
    const ids = LEAGUES.map(l => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('divisiones van de IV(4) a I(1) dentro de cada tier', () => {
    const tiersWithDivisions = ['bronce', 'plata', 'oro', 'legionario', 'centurion', 'maestro'];
    for (const tier of tiersWithDivisions) {
      const divisions = LEAGUES.filter(l => l.tier === tier).map(l => l.division);
      expect(divisions, `tier ${tier}`).toEqual([4, 3, 2, 1]);
    }
  });

  it('Iniciado y Leyenda no tienen divisiones (division=0)', () => {
    expect(LEAGUES.find(l => l.id === 'iniciado')!.division).toBe(0);
    expect(LEAGUES.find(l => l.id === 'leyenda')!.division).toBe(0);
  });

  it('cada liga tiene icon y color definidos', () => {
    for (const league of LEAGUES) {
      expect(league.icon, `${league.id} icon`).toBeTruthy();
      expect(league.color, `${league.id} color`).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// getLeagueForXp
// ═══════════════════════════════════════════════════════════════════════════════
describe('getLeagueForXp()', () => {
  it('0 XP → Iniciado', () => {
    expect(getLeagueForXp(0).id).toBe('iniciado');
  });

  it('499 XP → Iniciado', () => {
    expect(getLeagueForXp(499).id).toBe('iniciado');
  });

  it('500 XP → Bronce IV', () => {
    expect(getLeagueForXp(500).id).toBe('bronce_iv');
  });

  it('1700 XP → Bronce I', () => {
    expect(getLeagueForXp(1700).id).toBe('bronce_i');
  });

  it('2500 XP → Plata IV', () => {
    expect(getLeagueForXp(2500).id).toBe('plata_iv');
  });

  it('250000 XP → Leyenda', () => {
    expect(getLeagueForXp(250_000).id).toBe('leyenda');
  });

  it('999999 XP → Leyenda (ceiling)', () => {
    expect(getLeagueForXp(999_999).id).toBe('leyenda');
  });

  it('XP negativo → Iniciado', () => {
    expect(getLeagueForXp(-100).id).toBe('iniciado');
  });

  it('XP en límite exacto de cada liga', () => {
    for (const league of LEAGUES) {
      expect(getLeagueForXp(league.minXp).id).toBe(league.id);
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// getXpToNextLeague
// ═══════════════════════════════════════════════════════════════════════════════
describe('getXpToNextLeague()', () => {
  it('0 XP → 500 para Bronce IV', () => {
    expect(getXpToNextLeague(0)).toBe(500);
  });

  it('250 XP → 250 para Bronce IV', () => {
    expect(getXpToNextLeague(250)).toBe(250);
  });

  it('249999 XP → 1 para Leyenda', () => {
    expect(getXpToNextLeague(249_999)).toBe(1);
  });

  it('en Leyenda retorna null', () => {
    expect(getXpToNextLeague(250_000)).toBeNull();
    expect(getXpToNextLeague(500_000)).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// didPromote
// ═══════════════════════════════════════════════════════════════════════════════
describe('didPromote()', () => {
  it('detecta promoción de Iniciado → Bronce IV', () => {
    expect(didPromote(400, 500)).toBe(true);
  });

  it('no detecta promoción si mismo rango', () => {
    expect(didPromote(500, 700)).toBe(false);
  });

  it('no es promoción si XP bajó', () => {
    expect(didPromote(600, 400)).toBe(false);
  });

  it('detecta salto de múltiples ligas', () => {
    expect(didPromote(0, 250_000)).toBe(true);
  });

  it('detecta promoción de Bronce I → Plata IV', () => {
    expect(didPromote(2400, 2500)).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// XP_LEVELS
// ═══════════════════════════════════════════════════════════════════════════════
describe('XP_LEVELS', () => {
  it('tiene 100 niveles', () => {
    expect(XP_LEVELS).toHaveLength(100);
  });

  it('nivel 1 requiere 100 XP', () => {
    expect(XP_LEVELS[0]).toEqual({ level: 1, minXp: 100 });
  });

  it('progresión es estrictamente creciente', () => {
    for (let i = 1; i < XP_LEVELS.length; i++) {
      expect(XP_LEVELS[i].minXp).toBeGreaterThan(XP_LEVELS[i - 1].minXp);
    }
  });

  it('sigue la fórmula 100 * N^1.5', () => {
    for (const entry of XP_LEVELS) {
      const expected = Math.round(100 * Math.pow(entry.level, 1.5));
      expect(entry.minXp).toBe(expected);
    }
  });

  it('nivel 100 requiere 100,000 XP', () => {
    expect(XP_LEVELS[99]).toEqual({ level: 100, minXp: 100_000 });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// getLevelForXp
// ═══════════════════════════════════════════════════════════════════════════════
describe('getLevelForXp()', () => {
  it('0 XP → nivel 1 (mínimo)', () => {
    expect(getLevelForXp(0)).toBe(1);
  });

  it('100 XP → nivel 1', () => {
    expect(getLevelForXp(100)).toBe(1);
  });

  it('282 XP → nivel 1 (justo antes de nivel 2)', () => {
    // nivel 2 = round(100 * 2^1.5) = 283
    expect(getLevelForXp(282)).toBe(1);
  });

  it('283 XP → nivel 2', () => {
    expect(getLevelForXp(283)).toBe(2);
  });

  it('100000 XP → nivel 100', () => {
    expect(getLevelForXp(100_000)).toBe(100);
  });

  it('999999 XP → nivel 100 (ceiling)', () => {
    expect(getLevelForXp(999_999)).toBe(100);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// getXpToNextLevel
// ═══════════════════════════════════════════════════════════════════════════════
describe('getXpToNextLevel()', () => {
  it('100 XP → 183 para nivel 2', () => {
    // nivel 2 minXp = 283
    expect(getXpToNextLevel(100)).toBe(183);
  });

  it('en nivel 100 retorna null', () => {
    expect(getXpToNextLevel(100_000)).toBeNull();
    expect(getXpToNextLevel(500_000)).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// STREAK_TIERS
// ═══════════════════════════════════════════════════════════════════════════════
describe('STREAK_TIERS', () => {
  it('tiene 8 tiers', () => {
    expect(STREAK_TIERS).toHaveLength(8);
  });

  it('primer tier es Principiante (0 días, 1.0×)', () => {
    expect(STREAK_TIERS[0]).toMatchObject({
      id: 'principiante',
      minDays: 0,
      multiplier: 1.0,
    });
  });

  it('último tier es Inmortal (365 días, 2.5×)', () => {
    const last = STREAK_TIERS[STREAK_TIERS.length - 1];
    expect(last).toMatchObject({
      id: 'inmortal',
      minDays: 365,
      multiplier: 2.5,
    });
  });

  it('minDays es estrictamente creciente', () => {
    for (let i = 1; i < STREAK_TIERS.length; i++) {
      expect(STREAK_TIERS[i].minDays).toBeGreaterThan(STREAK_TIERS[i - 1].minDays);
    }
  });

  it('multiplicador es creciente', () => {
    for (let i = 1; i < STREAK_TIERS.length; i++) {
      expect(STREAK_TIERS[i].multiplier).toBeGreaterThanOrEqual(STREAK_TIERS[i - 1].multiplier);
    }
  });

  it('cada tier tiene color hex y icon', () => {
    for (const tier of STREAK_TIERS) {
      expect(tier.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(tier.icon).toBeTruthy();
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// getStreakTier / getStreakMultiplier
// ═══════════════════════════════════════════════════════════════════════════════
describe('getStreakTier()', () => {
  it('0 días → Principiante', () => {
    expect(getStreakTier(0).id).toBe('principiante');
  });

  it('6 días → Principiante (aún no Consistente)', () => {
    expect(getStreakTier(6).id).toBe('principiante');
  });

  it('7 días → Consistente', () => {
    expect(getStreakTier(7).id).toBe('consistente');
  });

  it('30 días → Warrior', () => {
    expect(getStreakTier(30).id).toBe('warrior');
  });

  it('365 días → Inmortal', () => {
    expect(getStreakTier(365).id).toBe('inmortal');
  });

  it('1000 días → Inmortal (ceiling)', () => {
    expect(getStreakTier(1000).id).toBe('inmortal');
  });
});

describe('getStreakMultiplier()', () => {
  it('0 días → 1.0×', () => {
    expect(getStreakMultiplier(0)).toBe(1.0);
  });

  it('7 días → 1.1×', () => {
    expect(getStreakMultiplier(7)).toBe(1.1);
  });

  it('14 días → 1.3×', () => {
    expect(getStreakMultiplier(14)).toBe(1.3);
  });

  it('30 días → 1.5×', () => {
    expect(getStreakMultiplier(30)).toBe(1.5);
  });

  it('90 días → 1.9×', () => {
    expect(getStreakMultiplier(90)).toBe(1.9);
  });

  it('365 días → 2.5×', () => {
    expect(getStreakMultiplier(365)).toBe(2.5);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// LGCY_MILESTONES
// ═══════════════════════════════════════════════════════════════════════════════
describe('LGCY_MILESTONES', () => {
  it('tiene 15 milestones', () => {
    expect(LGCY_MILESTONES).toHaveLength(15);
  });

  it('cada milestone tiene lgcyAmount positivo', () => {
    for (const m of LGCY_MILESTONES) {
      expect(m.lgcyAmount, m.id).toBeGreaterThan(0);
    }
  });

  it('IDs son únicos', () => {
    const ids = LGCY_MILESTONES.map(m => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contiene milestones de streak', () => {
    const streakMs = LGCY_MILESTONES.filter(m => m.condition.type === 'streak');
    expect(streakMs.length).toBe(5);
  });

  it('contiene milestones de level', () => {
    const levelMs = LGCY_MILESTONES.filter(m => m.condition.type === 'level');
    expect(levelMs.length).toBe(7);
  });

  it('contiene milestones de league', () => {
    const leagueMs = LGCY_MILESTONES.filter(m => m.condition.type === 'league');
    expect(leagueMs.length).toBe(3);
    // Oro, Maestro, Leyenda
    const leagueValues = leagueMs.map(m => m.condition.value);
    expect(leagueValues).toContain('oro');
    expect(leagueValues).toContain('maestro');
    expect(leagueValues).toContain('leyenda');
  });

  it('streak 365 otorga más LGCY que streak 30', () => {
    const s30 = LGCY_MILESTONES.find(m => m.id === 'streak_30')!;
    const s365 = LGCY_MILESTONES.find(m => m.id === 'streak_365')!;
    expect(s365.lgcyAmount).toBeGreaterThan(s30.lgcyAmount);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// SURFACE_ACTIONS
// ═══════════════════════════════════════════════════════════════════════════════
describe('SURFACE_ACTIONS', () => {
  it('define 4 surfaces', () => {
    expect(Object.keys(SURFACE_ACTIONS)).toHaveLength(4);
  });

  it('landing_heroia no otorga COINCITO', () => {
    expect(SURFACE_ACTIONS.landing_heroia).toEqual([]);
  });

  it('the_road_app incluye LEGACY_PATH_NODE', () => {
    expect(SURFACE_ACTIONS.the_road_app).toContain('LEGACY_PATH_NODE');
  });

  it('app_fit_legacy_full tiene las más acciones', () => {
    const counts = Object.values(SURFACE_ACTIONS).map(a => a.length);
    expect(SURFACE_ACTIONS.app_fit_legacy_full.length).toBe(Math.max(...counts));
  });

  it('mobile_flutter_lite incluye WORKOUT_COMPLETE', () => {
    expect(SURFACE_ACTIONS.mobile_flutter_lite).toContain('WORKOUT_COMPLETE');
  });

  it('todas las acciones referenciadas existen en REWARDS', () => {
    const rewardKeys = new Set(Object.keys(REWARDS));
    for (const [surface, actions] of Object.entries(SURFACE_ACTIONS)) {
      for (const action of actions) {
        expect(rewardKeys.has(action), `${surface}.${action} no existe en REWARDS`).toBe(true);
      }
    }
  });

  it('DAILY_CHECKIN está en road, full, y flutter', () => {
    expect(SURFACE_ACTIONS.the_road_app).toContain('DAILY_CHECKIN');
    expect(SURFACE_ACTIONS.app_fit_legacy_full).toContain('DAILY_CHECKIN');
    expect(SURFACE_ACTIONS.mobile_flutter_lite).toContain('DAILY_CHECKIN');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Integración: flujo completo de reward + streak + liga
// ═══════════════════════════════════════════════════════════════════════════════
describe('Integración: flujo completo', () => {
  it('simula usuario con 45 días de streak completando workout', () => {
    const streak = 45;
    const multiplier = getStreakMultiplier(streak);
    expect(multiplier).toBe(1.5); // Warrior

    const reward = calcReward('WORKOUT_COMPLETE', multiplier);
    expect(reward).toEqual({ coincitos: 75, xp: 150 });
  });

  it('simula usuario acumulando XP y promoviendo de liga', () => {
    const prevXp = 450; // Iniciado
    const reward = calcReward('LEGACY_PATH_MILESTONE', 1); // 500 xp
    const newXp = prevXp + reward.xp; // 950

    expect(getLeagueForXp(prevXp).id).toBe('iniciado');
    expect(getLeagueForXp(newXp).id).toBe('bronce_iii');
    expect(didPromote(prevXp, newXp)).toBe(true);
  });

  it('simula progresión de nivel con XP', () => {
    let xp = 0;
    expect(getLevelForXp(xp)).toBe(1);

    // Acumula 10 workouts base
    xp += 10 * REWARDS.WORKOUT_COMPLETE.xp; // 1000
    // nivel 4 minXp = round(100*4^1.5) = 800, nivel 5 = round(100*5^1.5) = 1118
    // 1000 >= 800 (nivel 4) pero < 1118 (nivel 5)
    expect(getLevelForXp(xp)).toBe(4);
  });
});
