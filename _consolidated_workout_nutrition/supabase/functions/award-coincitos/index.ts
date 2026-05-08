/**
 * Edge Function: award-coincitos
 *
 * Endpoint centralizado para que todas las app surfaces otorguen
 * COINCITO + XP al usuario autenticado.
 *
 * POST /functions/v1/award-coincitos
 * Body: { action: RewardKey, meta?: Record<string, unknown> }
 *
 * Flujo:
 *  1. Verifica JWT → obtiene user_id
 *  2. Valida action contra REWARDS
 *  3. Consulta streak actual del usuario
 *  4. Aplica streak multiplier
 *  5. Llama award_coincitos() + actualiza XP en user_gamification
 *  6. Detecta promoción de liga → otorga bonus LEAGUE_PROMOTION
 *  7. Retorna { coincitos, xp, balance, league, level, streakTier }
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

// ─── Inline constants (Deno isolation — cannot import from packages) ──────
const REWARDS: Record<string, { coincitos: number; xp: number }> = {
  WORKOUT_COMPLETE:       { coincitos: 50,   xp: 100 },
  ACADEMY_LESSON:         { coincitos: 30,   xp: 75  },
  LEGACY_PATH_NODE:       { coincitos: 20,   xp: 50  },
  LEGACY_PATH_MILESTONE:  { coincitos: 200,  xp: 500 },
  DAILY_STREAK_BONUS:     { coincitos: 10,   xp: 25  },
  FIRST_WORKOUT_DAY:      { coincitos: 100,  xp: 200 },
  LEAGUE_PROMOTION:       { coincitos: 500,  xp: 1000 },
  QUIZ_PERFECT_SCORE:     { coincitos: 50,   xp: 100 },
  DAILY_CHECKIN:          { coincitos: 5,    xp: 10  },
  REFERRAL_ACTIVE:        { coincitos: 200,  xp: 300 },
};

const STREAK_MULTIPLIERS = [
  { minDays: 365, multiplier: 2.5 },
  { minDays: 180, multiplier: 2.0 },
  { minDays: 90,  multiplier: 1.9 },
  { minDays: 60,  multiplier: 1.7 },
  { minDays: 30,  multiplier: 1.5 },
  { minDays: 14,  multiplier: 1.3 },
  { minDays: 7,   multiplier: 1.1 },
  { minDays: 0,   multiplier: 1.0 },
];

/** Ordered desc by minXp — look up from top */
const LEAGUE_THRESHOLDS = [
  { minXp: 250000, id: 'leyenda',       tier: 'leyenda' },
  { minXp: 200000, id: 'maestro_i',     tier: 'maestro' },
  { minXp: 165000, id: 'maestro_ii',    tier: 'maestro' },
  { minXp: 135000, id: 'maestro_iii',   tier: 'maestro' },
  { minXp: 110000, id: 'maestro_iv',    tier: 'maestro' },
  { minXp: 90000,  id: 'centurion_i',   tier: 'centurion' },
  { minXp: 75000,  id: 'centurion_ii',  tier: 'centurion' },
  { minXp: 62000,  id: 'centurion_iii', tier: 'centurion' },
  { minXp: 50000,  id: 'centurion_iv',  tier: 'centurion' },
  { minXp: 40000,  id: 'legionario_i',  tier: 'legionario' },
  { minXp: 33000,  id: 'legionario_ii', tier: 'legionario' },
  { minXp: 26000,  id: 'legionario_iii',tier: 'legionario' },
  { minXp: 20000,  id: 'legionario_iv', tier: 'legionario' },
  { minXp: 16000,  id: 'oro_i',         tier: 'oro' },
  { minXp: 13000,  id: 'oro_ii',        tier: 'oro' },
  { minXp: 10000,  id: 'oro_iii',       tier: 'oro' },
  { minXp: 8000,   id: 'oro_iv',        tier: 'oro' },
  { minXp: 6000,   id: 'plata_i',       tier: 'plata' },
  { minXp: 4500,   id: 'plata_ii',      tier: 'plata' },
  { minXp: 3500,   id: 'plata_iii',     tier: 'plata' },
  { minXp: 2500,   id: 'plata_iv',      tier: 'plata' },
  { minXp: 1700,   id: 'bronce_i',      tier: 'bronce' },
  { minXp: 1200,   id: 'bronce_ii',     tier: 'bronce' },
  { minXp: 800,    id: 'bronce_iii',    tier: 'bronce' },
  { minXp: 500,    id: 'bronce_iv',     tier: 'bronce' },
  { minXp: 0,      id: 'iniciado',      tier: 'iniciado' },
];

function getStreakMultiplier(streak: number): number {
  for (const t of STREAK_MULTIPLIERS) {
    if (streak >= t.minDays) return t.multiplier;
  }
  return 1.0;
}

