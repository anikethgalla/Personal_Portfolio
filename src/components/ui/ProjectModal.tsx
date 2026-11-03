import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Terminal,
  CheckCircle2,
  Cpu,
  Globe,
  Film
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { projectsData } from '../../data/projectsData';
import confetti from 'canvas-confetti';

export const ProjectModal: React.FC = () => {
  const {
    activeProject,
    fpvProject,
    enterFpv,
    exitFpv,
    setIsRecruiterDrawerOpen,
    currentProjectIndex,
    setCurrentProjectIndex,
    nextProject,
    prevProject
  } = useGame();

  const [tick, setTick] = useState(0);

  // Pulse animation inside cinema monitor
  useEffect(() => {
    if (!fpvProject) return;
    const interval = setInterval(() => {
      setTick((t) => (t + 1) % 100);
    }, 450);
    return () => clearInterval(interval);
  }, [fpvProject]);

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

  const displayProject = fpvProject || projectsData[currentProjectIndex] || projectsData[0];

  return (
    <>
      {/* 1. Floating Prompt when parked in front of Drive-In Cinema (when NOT in FPV) */}
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

      {/* 2. Interactive In-World FPV Cockpit / Cinema Billboard View (Active ONLY in FPV Mode) */}
      {fpvProject && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between items-center p-4 sm:p-6 pointer-events-none bg-black/45 backdrop-blur-xs animate-in fade-in duration-300">
          {/* Top Navigation Bar */}
          <div className="w-full max-w-5xl flex justify-between items-center pointer-events-auto">
            {/* Exit FPV Button */}
            <button
              onClick={exitFpv}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#1e293b]/90 hover:bg-[#0f172a] text-white text-xs font-bold shadow-xl border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#ea580c]" />
              <span>← Exit FPV / Return to Car</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-gray-300 font-mono">Esc</kbd>
            </button>

            {/* Center Status Pill */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0f172a]/90 backdrop-blur-md border border-white/15 text-white text-xs font-bold shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-amber-400">
                DRIVE-IN CINEMA PROJECTOR // SLIDE {currentProjectIndex + 1} OF {projectsData.length}
              </span>
            </div>

            {/* Right Quick Links */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRecruiterDrawerOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Recruiter Dossier</span>
              </button>
            </div>
          </div>

          {/* Main Cinema Screen & Carousel Navigation */}
          <div className="w-full max-w-5xl my-auto pointer-events-auto flex items-center gap-3">
            {/* Left Nav Arrow Button */}
            <button
              onClick={prevProject}
              className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-90 text-slate-950 flex items-center justify-center font-black shadow-2xl transition-all border-2 border-white/30 cursor-pointer"
              title="Previous Project (Left Arrow)"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Central Project Cinema Card Display */}
            <div className="flex-1 bg-[#0a0f1d]/95 text-gray-100 rounded-3xl border-2 border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden flex flex-col max-h-[82vh]">
              {/* Monitor Header Bezel */}
              <div className="flex items-center justify-between px-5 py-3 bg-[#0f172a] border-b border-white/10 select-none">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="h-4 w-px bg-white/20 mx-1" />
                  <span className="font-mono text-xs text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#ea580c]" />
                    CINEMA_BROADCAST_FEED // {displayProject.category.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    PROJECT {currentProjectIndex + 1}/{projectsData.length}
                  </span>
                </div>
              </div>

              {/* Monitor Screen Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                {/* Project Title, Category & External Links */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#ea580c]/20 text-[#ea580c] border border-[#ea580c]/40 uppercase">
                        {displayProject.category}
                      </span>
                      <span className="text-xs text-amber-400 font-mono font-semibold">
                        ★ {displayProject.shortDesc}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {displayProject.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {displayProject.liveUrl && (
                      <a
                        href={displayProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Site</span>
                      </a>
                    )}
                    {displayProject.githubUrl && (
                      <a
                        href={displayProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/10"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Core Description */}
                <p className="text-sm text-gray-300 leading-relaxed bg-[#0f172a]/70 p-4 rounded-2xl border border-white/5">
                  {displayProject.fullDesc}
                </p>

                {/* Engineering Highlights / Metrics Grid */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#ea580c]" />
                    Key Architecture & Production Metrics
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {displayProject.metrics.map((metric: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-3 rounded-xl bg-[#0f172a]/90 border border-white/5 text-xs text-gray-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                    Technologies & Infrastructure
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {displayProject.tags.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl bg-white/10 text-xs font-semibold text-gray-200 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monitor Footer Bar with Pagination Dots */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0a0f1d] border-t border-white/10">
                {/* Pagination Dots */}
                <div className="flex items-center gap-2">
                  {projectsData.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setCurrentProjectIndex(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        currentProjectIndex === idx
                          ? 'w-8 bg-amber-400'
                          : 'w-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                      title={p.title}
                    />
                  ))}
                  <span className="text-xs text-gray-400 font-mono ml-2">
                    {currentProjectIndex + 1} / {projectsData.length}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={exitFpv}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Return to Car (Esc)
                  </button>
                  {displayProject.githubUrl && (
                    <a
                      href={displayProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>Inspect Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Nav Arrow Button */}
            <button
              onClick={nextProject}
              className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-90 text-slate-950 flex items-center justify-center font-black shadow-2xl transition-all border-2 border-white/30 cursor-pointer"
              title="Next Project (Right Arrow)"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Bottom spacing helper */}
          <div className="h-2" />
        </div>
      )}
    </>
  );
};
