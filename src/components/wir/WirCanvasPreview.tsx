import { useMemo } from 'react';
import { Dumbbell, Apple, Check, Target, Activity, MessageSquare } from 'lucide-react';
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

type PreviewTheme = {
  background: string;
  surface: string;
  mutedSurface: string;
  border: string;
  text: string;
  mutedText: string;
  accent: string;
  accentSoft: string;
};

const themes: Record<'clean' | 'mist' | 'navy' | 'forest' | 'ember' | 'routine' | 'meal' | 'mixed', PreviewTheme> = {
  clean: {
    background: '#f5f7fb',
    surface: '#ffffff',
    mutedSurface: '#eef3f8',
    border: '#d9e3ee',
    text: '#172033',
    mutedText: '#647083',
    accent: '#254667',
    accentSoft: '#e6eef7',
  },
  mist: {
    background: '#edf6fb',
    surface: '#ffffff',
    mutedSurface: '#e1eef7',
    border: '#c6d9e8',
    text: '#14283b',
    mutedText: '#607386',
    accent: '#2f5f8f',
    accentSoft: '#e1eef9',
  },
  navy: {
    background: '#eef3f8',
    surface: '#ffffff',
    mutedSurface: '#e4ecf5',
    border: '#cbd8e8',
    text: '#101827',
    mutedText: '#5d6b7d',
    accent: '#275f96',
    accentSoft: '#e0edf8',
  },
  forest: {
    background: '#eff8f1',
    surface: '#ffffff',
    mutedSurface: '#e2f0e6',
    border: '#c6dfce',
    text: '#14241a',
    mutedText: '#637466',
    accent: '#28623a',
    accentSoft: '#e2f0e6',
  },
  ember: {
    background: '#fff4ef',
    surface: '#ffffff',
    mutedSurface: '#f8e5dc',
    border: '#edcaba',
    text: '#2a1813',
    mutedText: '#80685f',
    accent: '#a84f36',
    accentSoft: '#f7e3da',
  },
  routine: {
    background: '#f6f7fb',
    surface: '#ffffff',
    mutedSurface: '#edf1f6',
    border: '#dbe3ee',
    text: '#141e30',
    mutedText: '#657184',
    accent: '#35577d',
    accentSoft: '#e6edf5',
  },
  meal: {
    background: '#f1f8f3',
    surface: '#ffffff',
    mutedSurface: '#e5f1e8',
    border: '#cfe3d4',
    text: '#14231a',
    mutedText: '#657568',
    accent: '#28623a',
    accentSoft: '#e3f0e7',
  },
  mixed: {
    background: '#f4f7fb',
    surface: '#ffffff',
    mutedSurface: '#e9eff6',
    border: '#d5e0ec',
    text: '#142033',
    mutedText: '#637083',
    accent: '#315f8e',
    accentSoft: '#e4eef8',
  },
};

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
  const totalMacros = useMemo(() => {
    return foods.reduce((acc, food) => ({
      calories: acc.calories + (Number(food.calories) || 0),
      protein: acc.protein + (Number(food.protein) || 0),
    }), { calories: 0, protein: 0 });
  }, [foods]);

  const totalItems = exercises.length + foods.length;
  const progress = totalItems === 0 ? 0 : Math.round((checkedItems.size / totalItems) * 100);
  const totalSets = exercises.reduce((acc, ex) => acc + (Number(ex.sets) || 0), 0);
  const theme = palette ? themes[palette] : themes[template];
  const displayTitle = formatDisplayTitle(title);
  const templateLabel = template === 'meal' ? 'Comida' : template === 'mixed' ? 'Mixto' : 'Rutina';
  const templateIcon = template === 'meal' ? <Apple className="h-4 w-4" /> : <Dumbbell className="h-4 w-4" />;

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
      className="w-full overflow-hidden rounded-3xl border shadow-[0_20px_55px_-35px_rgba(20,30,48,0.45)]"
      style={{ background: theme.background, borderColor: theme.border, color: theme.text }}
    >
      <div className="border-b px-5 py-4" style={{ borderColor: theme.border, background: theme.surface }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border" style={{ borderColor: theme.border, background: theme.mutedSurface }}>
              <img src="/icons/fit-legacy-mark.svg" alt="Fit Legacy" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-extrabold uppercase tracking-wide" style={{ color: theme.text }}>Fit Legacy</p>
              <p className="text-[10px] font-bold" style={{ color: theme.mutedText }}>Routine link</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-extrabold" style={{ background: theme.accentSoft, color: theme.accent }}>
            {templateIcon}
            {templateLabel}
          </div>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold leading-tight tracking-normal" style={{ color: theme.text }}>
            {displayTitle}
          </h1>
          <p className="text-sm font-semibold leading-relaxed" style={{ color: theme.mutedText }}>
            Checklist para completar desde el navegador, sin instalar otra app.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {template === 'meal' ? (
            <>
              <StatCard label="Calorias" value={Math.round(totalMacros.calories)} unit="kcal" icon={<Activity size={14} />} theme={theme} />
              <StatCard label="Proteina" value={Math.round(totalMacros.protein)} unit="g" icon={<Target size={14} />} theme={theme} />
            </>
          ) : template === 'mixed' ? (
            <>
              <StatCard label="Ejercicios" value={exercises.length} unit="items" icon={<Dumbbell size={14} />} theme={theme} />
              <StatCard label="Comidas" value={foods.length} unit="items" icon={<Apple size={14} />} theme={theme} />
            </>
          ) : (
            <>
              <StatCard label="Ejercicios" value={exercises.length} unit="items" icon={<Dumbbell size={14} />} theme={theme} />
              <StatCard label="Series" value={totalSets} unit="total" icon={<Target size={14} />} theme={theme} />
            </>
          )}
        </div>

        <div className="rounded-2xl border p-4" style={{ borderColor: theme.border, background: theme.surface }}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wide" style={{ color: theme.mutedText }}>Progreso</span>
            <span className="text-sm font-extrabold" style={{ color: theme.accent }}>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full" style={{ background: theme.mutedSurface }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
              className="h-full rounded-full"
              style={{ background: theme.accent }}
            />
          </div>
        </div>

        <div className="space-y-5">
          {template === 'mixed' ? (
            <>
              <ListSection title="Entrenamiento" icon={<Dumbbell size={17} />} items={exercises} type="ex" theme={theme} checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
              <ListSection title="Comidas" icon={<Apple size={17} />} items={foods} type="food" theme={theme} checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
            </>
          ) : (
            <>
              {exercises.length > 0 && (
                <ListSection title="Ejercicios" icon={<Dumbbell size={17} />} items={exercises} type="ex" theme={theme} checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
              )}
              {foods.length > 0 && (
                <ListSection title="Comidas" icon={<Apple size={17} />} items={foods} type="food" theme={theme} checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
              )}
            </>
          )}
        </div>
      </div>

      {!isPreview && (
        <div className="border-t px-5 py-4 text-center text-[11px] font-semibold" style={{ borderColor: theme.border, background: theme.surface, color: theme.mutedText }}>
          Marca cada item como hecho y volve al link cuando lo necesites.
        </div>
      )}
    </motion.div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  theme: PreviewTheme;
}

