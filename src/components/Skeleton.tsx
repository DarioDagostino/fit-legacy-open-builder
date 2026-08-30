import type { BuilderRouteTab } from '../lib/builderRoutes';

export type BuilderSkeletonScreen =
  | 'home'
  | 'catalog'
  | 'draft'
  | 'food'
  | 'build'
  | 'train'
  | 'oneRm'
  | 'timer'
  | 'calendar'
  | 'export'
  | 'settings';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text' | 'card';
  style?: React.CSSProperties;
}

export function Skeleton({ className = '', variant = 'rect', style }: SkeletonProps) {
  return (
    <span
      className={`builder-skeleton builder-skeleton--${variant} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
}

function SkeletonLine({ width = '100%', height = '10px' }: { width?: string; height?: string }) {
  return (
    <span
      className="builder-skeleton builder-skeleton--text screen-skeleton__line"
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

function HomeSkeleton() {
  return (
    <div className="builder-screen-skeleton__home" aria-hidden="true">
      {/* Top Brand & Greeting */}
      <div className="builder-skeleton-card p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <Skeleton variant="circle" className="w-12 h-12 shrink-0 !rounded-2xl" />
          <div className="flex flex-col gap-2 min-w-0 w-48">
            <SkeletonLine width="45%" height="9px" />
            <SkeletonLine width="80%" height="16px" />
          </div>
        </div>
        <Skeleton variant="rect" className="w-24 h-9 !rounded-xl" />
      </div>

      {/* Week Adherence Strip */}
      <div className="builder-skeleton-card p-4 flex items-center justify-between gap-2 overflow-hidden">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <SkeletonLine width="20px" height="8px" />
            <Skeleton variant="rect" className="w-8 h-10 !rounded-xl" />
          </div>
        ))}
      </div>

      {/* Main Today's Workout Hero */}
      <div className="builder-skeleton-card p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <SkeletonLine width="35%" height="10px" />
          <Skeleton variant="rect" className="w-16 h-6 !rounded-full" />
        </div>
        <SkeletonLine width="65%" height="24px" />
        <SkeletonLine width="90%" height="12px" />
        <div className="flex items-center gap-3 mt-2">
          <Skeleton variant="rect" className="w-24 h-7 !rounded-lg" />
          <Skeleton variant="rect" className="w-28 h-7 !rounded-lg" />
          <Skeleton variant="rect" className="w-20 h-7 !rounded-lg" />
        </div>
        <Skeleton variant="rect" className="w-full h-12 mt-2 !rounded-xl" />
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="builder-skeleton-card p-4 flex flex-col gap-2">
            <SkeletonLine width="50%" height="8px" />
            <SkeletonLine width="75%" height="20px" />
            <div className="flex items-end gap-1 h-6 mt-1">
              {Array.from({ length: 6 }, (_, bar) => (
                <span
                  key={bar}
                  className="builder-skeleton !rounded-sm flex-1"
                  style={{ height: `${30 + ((bar + index) % 4) * 20}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BuildDraftSkeleton() {
  return (
    <div className="builder-screen-skeleton__build" aria-hidden="true">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <SkeletonLine width="110px" height="9px" />
          <SkeletonLine width="190px" height="22px" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton variant="rect" className="w-28 h-10 !rounded-xl" />
          <Skeleton variant="rect" className="w-24 h-10 !rounded-xl" />
        </div>
      </div>

      {/* Exercises / Foods list cards */}
      <div className="flex flex-col gap-3 mt-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="builder-skeleton-card p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <Skeleton variant="rect" className="w-14 h-14 shrink-0 !rounded-xl" />
              <div className="flex flex-col gap-2 w-48">
                <SkeletonLine width="85%" height="15px" />
                <div className="flex items-center gap-2">
                  <Skeleton variant="rect" className="w-16 h-5 !rounded-md" />
                  <Skeleton variant="rect" className="w-14 h-5 !rounded-md" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton variant="rect" className="w-20 h-9 !rounded-lg" />
              <Skeleton variant="circle" className="w-8 h-8 shrink-0 !rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogSkeleton() {
  return (
    <div className="builder-screen-skeleton__catalog" aria-hidden="true">
      {/* Search and Filters */}
      <div className="flex flex-col gap-3">
        <Skeleton variant="rect" className="w-full h-12 !rounded-2xl" />
        <div className="flex items-center gap-2 overflow-hidden py-1">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} variant="rect" className="w-20 h-8 shrink-0 !rounded-full" />
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mt-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="builder-skeleton-card p-4 flex flex-col gap-3">
            <Skeleton variant="rect" className="w-full h-36 !rounded-xl" />
            <div className="flex flex-col gap-1.5">
              <SkeletonLine width="75%" height="16px" />
              <SkeletonLine width="45%" height="10px" />
            </div>
            <div className="flex items-center justify-between mt-auto pt-2">
              <Skeleton variant="rect" className="w-16 h-6 !rounded-md" />
              <Skeleton variant="rect" className="w-24 h-8 !rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FoodSkeleton() {
  return (
    <div className="builder-screen-skeleton__food" aria-hidden="true">
      {/* Date Switcher Header */}
      <div className="flex items-center justify-between gap-4 p-4 builder-skeleton-card">
        <Skeleton variant="circle" className="w-9 h-9 !rounded-xl" />
        <div className="flex flex-col items-center gap-1.5">
          <SkeletonLine width="120px" height="15px" />
          <SkeletonLine width="70px" height="9px" />
        </div>
        <Skeleton variant="circle" className="w-9 h-9 !rounded-xl" />
      </div>

      {/* Macro Breakdown Bar */}
      <div className="builder-skeleton-card p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <SkeletonLine width="90px" height="11px" />
          <SkeletonLine width="60px" height="13px" />
        </div>
        <Skeleton variant="rect" className="w-full h-3 !rounded-full" />
        <div className="grid grid-cols-3 gap-2 pt-1">
          <SkeletonLine width="70%" height="9px" />
          <SkeletonLine width="70%" height="9px" />
          <SkeletonLine width="70%" height="9px" />
        </div>
      </div>

      {/* Meal Slots (Desayuno, Almuerzo, Merienda, Cena) */}
      <div className="flex flex-col gap-3 mt-2">
        {['Desayuno', 'Almuerzo', 'Merienda', 'Cena'].map((meal) => (
          <div key={meal} className="builder-skeleton-card p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton variant="circle" className="w-7 h-7 !rounded-lg" />
                <SkeletonLine width="80px" height="14px" />
              </div>
              <Skeleton variant="rect" className="w-16 h-6 !rounded-md" />
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02]">
              <SkeletonLine width="55%" height="12px" />
              <SkeletonLine width="20%" height="12px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainSkeleton() {
  return (
    <div className="builder-screen-skeleton__train" aria-hidden="true">
      {/* Live Training Header with Elapsed Stopwatch */}
      <div className="builder-skeleton-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <SkeletonLine width="100px" height="9px" />
          <SkeletonLine width="180px" height="24px" />
          <SkeletonLine width="140px" height="12px" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton variant="circle" className="w-20 h-20 !rounded-full" />
          <Skeleton variant="rect" className="w-28 h-11 !rounded-xl" />
        </div>
      </div>

      {/* Active Exercise Set Tracker */}
      <div className="builder-skeleton-card p-5 flex flex-col gap-4 mt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="rect" className="w-12 h-12 !rounded-xl" />
            <div className="flex flex-col gap-1.5">
              <SkeletonLine width="140px" height="16px" />
              <SkeletonLine width="80px" height="10px" />
            </div>
          </div>
          <Skeleton variant="rect" className="w-20 h-7 !rounded-lg" />
        </div>

        {/* Set Rows */}
        <div className="flex flex-col gap-2 mt-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <SkeletonLine width="24px" height="12px" />
              <SkeletonLine width="60px" height="12px" />
              <SkeletonLine width="60px" height="12px" />
              <Skeleton variant="circle" className="w-8 h-8 !rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OneRmSkeleton() {
  return (
    <div className="builder-screen-skeleton__onerm" aria-hidden="true">
      {/* Formula Selector Tabs */}
      <div className="flex items-center justify-between gap-2 p-1.5 builder-skeleton-card !rounded-2xl">
        <Skeleton variant="rect" className="h-9 flex-1 !rounded-xl" />
        <Skeleton variant="rect" className="h-9 flex-1 !rounded-xl" />
        <Skeleton variant="rect" className="h-9 flex-1 !rounded-xl" />
      </div>

      {/* Inputs Duo */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="builder-skeleton-card p-4 flex flex-col gap-2">
          <SkeletonLine width="50%" height="9px" />
          <Skeleton variant="rect" className="w-full h-12 !rounded-xl" />
        </div>
        <div className="builder-skeleton-card p-4 flex flex-col gap-2">
          <SkeletonLine width="50%" height="9px" />
          <Skeleton variant="rect" className="w-full h-12 !rounded-xl" />
        </div>
      </div>

      {/* Big Circular 1RM Gauge */}
      <div className="builder-skeleton-card p-8 flex flex-col items-center justify-center gap-4 mt-3">
        <Skeleton variant="circle" className="w-44 h-44 !rounded-full" />
        <SkeletonLine width="160px" height="14px" />
      </div>

      {/* Percentages Breakdown List */}
      <div className="builder-skeleton-card p-4 flex flex-col gap-2.5 mt-3">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02]">
            <SkeletonLine width="40px" height="12px" />
            <SkeletonLine width="80px" height="12px" />
            <SkeletonLine width="50px" height="12px" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TimerSkeleton() {
  return (
    <div className="builder-screen-skeleton__timer" aria-hidden="true">
      {/* Dial Display */}
      <div className="builder-skeleton-card p-10 flex flex-col items-center justify-center gap-6">
        <Skeleton variant="circle" className="w-56 h-56 !rounded-full" />
        <div className="flex items-center gap-3">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} variant="rect" className="w-16 h-8 !rounded-lg" />
          ))}
        </div>
        <div className="flex items-center gap-4 mt-2">
          <Skeleton variant="rect" className="w-32 h-12 !rounded-xl" />
          <Skeleton variant="rect" className="w-32 h-12 !rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function CalendarSkeleton() {
  return (
    <div className="builder-screen-skeleton__calendar" aria-hidden="true">
      {/* Month Navigation */}
      <div className="builder-skeleton-card p-4 flex items-center justify-between">
        <Skeleton variant="circle" className="w-8 h-8 !rounded-lg" />
        <SkeletonLine width="140px" height="18px" />
        <Skeleton variant="circle" className="w-8 h-8 !rounded-lg" />
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-7 gap-2 mt-3">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="builder-skeleton-card p-3 min-h-[110px] flex flex-col items-center gap-2">
            <SkeletonLine width="16px" height="8px" />
            <SkeletonLine width="20px" height="14px" />
            <Skeleton variant="rect" className="w-full h-8 mt-auto !rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ExportSkeleton() {
  return (
    <div className="builder-screen-skeleton__export" aria-hidden="true">
      {/* Canvas Preview */}
      <div className="builder-skeleton-card p-6 flex flex-col items-center justify-center gap-4">
        <Skeleton variant="rect" className="w-full max-w-sm h-80 !rounded-2xl" />
        <div className="flex items-center gap-3 w-full max-w-sm">
          <Skeleton variant="rect" className="h-12 flex-1 !rounded-xl" />
          <Skeleton variant="rect" className="h-12 flex-1 !rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ScreenSkeleton({
  screen,
  direction = 1,
}: {
  screen: BuilderSkeletonScreen | BuilderRouteTab;
  direction?: 1 | -1;
}) {
  const renderScreen = () => {
    switch (screen) {
      case 'catalog':
        return <CatalogSkeleton />;
      case 'draft':
      case 'build':
        return <BuildDraftSkeleton />;
      case 'food':
        return <FoodSkeleton />;
      case 'train':
        return <TrainSkeleton />;
      case 'oneRm':
        return <OneRmSkeleton />;
      case 'timer':
        return <TimerSkeleton />;
      case 'calendar':
        return <CalendarSkeleton />;
      case 'export':
        return <ExportSkeleton />;
      case 'home':
      case 'settings':
      default:
        return <HomeSkeleton />;
    }
  };

  return (
    <div
      className={`builder-screen-skeleton builder-screen-skeleton--${screen} ${
        direction > 0 ? 'is-forward' : 'is-backward'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Cargando vista"
    >
      <span className="sr-only">Cargando vista de Builder…</span>
      <div className="builder-screen-skeleton__container">{renderScreen()}</div>
    </div>
  );
}
