import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
  import { ArrowLeft, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Legacito, LegacitoMood } from './ui/Legacito';

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type LearningGoal =
  | 'muscle' | 'fat_loss' | 'endurance' | 'mindset' | 'nutrition' | 'longevity'
  | 'health_wellness' | 'training_methods' | 'sports_science' | 'biohacking'
  | 'neuroscience' | 'golden_era' | 'modern_fitness' | 'flexibility'
  | 'fasting' | 'sport_psychology';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Focus = 'body' | 'mind' | 'both';
export interface LearningPreferences {
  goals: LearningGoal[];
  level: Level | null;
  focus: Focus | null;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const GOALS: { id: LearningGoal; emoji: string; label: string; sublabel: string; section: string }[] = [
  // ─── 💪 Físico ────────────────────────────────────────────────────────────
  { id: 'muscle',           emoji: '💪', label: 'Ganar Músculo',                  sublabel: 'Hipertrofia y fuerza máxima',       section: '💪 Físico' },
  { id: 'fat_loss',         emoji: '🔥', label: 'Perder Grasa',                   sublabel: 'Composición corporal y recomp',     section: '💪 Físico' },
  { id: 'endurance',        emoji: '🏃', label: 'Resistencia Atlética',           sublabel: 'Cardio, VO2 Max y fondo',          section: '💪 Físico' },
  { id: 'flexibility',      emoji: '🧘', label: 'Movilidad y Flexibilidad',       sublabel: 'Yoga, stretching y FRC',           section: '💪 Físico' },
  // ─── 🏆 Cultura Fitness ───────────────────────────────────────────────────
  { id: 'golden_era',       emoji: '🏆', label: 'Era Dorada del Gym (80s/90s)',    sublabel: 'Arnold, Mentzer, culturismo clásico', section: '🏆 Cultura' },
  { id: 'modern_fitness',   emoji: '🌐', label: 'Fitness Moderno',                sublabel: 'Crossfit, funcional, tendencias hoy', section: '🏆 Cultura' },
  // ─── 🥑 Nutrición ─────────────────────────────────────────────────────────
  { id: 'nutrition',        emoji: '🥑', label: 'Nutrición Real',                 sublabel: 'Macros, timing y calidad',        section: '🥑 Nutrición' },
  { id: 'fasting',          emoji: '⏳', label: 'Ayuno Intermitente',             sublabel: 'Autofagia y metabolismo grasa',   section: '🥑 Nutrición' },
  { id: 'health_wellness',  emoji: '❤️', label: 'Salud y Bienestar Integral',     sublabel: 'Hormonal, inmune, digestivo',     section: '🥑 Nutrición' },
  { id: 'longevity',        emoji: '♾️', label: 'Longevidad',                     sublabel: 'Vivir más, más sano y con más energía', section: '🥑 Nutrición' },
  // ─── 🧠 Mente ─────────────────────────────────────────────────────────────
  { id: 'mindset',          emoji: '🧠', label: 'Mentalidad y Filosofía',         sublabel: 'Bushido, Taoísmo, Estoicismo y más', section: '🧠 Mente' },
  { id: 'neuroscience',     emoji: '⚡', label: 'Neurociencia Aplicada',          sublabel: 'Dopamina, sueño y enfoque real',   section: '🧠 Mente' },
  { id: 'sport_psychology', emoji: '🎯', label: 'Psicología del Deporte',         sublabel: 'Flow, visualización, resiliencia', section: '🧠 Mente' },
  // ─── 🧬 Ciencia ───────────────────────────────────────────────────────────
  { id: 'sports_science',   emoji: '🧬', label: 'Ciencia Aplicada al Deporte',    sublabel: 'Periodización, lactato, epigenética', section: '🧬 Ciencia' },
  { id: 'training_methods', emoji: '📊', label: 'Metodologías de Entrenamiento',  sublabel: 'HIIT, DUP, ondulación, volumen',  section: '🧬 Ciencia' },
  { id: 'biohacking',       emoji: '🔬', label: 'Bio-Hacking',                    sublabel: 'Sauna, frío, HRV, ayuno, sueño',  section: '🧬 Ciencia' },
];

const LEVELS: { id: Level; emoji: string; label: string; desc: string }[] = [
  { id: 'beginner',     emoji: '🌱', label: 'Estoy empezando',            desc: 'Menos de 6 meses entrenando' },
  { id: 'intermediate', emoji: '⚡', label: 'Tengo algo de experiencia',  desc: '6 meses — 2 años' },
  { id: 'advanced',     emoji: '🏆', label: 'Llevo años entrenando',     desc: 'Más de 2 años de consistencia' },
];

const FOCUS_OPTIONS: { id: Focus; emoji: string; label: string; desc: string }[] = [
  { id: 'body', emoji: '🏋️', label: 'Cuerpo Guerrero',  desc: 'Entrenamiento, nutrición y recuperación' },
  { id: 'mind', emoji: '📜', label: 'Mente Indomable',   desc: 'Filosofía, hábitos y enfoque multicultural' },
  { id: 'both', emoji: '☯️', label: 'Legado Integral',   desc: 'El equilibrio entre guerrero y sabio' },
];


// ─── GOAL CARD ────────────────────────────────────────────────────────────────
function GoalCard({
  item,
  selected,
  onToggle,
}: {
  item: typeof GOALS[number];
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={onToggle}
      className={[
        'relative text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 w-full',
        selected
          ? 'bg-[#DDF4FF] border-[#1CB0F6] shadow-sm'
          : 'bg-white border-[#E5E5E5] hover:border-[#AFAFAF]',
      ].join(' ')}
    >
      <span className="text-2xl">{item.emoji}</span>
      <div className="flex-1">
        <p className={['text-sm font-black', selected ? 'text-[#1CB0F6]' : 'text-[#0A0A0A]'].join(' ')}>
          {item.label}
        </p>
        <p className="text-[11px] text-neutral-400 font-medium">{item.sublabel}</p>
      </div>
      {selected && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <CheckCircle className="text-[#1CB0F6] shrink-0" size={20} />
        </motion.div>
      )}
    </motion.button>
  );
}

