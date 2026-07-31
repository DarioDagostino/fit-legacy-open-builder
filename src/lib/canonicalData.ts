import { supabase } from './supabase';
import type { CalendarAction, CalendarEntry } from '../components/workout/CalendarPanel';
import type { WorkoutSession } from './bioledger-store';

async function currentUserId() {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function syncRoutineToSupabase(payload: unknown, name: string) {
  const userId = await currentUserId();
  if (!userId) return;
  const { error } = await supabase.from('fitness_routines').upsert({ user_id: userId, name, payload, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) throw error;
}

export async function syncCalendarEntryToSupabase(entry: CalendarEntry) {
  const userId = await currentUserId();
  if (!userId) return;
  const { error } = await supabase.from('fitness_calendar_entries').upsert({ user_id: userId, date: entry.date, payload: entry, updated_at: new Date().toISOString() }, { onConflict: 'user_id,date' });
  if (error) throw error;
}

export async function syncCalendarActionsToSupabase(actions: CalendarAction[]) {
  const userId = await currentUserId();
  if (!userId) return;
  const rows = actions.map((action) => ({
    client_id: action.id,
    user_id: userId,
    action_date: action.date,
    title: action.title,
    action_type: action.type,
    completed: action.completed,
    payload: action,
    updated_at: new Date().toISOString(),
  }));
  const { error } = rows.length
    ? await supabase.from('fitness_calendar_actions').upsert(rows, { onConflict: 'user_id,client_id' })
    : { error: null };
  if (error) throw error;
}

export async function recordSessionToSupabase(session: WorkoutSession) {
  const userId = await currentUserId();
  if (!userId) return;
  const { error } = await supabase.from('fitness_sessions').upsert({
    id: session.id,
    user_id: userId,
    session_date: session.date,
    exercise_count: session.exerciseCount,
    total_sets: session.totalSets,
    total_reps: session.totalReps,
    food_items: session.foodItems,
    total_calories: session.totalCalories,
    duration: session.duration ?? null,
    notes: session.notes ?? null,
  });
  if (error) throw error;
}

export async function reportCanonicalSyncError(error: unknown) {
  console.warn('Canonical Supabase sync unavailable; local cache remains active.', error);
}
