type SupportedStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

function readCookie(name: string): string | null {
  const key = `${name}=`;
  const parts = document.cookie.split(';').map((p) => p.trim());
  const found = parts.find((p) => p.startsWith(key));
  return found ? decodeURIComponent(found.slice(key.length)) : null;
}

function writeCookie(name: string, value: string): void {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}${sharedCookieAttributes()}`;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; Path=/; Max-Age=0${sharedCookieAttributes()}`;
}

function sharedCookieAttributes(): string {
  if (typeof window === 'undefined') return '; SameSite=Lax';
  const hostname = window.location.hostname.toLowerCase();
  const isFitLegacyDomain = hostname === 'fitlegacy.app' || hostname.endsWith('.fitlegacy.app');
  const domain = isFitLegacyDomain ? '; Domain=.fitlegacy.app' : '';
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  return `${domain}; SameSite=Lax${secure}`;
}

export const cookieStorage: SupportedStorage = {
  getItem: (key: string) => readCookie(key),
  setItem: (key: string, value: string) => writeCookie(key, value),
  removeItem: (key: string) => deleteCookie(key),
};
