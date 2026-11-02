import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { projectsData, Project } from '../../../data/projectsData';
import { useGame } from '../../../context/GameContext';
import { ExternalLink, CheckCircle2, Activity, Terminal, Database } from 'lucide-react';

interface ProjectsZoneProps {
  vehiclePosition: THREE.Vector3 | null;
}

export const ProjectsZone: React.FC<ProjectsZoneProps> = ({ vehiclePosition }) => {
  const { setActiveProject, activeProject, markZoneDiscovered, fpvProject } = useGame();

  useFrame(() => {
    if (!vehiclePosition) return;

    let closestProject: Project | null = null;
    let minDistance = 3.6; // Trigger radius for parking spots

    projectsData.forEach((project) => {
      const projPos = new THREE.Vector3(...project.spawnPosition);
      const dist = projPos.distanceTo(vehiclePosition);

      if (dist < minDistance) {
        closestProject = project;
        minDistance = dist;
      }
    });

    if (closestProject !== activeProject) {
      setActiveProject(closestProject);
      if (closestProject) {
        markZoneDiscovered('projects');
      }
    }
  });

  const isTrueforgeActive = activeProject?.id === 'trueforge';
  const isRobosurgeActive = activeProject?.id === 'robosurge';
  const isBackendActive = activeProject?.id === 'distributed-backend';

  const isRobosurgeFpv = fpvProject?.id === 'robosurge';
  const isTrueforgeFpv = fpvProject?.id === 'trueforge';
  const isBackendFpv = fpvProject?.id === 'distributed-backend';

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
          PULL UP TO ANY BAY TO LAUNCH FPV VIEW
        </Text>
      </group>

      {/* ======================================================== */}
      {/* STRUCTURE 1: THE RETRO DRIVE-IN CINEMA (TrueForge)       */}
      {/* ======================================================== */}
      <group position={[28, 0, -16]}>
        {/* Drive-in Parking Bay at [20, 0, -16] (relative: [-8, 0, 0]) */}
        <group position={[-8, 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 36]} />
            <meshBasicMaterial
              color={isTrueforgeActive ? '#ea580c' : '#cfc5b5'}
              transparent
              opacity={isTrueforgeActive ? 0.9 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 4.6]} />
            <meshBasicMaterial
              color={isTrueforgeActive ? '#ea580c' : '#ded7cb'}
              transparent
              opacity={isTrueforgeActive ? 0.15 : 0.05}
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
            {isTrueforgeActive ? '★ PARKED AT TRUEFORGE ★' : 'DRIVE-IN CINEMA BAY'}
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
          {/* Main Frame */}
          <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 5.2, 9.2]} />
            <meshStandardMaterial color="#bdaea0" roughness={0.8} />
          </mesh>

          {/* Projection Screen Surface (Facing -X towards parking bay) */}
          <mesh position={[-0.42, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[8.8, 4.8]} />
            <meshStandardMaterial color="#0c1222" roughness={0.9} />
          </mesh>

          {/* Interactive Cinema Screen Content (Drei HTML) */}
          <group position={[-0.43, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <Html
              transform
              occlude={false}
              distanceFactor={5.2}
              position={[0, 0, 0.05]}
              style={{
                width: '920px',
                height: '520px',
                pointerEvents: isTrueforgeFpv ? 'auto' : 'none',
                userSelect: 'none'
              }}
            >
              <div className="w-full h-full bg-[#0b101e] text-white p-7 rounded-2xl border-2 border-orange-500/40 flex flex-col justify-between font-mono shadow-2xl">
                {/* Top Terminal Bar */}
                <div className="flex items-center justify-between border-b border-orange-500/30 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                    <span className="font-bold text-sm tracking-widest text-orange-400">
                      TRUEFORGE // AUTONOMOUS AGENT BENCHMARK
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-orange-500/20 text-orange-300 font-bold">
                    DOCKER SANDBOX HARNESS
                  </span>
                </div>

                {/* Main Benchmark Console Feed */}
                <div className="grid grid-cols-2 gap-4 my-3 text-xs">
                  <div className="bg-[#12192c] p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-orange-400 font-bold mb-1">
                      <Terminal className="w-4 h-4" />
                      <span>EVALUATION TRACE</span>
                    </div>
                    <div className="space-y-1 text-[11px] text-gray-300 font-mono">
                      <div className="text-emerald-400">✓ [PASS] Isolated Workspace Provision (0.08s)</div>
                      <div className="text-emerald-400">✓ [PASS] Multi-Repo Test Harness Mount (0.19s)</div>
                      <div className="text-emerald-400">✓ [PASS] Agent Code Patch Application (0.42s)</div>
                      <div className="text-emerald-400">✓ [PASS] Regression Suite Validation (0.91s)</div>
                      <div className="text-cyan-400">● [INFO] Zero-Leakage Scoring Verified</div>
                    </div>
                  </div>

                  <div className="bg-[#12192c] p-4 rounded-xl border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                        <Activity className="w-4 h-4" />
                        <span>METRICS & ACCURACY</span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Benchmarking framework built for TrueFoundry Forge-a-thon. Evaluates autonomous coding agents across real-world software repos with isolated container runtimes.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {['TypeScript', 'Docker', 'Agentic Protocols', 'esbuild', 'CLI'].map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-gray-200 font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[11px] text-gray-400">
                    Engineered by Aniketh Galla • TrueFoundry Forge-a-thon
                  </span>
                  <a
                    href="https://github.com/anikethgalla/TrueForge"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors pointer-events-auto"
                  >
                    <span>Inspect GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Html>
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
      {/* STRUCTURE 2: THE GOURMET FOOD TRUCK (Robosurge)          */}
      {/* Stationary Fixed Physics Body - Cannot be moved by WASD  */}
      {/* ======================================================== */}
      <group position={[30, 0, 0]}>
        {/* Customer Parking Bay at [23, 0, 0] (relative: [-7, 0, 0]) */}
        <group position={[-7, 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 36]} />
            <meshBasicMaterial
              color={isRobosurgeActive ? '#0284c7' : '#cfc5b5'}
              transparent
              opacity={isRobosurgeActive ? 0.9 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 4.6]} />
            <meshBasicMaterial
              color={isRobosurgeActive ? '#0284c7' : '#ded7cb'}
              transparent
              opacity={isRobosurgeActive ? 0.15 : 0.05}
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
            {isRobosurgeActive ? '★ PARKED AT ROBOSURGE ★' : 'FOOD TRUCK ORDER BAY'}
          </Text>
        </group>

        {/* Stationary Food Truck Physics Body (FIXED, IMMOVABLE) */}
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

          {/* Flipped-Up Serving Hatch Awning (Props up on two struts) */}
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
              fontSize={0.11}
              fontWeight={800}
              color="#0284c7"
              anchorX="center"
              anchorY="middle"
            >
              ROBOSURGE
            </Text>
            <Text
              position={[0, 0.22, 0.01]}
              fontSize={0.075}
              fontWeight={700}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              CV & ROBOTICS
            </Text>
            <Text
              position={[0, -0.05, 0.01]}
              fontSize={0.06}
              fontWeight={500}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.8}
            >
              • 60 FPS Dual-Cam{'\n'}• Surgical Tracking{'\n'}• SQLite WAL Log
            </Text>
          </group>

          {/* ======================================================== */}
          {/* FPV MONITOR INSIDE THE FOOD TRUCK (Robosurge Console)   */}
          {/* ======================================================== */}
          <group position={[-0.88, 1.62, 0]} rotation={[0, -Math.PI / 2, 0]}>
            {/* Monitor Chassis Frame */}
            <mesh castShadow>
              <boxGeometry args={[2.9, 1.55, 0.1]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
            </mesh>

            {/* Glowing Screen Surface */}
            <mesh position={[0, 0, 0.051]}>
              <planeGeometry args={[2.8, 1.45]} />
              <meshStandardMaterial color="#050811" roughness={0.2} emissive="#0284c7" emissiveIntensity={0.06} />
            </mesh>

            {/* Interactive FPV Screen HTML Interface */}
            <Html
              transform
              occlude={false}
              distanceFactor={2.7}
              position={[0, 0, 0.06]}
              style={{
                width: '800px',
                height: '440px',
                pointerEvents: isRobosurgeFpv ? 'auto' : 'none',
                userSelect: 'none'
              }}
            >
              <div className="w-full h-full bg-[#080d1a] text-white p-5 rounded-2xl border-2 border-sky-500/40 flex flex-col justify-between font-mono shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-sky-500/30 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-bold text-xs tracking-wider text-cyan-300">
                      ROBOSURGE MEDICAL CV RIG v2.4
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      ● 60 FPS LIVE
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                      WAL SYNC 0.38ms
                    </span>
                  </div>
                </div>

                {/* Dual Camera Simulated Telemetry Feeds */}
                <div className="grid grid-cols-2 gap-3 my-2">
                  {/* Cam 0 Feed */}
                  <div className="bg-[#0f172a] rounded-xl p-3 border border-sky-500/30 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between text-[10px] font-bold text-cyan-400 z-10">
                      <span>[CAM 0: SURGICAL FIELD]</span>
                      <span>1920x1080</span>
                    </div>

                    {/* Reticle Graphics */}
                    <div className="my-3 flex items-center justify-center relative h-20">
                      <div className="w-16 h-16 rounded-full border border-cyan-500/40 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border border-dashed border-cyan-400 animate-spin" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[1px] bg-cyan-500/20" />
                        <div className="h-full w-[1px] bg-cyan-500/20 absolute" />
                      </div>
                      <span className="absolute bottom-1 right-2 text-[9px] text-cyan-300 font-mono">
                        POS: X+14.2 Y-02.1 Z+48.0
                      </span>
                    </div>

                    <div className="text-[10px] text-gray-300 flex justify-between border-t border-white/10 pt-1.5 z-10">
                      <span>Centroid Lock</span>
                      <span className="text-emerald-400 font-bold">LOCKED 99.8%</span>
                    </div>
                  </div>

                  {/* Cam 1 Feed */}
                  <div className="bg-[#0f172a] rounded-xl p-3 border border-sky-500/30 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between text-[10px] font-bold text-sky-400 z-10">
                      <span>[CAM 1: TOOL TRACKING]</span>
                      <span>CALIBRATED</span>
                    </div>

                    {/* Optical Depth Vector */}
                    <div className="my-3 flex flex-col justify-center gap-1.5 h-20 px-2">
                      <div className="text-[10px] text-gray-300 flex justify-between">
                        <span>Optical Error Delta:</span>
                        <span className="text-cyan-300 font-bold">±0.038 mm</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-cyan-400 h-full w-[94%]" />
                      </div>
                      <div className="text-[9px] text-gray-400 flex justify-between">
                        <span>WAL Buffer: 1,420 evts/s</span>
                        <span className="text-emerald-400">Zero Drops</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-gray-300 flex justify-between border-t border-white/10 pt-1.5 z-10">
                      <span>Stereo Triangulation</span>
                      <span className="text-emerald-400 font-bold">OPTIMAL</span>
                    </div>
                  </div>
                </div>

                {/* Tech Highlights & Actions */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'OpenCV', 'FastAPI', 'SQLite WAL', 'Dual-Cam Rig'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 text-[10px] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-[10px] text-gray-400">
                      Sub-millimeter Surgical Tracking Platform
                    </span>
                    <a
                      href="https://github.com/anikethgalla/Robosurge"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors pointer-events-auto"
                    >
                      <span>Open GitHub Repo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Html>
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
      {/* STRUCTURE 3: THE CLASSIC CLAY DINER (Distributed Backend) */}
      {/* ======================================================== */}
      <group position={[28, 0, 16]}>
        {/* Drive-Up Parking Stall at [20, 0, 16] (relative: [-8, 0, 0]) */}
        <group position={[-8, 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 36]} />
            <meshBasicMaterial
              color={isBackendActive ? '#7c3aed' : '#cfc5b5'}
              transparent
              opacity={isBackendActive ? 0.9 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 4.6]} />
            <meshBasicMaterial
              color={isBackendActive ? '#7c3aed' : '#ded7cb'}
              transparent
              opacity={isBackendActive ? 0.15 : 0.05}
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
            {isBackendActive ? '★ PARKED AT BACKEND DINER ★' : 'DINER DRIVE-UP BAY'}
          </Text>
        </group>

        {/* Diner Architecture Physics Body (FIXED) */}
        <RigidBody type="fixed" friction={0.8} position={[0, 0, 0]}>
          {/* Main Clay Building Block */}
          <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.2, 3.6, 7.8]} />
            <meshStandardMaterial color="#ede6dc" roughness={0.7} />
          </mesh>

          {/* Roof Parapet Trim (Warm Terracotta Deco Styling) */}
          <mesh position={[0, 3.65, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.5, 0.4, 8.1]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>

          {/* Striped Clay Awning along the front (-X side) */}
          <group position={[-2.7, 2.65, 0]}>
            <mesh rotation={[0, 0, -0.32]} castShadow>
              <boxGeometry args={[1.6, 0.06, 6.8]} />
              <meshStandardMaterial color="#ea580c" roughness={0.5} />
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

          {/* 3D Embossed Clay Roof Sign: "DINER" */}
          <group position={[-1.2, 4.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[4.2, 0.9, 0.25]} />
              <meshStandardMaterial color="#fcfbf7" roughness={0.6} />
            </mesh>
            <Text
              position={[0, 0.08, 0.14]}
              fontSize={0.48}
              fontWeight={900}
              color="#c2410c"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.08}
            >
              DINER
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
              24/7 BACKEND API
            </Text>
          </group>

          {/* ======================================================== */}
          {/* FPV MONITOR INSIDE THE DINER (API Server Status)        */}
          {/* ======================================================== */}
          <group position={[-2.45, 1.62, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[3.2, 1.65, 0.1]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.051]}>
              <planeGeometry args={[3.1, 1.55]} />
              <meshStandardMaterial color="#090d16" roughness={0.2} emissive="#7c3aed" emissiveIntensity={0.05} />
            </mesh>

            <Html
              transform
              occlude={false}
              distanceFactor={3.2}
              position={[0, 0, 0.06]}
              style={{
                width: '840px',
                height: '460px',
                pointerEvents: isBackendFpv ? 'auto' : 'none',
                userSelect: 'none'
              }}
            >
              <div className="w-full h-full bg-[#0a0d17] text-white p-5 rounded-2xl border-2 border-purple-500/40 flex flex-col justify-between font-mono shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-purple-500/30 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                    <span className="font-bold text-xs tracking-wider text-purple-300">
                      DISTRIBUTED BACKEND PLATFORM // 24/7 API
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      ● UPTIME 99.98%
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                      P99 18ms
                    </span>
                  </div>
                </div>

                {/* Live Endpoints Matrix */}
                <div className="grid grid-cols-2 gap-3 my-2 text-xs">
                  <div className="bg-[#111626] p-3.5 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-purple-400 font-bold mb-1">
                      <Database className="w-4 h-4" />
                      <span>CONNECTION POOL & TRAFFIC</span>
                    </div>
                    <div className="text-[11px] text-gray-300 space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span>POST /api/v1/auth/rotate</span>
                        <span className="text-emerald-400">200 OK (8ms)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>WS /telemetry/stream</span>
                        <span className="text-cyan-400">101 SW (2ms)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GET /api/v1/metrics</span>
                        <span className="text-emerald-400">200 OK (14ms)</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/10 text-gray-400">
                        <span>PostgreSQL Pool:</span>
                        <span className="text-purple-300">48 / 50 Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#111626] p-3.5 rounded-xl border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-purple-400 font-bold text-xs">CLEAN ARCHITECTURE</span>
                      <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                        Enterprise microservice tier built with Domain-Driven Design, Hexagonal Boundaries, Prisma ORM, Redis caching, and automated Docker / Kubernetes manifests.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {['FastAPI', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker', 'Kubernetes'].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 text-[10px] font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-[10px] text-gray-400">
                    High-Throughput Production Architecture
                  </span>
                  <a
                    href="https://github.com/anikethgalla/Backend"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors pointer-events-auto"
                  >
                    <span>View Backend Repo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Html>
          </group>
        </RigidBody>
      </group>
    </group>
  );
};
