// Legacy dashboard subcomponents remain available for future visual variants.
// @ts-nocheck
import { useState, useEffect, useId } from "react";

const DEFAULT_DATA = {
  streak: 0,
  days: 0,
  exercises: 0,
  meals: 0,
  views: 0,
  done: 0,
  reShare: 0,
  actions: 0,
  pendingActions: 0,
  completedActions: 0,
  activeMonth: { active: 0, total: 31 },
  training: { value: 0, percent: 0, description: "Ejercicios incluidos en tus rutinas." },
  nutrition: { value: 0, percent: 0, description: "Comidas incluidas en tus planes." },
  viewsDetail: { value: 0, percent: 0, description: "Aperturas registradas de tus enlaces." },
  completed: { percent: 0, sessions: 0, description: "sesiones completadas." },
  liveMix: { shares: 0, workout: 0, meals: 0, mixed: 0 },
  output: { percent: 0, signal: "Todavía no hay acciones este mes." },
};

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function mergeData(overrides) {
  const d = overrides || {};
  return {
    ...DEFAULT_DATA,
    ...d,
    activeMonth: { ...DEFAULT_DATA.activeMonth, ...d.activeMonth },
    training: { ...DEFAULT_DATA.training, ...d.training },
    nutrition: { ...DEFAULT_DATA.nutrition, ...d.nutrition },
    viewsDetail: { ...DEFAULT_DATA.viewsDetail, ...d.viewsDetail },
    completed: { ...DEFAULT_DATA.completed, ...d.completed },
    liveMix: { ...DEFAULT_DATA.liveMix, ...d.liveMix },
    output: { ...DEFAULT_DATA.output, ...d.output },
  };
}

