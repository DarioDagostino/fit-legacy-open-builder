import type { StateStorage } from 'zustand/middleware';

const SCOPE_EVENT = 'fit-legacy:user-scope-changed';
let currentUserId: string | null = null;

export function getCurrentUserId() {
  return currentUserId;
}

export function setCurrentUserId(userId: string | null) {
  if (currentUserId === userId) return;
  currentUserId = userId;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SCOPE_EVENT, { detail: { userId } }));
  }
}

export function getUserScopeKey(base: string, userId = currentUserId) {
  return `${base}:${userId || 'anonymous'}`;
}

export function createScopedStorage(base: string): StateStorage {
  return {
    getItem: () => localStorage.getItem(getUserScopeKey(base)) || null,
    setItem: (_key, value) => localStorage.setItem(getUserScopeKey(base), value),
    removeItem: () => localStorage.removeItem(getUserScopeKey(base)),
  };
}

export function scopedLocalStorageGet<T>(base: string, fallback: T): T {
  try {
    const value = localStorage.getItem(getUserScopeKey(base));
    return value == null ? fallback : JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function scopedLocalStorageSet<T>(base: string, value: T) {
  localStorage.setItem(getUserScopeKey(base), JSON.stringify(value));
}

export function scopedRawGet(base: string) {
  return localStorage.getItem(getUserScopeKey(base));
}

export function scopedRawSet(base: string, value: string) {
  localStorage.setItem(getUserScopeKey(base), value);
}

export function onUserScopeChanged(listener: (userId: string | null) => void) {
  if (typeof window === 'undefined') return () => undefined;
  const handler = (event: Event) => listener((event as CustomEvent<{ userId: string | null }>).detail?.userId ?? null);
  window.addEventListener(SCOPE_EVENT, handler);
  return () => window.removeEventListener(SCOPE_EVENT, handler);
}
