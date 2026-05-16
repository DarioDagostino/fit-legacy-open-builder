import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type AnalyticsAction = 'view' | 'completion' | 'reshare' | 'stats';

type RoutineSnapshot = {
  name?: string;
  type?: 'workout' | 'nutrition' | 'mixed';
  exercisesCount?: number;
  foodsCount?: number;
  wirHash?: string;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function cleanString(value: unknown, fallback: string, maxLength: number) {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return (trimmed || fallback).slice(0, maxLength);
}

function cleanInt(value: unknown, fallback = 0) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.floor(parsed));
}

function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')?.trim()
    || req.headers.get('cf-connecting-ip')?.trim()
    || 'unknown'
  );
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function ensureAnalytics(
  supabase: ReturnType<typeof createClient>,
  slug: string,
  routine: RoutineSnapshot,
) {
  const { data: existing, error: existingError } = await supabase
    .from('routine_analytics')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing?.id) return existing.id as string;

  const { data: shared } = await supabase
    .from('shared_content')
    .select('id, title, type, user_id, content, metadata')
    .eq('slug', slug)
    .maybeSingle();

  const wir = (shared?.content as { wir?: { e?: unknown[]; f?: unknown[]; t?: string; n?: string } } | null)?.wir;
  const metadata = (shared?.metadata || {}) as Record<string, unknown>;
  const exercisesCount = cleanInt(routine.exercisesCount, cleanInt(metadata.exercise_count, Array.isArray(wir?.e) ? wir.e.length : 0));
  const foodsCount = cleanInt(routine.foodsCount, cleanInt(metadata.food_count, Array.isArray(wir?.f) ? wir.f.length : 0));
  const inferredType = routine.type
    || (wir?.t === 'meal' ? 'nutrition' : wir?.t === 'routine' ? 'workout' : undefined)
    || (exercisesCount > 0 && foodsCount > 0 ? 'mixed' : foodsCount > 0 ? 'nutrition' : 'workout');

  const { data, error } = await supabase
    .from('routine_analytics')
    .insert({
      shared_content_id: shared?.id || null,
      slug,
      wir_hash: routine.wirHash || null,
      creator_id: shared?.user_id || null,
      routine_name: cleanString(routine.name || wir?.n || shared?.title, 'Plan compartido', 140),
      routine_type: inferredType,
      exercises_count: exercisesCount,
      foods_count: foodsCount,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id as string;
}

async function upsertView(
  supabase: ReturnType<typeof createClient>,
  analyticsId: string,
  slug: string,
  sessionId: string,
  req: Request,
  body: Record<string, unknown>,
) {
  const now = new Date().toISOString();
  const ipHash = (await sha256Hex(getClientIp(req))).slice(0, 24);
  const timeSpent = cleanInt(body.timeSpentSeconds);
  const itemsChecked = cleanInt(body.itemsChecked);
  const totalItems = cleanInt(body.totalItems);

  const { data: existing, error: selectError } = await supabase
    .from('routine_views')
    .select('id, time_spent_seconds, items_checked, total_items, completed, reshare_count')
    .eq('routine_analytics_id', analyticsId)
    .eq('view_session_id', sessionId)
    .maybeSingle();

  if (selectError) throw selectError;

  if (existing?.id) {
    const nextItemsChecked = Math.max(cleanInt(existing.items_checked), itemsChecked);
    const nextTotalItems = Math.max(cleanInt(existing.total_items), totalItems);
    const { error } = await supabase
      .from('routine_views')
      .update({
        last_seen_at: now,
        time_spent_seconds: Math.max(cleanInt(existing.time_spent_seconds), timeSpent),
        items_checked: nextItemsChecked,
        total_items: nextTotalItems,
        completed: Boolean(existing.completed) || (nextTotalItems > 0 && nextItemsChecked >= nextTotalItems),
      })
      .eq('id', existing.id);

    if (error) throw error;
    return existing.id as string;
  }

  const { data, error } = await supabase
    .from('routine_views')
    .insert({
      routine_analytics_id: analyticsId,
      slug,
      view_session_id: sessionId,
      ip_hash: ipHash,
      user_agent: (req.headers.get('user-agent') || '').slice(0, 220),
      referrer: (req.headers.get('referer') || '').slice(0, 320),
      time_spent_seconds: timeSpent,
      items_checked: itemsChecked,
      total_items: totalItems,
      completed: totalItems > 0 && itemsChecked >= totalItems,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id as string;
}

async function getStats(supabase: ReturnType<typeof createClient>, slugs: string[]) {
  const uniqueSlugs = Array.from(new Set(slugs.map((slug) => slug.trim()).filter(Boolean))).slice(0, 50);
  if (uniqueSlugs.length === 0) return [];

  const { data: analyticsRows, error: analyticsError } = await supabase
    .from('routine_analytics')
    .select('id, slug, routine_name, routine_type, exercises_count, foods_count')
    .in('slug', uniqueSlugs);

  if (analyticsError) throw analyticsError;
  const ids = (analyticsRows || []).map((row) => row.id);
  if (ids.length === 0) return [];

  const { data: views, error: viewsError } = await supabase
    .from('routine_views')
    .select('routine_analytics_id, time_spent_seconds, completed, items_checked, total_items, reshared_at, reshare_count')
    .in('routine_analytics_id', ids);

  if (viewsError) throw viewsError;

  return (analyticsRows || []).map((row) => {
    const rowViews = (views || []).filter((view) => view.routine_analytics_id === row.id);
    const totalViews = rowViews.length;
    const completedViews = rowViews.filter((view) => Boolean(view.completed)).length;
    const reshareCount = rowViews.reduce((sum, view) => sum + cleanInt(view.reshare_count) + (view.reshared_at ? 1 : 0), 0);
    const avgTimeSpent = totalViews > 0
      ? Math.round(rowViews.reduce((sum, view) => sum + cleanInt(view.time_spent_seconds), 0) / totalViews)
      : 0;
    const avgItemsChecked = totalViews > 0
      ? rowViews.reduce((sum, view) => sum + cleanInt(view.items_checked), 0) / totalViews
      : 0;

    return {
      slug: row.slug,
      routineName: row.routine_name,
      routineType: row.routine_type,
      exercisesCount: row.exercises_count,
      foodsCount: row.foods_count,
      totalViews,
      completedViews,
      completionRate: totalViews > 0 ? completedViews / totalViews : 0,
      reshareCount,
      avgItemsChecked,
      avgTimeSpent,
    };
  });
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

    if (!supabaseUrl || !serviceRoleKey) {
      return json({ error: 'Supabase server env is not configured' }, 500);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const body = await req.json() as Record<string, unknown>;
    const action = body.action as AnalyticsAction;

    if (action === 'stats') {
      const slugs = Array.isArray(body.slugs) ? body.slugs.filter((slug): slug is string => typeof slug === 'string') : [];
      return json({ stats: await getStats(supabase, slugs) });
    }

    const slug = cleanString(body.slug, '', 80);
    if (!slug) return json({ error: 'Missing slug' }, 400);

    const routine = (body.routine || {}) as RoutineSnapshot;
    const analyticsId = await ensureAnalytics(supabase, slug, routine);
    const sessionId = cleanString(
      body.sessionId,
      (await sha256Hex(`${slug}:${getClientIp(req)}:${req.headers.get('user-agent') || ''}:${new Date().toISOString().slice(0, 10)}`)).slice(0, 32),
      96,
    );
    const viewId = await upsertView(supabase, analyticsId, slug, sessionId, req, body);

    if (action === 'reshare') {
      const now = new Date().toISOString();
      const { data: current } = await supabase
        .from('routine_views')
        .select('reshare_count')
        .eq('id', viewId)
        .maybeSingle();

      const { error } = await supabase
        .from('routine_views')
        .update({
          reshared_at: now,
          reshare_count: cleanInt(current?.reshare_count) + 1,
        })
        .eq('id', viewId);

      if (error) throw error;
    }

    return json({ ok: true });
  } catch (error) {
    console.error('routine-analytics failed', error);
    return json({ error: error instanceof Error ? error.message : 'Unexpected error' }, 400);
  }
});