export default function CalendarAnalyticsDashboard({ data, month, className = "" }) {
  const d = mergeData(data);
  const monthLabel =
    month || capitalize(new Date().toLocaleDateString("es-AR", { month: "long" }));
  const activePct = (d.activeMonth.active / Math.max(1, d.activeMonth.total)) * 100;

  return (
    <div className={`cal-root ${className}`}>
      <style>{`
        .cal-root {
          --blt-obsidian: #0c0c0e;
          --blt-obsidian-soft: #18181c;
          --blt-bone: #F1F0F4;
          --blt-ink: #0a0a0c;
          --blt-ember: #E0793C;
          --blt-ember-2: #F2A468;
          --blt-molten: #8A2F14;
          --blt-stone: #9CA0A6;
          --blt-stone-dim: #6E6558;

          background: var(--blt-obsidian);
          font-family: 'Inter', sans-serif;
          padding: 24px 20px 32px;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          /* Keep the dashboard at its natural height inside CalendarPanel's
             flex column so the second metrics row cannot be clipped. */
          flex: 0 0 auto;
          min-height: max-content;
        }
        .cal-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(55% 35% at 10% 0%, rgba(224,121,60,0.10), transparent 60%),
            radial-gradient(45% 30% at 100% 100%, rgba(138,47,20,0.14), transparent 60%);
          pointer-events: none;
        }
        .cal-root * { box-sizing: border-box; }

        .cal-header {
          position: relative;
          margin-bottom: 22px;
          animation: cal-rise 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .cal-title {
          font-family: 'Big Shoulders Display', sans-serif;
          font-weight: 800;
          font-style: italic;
          font-size: clamp(26px, 4vw, 34px);
          text-transform: uppercase;
          color: var(--blt-bone);
          margin: 0;
          letter-spacing: 0.01em;
        }
        .cal-subtitle {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--blt-stone);
          margin: 5px 0 0;
        }

        .cal-grid {
          position: relative;
          display: grid;
          gap: 10px;
          margin-bottom: 10px;
        }
        .cal-grid--4 { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
        .cal-grid--3 { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); margin-bottom: 24px; }

        .cal-summary-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }
        .cal-summary-card {
          min-width: 0;
          min-height: 122px;
          background: var(--blt-bone);
          border-radius: 18px;
          padding: 14px 13px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
          opacity: 0;
          animation: cal-rise 0.5s cubic-bezier(0.22,1,0.36,1) both;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cal-summary-card:hover { transform: translateY(-2px); box-shadow: 0 10px 22px -12px rgba(0,0,0,0.4); }
        .cal-summary-card--accent { background: linear-gradient(145deg, #fff7f1, var(--blt-bone)); }
        .cal-summary-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--blt-stone-dim);
        }
        .cal-summary-value {
          font-family: 'Big Shoulders Display', sans-serif;
          font-size: clamp(24px, 3.2vw, 34px);
          font-weight: 800;
          line-height: 0.9;
          color: var(--blt-ink);
        }
        .cal-summary-card--accent .cal-summary-value { color: var(--blt-molten); }
        .cal-summary-detail { margin: 0; color: var(--blt-stone-dim); font-size: 10.5px; line-height: 1.25; }

        @media (max-width: 640px) {
          .cal-summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        .cal-tile {
          background: var(--blt-bone);
          border-radius: 18px;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
          opacity: 0;
          animation: cal-rise 0.5s cubic-bezier(0.22,1,0.36,1) both;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .cal-tile:hover { transform: translateY(-2px); box-shadow: 0 10px 22px -12px rgba(0,0,0,0.4); }
        .cal-tile-icon { color: var(--blt-stone-dim); }
        .cal-tile--accent .cal-tile-icon { color: var(--blt-ember); }
        .cal-tile-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--blt-stone-dim);
        }
        .cal-tile-value {
          font-family: 'Big Shoulders Display', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: var(--blt-ink);
        }
        .cal-tile--accent .cal-tile-value { color: var(--blt-molten); }

        .cal-section { margin-bottom: 26px; }
        .cal-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          animation: cal-rise 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .cal-section-title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--blt-ember-2);
        }

        .cal-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          background: var(--blt-obsidian-soft);
          border: 1px solid rgba(245,235,255,0.08);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--blt-stone);
        }
        .cal-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--blt-ember);
          box-shadow: 0 0 0 0 rgba(224,121,60,0.6);
          animation: cal-pulse-dot 1.8s ease-in-out infinite;
        }

        .cal-card {
          background: var(--blt-bone);
          border-radius: 20px;
          padding: 18px 20px;
          opacity: 0;
          animation: cal-rise 0.5s cubic-bezier(0.22,1,0.36,1) both;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .cal-card:hover { transform: translateY(-2px); box-shadow: 0 12px 26px -14px rgba(0,0,0,0.4); }
        .cal-card--wide {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 12px;
        }
        .cal-card-text { min-width: 0; }
        .cal-card-title {
          display: block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--blt-stone-dim);
          margin-bottom: 3px;
        }
        .cal-card-desc {
          margin: 0;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--blt-ink);
          line-height: 1.35;
        }

        .cal-pair {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 12px;
          margin-bottom: 12px;
        }
        .cal-metric {
          background: var(--blt-bone);
          border-radius: 20px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          opacity: 0;
          animation: cal-rise 0.5s cubic-bezier(0.22,1,0.36,1) both;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .cal-metric:hover { transform: translateY(-2px); box-shadow: 0 10px 22px -12px rgba(0,0,0,0.4); }
        .cal-metric-title {
          display: block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--blt-stone-dim);
          margin-bottom: 2px;
        }
        .cal-metric-desc { margin: 0; font-size: 12.5px; color: var(--blt-ink); line-height: 1.3; }

        .cal-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cal-ring svg { position: absolute; inset: 0; }
        .cal-ring-inner { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; line-height: 1; }
        .cal-ring-value {
          font-family: 'Big Shoulders Display', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: var(--blt-ink);
        }
        .cal-ring-unit {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          color: var(--blt-stone-dim);
          margin-top: 2px;
        }

        .cal-livemix { align-items: flex-start; flex-wrap: wrap; }
        .cal-livemix-total { display: flex; flex-direction: column; align-items: center; }
        .cal-livemix-rows { flex: 1; min-width: 220px; display: flex; flex-direction: column; gap: 12px; }
        .cal-mixrow-top { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
        .cal-mixrow-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--blt-stone-dim);
          flex: 1;
        }
        .cal-mixrow-value { font-family: 'Big Shoulders Display', sans-serif; font-weight: 700; font-size: 14px; color: var(--blt-ink); }
        .cal-mixrow-track { height: 4px; border-radius: 4px; background: rgba(10,10,12,0.08); overflow: hidden; }
        .cal-mixrow-fill { height: 100%; border-radius: 4px; transition: width 0.8s cubic-bezier(0.22,1,0.36,1); }
        .cal-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cal-dot--ember, .cal-mixrow-fill--ember { background: var(--blt-ember); }
        .cal-dot--molten, .cal-mixrow-fill--molten { background: var(--blt-molten); }
        .cal-dot--stone, .cal-mixrow-fill--stone { background: var(--blt-stone); }

        .cal-output { margin-bottom: 0; }

        @keyframes cal-rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cal-pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(224,121,60,0.55); }
          50% { box-shadow: 0 0 0 5px rgba(224,121,60,0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cal-root *, .cal-root *::before { animation: none !important; transition: none !important; }
        }
      `}</style>

      <header className="cal-header">
        <h1 className="cal-title">Calendar</h1>
        <p className="cal-subtitle">Planificá rutinas, recordatorios y comidas</p>
      </header>

      <section className="cal-summary-grid" aria-label="Resumen del calendario">
        <SummaryCard
          label="Días activos"
          value={`${d.activeMonth.active}/${d.activeMonth.total}`}
          detail={`${Math.round(activePct)}% de ${monthLabel} · racha ${d.streak}`}
          accent
          delay="0.04s"
        />
        <SummaryCard
          label="Acciones"
          value={d.actions}
          detail={`${d.pendingActions} pendientes · ${d.completedActions} completadas`}
          delay="0.08s"
        />
        <SummaryCard
          label="Entrenamiento"
          value={d.exercises}
          detail={`${d.liveMix.workout} rutinas planificadas`}
          delay="0.12s"
        />
        <SummaryCard
          label="Nutrición"
          value={d.meals}
          detail={`${d.liveMix.meals} planes de comidas`}
          delay="0.16s"
        />
      </section>
    </div>
  );
}

