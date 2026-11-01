import React, { useEffect, useState } from 'react';
import { X, ExternalLink, CheckCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import confetti from 'canvas-confetti';

export const ProjectModal: React.FC = () => {
  const { activeProject, setActiveProject } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  // When activeProject changes, trigger a small celebratory confetti burst if user opened it
  const handleOpen = () => {
    setIsOpen(true);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Ignore if confetti fails
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'KeyE' || e.key === 'e') {
        if (activeProject && !isOpen) {
          handleOpen();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, isOpen]);

  return (
    <>
      {/* Floating Prompt when parked inside a project trigger ring */}
      {activeProject && !isOpen && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={handleOpen}
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm shadow-xl border-2 border-white/20 animate-bounce active:scale-95 transition-transform"
          >
            <span>★ PARKED AT {activeProject.title.toUpperCase()}</span>
            <span className="px-2 py-0.5 rounded-lg bg-black/20 text-xs font-semibold">
              PRESS E OR CLICK
            </span>
          </button>
        </div>
      )}

      {/* Full Modal Dialog */}
      {isOpen && activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-xl bg-[#f6f2ec] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#d8cfc3] z-10 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeProject.accentColor }}
                  />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#73665a]">
                    {activeProject.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#221d1a]">
                  {activeProject.title}
                </h3>
                <p className="text-xs font-bold text-[#ea580c] mt-0.5">
                  {activeProject.shortDesc}
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-[#ded5ca] hover:bg-[#cfc4b7] text-[#4a4036] transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="bg-[#ece5dc] p-4 rounded-2xl border border-[#d8cdbf]">
              <p className="text-xs sm:text-sm text-[#453d36] leading-relaxed">
                {activeProject.fullDesc}
              </p>
            </div>

            {/* Key Metrics / Highlights */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#8c7b6d]">
                Engineering Highlights & Capabilities
              </h4>
              <div className="space-y-1.5">
                {activeProject.metrics.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#3b322a] font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Tags */}
            <div className="space-y-2 pt-2 border-t border-[#e2d8cc]">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#8c7b6d]">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-3 py-1 rounded-xl bg-[#ded5ca] text-[#3d332a]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-[#e2d8cc] flex items-center justify-between gap-3">
              <span className="text-xs text-[#786c62] font-medium">
                Part of Aniketh Galla's Systems Portfolio
              </span>

              <div className="flex items-center gap-2">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#24292e] hover:bg-black text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#ded5ca] hover:bg-[#d0c6b9] text-[#2c2622] text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

