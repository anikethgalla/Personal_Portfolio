import React, { useEffect } from 'react';
import { ArrowLeft, Camera, ExternalLink, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import confetti from 'canvas-confetti';

export const ProjectModal: React.FC = () => {
  const { activeProject, fpvProject, enterFpv, exitFpv, setIsRecruiterDrawerOpen } = useGame();

  const handleEnterFpv = () => {
    if (activeProject) {
      enterFpv(activeProject);
      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if ((e.key === 'KeyE' || e.key === 'e') && activeProject && !fpvProject) {
        handleEnterFpv();
      }
      if (e.key === 'Escape' && fpvProject) {
        exitFpv();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, fpvProject]);

  return (
    <>
      {/* 1. Floating Prompt when parked in front of any building bay (when NOT in FPV) */}
      {activeProject && !fpvProject && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={handleEnterFpv}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm shadow-2xl border-2 border-white/20 animate-bounce active:scale-95 transition-transform"
          >
            <Camera className="w-4 h-4 text-white" />
            <span>★ PARKED AT {activeProject.title.toUpperCase()} — CLICK FOR FPV SCREEN</span>
            <span className="px-2 py-0.5 rounded-lg bg-black/25 text-xs font-semibold">
              PRESS E
            </span>
          </button>
        </div>
      )}

      {/* 2. Sleek Floating FPV Navigation Bar (Active ONLY in FPV Mode) */}
      {fpvProject && (
        <div className="fixed top-20 inset-x-0 z-40 flex justify-between items-center px-6 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Left: Exit FPV Button */}
          <button
            onClick={exitFpv}
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#1e293b]/90 hover:bg-[#0f172a] text-white text-xs font-bold shadow-xl border border-white/10 backdrop-blur-md transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#ea580c]" />
            <span>← Exit FPV / Return to Car</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-gray-300">Esc</kbd>
          </button>

          {/* Center: Live Station Status */}
          <div className="pointer-events-auto hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0f172a]/85 backdrop-blur-md border border-white/10 text-white text-xs font-bold shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>FPV INTERACTION MODE // {fpvProject.title.toUpperCase()}</span>
          </div>

          {/* Right: Quick Dossier Slideout Link */}
          <div className="pointer-events-auto flex items-center gap-2">
            {fpvProject.githubUrl && (
              <a
                href={fpvProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/10 transition-colors shadow-lg"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => setIsRecruiterDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-lg transition-transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Dossier</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
