import { useBioLedgerStore } from '../lib/bioledger-store';

export type BuilderBestLift = {
  exerciseName: string;
  estimated1RmKg: number;
  weightKg: number;
  reps: number;
  date: string;
};

export function updateBuilderBestLift(bestLift: BuilderBestLift) {
  useBioLedgerStore.getState().updateStats({ bestLift });
}

export function recordBuilderRestTimerSession(session: {
  durationSeconds: number;
  mode: 'single' | 'interval';
  preset?: string;
  rounds?: number;
  xpEarned: number;
}) {
  const current = useBioLedgerStore.getState().stats.restTimerHistory || [];
  useBioLedgerStore.getState().updateStats({
    restTimerHistory: [
      ...current,
      { ...session, date: new Date().toISOString() },
    ].slice(-50),
  });
  useBioLedgerStore.getState().incrementXp(session.xpEarned);
}
