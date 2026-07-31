import { lazy, Suspense, useState, useMemo, useEffect, useCallback, useRef, type ComponentType } from 'react';
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
  SlidersHorizontal,
  Pencil,
  Settings2,
  UserRound,
} from 'lucide-react';
import { SocialJoin, UNIFIED_EXERCISES, UNIFIED_FOODS, type LegacitoSkin } from '@fit-legacy/shared';
import { DynamicLogoIcon } from '../DynamicLogoIcon';
import { SabiasQueBanner } from './SabiasQueBanner';
import { StreakGuard } from './StreakGuard';
import { NotificationBell } from './NotificationBell';
import { useWorkoutStore } from '../../lib/store';
import { createPersistentWirShare } from '../../lib/share';
import { loadRoutineAnalyticsStats } from '../../lib/routineAnalytics';
import { toast } from 'sonner';
import CalendarPanel, { loadCalendarActions, loadCalendarEntries, saveCalendarActions, saveCalendarEntry, type CalendarAction, type CalendarEntry } from './CalendarPanel';
import mobileFirstBuilderConfig from '../../config/mobileFirstBuilder.json';
import { AiMentorChat, LEGACITO_SKIN_OPTIONS } from '../../app/components/integrations/AiMentorChat';
import { onUserScopeChanged, scopedRawGet, scopedRawSet } from '../../lib/userScope';
import { reportCanonicalSyncError, syncCalendarActionsToSupabase, syncCalendarEntryToSupabase, syncRoutineToSupabase } from '../../lib/canonicalData';
import { copyTextWithFallback, openWhatsAppShare } from './builderSharing';

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
type BuilderProfile = 'woman' | 'man';

const CUSTOMIZE_KEY = 'catalog-customize-config';
const ONBOARDING_KEY = 'fl-builder-onboarding-v1';
const BUILDER_PROFILE_KEY = 'fl-builder-profile-v1';
const LEGACITO_SKIN_KEY = 'fl-builder-legacito-skin-v1';

const BUILDER_PROFILE_ASSETS: Record<BuilderProfile, string[]> = {
  woman: [
    '/assets_coach_tips/women_orange_energetico/athletic_woman_confident_pose.webp',
    '/assets_coach_tips/women_orange_energetico/athletic_woman_lunge_pose.webp',
    '/assets_coach_tips/women_orange_energetico/athletic_woman_protein.webp',
    '/assets_coach_tips/women_orange_energetico/athletic_woman_squat.webp',
    '/assets_coach_tips/women_orange_energetico/victory_jump_illustration.webp',
  ],
  man: [
    '/assets_coach_tips/man_orange_energetico/confident_athlete_standing.webp',
    '/assets_coach_tips/man_orange_energetico/751897927_1376542741270294_1485225782041362540_n.webp',
    '/assets_coach_tips/man_orange_energetico/athletic_man_protein.webp',
    '/assets_coach_tips/man_orange_energetico/752514664_1665291831230549_680017816444529485_n.webp',
    '/assets_coach_tips/man_orange_energetico/dynamic_protein_celebration.webp',
  ],
};

