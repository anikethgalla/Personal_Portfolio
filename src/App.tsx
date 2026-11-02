import React, { Suspense } from 'react';
import { GameProvider } from './context/GameContext';
import { Scene } from './components/canvas/Scene';
import { HeaderHUD } from './components/ui/HeaderHUD';
import { ControlsHelp } from './components/ui/ControlsHelp';
import { MobileControls } from './components/ui/MobileControls';
import { ProjectModal } from './components/ui/ProjectModal';
import { RecruiterDrawer } from './components/ui/RecruiterDrawer';
import { CarShowroom } from './components/ui/CarShowroom';

export const App: React.FC = () => {
  return (
    <GameProvider>
      <main
        tabIndex={0}
        onClick={() => window.focus()}
        className="relative w-screen h-screen overflow-hidden bg-[#ded6cb] font-['Plus_Jakarta_Sans',sans-serif] focus:outline-none"
      >
        {/* 3D Scene Layer with Suspense Loader */}
        <Suspense
          fallback={
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#ded6cb] text-[#2c2622]">
              <div className="w-12 h-12 rounded-full border-4 border-[#ea580c] border-t-transparent animate-spin mb-4" />
              <h2 className="text-xl font-black tracking-tight">ANIKETH GALLA</h2>
              <p className="text-xs text-[#786c62] font-semibold mt-1">
                Igniting 3D Physics World...
              </p>
            </div>
          }
        >
          <Scene />
        </Suspense>

        {/* UI Overlay Layers */}
        <HeaderHUD />
        <ControlsHelp />
        <MobileControls />
        <ProjectModal />
        <RecruiterDrawer />
        <CarShowroom />
      </main>
    </GameProvider>
  );
};

export default App;

