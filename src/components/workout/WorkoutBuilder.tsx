import { lazy, Suspense, useState, useMemo, useEffect, useCallback, useRef, type ComponentType } from 'react';
import { localAssetUrl } from '../../lib/cdn';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Plus,
  Minus,
  Ghost,
  ArrowRight,
} from 'lucide-react';
import { SocialJoin, UNIFIED_EXERCISES, UNIFIED_FOODS, FIT_LEGACY_SOCIAL_LINKS, resolveFitLegacyAppUrls, type LegacitoSkin, Legacito } from '@fit-legacy/shared';
import { DynamicLogoIcon } from '../DynamicLogoIcon';
import { SabiasQueBanner } from './SabiasQueBanner';
import { StreakGuard } from './StreakGuard';
import { NotificationBell } from './NotificationBell';
import { PlanDecisionPanel } from './PlanDecisionPanel';
import { PlanWeeksPanel } from './PlanWeeksPanel';
import { useWorkoutStore, type FoodItem, type MealComposition, type SelectedExercise } from '../../lib/store';
import { createPersistentWirShare } from '../../lib/share';
import { loadRoutineAnalyticsStats } from '../../lib/routineAnalytics';
import { toast } from 'sonner';
import CalendarPanel, { loadCalendarActions, loadCalendarEntries, saveCalendarActions, saveCalendarEntry, type CalendarAction, type CalendarEntry } from './CalendarPanel';
import mobileFirstBuilderConfig from '../../config/mobileFirstBuilder.json';
import { AiMentorChat, LEGACITO_SKIN_OPTIONS } from '../../app/components/integrations/AiMentorChat';
import { onUserScopeChanged, scopedRawGet, scopedRawSet } from '../../lib/userScope';
import { reportCanonicalSyncError, syncCalendarActionsToSupabase, syncCalendarEntryToSupabase, syncRoutineToSupabase } from '../../lib/canonicalData';
import { copyTextWithFallback, openWhatsAppShare } from './builderSharing';
import { toWirUrl } from '../../lib/wir';
import { UiIcon } from '../UiIcon';
import { PersonalHomePanel } from './PersonalHomePanel';
import { PersonalTrainingPanel } from './PersonalTrainingPanel';
import { OneRmCalculator } from './OneRmCalculator';
import { RestTimer } from './RestTimer';
import { SportsChronograph } from './SportsChronograph';
import { WeeklyCoachSummaryPanel } from './WeeklyCoachSummaryPanel';
import { CompositionDraftPanel } from './CompositionDraftPanel';
import { MealTimelinePanel } from './MealTimelinePanel';
import { ExerciseSummaryPanel } from './ExerciseSummaryPanel';
import { builderPathForTab, resolveBuilderRoute, type BuilderRouteTab } from '../../lib/builderRoutes';

const APP_URLS = resolveFitLegacyAppUrls(import.meta.env);
const LEGAL_URLS = {
  privacy: 'https://fitlegacy.app/privacy#privacy',
  terms: 'https://fitlegacy.app/terms#terms',
  cookies: 'https://fitlegacy.app/privacy#cookies',
} as const;
// Analytics owns longitudinal insights and Legacito. Keep these destinations
// explicit so Builder never presents a second, divergent copy of those screens.
const analyticsHandoffUrl = (path: string) => {
  const returnTo = typeof window === 'undefined' ? '/dashboard' : window.location.pathname;
  return `${APP_URLS.analytics}${path}?from=builder&returnTo=${encodeURIComponent(returnTo)}`;
};

const PRODUCT_LINKS = [
  { name: 'Legacy IA', href: APP_URLS.ai },
  { name: 'Builder', href: APP_URLS.builder },
  { name: 'The Road', href: APP_URLS.road },
  { name: 'Planes', href: `${APP_URLS.landing}#pricing` },
];

const LEGACY_LINKS = [
  { name: 'Hub', href: APP_URLS.landing },
  { name: 'Privacidad', href: LEGAL_URLS.privacy },
  { name: 'Términos', href: LEGAL_URLS.terms },
  { name: 'Cookies', href: LEGAL_URLS.cookies, isCookies: true },
  { name: 'Soporte', href: 'mailto:soporte@fitlegacy.app' },
];

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

type TabType = BuilderRouteTab;
type BuilderProfile = 'woman' | 'man';

const CUSTOMIZE_KEY = 'catalog-customize-config';
const ONBOARDING_KEY = 'fl-builder-onboarding-v1';
const BUILDER_PROFILE_KEY = 'fl-builder-profile-v1';
const LEGACITO_SKIN_KEY = 'fl-builder-legacito-skin-v1';

const BUILDER_PROFILE_ASSETS: Record<BuilderProfile, string[]> = {
  woman: [
    localAssetUrl('/assets_coach_tips/women_orange_energetico/athletic_woman_confident_pose.webp'),
    localAssetUrl('/assets_coach_tips/women_orange_energetico/athletic_woman_lunge_pose.webp'),
    localAssetUrl('/assets_coach_tips/women_orange_energetico/athletic_woman_protein.webp'),
    localAssetUrl('/assets_coach_tips/women_orange_energetico/athletic_woman_squat.webp'),
    localAssetUrl('/assets_coach_tips/women_orange_energetico/victory_jump_illustration.webp'),
  ],
  man: [
    localAssetUrl('/assets_coach_tips/man_orange_energetico/confident_athlete_standing.webp'),
    localAssetUrl('/assets_coach_tips/man_orange_energetico/751897927_1376542741270294_1485225782041362540_n.webp'),
    localAssetUrl('/assets_coach_tips/man_orange_energetico/athletic_man_protein.webp'),
    localAssetUrl('/assets_coach_tips/man_orange_energetico/752514664_1665291831230549_680017816444529485_n.webp'),
    localAssetUrl('/assets_coach_tips/man_orange_energetico/dynamic_protein_celebration.webp'),
  ],
};

const BUILDER_PROFILE_OPTIONS: Array<{
  value: BuilderProfile;
  label: string;
  theme: string;
  image: string;
}> = [
  { value: 'woman', label: 'Woman', theme: 'Rose signal', image: BUILDER_PROFILE_ASSETS.woman[0] },
  { value: 'man', label: 'Man', theme: 'Golden signal', image: BUILDER_PROFILE_ASSETS.man[0] },
];

const BUILDER_ONBOARDING_STEP_VARIANTS = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 20,
    scale: 0.992,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -14,
    scale: 0.996,
  }),
};
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
      src={localAssetUrl(`/assets/icons/workouts/${iconFile}`)}
      alt={`Icono de ${section}`} 
      className={`${className} object-cover transition-transform duration-300 group-hover:scale-110`} 
      onError={(e) => {
        const image = e.currentTarget;
        const fallback = localAssetUrl('/assets/icons/workouts/icono_personalizado.svg');
        if (!image.src.endsWith('/assets/icons/workouts/icono_personalizado.svg')) image.src = fallback;
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
    return <UiIcon name="fuel_protein" variant="rose" className={className} />;
  }

  return <Renderer category={category} name={name} className={className} />;
};

const ExerciseIconTile = ({ section, className = '' }: { section: string; className?: string }) => (
  <div className={`shrink-0 flex items-center justify-center ${className}`.trim()}>
    <ExerciseIcon section={section} className="h-full w-full object-contain" />
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
  <div className={`flex shrink-0 items-center justify-center ${className}`.trim()}>
    <FoodIcon category={category} name={name} className="h-full w-full object-contain" />
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
    body: 'Elegí la identidad visual que te acompañará durante tu proceso.',
    tab: 'home',
    icon: 'profile',
  },
  {
    title: 'Calibra tu objetivo',
    body: 'Definí objetivo, experiencia, frecuencia y equipamiento para personalizar las sugerencias.',
    tab: 'home',
    icon: 'add',
  },
  {
    title: 'Construye tu plan',
    body: 'Agregá ejercicios y ajustá series, repeticiones y carga según tu realidad.',
    tab: 'build',
    icon: 'routine',
  },
  {
    title: 'Entrena y registra',
    body: 'Completá cada serie y guardá la sesión para construir evidencia real.',
    tab: 'train',
    icon: 'routine',
  },
  {
    title: 'Lee tu contexto con Legacito',
    body: 'Legacito vive en Analytics: interpreta tu objetivo, plan e historial y explica cada sugerencia antes de que decidas.',
    tab: 'coach',
    icon: 'share',
  },
];

