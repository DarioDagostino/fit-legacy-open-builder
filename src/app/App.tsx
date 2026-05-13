import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { lazy, Suspense, useEffect } from 'react';
import WorkoutBuilder from '../components/workout/WorkoutBuilder';
import { initGoogleAnalytics } from '@/lib/analytics/google';
const SharedRoutine = lazy(() => import('../components/workout/SharedRoutine'));
const SharedPostPage = lazy(() =>
  import('./community/SharedPostPage').then((module) => ({ default: module.SharedPostPage }))
);
const SharedRoutineViewer = lazy(() =>
  import('./components/routine/SharedRoutineViewer').then((module) => ({ default: module.SharedRoutineViewer }))
);
const PaymentResultPage = lazy(() =>
  import('./payment/PaymentResultPage').then((module) => ({ default: module.PaymentResultPage }))
);



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
      <Routes>
        {/* New Build Builder (Main Tool) */}
        <Route path="/" element={<WorkoutBuilder />} />
        <Route path="/build" element={<WorkoutBuilder />} />
        <Route path="/arsenal" element={<WorkoutBuilder />} />
        <Route
          path="/shared-routine"
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <SharedRoutine />
            </Suspense>
          }
        />
        
        {/* Mercado Pago payment result pages */}
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
        
        {/* Local Dev Redirect for Edge Function */}
        <Route path="/api/og" element={<OgRedirect />} />
        
        {/* Debug: Catch any unmatched route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function OgRedirect() {
  return <Navigate to={`/r/wir?${window.location.search.substring(1)}`} replace />;
}

function RouteLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0C0C0E] flex items-center justify-center text-[#F0EEF8]">
      <div className="w-8 h-8 border-4 border-[#E8873A] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
