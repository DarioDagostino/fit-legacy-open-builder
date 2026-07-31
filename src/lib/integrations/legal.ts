export type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const COOKIE_STORAGE_KEYS = {
  accepted: 'fit-legacy-cookie-accepted',
  preferences: 'fit-legacy-cookie-preferences',
} as const;

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const ACCEPT_ALL_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: true,
};

export const AUTH_LEGAL_NOTICE = 'Para continuar, aceptá nuestras condiciones legales.';
export const TERMS_CONFIRMATION_LABEL = 'Acepto los términos y políticas de Fit Legacy.';

export function getCookiePreferences(): CookiePreferences {
  if (typeof localStorage === 'undefined') return DEFAULT_COOKIE_PREFERENCES;
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEYS.preferences);
    return raw ? { ...DEFAULT_COOKIE_PREFERENCES, ...JSON.parse(raw) } : DEFAULT_COOKIE_PREFERENCES;
  } catch {
    return DEFAULT_COOKIE_PREFERENCES;
  }
}

export function notifyCookiePreferencesChanged() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('cookie-preferences-changed'));
}

export function buildLegalUrls(baseUrl: string) {
  const base = baseUrl.replace(/\/$/, '');

  return {
    terms: `${base}/terms`,
    privacy: `${base}/privacy`,
    cookies: `${base}/cookies`,
  };
}
