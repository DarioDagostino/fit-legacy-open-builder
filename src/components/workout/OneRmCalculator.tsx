import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Share2, Plus, Minus, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { updateBuilderBestLift } from '../builderToolLedger';
import { PinkCandleTrend } from './PinkCandleTrend';
import { UiIcon } from '../UiIcon';

export type OneRmCalculatorProps = {
  onUpdateBestLift?: (bestLift: {
    exerciseName: string;
    estimated1RmKg: number;
    weightKg: number;
    reps: number;
    date: string;
  }) => void;
};

type FormulaKey = 'epley' | 'brzycki' | 'lander' | 'lombardi';
type SubScreen = 'calc' | 'compare' | 'loads';

const FORMULAS = [
  { key: 'epley' as const, label: 'Epley', formulaStr: 'W × (1 + r/30)', description: 'Equilibrada para uso general' },
  { key: 'brzycki' as const, label: 'Brzycki', formulaStr: 'W / (1.0278 - 0.0278×r)', description: 'Más estable con pocas reps' },
  { key: 'lander' as const, label: 'Lander', formulaStr: '100W / (101.3 - 2.67×r)', description: 'Orientada a fuerza máxima' },
  { key: 'lombardi' as const, label: 'Lombardi', formulaStr: 'W × r^0.1', description: 'Útil con series largas' },
];

const LOADS = [
  { pct: 95, focus: 'Pico de fuerza', reps: '1–2 reps' },
  { pct: 90, focus: 'Fuerza máxima', reps: '2–3 reps' },
  { pct: 85, focus: 'Fuerza + masa', reps: '3–5 reps' },
  { pct: 80, focus: 'Hipertrofia pesada', reps: '5–7 reps' },
  { pct: 75, focus: 'Hipertrofia', reps: '8–10 reps' },
  { pct: 70, focus: 'Volumen de calidad', reps: '10–12 reps' },
] as const;

function calculateOneRm(weight: number, reps: number, formula: FormulaKey) {
  if (weight <= 0 || reps <= 0) return 0;
  if (reps === 1) return weight;
  if (formula === 'epley') return weight * (1 + reps / 30);
  if (formula === 'brzycki') return weight / (1.0278 - 0.0278 * reps);
  if (formula === 'lander') return weight * (100 / (101.3 - 2.67123 * reps));
  return weight * Math.pow(reps, 0.1);
}

function roundToPlate(value: number) {
  return Math.round(value / 2.5) * 2.5;
}

