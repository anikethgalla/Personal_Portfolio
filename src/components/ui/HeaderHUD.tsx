import React from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Briefcase,
  Compass,
  Hammer,
  Car
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { profileData } from '../../data/profileData';

export const HeaderHUD: React.FC = () => {
  const {
    isMuted,
    toggleMute,
    teleportTo,
    triggerResetVehicle,
    triggerResetSkills,
    setIsRecruiterDrawerOpen,
    discoveredZones,
    openCarSelect
  } = useGame();

  const totalZones = 4;
  const progressPercent = (discoveredZones.size / totalZones) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4 pointer-events-none flex justify-between items-start gap-4">
      {/* Brand & Headline */}
      <div className="pointer-events-auto flex flex-col bg-[#ded7cb]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#c5b9a8] clay-shadow">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="font-extrabold text-base tracking-tight text-[#2b2622]">
            {profileData.name}
          </h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#f97316]/15 text-[#ea580c] font-semibold">
            3D Playground
          </span>
        </div>
        <p className="text-xs text-[#6e6359] font-medium hidden sm:block">
          Full Stack Developer
        </p>
      </div>

      {/* Center: Quick Teleport Navigation */}
      <nav className="pointer-events-auto hidden md:flex items-center gap-1.5 bg-[#ded7cb]/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#c5b9a8] clay-shadow">
        <button
          onClick={() => teleportTo([0, 1.0, 14])}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl text-[#3d3630] hover:bg-[#c9bfae] transition-colors flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5 text-[#ea580c]" />
          Spawn
        </button>
        <button
          onClick={() => teleportTo([23, 1.2, 0])}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl text-[#3d3630] hover:bg-[#c9bfae] transition-colors flex items-center gap-1.5"
        >
          <Briefcase className="w-3.5 h-3.5 text-[#ea580c]" />
          Projects
        </button>
        <button
          onClick={() => teleportTo([-20, 1.2, -4])}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl text-[#3d3630] hover:bg-[#c9bfae] transition-colors flex items-center gap-1.5"
        >
          <Hammer className="w-3.5 h-3.5 text-[#ea580c]" />
          Skills
        </button>
        <button
          onClick={() => teleportTo([0, 1.2, 28])}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl text-[#3d3630] hover:bg-[#c9bfae] transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
          Contact
        </button>
      </nav>

      {/* Right: Controls & Recruiter Mode */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Choose Vehicle / Garage */}
        <button
          onClick={openCarSelect}
          title="Vehicle Garage (Choose car & customize paint)"
          className="flex items-center gap-1.5 bg-[#ded7cb]/90 hover:bg-[#c9bfae] backdrop-blur-md text-[#ea580c] text-xs font-bold px-3 py-2 rounded-xl border border-orange-500/30 clay-shadow transition-colors"
        >
          <Car className="w-3.5 h-3.5 text-[#ea580c]" />
          <span>Garage</span>
        </button>

        {/* Rebuild Skills Wall */}
        <button
          onClick={triggerResetSkills}
          title="Rebuild Knockable Skills Wall"
          className="hidden sm:flex items-center gap-1.5 bg-[#ded7cb]/90 hover:bg-[#c9bfae] backdrop-blur-md text-[#3d3630] text-xs font-semibold px-3 py-2 rounded-xl border border-[#c5b9a8] clay-shadow transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#ea580c]" />
          <span>Rebuild Wall</span>
        </button>

        {/* Reset Car Flip */}
        <button
          onClick={triggerResetVehicle}
          title="Reset Car Position (or press R)"
          className="flex items-center gap-1.5 bg-[#ded7cb]/90 hover:bg-[#c9bfae] backdrop-blur-md text-[#3d3630] text-xs font-semibold px-3 py-2 rounded-xl border border-[#c5b9a8] clay-shadow transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Car</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className="bg-[#ded7cb]/90 hover:bg-[#c9bfae] backdrop-blur-md text-[#3d3630] p-2 rounded-xl border border-[#c5b9a8] clay-shadow transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#8a7d71]" /> : <Volume2 className="w-4 h-4 text-[#ea580c]" />}
        </button>

        {/* Primary: 2D Recruiter View */}
        <button
          onClick={() => setIsRecruiterDrawerOpen(true)}
          className="flex items-center gap-1.5 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md transition-transform active:scale-95"
        >
          <Briefcase className="w-4 h-4" />
          <span>2D Recruiter View</span>
        </button>
      </div>
    </header>
  );
};

