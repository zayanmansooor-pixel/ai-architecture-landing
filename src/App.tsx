import { lazy, Suspense } from 'react';
import HeroSection from '@/sections/HeroSection';
import TimelineSection from '@/sections/TimelineSection';
import WorkflowSection from '@/sections/WorkflowSection';
import GenerationsSection from '@/sections/GenerationsSection';

const SceneCanvas = lazy(() => import('@/components/SceneCanvas'));

function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-slate-950">
      <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* 3D Background Canvas */}
      <Suspense fallback={<LoadingFallback />}>
        <SceneCanvas />
      </Suspense>

      {/* Scrollable Content */}
      <main className="relative z-10">
        <HeroSection />
        <TimelineSection />
        <WorkflowSection />
        <GenerationsSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            The Architecture of Machine Mind
          </p>
          <p className="text-slate-600 text-xs">
            An interactive exploration of AI evolution
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