function StatCard({ label, value, unit, icon, theme }: StatCardProps) {
  return (
    <div className="rounded-2xl border p-3" style={{ borderColor: theme.border, background: theme.surface }}>
      <div className="mb-2 flex items-center gap-2" style={{ color: theme.accent }}>
        {icon}
        <span className="text-[10px] font-extrabold uppercase tracking-wide" style={{ color: theme.mutedText }}>{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-extrabold leading-none" style={{ color: theme.text }}>{value}</span>
        <span className="text-xs font-bold" style={{ color: theme.mutedText }}>{unit}</span>
      </div>
    </div>
  );
}

interface ListSectionProps {
  title: string;
  icon: React.ReactNode;
  items: Array<CanvasExercise | CanvasFood>;
  type: 'ex' | 'food';
  theme: PreviewTheme;
  checkedItems: Set<string>;
  onToggle: (id: string) => void;
  variants: any;
}

function ListSection({ title, icon, items, type, theme, checkedItems, onToggle, variants }: ListSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: theme.accentSoft, color: theme.accent }}>
          {icon}
        </div>
        <h2 className="text-sm font-extrabold uppercase tracking-wide" style={{ color: theme.text }}>{title}</h2>
      </div>

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
              className="cursor-pointer rounded-2xl border p-3 outline-none transition-transform active:scale-[0.99] focus-visible:ring-2"
              style={{
                borderColor: isDone ? '#9bd2b0' : theme.border,
                background: isDone ? '#eef9f1' : theme.surface,
                color: theme.text,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2"
                  style={{
                    borderColor: isDone ? '#2f9d55' : theme.border,
                    background: isDone ? '#2f9d55' : theme.mutedSurface,
                  }}
                >
                  <AnimatePresence>
                    {isDone && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="h-4 w-4 text-white stroke-[4]" />
                      </motion.div>
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
                    <p className={`truncate text-sm font-extrabold ${isDone ? 'line-through' : ''}`} style={{ color: isDone ? theme.mutedText : theme.text }}>
                      {item.name}
                    </p>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] font-bold" style={{ color: theme.mutedText }}>
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
                    <div className="mt-2 flex items-start gap-2 rounded-xl px-3 py-2 text-xs font-semibold leading-relaxed" style={{ background: theme.mutedSurface, color: theme.mutedText }}>
                      <MessageSquare size={13} className="mt-0.5 shrink-0" style={{ color: theme.accent }} />
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
