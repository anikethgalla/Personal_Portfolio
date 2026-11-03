import React, { createContext, useContext, useState } from 'react';
import { Project, projectsData } from '../data/projectsData';
import { ExperienceItem, experienceData } from '../data/experienceData';
import { soundManager } from '../audio/soundManager';
import { VehicleId, VEHICLES_DATA } from '../data/vehiclesData';

export type ZoneType = 'hero' | 'projects' | 'skills' | 'contact' | null;

interface GameContextType {
  activeZone: ZoneType;
  setActiveZone: (zone: ZoneType) => void;
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  currentProjectIndex: number;
  setCurrentProjectIndex: (index: number) => void;
  nextProject: () => void;
  prevProject: () => void;
  fpvProject: Project | null;
  enterFpv: (project: Project) => void;
  exitFpv: () => void;
  // Experience & Societies State
  activeExperience: ExperienceItem | null;
  setActiveExperience: (exp: ExperienceItem | null) => void;
  currentExperienceIndex: number;
  setCurrentExperienceIndex: (index: number) => void;
  nextExperience: () => void;
  prevExperience: () => void;
  fpvExperience: ExperienceItem | null;
  enterExperienceFpv: (exp: ExperienceItem) => void;
  exitExperienceFpv: () => void;
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
  // Vehicle Selection State
  selectedVehicleId: VehicleId;
  selectedVehicleColor: string;
  isCarSelectOpen: boolean;
  openCarSelect: () => void;
  closeCarSelect: () => void;
  selectVehicle: (id: VehicleId, color?: string) => void;
  setVehicleColor: (color: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeZone, setActiveZone] = useState<ZoneType>('hero');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const [fpvProject, setFpvProject] = useState<Project | null>(null);

  const nextProject = () => {
    const nextIdx = (currentProjectIndex + 1) % projectsData.length;
    setCurrentProjectIndex(nextIdx);
    const p = projectsData[nextIdx];
    setActiveProject(p);
    if (fpvProject) {
      setFpvProject(p);
    }
    soundManager.playChime();
  };

  const prevProject = () => {
    const prevIdx = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
    setCurrentProjectIndex(prevIdx);
    const p = projectsData[prevIdx];
    setActiveProject(p);
    if (fpvProject) {
      setFpvProject(p);
    }
    soundManager.playChime();
  };

  // Experience & Societies State
  const [activeExperience, setActiveExperience] = useState<ExperienceItem | null>(null);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState<number>(0);
  const [fpvExperience, setFpvExperience] = useState<ExperienceItem | null>(null);

  const nextExperience = () => {
    const nextIdx = (currentExperienceIndex + 1) % experienceData.length;
    setCurrentExperienceIndex(nextIdx);
    const exp = experienceData[nextIdx];
    setActiveExperience(exp);
    if (fpvExperience) {
      setFpvExperience(exp);
    }
    soundManager.playChime();
  };

  const prevExperience = () => {
    const prevIdx = (currentExperienceIndex - 1 + experienceData.length) % experienceData.length;
    setCurrentExperienceIndex(prevIdx);
    const exp = experienceData[prevIdx];
    setActiveExperience(exp);
    if (fpvExperience) {
      setFpvExperience(exp);
    }
    soundManager.playChime();
  };

  const enterExperienceFpv = (exp: ExperienceItem) => {
    setFpvProject(null);
    setFpvExperience(exp);
    soundManager.playChime();
  };

  const exitExperienceFpv = () => {
    setFpvExperience(null);
    soundManager.playChime();
  };
  const [isRecruiterDrawerOpen, setIsRecruiterDrawerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => soundManager.getMuted());
  const [teleportTarget, setTeleportTarget] = useState<[number, number, number] | null>(null);
  const [touchControls, setTouchControls] = useState({ forward: 0, turn: 0, brake: false });
  const [resetVehicleTrigger, setResetVehicleTrigger] = useState(0);
  const [resetSkillsTrigger, setResetSkillsTrigger] = useState(0);
  const [discoveredZones, setDiscoveredZones] = useState<Set<string>>(new Set(['hero']));
  const [selectedVehicleId, setSelectedVehicleId] = useState<VehicleId>('pickup');
  const [selectedVehicleColor, setSelectedVehicleColor] = useState<string>(VEHICLES_DATA.pickup.defaultColor);
  const [isCarSelectOpen, setIsCarSelectOpen] = useState<boolean>(true);

  const openCarSelect = () => {
    setIsCarSelectOpen(true);
    soundManager.playChime();
  };

  const closeCarSelect = () => {
    setIsCarSelectOpen(false);
    soundManager.playChime();
  };

  const selectVehicle = (id: VehicleId, color?: string) => {
    setSelectedVehicleId(id);
    setSelectedVehicleColor(color || VEHICLES_DATA[id].defaultColor);
    soundManager.playChime();
  };

  const setVehicleColor = (color: string) => {
    setSelectedVehicleColor(color);
  };

  const enterFpv = (project: Project) => {
    setFpvExperience(null);
    setFpvProject(project);
    soundManager.playChime();
  };

  const exitFpv = () => {
    setFpvProject(null);
    soundManager.playChime();
  };

  const toggleMute = () => {
    const next = soundManager.toggleMute();
    setIsMuted(next);
  };

  const teleportTo = (coords: [number, number, number]) => {
    if (fpvProject) {
      setFpvProject(null);
    }
    if (fpvExperience) {
      setFpvExperience(null);
    }
    setTeleportTarget(coords);
  };

  const clearTeleport = () => {
    setTeleportTarget(null);
  };

  const triggerResetVehicle = () => {
    if (fpvProject) {
      setFpvProject(null);
    }
    if (fpvExperience) {
      setFpvExperience(null);
    }
    setResetVehicleTrigger((c) => c + 1);
  };

  const triggerResetSkills = () => {
    setResetSkillsTrigger((c) => c + 1);
    soundManager.playChime();
  };

  const markZoneDiscovered = (zone: string) => {
    setDiscoveredZones((prev) => {
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
        currentProjectIndex,
        setCurrentProjectIndex,
        nextProject,
        prevProject,
        fpvProject,
        enterFpv,
        exitFpv,
        activeExperience,
        setActiveExperience,
        currentExperienceIndex,
        setCurrentExperienceIndex,
        nextExperience,
        prevExperience,
        fpvExperience,
        enterExperienceFpv,
        exitExperienceFpv,
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
        markZoneDiscovered,
        selectedVehicleId,
        selectedVehicleColor,
        isCarSelectOpen,
        openCarSelect,
        closeCarSelect,
        selectVehicle,
        setVehicleColor
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
