import { useMemo, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Save, Share2 } from 'lucide-react';
import { updateBuilderBestLift } from '../builderToolLedger';
import { PinkCandleTrend } from './PinkCandleTrend';
import { UiIcon } from '../UiIcon';

type FormulaKey = 'epley' | 'brzycki' | 'lander' | 'lombardi';

const FORMULAS = [
  { key: 'epley', label: 'Epley', description: 'Equilibrada para uso general' },
  { key: 'brzycki', label: 'Brzycki', description: 'Más estable con pocas reps' },
  { key: 'lander', label: 'Lander', description: 'Orientada a fuerza' },
  { key: 'lombardi', label: 'Lombardi', description: 'Útil con series largas' },
] as const;

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

export function OneRmCalculator() {
  const [weight, setWeight] = useState(80);
  const [reps, setReps] = useState(5);
  const [formula, setFormula] = useState<FormulaKey>('epley');
  const [feedback, setFeedback] = useState<'saved' | 'copied' | null>(null);
  const [phonePage, setPhonePage] = useState(0);
  const [loadView, setLoadView] = useState<'loads' | 'warmup'>('loads');
  const hscrollRef = useRef<HTMLDivElement>(null);

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
    () => FORMULAS.map((item) => ({ ...item, value: calculateOneRm(weight, reps, item.key) })),
    [reps, weight],
  );

  const showFeedback = (value: 'saved' | 'copied') => {
    setFeedback(value);
    window.setTimeout(() => setFeedback(null), 1800);
  };

  const saveBestLift = () => {
    updateBuilderBestLift({
      exerciseName: 'Press banca',
      estimated1RmKg: oneRm,
      weightKg: weight,
      reps,
      date: new Date().toISOString().slice(0, 10),
    });
    showFeedback('saved');
  };

  const sharePlan = async () => {
    const text = `Vanguard Tools · 1RM\n${weight} kg × ${reps} reps = ${oneRm.toFixed(1)} kg\n\n80%: ${roundToPlate(oneRm * 0.8)} kg\n75%: ${roundToPlate(oneRm * 0.75)} kg\n70%: ${roundToPlate(oneRm * 0.7)} kg`;
    try {
      if (navigator.share) await navigator.share({ title: 'Mi 1RM', text });
      else await navigator.clipboard.writeText(text);
      showFeedback('copied');
    } catch {
      // El usuario puede cancelar el diálogo nativo de compartir.
    }
  };

  return (
    <section className="vanguard-tool vanguard-tool--phone" aria-labelledby="one-rm-title">
      <div className="one-rm-phone" aria-label="Mock smartphone 1RM">
        <div className="one-rm-phone__bezel">
          <div className="one-rm-phone__speaker" aria-hidden="true" />
          <div className="one-rm-phone__screen">
            <div ref={hscrollRef} className="one-rm-phone__hscroll" onScroll={(e) => {
              const el = e.currentTarget;
              const idx = Math.round(el.scrollLeft / el.clientWidth);
              if (idx !== phonePage) setPhonePage(idx);
            }}>

              {/* Página 1: calculadora 1RM */}
              <div className="one-rm-phone-page">
                <header className="one-rm-phone__topbar">
                  <div>
                    <span className="vanguard-tool__eyebrow">Vanguard Tools · Fuerza</span>
                    <h2 id="one-rm-title">1RM</h2>
                  </div>
                  <div className="vanguard-tool__actions">
                    <button type="button" onClick={saveBestLift} aria-label="Guardar 1RM en Legacito" title="Guardar en Legacito">
                      {feedback === 'saved' ? <UiIcon name="validation-1" size={17} duo /> : <Save size={18} />}
                    </button>
                    <button type="button" onClick={sharePlan} aria-label="Copiar o compartir plan" title="Copiar o compartir">
                      {feedback === 'copied' ? <UiIcon name="validation-1" size={17} duo /> : <Share2 size={18} />}
                    </button>
                  </div>
                </header>

                <section className="vanguard-tool__result" aria-live="polite">
                  <div className="vanguard-tool__result-data">
                    <span className="vanguard-tool__section-label">1RM estimado</span>
                    <motion.div
                      key={oneRm}
                      initial={{ opacity: 0.55, y: 4, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="vanguard-tool__result-value">{oneRm.toFixed(1)} <em>kg</em></span>
                      <p>1RM teórico · {weight} kg × {reps} reps · {FORMULAS.find((item) => item.key === formula)?.label}</p>
                    </motion.div>
                  </div>
                  <p className="vanguard-tool__result-message">Tu fuerza está construyendo una base sólida. Veamos cómo convertirla en tu próxima serie.</p>
                  <button type="button" className="vanguard-tool__result-insight" onClick={() => { setPhonePage(2); hscrollRef.current?.scrollTo({ left: hscrollRef.current.clientWidth * 2, behavior: 'smooth' }); }}>
                    <span className="vanguard-tool__result-insight-mark" aria-hidden="true">♥</span>
                    <span>Ver lectura de fuerza</span>
                    <b aria-hidden="true">▶</b>
                  </button>
                  <div className="vanguard-tool__result-chart">
                    <div className="vanguard-tool__result-axis" aria-hidden="true"><span>+6</span><span>+3</span><span>0</span><span>-3</span></div>
                    <div className="vanguard-tool__result-plot">
                      <PinkCandleTrend kind="result" variant={Math.round(oneRm)} label="Señal de fuerza estimada" />
                      <div className="vanguard-tool__result-chart-labels" aria-hidden="true"><span>SET 1</span><span>SET 2</span><span>SET 3</span><span>LIVE</span></div>
                    </div>
                  </div>
                  <div className="vanguard-tool__result-note">Tu levantamiento equivale al {Math.round(percentOfEstimated)}% de tu 1RM estimado.</div>
                </section>

                <section className="vanguard-tool__inputs" aria-label="Entrada de levantamiento">
                  <span className="vanguard-tool__section-label">Tu levantamiento</span>
                  <div className="vanguard-tool__input-grid">
                    <label>
                      <span>Peso levantado</span>
                      <div className="vanguard-tool__number-input">
                        <input type="number" min="2.5" max="500" step="2.5" value={weight} onChange={(event) => setWeight(Math.max(0, Number(event.target.value)))} />
                        <strong>kg</strong>
                      </div>
                    </label>
                    <label>
                      <span>Repeticiones</span>
                      <div className="vanguard-tool__number-input">
                        <input type="number" min="1" max="20" step="1" value={reps} onChange={(event) => setReps(Math.max(1, Number(event.target.value)))} />
                        <strong>reps</strong>
                      </div>
                    </label>
                  </div>
                  <span className="vanguard-tool__section-label">Método de estimación</span>
                  <div className="vanguard-tool__formula-list" role="radiogroup" aria-label="Método de estimación">
                    {formulaValues.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        role="radio"
                        aria-checked={formula === item.key}
                        className={formula === item.key ? 'is-selected' : ''}
                        onClick={() => setFormula(item.key)}
                      >
                        <div className="vanguard-tool__formula-header">
                          <strong>{item.label}</strong>
                          <span className="vanguard-tool__formula-val">{item.value.toFixed(1)} kg</span>
                        </div>
                        <span>{item.description}</span>
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              {/* Página 2: Comparar métodos */}
              <div className="one-rm-phone-page">
                <h3 className="one-rm-phone-page-title">Comparar métodos</h3>
                <p className="one-rm-phone-page-sub">Contrasta el cálculo antes de definir tu bloque</p>
                <motion.div className="vanguard-tool__methods" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  {formulaValues.map((item, index) => (
                    <div key={item.key} className={formula === item.key ? 'is-selected' : ''}>
                      <span>{item.label}</span>
                      <strong>{item.value.toFixed(1)} kg</strong>
                      <PinkCandleTrend variant={index} label={`Tendencia estimada por ${item.label}`} />
                      <small>{item.description}</small>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Página 3: Series de trabajo + calentamiento */}
              <div className="one-rm-phone-page one-rm-phone-page--loads">
                <div className="vanguard-tool__loads-heading">
                  <div><span className="vanguard-tool__section-label">Series de trabajo</span><h3 className="one-rm-phone-page-title" id="one-rm-loads">Tu arsenal de carga</h3></div>
                </div>
                <div className="one-rm-load-tabs" role="tablist" aria-label="Vista de carga">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={loadView === 'loads'}
                    aria-controls="one-rm-load-panel"
                    className={loadView === 'loads' ? 'is-active' : ''}
                    onClick={() => setLoadView('loads')}
                  >
                    Carga
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={loadView === 'warmup'}
                    aria-controls="one-rm-load-panel"
                    className={loadView === 'warmup' ? 'is-active' : ''}
                    onClick={() => setLoadView('warmup')}
                  >
                    Calentamiento
                  </button>
                </div>
                <p className="one-rm-phone-page-sub">
                  {loadView === 'loads' ? 'Redondeado a discos de 2.5 kg · presioná para cargar' : '4 rondas progresivas antes de tu serie efectiva'}
                </p>
                {loadView === 'loads' ? (
                  <motion.div key="loads" id="one-rm-load-panel" role="tabpanel" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} className="vanguard-tool__load-grid">
                    {LOADS.map((load) => (
                      <button key={load.pct} type="button" onClick={() => setWeight(roundToPlate(oneRm * (load.pct / 100)))}>
                        <span>{load.pct}%</span>
                        <strong>{roundToPlate(oneRm * (load.pct / 100)).toFixed(1)} <em>kg</em></strong>
                        <PinkCandleTrend variant={load.pct} label={`Tendencia de carga al ${load.pct}%`} />
                        <small>{load.focus} · {load.reps}</small>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="warmup" id="one-rm-load-panel" role="tabpanel" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} className="vanguard-tool__warmup">
                    {warmupSets.map((set) => (
                      <div key={set.pct}>
                        <span>{set.pct}%</span>
                        <strong>{set.weight.toFixed(1)} kg</strong>
                        <PinkCandleTrend variant={set.pct} label={`Tendencia de calentamiento al ${set.pct}%`} />
                        <small>{set.reps} reps</small>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

            </div>
            {/* Page indicator dots */}
            <div className="one-rm-phone-dots" role="tablist" aria-label="Páginas del simulador">
              {[0, 1, 2].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={phonePage === page ? 'is-active' : ''}
                  aria-label={`Ver página ${page + 1} de 3`}
                  aria-current={phonePage === page ? 'true' : undefined}
                  onClick={() => { setPhonePage(page); hscrollRef.current?.scrollTo({ left: hscrollRef.current.clientWidth * page, behavior: 'smooth' }); }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="one-rm-presets" role="group" aria-label="Ajustes rápidos de 1RM">
        <div className="one-rm-presets__group">
          <span className="one-rm-presets__label">Peso</span>
          <div className="one-rm-presets__row" role="radiogroup" aria-label="Carga rápida">
            {[60, 70, 80, 90, 100].map((value) => (
              <button key={value} type="button" role="radio" aria-checked={weight === value} className={weight === value ? 'is-selected' : ''} onClick={() => setWeight(value)}>{value}<small>kg</small></button>
            ))}
          </div>
        </div>
        <div className="one-rm-presets__group">
          <span className="one-rm-presets__label">Reps</span>
          <div className="one-rm-presets__row" role="radiogroup" aria-label="Repeticiones rápidas">
            {[3, 5, 8, 10].map((value) => (
              <button key={value} type="button" role="radio" aria-checked={reps === value} className={reps === value ? 'is-selected' : ''} onClick={() => setReps(value)}>{value}<small>R</small></button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