function SummaryCard({ label, value, detail, accent = false, delay }) {
  return (
    <div className={`cal-summary-card ${accent ? 'cal-summary-card--accent' : ''}`} style={{ animationDelay: delay }}>
      <span className="cal-summary-label">{label}</span>
      <span className="cal-summary-value">{value}</span>
      <p className="cal-summary-detail">{detail}</p>
    </div>
  );
}

function StatTile({ label, value, accent, delay }) {
  return (
    <div className={`cal-tile ${accent ? "cal-tile--accent" : ""}`} style={{ animationDelay: delay }}>
      <span className="cal-tile-label">{label}</span>
      <span className="cal-tile-value">{value}</span>
    </div>
  );
}

function MetricCard({ ring, title, description }) {
  return (
    <div className="cal-metric">
      <ProgressRing size={64} strokeWidth={6} {...ring} />
      <div className="cal-metric-text">
        <span className="cal-metric-title">{title}</span>
        <p className="cal-metric-desc">{description}</p>
      </div>
    </div>
  );
}

function MixRow({ tone, label, value, max }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="cal-mixrow">
      <div className="cal-mixrow-top">
        <span className={`cal-dot cal-dot--${tone}`} />
        <span className="cal-mixrow-label">{label}</span>
        <span className="cal-mixrow-value">{value}</span>
      </div>
      <div className="cal-mixrow-track">
        <div className={`cal-mixrow-fill cal-mixrow-fill--${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function LivePill({ children }) {
  return (
    <span className="cal-pill">
      <span className="cal-pill-dot" />
      {children}
    </span>
  );
}

function ProgressRing({ percent = 0, size = 84, strokeWidth = 8, value, unit }) {
  const [mounted, setMounted] = useState(false);
  const gradId = useId();

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, percent || 0));
  const offset = circumference - (mounted ? clamped / 100 : 0) * circumference;

  return (
    <div className="cal-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--blt-ember-2)" />
            <stop offset="100%" stopColor="var(--blt-molten)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(10,10,12,0.08)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="cal-ring-inner">
        <span className="cal-ring-value">{value}</span>
        {unit && <span className="cal-ring-unit">{unit}</span>}
      </div>
    </div>
  );
}
