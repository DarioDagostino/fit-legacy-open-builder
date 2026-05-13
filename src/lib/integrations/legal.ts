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

export function buildLegalUrls(baseUrl: string) {
  const base = baseUrl.replace(/\/$/, '');

  return {
    terms: `${base}/terms`,
    privacy: `${base}/privacy`,
    cookies: `${base}/cookies`,
  };
}
