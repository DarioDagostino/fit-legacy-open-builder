import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, CircleDot, RefreshCw } from 'lucide-react';
import { LegacitoUiIcon, UiIcon } from '../UiIcon';
import { loadLatestPlanDecision, type PlanDecisionRecord } from '@/lib/decisionLedger';

const LEDGER_STAGES = ['Evidencia', 'Propuesta', 'Aprobación'] as const;

function errorMessage(error: unknown): string {
  if (error instanceof Error && /not authenticated/i.test(error.message)) return 'Iniciá sesión para consultar Decision Ledger.';
  return 'No pudimos consultar Decision Ledger.';
}

function changeLabel(change: unknown, index: number): string {
  if (typeof change === 'string') return change;
  if (typeof change !== 'object' || !change) return `Cambio propuesto ${index + 1}`;
  const record = change as Record<string, unknown>;
  const label = record.label ?? record.summary ?? record.description ?? record.action;
  return typeof label === 'string' && label.trim() ? label : `Cambio propuesto ${index + 1}`;
}

export function PlanDecisionPanel() {
  const [decision, setDecision] = useState<PlanDecisionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setDecision(await loadLatestPlanDecision());
    } catch (loadError) {
      setError(errorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const changes = useMemo(
    () => (Array.isArray(decision?.proposed_changes) ? decision.proposed_changes.slice(0, 4) : []),
    [decision],
  );
  const confidence = decision?.confidence == null ? null : Math.round(decision.confidence * 100);

  return (
    <section className="relative overflow-hidden rounded-[22px] border border-[var(--builder-accent)]/20 bg-[#0D0D0F]" aria-label="Decision Ledger">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true" />
      <div className="relative grid grid-cols-[5px_minmax(0,1fr)]">
        <div className="bg-[linear-gradient(180deg,var(--builder-accent),rgba(224,121,60,0.12))]" aria-hidden="true" />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-2.5">
              <div className="shrink-0 pt-0.5">
                <LegacitoUiIcon size={22} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 font-['IBM_Plex_Mono',monospace] text-[7px] font-black uppercase tracking-[0.18em] text-[#6E6558]">
                  <span className="text-[var(--builder-accent-soft)]">Tu evidencia</span><ArrowRight size={9} /><span>Tu plan</span>
                </div>
                <h3 className="mt-1.5 font-['Big_Shoulders_Display',sans-serif] text-[22px] font-black uppercase leading-none text-[#F1F0F4]">Ajustes de mi plan</h3>
                <p className="mt-1.5 font-['IBM_Plex_Mono',monospace] text-[7px] uppercase tracking-[0.13em] text-[#6E6558]">IA Coach 1.1 · cambios bajo tu control</p>
              </div>
            </div>
            <button type="button" onClick={() => void load()} disabled={loading} className="builder-icon-button flex h-9 w-9 shrink-0 items-center justify-center" aria-label="Actualizar propuesta">
              <UiIcon name="change" size={16} active={loading} />
            </button>
          </div>

          {loading ? (
            <div className="mt-4 flex items-center gap-2 border-y border-white/[0.06] bg-white/[0.018] px-3 py-3 font-['IBM_Plex_Mono',monospace] text-[9px] text-[#9CA0A6]">
              <RefreshCw size={13} className="animate-spin text-[var(--builder-accent-soft)]" /> Consultando evidencia…
            </div>
          ) : error ? (
            <div className="mt-4 border-y border-amber-300/15 bg-amber-300/[0.04] px-3 py-3 text-[10px] leading-relaxed text-amber-100/70">
              {error}
            </div>
          ) : !decision ? (
            <div className="mt-4 border-y border-white/[0.065] bg-black/20">
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 px-3 py-3">
                <UiIcon name="validation-1" size={17} variant="duo" className="mt-0.5 shrink-0" />
                <div><p className="text-[11px] font-bold text-[#F1F0F4]">Sin ajustes pendientes</p><p className="mt-1 text-[9px] leading-relaxed text-[#6E6558]">IA Coach 1.1 propondrá un cambio cuando exista evidencia suficiente. Tu plan nunca cambia automáticamente.</p></div>
                <span className="inline-flex items-center gap-1 font-['IBM_Plex_Mono',monospace] text-[7px] font-black uppercase tracking-[0.12em] text-[#6E6558]"><UiIcon name="key" size={11} variant="duo" /> Solo lectura</span>
              </div>
              <div className="grid grid-cols-3 border-t border-white/[0.055]">
                {LEDGER_STAGES.map((stage, index) => (
                  <div key={stage} className={`flex items-center gap-2 px-3 py-2 ${index < LEDGER_STAGES.length - 1 ? 'border-r border-white/[0.055]' : ''}`}>
                    <span className="font-['IBM_Plex_Mono',monospace] text-[7px] font-black text-[var(--builder-accent-soft)]">0{index + 1}</span>
                    <span className="font-['IBM_Plex_Mono',monospace] text-[7px] uppercase tracking-[0.09em] text-[#6E6558]">{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] border-y border-white/[0.065] bg-black/20">
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <CircleDot size={13} className="text-[var(--builder-accent-soft)]" />
                  <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-black uppercase tracking-[0.12em] text-[#C7C3C0]">{decision.status}</span>
                </div>
                <span className="inline-flex items-center gap-1 border-l border-white/[0.06] px-3 font-['IBM_Plex_Mono',monospace] text-[7px] font-bold uppercase tracking-[0.1em] text-[#6E6558]"><UiIcon name="key" size={11} variant="duo" /> Solo lectura</span>
              </div>
              {confidence != null && (
                <div role="progressbar" aria-label="Confianza de la propuesta" aria-valuemin={0} aria-valuemax={100} aria-valuenow={confidence}>
                  <div className="flex items-center justify-between font-['IBM_Plex_Mono',monospace] text-[7px] font-black uppercase tracking-[0.12em] text-[#6E6558]"><span>Confianza de evidencia</span><strong className="text-[var(--builder-accent-soft)]">{confidence}%</strong></div>
                  <div className="mt-2 h-1 overflow-hidden bg-white/[0.06]"><div className="h-full bg-[linear-gradient(90deg,var(--builder-accent),var(--builder-accent-soft))]" style={{ width: `${confidence}%` }} /></div>
                </div>
              )}
              <p className="text-[11px] font-medium leading-relaxed text-[#C7C3C0]">{decision.rationale}</p>
              {changes.length > 0 && (
                <ul className="border-y border-white/[0.06]">
                  {changes.map((change, index) => {
                    const label = changeLabel(change, index);
                    return <li key={`${label}-${index}`} className="grid grid-cols-[24px_auto_minmax(0,1fr)] items-start gap-2 border-b border-white/[0.05] px-2 py-2.5 text-[10px] text-[#9CA0A6] last:border-b-0"><span className="font-['IBM_Plex_Mono',monospace] text-[7px] font-black text-[var(--builder-accent-soft)]">0{index + 1}</span><UiIcon name="validation-1" size={14} variant="duo" className="shrink-0" /><span>{label}</span></li>;
                  })}
                </ul>
              )}
              <div className="font-['IBM_Plex_Mono',monospace] text-[7px] uppercase tracking-[0.1em] text-[#6E6558]">La aplicación del cambio permanece bloqueada hasta que puedas revisar y aprobar el diff.</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
