import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Share2, Plus, Minus, Check, ChevronDown, ChevronRight, Flame, Dumbbell } from 'lucide-react';
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

/* ─── CountUp Component ─── */
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
    const duration = 400;
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
  const [feedback, setFeedback] = useState<'saved' | 'copied' | null>(null);
  const [isHeroChartExpanded, setIsHeroChartExpanded] = useState(true);
  const [isArsenalExpanded, setIsArsenalExpanded] = useState(true);
  const [isMethodsExpanded, setIsMethodsExpanded] = useState(true);
  const [arsenalTab, setArsenalTab] = useState<'loads' | 'warmup'>('loads');
  const [refreshKey, setRefreshKey] = useState(0);

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

  const maxFormulaVal = Math.max(...formulaValues.map((f) => f.value), 1);

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

  return (
    <section className="vanguard-tool vanguard-tool--phone !bg-[#000000]" aria-labelledby="one-rm-title">
      <div className="one-rm-phone !bg-[#000000]" aria-label="Mock smartphone 1RM">
        <div className="one-rm-phone__bezel !bg-[#000000] !border-[#000000]">
          <div className="one-rm-phone__speaker" aria-hidden="true" />
          <div className="one-rm-phone__screen relative overflow-hidden !bg-[#000000]">
            
            {/* Scrollable OLED Phone Canvas — Full Unified Flow without Boxes */}
            <div
              className="one-rm-phone-page absolute inset-0 flex flex-col gap-4 p-3.5 pb-28 overflow-y-auto overscroll-contain !bg-[#000000]"
              style={{ scrollbarWidth: 'none' }}
            >

              {/* ─── 1. HERO 1RM ESTIMADO ─── */}
              <div className="space-y-2 pb-3 border-b border-white/[0.08]">
                <div
                  className="flex items-center justify-between cursor-pointer select-none py-0.5"
                  onClick={() => setIsHeroChartExpanded((prev) => !prev)}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--builder-accent,#00d2ee)] shadow-[0_0_8px_rgba(0,210,238,0.6)]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--builder-accent-soft,#5ce1e6)]">
                      1RM ESTIMADO
                    </span>
                  </div>
                  <motion.div animate={{ rotate: isHeroChartExpanded ? 0 : -90 }} transition={{ duration: 0.2 }}>
                    {isHeroChartExpanded ? <ChevronDown size={15} className="text-white/60" /> : <ChevronRight size={15} className="text-[#6E6558]" />}
                  </motion.div>
                </div>

                <div>
                  <h3 className="font-['Big_Shoulders_Display',sans-serif] text-[52px] font-black text-white tracking-tight leading-none">
                    <CountUp value={oneRm} decimals={1} refreshKey={refreshKey} /> <span className="text-2xl font-black text-white/80 uppercase">kg</span>
                  </h3>
                  <p className="font-mono text-[11px] text-[#9CA0A6] mt-1">
                    <CountUp value={weight} decimals={0} /> kg × <CountUp value={reps} decimals={0} /> reps · <CountUp value={percentOfEstimated} decimals={0} />% de carga ({formula.toUpperCase()})
                  </p>
                </div>

                {/* Harmonic Spectral Candle Trend */}
                <AnimatePresence>
                  {isHeroChartExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
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
              </div>

              {/* ─── 2. TU LEVANTAMIENTO (Controles de Carga) ─── */}
              <div className="space-y-3 pb-3 border-b border-white/[0.08]">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--builder-accent-soft,#5ce1e6)] block">
                  TU LEVANTAMIENTO
                </span>

                {/* Stepper Capsules */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Peso */}
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#8a7f72] block px-1">
                      PESO
                    </span>
                    <div className="flex items-center justify-between rounded-2xl bg-[#09090c] border border-white/[0.1] p-1.5 h-12">
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        type="button"
                        className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#141418] text-white hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
                        onClick={() => setWeight((v) => Math.max(2.5, Number((v - 2.5).toFixed(1))))}
                        title="Restar 2.5 kg"
                      >
                        <Minus size={14} />
                      </motion.button>

                      <div className="flex items-baseline justify-center gap-1 flex-1 px-1">
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black text-white">
                          <CountUp value={weight} decimals={0} />
                        </span>
                        <span className="text-[9px] font-mono font-bold text-[#8a7f72] uppercase">kg</span>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        type="button"
                        className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#141418] text-white hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
                        onClick={() => setWeight((v) => Math.min(500, Number((v + 2.5).toFixed(1))))}
                        title="Sumar 2.5 kg"
                      >
                        <Plus size={14} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Reps */}
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#8a7f72] block px-1">
                      REPS
                    </span>
                    <div className="flex items-center justify-between rounded-2xl bg-[#09090c] border border-white/[0.1] p-1.5 h-12">
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        type="button"
                        className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#141418] text-white hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
                        onClick={() => setReps((v) => Math.max(1, v - 1))}
                        title="Restar 1 rep"
                      >
                        <Minus size={14} />
                      </motion.button>

                      <div className="flex items-baseline justify-center gap-1 flex-1 px-1">
                        <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black text-white">
                          <CountUp value={reps} decimals={0} />
                        </span>
                        <span className="text-[9px] font-mono font-bold text-[#8a7f72] uppercase">reps</span>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        type="button"
                        className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#141418] text-white hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
                        onClick={() => setReps((v) => Math.min(20, v + 1))}
                        title="Sumar 1 rep"
                      >
                        <Plus size={14} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Presets Grid */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[8px] font-bold text-[#8a7f72] uppercase w-9 shrink-0">PESO</span>
                    <div className="grid grid-cols-6 gap-1.5 flex-1">
                      {[60, 70, 80, 90, 100, 120].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setWeight(val)}
                          className={`h-7 rounded-lg font-mono text-[9px] font-bold transition-all flex items-center justify-center select-none ${
                            weight === val
                              ? 'bg-white/15 text-white border border-white/40'
                              : 'bg-[#09090c] text-[#9ca0a6] hover:text-white border border-white/[0.06]'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[8px] font-bold text-[#8a7f72] uppercase w-9 shrink-0">REPS</span>
                    <div className="grid grid-cols-6 gap-1.5 flex-1">
                      {[1, 3, 5, 8, 10, 12].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setReps(val)}
                          className={`h-7 rounded-lg font-mono text-[9px] font-bold transition-all flex items-center justify-center select-none ${
                            reps === val
                              ? 'bg-white/15 text-white border border-white/40'
                              : 'bg-[#09090c] text-[#9ca0a6] hover:text-white border border-white/[0.06]'
                          }`}
                        >
                          {val}r
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── 3. MÉTODOS DE ESTIMACIÓN (4 Fórmulas) ─── */}
              <div className="space-y-2.5 pb-3 border-b border-white/[0.08]">
                <div
                  className="flex items-center justify-between cursor-pointer select-none py-0.5"
                  onClick={() => setIsMethodsExpanded((prev) => !prev)}
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--builder-accent-soft,#5ce1e6)]">
                    MÉTODOS ({formulaValues.length})
                  </span>
                  <motion.div animate={{ rotate: isMethodsExpanded ? 0 : -90 }} transition={{ duration: 0.2 }}>
                    {isMethodsExpanded ? <ChevronDown size={15} className="text-white/60" /> : <ChevronRight size={15} className="text-[#6E6558]" />}
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isMethodsExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Método de estimación">
                        {formulaValues.map((item) => {
                          const isSelected = formula === item.key;
                          const barPct = maxFormulaVal > 0 ? (item.value / maxFormulaVal) * 100 : 0;
                          return (
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              key={item.key}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setFormula(item.key)}
                              className={`p-3 text-left transition-all relative select-none rounded-xl ${
                                isSelected
                                  ? 'bg-[#09090c] border-2 border-white'
                                  : 'bg-[#050507] border border-white/[0.08] hover:border-white/15'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <strong className="font-mono text-[10px] font-bold text-white uppercase">{item.label}</strong>
                                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[var(--builder-accent,#00d2ee)]" />}
                              </div>
                              <span className="font-mono text-[12px] font-black text-white block mt-0.5">
                                <CountUp value={item.value} decimals={1} /> kg
                              </span>
                              <div className="mt-1.5 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full bg-[var(--builder-accent,#00d2ee)]"
                                  animate={{ width: `${barPct}%` }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ─── 4. ARSENAL DE CARGA Y CALENTAMIENTO ─── */}
              <div className="space-y-2.5 pb-3 border-b border-white/[0.08]">
                <div
                  className="flex items-center justify-between cursor-pointer select-none py-0.5"
                  onClick={() => setIsArsenalExpanded((prev) => !prev)}
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--builder-accent-soft,#5ce1e6)]">
                    ARSENAL DE CARGA
                  </span>
                  <motion.div animate={{ rotate: isArsenalExpanded ? 0 : -90 }} transition={{ duration: 0.2 }}>
                    {isArsenalExpanded ? <ChevronDown size={15} className="text-white/60" /> : <ChevronRight size={15} className="text-[#6E6558]" />}
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isArsenalExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-2.5 overflow-hidden"
                    >
                      {/* Segmented Switcher for Arsenal vs Warmup */}
                      <div className="flex gap-1.5 p-1 rounded-xl bg-[#09090c] border border-white/[0.08]">
                        <button
                          type="button"
                          onClick={() => setArsenalTab('loads')}
                          className={`flex-1 py-1.5 rounded-lg font-mono text-[9px] font-bold uppercase transition-all ${
                            arsenalTab === 'loads' ? 'bg-white text-black font-black' : 'text-[#6E6558] hover:text-white'
                          }`}
                        >
                          Porcentajes
                        </button>
                        <button
                          type="button"
                          onClick={() => setArsenalTab('warmup')}
                          className={`flex-1 py-1.5 rounded-lg font-mono text-[9px] font-bold uppercase transition-all ${
                            arsenalTab === 'warmup' ? 'bg-white text-black font-black' : 'text-[#6E6558] hover:text-white'
                          }`}
                        >
                          Calentamiento
                        </button>
                      </div>

                      {arsenalTab === 'loads' ? (
                        <div className="grid grid-cols-2 gap-2">
                          {LOADS.map((load) => {
                            const targetKg = roundToPlate(oneRm * (load.pct / 100));
                            return (
                              <button
                                key={load.pct}
                                type="button"
                                onClick={() => setWeight(targetKg)}
                                className="p-2.5 text-left rounded-xl bg-[#050507] border border-white/[0.08] hover:border-white/20 transition-all select-none group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-[10px] font-bold text-white group-hover:text-[var(--builder-accent,#00d2ee)]">{load.pct}%</span>
                                  <span className="font-mono text-[8px] text-[#6E6558]">{load.reps}</span>
                                </div>
                                <strong className="block mt-0.5 font-['Big_Shoulders_Display',sans-serif] text-2xl font-black text-white">
                                  <CountUp value={targetKg} decimals={1} /> <small className="text-[10px] font-mono text-[#6E6558]">kg</small>
                                </strong>
                                <small className="block font-mono text-[8px] text-[#8a8990] truncate">{load.focus}</small>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          {warmupSets.map((set, idx) => (
                            <div
                              key={set.pct}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-[#050507] border border-white/[0.08]"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 font-mono text-[10px] font-black text-white">
                                  #{idx + 1}
                                </span>
                                <div>
                                  <p className="font-mono text-[9px] font-bold text-white">Ronda {idx + 1} ({set.pct}%)</p>
                                  <p className="font-mono text-[8px] text-[#6E6558]">{set.reps} reps</p>
                                </div>
                              </div>
                              <strong className="font-['Big_Shoulders_Display',sans-serif] text-xl font-black text-white">
                                <CountUp value={set.weight} decimals={1} /> <small className="text-[9px] font-mono text-[#6E6558]">kg</small>
                              </strong>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ─── 5. ACTION BUTTONS ─── */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={saveBestLift}
                  className="py-3 px-4 rounded-xl bg-[#09090c] border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:border-white/40 transition-colors"
                >
                  {feedback === 'saved' ? <Check size={14} className="text-emerald-400" /> : <Save size={14} />}
                  <span>{feedback === 'saved' ? 'GUARDADO' : 'GUARDAR'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={sharePlan}
                  className="py-3 px-4 rounded-xl bg-[#09090c] border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:border-white/40 transition-colors"
                >
                  {feedback === 'copied' ? <Check size={14} className="text-[var(--builder-accent,#00d2ee)]" /> : <Share2 size={14} />}
                  <span>{feedback === 'copied' ? 'COPIADO' : 'COMPARTIR'}</span>
                </motion.button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
