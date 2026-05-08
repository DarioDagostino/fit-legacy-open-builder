import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CookieBanner } from '@/app/components/shared/CookieBanner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { PaymentResultPage } from '@/app/payment/PaymentResultPage';
import { useEffect } from 'react';
import WorkoutBuilder from '../components/workout/WorkoutBuilder';
import SharedRoutine from '../components/workout/SharedRoutine';
import { SharedPostPage } from './community/SharedPostPage';

import { initStatsig } from '@/lib/integrations/statsig';
import { AiMentorChat } from '@/app/components/integrations/AiMentorChat';
import { SharedRoutineViewer } from '@/app/components/routine/SharedRoutineViewer';



export default function App() {
  useEffect(() => {
    initStatsig(); 
  }, []);

  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <Toaster position="top-center" richColors theme="dark" />
      <Routes>
        {/* New Arsenal Builder (Main Tool) */}
        <Route path="/" element={<WorkoutBuilder />} />
        <Route path="/arsenal" element={<WorkoutBuilder />} />
        <Route path="/shared-routine" element={<SharedRoutine />} />
        
        {/* Mercado Pago payment result pages */}
        <Route path="/payment/success" element={<PaymentResultPage status="success" />} />
        <Route path="/payment/failure" element={<PaymentResultPage status="failure" />} />
        <Route path="/payment/pending" element={<PaymentResultPage status="pending" />} />
        
        <Route path="/community/post/:postId" element={<SharedPostPage />} />
        <Route path="/r/:slug" element={<SharedRoutineViewer />} />
        
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
