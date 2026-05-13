import { useMemo } from 'react';
import { Dumbbell, Apple, Check, Zap, Target, Activity, MessageSquare } from 'lucide-react';
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
  calisthenics: 'icono_calistenia.svg'
};

const ExerciseIcon = ({ section, className = "w-4 h-4" }: { section?: string, className?: string }) => {
  const normalizedSection = (section || '').toLowerCase().trim();
  const iconFile = ICON_MAP[normalizedSection] || 'icono_personalizado.svg';
  return (
    <img 
      src={`/assets/icons/workouts/${iconFile}`} 
      className={`${className} object-contain`} 
      alt={section || 'ejercicio'}
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

/**
 * WirCanvasPreview: Renderiza el canvas predefinido exacto que ve el receptor
 * Con estética Neural UI, Glassmorphism y animaciones de alto nivel.
 */
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

  const getProgress = () => {
    const total = exercises.length + foods.length;
    if (total === 0) return 0;
    return Math.round((checkedItems.size / total) * 100);
  };

  const progress = getProgress();

  const paletteOverrides: Record<'clean' | 'mist' | 'navy' | 'forest' | 'ember', {
    appBgStyle: string;
    accent: string;
    border: string;
  }> = {
    clean: {
      appBgStyle: 'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.96), rgba(243,246,252,0.92) 48%, rgba(231,238,247,0.9) 100%)',
      accent: '#254667',
      border: 'border-[#cfdced]',
    },
    mist: {
      appBgStyle: 'linear-gradient(145deg, #f8fcff 0%, #dceaf7 45%, #c6dbf0 100%)',
      accent: '#2f5f8f',
      border: 'border-[#bdd3e7]',
    },
    navy: {
      appBgStyle: 'linear-gradient(145deg, #0f1a2c 0%, #1f3f66 52%, #2f5f8f 100%)',
      accent: '#9fd1ff',
      border: 'border-[#2f5f8d]/45',
    },
    forest: {
      appBgStyle: 'linear-gradient(145deg, #ecfaf0 0%, #d8efdf 45%, #c2e4cf 100%)',
      accent: '#28623a',
      border: 'border-[#8dc4a1]/40',
    },
    ember: {
      appBgStyle: 'linear-gradient(145deg, #fff4f1 0%, #ffdcd2 45%, #ffc2b2 100%)',
      accent: '#b14f39',
      border: 'border-[#f0b29f]/45',
    },
  };

  // Color schemes per template with deep neural aesthetics
  const templateScheme = template === 'meal'
    ? {
        appBg: 'bg-[#050a07]',
        accent: '#52b06a',
        accentGlow: 'rgba(82, 176, 106, 0.15)',
        border: 'border-[#28623a]/30',
      }
    : template === 'mixed'
      ? {
          appBg: 'bg-[#080a10]',
          accent: '#4ba3ff',
          accentGlow: 'rgba(75, 163, 255, 0.16)',
          border: 'border-[#2f5f8d]/35',
        }
      : {
          appBg: 'bg-[#0a0a0a]',
          accent: '#E8873A',
          accentGlow: 'rgba(232, 135, 58, 0.15)',
          border: 'border-white/10',
        };

  const paletteTheme = palette ? paletteOverrides[palette] : null;

  const colorScheme = {
    appBg: templateScheme.appBg,
    accent: paletteTheme?.accent || templateScheme.accent,
    accentGlow: templateScheme.accentGlow,
    border: paletteTheme?.border || templateScheme.border,
  };

  const containerStyle = paletteTheme
    ? { background: paletteTheme.appBgStyle }
    : undefined;

  const templateLabel = template === 'meal' ? 'COMIDA' : template === 'mixed' ? 'MIXTO' : 'RUTINA';
  const templateIcon = template === 'meal' ? <Apple className="w-3.5 h-3.5" /> : <Dumbbell className="w-3.5 h-3.5" />;

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.05, duration: 0.3 }
    })
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`relative ${colorScheme.appBg} ${colorScheme.border} border text-white font-sans w-full rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl`}
      style={containerStyle}
    >
      {/* Neural Scan Line Effect */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute left-0 right-0 h-[2px] z-50 pointer-events-none opacity-20"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${colorScheme.accent}, transparent)`,
          boxShadow: `0 0 15px ${colorScheme.accent}`
        }}
      />

      {/* Dynamic Background Glow */}
      <div 
        className="absolute -top-[10%] -right-[10%] w-[50%] h-[40%] blur-[100px] rounded-full pointer-events-none opacity-20"
        style={{ background: colorScheme.accent }}
      />
      
      {/* Header Overlay (Glass) */}
      <div className={`relative z-10 px-6 pt-6 pb-4 flex items-center justify-between border-b ${colorScheme.border} bg-white/[0.02] backdrop-blur-md`}>
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/15 bg-black/40">
            <img src="/icons/fit-legacy-mark.svg" alt="Fit Legacy" className="w-full h-full object-cover" />
          </div>
          <span className="font-brand-display font-black text-xs tracking-[0.2em] uppercase opacity-80">FitLegacy .WIR</span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <span style={{ color: colorScheme.accent }}>{templateIcon}</span>
          <span className="text-[10px] font-bold tracking-wider">{templateLabel}</span>
        </div>
      </div>

      {/* Hero / Stats Section */}
      <div className="relative z-10 p-6 space-y-6">
        <div className="space-y-1">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-brand-display text-3xl font-black italic tracking-tight leading-none"
          >
            {title || 'ENTRENAMIENTO'}
          </motion.h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">
            Sesión de entrenamiento activa
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {template === 'meal' ? (
            <>
              <StatCard label="Calorías" value={Math.round(totalMacros.calories)} unit="kcal" icon={<Activity size={12} />} color={colorScheme.accent} />
              <StatCard label="Proteína" value={Math.round(totalMacros.protein)} unit="g" icon={<Target size={12} />} color={colorScheme.accent} />
            </>
          ) : template === 'mixed' ? (
            <>
              <StatCard label="Volumen" value={exercises.length} unit="ex" icon={<Dumbbell size={12} />} color={colorScheme.accent} />
              <StatCard label="Nutrición" value={foods.length} unit="items" icon={<Apple size={12} />} color={colorScheme.accent} />
              <StatCard label="Energía" value={Math.round(totalMacros.calories)} unit="kcal" icon={<Zap size={12} />} color={colorScheme.accent} />
            </>
          ) : (
            <>
              <StatCard label="Ejercicios" value={exercises.length} unit="total" icon={<Dumbbell size={12} />} color={colorScheme.accent} />
              <StatCard label="Sets Est." value={exercises.reduce((acc, ex) => acc + (Number(ex.sets) || 0), 0)} unit="series" icon={<Target size={12} />} color={colorScheme.accent} />
            </>
          )}
        </div>

        {/* Progress System */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Progreso Total</span>
            <span className="font-brand-display text-sm font-black italic" style={{ color: colorScheme.accent }}>{progress}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "circOut" }}
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: colorScheme.accent }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`relative z-10 px-6 pb-8 space-y-8`}>
        {template === 'mixed' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ListSection title="Entrenamiento" icon={<Dumbbell size={18} />} items={exercises} type="ex" color={colorScheme.accent} checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
            <ListSection title="Nutrición" icon={<Apple size={18} />} items={foods} type="food" color={colorScheme.accent} checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
          </div>
        ) : (
          <div className="space-y-8">
            {exercises.length > 0 && (
              <ListSection title={template === 'meal' ? 'Carga de Trabajo' : 'Ejercicios'} icon={<Dumbbell size={18} />} items={exercises} type="ex" color={colorScheme.accent} checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
            )}
            {foods.length > 0 && (
              <ListSection title="Plan Nutricional" icon={<Apple size={18} />} items={foods} type="food" color={colorScheme.accent} checkedItems={checkedItems} onToggle={onToggleItem} variants={itemVariants} />
            )}
          </div>
        )}
      </div>

      {/* Decorative Footer */}
      {!isPreview && (
        <div className="relative z-10 px-8 py-6 border-t border-white/5 bg-white/[0.01] text-center">
          <p className="text-[10px] opacity-30 italic font-medium max-w-[280px] mx-auto">
            {template === 'meal'
              ? 'LA CONSISTENCIA NUTRICIONAL ES EL CIMIENTO DEL RENDIMIENTO.'
              : template === 'mixed'
                ? 'CADA SERIE Y CADA COMIDA SON PIEDRAS EN TU LEGADO.'
                : 'LA DISCIPLINA SUPERA AL TALENTO CUANDO EL TALENTO NO SE ENTRENA.'}
          </p>
        </div>
      )}
    </motion.div>
  );
}