function OnboardingIcon({ type }: { type: 'profile' | 'add' | 'meals' | 'routine' | 'share' }) {
  if (type === 'profile') return <UiIcon name="datos" className="h-5 w-5" active />;
  if (type === 'meals') return <UiIcon name="fuel_protein" variant="green" className="h-5 w-5" />;
  if (type === 'routine') return <UiIcon name="dumbbell" className="h-5 w-5" />;
  if (type === 'share') return <UiIcon name="tips" className="h-5 w-5" active />;
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
    saveWorkoutDay,
    saveMealComposition,
    removeMealComposition,
    mealCompositions,
  } = useWorkoutStore();

  const initialBuilderRoute = typeof window === 'undefined'
    ? { tab: 'home' as TabType, mode: undefined }
    : resolveBuilderRoute(window.location.pathname);
  const [activeTab, setActiveTab] = useState<TabType>(initialBuilderRoute.tab);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [customExerciseName, setCustomExerciseName] = useState('');
  const [customSeries, setCustomSeries] = useState(3);
  const [customReps, setCustomReps] = useState(10);
  const [customWeight, setCustomWeight] = useState(0);
  const [workoutDraftItems, setWorkoutDraftItems] = useState<SelectedExercise[]>([]);
  const [workoutDraftDayId, setWorkoutDraftDayId] = useState('day-1');
  const [workoutDraftDayLabel, setWorkoutDraftDayLabel] = useState('Día 1');
  const [workoutDraftDate, setWorkoutDraftDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [workoutDraftTime, setWorkoutDraftTime] = useState(() => new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false }));
  const [mealDraftItems, setMealDraftItems] = useState<FoodItem[]>([]);
  const [mealDraftId, setMealDraftId] = useState(() => `meal-${Date.now()}`);
  const [mealDraftSlot, setMealDraftSlot] = useState(1);
  const [mealDraftName, setMealDraftName] = useState('Desayuno');
  const [mealDraftDate, setMealDraftDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [mealDraftTime, setMealDraftTime] = useState(() => new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false }));
  const [showCustomize, setShowCustomize] = useState(false);
  const [catalogLogo, setCatalogLogo] = useState<string | null>(null);
  const [catalogBgId, setCatalogBgId] = useState<string>('clean');
  const [catalogBgImage, setCatalogBgImage] = useState<string | null>(null);
  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>(() => loadCalendarEntries());
  const [calendarActions, setCalendarActions] = useState<CalendarAction[]>(() => loadCalendarActions());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingDirection, setOnboardingDirection] = useState<1 | -1>(1);
  const builderProfileRailRef = useRef<HTMLDivElement>(null);
  const routeHydratedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [builderProfile, setBuilderProfile] = useState<BuilderProfile>(() => (
    scopedRawGet(BUILDER_PROFILE_KEY) === 'woman' ? 'woman' : 'man'
  ));
  const [legacitoSkin, setLegacitoSkin] = useState<LegacitoSkin>(() => {
    const stored = scopedRawGet(LEGACITO_SKIN_KEY) as LegacitoSkin | null;
    return LEGACITO_SKIN_OPTIONS.some((option) => option.value === stored) ? stored! : 'legacy-ai';
  });

  // Every Builder screen has a stable URL so reloads, deep links and the
  // browser back button keep the user inside the app instead of falling back
  // to the landing route.
  useEffect(() => {
    const route = resolveBuilderRoute(window.location.pathname);
    if (route.external) {
      const destination = route.external === 'progress' ? '/progreso' : '/legacito';
      window.location.replace(analyticsHandoffUrl(destination));
      return;
    }
    if (route.mode && route.mode !== builderMode) setBuilderMode(route.mode);
  }, []);

  useEffect(() => {
    if (!routeHydratedRef.current) {
      routeHydratedRef.current = true;
      return;
    }
    const nextPath = builderPathForTab(activeTab, builderMode);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ fitLegacyBuilder: true, tab: activeTab }, '', nextPath);
    }
  }, [activeTab, builderMode]);

  useEffect(() => {
    const onPopState = () => {
      const route = resolveBuilderRoute(window.location.pathname);
      if (route.external) {
        const destination = route.external === 'progress' ? '/progreso' : '/legacito';
        window.location.replace(analyticsHandoffUrl(destination));
        return;
      }
      if (route.mode && route.mode !== builderMode) setBuilderMode(route.mode);
      setActiveTab(route.tab);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [builderMode, setBuilderMode]);

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
          cat.exercises.map(ex => ({ ...ex, section, catalogGroup: cat.category }))
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
    if (!showOnboarding || onboardingStep !== 0) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const rail = builderProfileRailRef.current;
      const selected = rail?.querySelector<HTMLElement>(`[data-builder-profile-option="${builderProfile}"]`);
      if (!rail || !selected) return;
      rail.scrollTo({
        left: selected.offsetLeft - (rail.clientWidth - selected.clientWidth) / 2,
        behavior: 'smooth',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [builderProfile, onboardingStep, showOnboarding]);

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
      setActiveTab('home');
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
    const customExercise: SelectedExercise = {
      id: customId,
      name: trimmedName,
      section: 'custom',
      difficulty: 'beginner',
      sets: customSeries,
      reps: customReps,
      weight: customWeight,
    } as SelectedExercise;
    setWorkoutDraftItems((current) => current.some((item) => item.id === customId) ? current : [...current, customExercise]);

    toast.success(`${trimmedName} listo para confirmar`);
    setCustomExerciseName('');
    setCustomSeries(3);
    setCustomReps(10);
    setCustomWeight(0);
  };

  const toggleCatalogItem = (item: any) => {
    if (builderMode === 'workout') {
      const selected: SelectedExercise = {
        ...item,
        section: item.section || 'custom',
        sets: Number(item.sets) > 0 ? Number(item.sets) : 3,
        reps: Number(item.reps) > 0 ? Number(item.reps) : 10,
        weight: Number(item.weight) >= 0 ? Number(item.weight) : 0,
      } as SelectedExercise;
      setWorkoutDraftItems((current) => current.some((draft) => draft.id === selected.id)
        ? current.filter((draft) => draft.id !== selected.id)
        : [...current, selected]);
      return;
    }
    const selected: FoodItem = { ...item, quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 100 } as FoodItem;
    setMealDraftItems((current) => current.some((draft) => draft.id === selected.id)
      ? current.filter((draft) => draft.id !== selected.id)
      : [...current, selected]);
  };

  const confirmCatalogDraft = () => {
    if (builderMode === 'workout') {
      if (workoutDraftItems.length === 0) {
        toast.info('Elegí al menos un ejercicio antes de confirmar.');
        return;
      }
      saveWorkoutDay(workoutDraftDayId, workoutDraftDayLabel, workoutDraftItems);
      const workoutVolume = workoutDraftItems.reduce((total, exercise) => (
        total + (Number(exercise.sets) || 0) * (Number(exercise.reps) || 0) * (Number(exercise.weight) || 0)
      ), 0);
      const workoutEntry = saveCalendarEntry({
        date: workoutDraftDate,
        type: 'workout',
        name: `${workoutDraftDayLabel.trim() || 'Entrenamiento'} · ${currentRoutine.name || 'Mi plan'}`,
        exercises: workoutDraftItems.length,
        foods: 0,
        totalVolume: workoutVolume,
        totalCalories: 0,
      });
      setCalendarEntries(workoutEntry);
      const workoutActionId = `builder-workout-${workoutDraftDayId}-${workoutDraftDate}`;
      setCalendarActions((current) => [
        ...current.filter((action) => action.id !== workoutActionId),
        {
          id: workoutActionId,
          date: workoutDraftDate,
          title: `${workoutDraftDayLabel.trim() || 'Entrenamiento'} · ${workoutDraftItems.length} ejercicios`,
          type: 'workout',
          time: workoutDraftTime || undefined,
          notes: `Plan ${currentRoutine.name || 'Mi plan'}`,
          completed: false,
        },
      ]);
      const savedEntry = workoutEntry.find((entry) => entry.date === workoutDraftDate);
      if (savedEntry) void syncCalendarEntryToSupabase(savedEntry).catch(reportCanonicalSyncError);
      toast.success(`${workoutDraftDayLabel} guardado con ${workoutDraftItems.length} ejercicios`);
      setWorkoutDraftItems([]);
      setActiveTab('build');
      return;
    }
    if (mealDraftItems.length === 0) {
      toast.info('Elegí al menos un alimento antes de confirmar.');
      return;
    }
    if (mealCompositions.some((meal) => meal.date === mealDraftDate && meal.slot === mealDraftSlot && meal.id !== mealDraftId)) {
      toast.error(`La comida ${mealDraftSlot} de ese día ya está ocupada.`);
      return;
    }
    const meal: Omit<MealComposition, 'createdAt' | 'updatedAt'> = {
      id: mealDraftId,
      slot: mealDraftSlot,
      name: mealDraftName,
      date: mealDraftDate,
      time: mealDraftTime,
      foods: mealDraftItems,
    };
    saveMealComposition(meal);
    mealDraftItems.forEach((food) => addFood(food));
    const mealCalories = mealDraftItems.reduce((total, food) => total + (Number(food.calories) || 0) * (Number(food.quantity) || 100) / 100, 0);
    const mealEntry = saveCalendarEntry({
      date: mealDraftDate,
      type: 'nutrition',
      name: `${mealDraftName.trim() || `Comida ${mealDraftSlot}`} · ${currentRoutine.name || 'Mi plan'}`,
      exercises: 0,
      foods: mealDraftItems.length,
      totalVolume: 0,
      totalCalories: mealCalories,
    });
    setCalendarEntries(mealEntry);
    const mealActionId = `builder-meal-${mealDraftId}`;
    setCalendarActions((current) => [
      ...current.filter((action) => action.id !== mealActionId),
      {
        id: mealActionId,
        date: mealDraftDate,
        title: `${mealDraftName.trim() || `Comida ${mealDraftSlot}`} · ${mealDraftItems.length} ingredientes`,
        type: 'meal',
        time: mealDraftTime || undefined,
        notes: `Slot ${mealDraftSlot} · Plan ${currentRoutine.name || 'Mi plan'}`,
        completed: false,
      },
    ]);
    const savedMealEntry = mealEntry.find((entry) => entry.date === mealDraftDate);
    if (savedMealEntry) void syncCalendarEntryToSupabase(savedMealEntry).catch(reportCanonicalSyncError);
    toast.success(`${mealDraftName} guardado con ${mealDraftItems.length} ingredientes`);
    setMealDraftItems([]);
    setMealDraftId(`meal-${Date.now()}`);
    setActiveTab('food');
  };

  const updateWorkoutDraftExercise = (id: string, patch: Partial<Pick<SelectedExercise, 'sets' | 'reps' | 'weight' | 'notes'>>) => {
    setWorkoutDraftItems((current) => current.map((exercise) => (
      exercise.id === id ? { ...exercise, ...patch } : exercise
    )));
  };

  const removeWorkoutDraftExercise = (id: string) => {
    setWorkoutDraftItems((current) => current.filter((exercise) => exercise.id !== id));
  };

  const updateMealDraftFood = (id: string, patch: Partial<Pick<FoodItem, 'quantity' | 'notes'>>) => {
    setMealDraftItems((current) => current.map((food) => (
      food.id === id ? { ...food, ...patch } : food
    )));
  };

  const removeMealDraftFood = (id: string) => {
    setMealDraftItems((current) => current.filter((food) => food.id !== id));
  };

  const discardCatalogDraft = () => {
    if (builderMode === 'workout') {
      setWorkoutDraftItems([]);
    } else {
      setMealDraftItems([]);
      setMealDraftId(`meal-${Date.now()}`);
    }
    toast.info('Borrador descartado. Tu plan confirmado no cambió.');
  };

  const continueAddingDraft = () => {
    setActiveTab('catalog');
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLInputElement>('input[aria-label="Buscar ejercicios y comidas"]')?.focus();
    });
  };

  const startMealDraft = (slot: number, date: string, time: string, name: string) => {
    setBuilderMode('nutrition');
    setMealDraftItems([]);
    setMealDraftId(`meal-${Date.now()}`);
    setMealDraftSlot(slot);
    setMealDraftName(name);
    setMealDraftDate(date);
    setMealDraftTime(time);
    setActiveTab('catalog');
  };

  const editMealComposition = (meal: MealComposition) => {
    setBuilderMode('nutrition');
    setMealDraftItems(meal.foods.map((food) => ({ ...food })));
    setMealDraftId(meal.id);
    setMealDraftSlot(meal.slot);
    setMealDraftName(meal.name);
    setMealDraftDate(meal.date);
    setMealDraftTime(meal.time);
    setActiveTab('catalog');
  };

  const deleteMealComposition = (meal: MealComposition) => {
    removeMealComposition(meal.id);
    toast.success(`${meal.name} quitada del día.`);
  };

  const activeDraftItems = builderMode === 'workout' ? workoutDraftItems : mealDraftItems;
  const todayCalendarKey = new Date().toISOString().slice(0, 10);
  const todayWorkoutCalendarEntry = calendarEntries.find((entry) => entry.date === todayCalendarKey && (entry.type === 'workout' || entry.type === 'mixed'));
  const todayWorkoutCalendarAction = calendarActions.find((action) => action.date === todayCalendarKey && action.type === 'workout');

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
    'Elegí ejercicios y construí la base de tu entrenamiento.',
    'Tu catálogo personal de movimientos y variantes.',
  ];
  const screenSubtitle = activeTab === 'home'
    ? 'Tu entrenamiento de hoy, sin ruido.'
    : activeTab === 'catalog'
      ? subtitleOptions[subtitleTick % subtitleOptions.length]
      : activeTab === 'draft'
        ? builderMode === 'workout' ? 'Revisá la rutina antes de guardarla.' : 'Revisá la comida antes de guardarla.'
      : activeTab === 'food'
        ? 'Organizá tu alimentación como un módulo separado.'
