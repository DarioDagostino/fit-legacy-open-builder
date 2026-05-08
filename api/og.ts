/**
 * api/og.ts — Vercel Edge Function (compatible con Vite SPA)
 *
 * Intercepta requests a /api/og?data=... y devuelve un HTML mínimo
 * con meta-tags Open Graph para WhatsApp, Telegram, Slack, etc.
 *
 * Para usuarios reales redirige automáticamente vía <meta http-equiv="refresh">.
 *
 * Deploy: Vercel lo detecta automáticamente porque vive en /api/
 * Runtime: Edge (0ms cold start, free tier 1M invocaciones/mes)
 */

export const config = { runtime: 'edge' };

const BASE_URL = 'https://builders.fitlegacy.app';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-wir-card.png`;
const DEFAULT_TITLE = 'PROTOCOLO LEGACY';
const DEFAULT_DESC =
  'Protocolo de entrenamiento Fit Legacy. Toca para ver los detalles y añadirlo a tu arsenal.';

const BOT_AGENTS = [
  'whatsapp',
  'telegrambot',
  'twitterbot',
  'facebookexternalhit',
  'linkedinbot',
  'slackbot',
  'discordbot',
  'applebot',
  'iframely',
  'vkshare',
  'w3c_validator',
];

function decodeWIR(encoded: string): { name: string; coverImageUrl: string | null } {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
    const jsonStr = new TextDecoder().decode(bytes);
    const json = JSON.parse(jsonStr);
    
    return {
      name: (json.n || json.name || DEFAULT_TITLE).toUpperCase(),
      coverImageUrl: json.c || json.coverImageUrl || null,
    };
  } catch {
    return { name: DEFAULT_TITLE, coverImageUrl: null };
  }
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildOGHtml(
  routineName: string,
  ogImage: string,
  canonicalUrl: string,
  targetUrl: string
): string {
  const title = `MISIÓN: ${routineName}`;

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>${esc(title)}</title>

    <!-- Open Graph (WhatsApp, Facebook, LinkedIn) -->
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(DEFAULT_DESC)}" />
    <meta property="og:image" content="${esc(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${esc(canonicalUrl)}" />
    <meta property="og:site_name" content="Fit Legacy Arsenal" />

    <!-- Twitter / X Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(DEFAULT_DESC)}" />
    <meta name="twitter:image" content="${esc(ogImage)}" />

    <!-- Redirect real users (bots ignoran JS y meta-refresh) -->
    <meta http-equiv="refresh" content="0;url=${esc(targetUrl)}" />
  </head>
  <body style="background:#050505;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
    <p style="opacity:0.4;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;">Cargando protocolo...</p>
  </body>
</html>`;
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const data = url.searchParams.get('data');

  // Sin payload → redirigir al builder
  if (!data) {
    return Response.redirect(`${BASE_URL}/`, 302);
  }

  const ua = (req.headers.get('user-agent') || '').toLowerCase();
  const isBot = BOT_AGENTS.some((bot) => ua.includes(bot));

  const { name, coverImageUrl } = decodeWIR(data);
  const ogImage = coverImageUrl || DEFAULT_OG_IMAGE;

  // URL de destino = la vista SovereignShared en el SPA
  const targetUrl = `${BASE_URL}/r/wir?data=${encodeURIComponent(data)}`;
  // URL canónica para el OG (la propia URL de la edge function)
  const canonicalUrl = req.url;

  if (!isBot) {
    // Usuario real → redirigir directamente a la vista del builder
    return Response.redirect(targetUrl, 302);
  }

  // Bot → HTML con meta-tags OG
  const html = buildOGHtml(name, ogImage, canonicalUrl, targetUrl);

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // 5 min de cache — suficiente para preview de WhatsApp
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
    },
  });
}
