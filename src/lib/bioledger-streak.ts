import type { BioLedgerStats, WorkoutSession } from './bioledger-store';

export function sessionXp(session: Pick<WorkoutSession, 'exerciseCount' | 'foodItems'>) {
  return session.exerciseCount * 10 + session.foodItems * 5;
}

export function dateKey(value: string | Date) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function dayNumber(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return Date.UTC(y, m - 1, d) / 86_400_000;
}

export function deriveBioLedgerStats(sessions: WorkoutSession[]): { stats: BioLedgerStats; lastSessionDate: string | null } {
  const dates = [...new Set(sessions.map((session) => dateKey(session.date)).filter(Boolean))].sort();
  const today = dateKey(new Date());
  const todayNumber = dayNumber(today);
  let longestStreak = 0;
  let run = 0;
  for (let index = 0; index < dates.length; index += 1) {
    run = index > 0 && dayNumber(dates[index]) - dayNumber(dates[index - 1]) === 1 ? run + 1 : 1;
    longestStreak = Math.max(longestStreak, run);
  }

  let currentStreak = 0;
  if (dates.length && todayNumber - dayNumber(dates[dates.length - 1]) <= 1) {
    currentStreak = 1;
    for (let index = dates.length - 1; index > 0; index -= 1) {
      if (dayNumber(dates[index]) - dayNumber(dates[index - 1]) !== 1) break;
      currentStreak += 1;
    }
  }

  const totalXp = sessions.reduce((sum, session) => sum + sessionXp(session), 0);
  const totalExercises = sessions.reduce((sum, session) => sum + session.exerciseCount, 0);
  const totalSessions = sessions.length;
  return {
    lastSessionDate: dates.at(-1) ?? null,
    stats: {
      totalXp,
      level: Math.floor(totalXp / 1000) + 1,
      coincitos: Math.floor(totalXp / 50),
      currentStreak,
      longestStreak,
      totalSessions,
      totalExercises,
      averageSessionValue: totalSessions ? Math.round(totalXp / totalSessions) : 0,
    },
  };
}
