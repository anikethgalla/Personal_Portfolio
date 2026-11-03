import React, { useEffect } from 'react';
import { Film } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { projectsData } from '../../data/projectsData';
import confetti from 'canvas-confetti';

export const ProjectModal: React.FC = () => {
  const {
    activeProject,
    fpvProject,
    enterFpv,
    exitFpv,
    currentProjectIndex,
    nextProject,
    prevProject
  } = useGame();

  const handleEnterFpv = () => {
    const target = activeProject || projectsData[currentProjectIndex] || projectsData[0];
    enterFpv(target);
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }
  };

  // Keyboard navigation: Left/Right arrows cycle projects, E enters, Esc exits
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if ((e.key === 'KeyE' || e.key === 'e') && activeProject && !fpvProject) {
        handleEnterFpv();
      }
      if (e.key === 'Escape' && fpvProject) {
        e.preventDefault();
        e.stopPropagation();
        exitFpv();
      }
      if (fpvProject) {
        if (e.key === 'ArrowLeft' || e.key === 'KeyA') {
          prevProject();
        } else if (e.key === 'ArrowRight' || e.key === 'KeyD') {
          nextProject();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, fpvProject, prevProject, nextProject]);

  return (
    <>
      {/* Floating Prompt when parked in front of Drive-In Cinema (when NOT in FPV) */}
      {activeProject && !fpvProject && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={handleEnterFpv}
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm shadow-2xl border-2 border-white/20 animate-bounce active:scale-95 transition-transform cursor-pointer"
          >
            <Film className="w-5 h-5 text-white" />
            <span>★ PARKED AT DRIVE-IN THEATER — CLICK FOR FPV SCREEN</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-black/25 text-xs font-mono font-semibold">
              PRESS E
            </span>
          </button>
        </div>
      )}
    </>
  );
};
