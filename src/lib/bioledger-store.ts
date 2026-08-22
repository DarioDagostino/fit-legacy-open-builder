/**
 * src/lib/bioledger-store.ts
 * Zustand store for BioLedger analytics & tracking
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createScopedStorage } from './userScope';
import { deriveBioLedgerStats } from './bioledger-streak';
import { recordSessionToSupabase, reportCanonicalSyncError } from './canonicalData';

export interface WorkoutSession {
  id: string;
  date: string;
  exerciseCount: number;
  totalSets: number;
  totalReps: number;
  foodItems: number;
  totalCalories: number;
  duration?: number; // minutes
  notes?: string;
}

export interface BioLedgerStats {
  totalXp: number;
  level: number;
  coincitos: number; // Legacy tokens
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalExercises: number;
  averageSessionValue: number;
  bestLift?: {
    exerciseName: string;
    estimated1RmKg: number;
    weightKg: number;
    reps: number;
    date: string;
  };
  restTimerHistory?: Array<{
    durationSeconds: number;
    mode: 'single' | 'interval';
    preset?: string;
    rounds?: number;
    xpEarned: number;
    date: string;
  }>;
}

interface BioLedgerState {
  stats: BioLedgerStats;
  sessions: WorkoutSession[];
  lastSessionDate: string | null;

  // Actions
  addSession: (session: Omit<WorkoutSession, 'id'>) => void;
  removeSession: (id: string) => void;
  updateStats: (updates: Partial<BioLedgerStats>) => void;
  incrementXp: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  getWeeklyData: () => WorkoutSession[];
  getMonthlyStats: () => { total: number; average: number };
}

export const useBioLedgerStore = create<BioLedgerState>()(
  persist(
    (set, get) => ({
      stats: {
        totalXp: 0,
        level: 1,
        coincitos: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalSessions: 0,
        totalExercises: 0,
        averageSessionValue: 0,
      },
      sessions: [],
      lastSessionDate: null,

      addSession: (session) => {
        const newSession: WorkoutSession = {
          ...session,
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `session_${Date.now()}`,
        };
        set((state) => {
          const sessions = [...state.sessions, newSession];
          const derived = deriveBioLedgerStats(sessions);

          return {
            sessions,
            stats: derived.stats,
            lastSessionDate: derived.lastSessionDate,
          };
        });
        void recordSessionToSupabase(newSession).catch(reportCanonicalSyncError);
      },

      removeSession: (id: string) => {
        set((state) => {
          const session = state.sessions.find(s => s.id === id);
          if (!session) return state;

          const sessions = state.sessions.filter(s => s.id !== id);
          const derived = deriveBioLedgerStats(sessions);

          return {
            sessions,
            stats: derived.stats,
            lastSessionDate: derived.lastSessionDate,
          };
        });
      },

      updateStats: (updates) => {
        set((state) => ({
          stats: { ...state.stats, ...updates }
        }));
      },

      incrementXp: (amount) => {
        set((state) => {
          const newXp = state.stats.totalXp + amount;
          const newLevel = Math.floor(newXp / 1000) + 1;
          const newCoincitos = state.stats.coincitos + Math.floor(amount / 50);

          return {
            stats: {
              ...state.stats,
              totalXp: newXp,
              level: newLevel,
              coincitos: newCoincitos,
            }
          };
        });
      },

      incrementStreak: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            currentStreak: state.stats.currentStreak + 1,
            longestStreak: Math.max(
              state.stats.longestStreak,
              state.stats.currentStreak + 1
            ),
          }
        }));
      },

      resetStreak: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            currentStreak: 0,
          }
        }));
      },

      getWeeklyData: () => {
        const state = get();
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        return state.sessions.filter(s => {
          const sessionDate = new Date(s.date);
          return sessionDate >= weekAgo;
        });
      },

      getMonthlyStats: () => {
        const state = get();
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        const monthlySessions = state.sessions.filter(s => {
          const sessionDate = new Date(s.date);
          return sessionDate >= monthAgo;
        });

        const total = monthlySessions.reduce((sum, s) => sum + s.exerciseCount, 0);
        const average = monthlySessions.length > 0 ? Math.round(total / monthlySessions.length) : 0;

        return { total, average };
      },
    }),
    {
      name: 'fit-legacy-bioledger',
      storage: createJSONStorage(() => createScopedStorage('fit-legacy-bioledger')),
    }
  )
);
