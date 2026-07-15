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
  palette?: 'clean' | 'mist' | 'navy' | 'forest' | 'ember';
  title: string;
  exercises: CanvasExercise[];
  foods: CanvasFood[];
  checkedItems?: Set<string>;
  onToggleItem?: (id: string) => void;
  isPreview?: boolean;
}

const THEME = {
  background: '#16130F',
  surface: '#FAF5EC',
  mutedSurface: '#1E1912',
  border: 'rgba(250,245,236,0.10)',
  text: '#1E1A16',
  mutedText: '#6E6558',
  accent: '#E0793C',
  accentSoft: 'rgba(224,121,60,0.12)',
} as const;

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
  title,
  exercises,
  foods,
  checkedItems = new Set(),
  onToggleItem = () => {},
  isPreview = false,
}: WirCanvasPreviewProps) {
  const totalMacros = useMemo(() => {
    return foods.reduce((acc, food) => ({
      calories: acc.calories + (Number(food.calories) || 0),
      protein: acc.protein + (Number(food.protein) || 0),
    }), { calories: 0, protein: 0 });
  }, [foods]);

  const totalItems = exercises.length + foods.length;
  const progress = totalItems === 0 ? 0 : Math.round((checkedItems.size / totalItems) * 100);
  const totalSets = exercises.reduce((acc, ex) => acc + (Number(ex.sets) || 0), 0);
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
      style={{ background: THEME.background, borderColor: THEME.border }}
    >
      <div className="border-b px-5 py-4" style={{ borderColor: THEME.border, background: THEME.mutedSurface }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-2xl" style={{ background: THEME.background }}>
              <img src="/icons/fit-legacy-mark.svg" alt="Fit Legacy" className="h-full w-full object-cover opacity-80" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-['Big_Shoulders_Display',sans-serif] text-sm font-bold uppercase tracking-wide" style={{ color: '#FAF5EC' }}>Fit Legacy</p>
              <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium" style={{ color: '#A79A87' }}>Routine link</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wider bg-[#E0793C]/15 text-[#E0793C]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {templateLabel}
          </div>
        </div>
      </div>

      <div className="relative px-5 py-6" style={{ background: THEME.background }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(55% 30% at 85% 0%, rgba(224,121,60,0.06), transparent 60%), radial-gradient(40% 25% at 15% 100%, rgba(138,47,20,0.08), transparent 60%)'
          }}
        />

        <div className="relative space-y-6">
          <div className="space-y-2">
            <h1 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-extrabold italic uppercase leading-tight tracking-tight text-[#FAF5EC]">
              {displayTitle}
            </h1>
            <p className="font-['IBM_Plex_Mono',monospace] text-[11px] font-medium leading-relaxed text-[#A79A87]">
              Checklist para completar desde el navegador, sin instalar otra app.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {template === 'meal' ? (
              <>
                <StatCard label="Calorias" value={Math.round(totalMacros.calories)} unit="kcal" />
                <StatCard label="Proteina" value={Math.round(totalMacros.protein)} unit="g" />
              </>
            ) : template === 'mixed' ? (
              <>
                <StatCard label="Ejercicios" value={exercises.length} unit="items" />
                <StatCard label="Comidas" value={foods.length} unit="items" />
              </>
            ) : (
              <>
                <StatCard label="Ejercicios" value={exercises.length} unit="items" />
                <StatCard label="Series" value={totalSets} unit="total" />
              </>
            )}
          </div>

          {totalItems > 0 && (
            <div className="rounded-[1.35rem] p-4" style={{ background: 'rgba(30,25,18,0.6)', border: '1px solid rgba(250,245,236,0.06)' }}>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-wide text-[#A79A87]">Progreso</span>
                <span className="font-['Big_Shoulders_Display',sans-serif] text-sm font-bold text-[#E0793C]">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full" style={{ background: 'rgba(250,245,236,0.06)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35 }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #E0793C, #F2A468, #8A2F14)' }}
                />
              </div>
            </div>
          )}

          <div className="space-y-5">
            {template === 'mixed' ? (
              <>
                {hasExercises && (
                  <ListSection title="Entrenamiento" items={exercises} type="ex" checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
                )}
                {hasFoods && (
                  <ListSection title="Comidas" items={foods} type="food" checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
                )}
              </>
            ) : (
              <>
                {hasExercises && (
                  <ListSection title="Ejercicios" items={exercises} type="ex" checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
                )}
                {hasFoods && (
                  <ListSection title="Comidas" items={foods} type="food" checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {!isPreview && (
        <div className="border-t px-5 py-4 text-center" style={{ borderColor: THEME.border, background: THEME.mutedSurface }}>
          <p className="font-['IBM_Plex_Mono',monospace] text-[11px] font-medium text-[#A79A87]">
            Marca cada item como hecho y volve al link cuando lo necesites.
          </p>
        </div>
      )}
    </motion.div>
  );
}

function StatCard({ label, value, unit }: { label: string; value: string | number; unit: string }) {
  return (
    <div className="rounded-[1.35rem] p-3" style={{ background: THEME.surface, border: '1px solid rgba(250,245,236,0.15)' }}>
      <div className="mb-1">
        <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-medium uppercase tracking-wide text-[#6E6558]">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-bold leading-none text-[#1E1A16]">{value}</span>
        <span className="font-['IBM_Plex_Mono',monospace] text-xs font-medium text-[#6E6558]">{unit}</span>
      </div>
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
}

function ListSection({ title, items, type, checkedItems, onToggle, variants }: ListSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h2 className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-[0.12em] text-[#A79A87]">{title}</h2>

      <div className="space-y-2">
        {items.map((item, idx) => {
          const itemId = `${type}_${idx}`;
          const isDone = checkedItems.has(itemId);

          return (
            <motion.div
              key={itemId}
              custom={idx}
              variants={variants}
              initial="hidden"
              animate="visible"
              onClick={() => onToggle(itemId)}
              onKeyDown={(e) => e.key === 'Enter' && onToggle(itemId)}
              tabIndex={0}
              role="checkbox"
              aria-checked={isDone}
              className="cursor-pointer rounded-[1.35rem] p-3 outline-none transition-all hover:-translate-y-0.5 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#E0793C]/40"
              style={{
                background: isDone ? 'rgba(224,121,60,0.06)' : THEME.surface,
                border: isDone ? '1px solid rgba(224,121,60,0.2)' : '1px solid rgba(250,245,236,0.15)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border-2 transition-all"
                  style={{
                    borderColor: isDone ? '#E0793C' : '#6E6558',
                    background: isDone ? '#E0793C' : 'transparent',
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
                      style={{ color: isDone ? '#6E6558' : '#1E1A16' }}>
                      {item.name}
                    </p>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-1.5 font-['IBM_Plex_Mono',monospace] text-[10px] font-medium text-[#6E6558]">
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
                      style={{ background: 'rgba(30,25,18,0.08)', color: '#6E6558' }}>
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