: activeTab === 'build'
          ? 'Tu semana en días, con ajustes de IA Coach 1.1 aplicables.'
          : activeTab === 'train'
            ? 'Completá cada serie y registrá evidencia real.'
            : activeTab === 'oneRm'
              ? 'Convertí una serie fuerte en una carga de referencia.'
              : activeTab === 'timer'
                ? 'Medí el descanso, el ritmo y el tiempo de cada sesión.'
            : activeTab === 'calendar'
              ? 'Revisá tu constancia y evolución en Analytics.'
              : activeTab === 'coach'
                ? 'Legacito interpreta tu contexto y propone ajustes en Analytics.'
                : 'Guardá o compartí una copia de tu plan.';

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
    if (stepIndex === onboardingStep || stepIndex < 0 || stepIndex >= ONBOARDING_STEPS.length) return;
    const step = ONBOARDING_STEPS[stepIndex];
    setOnboardingDirection(stepIndex > onboardingStep ? 1 : -1);
    setOnboardingStep(stepIndex);
    if (step.tab === 'coach') {
      window.location.assign(analyticsHandoffUrl('/legacito'));
      return;
    }
    setActiveTab(step.tab);
    if (step.tab === 'catalog' && step.icon !== 'profile') {
      setBuilderMode('workout');
    }
    if (step.tab === 'food') {
      setBuilderMode('nutrition');
    }
  }, [onboardingStep, setBuilderMode]);

  const advanceOnboarding = useCallback(() => {
    if (onboardingStep >= ONBOARDING_STEPS.length - 1) {
      completeOnboarding();
      return;
    }
    goToOnboardingStep(onboardingStep + 1);
  }, [completeOnboarding, goToOnboardingStep, onboardingStep]);

  useEffect(() => {
    if (!showOnboarding) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, select, textarea, [contenteditable="true"]')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        completeOnboarding();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        advanceOnboarding();
      } else if (event.key === 'ArrowLeft' && onboardingStep > 0) {
        event.preventDefault();
        goToOnboardingStep(onboardingStep - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [advanceOnboarding, completeOnboarding, goToOnboardingStep, onboardingStep, showOnboarding]);

  return (
    <div data-builder-profile={builderProfile} className="builder-profile-root flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-[#080808] font-sans text-[#F1F0F4]">
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
                <span className="hidden font-['IBM_Plex_Mono',monospace] text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--builder-accent-soft)] sm:inline">Personal</span>
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
            <span className="builder-status-chip whitespace-nowrap px-3 py-2 text-[10px] font-black">{currentRoutine.exercises.length} ejercicios</span>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button onClick={() => setActiveTab('export')} className="builder-header-share hidden px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.14em] md:block" disabled={!hasRoutineItems}>Compartir</button>
            <button
              onClick={() => setActiveTab('export')}
              className="builder-icon-button flex h-10 w-10 items-center justify-center text-[#6E6558] hover:text-[var(--builder-accent)] md:hidden"
              aria-label="Compartir mi plan"
              disabled={!hasRoutineItems}
            >
              <UiIcon name="gallery" size={18} active={hasRoutineItems} />
            </button>
            <NotificationBell />
            <button
              onClick={() => setShowCustomize(true)}
              className="builder-icon-button flex h-10 w-10 items-center justify-center text-[#6E6558] hover:text-[var(--builder-accent)]"
              aria-label="Abrir ajustes del Builder"
              aria-expanded={showCustomize}
            >
              <UiIcon name="ajustes" variant={showCustomize ? 'green' : 'rose'} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div
        className="relative z-10 flex-1 overflow-hidden lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-4 lg:p-4 xl:grid-cols-[280px_minmax(0,1fr)_360px]"
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
          className="relative hidden min-h-0 flex-col overflow-hidden rounded-[2rem] bg-[#111111] p-4 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.7)] lg:flex"
        >
          <div className="builder-profile-ambient pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="mb-5 flex items-start justify-between relative">
            <div className="space-y-0.5">
              <p className="font-['IBM_Plex_Mono',monospace] text-[10px] font-medium tracking-[0.16em] text-[var(--builder-accent-soft)]">Tu proceso, una señal</p>
              <h2 className="font-['Big_Shoulders_Display',sans-serif] text-3xl font-extrabold tracking-tight text-[#F1F0F4] uppercase">Mi entrenamiento</h2>
            </div>
          </div>

          <div className="relative flex flex-col gap-3">
            {[
              { id: 'home' as TabType, label: 'Hoy', meta: 'Tu punto de partida', renderIcon: (active: boolean, size: number) => <UiIcon name="graph-pie" size={size} active={active} /> },
              { id: 'build' as TabType, label: 'Mi plan', meta: `${currentRoutine.exercises.length} ejercicios`, renderIcon: (active: boolean, size: number) => <UiIcon name="rocket-launch-chart" size={size} active={active} /> },
              { id: 'train' as TabType, label: 'Entrenar', meta: 'Registrar sesión', renderIcon: (active: boolean, size: number) => <UiIcon name="on-off-1" size={size} active={active} /> },
              { id: 'oneRm' as TabType, label: '1RM', meta: 'Medir fuerza', renderIcon: (active: boolean, size: number) => <UiIcon name="rocket-launch-chart" size={size} active={active} /> },
              { id: 'timer' as TabType, label: 'Timer', meta: 'Descanso y ritmo', renderIcon: (active: boolean, size: number) => <UiIcon name="date-time-setting" size={size} active={active} /> },
              { id: 'food' as TabType, label: 'Meals', meta: `${mealCompositions.length} comidas`, renderIcon: (active: boolean, size: number) => <UiIcon name="fuel_protein" size={size} active={active} variant="green" /> },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
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
                  <span className="relative flex shrink-0 items-center justify-center">
                    {item.renderIcon(isActive, 20)}
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

          {(activeTab === 'catalog' || activeTab === 'food') ? (
            <div className="mt-5 min-h-0 flex-1 overflow-hidden relative">
              <div className="mb-3 flex items-center justify-between px-1">
                <p className="font-['IBM_Plex_Mono',monospace] text-[9px] font-medium tracking-[0.18em] text-[#9CA0A6] uppercase">Filtrar</p>
                <p className="font-['IBM_Plex_Mono',monospace] text-[9px] font-medium text-[#6E6558]">{builderMode === 'workout' ? 'Ejercicios' : 'Alimentos'}</p>
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
                      <motion.span layoutId="desktop-filter-active-glow" className="builder-profile-accent-rail absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full" />
                    )}
                    <span className="flex items-center gap-3">
                      {builderMode === 'workout'
                        ? <ExerciseIcon section={filter.id === 'all' ? 'fullbody' : filter.id} className="h-8 w-8 shrink-0" />
                        : <FoodIcon category={filter.id === 'all' ? 'protein' : filter.id} className="h-8 w-8 shrink-0" />}
                      <span className="flex min-w-0 flex-col">
                        <span className="text-sm font-['Big_Shoulders_Display',sans-serif] font-bold uppercase tracking-[0.06em]">{filter.label}</span>
                        <span className={`font-['IBM_Plex_Mono',monospace] text-[8px] font-medium uppercase tracking-[0.16em] ${activeFilter === filter.id ? 'text-[var(--builder-accent-soft)]' : 'text-[#6E6558]'}`}>
                          {filter.id === 'all' ? 'Todo' : builderMode === 'workout' ? 'Grupo' : 'Categoría'}
                        </span>
                      </span>
                    </span>
                    {activeFilter === filter.id && <UiIcon name="validation-1" size={16} variant="duo" />}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-5 flex min-h-0 flex-1 flex-col gap-3">
              <p className="px-1 font-['IBM_Plex_Mono',monospace] text-[9px] font-medium uppercase tracking-[0.18em] text-[#9CA0A6]">Accesos rápidos</p>
              <button type="button" onClick={() => { setBuilderMode('workout'); setActiveTab('catalog'); }} className="builder-apple-card flex items-center justify-between p-4 text-left transition-colors hover:bg-[#211d19]">
                <span><strong className="block text-sm text-[#F1F0F4]">Agregar ejercicios</strong><small className="mt-1 block text-[9px] text-[#6E6558]">Explorá el catálogo personal</small></span>
                <Plus size={16} className="text-[var(--builder-accent-soft)]" />
              </button>
              <button type="button" onClick={() => { setBuilderMode('nutrition'); setActiveTab('food'); }} className="builder-apple-card flex items-center justify-between p-4 text-left transition-colors hover:bg-[#211d19]">
                <span><strong className="block text-sm text-[#F1F0F4]">Mi alimentación</strong><small className="mt-1 block text-[9px] text-[#6E6558]">Módulo personal separado</small></span>
                <UiIcon name="fuel_protein" size={17} variant="green" />
              </button>
              <button type="button" onClick={() => setActiveTab('export')} disabled={!hasRoutineItems} className="builder-apple-card flex items-center justify-between p-4 text-left transition-colors hover:bg-[#211d19] disabled:opacity-40">
                <span><strong className="block text-sm text-[#F1F0F4]">Guardar o compartir</strong><small className="mt-1 block text-[9px] text-[#6E6558]">Generá una copia WIR</small></span>
                 <UiIcon name="cloud-data-transfer" size={16} className="text-[var(--builder-accent-soft)]" active />
              </button>
            </div>
          )}
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
          {activeTab === 'home' && (
            <PersonalHomePanel onNavigate={(destination) => {
              if (destination === 'catalog') setBuilderMode('workout');
              setActiveTab(destination);
            }} />
          )}

          {activeTab === 'train' && (
            <PersonalTrainingPanel
              onOpenPlan={() => setActiveTab('build')}
              onComplete={() => setActiveTab('calendar')}
            />
          )}

          {activeTab === 'oneRm' && (
            <motion.div
              key="builder-one-rm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="builder-tool-page h-full overflow-y-auto"
            >
              <OneRmCalculator />
            </motion.div>
          )}

          {activeTab === 'timer' && (
            <motion.div
              key="builder-timer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="builder-tool-page h-full overflow-y-auto"
            >
              <SportsChronograph />
              <RestTimer />
            </motion.div>
          )}

          {activeTab === 'catalog' && (
            <motion.div 
              key={`catalog-${builderMode}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col gap-4 overflow-hidden rounded-[2rem] p-3 pt-3 sm:gap-6 sm:p-6"
            >
               <div className="builder-catalog-context" aria-live="polite">
                 <div className="flex items-center gap-3">
                   <UiIcon name={builderMode === 'workout' ? 'dumbbell' : 'fuel_protein'} size={18} variant={builderMode === 'nutrition' ? 'green' : undefined} />
                   <div>
                     <p className="font-['Big_Shoulders_Display',sans-serif] text-lg font-black uppercase text-[#F1F0F4]">
                       {builderMode === 'workout' ? 'Catálogo de ejercicios' : 'Catálogo de alimentos'}
                     </p>
                     <p className="font-['IBM_Plex_Mono',monospace] text-[9px] uppercase tracking-[0.14em] text-[#6E6558]">
                       {builderMode === 'workout' ? 'Mi Plan · solo entrenamiento' : 'Meals · solo nutrición'}
                     </p>
                   </div>
                 </div>
                 <span className="builder-status-chip text-[9px]">{builderMode === 'workout' ? 'Ejercicios' : 'Meals'}</span>
               </div>

               <div className={`builder-draft-strip${activeDraftItems.length > 0 ? ' is-ready' : ''}`} aria-live="polite">
                 <div className="min-w-0">
                   <p className="font-['IBM_Plex_Mono',monospace] text-[9px] font-black uppercase tracking-[0.16em] text-[var(--builder-accent-soft)]">
                     {activeDraftItems.length > 0 ? `${activeDraftItems.length} seleccionados` : 'Borrador sin confirmar'}
                   </p>
                   <p className="mt-1 truncate text-[10px] text-[#9CA0A6]">
                     {builderMode === 'workout' ? 'Revisá el día antes de guardarlo.' : 'Revisá la comida antes de guardarla.'}
                   </p>
                 </div>
                 {activeDraftItems.length > 0 && (
                   <button
                     type="button"
                     onClick={() => setActiveTab('draft')}
                     className="builder-cta-ghost shrink-0 px-3 py-2 text-[9px] font-black uppercase tracking-widest"
                   >
                     Revisar borrador
                   </button>
                 )}
               </div>

               {activeDraftItems.length > 0 && (
                 <CompositionDraftPanel
                   mode={builderMode}
                   exercises={workoutDraftItems}
                   foods={mealDraftItems}
                   dayId={workoutDraftDayId}
                   dayLabel={workoutDraftDayLabel}
                   dayDate={workoutDraftDate}
                   dayTime={workoutDraftTime}
                   mealSlot={mealDraftSlot}
                   mealName={mealDraftName}
                   mealDate={mealDraftDate}
                   mealTime={mealDraftTime}
                   onDayIdChange={(value) => { setWorkoutDraftDayId(value); setWorkoutDraftDayLabel(`Día ${value.split('-').pop()}`); }}
                   onDayLabelChange={setWorkoutDraftDayLabel}
                   onDayDateChange={setWorkoutDraftDate}
                   onDayTimeChange={setWorkoutDraftTime}
                   onMealSlotChange={setMealDraftSlot}
                   onMealNameChange={setMealDraftName}
                   onMealDateChange={setMealDraftDate}
                   onMealTimeChange={setMealDraftTime}
                   onUpdateExercise={updateWorkoutDraftExercise}
                   onRemoveExercise={removeWorkoutDraftExercise}
                   onUpdateFood={updateMealDraftFood}
                   onRemoveFood={removeMealDraftFood}
                   onConfirm={confirmCatalogDraft}
                   onDiscard={discardCatalogDraft}
                   onContinueAdding={continueAddingDraft}
                 />
               )}

               <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6558]" aria-hidden="true" />
                  <input 
                    type="text"
                    aria-label="Buscar ejercicios y comidas"
                    placeholder={`Search ${builderMode === 'workout' ? 'exercises' : 'foods'}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="builder-apple-input w-full py-4 pl-12 pr-4 focus:outline-none font-bold text-base text-[#F1F0F4] placeholder:text-[#9CA0A6] sm:text-[15px]"
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
                    const isSelected = activeDraftItems.some((draft) => draft.id === item.id);
                    return (
                  <motion.div
                        key={`${builderMode}-${(item as any).section ?? (item as any).category ?? 'item'}-${(item as any).catalogGroup ?? 'group'}-${item.id}`}
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.34, delay: Math.min(index * 0.018, 0.16), ease: [0.22, 1, 0.36, 1] }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => toggleCatalogItem(item)}
                        className={`builder-apple-card flex cursor-pointer items-center justify-between gap-3 p-3 transition-all group hover:-translate-y-0.5${isSelected ? ' builder-catalog-item--selected' : ''}`}
                      >
                        <div className="flex min-w-0 items-center gap-3.5">
                          <div className="shrink-0 flex items-center justify-center">
                            {builderMode === 'workout' ? (
                              <ExerciseIcon section={(item as any).section} className="h-9 w-9 object-contain" />
                            ) : (
                              <FoodIcon category={(item as any).category} name={item.name} className="h-9 w-9 object-contain" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="line-clamp-1 font-bold uppercase text-xs text-[#F1F0F4]">{item.name}</p>
                            <p className="font-['IBM_Plex_Mono',monospace] text-[8px] font-medium text-[#6E6558] uppercase tracking-widest">
                              {builderMode === 'workout' ? (item as any).section : (item as any).category}
                            </p>
                          </div>
                        </div>
                         <button type="button" className="builder-icon-button flex h-8 w-8 shrink-0 items-center justify-center text-[#7E7A75] hover:text-white" aria-label={isSelected ? `Quitar ${item.name}` : `Agregar ${item.name}`}>
                           {isSelected ? <UiIcon name="validation-1" size={16} variant="duo" /> : <Plus size={16} />}
                         </button>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'draft' && (
            <motion.div
              key={`draft-${builderMode}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full overflow-y-auto p-3 pb-28 sm:p-6"
            >
              {activeDraftItems.length > 0 ? (
                <CompositionDraftPanel
                  mode={builderMode}
                  exercises={workoutDraftItems}
                  foods={mealDraftItems}
                  dayId={workoutDraftDayId}
                  dayLabel={workoutDraftDayLabel}
                  dayDate={workoutDraftDate}
                  dayTime={workoutDraftTime}
                  mealSlot={mealDraftSlot}
                  mealName={mealDraftName}
                  mealDate={mealDraftDate}
                  mealTime={mealDraftTime}
                  onDayIdChange={(value) => { setWorkoutDraftDayId(value); setWorkoutDraftDayLabel(`Día ${value.split('-').pop()}`); }}
                  onDayLabelChange={setWorkoutDraftDayLabel}
                  onDayDateChange={setWorkoutDraftDate}
                  onDayTimeChange={setWorkoutDraftTime}
                  onMealSlotChange={setMealDraftSlot}
                  onMealNameChange={setMealDraftName}
                  onMealDateChange={setMealDraftDate}
                  onMealTimeChange={setMealDraftTime}
                  onUpdateExercise={updateWorkoutDraftExercise}
                  onRemoveExercise={removeWorkoutDraftExercise}
                  onUpdateFood={updateMealDraftFood}
                  onRemoveFood={removeMealDraftFood}
                  onConfirm={confirmCatalogDraft}
                  onDiscard={discardCatalogDraft}
                  onContinueAdding={continueAddingDraft}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <UiIcon name={builderMode === 'workout' ? 'dumbbell' : 'fuel_protein'} size={58} className="opacity-40" />
                  <div><h2 className="font-['Big_Shoulders_Display',sans-serif] text-2xl font-black uppercase text-[#F1F0F4]">Borrador vacío</h2><p className="mt-1 text-xs text-[#6E6558]">Agregá elementos desde el catálogo para comenzar.</p></div>
                  <button type="button" onClick={() => setActiveTab('catalog')} className="builder-cta-primary px-4 py-3 text-[10px] font-black uppercase tracking-widest">Abrir catálogo</button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'food' && (
            <motion.div 
              key="food-management"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full overflow-y-auto p-4 pb-28 sm:p-6"
            >
              <MealTimelinePanel
                date={mealDraftDate}
                compositions={mealCompositions}
                onDateChange={setMealDraftDate}
                onAddMeal={startMealDraft}
                onEditMeal={editMealComposition}
                onRemoveMeal={deleteMealComposition}
              />
            </motion.div>
          )}

          {activeTab === 'build' && (
            <ExerciseSummaryPanel
              calendarEntry={todayWorkoutCalendarEntry}
              calendarAction={todayWorkoutCalendarAction}
              onOpenCatalog={() => { setBuilderMode('workout'); setActiveTab('catalog'); }}
              onTrain={() => setActiveTab('train')}
            />
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
              className="h-full overflow-y-auto p-4 pb-28 sm:p-6"
            >
              <div className="w-full max-w-3xl mx-auto space-y-6">
                {/* ─── Share Header Card ─── */}
                <div className="fl-cut-card p-5 space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-['IBM_Plex_Mono',monospace] text-[9px] font-black uppercase tracking-[0.16em] text-[#E0793C]">
                        <span>COPIA INTERACTIVA LISTA</span>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                        <span className="text-white/40">{routineItemCount} ELEMENTOS</span>
                      </div>
                      <h2 className="mt-1 font-['Big_Shoulders_Display',sans-serif] text-3xl font-black uppercase text-[#F1F0F4]">
                        {routineDisplayName}
                      </h2>
                      <p className="mt-1 text-xs font-medium text-[#9CA0A6]">
                        Checklist interactivo que abre en cualquier teléfono o PC sin instalar nada.
                      </p>
                    </div>

                    {/* Direct One-Click Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const wirDoc = {
                              v: 1 as const,
                              name: routineDisplayName,
                              template: shareTemplate,
                              palette: selectedWirPalette,
                              exercises: currentRoutine.exercises.map((ex) => ({
                                name: ex.name,
                                sets: ex.sets || 0,
                                reps: ex.reps || 0,
                                weight: ex.weight || 0,
                                section: ex.section,
                              })),
                              foods: currentRoutine.foods.map((food) => ({
                                name: food.name,
                                quantity: food.quantity || 0,
                                protein: food.protein || 0,
                                calories: food.calories || 0,
                                category: food.category,
                              })),
                            };
                            const link = toWirUrl(wirDoc, window.location.origin);
                            await copyTextWithFallback(link);
                            toast.success('¡Enlace interactivo copiado al portapapeles!');
                          } catch (e) {
                            toast.error('Error al generar enlace');
                          }
                        }}
                        className="fl-cut-cta fl-cut-cta--primary !min-h-[38px] !px-4 !text-[10px]"
                      >
                        COPIAR LINK
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          try {
                            const wirDoc = {
                              v: 1 as const,
                              name: routineDisplayName,
                              template: shareTemplate,
                              palette: selectedWirPalette,
                              exercises: currentRoutine.exercises.map((ex) => ({
                                name: ex.name,
                                sets: ex.sets || 0,
                                reps: ex.reps || 0,
                                weight: ex.weight || 0,
                                section: ex.section,
                              })),
                              foods: currentRoutine.foods.map((food) => ({
                                name: food.name,
                                quantity: food.quantity || 0,
                                protein: food.protein || 0,
                                calories: food.calories || 0,
                                category: food.category,
                              })),
                            };
                            const link = toWirUrl(wirDoc, window.location.origin);
                            const msg = `Te comparto tu rutina interactiva de Fit Legacy: ${routineDisplayName}\n\nAccedé y completá tu checklist acá: ${link}`;
                            openWhatsAppShare(msg);
                          } catch (e) {
                            toast.error('Error al compartir por WhatsApp');
                          }
                        }}
                        className="fl-cut-cta fl-cut-cta--secondary !min-h-[38px] !px-4 !text-[10px]"
                      >
                        WHATSAPP
                      </button>
                    </div>
                  </div>
                </div>

                {/* ─── Appearance Selector ─── */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="font-['IBM_Plex_Mono',monospace] text-[9px] font-black uppercase tracking-[0.16em] text-[#7E7A75]">
                      TEMA Y COLOR DE LA COPIA
                    </p>
                    <span className="font-mono text-[9px] text-white/40 uppercase">
                      Paleta activa: {selectedWirPalette}
                    </span>
                  </div>
                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
                    {CATALOG_BG_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setCatalogBgId(preset.id);
                          setCatalogBgImage(null);
                        }}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                          catalogBgId === preset.id && !catalogBgImage
                            ? 'border-[#E0793C] scale-105 shadow-[0_0_16px_rgba(224,121,60,0.3)]'
                            : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                        style={preset.style}
                        title={preset.label}
                      >
                        {catalogBgId === preset.id && !catalogBgImage && (
                          <span className="text-xs font-black text-white">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ─── Preview Bar ─── */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="font-['IBM_Plex_Mono',monospace] text-[9px] font-black uppercase tracking-[0.16em] text-[#7E7A75]">
                      VISTA PREVIA INTERACTIVA (PROBALA AQUÍ)
                    </p>
                    <p className="text-xs font-medium text-[#9CA0A6]">
                      Hacé clic en las series y comidas para probar cómo interactuará tu alumno o amigo.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('build')}
                    className="fl-cut-chip border-white/10 text-white/60 hover:text-white cursor-pointer"
                  >
                    Editar contenido
                  </button>
                </div>

                {/* ─── Interactive WIR Canvas ─── */}
                <div className="flex justify-center pt-1">
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

          {activeTab === 'coach' && (
            <motion.div
              key="personal-ai-coach"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full overflow-y-auto p-3 pb-28 sm:p-6 lg:pb-6"
            >
              <WeeklyCoachSummaryPanel
                skinId={legacitoSkin}
                onNavigate={(dest) => setActiveTab(dest as TabType)}
              />
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
className="relative hidden min-h-0 overflow-hidden rounded-[2rem] border border-[#F1F0F4]/10 bg-[#18181c]/90 p-4 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-2xl xl:flex xl:flex-col"
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <motion.div
            className="builder-profile-soft-glow pointer-events-none absolute -right-20 top-20 h-44 w-44 rounded-full blur-3xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
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
                  aria-label="Nombre de mi plan"
                />
              </div>
              <button onClick={() => setActiveTab('export')} className="builder-header-share shrink-0 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em]" disabled={!hasRoutineItems}>Preview</button>
                <button onClick={() => window.location.assign(analyticsHandoffUrl('/legacito'))} className="builder-header-share shrink-0 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em]" aria-label="Abrir Legacito en Analytics"><UiIcon name="historial" size={12} active /> Legacito</button>
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
                            <ExerciseIcon section={exercise.section || 'custom'} className="h-8 w-8 shrink-0" />
                            <div className="min-w-0 flex-1"><p>{exercise.name}</p><small>{exercise.sets} sets · {exercise.reps} reps · {exercise.weight} kg</small></div>
                            <div className="builder-canvas-block__actions">
                              <button onClick={() => updateExercise(exercise.id, { sets: Math.max(1, exercise.sets - 1) })} aria-label={`Reducir sets de ${exercise.name}`}><Minus size={12} /></button>
                              <b>{exercise.sets}</b>
                              <button onClick={() => updateExercise(exercise.id, { sets: exercise.sets + 1 })} aria-label={`Aumentar sets de ${exercise.name}`}><Plus size={12} /></button>
                              <button onClick={() => removeExercise(exercise.id)} aria-label={`Eliminar ${exercise.name}`}><UiIcon name="cancel-2" size={14} variant="duo" /></button>
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
                              <button onClick={() => removeFood(food.id)} aria-label={`Eliminar ${food.name}`}><UiIcon name="cancel-2" size={14} variant="duo" /></button>
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
<button onClick={() => setActiveTab('export')} disabled={!hasRoutineItems} className="builder-cta-primary mt-3 flex w-full items-center justify-center gap-2 py-3 text-[9px] font-black uppercase tracking-[0.16em]"><UiIcon name="cloud-data-transfer" size={14} active /> Preparar link</button>
          </div>
        </motion.aside>
      </div>

      <AnimatePresence>
        {showCustomize && (
          <>
            <motion.div
              key="settings-backdrop"
              className="settings-modal-backdrop"
              role="dialog"
              aria-modal="true"
              aria-label="Ajustes del Builder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowCustomize(false)}
            >
              <motion.section
                key="settings-card"
                className="settings-modal-card settings-footer-card"
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                {/* ── Hero asset — brand logo + título flotando sobre la imagen ── */}
                <div className="settings-modal-asset settings-footer-hero">
                  <span className="settings-footer-handle" aria-hidden="true" />
                  <img
                    src="https://fsoevzostulbtoxcqqdh.supabase.co/storage/v1/object/public/analytics-assets/coachs_assets/confident_fitness_duo.webp"
                    alt=""
                    style={{ objectPosition: '50% 18%' }}
                  />

                  {/* Overlay gradiente */}
                  <div className="settings-modal-asset-overlay" />

                  {/* Close button */}
                  <button
                    type="button"
                    className="settings-modal-close settings-modal-close--over"
                    onClick={() => setShowCustomize(false)}
                    aria-label="Cerrar ajustes"
                  >
                    <UiIcon name="cancel-2" size={18} variant="duo" />
                  </button>

                  {/* Logo + textos */}
                  <div className="settings-modal-hero-brand">
                    <span className="settings-modal-mark">
                      <DynamicLogoIcon />
                    </span>
                    <div className="settings-modal-hero-text">
                      <small>Fit Legacy</small>
                      <h2>Builder</h2>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="settings-modal-asset-copy">
                    <span>Builder live</span>
                    <strong>Crea y comparte planes</strong>
                  </div>
                </div>

                <div className="settings-modal-content settings-footer-content">
                  {/* ── Sistema de entrenamiento ── */}
                  <div className="settings-footer-intro">
                    <div>
                      <span className="settings-modal-label">Sistema de entrenamiento</span>
                      <p>Tu centro de creación conectado con todo el ecosistema Fit Legacy.</p>
                    </div>
                    <button
                      type="button"
                      className="settings-footer-sync is-online"
                      title="Builder activo"
                    >
                      <i aria-hidden="true" />
                      <span>Builder activo</span>
                      <strong>{routineDisplayName}</strong>
                    </button>
                  </div>

                  {/* ── Theme selector (builder profile) ── */}
                  <section className="settings-footer-theme">
                    <div className="settings-footer-section-heading">
                      <span className="settings-modal-label">Perfil</span>
                      <small>{builderProfile === 'woman' ? 'Rose signal' : 'Golden signal'}</small>
                    </div>
                    <div className="settings-modal-theme-toggle">
                      {BUILDER_PROFILE_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`settings-modal-theme-btn ${builderProfile === option.value ? 'is-active' : ''}`}
                          aria-pressed={builderProfile === option.value}
                          onClick={() => setBuilderProfile(option.value)}
                          title={`${option.label} — ${option.theme}`}
                        >
                          <img src={option.image} alt="" className="h-4 w-4 rounded-full object-cover" />
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* ── Brand (catalog logo upload) ── */}
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="settings-modal-label">Brand</span>
                      {catalogLogo && (
                        <button onClick={() => setCatalogLogo(null)} className="text-[10px] font-black uppercase tracking-wide text-[#6b1e23]">
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="builder-apple-card p-3 sm:p-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="builder-header-mark flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden p-1 sm:h-16 sm:w-16">
                          {catalogLogo ? <img src={catalogLogo} alt="Logo" className="h-full w-full rounded-lg object-cover" /> : <img src={localAssetUrl('/cyan.svg')} alt="Fit Legacy Builder" className="h-full w-full rounded-lg object-cover" />}
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
                          <UiIcon name="gallery" className="h-4 w-4" active={Boolean(catalogLogo)} /> Upload logo
                          <input type="file" accept="image/*" className="hidden" onChange={handleCatalogLogoUpload} />
                        </label>
                      </div>
                    </div>
                  </section>

                  {/* ── Vista compartida (share preview background presets) ── */}
                  <section className="space-y-3">
                    <span className="settings-modal-label">Vista compartida</span>
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
                              <UiIcon name="validation-1" className="h-4 w-4" variant="duo" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <label className={`builder-cta-ghost flex cursor-pointer items-center justify-between gap-3 p-3 ${catalogBgImage ? 'builder-profile-selected-option text-[var(--builder-accent)]' : ''}`}>
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="builder-apple-tile flex h-9 w-12 items-center justify-center">
                          <UiIcon name="gallery" className="h-5 w-5" active={Boolean(catalogBgImage)} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-black">{catalogBgImage ? 'Custom image' : 'Upload image'}</span>
                          <span className="block text-xs font-medium text-[#6E6558]">Use a custom background.</span>
                        </span>
                      </span>
                      {catalogBgImage && <UiIcon name="validation-1" className="h-4 w-4" variant="duo" />}
                      <input type="file" accept="image/*" className="hidden" onChange={handleCatalogBgUpload} />
                    </label>

                    {catalogBgImage && (
                      <button onClick={() => { setCatalogBgImage(null); setCatalogBgId('clean'); }} className="builder-cta-ghost w-full px-3 py-2 text-xs font-black uppercase tracking-wide text-[#6b1e23] hover:bg-[#fff4f4]">
                        Remove image
                      </button>
                    )}
                  </section>

                  {/* ── Producto / Legado links ── */}
                  <div className="settings-footer-link-grid">
                    <nav aria-label="Productos Fit Legacy">
                      <span className="settings-modal-label">Producto</span>
                      <ul>
                        {PRODUCT_LINKS.map((link) => (
                          <li key={link.name}>
                            <a href={link.href}><span>{link.name}</span><b aria-hidden="true">↗</b></a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <nav aria-label="Información de Fit Legacy">
                      <span className="settings-modal-label">Legado</span>
                      <ul>
                        {LEGACY_LINKS.map((link) => (
                          <li key={link.name}>
                            <a
                              href={link.href}
                              onClick={link.isCookies
                                ? (event) => {
                                    event.preventDefault();
                                    window.dispatchEvent(new CustomEvent('open-cookie-settings'));
                                  }
                                : undefined}
                            >
                              <span>{link.name}</span><b aria-hidden="true">↗</b>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  {/* ── Social links footer ── */}
                  <footer className="settings-footer-meta">
                    <div>
                      <span className="settings-modal-label">Únete</span>
                      <div className="settings-modal-social-links">
                        {FIT_LEGACY_SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                          <a
                            key={name}
                            className="settings-modal-social-link"
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={name}
                            title={name}
                          >
                            <Icon />
                          </a>
                        ))}
                      </div>
                    </div>
                    <p className="settings-modal-motto"><span>Memento Mori.</span><strong>Memento Vivere.</strong></p>
                  </footer>

                  {/* ── Logout button ── */}
                  <button
                    type="button"
                    className="settings-modal-logout fl-cut-cta fl-cut-cta--primary"
                    onClick={() => {
                      setShowCustomize(false);
                      window.location.href = '/';
                    }}
                  >
                    <UiIcon name="on-off-1" size={18} variant="duo" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </motion.section>
            </motion.div>
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
               <UiIcon name="cloud-data-transfer" className="h-4 w-4" />
              Copy
            </button>
            <button
              onClick={handleShareToWhatsApp}
              disabled={!hasRoutineItems}
              className="builder-cta-primary flex h-12 items-center justify-center gap-2 text-xs font-black uppercase tracking-wide"
            >
               <UiIcon name="cloud-data-transfer" className="h-4 w-4" active />
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
              className="builder-onboarding-shell fixed bottom-[92px] left-0 right-0 z-[60] px-4"
              aria-label="Primeros pasos del builder"
              aria-modal="true"
              role="dialog"
            >
            <motion.div
              layout
              transition={{ layout: { duration: reduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] } }}
              className={`builder-onboarding builder-glass-shell mx-auto max-w-md overflow-hidden rounded-[1.75rem] p-3${onboardingStep === 0 ? ' builder-onboarding--identity' : ''}`}
            >
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <AnimatePresence mode="wait" initial={false} custom={reduceMotion ? 0 : onboardingDirection}>
                  <motion.div
                    key={`builder-onboarding-heading-${onboardingStep}`}
                    className="builder-onboarding__heading"
                    custom={reduceMotion ? 0 : onboardingDirection}
                    variants={BUILDER_ONBOARDING_STEP_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: reduceMotion ? 0.01 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="builder-onboarding__eyebrow">0{onboardingStep + 1} / 0{ONBOARDING_STEPS.length} · {ONBOARDING_STEPS[onboardingStep].title}</p>
                    <h2 className="text-lg font-black italic uppercase tracking-tight text-[#F1F0F4]">
                      {onboardingStep === 0 ? 'Elegí tu señal' : 'Calibra tu Builder'}
                    </h2>
                  </motion.div>
                </AnimatePresence>
                <button
                  type="button"
                  onClick={completeOnboarding}
                  className="builder-icon-button flex h-9 w-9 shrink-0 items-center justify-center text-[#6E6558] hover:bg-[#2A2520] hover:text-[#F1F0F4]"
                  aria-label="Cerrar guia inicial"
                >
                  <UiIcon name="cancel-2" className="h-5 w-5" variant="duo" />
                </button>
              </div>

              <AnimatePresence mode="popLayout" initial={false} custom={reduceMotion ? 0 : onboardingDirection}>
                <motion.div
                  key={`builder-onboarding-step-${onboardingStep}`}
                  className="builder-onboarding__step-content"
                  custom={reduceMotion ? 0 : onboardingDirection}
                  variants={BUILDER_ONBOARDING_STEP_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                {onboardingStep > 0 && <div className="relative -mx-3 mb-3 overflow-hidden">
                  <div className="builder-onboarding__hero relative h-48">
                    <motion.img
                      key={`${builderProfile}-${onboardingStep}`}
                      src={BUILDER_PROFILE_ASSETS[builderProfile][onboardingStep]}
                      initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.045 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.46, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: '50% 18%' }}
                      alt=""
                    />
                    <div className="builder-onboarding__hero-copy">
                      <span>0{onboardingStep + 1} / 0{ONBOARDING_STEPS.length}</span>
                      <strong>{ONBOARDING_STEPS[onboardingStep].title}</strong>
                    </div>
                  </div>
                </div>}
                {onboardingStep === 0 ? (
                  <div ref={builderProfileRailRef} className="builder-profile-grid" aria-label="Perfil visual">
                    {BUILDER_PROFILE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        data-builder-profile-option={option.value}
                        className={`builder-profile-choice ${builderProfile === option.value ? 'is-active' : ''}`}
                        aria-pressed={builderProfile === option.value}
                        onClick={(event) => {
                          setBuilderProfile(option.value);
                          event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }}
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
                    <p>{ONBOARDING_STEPS[onboardingStep].body}</p>
                  </div>
                )}
                </motion.div>
              </AnimatePresence>

              <div className="builder-onboarding__rail" aria-label={`Paso ${onboardingStep + 1} de ${ONBOARDING_STEPS.length}`}>
                {ONBOARDING_STEPS.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    className={onboardingStep === index ? 'is-active' : index < onboardingStep ? 'is-done' : ''}
                    onClick={() => goToOnboardingStep(index)}
                    aria-current={onboardingStep === index ? 'step' : undefined}
                    aria-label={`Ir al paso ${index + 1}: ${step.title}`}
                  />
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={completeOnboarding}
                  className="builder-cta-ghost fl-cut-cta fl-cut-cta--secondary px-3 py-3 text-[10px] font-black uppercase tracking-widest text-[#9CA0A6]"
                >
                  Saltar
                </button>
                <button
                  type="button"
                  onClick={advanceOnboarding}
                  className="builder-onboarding__next builder-cta-primary fl-cut-cta fl-cut-cta--primary px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                >
                  <span>{onboardingStep === ONBOARDING_STEPS.length - 1 ? 'Listo' : 'Siguiente'}</span>
                  {onboardingStep === ONBOARDING_STEPS.length - 1 ? <UiIcon name="validation-1" className="builder-onboarding__next-icon" size={17} variant="duo" /> : <ArrowRight className="builder-onboarding__next-icon" size={15} />}
                </button>
              </div>
            </motion.div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      <SabiasQueBanner
        profile={builderProfile}
      />

      {/* Mobile Nav (Vertical Right Rail Dock - Analytics Style) */}
      <div className="builder-footer-nav-wrapper">
        <button
          type="button"
          className={`builder-footer-nav-toggle${navVisible ? '' : ' builder-footer-nav-toggle--pinned'}`}
          onClick={() => setNavVisible((v) => !v)}
          aria-label={navVisible ? 'Ocultar navegación' : 'Mostrar navegación'}
        >
          <span className="builder-footer-nav-toggle-icon" />
        </button>
        <nav className={`builder-footer-nav${navVisible ? '' : ' builder-footer-nav--hidden'}`} role="navigation" aria-label="Navegación principal">
          {[
            { id: 'home' as TabType, label: 'Hoy', renderIcon: (active: boolean) => <UiIcon name="graph-pie" size={22} active={active} />, badge: null },
            { id: 'build' as TabType, label: 'Mi plan', renderIcon: (active: boolean) => <UiIcon name="rocket-launch-chart" size={22} active={active} />, badge: currentRoutine.exercises.length > 0 ? currentRoutine.exercises.length : null },
            { id: 'train' as TabType, label: 'Entrenar', renderIcon: (active: boolean) => <UiIcon name="on-off-1" size={22} active={active} />, badge: null },
            { id: 'oneRm' as TabType, label: '1RM', renderIcon: (active: boolean) => <UiIcon name="rocket-launch-chart" size={22} active={active} />, badge: null },
            { id: 'timer' as TabType, label: 'Timer', renderIcon: (active: boolean) => <UiIcon name="date-time-setting" size={22} active={active} />, badge: null },
            { id: 'food' as TabType, label: 'Meals', renderIcon: (active: boolean) => <UiIcon name="fuel_protein" size={22} active={active} variant="green" />, badge: mealCompositions.length > 0 ? mealCompositions.length : null },
            { id: 'settings' as const, label: 'Ajustes', renderIcon: (active: boolean) => <UiIcon name="ajustes" size={22} active={active} variant={active ? 'green' : 'rose'} />, badge: null },
          ].map((item) => {
            const isActive = activeTab === item.id;
            if (item.id === 'settings') {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setShowCustomize(true);
                  }}
                  className="builder-footer-nav-btn"
                  aria-label="Abrir ajustes del Builder"
                  aria-expanded={showCustomize}
                >
                  <span className="builder-footer-nav-btn-icon">{item.renderIcon(showCustomize)}</span>
                  <span className="builder-footer-nav-btn-label">{item.label}</span>
                </button>
              );
            }
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                }}
                className={`builder-footer-nav-btn${isActive ? ' is-active' : ''}`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="builder-footer-nav-btn-icon">
                  {item.renderIcon(isActive)}
                  {item.badge !== null && (
                    <span className="builder-footer-nav-btn-badge">{item.badge}</span>
                  )}
                </span>
                <span className="builder-footer-nav-btn-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

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