const BUILDER_PROFILE_OPTIONS: Array<{
  value: BuilderProfile;
  label: string;
  theme: string;
  image: string;
}> = [
  { value: 'woman', label: 'Woman', theme: 'Rose signal', image: BUILDER_PROFILE_ASSETS.woman[0] },
  { value: 'man', label: 'Man', theme: 'Orange signal', image: BUILDER_PROFILE_ASSETS.man[0] },
];
const CATALOG_BG_PRESETS = [
  {
    id: 'ember',
    label: 'Ember',
    style: {
      background: 'linear-gradient(145deg, #fff4f1 0%, #ffdcd2 45%, #ffc2b2 100%)',
    },
  },
  {
    id: 'onyx',
    label: 'Onyx',
    style: {
      background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 52%, #000000 100%)',
    },
  },
  {
    id: 'midnight',
    label: 'Midnight',
    style: {
      background: 'linear-gradient(145deg, #1a2744 0%, #0c1425 52%, #080e1a 100%)',
    },
  },
  {
    id: 'bloom',
    label: 'Bloom',
    style: {
      background: 'radial-gradient(circle at 20% 30%, #fffcf8, #fdf6ef 50%, #f5ede0 100%)',
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
      className={`${className} object-cover transition-transform duration-300 group-hover:scale-110`} 
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

const ExerciseIconTile = ({ section, className = '' }: { section: string; className?: string }) => (
  <div className={`shrink-0 overflow-hidden ${className}`.trim()}>
    <ExerciseIcon section={section} className="h-full w-full scale-[1.15]" />
  </div>
);

const FoodIconTile = ({
  category,
  name = '',
  className = '',
}: {
  category: string;
  name?: string;
  className?: string;
}) => (
  <div className={`builder-apple-tile flex shrink-0 items-center justify-center overflow-hidden ${className}`.trim()}>
    <FoodIcon category={category} name={name} className="h-full w-full" />
  </div>
);

const ONBOARDING_STEPS: Array<{
  title: string;
  body: string;
  tab: TabType;
  icon: 'profile' | 'add' | 'meals' | 'routine' | 'share';
}> = [
  {
    title: 'Elige tu señal',
    body: 'Rose para Woman u Orange para Man. Ambos viven sobre negro mate.',
    tab: 'catalog',
    icon: 'profile',
  },
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

function OnboardingIcon({ type }: { type: 'profile' | 'add' | 'meals' | 'routine' | 'share' }) {
  if (type === 'profile') return <UserRound className="h-5 w-5" />;
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
    loadRoutine,
    clearRoutine,
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
  const [calendarActions, setCalendarActions] = useState<CalendarAction[]>(() => loadCalendarActions());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [builderProfile, setBuilderProfile] = useState<BuilderProfile>(() => (
    scopedRawGet(BUILDER_PROFILE_KEY) === 'woman' ? 'woman' : 'man'
  ));
  const [legacitoSkin, setLegacitoSkin] = useState<LegacitoSkin>(() => {
    const stored = scopedRawGet(LEGACITO_SKIN_KEY) as LegacitoSkin | null;
    return LEGACITO_SKIN_OPTIONS.some((option) => option.value === stored) ? stored! : 'legacy-ai';
  });

  useEffect(() => {
    saveCalendarActions(calendarActions);
    void syncCalendarActionsToSupabase(calendarActions).catch(reportCanonicalSyncError);
  }, [calendarActions]);

  useEffect(() => onUserScopeChanged(() => {
    void useWorkoutStore.persist.rehydrate();
    setCalendarEntries(loadCalendarEntries());
    setCalendarActions(loadCalendarActions());
  }), []);

  useEffect(() => {
    if (!showCustomize) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowCustomize(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showCustomize]);
  const [navVisible, setNavVisible] = useState(true);
  const [chatOpen, setChatOpen] = useState(searchParams.get('start') === '1');
  const [rightPanelMode, setRightPanelMode] = useState<'canvas' | 'legacito'>('canvas');
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const THRESHOLD = 10;
    const onScroll = () => {
      const sy = window.scrollY;
      const delta = sy - lastScrollYRef.current;
      if (Math.abs(delta) > THRESHOLD) {
        setNavVisible(delta < 0);
        lastScrollYRef.current = sy;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    setShowOnboarding(scopedRawGet(ONBOARDING_KEY) !== 'done');
  }, []);

  useEffect(() => {
    scopedRawSet(BUILDER_PROFILE_KEY, builderProfile);
    document.documentElement.dataset.builderProfile = builderProfile;
  }, [builderProfile]);

  useEffect(() => {
    scopedRawSet(LEGACITO_SKIN_KEY, legacitoSkin);
  }, [legacitoSkin]);

  useEffect(() => {
    const stored = JSON.parse(scopedRawGet(CUSTOMIZE_KEY) || '{}');
    setCatalogLogo(stored.logo || null);
    setCatalogBgId(stored.bgId || 'clean');
    setCatalogBgImage(stored.bgImage || null);
  }, []);

  useEffect(() => {
    scopedRawSet(CUSTOMIZE_KEY, JSON.stringify({
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
      return;
    }
    if (searchParams.get('start') === '1') {
      clearRoutine();
      setActiveTab('build');
      return;
    }
    const plan = searchParams.get('plan');
    if (plan === 'strength' || plan === 'conditioning') {
      import('../../lib/templates').then(({ ROUTINE_TEMPLATES }) => {
        const template = ROUTINE_TEMPLATES[plan];
        if (template) {
          clearRoutine();
          template.exercises.forEach((ex) => addExercise(ex));
          updateRoutineName(template.name);
          setActiveTab('build');
        }
      });
    }
  }, [searchParams, loadRoutine, clearRoutine, addExercise, updateRoutineName]);

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
        builderMode === 'nutrition' && (
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
  const canvasProgress = Math.min(100,
    (currentRoutine.exercises.length > 0 ? 40 : 0)
    + (currentRoutine.foods.length > 0 ? 25 : 0)
    + (routineItemCount >= 3 ? 20 : routineItemCount * 5)
    + (currentRoutine.name.trim() && currentRoutine.name !== 'Untitled routine' ? 15 : 0)
  );
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

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void syncRoutineToSupabase(currentRoutine, routineDisplayName).catch(reportCanonicalSyncError);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [currentRoutine, routineDisplayName]);

  const [subtitleTick, setSubtitleTick] = useState(0);
  useEffect(() => {
    if (activeTab !== 'catalog') return;
    const t = setTimeout(() => setSubtitleTick(i => i + 1), 4000);
    return () => clearTimeout(t);
  }, [activeTab, subtitleTick]);

  const subtitleOptions = [
    'Construye rutinas y planes de nutrición compartibles en segundos.',
    'Tu estudio personalizado para forjar el legado de cada cliente.',
    'Diseña, comparte y mide el progreso de cada plan.',
  ];
  const screenSubtitle = activeTab === 'catalog'
    ? subtitleOptions[subtitleTick % 2]
    : activeTab === 'food'
      ? 'Adjust meal portions before sharing.'
      : activeTab === 'build'
        ? 'Edit the routine your client will open.'
        : activeTab === 'calendar'
          ? 'Track shared routines and progress.'
          : 'Preview the client view and send the link.';

  const selectedWirPalette = useMemo<'ember' | 'onyx' | 'midnight' | 'bloom' | undefined>(() => {
    if (catalogBgImage) {
      return undefined;
    }
    const allowed = ['ember', 'onyx', 'midnight', 'bloom'] as const;
    return (allowed as readonly string[]).includes(catalogBgId) ? (catalogBgId as (typeof allowed)[number]) : undefined;
  }, [catalogBgId, catalogBgImage]);

  const sharePreviewText = useMemo(() => {
    const link = getShareableLink(selectedWirPalette);
    const contentType = shareTemplate === 'meal' ? 'plan de comidas' : shareTemplate === 'mixed' ? 'rutina y comidas' : 'rutina de entrenamiento';
    
    return `¿Estás listo para empezar tu nuev@ ${contentType} personalizado?\nHaz clic en este link ahora y accede a tu plan sin instalar nada.\n\n${link}`;
  }, [shareTemplate, getShareableLink, selectedWirPalette]);

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
    const savedEntry = updated.find((entry) => entry.date === todayKey);
    if (savedEntry) void syncCalendarEntryToSupabase(savedEntry).catch(reportCanonicalSyncError);
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
    try {
      const { link, slug } = await getBestShareTarget();
      if (!link) throw new Error('No share link available');
      const message = sharePreviewText.replace(getShareableLink(selectedWirPalette), link);
      saveShareToCalendar(slug);
      if (!openWhatsAppShare(message)) throw new Error('Popup blocked');
    } catch (error) {
      console.error('WhatsApp share failed', error);
      toast.error('No pudimos abrir WhatsApp. Copiá el enlace para compartirlo manualmente.');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleCopyShareLink = async () => {
    if (!hasRoutineItems) {
      toast.error('Add at least one item before copying a link');
      return;
    }

    const toastId = toast.loading('Creating share link...');
    try {
      const wir = getShareableWir(selectedWirPalette);
      const persisted = wir ? await createPersistentWirShare(wir, routineDisplayName) : null;
      const link = persisted?.url || getShareableLink(selectedWirPalette);
      if (!link) throw new Error('No share link available');
      if (!await copyTextWithFallback(link)) throw new Error('Clipboard unavailable');
      saveShareToCalendar(persisted?.slug);
      toast.success('Link copied');
    } catch (error) {
      console.error('Copy share link failed', error);
      toast.error('No pudimos copiar el enlace. Intentá nuevamente.');
    } finally {
      toast.dismiss(toastId);
    }
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

  const completeOnboarding = useCallback(() => {
    scopedRawSet(ONBOARDING_KEY, 'done');
    setShowOnboarding(false);
  }, []);

  const goToOnboardingStep = useCallback((stepIndex: number) => {
    const step = ONBOARDING_STEPS[stepIndex];
    setOnboardingStep(stepIndex);
    setActiveTab(step.tab);
    if (step.tab === 'catalog' && step.icon !== 'profile') {
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
    <div data-builder-profile={builderProfile} className="builder-profile-root flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-[#0c0c0e] font-sans text-[#F1F0F4]">
      <StreakGuard />
      {/* App Header */}
      <header className="builder-studio-header relative z-20 shrink-0 px-3 sm:px-5" role="banner">
        <div className="mx-auto flex h-[64px] max-w-[1600px] items-center justify-between gap-3 sm:h-[76px]">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="builder-studio-header__mark flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden sm:h-12 sm:w-12">
              <DynamicLogoIcon />
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="truncate font-['Big_Shoulders_Display',sans-serif] text-lg font-black uppercase leading-none tracking-[0.02em] sm:text-2xl">Builder</p>
                <span className="hidden font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--builder-accent-soft)] sm:inline">Studio</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${activeTab}-${subtitleTick}`}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="mt-1 max-w-[48vw] truncate font-['IBM_Plex_Mono',monospace] text-[9px] font-medium text-[#6E6558] sm:max-w-sm sm:text-[10px]"
                >
                  {screenSubtitle}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="builder-studio-header__status hidden min-w-[280px] items-center gap-3 lg:flex">
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <span className="truncate font-['IBM_Plex_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.16em] text-[#9CA0A6]">{routineDisplayName}</span>
                <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-black text-[var(--builder-accent-soft)]">{canvasProgress}%</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div className="h-full rounded-full bg-[var(--builder-accent)]" animate={{ width: `${canvasProgress}%` }} />
              </div>
            </div>
            <span className="builder-status-chip whitespace-nowrap px-3 py-2 text-[10px] font-black">{routineItemCount} blocks</span>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button onClick={() => setActiveTab('export')} className="builder-header-share hidden px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.14em] md:block" disabled={!hasRoutineItems}>Preview</button>
            <NotificationBell />
            <button
              onClick={() => setShowCustomize(true)}
              className="builder-icon-button flex h-10 w-10 items-center justify-center text-[#6E6558] hover:text-[var(--builder-accent)]"
              aria-label="Abrir ajustes del Builder"
              aria-expanded={showCustomize}
            >
              <Settings2 className="h-4 w-4" />
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
          className="relative hidden min-h-0 flex-col overflow-hidden rounded-[2rem] bg-[#0c0c0e] p-4 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.7)] lg:flex"
        >
          <div className="builder-profile-ambient pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="mb-5 flex items-start justify-between relative">
            <div className="space-y-0.5">
              <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium tracking-[0.16em] text-[var(--builder-accent-soft)]">Build your legacy</p>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold tracking-tight text-[#F1F0F4] uppercase">Builder Tools</h2>
            </div>
          </div>

          <div className="relative flex flex-col gap-3">
            {[
              { id: 'catalog' as TabType, label: 'Catalog', meta: `${filteredItems.length} options`, icon: Search },
              { id: 'build' as TabType, label: 'Routine', meta: `${currentRoutine.exercises.length} exercises`, icon: Dumbbell },
              { id: 'food' as TabType, label: 'Meals', meta: `${currentRoutine.foods.length} foods`, icon: Apple },
              { id: 'calendar' as TabType, label: 'Calendar', meta: `${calendarEntries.length + calendarActions.length} items`, icon: CalendarDays },
              { id: 'export' as TabType, label: 'Share', meta: 'Client preview', icon: Share2 },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-3.5 overflow-hidden rounded-2xl px-4 py-3.5 text-left transition-all ${
                    isActive
                      ? 'builder-profile-active-surface text-[#F1F0F4]'
                      : 'bg-[#18181c] text-[#9CA0A6] hover:bg-[#2A241D] hover:text-[#F1F0F4] border border-[#F1F0F4]/[0.06]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-seam"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                      style={{ backgroundSize: '200% 100%' }}
                      animate={{ backgroundPosition: ['130% 0', '-30% 0'] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${
                    isActive ? 'bg-[#F1F0F4]/15 text-white scale-105' : 'bg-[#0c0c0e]/60 text-[#6E6558]'
                  }`}>
                    <item.icon size={19} strokeWidth={2.25} />
                  </span>
                  <span className="relative min-w-0">
                    <span className="block font-['Big_Shoulders_Display',sans-serif] text-base font-bold uppercase tracking-[0.03em]">{item.label}</span>
                    <span className={`mt-0.5 block truncate font-['IBM_Plex_Mono',monospace] text-[10px] font-medium ${
                      isActive ? 'text-[#F1F0F4]/75' : 'text-[#6E6558]'
                    }`}>{item.meta}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-5 min-h-0 flex-1 overflow-hidden relative">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="font-['IBM_Plex_Mono',monospace] text-[9px] font-medium tracking-[0.18em] text-[#9CA0A6] uppercase">Focus</p>
              <p className="font-['IBM_Plex_Mono',monospace] text-[9px] font-medium text-[#6E6558]">{builderMode === 'workout' ? 'Exercises' : 'Meals'}</p>
            </div>
            <div className="space-y-1.5 overflow-y-auto pr-1 custom-scrollbar">
              {(builderMode === 'workout' ? workoutFilters : foodFilters).map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveTab('catalog');
                    setActiveFilter(filter.id);
                  }}
                  className={`relative flex w-full items-center justify-between overflow-hidden rounded-2xl border px-3 py-2.5 text-left transition-all ${
                    activeFilter === filter.id
                      ? 'builder-profile-active-filter bg-[#18181c] text-[#F1F0F4]'
                      : 'border-transparent text-[#6E6558] hover:border-[#F1F0F4]/10 hover:bg-[#18181c]/60 hover:text-[#9CA0A6]'
                  }`}
                >
                  {activeFilter === filter.id && (
                    <motion.span
                      layoutId="desktop-filter-active-glow"
                      className="builder-profile-accent-rail absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full"
                    />
                  )}
                   <span className="flex items-center gap-3">
          {builderMode === 'workout'
            ? <ExerciseIcon section={filter.id === 'all' ? 'fullbody' : filter.id} className="h-8 w-8 shrink-0" />
            : <FoodIcon category={filter.id === 'all' ? 'protein' : filter.id} className="h-8 w-8 shrink-0" />}
                    <span className="flex min-w-0 flex-col">
                      <span className="text-sm font-['Big_Shoulders_Display',sans-serif] font-bold uppercase tracking-[0.06em]">{filter.label}</span>
                      <span className={`font-['IBM_Plex_Mono',monospace] text-[8px] font-medium uppercase tracking-[0.16em] ${
                        activeFilter === filter.id ? 'text-[var(--builder-accent-soft)]' : 'text-[#6E6558]'
                      }`}>
                        {filter.id === 'all' ? 'All' : builderMode === 'workout' ? 'Muscle' : 'Meal'}
                      </span>
                    </span>
                  </span>
                  {activeFilter === filter.id && <Check size={14} strokeWidth={2.5} className="text-[var(--builder-accent)]" />}
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
        className="relative h-full min-h-0 flex-1 overflow-hidden lg:rounded-[2rem] lg:border lg:border-[#F1F0F4]/[0.06] lg:bg-[#18181c]/60 lg:shadow-[0_24px_60px_-36px_rgba(0,0,0,0.6)]"
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
            >
               {/* Internal Discovery Toggle */}
               <div className="builder-glass-shell relative flex h-[52px] items-center overflow-hidden rounded-[1.35rem] p-1 sm:h-14" role="tablist" aria-label="Modo del catálogo">
                  <motion.div 
                     initial={false}
                     animate={{ x: builderMode === 'workout' ? 0 : '100%' }}
                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
                     className="builder-profile-tab-indicator absolute bottom-1 left-1 top-1 z-0 w-[calc(50%-4px)] rounded-[1.05rem]"
                  />
                  
                  <button 
                   onClick={() => setBuilderMode('workout')} 
                   role="tab"
                   aria-selected={builderMode === 'workout'}
                   className={`relative flex-1 h-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] transition-colors duration-300 z-10 ${builderMode === 'workout' ? 'text-white' : 'text-[#6E6558] hover:text-[#F1F0F4]'}`}
                 >
                   <Dumbbell size={16} />
                   Exercises
                 </button>
                 <button 
                   onClick={() => setBuilderMode('nutrition')} 
                   role="tab"
                   aria-selected={builderMode === 'nutrition'}
                   className={`relative flex-1 h-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] transition-colors duration-300 z-10 ${builderMode === 'nutrition' ? 'text-white' : 'text-[#6E6558] hover:text-[#F1F0F4]'}`}
                 >
                   <Apple size={16} />
                   Meals
                 </button>
               </div>

              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6558]" aria-hidden="true" />
                  <input 
                    type="text"
                    aria-label="Buscar ejercicios y comidas"
                    placeholder={`Search ${builderMode === 'workout' ? 'exercises' : 'foods'}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="builder-apple-input w-full py-4 pl-12 pr-4 focus:outline-none font-bold text-[15px] text-[#F1F0F4] placeholder:text-[#9CA0A6]"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <p className="font-['IBM_Plex_Mono',monospace] text-[9px] font-medium tracking-[0.18em] text-[#6E6558] uppercase">Focus</p>
                  <p className="font-['IBM_Plex_Mono',monospace] text-[9px] font-medium text-[#6E6558]">{filteredItems.length} options</p>
                </div>
                <div className="-mx-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
                   {(builderMode === 'workout' ? workoutFilters : foodFilters).map(f => (
                     <button
                       key={f.id}
                       onClick={() => setActiveFilter(f.id)}
                       className={`group flex min-w-[112px] snap-start items-center gap-4 whitespace-nowrap px-4 py-3 text-left transition-all active:scale-95 ${
                         activeFilter === f.id ? 'builder-cta-primary' : 'builder-focus-pill'
                       }`}
                      >
{builderMode === 'workout'
            ? <ExerciseIcon section={f.id === 'all' ? 'fullbody' : f.id} className="h-8 w-8 shrink-0" />
            : <FoodIcon category={f.id === 'all' ? 'protein' : f.id} className="h-8 w-8 shrink-0" />}
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate font-['Big_Shoulders_Display',sans-serif] text-xs font-bold uppercase tracking-[0.06em]">{f.label}</span>
                          <span className={`text-[8px] font-medium font-['IBM_Plex_Mono',monospace] uppercase tracking-[0.16em] ${
                            activeFilter === f.id ? 'text-white/55' : 'text-[#6E6558]'
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
                      <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-widest text-[#9CA0A6]">Custom exercise</p>
                      <ExerciseIcon section="custom" className="w-6 h-6" />
                    </div>

                    <input
                      type="text"
                      value={customExerciseName}
                      onChange={(e) => setCustomExerciseName(e.target.value)}
                      placeholder="Exercise name"
                      className="builder-apple-input w-full py-2.5 px-3 text-xs font-bold text-[#F1F0F4] placeholder:text-[#9CA0A6] focus:outline-none"
                    />

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <p className="font-['IBM_Plex_Mono',monospace] text-[8px] font-medium uppercase text-[#6E6558]">Sets</p>
                        <div className="builder-apple-tile flex items-center justify-between px-2 py-1.5">
                          <button onClick={() => setCustomSeries(v => Math.max(1, v - 1))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
<span className="text-lg font-black leading-none text-[#F1F0F4]">{customSeries}</span>
                           <button onClick={() => setCustomSeries(v => Math.min(20, v + 1))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="font-['IBM_Plex_Mono',monospace] text-[8px] font-medium uppercase text-[#6E6558]">Reps</p>
                        <div className="builder-apple-tile flex items-center justify-between px-2 py-1.5">
                          <button onClick={() => setCustomReps(v => Math.max(1, v - 1))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
<span className="text-lg font-black leading-none text-[#F1F0F4]">{customReps}</span>
                           <button onClick={() => setCustomReps(v => Math.min(100, v + 1))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="font-['IBM_Plex_Mono',monospace] text-[8px] font-medium uppercase text-[#6E6558]">Weight</p>
                        <div className="builder-apple-tile flex items-center justify-between px-2 py-1.5">
                          <button onClick={() => setCustomWeight(v => Math.max(0, v - 2.5))} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
<span className="text-lg font-black leading-none text-[#F1F0F4]">{customWeight}</span>
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
                    <Ghost size={48} className="text-[#6E6558]" />
                    <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-[0.3em] text-[#6E6558]">No results</p>
                  </div>
                ) : (
                  filteredItems.map((item, index) => {
                    const isSupp = builderMode === 'nutrition' && ((item as any).category === 'supplements' || normalizeFilterId((item as any).category) === 'supplements');
                    return (
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
                        className={`builder-apple-card flex cursor-pointer items-center justify-between gap-3 p-3.5 transition-all group hover:-translate-y-0.5 sm:p-4 ${
                          index % 2 === 0 ? 'min-h-[100px]' : 'min-h-[72px]'
                        } sm:min-h-0`}
                      >
                        {index % 2 === 0 ? (
                          /* Even cards: large icon + small name below */
                          <div className="flex min-w-0 items-center gap-4">
                             {builderMode === 'workout' ? (
                                <ExerciseIconTile section={(item as any).section} className="h-24 w-24 sm:h-28 sm:w-28" />
                             ) : isSupp ? (
                                <div className="builder-apple-icon-tile flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden p-1.5 sm:h-28 sm:w-28">
                                  <FoodIcon category={(item as any).category} name={item.name} className="h-full w-full object-contain" />
                                </div>
                             ) : (
                                <FoodIconTile category={(item as any).category} name={item.name} className="h-24 w-24 sm:h-28 sm:w-28" />
                             )}
                             <div className="min-w-0">
                              <p className="line-clamp-2 font-black italic uppercase text-[13px] leading-tight text-[#F1F0F4] sm:text-sm">{item.name}</p>
                              <p className="font-['IBM_Plex_Mono',monospace] text-[8px] font-medium text-[#6E6558] uppercase tracking-widest">
                                 {builderMode === 'workout' ? (item as any).section : (item as any).category}
                               </p>
                             </div>
                          </div>
                        ) : (
                          /* Odd cards: large name + small icon badge */
                          <div className="flex min-w-0 items-center gap-3.5">
                             <div className="flex min-w-0 flex-col">
                              <p className="line-clamp-2 font-black italic uppercase text-[15px] leading-tight text-[#F1F0F4] sm:text-base">{item.name}</p>
                              <p className="font-['IBM_Plex_Mono',monospace] text-[8px] font-medium text-[#6E6558] uppercase tracking-widest">
                                 {builderMode === 'workout' ? (item as any).section : (item as any).category}
                               </p>
                             </div>
                             <div className="ml-auto flex shrink-0 items-center">
                               {builderMode === 'workout' ? (
                                  <ExerciseIcon section={(item as any).section} className="h-12 w-12 sm:h-14 sm:w-14" />
                               ) : isSupp ? (
                                  <FoodIcon category={(item as any).category} name={item.name} className="h-12 w-12 sm:h-14 sm:w-14" />
                               ) : (
                                  <FoodIcon category={(item as any).category} name={item.name} className="h-12 w-12 sm:h-14 sm:w-14" />
                               )}
                             </div>
                          </div>
                        )}
                        <button className="builder-icon-button flex h-10 w-10 shrink-0 items-center justify-center group-active:bg-[#F1F0F4]/20 group-active:text-white sm:h-8 sm:w-8">
                           <Plus size={18} />
                        </button>
                      </motion.div>
                    );
                  })
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
                <h2 className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold uppercase tracking-tighter text-[#F1F0F4]">Meals</h2>
                <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-widest text-[#6E6558]">Adjust the food section before sharing</p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                  <div className="builder-apple-tile p-3 text-center">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="carbs" name="rice" className="w-4 h-4" />
                    </div>
                    <p className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium text-[#6E6558] uppercase">Kcal</p>
                    <p className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black leading-none text-[var(--builder-accent-soft)]">{Math.round(totalMacros.calories)}</p>
                  </div>
                  <div className="builder-apple-tile p-3 text-center">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="protein" name="egg" className="w-4 h-4" />
                    </div>
                    <p className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium text-[#6E6558] uppercase">Prot</p>
                    <p className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black leading-none text-[var(--builder-accent)]">{Math.round(totalMacros.protein)}g</p>
                  </div>
                  <div className="builder-apple-tile p-3 text-center">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="carbs" name="noodles" className="w-4 h-4" />
                    </div>
                    <p className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium text-[#6E6558] uppercase">Carb</p>
                    <p className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black leading-none text-[#9CA0A6]">{Math.round(totalMacros.carbs)}g</p>
                  </div>
                  <div className="builder-apple-tile p-3 text-center">
                    <div className="mb-1 flex justify-center">
                      <FoodIcon category="fats" name="avocado" className="w-4 h-4" />
                    </div>
                    <p className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium text-[#6E6558] uppercase">Fat</p>
                    <p className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black leading-none text-[var(--builder-accent-deep)]">{Math.round(totalMacros.fats)}g</p>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar pb-28">
                {currentRoutine.foods.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                    <Apple size={64} className="text-[#6E6558]/30" />
                    <div className="space-y-2">
                      <p className="font-['Big_Shoulders_Display',sans-serif] text-sm font-bold uppercase tracking-widest text-[#9CA0A6]">No meals yet</p>
                      <p className="max-w-xs text-xs font-medium leading-relaxed text-[#6E6558]">Add foods if this routine includes nutrition. You can also share workout-only links.</p>
                      <button onClick={() => { setActiveTab('catalog'); setBuilderMode('nutrition'); }} className="builder-cta-primary mt-2 px-4 py-3 text-[10px] font-black uppercase tracking-widest">Add food</button>
                    </div>
                  </div>
                ) : (
                  currentRoutine.foods.map(food => (
                    <div key={food.id} className="builder-apple-card flex items-center justify-between p-5">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2 mb-1">
                             <FoodIcon category={food.category || 'all'} name={food.name} className="w-5 h-5" />
                            <h4 className="font-black italic uppercase text-xs text-[#F1F0F4]">{food.name}</h4>
                          </div>
                          <div className="flex items-center gap-3">
                             <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-medium text-[var(--builder-accent-soft)] uppercase">{Math.round((food.protein * food.quantity) / 100)}g P</span>
                             <span className="text-[8px] font-medium text-[#6E6558]">•</span>
                             <span className="font-['IBM_Plex_Mono',monospace] text-[8px] font-medium text-[#6E6558] uppercase">{Math.round((food.calories * food.quantity) / 100)} Kcal</span>
                          </div>
                       </div>
                        <div className="flex flex-col gap-3">
                           <div className="builder-apple-tile flex items-center gap-3 p-2">
                              <button onClick={() => updateFood(food.id, { quantity: Math.max(25, food.quantity - 25) })} className="builder-icon-button flex h-7 w-7 items-center justify-center"><Minus size={16} /></button>
                               <span className="text-lg font-black w-12 text-center leading-none text-[#F1F0F4]">{food.quantity}g</span>
                              <button onClick={() => updateFood(food.id, { quantity: food.quantity + 25 })} className="builder-icon-button flex h-7 w-7 items-center justify-center"><Plus size={16} /></button>
                              <button onClick={() => removeFood(food.id)} className="ml-1 pl-3 border-l border-[#F1F0F4]/10 text-[#6E6558] transition-colors hover:text-[var(--builder-accent)]"><Trash2 size={16} /></button>
                           </div>
                           <div className="relative">
                              <MessageCircle size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6558] opacity-40" />
                              <input 
                                type="text"
                                placeholder="Note..."
                                value={food.notes || ''}
                                onChange={(e) => updateFood(food.id, { notes: e.target.value })}
                                className="builder-apple-input w-full py-1.5 pl-8 pr-3 text-[10px] font-bold text-[#F1F0F4] placeholder:text-[#9CA0A6] placeholder:italic focus:outline-none"
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
                <div className="relative">
                  <input 
                    type="text"
                    value={currentRoutine.name}
                    onChange={(e) => updateRoutineName(e.target.value)}
                    className="w-full bg-transparent border-none p-0 pr-8 text-3xl font-black italic uppercase tracking-tighter focus:ring-0 placeholder:text-[#9CA0A6] text-[#F1F0F4]"
                    placeholder="Untitled routine"
                  />
                  <Pencil size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6E6558] pointer-events-none opacity-40" />
                </div>
                <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-widest text-[#6E6558] -mt-3">This is the routine your client will open</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="builder-apple-tile p-3 text-center">
                  <div className="mb-1 flex justify-center">
                    <ExerciseIcon section="fullbody" className="w-5 h-5" />
                  </div>
                  <p className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium text-[#6E6558] uppercase">Ejercicios</p>
                  <p className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-black leading-none text-[#F1F0F4]">{currentRoutine.exercises.length}</p>
                </div>
                <div className="builder-apple-tile p-3 text-center">
                  <div className="mb-1 flex justify-center">
                    <ExerciseIcon section="arms" className="w-5 h-5" />
                  </div>
                  <p className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium text-[#6E6558] uppercase">Sets</p>
                  <p className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-black leading-none text-[#F1F0F4]">{totalSets}</p>
                </div>
                <div className="builder-apple-tile p-3 text-center">
                  <div className="mb-1 flex justify-center">
                    <ExerciseIcon section="legs" className="w-5 h-5" />
                  </div>
                  <p className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium text-[#6E6558] uppercase">Volumen</p>
                  <p className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-black leading-none text-[#F1F0F4]">{Math.round(totalVolume)}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar pb-28">
                {currentRoutine.exercises.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                    <Dumbbell size={64} className="text-[#6E6558]/30" />
                    <div className="space-y-2">
                      <p className="font-['Big_Shoulders_Display',sans-serif] text-sm font-bold uppercase tracking-widest text-[#9CA0A6]">Start with an exercise</p>
                      <p className="max-w-xs text-xs font-medium leading-relaxed text-[#6E6558]">Add items, preview the client view, then send the routine through WhatsApp.</p>
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
                             <h4 className="font-black italic uppercase text-sm tracking-tight text-[#F1F0F4]">{ex.name}</h4>
                         </div>
                         <button onClick={() => removeExercise(ex.id)} className="builder-icon-button -mr-2 flex h-8 w-8 items-center justify-center hover:text-red-500"><X size={16} /></button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                         <div className="space-y-1">
                             <label className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium text-[#6E6558] uppercase">Sets</label>
                            <div className="builder-apple-tile flex items-center justify-between p-2">
                               <button onClick={() => updateExercise(ex.id, { sets: Math.max(1, ex.sets - 1) })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
                                 <span className="text-lg font-black leading-none text-[#F1F0F4]">{ex.sets}</span>
                                <button onClick={() => updateExercise(ex.id, { sets: ex.sets + 1 })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
                            </div>
                         </div>
                         <div className="space-y-1">
                             <label className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium text-[#6E6558] uppercase">Reps</label>
                            <div className="builder-apple-tile flex items-center justify-between p-2">
                               <button onClick={() => updateExercise(ex.id, { reps: Math.max(1, ex.reps - 1) })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
                                 <span className="text-lg font-black leading-none text-[#F1F0F4]">{ex.reps}</span>
                                <button onClick={() => updateExercise(ex.id, { reps: ex.reps + 1 })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
                            </div>
                         </div>
                         <div className="space-y-1">
                             <label className="font-['IBM_Plex_Mono',monospace] text-[7px] font-medium text-[#6E6558] uppercase">kg</label>
                            <div className="builder-apple-tile flex items-center justify-between p-2">
                               <button onClick={() => updateExercise(ex.id, { weight: Math.max(0, ex.weight - 2.5) })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Minus size={14} /></button>
                                 <span className="text-lg font-black leading-none text-[#F1F0F4]">{ex.weight}</span>
                                <button onClick={() => updateExercise(ex.id, { weight: ex.weight + 2.5 })} className="builder-icon-button flex h-6 w-6 items-center justify-center"><Plus size={14} /></button>
                            </div>
                         </div>
                      </div>
                      <div className="relative mt-4">
                        <MessageCircle size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6558] opacity-40" />
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
            <CalendarPanel
              entries={calendarEntries}
              actions={calendarActions}
              onActionsChange={setCalendarActions}
            />
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
                  <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-wide text-[#6E6558]">
                    {hasRoutineItems ? 'Ready to share' : 'Nothing to share yet'}
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-[#F1F0F4]">
                    {routineDisplayName}
                  </h2>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[#6E6558]">
                    {hasRoutineItems
                      ? `${routineItemCount} items. The client can open this link in any browser without installing an app.`
                      : 'Add at least one exercise or meal before sending a link.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-[0.18em] text-[#6E6558]">Canvas Palette</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {CATALOG_BG_PRESETS.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setCatalogBgId(preset.id);
                          setCatalogBgImage(null);
                        }}
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 transition-all ${catalogBgId === preset.id && !catalogBgImage ? 'builder-profile-selected-preset scale-110 shadow-md' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'}`}
                        style={preset.style}
                        title={preset.label}
                      >
                        {catalogBgId === preset.id && !catalogBgImage && (
                          <Check className="h-5 w-5 text-[#F1F0F4]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-[0.18em] text-[#6E6558]">Client preview</p>
                    <p className="text-xs font-medium text-[#6E6558]">What the recipient opens from WhatsApp.</p>
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
          className={`relative hidden min-h-0 overflow-hidden rounded-[2rem] border border-[#F1F0F4]/10 bg-[#18181c]/90 p-4 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-2xl ${rightPanelMode === 'canvas' ? 'lg:flex' : 'lg:hidden'} lg:flex-col`}
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <motion.div
            className="builder-profile-soft-glow pointer-events-none absolute -right-20 top-20 h-44 w-44 rounded-full blur-3xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <div className="builder-right-panel-tabs" role="tablist" aria-label="Panel derecho">
            <button
              type="button"
              role="tab"
              aria-selected={rightPanelMode === 'canvas'}
              className={`builder-right-panel-tab ${rightPanelMode === 'canvas' ? 'is-active' : ''}`}
              onClick={() => setRightPanelMode('canvas')}
            >
              <SlidersHorizontal size={12} />
              Canvas
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={rightPanelMode === 'legacito'}
              className={`builder-right-panel-tab ${rightPanelMode === 'legacito' ? 'is-active' : ''}`}
              onClick={() => setRightPanelMode('legacito')}
            >
              <MessageCircle size={12} />
              Legacito
            </button>
          </div>
          <div className="builder-live-canvas__header shrink-0 pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--builder-accent)] shadow-[0_0_12px_var(--builder-accent-shadow)]" />
                  <p className="font-['IBM_Plex_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--builder-accent-soft)]">Live canvas</p>
                </div>
                <input
                  value={currentRoutine.name}
                  onChange={(event) => updateRoutineName(event.target.value)}
                  className="mt-2 w-full truncate border-0 bg-transparent p-0 font-['Big_Shoulders_Display',sans-serif] text-2xl font-black uppercase text-[#F1F0F4] outline-none"
                  aria-label="Canvas title"
                />
              </div>
              <button onClick={() => setActiveTab('export')} className="builder-header-share shrink-0 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em]" disabled={!hasRoutineItems}>Preview</button>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div className="h-full rounded-full bg-[var(--builder-accent)]" animate={{ width: `${canvasProgress}%` }} transition={{ type: 'spring', stiffness: 240, damping: 28 }} />
              </div>
              <span className="font-['IBM_Plex_Mono',monospace] text-[9px] font-black text-[#9CA0A6]">{canvasProgress}%</span>
            </div>
          </div>

          <div className="builder-live-canvas min-h-0 flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {!hasRoutineItems ? (
              <div className="builder-live-canvas__empty">
                <div className="builder-profile-solid-icon flex h-12 w-12 items-center justify-center rounded-2xl text-white"><Plus size={20} /></div>
                <p>Tu plan empieza acá</p>
                <span>Seleccioná ejercicios o comidas. Cada bloque aparecerá en este lienzo en tiempo real.</span>
                <div className="mt-5 grid w-full grid-cols-3 gap-2">
                  {['Selecciona', 'Ajusta', 'Comparte'].map((label, index) => <div key={label}><b>0{index + 1}</b><small>{label}</small></div>)}
                </div>
              </div>
            ) : (
              <div className="space-y-5 pb-3">
                {currentRoutine.exercises.length > 0 && (
                  <section>
                    <div className="builder-live-canvas__section-title"><span>Entrenamiento</span><b>{currentRoutine.exercises.length}</b></div>
                    <div className="space-y-1.5">
                      <AnimatePresence initial={false}>
                        {currentRoutine.exercises.map((exercise, index) => (
                          <motion.div key={exercise.id} layout initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }} className="builder-canvas-block">
                            <span className="builder-canvas-block__index">{String(index + 1).padStart(2, '0')}</span>
                            <ExerciseIcon section={exercise.section} className="h-8 w-8 shrink-0" />
                            <div className="min-w-0 flex-1"><p>{exercise.name}</p><small>{exercise.sets} sets · {exercise.reps} reps · {exercise.weight} kg</small></div>
                            <div className="builder-canvas-block__actions">
                              <button onClick={() => updateExercise(exercise.id, { sets: Math.max(1, exercise.sets - 1) })} aria-label={`Reducir sets de ${exercise.name}`}><Minus size={12} /></button>
                              <b>{exercise.sets}</b>
                              <button onClick={() => updateExercise(exercise.id, { sets: exercise.sets + 1 })} aria-label={`Aumentar sets de ${exercise.name}`}><Plus size={12} /></button>
                              <button onClick={() => removeExercise(exercise.id)} aria-label={`Eliminar ${exercise.name}`}><X size={12} /></button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </section>
                )}
                {currentRoutine.foods.length > 0 && (
                  <section>
                    <div className="builder-live-canvas__section-title"><span>Nutrición</span><b>{currentRoutine.foods.length}</b></div>
                    <div className="space-y-1.5">
                      <AnimatePresence initial={false}>
                        {currentRoutine.foods.map((food, index) => (
                          <motion.div key={food.id} layout initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }} className="builder-canvas-block">
                            <span className="builder-canvas-block__index">{String(index + 1).padStart(2, '0')}</span>
                            <FoodIcon category={food.category || 'all'} name={food.name} className="h-8 w-8 shrink-0" />
                            <div className="min-w-0 flex-1"><p>{food.name}</p><small>{food.quantity} g · {Math.round((food.calories * food.quantity) / 100)} kcal</small></div>
                            <div className="builder-canvas-block__actions">
                              <button onClick={() => updateFood(food.id, { quantity: Math.max(25, food.quantity - 25) })} aria-label={`Reducir cantidad de ${food.name}`}><Minus size={12} /></button>
                              <b>{food.quantity}</b>
                              <button onClick={() => updateFood(food.id, { quantity: food.quantity + 25 })} aria-label={`Aumentar cantidad de ${food.name}`}><Plus size={12} /></button>
                              <button onClick={() => removeFood(food.id)} aria-label={`Eliminar ${food.name}`}><X size={12} /></button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>

          <div className="builder-live-canvas__footer shrink-0 pt-3">
            <div className="grid grid-cols-4 gap-1.5">
              {[['Blocks', routineItemCount], ['Sets', totalSets], ['Kcal', Math.round(totalMacros.calories)], ['Volume', Math.round(totalVolume)]].map(([label, value]) => (
                <div key={label}><small>{label}</small><b>{value}</b></div>
              ))}
            </div>
            <button onClick={() => setActiveTab('export')} disabled={!hasRoutineItems} className="builder-cta-primary mt-3 flex w-full items-center justify-center gap-2 py-3 text-[9px] font-black uppercase tracking-[0.16em]"><Share2 size={14} /> Preparar link</button>
          </div>
        </motion.aside>

        <motion.aside
          initial={{ opacity: 0, x: 18, filter: 'blur(8px)' }}
          animate={{ opacity: rightPanelMode === 'legacito' ? 1 : 0, x: rightPanelMode === 'legacito' ? 0 : 18, filter: rightPanelMode === 'legacito' ? 'blur(0px)' : 'blur(8px)' }}
          transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative hidden min-h-0 overflow-hidden rounded-[2rem] border border-[#F1F0F4]/10 bg-[#18181c]/90 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-2xl ${rightPanelMode === 'legacito' ? 'lg:flex' : 'lg:hidden'} lg:flex-col`}
          aria-label="Panel de Legacito"
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[var(--builder-accent)]/80 to-transparent" />
          <div className="builder-right-panel-tabs relative z-10 mx-4 mt-4" role="tablist" aria-label="Panel derecho">
            <button
              type="button"
              role="tab"
              aria-selected={rightPanelMode === 'canvas'}
              className={`builder-right-panel-tab ${rightPanelMode === 'canvas' ? 'is-active' : ''}`}
              onClick={() => setRightPanelMode('canvas')}
            >
              <SlidersHorizontal size={12} />
              Canvas
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={rightPanelMode === 'legacito'}
              className={`builder-right-panel-tab ${rightPanelMode === 'legacito' ? 'is-active' : ''}`}
              onClick={() => setRightPanelMode('legacito')}
            >
              <MessageCircle size={12} />
              Legacito
            </button>
          </div>
          <div className="min-h-0 flex-1 p-2">
            <AiMentorChat embedded open={true} skinId={legacitoSkin} onSkinChange={setLegacitoSkin} onOpenChange={() => setRightPanelMode('canvas')} />
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
              className="fixed inset-0 z-40 bg-[#0c0c0e]/60 backdrop-blur-md lg:bg-[#0c0c0e]/38 lg:backdrop-blur-[3px]"
              aria-hidden="true"
            />
            <motion.aside
              key="settings-drawer"
              initial={{ y: 48, x: 0, opacity: 0 }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              exit={{ y: 48, x: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="builder-glass-shell fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[88dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[2rem] sm:inset-y-4 sm:right-4 sm:left-auto sm:h-auto sm:max-w-[380px] sm:rounded-[2rem] lg:inset-y-0 lg:right-0 lg:bottom-auto lg:left-auto lg:h-full lg:w-[430px] lg:max-w-[min(430px,100vw)] lg:rounded-none lg:rounded-l-[2rem] lg:border-y-0 lg:border-r-0 lg:border-l lg:shadow-[-28px_0_80px_-38px_rgba(0,0,0,0.9)]"
              aria-label="Ajustes del Builder"
              role="dialog"
              aria-modal="true"
            >
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-[var(--builder-accent)]/70 to-transparent lg:block" aria-hidden="true" />
            <div className="flex justify-center pt-2 sm:hidden" aria-hidden="true">
              <div className="h-1.5 w-12 rounded-full bg-[#6E6558]/30" />
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-[#F1F0F4]/10 px-4 pb-4 pt-3 sm:p-5 lg:px-6 lg:pb-5 lg:pt-6">
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-[var(--builder-accent)]" />
                  <h2 className="truncate font-['Big_Shoulders_Display',sans-serif] text-sm font-bold uppercase tracking-wide text-[#F1F0F4]">Builder settings</h2>
                </div>
                <p className="font-['IBM_Plex_Mono',monospace] text-[11px] font-medium leading-snug text-[#6E6558] sm:text-xs sm:leading-relaxed">Identidad visual, vista del cliente y compartir.</p>
              </div>
              <button onClick={() => setShowCustomize(false)} className="builder-icon-button flex h-10 w-10 shrink-0 items-center justify-center" aria-label="Close settings">
                <X className="h-4 w-4 text-[#6E6558]" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4 pb-28 sm:space-y-6 sm:p-5 sm:pb-28 lg:space-y-7 lg:px-6 lg:py-6 lg:pb-10">
              <section className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-wide text-[#9CA0A6]">Theme</p>
                  <span className="builder-theme-base">Black base</span>
                </div>
                <div className="builder-theme-switch" role="group" aria-label="Builder theme">
                  {BUILDER_PROFILE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`builder-theme-option ${builderProfile === option.value ? 'is-active' : ''}`}
                      aria-pressed={builderProfile === option.value}
                      onClick={() => setBuilderProfile(option.value)}
                    >
                      <img src={option.image} alt="" />
                      <span>
                        <strong>{option.label}</strong>
                        <small>{option.theme}</small>
                      </span>
                      <i aria-hidden="true" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="builder-cta-ghost w-full px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em]"
                  onClick={() => {
                    setOnboardingStep(0);
                    setShowCustomize(false);
                    setShowOnboarding(true);
                  }}
                >
                  Revisar onboarding
                </button>
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-wide text-[#6E6558]">Brand</p>
                  {catalogLogo && (
                    <button onClick={() => setCatalogLogo(null)} className="text-[10px] font-black uppercase tracking-wide text-[#6b1e23]">
                      Remove
                    </button>
                  )}
                </div>
                <div className="builder-apple-card p-3 sm:p-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="builder-header-mark flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden p-1 sm:h-16 sm:w-16">
                      {catalogLogo ? <img src={catalogLogo} alt="Logo" className="h-full w-full rounded-lg object-cover" /> : <img src="/cyan.svg" alt="Fit Legacy Builder" className="h-full w-full rounded-lg object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-['Big_Shoulders_Display',sans-serif] text-sm font-bold text-[#F1F0F4]">Catalog logo</p>
                      <p className="mt-1 font-['IBM_Plex_Mono',monospace] text-[11px] font-medium leading-snug text-[#6E6558] sm:text-xs sm:leading-relaxed">Shown in the builder catalog.</p>
                      <p className="mt-1 font-['IBM_Plex_Mono',monospace] text-[10px] font-medium leading-snug text-[#9CA0A6]">
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
                <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-wide text-[#6E6558]">Client view</p>
                <div className="grid grid-cols-1 gap-2">
                  {CATALOG_BG_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setCatalogBgId(preset.id);
                        setCatalogBgImage(null);
                      }}
                      className={`builder-cta-ghost flex items-center gap-3 p-3 text-left ${catalogBgId === preset.id && !catalogBgImage ? 'builder-profile-selected-option' : ''}`}
                    >
                    <span className="h-9 w-12 shrink-0 rounded-2xl border border-white shadow-inner" style={preset.style} />
                      <span className="min-w-0 flex-1">
                        <span className="block font-['Big_Shoulders_Display',sans-serif] text-sm font-bold text-[#F1F0F4]">{preset.label}</span>
                        <span className="block font-['IBM_Plex_Mono',monospace] text-xs font-medium text-[#6E6558]">Preview palette</span>
                      </span>
                      {catalogBgId === preset.id && !catalogBgImage && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--builder-accent)] text-white">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <label className={`builder-cta-ghost flex cursor-pointer items-center justify-between gap-3 p-3 ${catalogBgImage ? 'builder-profile-selected-option text-[var(--builder-accent)]' : ''}`}>
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="builder-apple-tile flex h-9 w-12 items-center justify-center">
                      <ImageIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black">{catalogBgImage ? 'Custom image' : 'Upload image'}</span>
                      <span className="block text-xs font-medium text-[#6E6558]">Use a custom background.</span>
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
                <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium uppercase tracking-wide text-[#6E6558]">Share</p>
                <div className="builder-apple-card p-4">
                  <p className="truncate font-['Big_Shoulders_Display',sans-serif] text-sm font-bold text-[#F1F0F4]">{routineDisplayName}</p>
                  <p className="mt-1 font-['IBM_Plex_Mono',monospace] text-xs font-medium text-[#6E6558]">{routineItemCount} items ready</p>
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
              className="fixed inset-0 z-[55] bg-black/70 backdrop-blur-[2px]"
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
            <div className="builder-onboarding builder-glass-shell mx-auto max-w-md overflow-hidden rounded-[1.75rem] p-3">
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <div>
                  <p className="builder-onboarding__eyebrow">Primer ingreso · {builderProfile === 'woman' ? 'Rose' : 'Orange'}</p>
                  <h2 className="text-lg font-black italic uppercase tracking-tight text-[#F1F0F4]">
                    Calibra tu Builder
                  </h2>
                </div>
                <button
                  onClick={completeOnboarding}
                  className="builder-icon-button flex h-9 w-9 shrink-0 items-center justify-center text-[#6E6558] hover:bg-[#2A2520] hover:text-[#F1F0F4]"
                  aria-label="Cerrar guia inicial"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative -mx-3 mb-3 overflow-hidden">
                <div className="builder-onboarding__hero relative h-48">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${builderProfile}-${onboardingStep}`}
                      src={BUILDER_PROFILE_ASSETS[builderProfile][onboardingStep]}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: '50% 18%' }}
                      alt=""
                    />
                  </AnimatePresence>
                  <div className="builder-onboarding__hero-copy">
                    <span>0{onboardingStep + 1} / 0{ONBOARDING_STEPS.length}</span>
                    <strong>{ONBOARDING_STEPS[onboardingStep].title}</strong>
                    <p>{ONBOARDING_STEPS[onboardingStep].body}</p>
                  </div>
                </div>
              </div>
              {onboardingStep === 0 ? (
                <div className="builder-profile-grid" aria-label="Perfil visual">
                  {BUILDER_PROFILE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`builder-profile-choice ${builderProfile === option.value ? 'is-active' : ''}`}
                      aria-pressed={builderProfile === option.value}
                      onClick={() => setBuilderProfile(option.value)}
                    >
                      <img src={option.image} alt="" />
                      <span><strong>{option.label}</strong><small>{option.theme}</small></span>
                      <i aria-hidden="true" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="builder-onboarding__active-step">
                  <span><OnboardingIcon type={ONBOARDING_STEPS[onboardingStep].icon} /></span>
                  <div>
                    <strong>{ONBOARDING_STEPS[onboardingStep].title}</strong>
                    <small>{ONBOARDING_STEPS[onboardingStep].body}</small>
                  </div>
                </div>
              )}

              <div className="builder-onboarding__rail" aria-label={`Paso ${onboardingStep + 1} de ${ONBOARDING_STEPS.length}`}>
                {ONBOARDING_STEPS.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    className={onboardingStep === index ? 'is-active' : index < onboardingStep ? 'is-done' : ''}
                    onClick={() => goToOnboardingStep(index)}
                    aria-label={`Ir al paso ${index + 1}: ${step.title}`}
                  />
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  onClick={completeOnboarding}
                  className="builder-cta-ghost px-3 py-3 text-[10px] font-black uppercase tracking-widest text-[#9CA0A6]"
                >
                  Saltar
                </button>
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

      <SabiasQueBanner
        profile={builderProfile}
        className="fixed bottom-0 left-0 right-0 z-40 px-3 lg:hidden"
      />

      {/* Mobile Footer Nav */}
      <div className="builder-footer-nav-wrapper">
        <nav className={`builder-footer-nav${navVisible ? '' : ' builder-footer-nav--hidden'}`} role="navigation">
          {[
            { id: 'catalog' as TabType, icon: () => <img src="/cyan.svg" alt="" aria-hidden="true" className="h-5 w-5 object-contain" />, badge: null },
            { id: 'food' as TabType, icon: () => <Apple size={18} />, badge: currentRoutine.foods.length > 0 ? currentRoutine.foods.length : null },
            { id: 'build' as TabType, icon: () => <ExerciseIcon section="fullbody" className="h-5 w-5" />, badge: currentRoutine.exercises.length > 0 ? currentRoutine.exercises.length : null },
            { id: 'calendar' as TabType, icon: () => <CalendarDays size={18} />, badge: calendarEntries.length + calendarActions.length > 0 ? (calendarEntries.length + calendarActions.length > 9 ? '9+' : calendarEntries.length + calendarActions.length) : null },
            { id: 'export' as TabType, icon: () => <img src="/icons/fl-1.svg" alt="" aria-hidden="true" className="h-5 w-5 object-contain" />, badge: null },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => { setActiveTab(item.id); if (item.id === 'catalog') setBuilderMode('workout'); }}
                className={`builder-footer-nav-btn${isActive ? ' is-active' : ''}`}
                aria-label={item.id}
              >
                <span className="builder-footer-nav-btn-icon">
                  <item.icon />
                  {item.badge !== null && (
                    <span className="builder-footer-nav-btn-badge">{item.badge}</span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          className={`builder-footer-nav-toggle${navVisible ? '' : ' builder-footer-nav-toggle--pinned'}`}
          onClick={() => setNavVisible((v) => !v)}
          aria-label={navVisible ? 'Collapse navigation' : 'Expand navigation'}
        >
          <i className="builder-footer-nav-toggle-icon" style={{ transform: navVisible ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </button>
      </div>

      {!showOnboarding && !showCustomize && (
        <AiMentorChat
          open={chatOpen}
          skinId={legacitoSkin}
          onSkinChange={setLegacitoSkin}
          onOpenChange={setChatOpen}
        />
      )}

    </div>
  );
}

function ExportPreviewFallback() {
  return (
<div className="w-full max-w-sm aspect-[9/16] rounded-[1.5rem] border border-[#F1F0F4]/[0.06] bg-[#0a0a0a] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[var(--builder-accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
