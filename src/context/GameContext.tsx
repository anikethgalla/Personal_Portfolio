import React, { createContext, useContext, useState, useRef } from 'react';
import { Project, projectsData } from '../data/projectsData';
import { soundManager } from '../audio/soundManager';

export type ZoneType = 'hero' | 'projects' | 'skills' | 'contact' | null;

interface GameContextType {
  activeZone: ZoneType;
  setActiveZone: (zone: ZoneType) => void;
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  isRecruiterDrawerOpen: boolean;
  setIsRecruiterDrawerOpen: (open: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  teleportTarget: [number, number, number] | null;
  teleportTo: (coords: [number, number, number]) => void;
  clearTeleport: () => void;
  touchControls: { forward: number; turn: number; brake: boolean };
  setTouchControls: React.Dispatch<React.SetStateAction<{ forward: number; turn: number; brake: boolean }>>;
  resetVehicleTrigger: number;
  triggerResetVehicle: () => void;
  resetSkillsTrigger: number;
  triggerResetSkills: () => void;
  discoveredZones: Set<string>;
  markZoneDiscovered: (zone: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeZone, setActiveZone] = useState<ZoneType>('hero');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isRecruiterDrawerOpen, setIsRecruiterDrawerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => soundManager.getMuted());
  const [teleportTarget, setTeleportTarget] = useState<[number, number, number] | null>(null);
  const [touchControls, setTouchControls] = useState({ forward: 0, turn: 0, brake: false });
  const [resetVehicleTrigger, setResetVehicleTrigger] = useState(0);
  const [resetSkillsTrigger, setResetSkillsTrigger] = useState(0);
  const [discoveredZones, setDiscoveredZones] = useState<Set<string>>(new Set(['hero']));

  const toggleMute = () => {
    const next = soundManager.toggleMute();
    setIsMuted(next);
  };

  const teleportTo = (coords: [number, number, number]) => {
    setTeleportTarget(coords);
  };

  const clearTeleport = () => {
    setTeleportTarget(null);
  };

  const triggerResetVehicle = () => {
    setResetVehicleTrigger(c => c + 1);
  };

  const triggerResetSkills = () => {
    setResetSkillsTrigger(c => c + 1);
    soundManager.playChime();
  };

  const markZoneDiscovered = (zone: string) => {
    setDiscoveredZones(prev => {
      if (prev.has(zone)) return prev;
      const next = new Set(prev);
      next.add(zone);
      soundManager.playChime();
      return next;
    });
  };

  return (
    <GameContext.Provider
      value={{
        activeZone,
        setActiveZone,
        activeProject,
        setActiveProject,
        isRecruiterDrawerOpen,
        setIsRecruiterDrawerOpen,
        isMuted,
        toggleMute,
        teleportTarget,
        teleportTo,
        clearTeleport,
        touchControls,
        setTouchControls,
        resetVehicleTrigger,
        triggerResetVehicle,
        resetSkillsTrigger,
        triggerResetSkills,
        discoveredZones,
        markZoneDiscovered
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