function getLeagueId(xp: number): string {
  for (const l of LEAGUE_THRESHOLDS) {
    if (xp >= l.minXp) return l.id;
  }
  return 'iniciado';
}

function getLevelForXp(xp: number): number {
  let lvl = 1;
  for (let n = 1; n <= 100; n++) {
    if (xp >= Math.round(100 * Math.pow(n, 1.5))) lvl = n;
    else break;
  }
  return lvl;
}

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const supabaseUser = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Parse body
    const body = await req.json();
    const action: string = body.action;
    const meta: Record<string, unknown> = body.meta ?? {};
    const surface: string = body.surface ?? 'unknown';

    if (!action || !REWARDS[action]) {
      return new Response(JSON.stringify({ error: `Invalid action: ${action}` }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3. Get current streak
    const { data: streakRow } = await supabaseAdmin
      .from('streaks')
      .select('current_streak')
      .eq('user_id', user.id)
      .single();

    const currentStreak = streakRow?.current_streak ?? 0;
    const multiplier = getStreakMultiplier(currentStreak);

    // 4. Safety Net (Diminishing Returns for farming)
    // If the user completes more than 10 nodes in a single day, the reward is reduced by 50%
    let safetyNetMultiplier = 1.0;
    if (action === 'LEGACY_PATH_NODE') {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const { count, error: countError } = await supabaseAdmin
        .from('economy_transactions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('type', 'earn')
        .eq('source', 'LEGACY_PATH_NODE')
        .gte('created_at', today.toISOString());

      if (countError) {
        console.error('Safety Net check error:', countError);
      } else if ((count ?? 0) >= 10) {
        safetyNetMultiplier = 0.5;
        console.log(`Safety Net active for user ${user.id}: ${count} nodes completed today. Applying 0.5x multiplier.`);
      }
    }

    // 5. Calculate reward
    const base = REWARDS[action];
    const coincitosEarned = Math.floor(base.coincitos * multiplier * safetyNetMultiplier);
    const xpEarned = Math.floor(base.xp * multiplier * safetyNetMultiplier);

    // 6. Award COINCITO via SQL function
    const { data: balanceData, error: awardError } = await supabaseAdmin.rpc('award_coincitos', {
      p_user_id: user.id,
      p_amount: coincitosEarned,
      p_source: action,
      p_description: `${action} (Streak: x${multiplier}${safetyNetMultiplier < 1 ? `, SafetyNet: x${safetyNetMultiplier}` : ''})`,
      p_meta: { 
        ...meta, 
        surface, 
        streak: currentStreak, 
        multiplier, 
        safetyNetMultiplier,
        nodesToday: action === 'LEGACY_PATH_NODE' ? 'Check ledger' : undefined
      },
    });

    if (awardError) {
      console.error('award_coincitos error:', awardError);
      return new Response(JSON.stringify({ error: 'Failed to award coincitos' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 6. Update XP in user_gamification
    const { data: prevGamif } = await supabaseAdmin
      .from('user_gamification')
      .select('total_xp, league_id')
      .eq('user_id', user.id)
      .single();

    const prevXp = prevGamif?.total_xp ?? 0;
    const prevLeagueId = prevGamif?.league_id ?? 'iniciado';
    const newXp = prevXp + xpEarned;
    const newLevel = getLevelForXp(newXp);
    const newLeagueId = getLeagueId(newXp);

    await supabaseAdmin
      .from('user_gamification')
      .upsert({
        user_id: user.id,
        total_xp: newXp,
        level: newLevel,
        league_id: newLeagueId,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    // 7. League promotion bonus
    let promotionBonus = 0;
    if (newLeagueId !== prevLeagueId && newXp > prevXp) {
      const promoReward = REWARDS['LEAGUE_PROMOTION'];
      promotionBonus = promoReward.coincitos;
      await supabaseAdmin.rpc('award_coincitos', {
        p_user_id: user.id,
        p_amount: promoReward.coincitos,
        p_source: 'LEAGUE_PROMOTION',
        p_description: `Promoted to ${newLeagueId}`,
        p_meta: { from: prevLeagueId, to: newLeagueId },
      });
    }

    // 8. Response
    return new Response(JSON.stringify({
      awarded: {
        coincitos: coincitosEarned + promotionBonus,
        xp: xpEarned,
        action,
        multiplier,
      },
      balance: {
        coincitos: (balanceData?.coincitos ?? 0) + promotionBonus,
        lgcy: balanceData?.lgcy ?? 0,
      },
      gamification: {
        totalXp: newXp,
        level: newLevel,
        leagueId: newLeagueId,
        promoted: newLeagueId !== prevLeagueId && newXp > prevXp,
        promotedFrom: prevLeagueId,
      },
      streak: {
        current: currentStreak,
        multiplier,
      },
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('award-coincitos error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
