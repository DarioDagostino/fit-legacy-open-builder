import { lazy, Suspense, useState, useMemo, useEffect, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Dumbbell, 
  Trash2, 
  Plus, 
  Share2, 
  Copy,
  Image as ImageIcon,
  Minus,
  Apple,
  Palette,
  X,
  Ghost,
  MessageCircle,
  Check
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
    return <Apple className={className} aria-hidden="true" />;
  }

  return <Renderer category={category} name={name} className={className} />;
};

export default function MobileFirstBuilder() {
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
    const fallbackName = shareTemplate === 'meal'
      ? 'Plan de comidas'
      : shareTemplate === 'mixed'
        ? 'Rutina y comidas'
        : 'Rutina';
    if (!trimmed || trimmed === 'Untitled routine' || trimmed === 'NUEVA RUTINA') return fallbackName;
    if (trimmed === trimmed.toUpperCase()) {
      return trimmed.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
    }
    return trimmed;
  }, [currentRoutine.name, shareTemplate]);

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
    const link = getShareableLink(selectedWirPalette);
    const intro = shareTemplate === 'meal'
      ? 'Te paso tu plan de comidas'
      : shareTemplate === 'mixed'
        ? 'Te paso tu rutina y comidas'
        : 'Te paso tu rutina';
    const summaryParts = [
      currentRoutine.exercises.length > 0 ? `${currentRoutine.exercises.length} ejercicios` : null,
      currentRoutine.foods.length > 0 ? `${currentRoutine.foods.length} comidas` : null,
    ].filter(Boolean);
    const summary = summaryParts.length > 0 ? `\n${summaryParts.join(' · ')}` : '';

    return `${intro}: ${routineDisplayName}${summary}\n\nAbrilo sin instalar nada:\n${link}`;
  }, [routineDisplayName, shareTemplate, currentRoutine.exercises.length, currentRoutine.foods.length, getShareableLink, selectedWirPalette]);

  const handleShareToWhatsApp = () => {
    if (!hasRoutineItems) {
      toast.error('Add at least one item before sharing');
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(sharePreviewText)}`, '_blank');
  };

  const handleCopyShareLink = () => {
    if (!hasRoutineItems) {
      toast.error('Add at least one item before copying a link');
      return;
    }
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
  };

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
      
      {/* App Header */}
      <header className="shrink-0 z-10 border-b border-[#e6ecf2] bg-white/95 px-4 py-3 text-[#141e30] shadow-[0_16px_30px_-28px_rgba(20,30,48,0.45)] backdrop-blur-xl" role="banner">
        <div className="flex items-center justify-between gap-4">
           <div className="flex items-center gap-3">
             <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[#e6ecf2] bg-[#f7f9fc]">
               <img src="/icons/fit-legacy-mark.svg" alt="FL" className="h-full w-full object-cover" />
             </div>
             <div className="min-w-0">
               <p className="truncate text-lg font-black leading-tight">{screenTitle}</p>
               <p className="truncate text-xs font-bold text-[#5b6472]">{screenSubtitle}</p>
             </div>
           </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden rounded-xl border border-[#e6ecf2] bg-[#f7f9fc] px-3 py-2 text-xs font-black text-[#5b6472] sm:block">
              {routineItemCount} items
            </div>
            <button
              onClick={() => setShowCustomize(true)}
              className="rounded-xl border border-[#dbe5f0] bg-white px-3 py-2 text-xs font-black uppercase tracking-wide text-[#141e30] transition-colors hover:bg-[#f7f9fc]"
            >
              Settings
            </button>
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
              className="h-full overflow-y-auto p-6 pb-52"
            >
              <div className="w-full max-w-3xl mx-auto space-y-6">
                <div className="rounded-2xl border border-[#e6ecf2] bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#28623a]">
                    {hasRoutineItems ? 'Ready to share' : 'Nothing to share yet'}
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-[#141e30]">
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
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[360px] flex-col border-l border-[#dbe5f0] bg-white shadow-[-24px_0_60px_-42px_rgba(20,30,48,0.55)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#e6ecf2] p-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-[#35577d]" />
                  <h2 className="text-sm font-black uppercase tracking-wide text-[#141e30]">Share settings</h2>
                </div>
                <p className="text-xs font-bold leading-relaxed text-[#5b6472]">Brand, client view and delivery options.</p>
              </div>
              <button onClick={() => setShowCustomize(false)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f7f9fc] transition-colors hover:bg-[#eff4fa]">
                <X className="h-4 w-4 text-[#35577d]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-28 space-y-6">
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#5b6472]">Brand</p>
                  {catalogLogo && (
                    <button onClick={() => setCatalogLogo(null)} className="text-[10px] font-black uppercase tracking-wide text-[#6b1e23]">
                      Remove
                    </button>
                  )}
                </div>
                <div className="rounded-2xl border border-[#e6ecf2] bg-[#f7f9fc] p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#dbe5f0] bg-white">
                      {catalogLogo ? <img src={catalogLogo} alt="Logo" className="h-full w-full object-cover" /> : <img src="/icons/fit-legacy-mark.svg" alt="Fit Legacy" className="h-full w-full object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-[#141e30]">Catalog logo</p>
                      <p className="mt-1 text-xs font-bold leading-relaxed text-[#5b6472]">Shown in the builder catalog.</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#dbe5f0] bg-white px-3 py-3 text-xs font-black uppercase tracking-wide text-[#141e30] transition-colors hover:bg-[#eff4fa]">
                      <ImageIcon className="h-3.5 w-3.5" /> Upload logo
                      <input type="file" accept="image/*" className="hidden" onChange={handleCatalogLogoUpload} />
                    </label>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-wide text-[#5b6472]">Client view</p>
                <div className="grid grid-cols-1 gap-2">
                  {CATALOG_BG_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setCatalogBgId(preset.id);
                        setCatalogBgImage(null);
                      }}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${catalogBgId === preset.id && !catalogBgImage ? 'border-[#35577d] bg-[#eff4fa]' : 'border-[#e6ecf2] bg-white hover:bg-[#f7f9fc]'}`}
                    >
                      <span className="h-9 w-12 shrink-0 rounded-xl border border-white shadow-inner" style={preset.style} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-black text-[#141e30]">{preset.label}</span>
                        <span className="block text-xs font-bold text-[#5b6472]">Preview palette</span>
                      </span>
                      {catalogBgId === preset.id && !catalogBgImage && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#35577d] text-white">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <label className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3 transition-colors ${catalogBgImage ? 'border-[#35577d] bg-[#eff4fa] text-[#35577d]' : 'border-[#e6ecf2] bg-white text-[#141e30] hover:bg-[#f7f9fc]'}`}>
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-12 items-center justify-center rounded-xl bg-[#eff4fa]">
                      <ImageIcon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-black">{catalogBgImage ? 'Custom image' : 'Upload image'}</span>
                      <span className="block text-xs font-bold text-[#5b6472]">Use a custom background.</span>
                    </span>
                  </span>
                  {catalogBgImage && <Check className="h-4 w-4" />}
                  <input type="file" accept="image/*" className="hidden" onChange={handleCatalogBgUpload} />
                </label>

                {catalogBgImage && (
                  <button onClick={() => { setCatalogBgImage(null); setCatalogBgId('clean'); }} className="w-full rounded-xl border border-[#dbe5f0] px-3 py-2 text-xs font-black uppercase tracking-wide text-[#6b1e23] transition-colors hover:bg-[#fff4f4]">
                    Remove image
                  </button>
                )}
              </section>

              <section className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-wide text-[#5b6472]">Share</p>
                <div className="rounded-2xl border border-[#e6ecf2] bg-[#f7f9fc] p-4">
                  <p className="truncate text-sm font-black text-[#141e30]">{routineDisplayName}</p>
                  <p className="mt-1 text-xs font-bold text-[#5b6472]">{routineItemCount} items ready</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={handleCopyShareLink}
                      disabled={!hasRoutineItems}
                      className="flex items-center justify-center gap-2 rounded-xl border border-[#dbe5f0] bg-white px-3 py-3 text-xs font-black uppercase tracking-wide text-[#141e30] disabled:opacity-45"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </button>
                    <button
                      onClick={handleShareToWhatsApp}
                      disabled={!hasRoutineItems}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#28623a] px-3 py-3 text-xs font-black uppercase tracking-wide text-white disabled:opacity-45"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Send
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {activeTab === 'export' && (
        <div className="fixed bottom-[86px] left-0 right-0 z-50 px-4">
          <div className="mx-auto grid max-w-md grid-cols-[1fr_2fr] gap-2 rounded-3xl border border-[#e6ecf2] bg-white/95 p-2 shadow-[0_-18px_42px_-28px_rgba(20,30,48,0.5)] backdrop-blur-xl">
            <button
              onClick={handleCopyShareLink}
              disabled={!hasRoutineItems}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#dbe5f0] bg-white text-xs font-black uppercase tracking-wide text-[#141e30] disabled:opacity-45"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
            <button
              onClick={handleShareToWhatsApp}
              disabled={!hasRoutineItems}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#28623a] text-xs font-black uppercase tracking-wide text-white shadow-[0_14px_28px_-18px_rgba(40,98,58,0.8)] disabled:opacity-45 disabled:shadow-none"
            >
              <Share2 className="h-4 w-4" />
              WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 shrink-0 bg-gradient-to-t from-white via-white/95 to-transparent p-3" role="navigation">
        <div className="mx-auto flex max-w-md items-center justify-between rounded-3xl border border-[#e6ecf2] bg-white/95 p-1.5 shadow-[0_-14px_32px_-24px_rgba(20,30,48,0.35)] backdrop-blur-3xl">
            <button 
              onClick={() => { setActiveTab('catalog'); setBuilderMode('workout'); }}
              aria-label="Add exercises"
              className={`flex h-14 w-20 flex-col items-center justify-center gap-1 rounded-2xl transition-[background-color,color] duration-300 ${activeTab === 'catalog' ? 'bg-[#141e30] text-white' : 'text-[#35577d] hover:bg-[#f7f9fc] hover:text-[#141e30]'}`}
            >
              <img
                src="/icons/fit-legacy-mark.svg"
                alt=""
                aria-hidden="true"
                className="w-5 h-5 object-contain"
              />
              <span className="text-[8px] font-black uppercase tracking-wide">Add</span>
            </button>
            <button 
              onClick={() => setActiveTab('food')}
              aria-label={`View meals (${currentRoutine.foods.length} items)`}
              className={`relative flex h-14 w-20 flex-col items-center justify-center gap-1 rounded-2xl transition-[background-color,color] duration-300 ${activeTab === 'food' ? 'bg-[#141e30] text-white' : 'text-[#35577d] hover:bg-[#f7f9fc] hover:text-[#141e30]'}`}
            >
              <Apple size={18} />
              <span className="text-[8px] font-black uppercase tracking-wide">Meals</span>
              {currentRoutine.foods.length > 0 && (
                <div className="absolute right-4 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#28623a]" aria-hidden="true">
                  <span className="text-[8px] font-black text-white">{currentRoutine.foods.length}</span>
                </div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('build')}
              aria-label={`View routine (${currentRoutine.exercises.length} exercises)`}
              className={`relative flex h-14 w-20 flex-col items-center justify-center gap-1 rounded-2xl transition-[background-color,color] duration-300 ${activeTab === 'build' ? 'bg-[#141e30] text-white' : 'text-[#35577d] hover:bg-[#f7f9fc] hover:text-[#141e30]'}`}
            >
              <ExerciseIcon section="fullbody" className="w-5 h-5 relative z-10" />
              <span className="text-[8px] font-black uppercase tracking-wide">Routine</span>
              {currentRoutine.exercises.length > 0 && (
                <div className="absolute right-4 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#6b1e23]" aria-hidden="true">
                  <span className="text-[8px] font-black text-white">{currentRoutine.exercises.length}</span>
                </div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('export')}
              aria-label="Share routine"
              className={`flex h-14 w-20 flex-col items-center justify-center gap-1 rounded-2xl transition-[background-color,color] duration-300 ${activeTab === 'export' ? 'bg-[#141e30] text-white' : 'text-[#35577d] hover:bg-[#f7f9fc] hover:text-[#141e30]'}`}
            >
              <img
                src="/icons/fl-1.svg"
                alt=""
                aria-hidden="true"
                className="w-4 h-5 object-contain"
              />
              <span className="text-[8px] font-black uppercase tracking-wide">Share</span>
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
