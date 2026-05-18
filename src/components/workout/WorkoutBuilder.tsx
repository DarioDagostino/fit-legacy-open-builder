import { lazy, Suspense, useState, useMemo, useEffect, useCallback, type ComponentType } from 'react';
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
  Check,
  CalendarDays,
  SlidersHorizontal
} from 'lucide-react';
import { SocialJoin, UNIFIED_EXERCISES, UNIFIED_FOODS } from '@fit-legacy/shared';
import { useWorkoutStore } from '../../lib/store';
import { createPersistentWirShare } from '../../lib/share';
import { loadRoutineAnalyticsStats } from '../../lib/routineAnalytics';
import { toast } from 'sonner';
import CalendarPanel, { loadCalendarEntries, saveCalendarEntry, type CalendarEntry } from './CalendarPanel';
import mobileFirstBuilderConfig from '../../config/mobileFirstBuilder.json';

const WirCanvasPreview = lazy(() =>
  import('../wir/WirCanvasPreview').then((module) => ({ default: module.WirCanvasPreview }))
);

const MOBILE_FIRST_CONFIG = mobileFirstBuilderConfig;

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

type TabType = 'catalog' | 'food' | 'build' | 'calendar' | 'export';

const CUSTOMIZE_KEY = 'catalog-customize-config';
const ONBOARDING_KEY = 'fl-builder-onboarding-v1';
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
  protein: 'Proteinas',
  carbs: 'Carbs',
  fats: 'Grasas',
  fruits: 'Frutas',
  vegetables: 'Verduras',
  micros: 'Micros',
  supplements: 'Suplementos deportivos',
  others: 'Extras',
};

const FOOD_FILTER_ORDER = ['protein', 'carbs', 'fats', 'fruits', 'supplements', 'vegetables', 'micros', 'others'];
const FRUIT_TERMS = ['fruta', 'banana', 'platano', 'manzana', 'arandano', 'frutilla', 'kiwi', 'naranja', 'mandarina', 'sandia', 'papaya', 'durazno', 'pera'];
const VEGETABLE_TERMS = ['vegetal', 'verdura', 'brocoli', 'coliflor', 'espinaca', 'acelga', 'kale', 'lechuga', 'rucula', 'zanahoria', 'pimiento', 'tomate', 'calabaza', 'zapallo', 'champinon', 'portobello', 'pepino', 'cebolla', 'repollo', 'apio', 'rabano'];

function normalizeFilterId(value?: string) {
  const normalized = (value || '').toLowerCase().trim();
  if (normalized === 'fruit') return 'fruits';
  if (normalized === 'vegetable') return 'vegetables';
  return normalized;
}

function normalizeCatalogText(value?: string) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

const ONBOARDING_STEPS: Array<{
  title: string;
  body: string;
  tab: TabType;
  icon: 'add' | 'meals' | 'routine' | 'share';
}> = [
  {
    title: 'Agrega ejercicios',
    body: 'Busca por grupo muscular, toca el + y arma la base del plan en segundos.',
    tab: 'catalog',
    icon: 'add',
  },
  {
    title: 'Suma meals',
    body: 'Cambia a Meals para combinar comidas, calorias y macros con la rutina.',
    tab: 'food',
    icon: 'meals',
  },
  {
    title: 'Ajusta la rutina',
    body: 'En Routine editas series, reps, peso y notas antes de compartir.',
    tab: 'build',
    icon: 'routine',
  },
  {
    title: 'Comparte y mide',
    body: 'Share genera el link .wir y Calendar guarda analytics en tiempo real.',
    tab: 'export',
    icon: 'share',
  },
];

