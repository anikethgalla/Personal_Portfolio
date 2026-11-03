import React, { useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { experienceData } from '../../data/experienceData';
import confetti from 'canvas-confetti';

export const ExperienceModal: React.FC = () => {
  const {
    activeExperience,
    fpvExperience,
    enterExperienceFpv,
    exitExperienceFpv,
    currentExperienceIndex,
    nextExperience,
    prevExperience
  } = useGame();

  const handleEnterFpv = () => {
    const target = activeExperience || experienceData[currentExperienceIndex] || experienceData[0];
    enterExperienceFpv(target);
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

  // Keyboard navigation: Left/Right arrows cycle experience, E enters, Esc exits
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if ((e.key === 'KeyE' || e.key === 'e') && activeExperience && !fpvExperience) {
        handleEnterFpv();
      }
      if (e.key === 'Escape' && fpvExperience) {
        e.preventDefault();
        e.stopPropagation();
        exitExperienceFpv();
      }
      if (fpvExperience) {
        if (e.key === 'ArrowLeft' || e.key === 'KeyA') {
          prevExperience();
        } else if (e.key === 'ArrowRight' || e.key === 'KeyD') {
          nextExperience();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeExperience, fpvExperience, prevExperience, nextExperience]);

  return (
    <>
      {/* 1. Floating Prompt when parked in front of Diner (when NOT in FPV) */}
      {activeExperience && !fpvExperience && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={handleEnterFpv}
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-2xl border-2 border-white/20 animate-bounce active:scale-95 transition-transform cursor-pointer"
          >
            <Briefcase className="w-5 h-5 text-white" />
            <span>★ PARKED AT EXPERIENCE DINER — CLICK FOR FPV LOUNGE</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-black/25 text-xs font-mono font-semibold">
              PRESS E
            </span>
          </button>
        </div>
      )}
    </>
  );
};