// ─── OPTION LIST ─────────────────────────────────────────────────────────────
function OptionCard({
  emoji, label, desc, selected, onClick,
}: { emoji: string; label: string; desc: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={[
        'w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4',
        selected
          ? 'bg-[#DDF4FF] border-[#1CB0F6] shadow-sm'
          : 'bg-white border-[#E5E5E5] hover:border-[#AFAFAF]',
      ].join(' ')}
    >
      <span className="text-2xl w-9 text-center">{emoji}</span>
      <div className="flex-1">
        <p className={['text-sm font-black', selected ? 'text-[#1CB0F6]' : 'text-[#0A0A0A]'].join(' ')}>{label}</p>
        {desc && <p className="text-[11px] text-neutral-400 font-medium">{desc}</p>}
      </div>
      {selected && <CheckCircle className="text-[#1CB0F6] shrink-0" size={20} />}
    </motion.button>
  );
}

// ─── LEGACITO MASCOT ──────────────────────────────────────────────────────────
function LegacitoSpeech({ text }: { text: string }) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 mb-8"
    >
      {/* Mascot */}
      <Legacito size={60} mood={text.includes('?') ? 'thinking' : 'neutral'} />
      {/* Bubble */}
      <div className="bg-white border border-[#E5E5E5] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-sm">
        <p className="text-sm font-semibold text-[#0A0A0A] leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen({ prefs }: { prefs: LearningPreferences }) {
  const goalLabels = prefs.goals.map(g => GOALS.find(x => x.id === g)?.label).filter(Boolean);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[50vh] text-center px-8"
    >
      <Legacito size={80} mood="vision" className="mb-6" />
      <h2 className="text-xl font-black text-[#0A0A0A] mb-2">Personalizando tu camino...</h2>
      <p className="text-sm text-neutral-500 mb-6">Filtrando entre 300+ nodos de conocimiento para priorizar tus intereses</p>
      <div className="space-y-2 text-left w-full max-w-xs">
        {goalLabels.map((g, i) => (
          <motion.div
            key={g}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.18 }}
            className="flex items-center gap-2 text-sm font-semibold text-[#0A0A0A]"
          >
            <CheckCircle className="text-[#27AE60]" size={16} />
            {g}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const TOTAL_STEPS = 3;

interface OnboardingFlowProps {
  onComplete: (prefs: LearningPreferences) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [prefs, setPrefs] = useState<LearningPreferences>({
    goals: [],
    level: null,
    focus: null,
  });

  // Validate current step
  const canContinue =
    (step === 1 && prefs.goals.length > 0) ||
    (step === 2 && prefs.level !== null) ||
    (step === 3 && prefs.focus !== null);

  const toggleGoal = (id: LearningGoal) => {
    setPrefs(p => ({
      ...p,
      goals: p.goals.includes(id) ? p.goals.filter(g => g !== id) : [...p.goals, id],
    }));
  };

  const handleNext = () => {
    if (!canContinue) return;
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
    } else {
      finish();
    }
  };

  const finish = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1800));
      toast.success('¡Tu camino está listo! 🎉');
      onComplete(prefs);
    } catch (e) {
      console.error(e);
      toast.error('Error al guardar. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  // Mascot messages per step
  const mascotText = [
    '¡Hola! Soy tu guía en el Camino del Legado. ¿Qué quieres aprender? Puedes elegir varios.',
    '¿Cuánta experiencia tienes entrenando? Esto ajustará la dificultad de tus lecciones.',
    '¿Qué quieres priorizar? Esto decidirá qué temas aparecerán con más frecuencia en tu camino.',
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#F7F7F7] font-sans flex flex-col">

      {/* ── PROGRESS BAR ── */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-4">
          {step > 1 && !loading && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="p-2 hover:bg-[#F7F7F7] rounded-full transition-colors"
            >
              <ArrowLeft className="text-neutral-400" size={20} />
            </button>
          )}
          {(step === 1 || loading) && <div className="w-9" />}

          {/* Progress bar */}
          <div className="flex-1 h-3 bg-[#E5E5E5] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#1CB0F6] rounded-full"
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Step label */}
          <span className="text-[11px] font-black text-neutral-400 w-9 text-right tabular-nums">
            {step}/{TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 pt-8 pb-32">
          {loading ? (
            <LoadingScreen prefs={prefs} />
          ) : (
            <>
              <LegacitoSpeech text={mascotText[step - 1]} />

              <AnimatePresence mode="wait">
                {/* STEP 1: Goals (multi-select, grouped by section) */}
                {step === 1 && (
                  <motion.div
                     key="s1"
                     initial={{ opacity: 0, x: 24 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -24 }}
                     className="space-y-5"
                   >
                     <div>
                       <h2 className="text-xl font-black text-[#0A0A0A] mb-1">¿Qué quieres aprender?</h2>
                       <p className="text-xs text-neutral-400 font-semibold mb-4">Elige todos los que te interesen · mínimo 1</p>
                     </div>
 
                     {/* Grouped by section */}
                     {Array.from(new Set(GOALS.map(g => g.section))).map(section => (
                       <div key={section}>
                         <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 px-1">{section}</p>
                         <div className="grid grid-cols-2 gap-2">
                           {GOALS.filter(g => g.section === section).map(g => (
                             <GoalCard
                               key={g.id}
                               item={g}
                               selected={prefs.goals.includes(g.id)}
                               onToggle={() => toggleGoal(g.id)}
                             />
                           ))}
                         </div>
                       </div>
                     ))}
 
                     {/* Selection counter */}
                     {prefs.goals.length > 0 && (
                       <motion.div
                         initial={{ opacity: 0, y: 6 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="flex items-center justify-center gap-2 py-2 bg-[#DDF4FF] border border-[#1CB0F6]/30 rounded-2xl"
                       >
                         <CheckCircle className="text-[#1CB0F6]" size={16} />
                         <span className="text-xs font-black text-[#1CB0F6]">
                           {prefs.goals.length} tema{prefs.goals.length > 1 ? 's' : ''} seleccionado{prefs.goals.length > 1 ? 's' : ''}
                         </span>
                       </motion.div>
                     )}
                  </motion.div>
                )}


                {/* STEP 2: Level */}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    className="space-y-3"
                  >
                    <h2 className="text-xl font-black text-[#0A0A0A] mb-4">¿Cuánto sabes?</h2>
                    {LEVELS.map(l => (
                      <OptionCard
                        key={l.id}
                        emoji={l.emoji}
                        label={l.label}
                        desc={l.desc}
                        selected={prefs.level === l.id}
                        onClick={() => setPrefs(p => ({ ...p, level: l.id }))}
                      />
                    ))}
                  </motion.div>
                )}

                {/* STEP 3: Focus */}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    className="space-y-3"
                  >
                    <h2 className="text-xl font-black text-[#0A0A0A] mb-4">¿Qué quieres priorizar?</h2>
                    {FOCUS_OPTIONS.map(f => (
                      <OptionCard
                        key={f.id}
                        emoji={f.emoji}
                        label={f.label}
                        desc={f.desc}
                        selected={prefs.focus === f.id}
                        onClick={() => setPrefs(p => ({ ...p, focus: f.id }))}
                      />
                    ))}
                  </motion.div>
                )}

               </AnimatePresence>
            </>
          )}
        </div>
      </div>

      {/* ── CONTINUE BUTTON ── */}
      {!loading && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-[#E5E5E5] p-4">
          <div className="max-w-lg mx-auto">
            <motion.button
              whileTap={canContinue ? { scale: 0.97, translateY: 2 } : {}}
              onClick={handleNext}
              disabled={!canContinue}
              className={[
                'w-full h-14 rounded-2xl font-black text-sm uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2',
                canContinue
                  ? 'bg-[#27AE60] hover:bg-[#219653] text-white shadow-[0_4px_0_#1A7A43] active:shadow-none active:translate-y-[2px]'
                  : 'bg-[#E5E5E5] text-[#AFAFAF] cursor-not-allowed',
              ].join(' ')}
            >
              {step === TOTAL_STEPS ? (
                <>
                  <Zap size={16} />
                  ¡Comenzar mi Legado!
                </>
              ) : (
                <>
                  Continuar
                  <ChevronRight size={20} />
                </>
              )}
            </motion.button>
            {step === 1 && (
              <p className="text-center text-[11px] text-[#1CB0F6] font-bold mt-2">
                ✨ Tus elecciones filtrarán y priorizarán tu mapa de niveles
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


