import { supabase } from './supabase';
import type { WirDocument } from './wir';

export type RoutineAnalyticsStats = {
  slug: string;
  routineName: string;
  routineType: 'workout' | 'nutrition' | 'mixed';
  exercisesCount: number;
  foodsCount: number;
  totalViews: number;
  completedViews: number;
  completionRate: number;
  reshareCount: number;
  avgItemsChecked: number;
  avgTimeSpent: number;
};

type TrackPayload = {
  slug: string;
  action: 'view' | 'completion' | 'reshare';
  sessionId?: string;
  itemsChecked?: number;
  totalItems?: number;
  timeSpentSeconds?: number;
  routine?: {
    name?: string;
    type?: 'workout' | 'nutrition' | 'mixed';
    exercisesCount?: number;
    foodsCount?: number;
    wirHash?: string;
  };
};

const SESSION_KEY_PREFIX = 'fl-routine-analytics-session:';

export function getRoutineAnalyticsSession(slug: string) {
  const key = `${SESSION_KEY_PREFIX}${slug}`;
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;

    const created = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, created);
    return created;
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export async function hashWirDocument(wir: WirDocument) {
  const encoded = new TextEncoder().encode(JSON.stringify(wir));
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function trackRoutineAnalytics(payload: TrackPayload) {
  try {
    const { error } = await supabase.functions.invoke('routine-analytics', {
      body: payload,
    });
    if (error) {
      console.warn('routine analytics tracking failed', error);
    }
  } catch (error) {
    console.warn('routine analytics tracking failed', error);
  }
}

export async function loadRoutineAnalyticsStats(slugs: string[]) {
  const uniqueSlugs = Array.from(new Set(slugs.filter(Boolean)));
  if (uniqueSlugs.length === 0) return [];

  try {
    const { data, error } = await supabase.functions.invoke<{ stats: RoutineAnalyticsStats[] }>('routine-analytics', {
      body: {
        action: 'stats',
        slugs: uniqueSlugs,
      },
    });

    if (error) {
      console.warn('routine analytics stats failed', error);
      return [];
    }

    return data?.stats || [];
  } catch (error) {
    console.warn('routine analytics stats failed', error);
    return [];
  }
}
