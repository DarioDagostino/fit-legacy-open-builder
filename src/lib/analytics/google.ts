/**
 * Google Analytics 4 + Google Ads (gtag.js) integration.
 *
 * Env vars required (set in .env.local / Vercel dashboard):
 *   VITE_GA_MEASUREMENT_ID  — e.g. G-XXXXXXXXXX  (Google Analytics 4)
 *   VITE_GOOGLE_ADS_ID      — e.g. AW-XXXXXXXXX  (Google Ads, optional)
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** Dynamically injects gtag.js and configures GA4 + Google Ads. */
export function initGoogleAnalytics(): void {
  if (initialized) return;

  const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;

  if (!GA_ID) return; // Nothing to do without a measurement ID

  initialized = true;

  // Bootstrap dataLayer and gtag shim
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());

  // Configure GA4
  window.gtag('config', GA_ID, { send_page_view: true });

  // Configure Google Ads (optional)
  if (ADS_ID) {
    window.gtag('config', ADS_ID);
  }

  // Inject the gtag.js script tag
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);
}

// ─── Event helpers ────────────────────────────────────────────────────────────

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (!initialized || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

/** Track a Google Ads conversion. */
export function trackConversion(
  sendTo: string,
  params?: Record<string, unknown>
): void {
  if (!initialized || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: sendTo, ...params });
}
