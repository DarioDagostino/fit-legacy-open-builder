/**
 * src/lib/bioledger-store.ts
 * Zustand store for BioLedger analytics & tracking
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        set((state) => {
          const newSession: WorkoutSession = {
            ...session,
            id: `session_${Date.now()}`,
          };

          // Calculate XP for this session (rough estimate)
          const sessionXp = (session.exerciseCount * 10) + (session.foodItems * 5);
          
          // Update streak if session is today or yesterday
          const today = new Date().toISOString().split('T')[0];
          const isToday = session.date === today;
          
          let updatedStats = { ...state.stats };
          
          if (isToday && (!state.lastSessionDate || state.lastSessionDate !== today)) {
            updatedStats.currentStreak += 1;
            updatedStats.longestStreak = Math.max(
              updatedStats.longestStreak,
              updatedStats.currentStreak
            );
          }

          updatedStats.totalXp += sessionXp;
          updatedStats.level = Math.floor(updatedStats.totalXp / 1000) + 1;
          updatedStats.coincitos += Math.floor(sessionXp / 50);
          updatedStats.totalSessions += 1;
          updatedStats.totalExercises += session.exerciseCount;
          updatedStats.averageSessionValue = Math.round(
            updatedStats.totalXp / updatedStats.totalSessions
          );

          return {
            sessions: [...state.sessions, newSession],
            stats: updatedStats,
            lastSessionDate: isToday ? today : state.lastSessionDate,
          };
        });
      },

      removeSession: (id: string) => {
        set((state) => {
          const session = state.sessions.find(s => s.id === id);
          if (!session) return state;

          // Recalculate stats without this session
          const sessionXp = (session.exerciseCount * 10) + (session.foodItems * 5);
          
          return {
            sessions: state.sessions.filter(s => s.id !== id),
            stats: {
              ...state.stats,
              totalXp: Math.max(0, state.stats.totalXp - sessionXp),
              totalSessions: Math.max(0, state.stats.totalSessions - 1),
              totalExercises: Math.max(0, state.stats.totalExercises - session.exerciseCount),
            },
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
    }
  )
);
