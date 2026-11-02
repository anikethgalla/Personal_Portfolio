import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { Trophy, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ControlsHelp: React.FC = () => {
  const { discoveredZones } = useGame();

  const zones = [
    { id: 'hero', name: 'Hero Ramp' },
    { id: 'projects', name: 'Projects' },
    { id: 'skills', name: 'Skills Wall' },
    { id: 'contact', name: 'Garage' }
  ];

  const allDiscovered = zones.every(z => discoveredZones.has(z.id));

  useEffect(() => {
    if (allDiscovered) {
      try {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }
  }, [allDiscovered]);

  return (
    <div className="fixed bottom-4 left-4 z-30 pointer-events-none hidden md:flex flex-col gap-2.5 select-none">
      {/* Exploration Tracker Badge */}
      <div className="pointer-events-auto bg-[#ded7cb]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#c5b9a8] clay-shadow flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-black text-[#2b2622]">
          <Trophy className="w-3.5 h-3.5 text-[#ea580c]" />
          <span>Zones:</span>
        </div>
        <div className="flex items-center gap-2">
          {zones.map(z => {
            const isDone = discoveredZones.has(z.id);
            return (
              <span
                key={z.id}
                className={`text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${
                  isDone
                    ? 'bg-emerald-500/15 text-emerald-800'
                    : 'bg-[#cfc4b7] text-[#73665a]'
                }`}
              >
                {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                {z.name}
              </span>
            );
          })}
        </div>
      </div>

      {/* Desktop Driving Controls Keycap Hints */}
      <div className="pointer-events-auto bg-[#ded7cb]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#c5b9a8] clay-shadow flex items-center gap-3 text-xs text-[#524941] font-semibold">
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-[#f6f2ec] border border-[#cfc4b7] shadow-sm text-[11px] font-bold">W</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-[#f6f2ec] border border-[#cfc4b7] shadow-sm text-[11px] font-bold">A</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-[#f6f2ec] border border-[#cfc4b7] shadow-sm text-[11px] font-bold">S</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-[#f6f2ec] border border-[#cfc4b7] shadow-sm text-[11px] font-bold">D</kbd>
          <span className="ml-1 text-[11px]">Drive</span>
        </div>

        <span className="text-[#a89d8f]">•</span>

        <div className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 rounded bg-[#f6f2ec] border border-[#cfc4b7] shadow-sm text-[11px] font-bold">Space</kbd>
          <span className="ml-1 text-[11px]">Brake</span>
        </div>

        <span className="text-[#a89d8f]">•</span>

        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-[#f6f2ec] border border-[#cfc4b7] shadow-sm text-[11px] font-bold">R</kbd>
          <span className="ml-1 text-[11px]">Reset</span>
        </div>
      </div>

      {/* Mouse Camera Inspection Hints */}
      <div className="pointer-events-auto bg-[#ded7cb]/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-[#c5b9a8] clay-shadow flex items-center gap-2.5 text-xs text-[#524941] font-semibold">
        <span className="text-[12px]">🖱️</span>
        <span className="text-[11px]">
          <strong className="text-[#2b2622]">Left Drag:</strong> Orbit 360°
        </span>
        <span className="text-[#a89d8f]">•</span>
        <span className="text-[11px]">
          <strong className="text-[#2b2622]">Right Drag:</strong> Pan
        </span>
        <span className="text-[#a89d8f]">•</span>
        <span className="text-[11px]">
          <strong className="text-[#2b2622]">Scroll:</strong> Zoom
        </span>
      </div>
    </div>
  );
};

