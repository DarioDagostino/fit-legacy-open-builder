import { lazy, Suspense, useState, useMemo, useEffect, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Dumbbell, 
  Trash2, 
  Plus, 
  Share2, 
  Image as ImageIcon,
  Minus,
  Apple,
  Palette,
  X,
  Ghost,
  Menu,
  MessageCircle
} from 'lucide-react';
import { UNIFIED_EXERCISES, UNIFIED_FOODS } from '@fit-legacy/shared';
import { useWorkoutStore } from '../../lib/store';
import { toast } from 'sonner';

const WirCanvasPreview = lazy(() =>
  import('../wir/WirCanvasPreview').then((module) => ({ default: module.WirCanvasPreview }))
);

type FoodIconProps = {
  category: string;
  name?: string;
  className?: string;
};

let cachedFoodIconRenderer: ComponentType<FoodIconProps> | null = null;
let foodIconRendererPromise: Promise<ComponentType<FoodIconProps>> | null = null;

function loadFoodIconRenderer() {
  if (!foodIconRendererPromise) {
    foodIconRendererPromise = import('./FoodIconRenderer').then((module) => {
      cachedFoodIconRenderer = module.FoodIconRenderer;
      return module.FoodIconRenderer;
    });
  }
  return foodIconRendererPromise;
}

type TabType = 'catalog' | 'food' | 'build' | 'export';

const CUSTOMIZE_KEY = 'catalog-customize-config';
const CATALOG_BG_PRESETS = [
  {
    id: 'clean',
    label: 'Clean',
    style: {
      background: 'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.96), rgba(243,246,252,0.92) 48%, rgba(231,238,247,0.9) 100%)',
    },
  },
  {
    id: 'mist',
    label: 'Mist',
    style: {
      background: 'linear-gradient(145deg, #f8fcff 0%, #dceaf7 45%, #c6dbf0 100%)',
    },
  },
  {
    id: 'navy',
    label: 'Navy',
    style: {
      background: 'linear-gradient(145deg, #0f1a2c 0%, #1f3f66 52%, #2f5f8f 100%)',
    },
  },
  {
    id: 'forest',
    label: 'Forest',
    style: {
      background: 'linear-gradient(145deg, #ecfaf0 0%, #d8efdf 45%, #c2e4cf 100%)',
    },
  },
  {
    id: 'ember',
    label: 'Ember',
    style: {
      background: 'linear-gradient(145deg, #fff4f1 0%, #ffdcd2 45%, #ffc2b2 100%)',
    },
  },
];

const FILTER_LABELS: Record<string, string> = {
  all: 'Todo',
  chest: 'Pecho',
  back: 'Espalda',
  legs: 'Piernas',
  shoulders: 'Hombros',
  arms: 'Brazos',
  core: 'Core',
  cardio: 'Cardio',
  boxing: 'Boxeo',
  calisthenics: 'Calistenia',
  cycling: 'Ciclismo',
  crossfit: 'Crossfit',
  meditation: 'Meditacion',
  custom: 'Personalizado',
  protein: 'Proteínas',
  carbs: 'Carbs',
  fats: 'Grasas',
  fruits: 'Frutas',
  vegetables: 'Verduras',
};

function normalizeFilterId(value?: string) {
  const normalized = (value || '').toLowerCase().trim();
  if (normalized === 'fruit') return 'fruits';
  if (normalized === 'vegetable') return 'vegetables';
  return normalized;
}

// Exercise Icon Mapping
const ICON_MAP: Record<string, string> = {
  chest: 'icono_pecho.svg',
  back: 'icono_espalda.svg',
  legs: 'icono_legs.svg',
  shoulders: 'icono_hombros.svg',
  arms: 'icono_brazos.svg',
  core: 'icono_calistenia.svg',
  cardio: 'icono_cardio.svg',
  cycling: 'icono_ciclismo.svg',
  crossfit: 'icono_crossfit.svg',
  fullbody: 'icono_fullbody.svg',
  meditation: 'icono_meditacion.svg',
  boxing: 'icono_boxeo.svg',
  custom: 'icono_personalizado.svg',
  calisthenics: 'icono_calistenia.svg'
};

const ExerciseIcon = ({ section, className = "w-10 h-10" }: { section: string, className?: string }) => {
  const iconFile = ICON_MAP[section.toLowerCase()] || 'icono_personalizado.svg';
  return (
    <img 
      src={`/assets/icons/workouts/${iconFile}`} 
      alt={`Icono de ${section}`} 
      className={`${className} object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]`} 
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/assets/icons/workouts/icono_personalizado.svg';
      }}
    />
  );
};

const FoodIcon = ({ category, name = '', className = 'w-6 h-6' }: FoodIconProps) => {
  const [Renderer, setRenderer] = useState<ComponentType<FoodIconProps> | null>(() => cachedFoodIconRenderer);

  useEffect(() => {
    if (Renderer) return;
    let active = true;
    loadFoodIconRenderer().then((loaded) => {
      if (active) {
        setRenderer(() => loaded);
      }
    });
    return () => {
      active = false;
    };
  }, [Renderer]);

  if (!Renderer) {
    return <span className={`${className} flex items-center justify-center text-lg`}>🍽️</span>;
  }

  return <Renderer category={category} name={name} className={className} />;
};

