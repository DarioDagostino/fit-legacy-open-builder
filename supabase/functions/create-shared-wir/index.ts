import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type WirDocument = {
  v?: number;
  t?: 'routine' | 'meal' | 'mixed';
  p?: string;
  n?: string;
  c?: string | null;
  e?: Array<{ i?: string; s?: number; r?: number; w?: number; m?: string }>;
  f?: Array<{ i?: string; q?: number; m?: string }>;
};

const RATE_WINDOW_MINUTES = 10;
const MAX_CREATES_PER_WINDOW = 12;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function makeSlug(length = 8) {
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('');
}

function cleanString(value: unknown, fallback: string, maxLength: number) {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  return trimmed.slice(0, maxLength);
}

function getClientIp(req: Request): string | null {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const cfIp = req.headers.get('cf-connecting-ip')?.trim();
  if (cfIp) return cfIp;

  return null;
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function getAuthedUserId(req: Request, supabaseUrl: string, anonKey: string): Promise<string | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return null;

  const authClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data } = await authClient.auth.getUser();
  return data.user?.id || null;
}

function validateWir(input: unknown): { ok: true; doc: WirDocument } | { ok: false; error: string } {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'WIR payload must be an object' };
  }

  const doc = input as WirDocument;
  if (doc.v !== 1) {
    return { ok: false, error: 'Unsupported WIR version' };
  }

  const exercises = Array.isArray(doc.e) ? doc.e : [];
  const foods = Array.isArray(doc.f) ? doc.f : [];

  if (exercises.length === 0 && foods.length === 0) {
    return { ok: false, error: 'WIR payload must include exercises or foods' };
  }

  if (exercises.length > 80 || foods.length > 120) {
    return { ok: false, error: 'WIR payload is too large' };
  }

  for (const exercise of exercises) {
    if (!exercise?.i || typeof exercise.i !== 'string') {
      return { ok: false, error: 'Exercise id is required' };
    }
  }

  for (const food of foods) {
    if (!food?.i || typeof food.i !== 'string') {
      return { ok: false, error: 'Food id is required' };
    }
  }

  return { ok: true, doc };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const publicShareBaseUrl = (Deno.env.get('PUBLIC_SHARE_BASE_URL') || 'https://fitlegacy.app').replace(/\/$/, '');

    if (!supabaseUrl || !serviceRoleKey) {
      return json({ error: 'Supabase server env is not configured' }, 500);
    }

    const body = await req.json();
    const validation = validateWir(body?.wir);
    if (!validation.ok) {
      return json({ error: validation.error }, 400);
    }

    const clientIp = getClientIp(req);
    if (!clientIp) {
      return json({ error: 'Could not resolve client IP' }, 400);
    }
    const ipHash = (await sha256Hex(clientIp)).slice(0, 24);

    const wir = validation.doc;
    const title = cleanString(body?.title || wir.n, 'Plan compartido', 120);
    const description = cleanString(body?.description, 'Abrilo sin instalar nada.', 180);
    const expiresInDays = Number.isFinite(Number(body?.expiresInDays))
      ? Math.max(1, Math.min(90, Number(body.expiresInDays)))
      : 30;
    const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString();

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const userId = anonKey ? await getAuthedUserId(req, supabaseUrl, anonKey).catch(() => null) : null;

    const windowStart = new Date(Date.now() - RATE_WINDOW_MINUTES * 60 * 1000).toISOString();
    const { data: recentRows, error: rateError } = await supabase
      .from('shared_content')
      .select('id')
      .eq('type', 'wir')
      .eq('source', 'builder')
      .contains('metadata', { ip_hash: ipHash })
      .gte('created_at', windowStart)
      .limit(MAX_CREATES_PER_WINDOW);

    if (rateError) {
      // Keep endpoint available even if rate query fails transiently.
      console.error('create-shared-wir rate-check failed', rateError);
    }

    if (!rateError && (recentRows?.length || 0) >= MAX_CREATES_PER_WINDOW) {
      return json(
        {
          error: 'Too many shared links created. Please wait a few minutes.',
          retryAfterSeconds: RATE_WINDOW_MINUTES * 60,
        },
        429,
      );
    }

    let row: { slug: string } | null = null;
    let lastError: unknown = null;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const slug = makeSlug();
      const { data, error } = await supabase
        .from('shared_content')
        .insert({
          slug,
          type: 'wir',
          title,
          description,
          content: { wir },
          user_id: userId,
          source: 'builder',
          expires_at: expiresAt,
          metadata: {
            template: wir.t || 'routine',
            palette: wir.p || null,
            exercise_count: Array.isArray(wir.e) ? wir.e.length : 0,
            food_count: Array.isArray(wir.f) ? wir.f.length : 0,
            ip_hash: ipHash,
            ua: (req.headers.get('user-agent') || '').slice(0, 220),
          },
        })
        .select('slug')
        .single();

      if (!error && data) {
        row = data;
        break;
      }

      lastError = error;
      if (!String(error?.message || '').toLowerCase().includes('duplicate')) {
        break;
      }
    }

    if (!row) {
      console.error('create-shared-wir failed', lastError);
      return json({ error: 'Could not create shared link' }, 500);
    }

    return json({
      slug: row.slug,
      url: `${publicShareBaseUrl}/r/${row.slug}`,
      ogUrl: `${publicShareBaseUrl}/api/og?slug=${row.slug}`,
      expiresAt,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Unexpected error' }, 400);
  }
});
