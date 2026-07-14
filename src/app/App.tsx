import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AnimatePresence, motion } from 'motion/react';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import WorkoutBuilder from '../components/workout/WorkoutBuilder';
import { LoadingScreen } from '../components/LoadingScreen';
import { initGoogleAnalytics } from '@/lib/analytics/google';

const SharedPostPage = lazy(() =>
  import('./community/SharedPostPage').then((module) => ({ default: module.SharedPostPage }))
);
const SharedRoutineViewer = lazy(() =>
  import('./components/routine/SharedRoutineViewer').then((module) => ({ default: module.SharedRoutineViewer }))
);
const PaymentResultPage = lazy(() =>
  import('./payment/PaymentResultPage').then((module) => ({ default: module.PaymentResultPage }))
);

function shouldShowBootSplash(pathname: string) {
  return pathname === '/' || pathname === '/build' || pathname === '/arsenal';
}

export default function App() {
  const enableTelemetry = !import.meta.env.DEV;

  useEffect(() => {
    if (enableTelemetry) {
      initGoogleAnalytics();
    }

    import('@/lib/integrations/statsig')
      .then(({ initStatsig }) => initStatsig())
      .catch((error) => {
        console.warn('Statsig init failed:', error);
      });
  }, [enableTelemetry]);

  return (
    <BrowserRouter>
      {enableTelemetry ? <Analytics /> : null}
      {enableTelemetry ? <SpeedInsights /> : null}
      <Toaster position="top-center" richColors theme="dark" />
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const showBootSplash = shouldShowBootSplash(location.pathname);
  const [bootSplashVisible, setBootSplashVisible] = useState(() => showBootSplash);
  const [bootPath, setBootPath] = useState(() => (showBootSplash ? location.pathname : ''));

  useEffect(() => {
    if (shouldShowBootSplash(location.pathname)) {
      setBootPath(location.pathname);
      setBootSplashVisible(true);
    } else {
      setBootSplashVisible(false);
    }
  }, [location.pathname]);

  const handleLoadingDone = useCallback(() => {
    setBootSplashVisible(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {bootSplashVisible && showBootSplash ? (
          <motion.div key={`builder-loading-${bootPath}`} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <LoadingScreen onFinished={handleLoadingDone} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`builder-app-${location.pathname}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Routes>
            <Route path="/" element={<WorkoutBuilder />} />
            <Route path="/build" element={<WorkoutBuilder />} />
            <Route path="/arsenal" element={<WorkoutBuilder />} />
            <Route path="/shared-routine" element={<LegacySharedRoutineRedirect />} />

            <Route
              path="/payment/success"
              element={
                <Suspense fallback={<RouteLoadingFallback />}>
                  <PaymentResultPage status="success" />
                </Suspense>
              }
            />
            <Route
              path="/payment/failure"
              element={
                <Suspense fallback={<RouteLoadingFallback />}>
                  <PaymentResultPage status="failure" />
                </Suspense>
              }
            />
            <Route
              path="/payment/pending"
              element={
                <Suspense fallback={<RouteLoadingFallback />}>
                  <PaymentResultPage status="pending" />
                </Suspense>
              }
            />

            <Route
              path="/community/post/:postId"
              element={
                <Suspense fallback={<RouteLoadingFallback />}>
                  <SharedPostPage />
                </Suspense>
              }
            />
            <Route
              path="/r/:slug"
              element={
                <Suspense fallback={<RouteLoadingFallback />}>
                  <SharedRoutineViewer />
                </Suspense>
              }
            />

            <Route path="/api/og" element={<OgRedirect />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function OgRedirect() {
  return <Navigate to={`/r/wir?${window.location.search.substring(1)}`} replace />;
}

function LegacySharedRoutineRedirect() {
  const location = useLocation();
  return <Navigate to={`/r/wir${location.search}`} replace />;
}

function RouteLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0C0C0E] flex items-center justify-center text-[#F0EEF8]">
      <div className="w-8 h-8 border-4 border-[#E8873A] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