export default function MobileFirstBuilder() {
  const donationUrl = import.meta.env.VITE_MP_DONATION_URL as string | undefined;
  const hasValidDonationUrl = !!donationUrl && /^https?:\/\//i.test(donationUrl);

  const { 
    currentRoutine, 
    builderMode,
    setBuilderMode,
    addExercise, 
    removeExercise, 
    updateExercise, 
    addFood,
    removeFood,
    updateFood,
    updateRoutineName,
    getShareableLink,
    loadRoutine 
  } = useWorkoutStore();

  const [activeTab, setActiveTab] = useState<TabType>('catalog');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [customExerciseName, setCustomExerciseName] = useState('');
  const [customSeries, setCustomSeries] = useState(3);
  const [customReps, setCustomReps] = useState(10);
  const [customWeight, setCustomWeight] = useState(0);
  const [showCustomize, setShowCustomize] = useState(false);
  const [catalogLogo, setCatalogLogo] = useState<string | null>(null);
  const [catalogBgId, setCatalogBgId] = useState<string>('clean');
  const [catalogBgImage, setCatalogBgImage] = useState<string | null>(null);

  const workoutFilters = useMemo(() => {
    return [
      { id: 'all', label: FILTER_LABELS.all },
      ...Object.keys(UNIFIED_EXERCISES).map((id) => ({
        id,
        label: FILTER_LABELS[id] || id,
      })),
    ];
  }, []);

  const foodFilters = useMemo(() => {
    return [
      { id: 'all', label: FILTER_LABELS.all },
      ...Object.keys(UNIFIED_FOODS).map((id) => ({
        id,
        label: FILTER_LABELS[id] || id,
      })),
    ];
  }, []);

  // Pre-compute exercise and food arrays (only once, never changes)
  const allExercises = useMemo(() => {
    return Object.entries(UNIFIED_EXERCISES)
      .flatMap(([section, categories]) => 
        categories.flatMap(cat => 
          cat.exercises.map(ex => ({ ...ex, section }))
        )
      )
      // "Personalizado" should be user-created only, not pre-seeded catalog items.
      .filter((ex) => normalizeFilterId((ex as any).section) !== 'custom');
  }, []);

  const allFoods = useMemo(() => {
    return Object.entries(UNIFIED_FOODS)
      .flatMap(([category, items]) => 
        items.map(item => ({ ...item, category }))
      );
  }, []);

  // Set Language and A11y (Senior)
  useEffect(() => {
    document.documentElement.lang = 'es';
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(CUSTOMIZE_KEY) || '{}');
    setCatalogLogo(stored.logo || null);
    setCatalogBgId(stored.bgId || 'clean');
    setCatalogBgImage(stored.bgImage || null);
  }, []);

  useEffect(() => {
    localStorage.setItem(CUSTOMIZE_KEY, JSON.stringify({
      logo: catalogLogo,
      bgId: catalogBgId,
      bgImage: catalogBgImage,
    }));
  }, [catalogLogo, catalogBgId, catalogBgImage]);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(data))));
        loadRoutine(decoded);
        setActiveTab('build');
      } catch (e) {}
    }
  }, [searchParams, loadRoutine]);

  // Reset search and filter when changing modes
  useEffect(() => {
    setSearch('');
    setActiveFilter('all');
  }, [builderMode]);

  // Efficient filtering without re-flattening
  const filteredItems = useMemo(() => {
    const items = builderMode === 'workout' ? allExercises : allFoods;
    const normalizedFilter = normalizeFilterId(activeFilter);
    const normalizedSearch = search.toLowerCase().trim();

    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(normalizedSearch);
      const cat = builderMode === 'workout' ? (item as any).section : (item as any).category;
      const normalizedCat = normalizeFilterId(cat);
      const matchesFilter = normalizedFilter === 'all' || normalizedCat === normalizedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter, builderMode, allExercises, allFoods]);

  const isCustomWorkoutFilter = useMemo(() => {
    return builderMode === 'workout' && normalizeFilterId(activeFilter) === 'custom';
  }, [builderMode, activeFilter]);

  const addCustomExercise = () => {
    const trimmedName = customExerciseName.trim();
    if (!trimmedName) {
      toast.error('Enter an exercise name');
      return;
    }

    const customId = `custom_${Date.now()}`;
    addExercise({
      id: customId,
      name: trimmedName,
      section: 'custom',
      difficulty: 'beginner',
      sets: customSeries,
      reps: customReps,
      weight: customWeight,
    });

    toast.success(`${trimmedName} agregado`);
    setCustomExerciseName('');
    setCustomSeries(3);
    setCustomReps(10);
    setCustomWeight(0);
    setActiveTab('build');
  };

  const addSampleRoutine = () => {
    const sampleIds = ['press_banca', 'remo_barra', 'sentadilla'];
    const samples = sampleIds
      .map((id) => allExercises.find((exercise) => exercise.id === id))
      .filter(Boolean);

    samples.forEach((exercise) => {
      addExercise({
        ...exercise,
        sets: 3,
        reps: 10,
        weight: 0,
      });
    });

    if (!currentRoutine.name || currentRoutine.name === 'Untitled routine') {
      updateRoutineName('Sample routine');
    }

    toast.success('Sample routine added');
    setActiveTab('build');
  };

  const totalMacros = useMemo(() => {
    return currentRoutine.foods.reduce((acc, food) => {
      const ratio = food.quantity / 100;
      return {
        calories: acc.calories + (food.calories * ratio),
        protein: acc.protein + (food.protein * ratio),
        carbs: acc.carbs + (food.carbs * ratio),
        fats: acc.fats + (food.fats * ratio),
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  }, [currentRoutine.foods]);

  const totalSets = useMemo(() => {
    return currentRoutine.exercises.reduce((acc, ex) => acc + (Number(ex.sets) || 0), 0);
  }, [currentRoutine.exercises]);

  const totalVolume = useMemo(() => {
    return currentRoutine.exercises.reduce((acc, ex) => {
      const sets = Number(ex.sets) || 0;
      const reps = Number(ex.reps) || 0;
      const weight = Number(ex.weight) || 0;
      return acc + sets * reps * weight;
    }, 0);
  }, [currentRoutine.exercises]);

  const shareTemplate = useMemo<'routine' | 'meal' | 'mixed'>(() => {
    const hasExercises = currentRoutine.exercises.length > 0;
    const hasFoods = currentRoutine.foods.length > 0;

    if (hasExercises && hasFoods) {
      return 'mixed';
    }
    if (hasFoods) {
      return 'meal';
    }
    return 'routine';
  }, [currentRoutine.exercises.length, currentRoutine.foods.length]);

  const hasRoutineItems = currentRoutine.exercises.length > 0 || currentRoutine.foods.length > 0;
  const routineItemCount = currentRoutine.exercises.length + currentRoutine.foods.length;
  const routineDisplayName = useMemo(() => {
    const trimmed = currentRoutine.name.trim();
    if (!trimmed) return 'Untitled routine';
    if (trimmed === trimmed.toUpperCase()) {
      return trimmed.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
    }
    return trimmed;
  }, [currentRoutine.name]);

  const screenTitle = activeTab === 'catalog'
    ? 'Add items'
    : activeTab === 'food'
      ? 'Meals'
      : activeTab === 'build'
        ? 'Routine'
        : 'Share';

  const screenSubtitle = activeTab === 'catalog'
    ? 'Add exercises or meals to create a shareable routine link.'
    : activeTab === 'food'
      ? 'Adjust meal portions before sharing.'
      : activeTab === 'build'
        ? 'Edit the routine your client will open.'
        : 'Preview the client view and send the link.';

  const selectedWirPalette = useMemo<'clean' | 'mist' | 'navy' | 'forest' | 'ember' | undefined>(() => {
    if (catalogBgImage) {
      return undefined;
    }
    const allowed = ['clean', 'mist', 'navy', 'forest', 'ember'] as const;
    return (allowed as readonly string[]).includes(catalogBgId) ? (catalogBgId as (typeof allowed)[number]) : undefined;
  }, [catalogBgId, catalogBgImage]);

  const sharePreviewText = useMemo(() => {
    const routineName = routineDisplayName;
    const totalItems = currentRoutine.exercises.length + currentRoutine.foods.length;
    const exerciseLine = `Ejercicios: ${currentRoutine.exercises.length}`;
    const foodLine = `Comidas: ${currentRoutine.foods.length}`;
    const totalLine = `Items totales: ${totalItems}`;

    return `Rutina: ${routineName}\n\n${exerciseLine}\n${foodLine}\n${totalLine}\n\nAbrila sin instalar nada:\n${getShareableLink(selectedWirPalette)}`;
  }, [routineDisplayName, currentRoutine.exercises.length, currentRoutine.foods.length, getShareableLink, selectedWirPalette]);

  const handleCatalogLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setCatalogLogo(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleCatalogBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setCatalogBgImage(ev.target?.result as string);
      setCatalogBgId('custom');
    };
    reader.readAsDataURL(file);
  };

  const catalogActiveBg = useMemo(() => {
    if (catalogBgImage) {
      return { background: `url(${catalogBgImage}) center/cover no-repeat` };
    }
    return CATALOG_BG_PRESETS.find(p => p.id === catalogBgId)?.style || CATALOG_BG_PRESETS[0].style;
  }, [catalogBgId, catalogBgImage]);

  return (
    <div className="min-h-screen bg-white text-[#141e30] font-sans selection:bg-[#35577d]/20 flex flex-col overflow-hidden">
      
      {/* Dynamic Header */}
      <header className="p-4 pt-6 shrink-0 z-10 bg-gradient-to-r from-[#141e30] to-[#35577d] text-white border-b border-[#e6ecf2] shadow-[0_16px_36px_-24px_rgba(20,30,48,0.6)]" role="banner">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <button
               onClick={() => setShowCustomize(v => !v)}
               className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 flex items-center justify-center transition-colors"
               aria-label="Options menu"
               title="Options"
             >
               <Menu className="w-5 h-5 text-white" />
             </button>
             <div className="w-6 h-6 rounded-lg overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center">
               <img src="/icons/fit-legacy-mark.svg" alt="FL" className="w-full h-full object-cover opacity-90" />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Fit Legacy Builder</span>
               <div className="flex items-center gap-1.5 opacity-60">
                 <div className="w-1.2 h-1.2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                 <span className="text-[7px] font-mono uppercase tracking-widest font-black">Routine link tool</span>
               </div>
             </div>
           </div>
           {activeTab === 'catalog' ? (
             <motion.button
               onClick={() => {
                 if (!hasValidDonationUrl) {
                   toast.info('Set VITE_MP_DONATION_URL to enable donations');
                   return;
                 }
                 window.open(donationUrl, '_blank', 'noopener,noreferrer');
               }}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               animate={{ y: [0, -2, 0] }}
               transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
               className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 flex items-center justify-center transition-colors shadow-lg"
               aria-label="Donate with Mercado Pago"
               title="Support the project"
             >
               <img src="/mercadopago/Group%2016.webp" className="w-8 h-8 md:w-9 md:h-9 object-contain" alt="Donate" />
             </motion.button>
           ) : activeTab === 'food' ? (
             <motion.button
               onClick={() => {
                 if (!hasValidDonationUrl) {
                   toast.info('Set VITE_MP_DONATION_URL to enable donations');
                   return;
                 }
                 window.open(donationUrl, '_blank', 'noopener,noreferrer');
               }}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               animate={{ y: [0, -2, 0] }}
               transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
               className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 flex items-center justify-center transition-colors shadow-lg"
               aria-label="Donate with Mercado Pago"
               title="Support the project"
             >
               <img src="/mercadopago/Group%2016.webp" className="w-8 h-8 md:w-9 md:h-9 object-contain" alt="Donate" />
             </motion.button>
           ) : (
             <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center" aria-hidden="true">
               <div className="w-2 h-2 rounded-full bg-[#28623a]" />
             </div>
           )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            {(activeTab === 'catalog' || activeTab === 'food') && catalogLogo && (
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={catalogLogo} 
                alt="Catalog logo" 
                className="w-12 h-12 object-contain rounded-2xl bg-white/10 p-1.5 border border-white/20 shadow-lg" 
              />
            )}
            <div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter">{screenTitle}</h1>
              <p className="mt-1 max-w-xs text-[10px] font-bold uppercase tracking-widest text-white/65">{screenSubtitle}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 overflow-hidden relative z-10" role="main">
        <AnimatePresence mode="wait">
          {activeTab === 'catalog' && (
            <motion.div 
              key={`catalog-${builderMode}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col p-6 space-y-6 rounded-3xl"
              style={catalogActiveBg}
            >
              {/* Internal Discovery Toggle */}
              <div className="relative bg-white/60 backdrop-blur-md p-1 rounded-2xl border border-white/45 shadow-[0_10px_22px_-16px_rgba(20,30,48,0.6)] flex items-center h-14 overflow-hidden" role="tablist">
                 <motion.div 
                    initial={false}
                    animate={{ x: builderMode === 'workout' ? 0 : '100%' }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-[#141e30] rounded-xl shadow-[0_10px_24px_-16px_rgba(20,30,48,0.9)] z-0"
                 />
                 
                 <button 
                  onClick={() => setBuilderMode('workout')} 
                  role="tab"
                  aria-selected={builderMode === 'workout'}
                  className={`relative flex-1 h-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 z-10 ${builderMode === 'workout' ? 'text-white' : 'text-[#35577d] hover:text-[#141e30]'}`}
                >
                  <Dumbbell size={16} />
                  Exercises
                </button>
                <button 
                  onClick={() => setBuilderMode('nutrition')} 
                  role="tab"
                  aria-selected={builderMode === 'nutrition'}
                  className={`relative flex-1 h-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 z-10 ${builderMode === 'nutrition' ? 'text-white' : 'text-[#35577d] hover:text-[#141e30]'}`}
                >
                  <Apple size={16} />
                  Meals
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5b6472]" aria-hidden="true" />
                  <input 
                    type="text"
                    placeholder={`Search ${builderMode === 'workout' ? 'exercises' : 'foods'}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/65 backdrop-blur-sm border border-white/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#35577d] transition-[border-color] font-bold text-sm text-[#102033] placeholder:text-[#5b6472]"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                   {(builderMode === 'workout' ? workoutFilters : foodFilters).map(f => (
                     <button
                       key={f.id}
                       onClick={() => setActiveFilter(f.id)}
                       className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                         activeFilter === f.id ? 'bg-[#141e30] border-[#141e30] text-white shadow-lg shadow-[#141e30]/20' : 'bg-white/62 backdrop-blur-sm border-white/45 text-[#254667]'
                       }`}
                     >
                       {f.label}
                     </button>
                   ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar pb-28">
                {isCustomWorkoutFilter && (
                  <div className="bg-white/76 backdrop-blur-md border border-white/50 rounded-2xl p-4 space-y-3 shadow-[0_16px_24px_-20px_rgba(20,30,48,0.7)]">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#254667]">Custom exercise</p>
                      <ExerciseIcon section="custom" className="w-6 h-6" />
                    </div>

                    <input
                      type="text"
                      value={customExerciseName}
                      onChange={(e) => setCustomExerciseName(e.target.value)}
                      placeholder="Exercise name"
                      className="w-full bg-white/80 border border-white/60 rounded-xl py-2.5 px-3 text-xs font-bold text-[#102033] placeholder:text-[#5b6472] focus:outline-none focus:border-[#35577d]"
                    />

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <p className="text-[8px] font-black uppercase text-[#5b6472]">Sets</p>
                        <div className="flex items-center justify-between bg-white/70 border border-white/60 rounded-lg px-2 py-1.5">
                          <button onClick={() => setCustomSeries(v => Math.max(1, v - 1))} className="text-[#254667]"><Minus size={14} /></button>
                          <span className="text-xs font-black text-[#102033]">{customSeries}</span>
                          <button onClick={() => setCustomSeries(v => Math.min(20, v + 1))} className="text-[#254667]"><Plus size={14} /></button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[8px] font-black uppercase text-[#5b6472]">Reps</p>
                        <div className="flex items-center justify-between bg-white/70 border border-white/60 rounded-lg px-2 py-1.5">
                          <button onClick={() => setCustomReps(v => Math.max(1, v - 1))} className="text-[#254667]"><Minus size={14} /></button>
                          <span className="text-xs font-black text-[#102033]">{customReps}</span>
                          <button onClick={() => setCustomReps(v => Math.min(100, v + 1))} className="text-[#254667]"><Plus size={14} /></button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[8px] font-black uppercase text-[#5b6472]">Weight</p>
                        <div className="flex items-center justify-between bg-white/70 border border-white/60 rounded-lg px-2 py-1.5">
                          <button onClick={() => setCustomWeight(v => Math.max(0, v - 2.5))} className="text-[#254667]"><Minus size={14} /></button>
                          <span className="text-xs font-black text-[#102033]">{customWeight}</span>
                          <button onClick={() => setCustomWeight(v => Math.min(500, Number((v + 2.5).toFixed(1))))} className="text-[#254667]"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={addCustomExercise}
                      className="w-full bg-[#141e30] text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest active:scale-[0.98] transition-transform"
                    >
                      Add custom exercise
                    </button>
                  </div>
                )}

                {filteredItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-40 text-center space-y-4">
                    <Ghost size={48} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">No results</p>
                  </div>
                ) : (
                  filteredItems.map(item => (
                    <motion.div
                      key={`${builderMode}-${item.id}`}
                      onClick={() => {
                        builderMode === 'workout' ? addExercise(item as any) : addFood(item as any);
                        toast.success(`${item.name} added`);
                      }}
                      className="bg-white/72 backdrop-blur-md border border-white/45 rounded-2xl p-4 flex items-center justify-between active:scale-[0.98] transition-all group cursor-pointer hover:bg-white/80 shadow-[0_16px_24px_-20px_rgba(20,30,48,0.7)]"
                    >
                      <div className="flex items-center gap-4">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${builderMode === 'workout' ? 'bg-white/45 border border-white/50' : 'bg-white/45 border border-white/55'}`}>
                           {builderMode === 'workout' ? <ExerciseIcon section={(item as any).section} className="w-10 h-10" /> : <FoodIcon category={(item as any).category} name={item.name} className="w-6 h-6" />}
                         </div>
                         <div>
                           <p className="font-black italic uppercase text-sm text-[#0f1b2d] group-active:text-[#0f1b2d]">{item.name}</p>
                           <p className="text-[8px] font-bold text-[#3f556f] uppercase tracking-widest">
                             {builderMode === 'workout' ? (item as any).section : (item as any).category}
                           </p>
                         </div>
                      </div>
                      <button className="w-8 h-8 bg-white/65 border border-white/50 rounded-full flex items-center justify-center text-[#254667] group-active:bg-[#141e30] group-active:text-white transition-colors">
                         <Plus size={18} />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'food' && (
            <motion.div 
              key="food-management"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col p-6 space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[#28623a]">Meals</h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#5b6472]">Adjust the food section before sharing</p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                  <div className="p-3 bg-[#f3faf5] rounded-xl border border-[#e6f4ea] text-center shadow-sm">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="carbs" name="rice" className="w-4 h-4" />
                    </div>
                    <p className="text-[7px] font-black text-[#5b6472] uppercase">Kcal</p>
                    <p className="text-sm font-black text-[#28623a]">{Math.round(totalMacros.calories)}</p>
                  </div>
                  <div className="p-3 bg-[#f3faf5] rounded-xl border border-[#e6f4ea] text-center shadow-sm">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="protein" name="egg" className="w-4 h-4" />
                    </div>
                    <p className="text-[7px] font-black text-[#6b1e23] uppercase">Prot</p>
                    <p className="text-sm font-black text-[#6b1e23]">{Math.round(totalMacros.protein)}g</p>
                  </div>
                  <div className="p-3 bg-[#f3faf5] rounded-xl border border-[#e6f4ea] text-center shadow-sm">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="carbs" name="noodles" className="w-4 h-4" />
                    </div>
                    <p className="text-[7px] font-black text-[#35577d] uppercase">Carb</p>
                    <p className="text-sm font-black text-[#35577d]">{Math.round(totalMacros.carbs)}g</p>
                  </div>
                  <div className="p-3 bg-[#f3faf5] rounded-xl border border-[#e6f4ea] text-center shadow-sm">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="fats" name="avocado" className="w-4 h-4" />
                    </div>
                    <p className="text-[7px] font-black text-[#28623a] uppercase">Fat</p>
                    <p className="text-sm font-black text-[#28623a]">{Math.round(totalMacros.fats)}g</p>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar pb-28">
                {currentRoutine.foods.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                    <Apple size={64} className="text-[#28623a]/25" />
                    <div className="space-y-2">
                      <p className="text-sm font-black uppercase tracking-widest text-[#141e30]">No meals yet</p>
                      <p className="max-w-xs text-xs font-bold leading-relaxed text-[#5b6472]">Add foods if this routine includes nutrition. You can also share workout-only links.</p>
                      <button onClick={() => { setActiveTab('catalog'); setBuilderMode('nutrition'); }} className="mt-2 rounded-xl bg-[#28623a] px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white">Add food</button>
                    </div>
                  </div>
                ) : (
                  currentRoutine.foods.map(food => (
                    <div key={food.id} className="bg-[#f3faf5] border border-[#e6f4ea] rounded-2xl p-5 flex items-center justify-between shadow-sm">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2 mb-1">
                             <FoodIcon category={food.category || 'all'} name={food.name} className="w-5 h-5" />
                            <h4 className="font-black italic uppercase text-xs">{food.name}</h4>
                          </div>
                          <div className="flex items-center gap-3">
                             <span className="text-[8px] font-black text-[#28623a] uppercase">{Math.round((food.protein * food.quantity) / 100)}g P</span>
                             <span className="text-[8px] font-black text-[#5b6472]">•</span>
                             <span className="text-[8px] font-black text-[#5b6472] uppercase">{Math.round((food.calories * food.quantity) / 100)} Kcal</span>
                          </div>
                       </div>
                        <div className="flex flex-col gap-3">
                           <div className="flex items-center gap-3 bg-white rounded-xl p-2 border border-[#e6ecf2] shadow-sm">
                              <button onClick={() => updateFood(food.id, { quantity: Math.max(25, food.quantity - 25) })} className="p-1"><Minus size={16} /></button>
                              <span className="text-xs font-black w-10 text-center">{food.quantity}g</span>
                              <button onClick={() => updateFood(food.id, { quantity: food.quantity + 25 })} className="p-1"><Plus size={16} /></button>
                              <button onClick={() => removeFood(food.id)} className="ml-1 pl-3 border-l border-[#e6ecf2] text-[#5b6472] hover:text-red-500"><Trash2 size={16} /></button>
                           </div>
                           <div className="relative">
                              <MessageCircle size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#28623a] opacity-40" />
                              <input 
                                type="text"
                                placeholder="Note..."
                                value={food.notes || ''}
                                onChange={(e) => updateFood(food.id, { notes: e.target.value })}
                                className="w-full bg-white/50 border border-[#e6ecf2] rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-bold focus:outline-none focus:border-[#28623a] placeholder:italic"
                              />
                           </div>
                        </div>
                     </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'build' && (
            <motion.div 
              key="build-management"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col p-6 space-y-6"
            >
              <div className="space-y-4">
                <input 
                  type="text"
                  value={currentRoutine.name}
                  onChange={(e) => updateRoutineName(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-3xl font-black italic uppercase tracking-tighter focus:ring-0 placeholder:text-[#9aa9ba]"
                  placeholder="Untitled routine"
                />
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#5b6472] -mt-3">This is the routine your client will open</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 bg-[#eff4fa] rounded-xl border border-[#e6ecf2] text-center shadow-sm">
                  <div className="mb-1 flex justify-center">
                    <ExerciseIcon section="fullbody" className="w-5 h-5" />
                  </div>
                  <p className="text-[7px] font-black text-[#5b6472] uppercase">Ejercicios</p>
                  <p className="text-sm font-black text-[#141e30]">{currentRoutine.exercises.length}</p>
                </div>
                <div className="p-3 bg-[#eff4fa] rounded-xl border border-[#e6ecf2] text-center shadow-sm">
                  <div className="mb-1 flex justify-center">
                    <ExerciseIcon section="arms" className="w-5 h-5" />
                  </div>
                  <p className="text-[7px] font-black text-[#5b6472] uppercase">Sets</p>
                  <p className="text-sm font-black text-[#141e30]">{totalSets}</p>
                </div>
                <div className="p-3 bg-[#eff4fa] rounded-xl border border-[#e6ecf2] text-center shadow-sm">
                  <div className="mb-1 flex justify-center">
                    <ExerciseIcon section="legs" className="w-5 h-5" />
                  </div>
                  <p className="text-[7px] font-black text-[#5b6472] uppercase">Volumen</p>
                  <p className="text-sm font-black text-[#141e30]">{Math.round(totalVolume)}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar pb-28">
                {currentRoutine.exercises.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                    <Dumbbell size={64} className="text-[#35577d]/25" />
                    <div className="space-y-2">
                      <p className="text-sm font-black uppercase tracking-widest text-[#141e30]">Start with an exercise</p>
                      <p className="max-w-xs text-xs font-bold leading-relaxed text-[#5b6472]">Add items, preview the client view, then send the routine through WhatsApp.</p>
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-center">
                        <button onClick={() => { setActiveTab('catalog'); setBuilderMode('workout'); }} className="rounded-xl bg-[#141e30] px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white">Add exercise</button>
                        <button onClick={addSampleRoutine} className="rounded-xl border border-[#dbe5f0] bg-white px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#141e30]">Use sample</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  currentRoutine.exercises.map(ex => (
                    <div key={ex.id} className="bg-white border border-[#e6ecf2] rounded-2xl p-5 space-y-5 shadow-sm">
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            <ExerciseIcon section={ex.section} className="w-8 h-8" />
                            <h4 className="font-black italic uppercase text-xs tracking-tight">{ex.name}</h4>
                         </div>
                         <button onClick={() => removeExercise(ex.id)} className="p-2 -mr-2 text-[#5b6472] hover:text-red-500"><X size={16} /></button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                         <div className="space-y-1">
                            <label className="text-[7px] font-black text-[#5b6472] uppercase">Sets</label>
                            <div className="flex items-center justify-between bg-[#f7f9fc] rounded-lg p-2 border border-[#e6ecf2]">
                               <button onClick={() => updateExercise(ex.id, { sets: Math.max(1, ex.sets - 1) })}><Minus size={14} /></button>
                               <span className="text-xs font-black">{ex.sets}</span>
                               <button onClick={() => updateExercise(ex.id, { sets: ex.sets + 1 })}><Plus size={14} /></button>
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-[7px] font-black text-[#5b6472] uppercase">Reps</label>
                            <div className="flex items-center justify-between bg-[#f7f9fc] rounded-lg p-2 border border-[#e6ecf2]">
                               <button onClick={() => updateExercise(ex.id, { reps: Math.max(1, ex.reps - 1) })}><Minus size={14} /></button>
                               <span className="text-xs font-black">{ex.reps}</span>
                               <button onClick={() => updateExercise(ex.id, { reps: ex.reps + 1 })}><Plus size={14} /></button>
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-[7px] font-black text-[#5b6472] uppercase">kg</label>
                            <div className="flex items-center justify-between bg-[#f7f9fc] rounded-lg p-2 border border-[#e6ecf2]">
                               <button onClick={() => updateExercise(ex.id, { weight: Math.max(0, ex.weight - 2.5) })}><Minus size={14} /></button>
                               <span className="text-xs font-black">{ex.weight}</span>
                               <button onClick={() => updateExercise(ex.id, { weight: ex.weight + 2.5 })}><Plus size={14} /></button>
                            </div>
                         </div>
                      </div>
                      <div className="relative mt-4">
                        <MessageCircle size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#35577d] opacity-40" />
                        <input 
                          type="text"
                          placeholder="Note (rest, tempo, cues...)"
                          value={ex.notes || ''}
                          onChange={(e) => updateExercise(ex.id, { notes: e.target.value })}
                          className="w-full bg-[#f7f9fc] border border-[#e6ecf2] rounded-lg py-2 pl-8 pr-3 text-[10px] font-bold focus:outline-none focus:border-[#35577d] placeholder:italic"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'export' && (
            <motion.div 
              key="export"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-full overflow-y-auto p-6 pb-64"
            >
              <div className="w-full max-w-3xl mx-auto space-y-6">
                <div className="rounded-2xl border border-[#e6ecf2] bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#28623a]">
                    {hasRoutineItems ? 'Ready to share' : 'Nothing to share yet'}
                  </p>
                  <h2 className="mt-2 text-2xl font-black italic uppercase tracking-tighter text-[#141e30]">
                    {routineDisplayName}
                  </h2>
                  <p className="mt-2 text-sm font-bold leading-relaxed text-[#5b6472]">
                    {hasRoutineItems
                      ? `${routineItemCount} items. The client can open this link in any browser without installing an app.`
                      : 'Add at least one exercise or meal before sending a link.'}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#5b6472]">Client preview</p>
                    <p className="text-xs font-bold text-[#5b6472]">What the recipient opens from WhatsApp.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('build')}
                    className="rounded-xl border border-[#e6ecf2] bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#141e30]"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <Suspense fallback={<ExportPreviewFallback />}>
                      <WirCanvasPreview
                        template={shareTemplate}
                        palette={selectedWirPalette}
                        title={routineDisplayName}
                        exercises={currentRoutine.exercises.map((ex) => ({
                          name: ex.name,
                          sets: ex.sets || 0,
                          reps: ex.reps || 0,
                          weight: ex.weight || 0,
                          notes: ex.notes,
                          section: ex.section,
                        }))}
                        foods={currentRoutine.foods.map((food) => ({
                          name: food.name,
                          quantity: food.quantity || 0,
                          protein: food.protein || 0,
                          calories: food.calories || 0,
                          notes: food.notes,
                          category: food.category,
                        }))}
                        isPreview={true}
                      />
                    </Suspense>
                  </div>
                </div>

                <div className="space-y-3 pb-24">
                  <button 
                    onClick={() => {
                      if (currentRoutine.exercises.length === 0 && currentRoutine.foods.length === 0) {
                        toast.error('Add at least one item before sharing');
                        return;
                      }
                      window.open(`https://wa.me/?text=${encodeURIComponent(sharePreviewText)}`, '_blank');
                    }}
                    className="w-full h-16 bg-[#28623a] text-white rounded-[1.5rem] font-black text-base uppercase flex items-center justify-center gap-2 active:scale-[0.98] transition-[transform,background-color] shadow-[0_20px_40px_-14px_rgba(40,98,58,0.4)] disabled:opacity-45 disabled:shadow-none"
                    disabled={!hasRoutineItems}
                  >
                    <Share2 size={24} aria-hidden="true" />
                    Send via WhatsApp
                  </button>

                  <button 
                    onClick={() => {
                      const link = getShareableLink(selectedWirPalette);
                      if (!link) return;
                      navigator.clipboard.writeText(link);
                      toast.success('Link copied', {
                        style: {
                          background: '#141e30',
                          color: '#fff',
                          border: '1px solid #35577d'
                        }
                      });
                    }}
                    className="w-full py-4 bg-white border-2 border-[#141e30] text-[#141e30] rounded-[1.5rem] font-black text-xs uppercase tracking-widest active:scale-[0.98] transition-[transform,background-color] flex items-center justify-center gap-2 disabled:opacity-45"
                    disabled={!hasRoutineItems}
                  >
                    Copy link
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/*
          Ledger temporalmente comentado por solicitud.
          {activeTab === 'ledger' && (
            <motion.div 
              key="ledger"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-full overflow-y-auto pb-32"
            >
              <BioLedgerView />
            </motion.div>
          )}
          */}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showCustomize && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-l border-[#e6ecf2] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#e6ecf2]">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#35577d]" />
                <h2 className="text-sm font-black uppercase tracking-widest text-[#141e30]">Customize catalog</h2>
              </div>
              <button onClick={() => setShowCustomize(false)} className="w-7 h-7 rounded-lg bg-[#eff4fa] hover:bg-[#dfe8f2] flex items-center justify-center transition-colors">
                <X className="w-3.5 h-3.5 text-[#35577d]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-[#5b6472] uppercase tracking-widest">Logo / Icono</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl border border-[#dbe5f0] bg-[#f7f9fc] flex items-center justify-center overflow-hidden shrink-0">
                    {catalogLogo ? <img src={catalogLogo} alt="Logo" className="w-full h-full object-cover" /> : <Palette className="w-6 h-6 text-[#35577d]" />}
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="flex items-center gap-2 px-3 py-2 bg-[#eff4fa] hover:bg-[#dfe8f2] border border-[#dbe5f0] rounded-xl cursor-pointer transition-all text-xs font-bold uppercase tracking-widest text-[#141e30]">
                      <ImageIcon className="w-3.5 h-3.5" /> Subir imagen
                      <input type="file" accept="image/*" className="hidden" onChange={handleCatalogLogoUpload} />
                    </label>
                    {catalogLogo && <button onClick={() => setCatalogLogo(null)} className="w-full px-3 py-1.5 text-[10px] font-mono text-[#5b6472] hover:text-red-500 border border-[#dbe5f0] rounded-xl transition-colors">Restaurar default</button>}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-mono text-[#5b6472] uppercase tracking-widest">Fondo</p>
                <div className="grid grid-cols-2 gap-2">
                  {CATALOG_BG_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setCatalogBgId(preset.id);
                        setCatalogBgImage(null);
                      }}
                      className={`relative h-12 rounded-xl border transition-all overflow-hidden ${catalogBgId === preset.id && !catalogBgImage ? 'border-[#35577d] shadow-[0_0_10px_rgba(53,87,125,0.35)]' : 'border-[#dbe5f0] hover:border-[#35577d]/40'}`}
                      style={preset.style}
                    >
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#141e30]/80">{preset.label}</span>
                      </span>
                      {catalogBgId === preset.id && !catalogBgImage && <span className="absolute top-1 right-1 w-2 h-2 bg-[#35577d] rounded-full" />}
                    </button>
                  ))}
                </div>

                <label className={`flex items-center gap-2 px-3 py-2.5 border rounded-xl cursor-pointer transition-all text-xs font-bold uppercase tracking-widest ${catalogBgImage ? 'bg-[#35577d]/10 border-[#35577d]/35 text-[#35577d]' : 'bg-[#eff4fa] hover:bg-[#dfe8f2] border-[#dbe5f0]'}`}>
                  <ImageIcon className="w-3.5 h-3.5" /> {catalogBgImage ? 'Imagen activa' : 'Imagen personalizada'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleCatalogBgUpload} />
                </label>

                {catalogBgImage && <button onClick={() => { setCatalogBgImage(null); setCatalogBgId('clean'); }} className="w-full px-3 py-1.5 text-[10px] font-mono text-[#5b6472] hover:text-red-500 border border-[#dbe5f0] rounded-xl transition-colors">Quitar imagen</button>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent shrink-0 z-50" role="navigation">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-3xl border border-[#e6ecf2] rounded-[2.5rem] p-2 flex items-center justify-between shadow-[0_-20px_40px_-22px_rgba(20,30,48,0.35)]">
            <button 
              onClick={() => { setActiveTab('catalog'); setBuilderMode('workout'); }}
              aria-label="Add exercises"
              className={`flex flex-col items-center justify-center gap-1 w-20 py-4 rounded-[2rem] transition-[background-color,color,box-shadow] duration-300 ${activeTab === 'catalog' ? 'bg-[#141e30] text-white shadow-xl' : 'text-[#35577d] hover:text-[#141e30]'}`}
            >
              <img
                src="/icons/fit-legacy-mark.svg"
                alt=""
                aria-hidden="true"
                className="w-5 h-5 object-contain"
              />
              <span className="text-[8px] font-black uppercase tracking-tighter">Add</span>
            </button>
            <button 
              onClick={() => setActiveTab('food')}
              aria-label={`View meals (${currentRoutine.foods.length} items)`}
              className={`flex flex-col items-center justify-center gap-1 w-20 py-4 rounded-[2rem] transition-[background-color,color,box-shadow] duration-300 relative ${activeTab === 'food' ? 'bg-[#141e30] text-white shadow-xl' : 'text-[#35577d] hover:text-[#141e30]'}`}
            >
              <Apple size={18} />
              <span className="text-[8px] font-black uppercase tracking-tighter">Meals</span>
              {currentRoutine.foods.length > 0 && (
                <div className="absolute top-2 right-4 w-4 h-4 bg-[#28623a] rounded-full flex items-center justify-center border-2 border-white" aria-hidden="true">
                  <span className="text-[8px] font-black text-white">{currentRoutine.foods.length}</span>
                </div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('build')}
              aria-label={`View routine (${currentRoutine.exercises.length} exercises)`}
              className={`flex flex-col items-center justify-center gap-1 w-20 py-4 rounded-[2rem] transition-[background-color,color,box-shadow] duration-300 relative ${activeTab === 'build' ? 'bg-[#141e30] text-white shadow-xl' : 'text-[#35577d] hover:text-[#141e30]'}`}
            >
              {activeTab === 'build' && (
                <motion.div 
                  layoutId="activeTabNav"
                  className="absolute inset-0 bg-[#141e30] rounded-[2rem] -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <ExerciseIcon section="fullbody" className="w-5 h-5 relative z-10" />
              <span className="text-[8px] font-black uppercase tracking-tighter">Routine</span>
              {currentRoutine.exercises.length > 0 && (
                <div className="absolute top-2 right-4 w-4 h-4 bg-[#6b1e23] rounded-full flex items-center justify-center border-2 border-white" aria-hidden="true">
                  <span className="text-[8px] font-black text-white">{currentRoutine.exercises.length}</span>
                </div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('export')}
              aria-label="Share routine"
              className={`flex flex-col items-center justify-center gap-1 w-20 py-4 rounded-[2rem] transition-[background-color,color,box-shadow] duration-300 ${activeTab === 'export' ? 'bg-[#141e30] text-white shadow-xl' : 'text-[#35577d] hover:text-[#141e30]'}`}
            >
              <img
                src="/icons/fl-1.svg"
                alt=""
                aria-hidden="true"
                className="w-4 h-5 object-contain"
              />
              <span className="text-[8px] font-black uppercase tracking-tighter">Share</span>
            </button>
         </div>
      </nav>

    </div>
  );
}

function ExportPreviewFallback() {
  return (
    <div className="w-full max-w-sm aspect-[9/16] rounded-[1.5rem] border border-[#e6ecf2] bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#35577d] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
