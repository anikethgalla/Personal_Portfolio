import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import {
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  Calendar,
  MapPin,
  Film,
  Briefcase
} from 'lucide-react';
import { projectsData } from '../../../data/projectsData';
import { experienceData } from '../../../data/experienceData';
import { useGame } from '../../../context/GameContext';

interface ProjectsZoneProps {
  vehiclePosition: THREE.Vector3 | null;
}

export const ProjectsZone: React.FC<ProjectsZoneProps> = ({ vehiclePosition }) => {
  const {
    setActiveProject,
    activeProject,
    markZoneDiscovered,
    currentProjectIndex,
    setCurrentProjectIndex,
    nextProject,
    prevProject,
    enterFpv,
    exitFpv,
    fpvProject,
    activeExperience,
    setActiveExperience,
    currentExperienceIndex,
    setCurrentExperienceIndex,
    nextExperience,
    prevExperience,
    enterExperienceFpv,
    exitExperienceFpv,
    fpvExperience
  } = useGame();

  const driveInBayPos = new THREE.Vector3(20, 0, -16);
  const dinerBayPos = new THREE.Vector3(20, 0, 16);

  const isParkedAtCinema = vehiclePosition ? driveInBayPos.distanceTo(vehiclePosition) < 5.2 : false;
  const isParkedAtDiner = vehiclePosition ? dinerBayPos.distanceTo(vehiclePosition) < 5.2 : false;

  const currentProject = projectsData[currentProjectIndex] || projectsData[0];
  const currentExp = experienceData[currentExperienceIndex] || experienceData[0];

  const hasAutoEnteredCinema = React.useRef(false);
  const hasAutoEnteredDiner = React.useRef(false);

  useFrame(() => {
    if (!vehiclePosition) return;

    // 1. Cinema Bay Detection
    const distCinema = driveInBayPos.distanceTo(vehiclePosition);
    if (distCinema < 5.2) {
      if (activeProject !== currentProject) {
        setActiveProject(currentProject);
        markZoneDiscovered('projects');
      }
      if (!hasAutoEnteredCinema.current) {
        hasAutoEnteredCinema.current = true;
        if (!fpvProject) {
          enterFpv(currentProject);
        }
      }
    } else if (distCinema > 7.0) {
      hasAutoEnteredCinema.current = false;
      if (activeProject) {
        setActiveProject(null);
      }
      if (fpvProject) {
        exitFpv();
      }
    }

    // 2. Diner Bay Detection (Experience & Societies)
    const distDiner = dinerBayPos.distanceTo(vehiclePosition);
    if (distDiner < 5.2) {
      if (activeExperience !== currentExp) {
        setActiveExperience(currentExp);
        markZoneDiscovered('projects');
      }
      if (!hasAutoEnteredDiner.current) {
        hasAutoEnteredDiner.current = true;
        if (!fpvExperience) {
          enterExperienceFpv(currentExp);
        }
      }
    } else if (distDiner > 7.0) {
      hasAutoEnteredDiner.current = false;
      if (activeExperience) {
        setActiveExperience(null);
      }
      if (fpvExperience) {
        exitExperienceFpv();
      }
    }
  });

  return (
    <group>
      {/* Zone Title Sign */}
      <group position={[25, 6.8, 0]}>
        <Text
          fontSize={1.4}
          fontWeight={800}
          color="#332d29"
          anchorX="center"
          anchorY="middle"
        >
          PROJECTS STRIP
        </Text>
        <Text
          position={[0, -0.75, 0]}
          fontSize={0.42}
          fontWeight={600}
          color="#786c62"
          anchorX="center"
          anchorY="middle"
        >
          DRIVE-IN: ALL PROJECTS • DINER: EXPERIENCE & SOCIETIES
        </Text>
      </group>

      {/* ======================================================== */}
      {/* STRUCTURE 1: THE DRIVE-IN CINEMA SCREEN (ALL PROJECTS)   */}
      {/* ======================================================== */}
      <group position={[28, 0, -16]}>
        {/* Drive-in Parking Bay at [20, 0, -16] (relative: [-8, 0, 0]) */}
        <group position={[-8, 0.035, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 36]} />
            <meshBasicMaterial
              color={isParkedAtCinema ? '#f59e0b' : '#cfc5b5'}
              transparent
              opacity={isParkedAtCinema ? 0.95 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 4.6]} />
            <meshBasicMaterial
              color={isParkedAtCinema ? '#f59e0b' : '#ded7cb'}
              transparent
              opacity={isParkedAtCinema ? 0.18 : 0.05}
            />
          </mesh>
          <Text
            position={[0, 0.01, 1.8]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.24}
            fontWeight={700}
            color="#786c62"
            anchorX="center"
            anchorY="middle"
          >
            {isParkedAtCinema ? '★ PARKED AT DRIVE-IN THEATER ★' : 'DRIVE-IN CINEMA BAY'}
          </Text>

          {/* Speaker Posts Left & Right */}
          <group position={[-1.7, 0, -1.2]}>
            <mesh position={[0, 0.6, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.05, 1.2, 8]} />
              <meshStandardMaterial color="#475569" roughness={0.7} />
            </mesh>
            <mesh position={[0, 1.25, 0]} castShadow>
              <boxGeometry args={[0.22, 0.28, 0.16]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.4} />
            </mesh>
          </group>

          <group position={[1.7, 0, -1.2]}>
            <mesh position={[0, 0.6, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.05, 1.2, 8]} />
              <meshStandardMaterial color="#475569" roughness={0.7} />
            </mesh>
            <mesh position={[0, 1.25, 0]} castShadow>
              <boxGeometry args={[0.22, 0.28, 0.16]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.4} />
            </mesh>
          </group>
        </group>

        {/* Billboard Screen Rigid Body (Fixed) */}
        <RigidBody type="fixed" friction={0.8} position={[0, 0, 0]}>
          {/* Main Outer Billboard Frame */}
          <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 5.2, 9.6]} />
            <meshStandardMaterial color="#bdaea0" roughness={0.8} />
          </mesh>

          {/* Projection Screen Surface (Facing -X towards parking bay) */}
          <mesh position={[-0.42, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[9.1, 4.8]} />
            <meshStandardMaterial color="#0b1120" roughness={0.9} />
          </mesh>

          {/* 3D Native Cinema Screen Dynamic Interactive UI via Html transform */}
          <Html
            transform
            occlude={false}
            position={[-0.43, 3.2, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            distanceFactor={3.2}
            pointerEvents="auto"
          >
            <div
              style={{
                width: '1120px',
                height: '590px',
              }}
              className="bg-[#080d1a] text-gray-100 rounded-2xl border-4 border-slate-700/80 shadow-[inset_0_0_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col p-6 select-none font-['Plus_Jakarta_Sans',sans-serif]"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-500" />
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-500" />
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="font-mono text-xs text-sky-400 font-bold tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-sky-400" />
                    CINEMA_BROADCAST_FEED // DRIVE-IN THEATER
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/40">
                    {currentProject.category}
                  </span>
                  <span className="text-xs text-amber-300 font-semibold hidden md:inline">
                    ★ {currentProject.shortDesc}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-800 text-xs font-mono text-emerald-400 border border-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    PROJECT {currentProjectIndex + 1}/{projectsData.length}
                  </span>
                </div>
              </div>

              {/* Title & Live Links Row */}
              <div className="flex items-center justify-between gap-4 mt-3">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  {currentProject.title}
                </h1>

                <div className="flex items-center gap-2.5 shrink-0">
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-md active:scale-95 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                    </a>
                  )}
                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition border border-white/20 active:scale-95 cursor-pointer"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Full Description Paragraph */}
              <div className="mt-2.5 bg-slate-900/70 p-3 rounded-xl border border-white/5 text-xs text-slate-300 leading-relaxed">
                {currentProject.fullDesc}
              </div>

              {/* Key Architecture & Production Metrics (2x2 Grid) */}
              <div className="mt-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  Key Architecture & Production Metrics
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {currentProject.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0d1527] border border-white/5 text-xs text-gray-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Infrastructure Tags */}
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 shrink-0">
                  Tech:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-white/10 text-[11px] font-medium text-slate-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Carousel Navigation Bar */}
              <div className="mt-auto pt-2.5 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={prevProject}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-white transition border border-white/20 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-amber-400" />
                  <span>PREV [A]</span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    {projectsData.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentProjectIndex(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === currentProjectIndex
                            ? 'w-6 bg-amber-400'
                            : 'w-2 bg-slate-600 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono ml-2">
                    {fpvProject ? 'Arrow Keys to cycle • Esc to Exit' : 'Park in bay for FPV View'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {fpvProject ? (
                    <button
                      onClick={exitFpv}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 active:scale-95 text-xs font-bold text-white transition cursor-pointer"
                    >
                      Return to Car (Esc)
                    </button>
                  ) : (
                    <button
                      onClick={() => enterFpv(currentProject)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-xs font-bold text-white transition cursor-pointer"
                    >
                      Enter FPV [E]
                    </button>
                  )}

                  <button
                    onClick={nextProject}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-white transition border border-white/20 cursor-pointer"
                  >
                    <span>NEXT [D]</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>
          </Html>

          {/* Interactive Left Arrow Button Next to Screen (3D Clickable) */}
          <group
            position={[-0.45, 3.2, -5.1]}
            rotation={[0, -Math.PI / 2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              prevProject();
            }}
          >
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.12, 24]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.3} emissive="#f59e0b" emissiveIntensity={0.2} />
            </mesh>
            <Text
              position={[0, 0, 0.08]}
              fontSize={0.42}
              fontWeight={900}
              color="#0f172a"
              anchorX="center"
              anchorY="middle"
            >
              ◀
            </Text>
          </group>

          {/* Interactive Right Arrow Button Next to Screen (3D Clickable) */}
          <group
            position={[-0.45, 3.2, 5.1]}
            rotation={[0, -Math.PI / 2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              nextProject();
            }}
          >
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.12, 24]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.3} emissive="#f59e0b" emissiveIntensity={0.2} />
            </mesh>
            <Text
              position={[0, 0, 0.08]}
              fontSize={0.42}
              fontWeight={900}
              color="#0f172a"
              anchorX="center"
              anchorY="middle"
            >
              ▶
            </Text>
          </group>

          {/* Rear Structural A-Frame Trusses */}
          <mesh position={[1.4, 2.2, -2.8]} rotation={[0, 0, -0.3]} castShadow>
            <boxGeometry args={[0.35, 4.8, 0.35]} />
            <meshStandardMaterial color="#8a796b" roughness={0.9} />
          </mesh>
          <mesh position={[1.4, 2.2, 2.8]} rotation={[0, 0, -0.3]} castShadow>
            <boxGeometry args={[0.35, 4.8, 0.35]} />
            <meshStandardMaterial color="#8a796b" roughness={0.9} />
          </mesh>
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* STRUCTURE 2: THE ROADSIDE STREET FOOD TRUCK              */}
      {/* Authentic Town Food Truck                                */}
      {/* ======================================================== */}
      <group position={[30, 0, 0]}>
        <RigidBody type="fixed" friction={0.9} position={[0, 0, 0]}>
          {/* Main Truck Body Box (Rear Kitchen) */}
          <mesh position={[0.2, 1.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 2.4, 5.0]} />
            <meshStandardMaterial color="#4a7c82" roughness={0.5} metalness={0.1} />
          </mesh>

          {/* Front Cab */}
          <mesh position={[0.2, 1.15, 3.2]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 1.5, 1.6]} />
            <meshStandardMaterial color="#3f6c71" roughness={0.5} metalness={0.1} />
          </mesh>

          {/* Cab Windshield */}
          <mesh position={[0.2, 1.45, 3.9]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[2.1, 0.75, 0.05]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Front Bumper & Headlights */}
          <mesh position={[0.2, 0.45, 4.05]} castShadow>
            <boxGeometry args={[2.5, 0.25, 0.2]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          <mesh position={[-0.7, 0.65, 4.06]}>
            <boxGeometry args={[0.3, 0.2, 0.05]} />
            <meshStandardMaterial color="#fef08a" roughness={0.3} />
          </mesh>
          <mesh position={[1.1, 0.65, 4.06]}>
            <boxGeometry args={[0.3, 0.2, 0.05]} />
            <meshStandardMaterial color="#fef08a" roughness={0.3} />
          </mesh>

          {/* Flipped-Up Serving Hatch Awning */}
          <mesh position={[-1.5, 2.2, 0]} rotation={[0, 0, -0.45]} castShadow>
            <boxGeometry args={[0.1, 0.05, 3.0]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
          <mesh position={[-1.5, 2.2, 0]} rotation={[0, 0, -0.45]} castShadow>
            <planeGeometry args={[0.9, 2.9]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} side={THREE.DoubleSide} />
          </mesh>

          {/* Serving Counter Ledge */}
          <mesh position={[-1.2, 1.0, 0]} castShadow>
            <boxGeometry args={[0.35, 0.08, 3.0]} />
            <meshStandardMaterial color="#f1ece4" roughness={0.4} />
          </mesh>

          {/* Menu Chalkboard next to window */}
          <group position={[-1.07, 1.6, -1.8]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh>
              <planeGeometry args={[0.9, 1.4]} />
              <meshStandardMaterial color="#1e242b" roughness={0.9} />
            </mesh>
            <Text
              position={[0, 0.45, 0.01]}
              fontSize={0.095}
              fontWeight={800}
              color="#f59e0b"
              anchorX="center"
              anchorY="middle"
            >
              STREET FOOD
            </Text>
            <Text
              position={[0, 0.24, 0.01]}
              fontSize={0.07}
              fontWeight={700}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              TACOS & BURGERS
            </Text>
            <Text
              position={[0, -0.08, 0.01]}
              fontSize={0.055}
              fontWeight={500}
              color="#cbd5e1"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.8}
            >
              • Smash Burger{'\n'}• Birria Tacos{'\n'}• Fresh Horchata{'\n'}• Cold Brew Coffee
            </Text>
          </group>

          {/* In-Counter Kitchen Serving Window Display */}
          <group position={[-0.88, 1.62, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[2.5, 1.3, 0.08]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.045]}>
              <planeGeometry args={[2.4, 1.2]} />
              <meshStandardMaterial color="#080d1a" roughness={0.2} emissive="#f59e0b" emissiveIntensity={0.05} />
            </mesh>
            <Text
              position={[0, 0.35, 0.05]}
              fontSize={0.14}
              fontWeight={800}
              color="#fbbf24"
              anchorX="center"
              anchorY="middle"
            >
              TOWN STREET KITCHEN
            </Text>
            <Text
              position={[0, 0.12, 0.05]}
              fontSize={0.09}
              fontWeight={700}
              color="#10b981"
              anchorX="center"
              anchorY="middle"
            >
              ● KITCHEN GRILL OPEN
            </Text>
            <Text
              position={[0, -0.12, 0.05]}
              fontSize={0.08}
              fontWeight={500}
              color="#cbd5e1"
              anchorX="center"
              anchorY="middle"
            >
              Handcrafted Burgers & Tacos
            </Text>
            <mesh position={[0, -0.38, 0.05]}>
              <boxGeometry args={[1.8, 0.22, 0.01]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
            <Text
              position={[0, -0.38, 0.06]}
              fontSize={0.075}
              fontWeight={800}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              OPEN DAILY 11AM - 10PM
            </Text>
          </group>

          {/* Roof Exhaust Vent Chimney */}
          <mesh position={[0.4, 2.95, -1.2]} castShadow>
            <cylinderGeometry args={[0.2, 0.25, 0.4, 12]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.6} />
          </mesh>

          {/* Stationary Wheels */}
          {[-1.05, 1.45].map((x) =>
            [-1.4, 2.0].map((z) => (
              <group key={`wheel-${x}-${z}`} position={[x, 0.38, z]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                  <cylinderGeometry args={[0.38, 0.38, 0.25, 16]} />
                  <meshStandardMaterial color="#1f2937" roughness={0.9} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} position={[x < 0 ? -0.02 : 0.02, 0, 0]}>
                  <cylinderGeometry args={[0.22, 0.22, 0.26, 12]} />
                  <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
                </mesh>
              </group>
            ))
          )}
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* STRUCTURE 3: THE EXPERIENCE & SOCIETIES DINER            */}
      {/* Dedicated Experience & Leadership FPV Showcase           */}
      {/* ======================================================== */}
      <group position={[28, 0, 16]}>
        {/* Drive-Up Parking Stall at [20, 0, 16] (relative: [-8, 0, 0]) */}
        <group position={[-8, 0.035, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 36]} />
            <meshBasicMaterial
              color={isParkedAtDiner ? '#10b981' : '#cfc5b5'}
              transparent
              opacity={isParkedAtDiner ? 0.95 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 4.6]} />
            <meshBasicMaterial
              color={isParkedAtDiner ? '#10b981' : '#ded7cb'}
              transparent
              opacity={isParkedAtDiner ? 0.18 : 0.05}
            />
          </mesh>
          <Text
            position={[0, 0.01, 1.8]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.24}
            fontWeight={700}
            color="#786c62"
            anchorX="center"
            anchorY="middle"
          >
            {isParkedAtDiner ? '★ PARKED AT EXPERIENCE DINER ★' : 'EXPERIENCE & SOCIETIES BAY'}
          </Text>
        </group>

        {/* Diner Architecture Physics Body (FIXED) */}
        <RigidBody type="fixed" friction={0.8} position={[0, 0, 0]}>
          {/* Main Building Block */}
          <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.2, 3.6, 7.8]} />
            <meshStandardMaterial color="#ede6dc" roughness={0.7} />
          </mesh>

          {/* Roof Parapet Trim */}
          <mesh position={[0, 3.65, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.5, 0.4, 8.1]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>

          {/* Striped Awning along the front (-X side) */}
          <group position={[-2.7, 2.65, 0]}>
            <mesh rotation={[0, 0, -0.32]} castShadow>
              <boxGeometry args={[1.6, 0.06, 6.8]} />
              <meshStandardMaterial color="#10b981" roughness={0.5} />
            </mesh>
            {[-2.8, -1.8, -0.8, 0.2, 1.2, 2.2].map((z, i) => (
              <mesh key={`awn-stripe-${i}`} position={[0, 0.04, z]} rotation={[0, 0, -0.32]}>
                <boxGeometry args={[1.62, 0.07, 0.5]} />
                <meshStandardMaterial color="#fcfbf7" roughness={0.5} />
              </mesh>
            ))}
          </group>

          {/* Drive-Through Service Counter Window & Shelf */}
          <mesh position={[-2.75, 1.0, 0]} castShadow>
            <boxGeometry args={[0.4, 0.1, 2.6]} />
            <meshStandardMaterial color="#c5b9a8" roughness={0.5} />
          </mesh>

          {/* 3D Embossed Roof Sign: "EXPERIENCE DINER" */}
          <group position={[-1.2, 4.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[4.4, 0.9, 0.25]} />
              <meshStandardMaterial color="#fcfbf7" roughness={0.6} />
            </mesh>
            <Text
              position={[0, 0.08, 0.14]}
              fontSize={0.38}
              fontWeight={900}
              color="#047857"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.06}
            >
              EXPERIENCE DINER
            </Text>
            <Text
              position={[0, -0.25, 0.14]}
              fontSize={0.16}
              fontWeight={700}
              color="#786c62"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.12}
            >
              WORK HISTORY & SOCIETIES
            </Text>
          </group>

          {/* In-Counter Terminal Display Mesh (Dynamic Experience Showcase) */}
          <group position={[-2.45, 1.62, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[4.4, 2.3, 0.08]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.045]}>
              <planeGeometry args={[4.3, 2.2]} />
              <meshStandardMaterial color="#06121e" roughness={0.2} emissive="#10b981" emissiveIntensity={0.06} />
            </mesh>

            {/* 3D Native Diner Terminal Screen Dynamic Interactive UI via Html transform */}
            <Html
              transform
              occlude={false}
              position={[0, 0, 0.05]}
              distanceFactor={2.7}
              pointerEvents="auto"
            >
              <div
                style={{
                  width: '940px',
                  height: '480px',
                }}
                className="bg-[#07131e] text-gray-100 rounded-2xl border-4 border-emerald-900/80 shadow-[inset_0_0_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col p-5 select-none font-['Plus_Jakarta_Sans',sans-serif]"
              >
                {/* Header Bar */}
                <div className="flex items-center justify-between pb-2.5 border-b border-emerald-500/20">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      WORK_HISTORY_LOG // {currentExp.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      className="px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase border"
                      style={{
                        backgroundColor: `${currentExp.badgeColor}20`,
                        color: currentExp.badgeColor,
                        borderColor: `${currentExp.badgeColor}40`
                      }}
                    >
                      {currentExp.category}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {currentExp.organization}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-xs font-mono text-emerald-300 border border-slate-700">
                      {currentExperienceIndex + 1}/{experienceData.length}
                    </span>
                  </div>
                </div>

                {/* Role, Period & Location */}
                <div className="flex items-start justify-between gap-3 mt-2.5">
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight">
                      {currentExp.role}
                    </h2>
                  </div>
                  <div className="text-right text-xs text-gray-400 font-medium space-y-0.5">
                    <div className="flex items-center gap-1 text-amber-300 font-semibold justify-end">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{currentExp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 justify-end">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{currentExp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-2 text-xs text-gray-300 leading-relaxed bg-[#0b1b2a]/80 p-3 rounded-xl border border-white/5">
                  {currentExp.description}
                </p>

                {/* Key Accomplishments (2-column grid) */}
                <div className="mt-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1 block">
                    Key Accomplishments & Impact Highlights
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {currentExp.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2 rounded-lg bg-[#0b1b2a] border border-white/5 text-xs text-gray-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug text-[11px]">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applied Skills Pills */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 shrink-0">
                    Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentExp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-semibold text-gray-200 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-auto pt-2 border-t border-emerald-500/20 flex items-center justify-between">
                  <button
                    onClick={prevExperience}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-xs font-bold text-white transition border border-emerald-700/50 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-emerald-400" />
                    <span>PREV [A]</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {experienceData.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentExperienceIndex(idx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            idx === currentExperienceIndex
                              ? 'w-5 bg-emerald-400'
                              : 'w-2 bg-slate-600 hover:bg-slate-500'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono ml-2">
                      {fpvExperience ? 'Arrow Keys to cycle • Esc to Exit' : 'Park in bay for FPV View'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {fpvExperience ? (
                      <button
                        onClick={exitExperienceFpv}
                        className="px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-xs font-bold text-white transition cursor-pointer"
                      >
                        Return to Car (Esc)
                      </button>
                    ) : (
                      <button
                        onClick={() => enterExperienceFpv(currentExp)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition cursor-pointer"
                      >
                        Enter FPV [E]
                      </button>
                    )}

                    <button
                      onClick={nextExperience}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-xs font-bold text-white transition border border-emerald-700/50 cursor-pointer"
                    >
                      <span>NEXT [D]</span>
                      <ChevronRight className="w-4 h-4 text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>
            </Html>
          </group>

          {/* 3D Interactive Left Arrow Button Next to Counter Window */}
          <group
            position={[-2.48, 1.62, -1.8]}
            rotation={[0, -Math.PI / 2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              prevExperience();
            }}
          >
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.24, 0.24, 0.08, 20]} />
              <meshStandardMaterial color="#10b981" roughness={0.3} emissive="#10b981" emissiveIntensity={0.25} />
            </mesh>
            <Text
              position={[0, 0, 0.05]}
              fontSize={0.24}
              fontWeight={900}
              color="#06121e"
              anchorX="center"
              anchorY="middle"
            >
              ◀
            </Text>
          </group>

          {/* 3D Interactive Right Arrow Button Next to Counter Window */}
          <group
            position={[-2.48, 1.62, 1.8]}
            rotation={[0, -Math.PI / 2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              nextExperience();
            }}
          >
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.24, 0.24, 0.08, 20]} />
              <meshStandardMaterial color="#10b981" roughness={0.3} emissive="#10b981" emissiveIntensity={0.25} />
            </mesh>
            <Text
              position={[0, 0, 0.05]}
              fontSize={0.24}
              fontWeight={900}
              color="#06121e"
              anchorX="center"
              anchorY="middle"
            >
              ▶
            </Text>
          </group>
        </RigidBody>
      </group>
    </group>
  );
};