/* ─── CountUp Component from Analytics App ─── */
function CountUp({
  value,
  decimals = 0,
  refreshKey = 0,
}: {
  value: number;
  decimals?: number;
  refreshKey?: number;
}) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplayValue(value);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 500;
    const startVal = displayValue;
    const diff = value - startVal;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startVal + diff * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, refreshKey]);

  return <>{displayValue.toLocaleString('es-AR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>;
}

export function OneRmCalculator({ onUpdateBestLift }: OneRmCalculatorProps) {
  const [weight, setWeight] = useState(85);
  const [reps, setReps] = useState(5);
  const [formula, setFormula] = useState<FormulaKey>('lander');
  const [expandedFormula, setExpandedFormula] = useState<FormulaKey>('lander');
  const [activeScreen, setActiveScreen] = useState<SubScreen>('calc');
  const [feedback, setFeedback] = useState<'saved' | 'copied' | null>(null);
  const [loadView, setLoadView] = useState<'loads' | 'warmup'>('loads');
  const [isHeroChartExpanded, setIsHeroChartExpanded] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setRefreshKey((k) => k + 1);
  }, [activeScreen]);

  const oneRm = useMemo(() => calculateOneRm(weight, reps, formula), [formula, reps, weight]);
  const percentOfEstimated = oneRm > 0 ? Math.min(100, (weight / oneRm) * 100) : 0;

  const warmupSets = useMemo(
    () => [40, 55, 70, 82].map((pct, index) => ({
      pct,
      reps: [8, 5, 3, 1][index],
      weight: roundToPlate(oneRm * (pct / 100)),
    })),
    [oneRm],
  );

  const formulaValues = useMemo(
    () => FORMULAS.map((item) => ({
      ...item,
      value: calculateOneRm(weight, reps, item.key),
      diff: calculateOneRm(weight, reps, item.key) - oneRm,
    })),
    [oneRm, reps, weight],
  );

  const showFeedback = (value: 'saved' | 'copied') => {
    setFeedback(value);
    window.setTimeout(() => setFeedback(null), 1800);
  };

  const saveBestLift = () => {
    const payload = {
      exerciseName: 'Press banca',
      estimated1RmKg: Number(oneRm.toFixed(1)),
      weightKg: weight,
      reps,
      date: new Date().toISOString().slice(0, 10),
    };
    if (onUpdateBestLift) {
      onUpdateBestLift(payload);
    } else {
      updateBuilderBestLift(payload);
    }
    showFeedback('saved');
  };

  const sharePlan = async () => {
    const text = `⚡ Fit Legacy · 1RM Vanguard\n🏋️ ${weight} kg × ${reps} reps = ${oneRm.toFixed(1)} kg (${formula.toUpperCase()})\n\n🎯 Cargas:\n• 90%: ${roundToPlate(oneRm * 0.9)} kg\n• 80%: ${roundToPlate(oneRm * 0.8)} kg\n• 70%: ${roundToPlate(oneRm * 0.7)} kg`;
    try {
      if (navigator.share) await navigator.share({ title: 'Mi 1RM', text });
      else await navigator.clipboard.writeText(text);
      showFeedback('copied');
    } catch {
      // Ignorar cancelación
    }
  };

  const maxFormulaVal = Math.max(...formulaValues.map((f) => f.value), 1);

  return (
    <section className="vanguard-tool vanguard-tool--phone" aria-labelledby="one-rm-title">
      <div className="one-rm-phone" aria-label="Mock smartphone 1RM">
        <div className="one-rm-phone__bezel !bg-[#000000] !border-[#141416]">
          <div className="one-rm-phone__speaker" aria-hidden="true" />
          <div className="one-rm-phone__screen relative overflow-hidden !bg-[#000000]">
            
            {/* Scrollable Phone Viewport in Pure Black */}
            <div
              className="one-rm-phone-page absolute inset-0 flex flex-col gap-3 p-3.5 pb-24 overflow-y-auto overscroll-contain !bg-[#000000]"
              style={{ scrollbarWidth: 'thin' }}
            >

              {/* Segmented Screen Switcher Pill Bar */}
              <div className="flex items-center p-1 rounded-2xl bg-[#0d0d10] border border-white/[0.08] shrink-0 relative shadow-inner">
                {([
                  { key: 'calc' as SubScreen, iconName: 'one-rm' as const, label: '1RM' },
                  { key: 'compare' as SubScreen, iconName: 'datos' as const, label: 'Métodos' },
                  { key: 'loads' as SubScreen, iconName: 'rocket-launch-chart' as const, label: 'Arsenal' },
                ] as const).map(({ key, iconName, label }) => {
                  const isActive = activeScreen === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveScreen(key)}
                      className={`flex-1 py-1.5 rounded-xl font-mono text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 relative z-10 ${
                        isActive
                          ? 'text-black font-black'
                          : 'text-[#6E6558] hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-tab-indicator"
                          className="absolute inset-0 bg-[var(--builder-accent,#00d2ee)] rounded-xl shadow-[0_0_12px_rgba(0,210,238,0.35)] -z-10"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <UiIcon name={iconName} size={13} active={isActive} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* ═══════════════════════════════════════════
                  SCREEN 1 — 1RM CALCULADORA (Exact Screenshot Match)
                  ═══════════════════════════════════════════ */}
              {activeScreen === 'calc' && (
                <div className="flex flex-col gap-3">
                  
                  {/* Card 1: 1RM ESTIMADO */}
                  <div className="rounded-[1.75rem] bg-[#08080a] border border-white/[0.08] p-5 space-y-3 relative overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
                    <div
                      className="flex items-center justify-between cursor-pointer select-none"
                      onClick={() => setIsHeroChartExpanded((prev) => !prev)}
                    >
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                        1RM ESTIMADO
                      </span>
                      <motion.div animate={{ rotate: isHeroChartExpanded ? 0 : -90 }} transition={{ duration: 0.2 }}>
                        {isHeroChartExpanded ? <ChevronDown size={16} className="text-white/70" /> : <ChevronRight size={16} className="text-[#6E6558]" />}
                      </motion.div>
                    </div>

                    <div>
                      <h3 className="font-['Big_Shoulders_Display',sans-serif] text-[48px] font-black text-white tracking-tight leading-none">
                        <CountUp value={oneRm} decimals={1} refreshKey={refreshKey} /> <span className="text-2xl font-black text-white uppercase">kg</span>
                      </h3>
                      <p className="font-mono text-[11px] text-[#9CA0A6] mt-1.5">
                        <CountUp value={weight} decimals={0} /> kg × <CountUp value={reps} decimals={0} /> reps · <CountUp value={percentOfEstimated} decimals={0} />% carga
                      </p>
                    </div>

                    {/* Continuous Spectral Waveform Chart with Circle Ring Beacon */}
                    <AnimatePresence>
                      {isHeroChartExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden pt-1"
                        >
                          <PinkCandleTrend
                            kind="result"
                            variant={Math.round(oneRm)}
                            weight={weight}
                            reps={reps}
                            label="Señal de fuerza estimada"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Explanatory Copy */}
                    <p className="text-[12px] text-[#c4c3c7] leading-relaxed pt-1">
                      Tu fuerza está construyendo una base sólida. Levantamiento equivale al <strong className="text-white font-bold">{Math.round(percentOfEstimated)}%</strong> de tu 1RM ({formula.toUpperCase()}).
                    </p>
                  </div>

                  {/* Card 2: TU LEVANTAMIENTO */}
                  <div className="rounded-[1.75rem] bg-[#08080a] border border-white/[0.08] p-5 space-y-3.5 relative overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white block">
                      TU LEVANTAMIENTO
                    </span>

                    {/* Capsule Steppers Row */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Peso Stepper */}
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#8a7f72] block px-1">
                          PESO
                        </span>
                        <div className="flex items-center justify-between rounded-full bg-[#000000] border border-white/[0.12] p-1.5 h-12">
                          <motion.button
                            whileTap={{ scale: 0.88 }}
                            type="button"
                            className="h-9 w-9 flex items-center justify-center rounded-full bg-[#131316] text-white hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
                            onClick={() => setWeight((v) => Math.max(2.5, Number((v - 2.5).toFixed(1))))}
                            title="Restar 2.5 kg"
                          >
                            <Minus size={14} />
                          </motion.button>

                          <div className="flex items-baseline justify-center gap-1.5 flex-1 px-1">
                            <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black text-white">
                              <CountUp value={weight} decimals={0} />
                            </span>
                            <span className="text-[9px] font-mono font-bold text-[#8a7f72] uppercase">kg</span>
                          </div>

                          <motion.button
                            whileTap={{ scale: 0.88 }}
                            type="button"
                            className="h-9 w-9 flex items-center justify-center rounded-full bg-[#131316] text-white hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
                            onClick={() => setWeight((v) => Math.min(500, Number((v + 2.5).toFixed(1))))}
                            title="Sumar 2.5 kg"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>
                      </div>

                      {/* Reps Stepper */}
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#8a7f72] block px-1">
                          REPS
                        </span>
                        <div className="flex items-center justify-between rounded-full bg-[#000000] border border-white/[0.12] p-1.5 h-12">
                          <motion.button
                            whileTap={{ scale: 0.88 }}
                            type="button"
                            className="h-9 w-9 flex items-center justify-center rounded-full bg-[#131316] text-white hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
                            onClick={() => setReps((v) => Math.max(1, v - 1))}
                            title="Restar 1 rep"
                          >
                            <Minus size={14} />
                          </motion.button>

                          <div className="flex items-baseline justify-center gap-1.5 flex-1 px-1">
                            <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black text-white">
                              <CountUp value={reps} decimals={0} />
                            </span>
                            <span className="text-[9px] font-mono font-bold text-[#8a7f72] uppercase">reps</span>
                          </div>

                          <motion.button
                            whileTap={{ scale: 0.88 }}
                            type="button"
                            className="h-9 w-9 flex items-center justify-center rounded-full bg-[#131316] text-white hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
                            onClick={() => setReps((v) => Math.min(20, v + 1))}
                            title="Sumar 1 rep"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Presets Rows: Peso and Reps */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                      {/* Peso Preset Row */}
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[8px] font-bold text-[#8a7f72] uppercase w-9 shrink-0">PESO</span>
                        <div className="grid grid-cols-6 gap-1.5 flex-1">
                          {[60, 70, 80, 90, 100, 120].map((val) => {
                            const isSelected = weight === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setWeight(val)}
                                className={`h-7 rounded-lg font-mono text-[9px] font-bold transition-all flex items-center justify-center select-none ${
                                  isSelected
                                    ? 'bg-white/15 text-white border border-white/40'
                                    : 'bg-[#131316] text-[#9ca0a6] hover:text-white'
                                }`}
                              >
                                {val}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Reps Preset Row */}
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[8px] font-bold text-[#8a7f72] uppercase w-9 shrink-0">REPS</span>
                        <div className="grid grid-cols-6 gap-1.5 flex-1">
                          {[1, 3, 5, 8, 10, 12].map((val) => {
                            const isSelected = reps === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setReps(val)}
                                className={`h-7 rounded-lg font-mono text-[9px] font-bold transition-all flex items-center justify-center select-none ${
                                  isSelected
                                    ? 'bg-white/15 text-white border border-white/40'
                                    : 'bg-[#131316] text-[#9ca0a6] hover:text-white'
                                }`}
                              >
                                {val}r
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Method Selector 2x2 Grid */}
                    <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                      <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#8a7f72] block px-0.5">
                        MÉTODO
                      </span>
                      <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Método de estimación">
                        {formulaValues.map((item) => {
                          const isSelected = formula === item.key;
                          return (
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              key={item.key}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => {
                                setFormula(item.key);
                                setExpandedFormula(item.key);
                              }}
                              className={`p-3.5 text-left transition-all relative select-none rounded-2xl ${
                                isSelected
                                  ? 'bg-[#060608] border-2 border-white'
                                  : 'bg-[#000000] border border-white/[0.08]'
                              }`}
                            >
                              <strong className="font-mono text-[11px] font-bold text-white uppercase block">{item.label}</strong>
                              <span className="font-mono text-[11px] font-black text-white block mt-1">
                                <CountUp value={item.value} decimals={1} /> kg
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Deck: Rounded Pill Buttons matching screenshot */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/[0.06]">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={saveBestLift}
                        className="py-3 px-4 rounded-full bg-[#000000] border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:border-white/40 transition-colors"
                      >
                        {feedback === 'saved' ? <Check size={14} className="text-emerald-400" /> : <Save size={14} />}
                        <span>{feedback === 'saved' ? 'GUARDADO' : 'GUARDAR'}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={sharePlan}
                        className="py-3 px-4 rounded-full bg-[#000000] border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:border-white/40 transition-colors"
                      >
                        {feedback === 'copied' ? <Check size={14} className="text-[var(--builder-accent,#00d2ee)]" /> : <Share2 size={14} />}
                        <span>{feedback === 'copied' ? 'COPIADO' : 'COMPARTIR'}</span>
                      </motion.button>
                    </div>

                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════════════
                  SCREEN 2 — MÉTODOS (Detailed Comparison)
                  ═══════════════════════════════════════════ */}
              {activeScreen === 'compare' && (
                <div className="flex flex-col gap-3">
                  {formulaValues.map((item) => {
                    const isSelected = formula === item.key;
                    const isExpanded = expandedFormula === item.key;
                    const barPct = maxFormulaVal > 0 ? (item.value / maxFormulaVal) * 100 : 0;

                    return (
                      <div
                        key={item.key}
                        onClick={() => {
                          setFormula(item.key);
                          setExpandedFormula(item.key);
                        }}
                        className={`rounded-[1.75rem] border p-5 space-y-2.5 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                          isSelected
                            ? 'bg-[#08080a] border-white/30 shadow-lg'
                            : 'bg-[#08080a] border-white/[0.08] hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                            {item.label}
                          </span>
                          {isSelected && (
                            <span className="font-mono text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/10 text-white">
                              ACTIVO
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="font-['Big_Shoulders_Display',sans-serif] text-[40px] font-black text-white leading-none">
                            <CountUp value={item.value} decimals={1} /> <span className="text-base text-[#9CA0A6]">kg</span>
                          </h3>
                          <p className="font-mono text-[10px] text-[#9CA0A6] mt-1">
                            {item.formulaStr}
                          </p>
                        </div>

                        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${barPct}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full rounded-full bg-white/70"
                          />
                        </div>

                        <p className="text-[11px] text-[#8a8990] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ═══════════════════════════════════════════
                  SCREEN 3 — ARSENAL (Cargas y Calentamiento)
                  ═══════════════════════════════════════════ */}
              {activeScreen === 'loads' && (
                <div className="flex flex-col gap-3">
                  <div className="rounded-[1.75rem] bg-[#08080a] border border-white/[0.08] p-5 space-y-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white block">
                      ARSENAL DE CARGA
                    </span>
                    <h3 className="font-['Big_Shoulders_Display',sans-serif] text-[40px] font-black text-white leading-none">
                      <CountUp value={oneRm} decimals={1} /> <span className="text-base text-[#9CA0A6]">kg 1RM</span>
                    </h3>
                    <p className="font-mono text-[10px] text-[#9CA0A6]">
                      Discos olímpicos · Redondeo 2.5 kg ({formula.toUpperCase()})
                    </p>
                  </div>

                  <div className="flex gap-2 p-1 rounded-2xl bg-[#0d0d10] border border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setLoadView('loads')}
                      className={`flex-1 py-1.5 rounded-xl font-mono text-[9px] font-bold uppercase transition-all ${
                        loadView === 'loads' ? 'bg-white text-black font-black' : 'text-[#6E6558] hover:text-white'
                      }`}
                    >
                      Porcentajes
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoadView('warmup')}
                      className={`flex-1 py-1.5 rounded-xl font-mono text-[9px] font-bold uppercase transition-all ${
                        loadView === 'warmup' ? 'bg-white text-black font-black' : 'text-[#6E6558] hover:text-white'
                      }`}
                    >
                      Calentamiento
                    </button>
                  </div>

                  {loadView === 'loads' ? (
                    <div className="grid grid-cols-2 gap-2.5">
                      {LOADS.map((load) => {
                        const targetKg = roundToPlate(oneRm * (load.pct / 100));
                        return (
                          <button
                            key={load.pct}
                            type="button"
                            onClick={() => {
                              setWeight(targetKg);
                              setActiveScreen('calc');
                            }}
                            className="p-3.5 text-left rounded-2xl bg-[#08080a] border border-white/[0.08] hover:border-white/20 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] font-bold text-white">{load.pct}%</span>
                              <span className="font-mono text-[8px] text-[#6E6558]">{load.reps}</span>
                            </div>
                            <strong className="block mt-1 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black text-white">
                              <CountUp value={targetKg} decimals={1} /> <small className="text-[10px] font-mono text-[#6E6558]">kg</small>
                            </strong>
                            <small className="block mt-1 font-mono text-[8px] text-[#8a8990]">{load.focus}</small>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {warmupSets.map((set, idx) => (
                        <div
                          key={set.pct}
                          className="flex items-center justify-between p-3.5 rounded-2xl bg-[#08080a] border border-white/[0.08]"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/5 font-mono text-xs font-black text-white">
                              #{idx + 1}
                            </span>
                            <div>
                              <p className="font-mono text-[10px] font-bold text-white">Ronda {idx + 1} ({set.pct}%)</p>
                              <p className="font-mono text-[8px] text-[#6E6558]">{set.reps} reps</p>
                            </div>
                          </div>
                          <strong className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black text-white">
                            <CountUp value={set.weight} decimals={1} /> <small className="text-[10px] font-mono text-[#6E6558]">kg</small>
                          </strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