function OnboardingIcon({ type }: { type: 'add' | 'meals' | 'routine' | 'share' }) {
  if (type === 'meals') return <Apple className="h-5 w-5" />;
  if (type === 'routine') return <Dumbbell className="h-5 w-5" />;
  if (type === 'share') return <Share2 className="h-5 w-5" />;
  return <Plus className="h-5 w-5" />;
}

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
    getShareableWir,
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
  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>(() => loadCalendarEntries());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showPayloadPreview, setShowPayloadPreview] = useState(false);

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
    const categorySet = new Set(Object.keys(UNIFIED_FOODS));
    categorySet.add('fruits');
    categorySet.add('vegetables');
    if (Array.isArray((UNIFIED_FOODS as any).supplements) && (UNIFIED_FOODS as any).supplements.length > 0) {
      categorySet.add('supplements');
    }

    const categories = Array.from(categorySet).sort((a, b) => {
      const aIndex = FOOD_FILTER_ORDER.indexOf(normalizeFilterId(a));
      const bIndex = FOOD_FILTER_ORDER.indexOf(normalizeFilterId(b));
      const safeA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
      const safeB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
      return safeA - safeB;
    });

    return [
      { id: 'all', label: FILTER_LABELS.all },
      ...categories
        .filter((id) => normalizeFilterId(id) !== 'micros' && normalizeFilterId(id) !== 'others')
        .map((id) => ({
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
        items.map(item => ({ ...item, category: (item as any).category || category }))
      );
  }, []);

  // Set Language and A11y (Senior)
  useEffect(() => {
    document.documentElement.lang = 'es';
  }, []);

  useEffect(() => {
    setShowOnboarding(localStorage.getItem(ONBOARDING_KEY) !== 'done');
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
    const normalizedSearch = normalizeCatalogText(search);

    return items.filter(item => {
      const itemText = normalizeCatalogText(`${item.name} ${(item as any).tags?.join(' ') || ''} ${(item as any).category || ''}`);
      const matchesSearch = itemText.includes(normalizedSearch);
      const cat = builderMode === 'workout' ? (item as any).section : (item as any).category;
      const normalizedCat = normalizeFilterId(cat);
      const matchesVirtualFoodFilter =
        builderMode === 'food' && (
          (normalizedFilter === 'fruits' && FRUIT_TERMS.some((term) => itemText.includes(term))) ||
          (normalizedFilter === 'vegetables' && VEGETABLE_TERMS.some((term) => itemText.includes(term)))
        );
      const matchesFilter = normalizedFilter === 'all' || normalizedCat === normalizedFilter || matchesVirtualFoodFilter;
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
        : activeTab === 'calendar'
          ? 'Calendar'
          : 'Share';

  const screenSubtitle = activeTab === 'catalog'
    ? 'Add exercises or meals to create a shareable routine link.'
    : activeTab === 'food'
      ? 'Adjust meal portions before sharing.'
      : activeTab === 'build'
        ? 'Edit the routine your client will open.'
        : activeTab === 'calendar'
          ? 'Track shared routines and progress.'
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
    const contentType = shareTemplate === 'meal' ? 'plan de comidas' : shareTemplate === 'mixed' ? 'rutina y comidas' : 'rutina de entrenamiento';
    
    return `¿Estás listo para empezar tu nuev@ ${contentType} personalizado?\nHaz clic en este link ahora y accede a tu plan sin instalar nada.\n\n${link}`;
  }, [shareTemplate, getShareableLink, selectedWirPalette]);

  const sharePayloadPreview = useMemo(() => {
    const wir = getShareableWir(selectedWirPalette);
    if (!wir) {
      return '{\n  "v": 1,\n  "status": "add_items_first"\n}';
    }
    return JSON.stringify(wir, null, 2);
  }, [getShareableWir, selectedWirPalette]);

  const analyticsSlugKey = useMemo(() => {
    return Array.from(new Set(calendarEntries.map((entry) => entry.slug).filter(Boolean))).join('|');
  }, [calendarEntries]);

  const saveShareToCalendar = useCallback((slug?: string) => {
    const todayKey = new Date().toISOString().slice(0, 10);
    const updated = saveCalendarEntry({
      date: todayKey,
      type: shareTemplate === 'meal' ? 'nutrition' : shareTemplate === 'mixed' ? 'mixed' : 'workout',
      name: routineDisplayName,
      exercises: currentRoutine.exercises.length,
      foods: currentRoutine.foods.length,
      totalVolume,
      totalCalories: totalMacros.calories,
      slug,
    });
    setCalendarEntries(updated);
  }, [
    currentRoutine.exercises.length,
    currentRoutine.foods.length,
    routineDisplayName,
    shareTemplate,
    totalMacros.calories,
    totalVolume,
  ]);

  const getBestShareTarget = async () => {
    const fallbackLink = getShareableLink(selectedWirPalette);
    const wir = getShareableWir(selectedWirPalette);
    if (!wir) return { link: fallbackLink, slug: undefined };

    const persisted = await createPersistentWirShare(wir, routineDisplayName);
    return { link: persisted?.url || fallbackLink, slug: persisted?.slug };
  };

  useEffect(() => {
    if (activeTab !== 'calendar') return;
    const slugs = analyticsSlugKey.split('|').filter(Boolean);
    if (slugs.length === 0) return;

    let cancelled = false;
    loadRoutineAnalyticsStats(slugs).then((stats) => {
      if (cancelled || stats.length === 0) return;
      const statsBySlug = new Map(stats.map((item) => [item.slug, item]));
      setCalendarEntries((current) => current.map((entry) => {
        if (!entry.slug) return entry;
        const stat = statsBySlug.get(entry.slug);
        if (!stat) return entry;
        return {
          ...entry,
          views: stat.totalViews,
          completions: stat.completedViews,
          reshares: stat.reshareCount,
          avgTimeSpent: stat.avgTimeSpent,
        };
      }));
    });

    return () => {
      cancelled = true;
    };
  }, [activeTab, analyticsSlugKey]);

  const handleShareToWhatsApp = async () => {
    if (!hasRoutineItems) {
      toast.error('Add at least one item before sharing');
      return;
    }

    const toastId = toast.loading('Creating share link...');
    const { link, slug } = await getBestShareTarget();
    toast.dismiss(toastId);

    const message = sharePreviewText.replace(getShareableLink(selectedWirPalette), link);
    saveShareToCalendar(slug);
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopyShareLink = async () => {
    if (!hasRoutineItems) {
      toast.error('Add at least one item before copying a link');
      return;
    }

    const toastId = toast.loading('Creating share link...');
    const wir = getShareableWir(selectedWirPalette);
    const persisted = wir ? await createPersistentWirShare(wir, routineDisplayName) : null;
    toast.dismiss(toastId);

    const link = persisted?.url || getShareableLink(selectedWirPalette);
    if (!link) return;
    navigator.clipboard.writeText(link);
    saveShareToCalendar(persisted?.slug);
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

  const completeOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, 'done');
    setShowOnboarding(false);
  }, []);

  const goToOnboardingStep = useCallback((stepIndex: number) => {
    const step = ONBOARDING_STEPS[stepIndex];
    setOnboardingStep(stepIndex);
    setActiveTab(step.tab);
    if (step.tab === 'catalog') {
      setBuilderMode('workout');
    }
    if (step.tab === 'food') {
      setBuilderMode('nutrition');
    }
  }, [setBuilderMode]);

  const advanceOnboarding = useCallback(() => {
    if (onboardingStep >= ONBOARDING_STEPS.length - 1) {
      completeOnboarding();
      return;
    }
    goToOnboardingStep(onboardingStep + 1);
  }, [completeOnboarding, goToOnboardingStep, onboardingStep]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.08),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f6f9fc_100%)] text-[#141e30] font-sans selection:bg-[#0071e3]/15 flex flex-col overflow-hidden">
      
      {/* App Header */}
      <header className="shrink-0 z-10 border-b border-white/70 bg-white/78 px-3 py-2 text-[#141e30] shadow-[0_16px_34px_-30px_rgba(20,30,48,0.38)] backdrop-blur-2xl sm:px-4 sm:py-3" role="banner">
        <div className="flex min-h-[42px] items-center justify-between gap-2 sm:min-h-[48px] sm:gap-4">
           <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
             <div className="builder-header-mark flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden p-0.5 sm:h-11 sm:w-11 sm:p-1">
               <img src="/icons/fit-legacy-mark.svg" alt="FL" className="h-full w-full rounded-lg object-cover" />
             </div>
             <div className="min-w-0">
               <p className="truncate text-sm font-black leading-tight sm:text-lg">{screenTitle}</p>
               <p className="hidden text-[11px] font-bold leading-tight text-[#5b6472] min-[390px]:line-clamp-1 sm:block sm:text-xs">{screenSubtitle}</p>
             </div>
           </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="builder-status-chip hidden px-3 py-2 text-xs font-black text-[#5b6472] sm:block">
              {routineItemCount} items
            </div>
            <button
              onClick={() => setShowCustomize(true)}
              className="builder-cta-ghost flex h-9 items-center justify-center gap-1.5 px-2.5 text-[10px] font-black uppercase tracking-wide sm:h-auto sm:px-3 sm:py-2 sm:text-xs"
              aria-label="Open share settings"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden min-[360px]:inline">Settings</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className="relative z-10 flex-1 overflow-hidden lg:grid lg:grid-cols-[280px_minmax(0,1fr)_360px] lg:gap-4 lg:p-4"
        data-builder-preset={MOBILE_FIRST_CONFIG.id}
        data-default-viewport={MOBILE_FIRST_CONFIG.defaultViewport}
      >
        <motion.div
          className="pointer-events-none absolute inset-4 hidden overflow-hidden rounded-[2.25rem] lg:block"
          aria-hidden="true"
        >
          <motion.div
            className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#0071e3]/10 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, -10, 0], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-16 bottom-10 h-60 w-60 rounded-full bg-[#b4ff00]/10 blur-3xl"
            animate={{ x: [0, -16, 0], y: [0, 12, 0], opacity: [0.38, 0.72, 0.38] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: -18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden min-h-0 flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_24px_60px_-36px_rgba(20,30,48,0.45)] backdrop-blur-2xl lg:flex"
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#5b6472]">{MOBILE_FIRST_CONFIG.defaultViewport}-first</p>
              <h2 className="mt-1 text-xl font-black tracking-[-0.04em] text-[#141e30]">Builder Tools</h2>
            </div>
            <motion.button
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowCustomize(true)}
              className="builder-icon-button flex h-10 w-10 items-center justify-center"
              aria-label="Open settings"
            >
              <SlidersHorizontal size={18} />
            </motion.button>
          </div>

          <div className="mb-5 grid gap-2">
            {[
              { id: 'catalog' as TabType, label: 'Catalog', meta: `${filteredItems.length} options`, icon: Search },
              { id: 'build' as TabType, label: 'Routine', meta: `${currentRoutine.exercises.length} exercises`, icon: Dumbbell },
              { id: 'food' as TabType, label: 'Meals', meta: `${currentRoutine.foods.length} foods`, icon: Apple },
              { id: 'calendar' as TabType, label: 'Calendar', meta: `${calendarEntries.length} entries`, icon: CalendarDays },
              { id: 'export' as TabType, label: 'Share', meta: 'Client preview', icon: Share2 },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3 text-left transition-all ${
                  activeTab === item.id
                    ? 'border-[#141e30]/12 bg-[#141e30] text-white shadow-[0_18px_34px_-24px_rgba(20,30,48,0.7)]'
                    : 'border-[#dfe7f0] bg-white/60 text-[#35577d] hover:bg-white hover:text-[#141e30]'
                }`}
              >
                {activeTab === item.id && (
                  <motion.span
                    layoutId="desktop-nav-active-glow"
                    className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#b4ff00] shadow-[0_0_18px_rgba(180,255,0,0.72)]"
                  />
                )}
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                  activeTab === item.id ? 'bg-white/14 text-white' : 'bg-[#f2f6fb] text-[#35577d]'
                }`}>
                  <item.icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-black uppercase tracking-[0.12em]">{item.label}</span>
                  <span className={`mt-0.5 block truncate text-[10px] font-bold ${
                    activeTab === item.id ? 'text-white/55' : 'text-[#7b8797]'
                  }`}>{item.meta}</span>
                </span>
              </motion.button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#5b6472]">Focus</p>
              <p className="text-[10px] font-bold text-[#7b8797]">{builderMode === 'workout' ? 'Exercises' : 'Meals'}</p>
            </div>
            <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar">
              {(builderMode === 'workout' ? workoutFilters : foodFilters).map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => {
                    setActiveTab('catalog');
                    setActiveFilter(filter.id);
                  }}
                  className={`relative flex w-full items-center justify-between overflow-hidden rounded-2xl border px-3 py-2.5 text-left transition-all ${
                    activeFilter === filter.id
                      ? 'border-[#0071e3]/20 bg-[#eaf4ff] text-[#102033]'
                      : 'border-transparent bg-transparent text-[#5b6472] hover:border-[#dfe7f0] hover:bg-white/70'
                  }`}
                >
                  {activeFilter === filter.id && (
                    <motion.span
                      layoutId="desktop-filter-active-bg"
                      className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_0%,rgba(0,113,227,0.16),transparent_40%)]"
                    />
                  )}
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm">
                      {builderMode === 'workout'
                        ? <ExerciseIcon section={filter.id === 'all' ? 'fullbody' : filter.id} className="h-5 w-5" />
                        : <FoodIcon category={filter.id === 'all' ? 'protein' : filter.id} className="h-4 w-4" />}
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.08em]">{filter.label}</span>
                  </span>
                  {activeFilter === filter.id && <Check size={15} />}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.aside>

      {/* Main Viewport */}
      <motion.main
        initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full min-h-0 flex-1 overflow-hidden lg:rounded-[2rem] lg:border lg:border-white/70 lg:bg-white/45 lg:shadow-[0_24px_60px_-36px_rgba(20,30,48,0.42)]"
        role="main"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'catalog' && (
            <motion.div 
              key={`catalog-${builderMode}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col gap-4 overflow-hidden rounded-[2rem] p-3 pt-3 sm:gap-6 sm:p-6"
              style={catalogActiveBg}
            >
              {/* Internal Discovery Toggle */}
              <div className="builder-glass-shell relative flex h-[52px] items-center overflow-hidden rounded-[1.35rem] p-1 shadow-[0_18px_42px_-30px_rgba(20,30,48,0.5)] sm:h-14" role="tablist">
                 <motion.div 
                    initial={false}
                    animate={{ x: builderMode === 'workout' ? 0 : '100%' }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute bottom-1 left-1 top-1 z-0 w-[calc(50%-4px)] rounded-[1.05rem] bg-gradient-to-b from-[#2ea7ff] to-[#0071e3] shadow-[0_16px_26px_-18px_rgba(0,113,227,0.7)]"
                 />
                 
                 <button 
                  onClick={() => setBuilderMode('workout')} 
                  role="tab"
                  aria-selected={builderMode === 'workout'}
                  className={`relative flex-1 h-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] transition-colors duration-300 z-10 ${builderMode === 'workout' ? 'text-white' : 'text-[#35577d] hover:text-[#141e30]'}`}
                >
                  <Dumbbell size={16} />
                  Exercises
                </button>
                <button 
                  onClick={() => setBuilderMode('nutrition')} 
                  role="tab"
                  aria-selected={builderMode === 'nutrition'}
                  className={`relative flex-1 h-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] transition-colors duration-300 z-10 ${builderMode === 'nutrition' ? 'text-white' : 'text-[#35577d] hover:text-[#141e30]'}`}
                >
                  <Apple size={16} />
                  Meals
                </button>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5b6472]" aria-hidden="true" />
                  <input 
                    type="text"
                    placeholder={`Search ${builderMode === 'workout' ? 'exercises' : 'foods'}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="builder-apple-input w-full py-4 pl-12 pr-4 focus:outline-none font-bold text-[15px] text-[#102033] placeholder:text-[#5b6472]"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#5b6472]">Focus</p>
                  <p className="text-[10px] font-bold text-[#7b8797]">{filteredItems.length} options</p>
                </div>
                <div className="-mx-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
                   {(builderMode === 'workout' ? workoutFilters : foodFilters).map(f => (
                     <button
                       key={f.id}
                       onClick={() => setActiveFilter(f.id)}
                       className={`group flex min-w-[112px] snap-start items-center gap-2.5 whitespace-nowrap px-3.5 py-3 text-left transition-all active:scale-95 ${
                         activeFilter === f.id ? 'builder-cta-primary' : 'builder-focus-pill'
                       }`}
                     >
                       <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                         activeFilter === f.id ? 'bg-white/18 text-white' : 'bg-white/70 text-[#0071e3]'
                       }`}>
                         {builderMode === 'workout'
                           ? <ExerciseIcon section={f.id === 'all' ? 'fullbody' : f.id} className="h-6 w-6" />
                           : <FoodIcon category={f.id === 'all' ? 'protein' : f.id} className="h-5 w-5" />}
                       </span>
                       <span className="flex min-w-0 flex-col">
                         <span className="truncate text-[10px] font-black uppercase tracking-[0.12em]">{f.label}</span>
                         <span className={`text-[8px] font-bold uppercase tracking-[0.16em] ${
                           activeFilter === f.id ? 'text-white/72' : 'text-[#7b8797]'
                         }`}>
                           {f.id === 'all' ? 'All' : builderMode === 'workout' ? 'Muscle' : 'Meal'}
                         </span>
                       </span>
                     </button>
                   ))}
                </div>
              </div>

              <div className="-mx-1 flex-1 overflow-y-auto space-y-3 px-1 pr-1 custom-scrollbar pb-28 sm:pr-2">
                {isCustomWorkoutFilter && (
                  <div className="builder-apple-card p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#254667]">Custom exercise</p>
                      <ExerciseIcon section="custom" className="w-6 h-6" />
                    </div>

                    <input
                      type="text"
                      value={customExerciseName}
                      onChange={(e) => setCustomExerciseName(e.target.value)}
                      placeholder="Exercise name"
                      className="builder-apple-input w-full py-2.5 px-3 text-xs font-bold text-[#102033] placeholder:text-[#5b6472] focus:outline-none"
                    />

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <p className="text-[8px] font-black uppercase text-[#5b6472]">Sets</p>
                        <div className="builder-apple-tile flex items-center justify-between px-2 py-1.5">
                          <button onClick={() => setCustomSeries(v => Math.max(1, v - 1))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
                          <span className="text-xs font-black text-[#102033]">{customSeries}</span>
                          <button onClick={() => setCustomSeries(v => Math.min(20, v + 1))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[8px] font-black uppercase text-[#5b6472]">Reps</p>
                        <div className="builder-apple-tile flex items-center justify-between px-2 py-1.5">
                          <button onClick={() => setCustomReps(v => Math.max(1, v - 1))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
                          <span className="text-xs font-black text-[#102033]">{customReps}</span>
                          <button onClick={() => setCustomReps(v => Math.min(100, v + 1))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[8px] font-black uppercase text-[#5b6472]">Weight</p>
                        <div className="builder-apple-tile flex items-center justify-between px-2 py-1.5">
                          <button onClick={() => setCustomWeight(v => Math.max(0, v - 2.5))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
                          <span className="text-xs font-black text-[#102033]">{customWeight}</span>
                          <button onClick={() => setCustomWeight(v => Math.min(500, Number((v + 2.5).toFixed(1))))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={addCustomExercise}
                      className="builder-cta-primary w-full py-2.5 text-[10px] font-black uppercase tracking-widest"
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
                  filteredItems.map((item, index) => (
                    <motion.div
                      key={`${builderMode}-${item.id}`}
                      initial={{ opacity: 0, y: 18, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.34, delay: Math.min(index * 0.018, 0.16), ease: [0.22, 1, 0.36, 1] }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => {
                        builderMode === 'workout' ? addExercise(item as any) : addFood(item as any);
                        toast.success(`${item.name} added`);
                      }}
                      className="builder-apple-card flex min-h-[82px] cursor-pointer items-center justify-between gap-3 p-3.5 transition-all group hover:-translate-y-0.5 sm:min-h-0 sm:p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                         <div className="builder-apple-tile flex h-[60px] w-[60px] shrink-0 items-center justify-center transition-colors sm:h-14 sm:w-14">
                           {builderMode === 'workout' ? <ExerciseIcon section={(item as any).section} className="w-11 h-11 sm:w-10 sm:h-10" /> : <FoodIcon category={(item as any).category} name={item.name} className="w-7 h-7 sm:w-6 sm:h-6" />}
                         </div>
                         <div className="min-w-0">
                           <p className="line-clamp-2 font-black italic uppercase text-[13px] leading-tight text-[#0f1b2d] group-active:text-[#0f1b2d] sm:text-sm">{item.name}</p>
                           <p className="text-[8px] font-bold text-[#3f556f] uppercase tracking-widest">
                             {builderMode === 'workout' ? (item as any).section : (item as any).category}
                           </p>
                         </div>
                      </div>
                      <button className="builder-icon-button flex h-10 w-10 shrink-0 items-center justify-center group-active:bg-[#141e30] group-active:text-white sm:h-8 sm:w-8">
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
                  <div className="builder-apple-tile p-3 text-center">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="carbs" name="rice" className="w-4 h-4" />
                    </div>
                    <p className="text-[7px] font-black text-[#5b6472] uppercase">Kcal</p>
                    <p className="text-sm font-black text-[#28623a]">{Math.round(totalMacros.calories)}</p>
                  </div>
                  <div className="builder-apple-tile p-3 text-center">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="protein" name="egg" className="w-4 h-4" />
                    </div>
                    <p className="text-[7px] font-black text-[#6b1e23] uppercase">Prot</p>
                    <p className="text-sm font-black text-[#6b1e23]">{Math.round(totalMacros.protein)}g</p>
                  </div>
                  <div className="builder-apple-tile p-3 text-center">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="carbs" name="noodles" className="w-4 h-4" />
                    </div>
                    <p className="text-[7px] font-black text-[#35577d] uppercase">Carb</p>
                    <p className="text-sm font-black text-[#35577d]">{Math.round(totalMacros.carbs)}g</p>
                  </div>
                  <div className="builder-apple-tile p-3 text-center">
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
                      <button onClick={() => { setActiveTab('catalog'); setBuilderMode('nutrition'); }} className="builder-cta-primary mt-2 px-4 py-3 text-[10px] font-black uppercase tracking-widest">Add food</button>
                    </div>
                  </div>
                ) : (
                  currentRoutine.foods.map(food => (
                    <div key={food.id} className="builder-apple-card flex items-center justify-between p-5">
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
                           <div className="builder-apple-tile flex items-center gap-3 p-2">
                              <button onClick={() => updateFood(food.id, { quantity: Math.max(25, food.quantity - 25) })} className="builder-icon-button flex h-7 w-7 items-center justify-center"><Minus size={16} /></button>
                              <span className="text-xs font-black w-10 text-center">{food.quantity}g</span>
                              <button onClick={() => updateFood(food.id, { quantity: food.quantity + 25 })} className="builder-icon-button flex h-7 w-7 items-center justify-center"><Plus size={16} /></button>
                              <button onClick={() => removeFood(food.id)} className="ml-1 pl-3 border-l border-[#e6ecf2] text-[#5b6472] transition-colors hover:text-red-500"><Trash2 size={16} /></button>
                           </div>
                           <div className="relative">
                              <MessageCircle size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#28623a] opacity-40" />
                              <input 
                                type="text"
                                placeholder="Note..."
                                value={food.notes || ''}
                                onChange={(e) => updateFood(food.id, { notes: e.target.value })}
                                className="builder-apple-input w-full py-1.5 pl-8 pr-3 text-[10px] font-bold focus:outline-none placeholder:italic"
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
                <div className="builder-apple-tile p-3 text-center">
                  <div className="mb-1 flex justify-center">
                    <ExerciseIcon section="fullbody" className="w-5 h-5" />
                  </div>
                  <p className="text-[7px] font-black text-[#5b6472] uppercase">Ejercicios</p>
                  <p className="text-sm font-black text-[#141e30]">{currentRoutine.exercises.length}</p>
                </div>
                <div className="builder-apple-tile p-3 text-center">
                  <div className="mb-1 flex justify-center">
                    <ExerciseIcon section="arms" className="w-5 h-5" />
                  </div>
                  <p className="text-[7px] font-black text-[#5b6472] uppercase">Sets</p>
                  <p className="text-sm font-black text-[#141e30]">{totalSets}</p>
                </div>
                <div className="builder-apple-tile p-3 text-center">
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
                        <button onClick={() => { setActiveTab('catalog'); setBuilderMode('workout'); }} className="builder-cta-primary px-4 py-3 text-[10px] font-black uppercase tracking-widest">Add exercise</button>
                        <button onClick={addSampleRoutine} className="builder-cta-ghost px-4 py-3 text-[10px] font-black uppercase tracking-widest">Use sample</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  currentRoutine.exercises.map(ex => (
                    <div key={ex.id} className="builder-apple-card p-5 space-y-5">
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            <ExerciseIcon section={ex.section} className="w-8 h-8" />
                            <h4 className="font-black italic uppercase text-xs tracking-tight">{ex.name}</h4>
                         </div>
                         <button onClick={() => removeExercise(ex.id)} className="builder-icon-button -mr-2 flex h-8 w-8 items-center justify-center hover:text-red-500"><X size={16} /></button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                         <div className="space-y-1">
                            <label className="text-[7px] font-black text-[#5b6472] uppercase">Sets</label>
                            <div className="builder-apple-tile flex items-center justify-between p-2">
                               <button onClick={() => updateExercise(ex.id, { sets: Math.max(1, ex.sets - 1) })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
                               <span className="text-xs font-black">{ex.sets}</span>
                               <button onClick={() => updateExercise(ex.id, { sets: ex.sets + 1 })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-[7px] font-black text-[#5b6472] uppercase">Reps</label>
                            <div className="builder-apple-tile flex items-center justify-between p-2">
                               <button onClick={() => updateExercise(ex.id, { reps: Math.max(1, ex.reps - 1) })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
                               <span className="text-xs font-black">{ex.reps}</span>
                               <button onClick={() => updateExercise(ex.id, { reps: ex.reps + 1 })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-[7px] font-black text-[#5b6472] uppercase">kg</label>
                            <div className="builder-apple-tile flex items-center justify-between p-2">
                               <button onClick={() => updateExercise(ex.id, { weight: Math.max(0, ex.weight - 2.5) })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
                               <span className="text-xs font-black">{ex.weight}</span>
                               <button onClick={() => updateExercise(ex.id, { weight: ex.weight + 2.5 })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
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
                          className="builder-apple-input w-full py-2 pl-8 pr-3 text-[10px] font-bold focus:outline-none placeholder:italic"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'calendar' && (
            <CalendarPanel entries={calendarEntries} />
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
                <div className="builder-apple-card p-5">
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

                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#5b6472]">Canvas Palette</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {CATALOG_BG_PRESETS.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setCatalogBgId(preset.id);
                          setCatalogBgImage(null);
                        }}
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 transition-all ${catalogBgId === preset.id && !catalogBgImage ? 'border-[#141e30] scale-110 shadow-md' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'}`}
                        style={preset.style}
                        title={preset.label}
                      >
                        {catalogBgId === preset.id && !catalogBgImage && (
                          <Check className="h-5 w-5 text-[#141e30] mix-blend-difference" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#5b6472]">Client preview</p>
                    <p className="text-xs font-bold text-[#5b6472]">What the recipient opens from WhatsApp.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('build')}
                    className="builder-cta-ghost px-4 py-2 text-[10px] font-black uppercase tracking-widest"
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
      </motion.main>

        <motion.aside
          initial={{ opacity: 0, x: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden min-h-0 overflow-hidden rounded-[2rem] border border-white/70 bg-white/82 p-4 shadow-[0_24px_60px_-36px_rgba(20,30,48,0.45)] backdrop-blur-2xl lg:flex lg:flex-col"
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <motion.div
            className="pointer-events-none absolute -right-20 top-20 h-44 w-44 rounded-full bg-[#0071e3]/10 blur-3xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#5b6472]">Live routine</p>
              <h2 className="mt-1 truncate text-xl font-black tracking-[-0.04em] text-[#141e30]">{routineDisplayName}</h2>
              <p className="mt-1 text-xs font-bold text-[#7b8797]">{routineItemCount} items ready</p>
            </div>
            <motion.button
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('export')}
              className="builder-cta-primary shrink-0 px-3 py-2 text-[10px] font-black uppercase tracking-widest"
            >
              Share
            </motion.button>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2">
            {[
              ['Exercises', currentRoutine.exercises.length],
              ['Meals', currentRoutine.foods.length],
              ['Sets', totalSets],
            ].map(([label, value]) => (
              <div key={label} className="builder-apple-tile p-3 text-center">
                <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[#5b6472]">{label}</p>
                <p className="mt-1 text-lg font-black text-[#141e30]">{value}</p>
              </div>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <div className="space-y-2">
              {currentRoutine.exercises.slice(0, 5).map((exercise) => (
                <div key={exercise.id} className="builder-apple-card flex items-center gap-3 p-3">
                  <ExerciseIcon section={exercise.section} className="h-8 w-8 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-black uppercase italic text-[#141e30]">{exercise.name}</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#7b8797]">{exercise.sets} x {exercise.reps} · {exercise.weight}kg</p>
                  </div>
                </div>
              ))}
              {currentRoutine.foods.slice(0, 4).map((food) => (
                <div key={food.id} className="builder-apple-card flex items-center gap-3 p-3">
                  <FoodIcon category={food.category || 'all'} name={food.name} className="h-6 w-6 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-black uppercase italic text-[#141e30]">{food.name}</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#7b8797]">{food.quantity}g · {Math.round((food.calories * food.quantity) / 100)} kcal</p>
                  </div>
                </div>
              ))}
              {!hasRoutineItems && (
                <div className="flex min-h-[180px] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#cfdbe8] bg-white/45 p-5 text-center">
                  <Dumbbell className="h-10 w-10 text-[#9aa9ba]" />
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[#5b6472]">No items yet</p>
                  <p className="mt-1 text-xs font-bold leading-relaxed text-[#7b8797]">Add exercises or meals from the catalog.</p>
                </div>
              )}
            </div>
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            className="mt-4 rounded-[1.5rem] border border-[#dfe7f0] bg-white/70 p-3 shadow-[0_18px_44px_-34px_rgba(20,30,48,0.52)]"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#5b6472]">Vista enviada</p>
                <p className="mt-1 text-[10px] font-bold text-[#7b8797]">Resumen del link que abre tu cliente.</p>
              </div>
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTab('export')}
                className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0071e3]"
              >
                Open
              </motion.button>
            </div>
            <div className="mb-3 rounded-[1.35rem] border border-[#e6ecf2] bg-white/80 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#141e30] text-white shadow-[0_16px_30px_-22px_rgba(20,30,48,0.8)]">
                  {shareTemplate === 'meal' ? <Apple size={18} /> : shareTemplate === 'mixed' ? <Share2 size={18} /> : <Dumbbell size={18} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black tracking-[-0.03em] text-[#141e30]">{routineDisplayName}</p>
                  <p className="mt-0.5 text-[10px] font-bold text-[#7b8797]">
                    {shareTemplate === 'meal' ? 'Plan de comidas' : shareTemplate === 'mixed' ? 'Rutina + comidas' : 'Rutina'} · {routineItemCount} items
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-3 grid grid-cols-3 gap-2">
              {[
                ['type', shareTemplate],
                ['palette', selectedWirPalette],
                ['items', routineItemCount],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[#e6ecf2] bg-white/70 p-2">
                  <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#7b8797]">{label}</p>
                  <p className="mt-1 truncate text-[10px] font-black uppercase text-[#141e30]">{value}</p>
                </div>
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPayloadPreview((current) => !current)}
              className="flex w-full items-center justify-between rounded-2xl border border-[#e6ecf2] bg-white/75 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#35577d]"
            >
              <span>{showPayloadPreview ? 'Ocultar JSON' : 'Ver JSON'}</span>
              <span className="text-[#0071e3]">{showPayloadPreview ? '−' : '+'}</span>
            </motion.button>
            <AnimatePresence initial={false}>
              {showPayloadPreview && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 max-h-[230px] overflow-auto rounded-[1.25rem] border border-[#141e30]/10 bg-[#07111f] p-3 shadow-inner custom-scrollbar">
                    <pre className="whitespace-pre-wrap break-words font-mono text-[10px] font-bold leading-relaxed text-[#d8e7f7]">
                      {sharePayloadPreview}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <div className="mt-4 rounded-[1.35rem] border border-[#e6ecf2] bg-white/60 p-3 shadow-[0_16px_38px_-32px_rgba(20,30,48,0.45)]">
            <SocialJoin
              title="Únete"
              align="center"
              className="[&_h4]:mb-3 [&_h4]:text-[9px] [&_div]:gap-2 [&_a]:h-8 [&_a]:w-8"
            />
          </div>
        </motion.aside>
      </div>

      <AnimatePresence>
        {showCustomize && (
          <>
            <motion.div
              key="settings-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCustomize(false)}
              className="fixed inset-0 z-40 bg-[#141e30]/10 backdrop-blur-md"
              aria-hidden="true"
            />
            <motion.aside
              key="settings-drawer"
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 48, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="builder-glass-shell fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[88dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[2rem] sm:inset-y-4 sm:right-4 sm:left-auto sm:h-auto sm:max-w-[380px] sm:rounded-[2rem]"
              aria-label="Share settings"
            >
            <div className="flex justify-center pt-2 sm:hidden" aria-hidden="true">
              <div className="h-1.5 w-12 rounded-full bg-[#dbe5f0]" />
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/70 px-4 pb-4 pt-3 sm:p-5">
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-[#35577d]" />
                  <h2 className="truncate text-sm font-black uppercase tracking-wide text-[#141e30]">Share settings</h2>
                </div>
                <p className="text-[11px] font-bold leading-snug text-[#5b6472] sm:text-xs sm:leading-relaxed">Brand, client view and delivery options.</p>
              </div>
              <button onClick={() => setShowCustomize(false)} className="builder-icon-button flex h-10 w-10 shrink-0 items-center justify-center" aria-label="Close settings">
                <X className="h-4 w-4 text-[#35577d]" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4 pb-28 sm:space-y-6 sm:p-5 sm:pb-28">
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#5b6472]">Brand</p>
                  {catalogLogo && (
                    <button onClick={() => setCatalogLogo(null)} className="text-[10px] font-black uppercase tracking-wide text-[#6b1e23]">
                      Remove
                    </button>
                  )}
                </div>
                <div className="builder-apple-card p-3 sm:p-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="builder-header-mark flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden p-1 sm:h-16 sm:w-16">
                      {catalogLogo ? <img src={catalogLogo} alt="Logo" className="h-full w-full rounded-lg object-cover" /> : <img src="/icons/fit-legacy-mark.svg" alt="Fit Legacy" className="h-full w-full rounded-lg object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-[#141e30]">Catalog logo</p>
                      <p className="mt-1 text-[11px] font-bold leading-snug text-[#5b6472] sm:text-xs sm:leading-relaxed">Shown in the builder catalog.</p>
                      <p className="mt-1 text-[10px] font-bold leading-snug text-[#7895b2]">
                        Max 1 MB. Ideal: WebP/JPG, 1080x1920 vertical or 1200x1200 square.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="builder-cta-ghost flex min-h-12 cursor-pointer items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-wide">
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
                      className={`builder-cta-ghost flex items-center gap-3 p-3 text-left ${catalogBgId === preset.id && !catalogBgImage ? 'border-[#35577d] bg-[#eff4fa]' : ''}`}
                    >
                    <span className="h-9 w-12 shrink-0 rounded-2xl border border-white shadow-inner" style={preset.style} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-black text-[#141e30]">{preset.label}</span>
                        <span className="block text-xs font-bold text-[#5b6472]">Preview palette</span>
                      </span>
                      {catalogBgId === preset.id && !catalogBgImage && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0071e3] text-white">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <label className={`builder-cta-ghost flex cursor-pointer items-center justify-between gap-3 p-3 ${catalogBgImage ? 'border-[#35577d] bg-[#eff4fa] text-[#35577d]' : ''}`}>
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="builder-apple-tile flex h-9 w-12 items-center justify-center">
                      <ImageIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black">{catalogBgImage ? 'Custom image' : 'Upload image'}</span>
                      <span className="block text-xs font-bold text-[#5b6472]">Use a custom background.</span>
                    </span>
                  </span>
                  {catalogBgImage && <Check className="h-4 w-4" />}
                  <input type="file" accept="image/*" className="hidden" onChange={handleCatalogBgUpload} />
                </label>

                {catalogBgImage && (
                  <button onClick={() => { setCatalogBgImage(null); setCatalogBgId('clean'); }} className="builder-cta-ghost w-full px-3 py-2 text-xs font-black uppercase tracking-wide text-[#6b1e23] hover:bg-[#fff4f4]">
                    Remove image
                  </button>
                )}
              </section>

              <section className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-wide text-[#5b6472]">Share</p>
                <div className="builder-apple-card p-4">
                  <p className="truncate text-sm font-black text-[#141e30]">{routineDisplayName}</p>
                  <p className="mt-1 text-xs font-bold text-[#5b6472]">{routineItemCount} items ready</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={handleCopyShareLink}
                      disabled={!hasRoutineItems}
                      className="builder-cta-ghost flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-wide"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </button>
                    <button
                      onClick={handleShareToWhatsApp}
                      disabled={!hasRoutineItems}
                      className="builder-cta-primary flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-wide"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Send
                    </button>
                  </div>
                </div>
              </section>

              <section className="builder-apple-card p-4">
                <SocialJoin
                  title="Únete"
                  align="center"
                  className="[&_h4]:mb-3 [&_h4]:text-[9px] [&_div]:gap-2 [&_a]:h-8 [&_a]:w-8"
                />
              </section>
            </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {activeTab === 'export' && (
        <div className="fixed bottom-[86px] left-0 right-0 z-50 px-4">
          <div className="builder-glass-shell mx-auto grid max-w-md grid-cols-[1fr_2fr] gap-2 rounded-[1.6rem] p-2">
            <button
              onClick={handleCopyShareLink}
              disabled={!hasRoutineItems}
              className="builder-cta-ghost flex h-12 items-center justify-center gap-2 text-xs font-black uppercase tracking-wide"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
            <button
              onClick={handleShareToWhatsApp}
              disabled={!hasRoutineItems}
              className="builder-cta-primary flex h-12 items-center justify-center gap-2 text-xs font-black uppercase tracking-wide"
            >
              <Share2 className="h-4 w-4" />
              WhatsApp
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showOnboarding && (
          <>
            <motion.div
              key="builder-onboarding-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-white/55 backdrop-blur-[2px]"
              aria-hidden="true"
            />
            <motion.section
              key="builder-onboarding"
              initial={{ opacity: 0, y: 80, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              className="fixed bottom-[92px] left-0 right-0 z-[60] px-4"
              aria-label="Primeros pasos del builder"
            >
            <div className="builder-glass-shell mx-auto max-w-md overflow-hidden rounded-[1.75rem] p-3">
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#7895b2]">
                    Primer ingreso
                  </p>
                  <h2 className="text-lg font-black italic uppercase tracking-tight text-[#141e30]">
                    Como funciona
                  </h2>
                </div>
                <button
                  onClick={completeOnboarding}
                  className="builder-icon-button flex h-9 w-9 shrink-0 items-center justify-center text-[#5b6472] hover:bg-white hover:text-[#141e30]"
                  aria-label="Cerrar guia inicial"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-2">
                {ONBOARDING_STEPS.map((step, index) => {
                  const isActive = onboardingStep === index;
                  return (
                    <motion.button
                      key={step.title}
                      type="button"
                      onClick={() => goToOnboardingStep(index)}
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0.78 }}
                      className={`builder-cta-ghost flex items-center gap-3 p-3 text-left ${
                        isActive
                          ? 'border-[#b8cce0] bg-[#eff4fa] shadow-sm'
                          : 'border-[#edf1f5] bg-white'
                      }`}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                        isActive ? 'bg-[#0071e3] text-white' : 'builder-apple-tile text-[#0071e3]'
                      }`}>
                        <OnboardingIcon type={step.icon} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#7895b2]">
                            Paso {index + 1}
                          </span>
                          {isActive && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="rounded-full bg-white px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-[#35577d]"
                            >
                              ahora
                            </motion.span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm font-black text-[#141e30]">{step.title}</p>
                        <p className="mt-0.5 text-[11px] font-bold leading-snug text-[#5b6472]">{step.body}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  onClick={completeOnboarding}
                  className="builder-cta-ghost px-3 py-3 text-[10px] font-black uppercase tracking-widest text-[#5b6472]"
                >
                  Saltar
                </button>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {ONBOARDING_STEPS.map((step, index) => (
                    <span
                      key={step.title}
                      className={`h-1.5 rounded-full transition-all ${
                        onboardingStep === index ? 'w-6 bg-[#0071e3]' : 'w-1.5 bg-[#dbe5f0]'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={advanceOnboarding}
                  className="builder-cta-primary px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                >
                  {onboardingStep === ONBOARDING_STEPS.length - 1 ? 'Listo' : 'Siguiente'}
                </button>
              </div>
            </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 shrink-0 bg-gradient-to-t from-white via-white/90 to-transparent p-3 lg:hidden" role="navigation">
        <div className="builder-glass-shell mx-auto flex max-w-md items-center justify-between rounded-[1.75rem] p-1.5">
            <button 
              onClick={() => { setActiveTab('catalog'); setBuilderMode('workout'); }}
              aria-label="Add exercises"
              className={`builder-nav-button flex h-14 w-[72px] flex-col items-center justify-center gap-1 duration-300 ${activeTab === 'catalog' ? 'is-active' : 'text-[#35577d]'}`}
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
              className={`builder-nav-button relative flex h-14 w-[72px] flex-col items-center justify-center gap-1 duration-300 ${activeTab === 'food' ? 'is-active' : 'text-[#35577d]'}`}
            >
              <Apple size={18} />
              <span className="text-[8px] font-black uppercase tracking-wide">Meals</span>
              {currentRoutine.foods.length > 0 && (
                <div className="absolute right-3 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#28623a]" aria-hidden="true">
                  <span className="text-[8px] font-black text-white">{currentRoutine.foods.length}</span>
                </div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('build')}
              aria-label={`View routine (${currentRoutine.exercises.length} exercises)`}
              className={`builder-nav-button relative flex h-14 w-[72px] flex-col items-center justify-center gap-1 duration-300 ${activeTab === 'build' ? 'is-active' : 'text-[#35577d]'}`}
            >
              <ExerciseIcon section="fullbody" className="w-5 h-5 relative z-10" />
              <span className="text-[8px] font-black uppercase tracking-wide">Routine</span>
              {currentRoutine.exercises.length > 0 && (
                <div className="absolute right-3 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#6b1e23]" aria-hidden="true">
                  <span className="text-[8px] font-black text-white">{currentRoutine.exercises.length}</span>
                </div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              aria-label="Calendar and analytics"
              className={`builder-nav-button relative flex h-14 w-[72px] flex-col items-center justify-center gap-1 duration-300 ${activeTab === 'calendar' ? 'is-active' : 'text-[#35577d]'}`}
            >
              <CalendarDays size={18} />
              <span className="text-[8px] font-black uppercase tracking-wide">Calendar</span>
              {calendarEntries.length > 0 && (
                <div className="absolute right-3 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#e67700]" aria-hidden="true">
                  <span className="text-[8px] font-black text-white">{calendarEntries.length > 9 ? '9+' : calendarEntries.length}</span>
                </div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('export')}
              aria-label="Share routine"
              className={`builder-nav-button flex h-14 w-[72px] flex-col items-center justify-center gap-1 duration-300 ${activeTab === 'export' ? 'is-active' : 'text-[#35577d]'}`}
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
