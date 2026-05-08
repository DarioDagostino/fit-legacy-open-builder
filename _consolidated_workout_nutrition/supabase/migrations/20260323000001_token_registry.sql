-- =============================================================================
-- Migration: Token Registry + Economy Schema
-- Date: 2026-03-23
-- Description:
--   Registra formalmente los dos activos del ecosistema Fit Legacy como
--   entidades de primera clase en la base de datos:
--     • fitlegacy-coincito-v1  (COINCITO  — soft currency)
--     • fitlegacy-lgcy-v1      ($LGCY     — hard currency)
--
--   Crea / asegura las tablas:
--     1. token_registry        — Definición inmutable de cada activo
--     2. economy_balances      — Saldos por usuario (COINCITO + LGCY)
--     3. economy_transactions  — Historial auditado de movimientos
--   Y funciones auxiliares:
--     • ensure_user_balance()  — Lazily crea fila de saldo al primer uso
--     • record_transaction()   — Inserta transacción + actualiza saldo atomicamente
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. TOKEN REGISTRY
--    Fuente de verdad relacional de los activos. Solo INSERT inicial; no se
--    actualiza en producción salvo migración explícita (inmutable por diseño).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.token_registry (
  id              TEXT PRIMARY KEY,                        -- 'fitlegacy-coincito-v1'
  symbol          TEXT NOT NULL UNIQUE,                    -- 'COINCITO' | '$LGCY'
  name            TEXT NOT NULL,
  decimals        SMALLINT NOT NULL DEFAULT 0,
  max_supply      NUMERIC(30, 6),                          -- NULL = ilimitado
  category        TEXT NOT NULL CHECK (category IN ('soft_currency', 'hard_currency')),
  is_earnable     BOOLEAN NOT NULL DEFAULT false,
  is_spendable    BOOLEAN NOT NULL DEFAULT false,
  icon            TEXT NOT NULL DEFAULT '🪙',
  color           TEXT NOT NULL DEFAULT '#D4AF37',
  description     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Solo lectura pública; escritura solo por service_role (vía migración)
ALTER TABLE public.token_registry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read token registry"
  ON public.token_registry FOR SELECT
  USING (true);

-- Seed: definición canónica de ambos activos
INSERT INTO public.token_registry
  (id, symbol, name, decimals, max_supply, category, is_earnable, is_spendable, icon, color, description)
VALUES
  (
    'fitlegacy-coincito-v1',
    'COINCITO',
    'Coincito',
    0,
    NULL,
    'soft_currency',
    true,
    true,
    '🪙',
    '#D4AF37',
    'Moneda blanda del ecosistema Fit Legacy. Se gana completando entrenamientos, lecciones de la Academia y hitos del Camino del Legado.'
  ),
  (
    'fitlegacy-lgcy-v1',
    '$LGCY',
    'Legacy Token',
    6,
    21000000.000000,
    'hard_currency',
    false,
    true,
    '💎',
    '#B8860B',
    'Activo fuerte del ecosistema Fit Legacy. Se obtiene transmutando Coincitos o adquiriendo un plan PRO. Oferta máxima: 21 millones.'
  )
ON CONFLICT (id) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 2. ECONOMY BALANCES
--    Una fila por usuario. Columnas en sintaxis nativa para operar con
--    funciones de agregación y locks de fila en transmutaciones.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.economy_balances (
  user_id              UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  coincitos            NUMERIC(20, 0)  NOT NULL DEFAULT 0,   -- Entero (decimals=0)
  lgcy                 NUMERIC(30, 6)  NOT NULL DEFAULT 0,   -- 6 decimales
  lifetime_earned_coincitos NUMERIC(20, 0) NOT NULL DEFAULT 0,
  lifetime_spent_coincitos  NUMERIC(20, 0) NOT NULL DEFAULT 0,
  lifetime_earned_lgcy      NUMERIC(30, 6) NOT NULL DEFAULT 0,
  lifetime_spent_lgcy       NUMERIC(30, 6) NOT NULL DEFAULT 0,
  last_transmute_at    TIMESTAMPTZ,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS economy_balances_user_idx ON public.economy_balances (user_id);

ALTER TABLE public.economy_balances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own balance"
  ON public.economy_balances FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role manages all balances"
  ON public.economy_balances FOR ALL
  USING (true)
  WITH CHECK (true);


-- ---------------------------------------------------------------------------
-- 3. ECONOMY TRANSACTIONS
--    Ledger auditado e inmutable. Cada movimiento de cualquier token queda
--    registrado con el token_id de referencia hacia token_registry.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.economy_transactions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  token_id     TEXT NOT NULL REFERENCES public.token_registry(id),  -- FK al activo
  type         TEXT NOT NULL CHECK (type IN (
                 'earn',         -- ganar (entrenamiento, lección, logro)
                 'spend',        -- gastar (tienda, funciones premium)
                 'transmute_in', -- Coincitos que salen en transmutación
                 'transmute_out',-- LGCY que entran en transmutación
                 'purchase',     -- compra externa (MercadoPago / Stripe)
                 'bonus',        -- bonos administrativos
                 'refund'        -- reembolso
               )),
  amount       NUMERIC(30, 6) NOT NULL CHECK (amount > 0),
  source       TEXT,            -- 'workout_complete' | 'academy_lesson' | 'edge_function_bridge' | …
  description  TEXT,
  meta         JSONB DEFAULT '{}'::jsonb,  -- datos extra (node_id, lesson_id, plan_id, …)
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS economy_tx_user_idx     ON public.economy_transactions (user_id);
CREATE INDEX IF NOT EXISTS economy_tx_token_idx    ON public.economy_transactions (token_id);
CREATE INDEX IF NOT EXISTS economy_tx_type_idx     ON public.economy_transactions (type);
CREATE INDEX IF NOT EXISTS economy_tx_created_idx  ON public.economy_transactions (created_at DESC);

ALTER TABLE public.economy_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
  ON public.economy_transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role inserts transactions"
  ON public.economy_transactions FOR INSERT
  USING (true)
  WITH CHECK (true);


-- ---------------------------------------------------------------------------
-- 4. FUNCIÓN: ensure_user_balance
--    Crea la fila de saldo si no existe (idempotente). Llamar antes de
--    cualquier operación de crédito/débito.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.ensure_user_balance(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.economy_balances (user_id)
  VALUES (p_user_id)
  ON CONFLICT (user_id) DO NOTHING;
END;
$$;


-- ---------------------------------------------------------------------------
-- 5. FUNCIÓN: award_coincitos
--    Acredita Coincitos al usuario de forma atómica y registra la
--    transacción. Diseñada para ser llamada desde Edge Functions o triggers.
--
--    Parámetros:
--      p_user_id    — UUID del usuario
--      p_amount     — Cantidad de Coincitos a acreditar (entero positivo)
--      p_source     — Origen ('workout_complete', 'academy_lesson', etc.)
--      p_description— Texto humano para el historial
--      p_meta       — JSON extra opcional (node_id, lesson_id, …)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.award_coincitos(
  p_user_id     UUID,
  p_amount      INT,
  p_source      TEXT DEFAULT 'system',
  p_description TEXT DEFAULT NULL,
  p_meta        JSONB DEFAULT '{}'::jsonb
)
RETURNS public.economy_balances
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_balance public.economy_balances;
BEGIN
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'p_amount must be a positive integer, got %', p_amount;
  END IF;
  DECLARE
    v_coincito_token_id TEXT;

  -- Garantizar fila de saldo
  PERFORM public.ensure_user_balance(p_user_id);


    SELECT id
      INTO v_coincito_token_id
    FROM public.token_registry
    WHERE symbol = 'COINCITO'
    LIMIT 1;

    IF v_coincito_token_id IS NULL THEN
      RAISE EXCEPTION 'award_coincitos: COINCITO token is not registered in token_registry';
    END IF;
  -- Actualizar saldo y acumulados
  UPDATE public.economy_balances
  SET
    coincitos                  = coincitos + p_amount,
    lifetime_earned_coincitos  = lifetime_earned_coincitos + p_amount,
    updated_at                 = now()
  WHERE user_id = p_user_id
  RETURNING * INTO v_balance;

  -- Registrar transacción en el ledger
  INSERT INTO public.economy_transactions
    (user_id, token_id, type, amount, source, description, meta)
  VALUES
    (p_user_id, 'fitlegacy-coincito-v1', 'earn', p_amount, p_source, p_description, p_meta);
    INSERT INTO public.economy_transactions
      (user_id, token_id, type, amount, source, description, meta)
    VALUES
      (p_user_id, v_coincito_token_id, 'earn', p_amount, p_source, p_description, p_meta);


-- ---------------------------------------------------------------------------
-- 6. VISTA: token_supply_stats
--    Consulta rápida del estado macroeconómico del ecosistema.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.token_supply_stats AS
SELECT
  tr.symbol,
  tr.name,
  tr.max_supply,
  tr.category,
  COALESCE(SUM(
    CASE tr.symbol
      WHEN 'COINCITO' THEN eb.coincitos
      WHEN '$LGCY'    THEN eb.lgcy
    END
  ), 0) AS circulating_supply,
  CASE
    WHEN tr.max_supply IS NULL THEN NULL
    ELSE ROUND(
      COALESCE(SUM(
        CASE tr.symbol
          WHEN 'COINCITO' THEN eb.coincitos
          WHEN '$LGCY'    THEN eb.lgcy
        END
      ), 0) / tr.max_supply * 100, 4
    )
  END AS circulation_pct
FROM public.token_registry tr
LEFT JOIN public.economy_balances eb ON true
GROUP BY tr.id, tr.symbol, tr.name, tr.max_supply, tr.category;

-- Lectura pública de stats (no expone datos de usuarios)
GRANT SELECT ON public.token_supply_stats TO anon, authenticated;