/**
 * StatCard Sub-component
 */
interface StatCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ label, value, unit, icon, color }: StatCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5 p-3 hover:bg-white/[0.06] transition-colors">
      <div className="flex items-center gap-2 mb-1">
        <span style={{ color }}>{icon}</span>
        <span className="text-[8px] uppercase font-bold tracking-widest opacity-40">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-brand-display text-xl font-black tracking-tighter">{value}</span>
        <span className="text-[10px] font-bold opacity-30">{unit}</span>
      </div>
    </div>
  );
}

/**
 * ListSection Sub-component
 */
interface ListSectionProps {
  title: string;
  icon: React.ReactNode;
  items: any[];
  type: 'ex' | 'food';
  color: string;
  checkedItems: Set<string>;
  onToggle: (id: string) => void;
  variants: any;
}

function ListSection({ title, icon, items, type, color, checkedItems, onToggle, variants }: ListSectionProps) {
  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10" style={{ color }}>
            {icon}
          </div>
          <h2 className="font-brand-display text-sm font-black uppercase tracking-widest opacity-90">{title}</h2>
        </div>
        <div className="p-8 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center opacity-20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-center">Esperando nueva rutina...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10" style={{ color }}>
          {icon}
        </div>
        <h2 className="font-brand-display text-sm font-black uppercase tracking-widest opacity-90">{title}</h2>
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
              onClick={() => onToggle(itemId)}
              onKeyDown={(e) => e.key === 'Enter' && onToggle(itemId)}
              tabIndex={0}
              role="checkbox"
              aria-checked={isDone}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`group flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all border outline-none focus-visible:ring-1 focus-visible:ring-white/20 ${
                isDone 
                ? 'bg-emerald-500/5 border-emerald-500/20 opacity-50' 
                : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
              }`}
            >
              {/* Checkbox Neural */}
              <div 
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  isDone 
                  ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                  : 'border-white/10 group-hover:border-white/30'
                }`}
              >
                <AnimatePresence>
                  {isDone && (
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 text-black stroke-[4]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {type === 'food' ? (
                    <FoodIcon category={(item as any).category} name={item.name} />
                  ) : (
                    <ExerciseIcon section={(item as any).section} />
                  )}
                  <p className={`text-sm font-bold truncate transition-all ${isDone ? 'line-through opacity-50' : ''}`}>
                    {item.name}
                  </p>
                </div>
                <div className="flex gap-2 text-[10px] font-bold opacity-40">
                  {type === 'ex' ? (
                    <>
                      <span>{item.sets} SETS</span>
                      <span>·</span>
                      <span>{item.reps} REPS</span>
                      {item.weight > 0 && (
                        <>
                          <span>·</span>
                          <span style={{ color }}>{item.weight}KG</span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <span>{item.quantity}G</span>
                      <span>·</span>
                      <span>{item.calories}KCAL</span>
                    </>
                  )}
                </div>
              </div>

              {/* Notes display */}
              {item.notes && (
                <div className="mt-2 ml-10 flex items-start gap-2 opacity-60">
                  <MessageSquare size={10} className="mt-0.5 shrink-0" style={{ color }} />
                  <p className="text-[9px] leading-tight italic">{item.notes}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

