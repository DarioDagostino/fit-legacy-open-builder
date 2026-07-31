import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FoodIconRenderer as FoodIcon } from '../workout/FoodIconRenderer';

export interface CanvasExercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
  section?: string;
}

export interface CanvasFood {
  name: string;
  quantity: number;
  protein: number;
  calories: number;
  notes?: string;
  category?: string;
}

const ICON_MAP: Record<string, string> = {
  pecho: 'icono_pecho.svg',
  espalda: 'icono_espalda.svg',
  hombros: 'icono_hombros.svg',
  brazos: 'icono_brazos.svg',
  legs: 'icono_legs.svg',
  cardio: 'icono_cardio.svg',
  cycling: 'icono_ciclismo.svg',
  crossfit: 'icono_crossfit.svg',
  fullbody: 'icono_fullbody.svg',
  meditation: 'icono_meditacion.svg',
  boxing: 'icono_boxeo.svg',
  custom: 'icono_personalizado.svg',
  calisthenics: 'icono_calistenia.svg',
};

const ExerciseIcon = ({ section, className = 'h-4 w-4' }: { section?: string; className?: string }) => {
  const normalizedSection = (section || '').toLowerCase().trim();
  const iconFile = ICON_MAP[normalizedSection] || 'icono_personalizado.svg';

  return (
    <img
      src={`/assets/icons/workouts/${iconFile}`}
      className={`${className} object-contain`}
      alt={section || 'exercise'}
    />
  );
};

interface WirCanvasPreviewProps {
  template: 'routine' | 'meal' | 'mixed';
  palette?: 'ember' | 'onyx' | 'midnight' | 'bloom';
  title: string;
  exercises: CanvasExercise[];
  foods: CanvasFood[];
  checkedItems?: Set<string>;
  onToggleItem?: (id: string) => void;
  isPreview?: boolean;
}

type CanvasTheme = {
  background: string;
  surface: string;
  mutedSurface: string;
  border: string;
  text: string;
  onSurface: string;
  mutedText: string;
  subtle: string;
  accent: string;
  accentSoft: string;
  noteBg: string;
  trackBg: string;
  glowFrom: string;
  glowTo: string;
};

const THEMES: Record<string, CanvasTheme> = {
  ember: {
    background: '#0c0c0e',
    surface: '#F1F0F4',
    mutedSurface: '#18181c',
    border: 'rgba(245,235,255,0.10)',
    text: '#0a0a0c',
    onSurface: '#F1F0F4',
    mutedText: '#6E6558',
    subtle: '#9CA0A6',
    accent: '#C85A1C',
    accentSoft: 'rgba(200,90,28,0.15)',
    noteBg: 'rgba(10,10,12,0.06)',
    trackBg: 'rgba(245,235,255,0.06)',
    glowFrom: 'rgba(200,90,28,0.08)',
    glowTo: 'rgba(138,47,20,0.12)',
  },
  onyx: {
    background: '#0A0A0A',
    surface: '#1A1A1A',
    mutedSurface: '#222222',
    border: 'rgba(255,255,255,0.08)',
    text: '#F0F0F0',
    onSurface: '#F0F0F0',
    mutedText: '#888888',
    subtle: '#6E6E6E',
    accent: '#7DF4FF',
    accentSoft: 'rgba(125,244,255,0.10)',
    noteBg: 'rgba(255,255,255,0.05)',
    trackBg: 'rgba(255,255,255,0.06)',
    glowFrom: 'rgba(125,244,255,0.05)',
    glowTo: 'rgba(0,180,200,0.08)',
  },
  midnight: {
    background: '#0C1425',
    surface: '#1A2744',
    mutedSurface: '#243152',
    border: 'rgba(255,255,255,0.06)',
    text: '#DEE6F0',
    onSurface: '#DEE6F0',
    mutedText: '#8899B4',
    subtle: '#6A7A95',
    accent: '#D4AF37',
    accentSoft: 'rgba(212,175,55,0.12)',
    noteBg: 'rgba(255,255,255,0.04)',
    trackBg: 'rgba(255,255,255,0.06)',
    glowFrom: 'rgba(212,175,55,0.06)',
    glowTo: 'rgba(100,80,20,0.10)',
  },
  bloom: {
    background: '#FDFBF7',
    surface: '#FFFFFF',
    mutedSurface: '#F5EDE0',
    border: 'rgba(10,10,12,0.12)',
    text: '#2A2520',
    onSurface: '#2A2520',
    mutedText: '#7A7163',
    subtle: '#A69A8A',
    accent: '#D65A4E',
    accentSoft: 'rgba(214,90,78,0.08)',
    noteBg: 'rgba(10,10,12,0.04)',
    trackBg: 'rgba(10,10,12,0.08)',
    glowFrom: 'rgba(214,90,78,0.04)',
    glowTo: 'rgba(180,70,60,0.06)',
  },
};

