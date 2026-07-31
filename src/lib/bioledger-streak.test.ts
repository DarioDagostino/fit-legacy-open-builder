import { describe, expect, it } from 'vitest';
import { deriveBioLedgerStats } from './bioledger-streak';
import type { WorkoutSession } from './bioledger-store';

const session = (date: string, id = date): WorkoutSession => ({
  id, date, exerciseCount: 2, totalSets: 4, totalReps: 20, foodItems: 1, totalCalories: 500,
});

describe('deriveBioLedgerStats', () => {
  it('derives streaks from unique calendar days', () => {
    const result = deriveBioLedgerStats([
      session('2026-07-28'), session('2026-07-29', 'b'), session('2026-07-29', 'c'), session('2026-07-30'),
    ]);
    expect(result.stats.totalSessions).toBe(4);
    expect(result.stats.currentStreak).toBeGreaterThanOrEqual(0);
    expect(result.stats.longestStreak).toBe(3);
    expect(result.lastSessionDate).toBe('2026-07-30');
  });

  it('recomputes empty state after deletion', () => {
    const result = deriveBioLedgerStats([]);
    expect(result.stats).toMatchObject({ totalXp: 0, currentStreak: 0, longestStreak: 0, totalSessions: 0 });
    expect(result.lastSessionDate).toBeNull();
  });
});
