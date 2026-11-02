import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { VEHICLE_LIST, VEHICLES_DATA, VehicleId } from '../../data/vehiclesData';
import { VehicleModelSwitch } from '../canvas/vehicle/VehicleModels';
import { soundManager } from '../../audio/soundManager';

// -------------------------------------------------------------
// 3D SHOWROOM TURNTABLE & STAGE
// -------------------------------------------------------------
const ShowroomStage: React.FC<{
  vehicleId: VehicleId;
  color: string;
}> = ({ vehicleId, color }) => {
  const turntableRef = useRef<THREE.Group>(null);

  // Gentle automatic idle rotation
  useFrame((_, delta) => {
    if (turntableRef.current) {
      turntableRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group>
      {/* Studio Lighting */}
      <ambientLight intensity={0.7} color="#fffbeb" />
      {/* Primary Key Light */}
      <directionalLight position={[6, 10, 6]} intensity={1.6} castShadow />
      {/* Rim / Backlight */}
      <directionalLight position={[-6, 6, -6]} intensity={1.0} color="#38bdf8" />
      {/* Soft Ground Bounce Fill */}
      <directionalLight position={[0, -4, 0]} intensity={0.4} color="#f8fafc" />

      {/* Rotating Turntable Group */}
      <group ref={turntableRef} position={[0, -0.4, 0]}>
        {/* The 3D Vehicle Model */}
        <group position={[0, 0.1, 0]}>
          <VehicleModelSwitch
            vehicleId={vehicleId}
            color={color}
            showHeadlightBeams={false}
          />
        </group>

        {/* Circular Display Podium */}
        <mesh position={[0, -0.06, 0]} receiveShadow>
          <cylinderGeometry args={[2.8, 3.0, 0.16, 48]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Luminous Glow Ring Around Turntable Edge */}
        <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.65, 2.75, 48]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>
    </group>
  );
};

// -------------------------------------------------------------
// STAT BAR COMPONENT
// -------------------------------------------------------------
const StatBar: React.FC<{ label: string; value: number; color?: string }> = ({
  label,
  value,
  color = '#f97316'
}) => {
  return (
    <div>
      <div className="flex justify-between items-center text-xs font-bold tracking-wider mb-1">
        <span className="text-slate-300 uppercase">{label}</span>
        <span className="text-white font-mono">{value} / 100</span>
      </div>
      <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{
            width: `${value}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// MAIN CAR SHOWROOM MODAL COMPONENT
// -------------------------------------------------------------
export const CarShowroom: React.FC = () => {
  const {
    isCarSelectOpen,
    closeCarSelect,
    selectedVehicleId,
    selectedVehicleColor,
    selectVehicle,
    setVehicleColor
  } = useGame();

  const [hoveredVehicle, setHoveredVehicle] = useState<VehicleId | null>(null);

  if (!isCarSelectOpen) return null;

  const activeConfig = VEHICLES_DATA[hoveredVehicle || selectedVehicleId];

  const handleStartDriving = () => {
    soundManager.playChime();
    closeCarSelect();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl select-none font-['Plus_Jakarta_Sans',sans-serif] animate-fadeIn text-white overflow-hidden">
      {/* TOP HEADER BAR */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-orange-500/20">
            AG
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2">
              ANIKETH METROPOLIS <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">VEHICLE SELECT</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Choose your ride to explore the interactive 3D engineering portfolio
            </p>
          </div>
        </div>

        {/* Quick Start / Skip Button */}
        <button
          onClick={handleStartDriving}
          className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition border border-slate-700"
        >
          Skip to World ➔
        </button>
      </header>

      {/* MAIN SHOWROOM CONTENT (Split into 3D Stage + Vehicle Specs) */}
      <div className="flex-1 relative flex flex-col lg:flex-row items-stretch overflow-hidden">
        {/* 3D CANVAS TURNTABLE (Center / Left) */}
        <div className="flex-1 relative h-64 lg:h-auto flex items-center justify-center">
          {/* Subtle Stage Background Gradient Radial */}
          <div className="absolute inset-0 bg-radial-gradient from-sky-900/15 via-transparent to-slate-950 pointer-events-none" />

          {/* Interactive Three.js Canvas */}
          <Canvas
            shadows
            camera={{ position: [3.8, 2.5, 4.2], fov: 42 }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ShowroomStage
              vehicleId={hoveredVehicle || selectedVehicleId}
              color={selectedVehicleColor}
            />
            <OrbitControls
              enablePan={false}
              minDistance={3.2}
              maxDistance={6.5}
              maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera going beneath floor
            />
          </Canvas>

          {/* Drag instruction pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-semibold text-slate-300 pointer-events-none flex items-center gap-1.5 shadow-lg backdrop-blur-md">
            <span>🖱️</span> Drag to rotate 3D view
          </div>
        </div>

        {/* SIDEBAR: VEHICLE SPECS & CUSTOMIZATION PANEL (Right) */}
        <div className="w-full lg:w-[420px] bg-slate-900/80 border-t lg:border-t-0 lg:border-l border-slate-800/80 flex flex-col p-6 backdrop-blur-xl overflow-y-auto">
          {/* Vehicle Category Badge & Name */}
          <div className="mb-4">
            <span className="text-[11px] font-extrabold tracking-widest text-orange-400 uppercase bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
              {activeConfig.category}
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight mt-2">
              {activeConfig.name}
            </h2>
            <p className="text-xs font-semibold text-sky-400 mt-0.5">
              {activeConfig.tagline}
            </p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {activeConfig.description}
            </p>
          </div>

          {/* COLOR PICKER PALETTE */}
          <div className="mb-6 bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Body Finish / Paint
              </span>
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                {selectedVehicleColor}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              {activeConfig.colorPalette.map((swatchColor) => {
                const isSelected = selectedVehicleColor.toLowerCase() === swatchColor.toLowerCase();
                return (
                  <button
                    key={swatchColor}
                    onClick={() => {
                      setVehicleColor(swatchColor);
                      soundManager.playChime();
                    }}
                    style={{ backgroundColor: swatchColor }}
                    className={`w-8 h-8 rounded-full transition-all transform hover:scale-110 relative shadow-md ${
                      isSelected
                        ? 'ring-4 ring-orange-500 ring-offset-2 ring-offset-slate-900 scale-110'
                        : 'hover:opacity-90'
                    }`}
                    title={swatchColor}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PERFORMANCE STATS BARS */}
          <div className="space-y-3 mb-6 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              Handling & Tuning Dynamics
            </h3>
            <StatBar label="Top Speed" value={activeConfig.stats.speed} color="#38bdf8" />
            <StatBar label="Acceleration" value={activeConfig.stats.acceleration} color="#facc15" />
            <StatBar label="Handling" value={activeConfig.stats.handling} color="#4ade80" />
            <StatBar label="Drift Control" value={activeConfig.stats.drift} color="#f97316" />
          </div>

          {/* PRIMARY CONFIRM & DRIVE BUTTON */}
          <div className="mt-auto pt-2">
            <button
              onClick={handleStartDriving}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 font-black text-sm tracking-wide text-slate-950 shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>IGNITE ENGINE & DRIVE</span>
              <span className="text-base">➔</span>
            </button>
            <p className="text-[11px] text-center text-slate-500 font-medium mt-2">
              Use WASD or Arrow Keys to navigate the 3D portfolio world
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM CAROUSEL TABS (All 6 Vehicles) */}
      <footer className="relative z-10 px-6 py-4 border-t border-slate-800/80 bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 overflow-x-auto pb-1">
          {VEHICLE_LIST.map((v) => {
            const isSelected = selectedVehicleId === v.id;
            return (
              <button
                key={v.id}
                onMouseEnter={() => setHoveredVehicle(v.id)}
                onMouseLeave={() => setHoveredVehicle(null)}
                onClick={() => {
                  selectVehicle(v.id);
                  setHoveredVehicle(null);
                }}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 shadow-lg shadow-orange-500/10 scale-102'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: isSelected ? selectedVehicleColor : v.defaultColor }}
                  />
                  <span className={`text-xs font-black ${isSelected ? 'text-orange-400' : 'text-slate-200'}`}>
                    {v.name}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  {v.category}
                </div>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
};