function getTheme(palette?: string): CanvasTheme {
  return THEMES[palette || 'ember'] || THEMES.ember;
}

const formatDisplayTitle = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return 'Untitled routine';
  if (trimmed === trimmed.toUpperCase()) {
    return trimmed.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
  }
  return trimmed;
};

export function WirCanvasPreview({
  template,
  palette,
  title,
  exercises,
  foods,
  checkedItems = new Set(),
  onToggleItem = () => {},
  isPreview = false,
}: WirCanvasPreviewProps) {
  const theme = getTheme(palette);
  const totalMacros = useMemo(() => {
    return foods.reduce((acc, food) => ({
      calories: acc.calories + (Number(food.calories) || 0),
      protein: acc.protein + (Number(food.protein) || 0),
    }), { calories: 0, protein: 0 });
  }, [foods]);

  const totalItems = exercises.length + foods.length;
  const progress = totalItems === 0 ? 0 : Math.round((checkedItems.size / totalItems) * 100);
  const totalSets = exercises.reduce((acc, ex) => acc + (Number(ex.sets) || 0), 0);

  const checkedExercises = exercises.filter((_, i) => checkedItems.has(`ex_${i}`)).length;
  const checkedFoods = foods.filter((_, i) => checkedItems.has(`food_${i}`)).length;
  const exProgress = exercises.length === 0 ? 0 : Math.round((checkedExercises / exercises.length) * 100);
  const foodProgress = foods.length === 0 ? 0 : Math.round((checkedFoods / foods.length) * 100);
  const displayTitle = formatDisplayTitle(title);
  const templateLabel = template === 'meal' ? 'Comida' : template === 'mixed' ? 'Mixto' : 'Rutina';
  const hasExercises = exercises.length > 0;
  const hasFoods = foods.length > 0;

  const itemVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.04 + i * 0.03, duration: 0.18 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full overflow-hidden rounded-[2rem] border shadow-[0_26px_70px_-46px_rgba(0,0,0,0.7)]"
      style={{ background: theme.background, borderColor: theme.border }}
    >
      <div className="border-b px-5 py-4" style={{ borderColor: theme.border, background: theme.mutedSurface }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-2xl" style={{ background: theme.background }}>
              <img src="/cyan.svg" alt="Fit Legacy Builder" className="h-full w-full object-cover opacity-80" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-['Big_Shoulders_Display',sans-serif] text-sm font-bold uppercase tracking-wide" style={{ color: theme.onSurface }}>Fit Legacy</p>
              <div className="flex items-center gap-1.5">
                <motion.span className="h-1.5 w-1.5 rounded-full" style={{ background: `${theme.accent}` }}
                  animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} />
                <span className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium" style={{ color: theme.subtle }}>Routine link</span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wider" style={{ background: theme.accentSoft, color: theme.accent, fontFamily: "'IBM Plex Mono', monospace" }}>
            {templateLabel}
          </div>
        </div>
      </div>

      <div className="relative px-5 py-6" style={{ background: theme.background }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(55% 30% at 85% 0%, ${theme.glowFrom}, transparent 60%), radial-gradient(40% 25% at 15% 100%, ${theme.glowTo}, transparent 60%)`
          }}
        />

        <div className="relative space-y-6">
          <div className="space-y-2">
            <h1 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-extrabold italic uppercase leading-tight tracking-tight" style={{ color: theme.onSurface }}>
              {displayTitle}
            </h1>
            <p className="font-['IBM_Plex_Mono',monospace] text-[11px] font-medium leading-relaxed" style={{ color: theme.subtle }}>
              Checklist para completar desde el navegador, sin instalar otra app.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {template === 'meal' ? (
              <>
                <StatCard label="Calorias" value={Math.round(totalMacros.calories)} unit="kcal" theme={theme} />
                <StatCard label="Proteina" value={Math.round(totalMacros.protein)} unit="g" theme={theme} />
              </>
            ) : template === 'mixed' ? (
              <>
                <StatCard label="Ejercicios" value={exercises.length} unit="items" theme={theme} />
                <StatCard label="Comidas" value={foods.length} unit="items" theme={theme} />
              </>
            ) : (
              <>
                <StatCard label="Ejercicios" value={exercises.length} unit="items" theme={theme} />
                <StatCard label="Series" value={totalSets} unit="total" theme={theme} />
              </>
            )}
          </div>

          {totalItems > 0 && (
            <div className="flex flex-col items-center gap-4">
              <ProgressRing
                progress={progress}
                total={totalItems}
                done={checkedItems.size}
                accent={theme.accent}
                theme={theme}
              />
              {(hasExercises && hasFoods) && (
                <div className="flex items-center gap-4">
                  {hasExercises && (
                    <MiniRing progress={exProgress} done={checkedExercises} total={exercises.length} label="Eje" accent={theme.accent} theme={theme} />
                  )}
                  {hasFoods && (
                    <MiniRing progress={foodProgress} done={checkedFoods} total={foods.length} label="Com" accent={theme.accent} theme={theme} />
                  )}
                </div>
              )}
            </div>
          )}

          <div className="space-y-5">
            {template === 'mixed' ? (
              <>
                {hasExercises && (
                  <ListSection title="Entrenamiento" items={exercises} type="ex" checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} theme={theme} />
                )}
                {hasFoods && (
                  <ListSection title="Comidas" items={foods} type="food" checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} theme={theme} />
                )}
              </>
            ) : (
              <>
                {hasExercises && (
                  <ListSection title="Ejercicios" items={exercises} type="ex" checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} theme={theme} />
                )}
                {hasFoods && (
                  <ListSection title="Comidas" items={foods} type="food" checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} theme={theme} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {!isPreview && (
        <div className="border-t px-5 py-4 text-center" style={{ borderColor: theme.border, background: theme.mutedSurface }}>
          <p className="font-['IBM_Plex_Mono',monospace] text-[11px] font-medium" style={{ color: theme.subtle }}>
            Marca cada item como hecho y volve al link cuando lo necesites.
          </p>
        </div>
      )}
    </motion.div>
  );
}

function StatCard({ label, value, unit, theme }: { label: string; value: string | number; unit: string; theme: CanvasTheme }) {
  return (
    <div className="rounded-[1.35rem] p-3" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
      <div className="mb-1">
        <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-medium uppercase tracking-wide" style={{ color: theme.mutedText }}>{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold leading-none" style={{ color: theme.text }}>{value}</span>
        <span className="font-['IBM_Plex_Mono',monospace] text-xs font-medium" style={{ color: theme.mutedText }}>{unit}</span>
      </div>
    </div>
  );
}

function ProgressRing({ progress, total, done, accent, theme }: { progress: number; total: number; done: number; accent: string; theme: CanvasTheme }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);
  const isComplete = progress >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative">
        <svg width="120" height="120" className="-rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" stroke={theme.trackBg} strokeWidth="6" />
          <motion.circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={accent}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${accent}55)` }}
          />
          {isComplete && (
            <motion.circle
              cx="60" cy="60" r={radius + 5}
              fill="none"
              stroke={accent}
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: [0, 0.4, 0], scale: [0.92, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={Math.round(progress)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold leading-none tracking-tight"
            style={{ color: isComplete ? accent : theme.onSurface }}
          >
            {Math.round(progress)}%
          </motion.span>
          <span className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium mt-0.5" style={{ color: theme.subtle }}>
            {done}/{total} items
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function MiniRing({ progress, done, total, label, accent, theme }: { progress: number; done: number; total: number; label: string; accent: string; theme: CanvasTheme }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-10 h-10">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r={radius} fill="none" stroke={theme.trackBg} strokeWidth="4" />
          <motion.circle
            cx="22" cy="22" r={radius}
            fill="none"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 4px ${accent}44)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-['Big_Shoulders_Display',sans-serif] text-[9px] font-extrabold leading-none" style={{ color: progress >= 100 ? accent : theme.onSurface }}>{Math.round(progress)}%</span>
        </div>
      </div>
      <span className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium uppercase tracking-wider" style={{ color: theme.mutedText }}>{done}/{total} {label}</span>
    </div>
  );
}

interface ListSectionProps {
  title: string;
  items: Array<CanvasExercise | CanvasFood>;
  type: 'ex' | 'food';
  checkedItems: Set<string>;
  onToggle: (id: string) => void;
  variants: any;
  theme: CanvasTheme;
}

function ListSection({ title, items, type, checkedItems, onToggle, variants, theme }: ListSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h2 className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-[0.12em]" style={{ color: theme.subtle }}>{title}</h2>

      <div className="space-y-2">
        {items.map((item, idx) => {
          const itemId = `${type}_${idx}`;
          const isDone = checkedItems.has(itemId);

          return (
            <motion.div
              layout
              key={itemId}
              custom={idx}
              variants={variants}
              initial="hidden"
              animate="visible"
              onClick={() => onToggle(itemId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggle(itemId);
                }
              }}
              tabIndex={0}
              role="checkbox"
              aria-checked={isDone}
              transition={{ layout: { type: 'spring', stiffness: 400, damping: 28 } }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer rounded-[1.35rem] p-3 outline-none transition-all hover:-translate-y-0.5 active:scale-[0.99] focus-visible:ring-2"
              style={{
                background: isDone ? `${theme.accentSoft}` : theme.surface,
                border: isDone ? `1px solid ${theme.accent}44` : `1px solid ${theme.border}`,
                outlineColor: `${theme.accent}66`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border-2 transition-all"
                  style={{
                    borderColor: isDone ? theme.accent : theme.mutedText,
                    background: isDone ? theme.accent : 'transparent',
                  }}
                >
                  <AnimatePresence>
                    {isDone && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="text-[11px] font-black leading-none text-white"
                      >
                        ✓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {type === 'food' ? (
                      <FoodIcon category={(item as CanvasFood).category} name={item.name} />
                    ) : (
                      <ExerciseIcon section={(item as CanvasExercise).section} />
                    )}
                    <p className={`truncate font-['Big_Shoulders_Display',sans-serif] text-sm font-bold uppercase tracking-tight ${isDone ? 'line-through' : ''}`}
                      style={{ color: isDone ? theme.mutedText : theme.text }}>
                      {item.name}
                    </p>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-1.5 font-['IBM_Plex_Mono',monospace] text-[10px] font-medium" style={{ color: theme.mutedText }}>
                    {type === 'ex' ? (
                      <>
                        <span>{(item as CanvasExercise).sets} sets</span>
                        <span>{(item as CanvasExercise).reps} reps</span>
                        {(item as CanvasExercise).weight > 0 && <span>{(item as CanvasExercise).weight} kg</span>}
                      </>
                    ) : (
                      <>
                        <span>{(item as CanvasFood).quantity} g</span>
                        <span>{(item as CanvasFood).calories} kcal</span>
                        <span>{(item as CanvasFood).protein} g protein</span>
                      </>
                    )}
                  </div>

                  {item.notes && (
                    <div className="mt-2 flex items-start gap-2 rounded-2xl px-3 py-2 text-xs font-medium leading-relaxed"
                      style={{ background: theme.noteBg, color: theme.mutedText }}>
                      <span className="mt-0.5 shrink-0 opacity-50">✎</span>
                      <p>{item.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
