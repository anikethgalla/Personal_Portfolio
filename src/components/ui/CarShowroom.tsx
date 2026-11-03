import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGame } from '../../context/GameContext';
import { VEHICLE_LIST, VEHICLES_DATA, VehicleId } from '../../data/vehiclesData';
import { VehicleModelSwitch } from '../canvas/vehicle/VehicleModels';
import { GarageEnvironment } from '../canvas/environment/GarageEnvironment';
import { soundManager } from '../../audio/soundManager';

// -------------------------------------------------------------
// VEHICLE GROUND CONTACT ALIGNMENT OFFSETS
// (Calibrated to each vehicle's wheel radius and suspension)
// -------------------------------------------------------------
export const VEHICLE_GROUND_OFFSETS: Record<VehicleId, number> = {
  pickup: 0.17,
  sports: 0.17,
  offroad: 0.16,
  kart: 0.11,
  roadster: 0.17,
  van: 0.18,
};

// -------------------------------------------------------------
// 3D SHOWROOM GARAGE STAGE
// -------------------------------------------------------------
const ShowroomStage: React.FC<{
  vehicleId: VehicleId;
  color: string;
}> = ({ vehicleId, color }) => {
  const groundY = VEHICLE_GROUND_OFFSETS[vehicleId] ?? 0.17;

  return (
    <group>
      {/* Indoor Residential Garage Architecture, Fixtures & Warm Lighting */}
      <GarageEnvironment vehicleId={vehicleId} />

      {/* Parked Vehicle - Statically Positioned on Polished Epoxy Garage Floor */}
      <group position={[0, groundY, 0]} rotation={[0, Math.PI, 0]}>
        <VehicleModelSwitch
          vehicleId={vehicleId}
          color={color}
          showHeadlightBeams={false}
        />
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
        <span className="text-[#5c5046] uppercase font-semibold">{label}</span>
        <span className="text-[#1f1915] font-mono font-bold">{value} / 100</span>
      </div>
      <div className="h-2 w-full bg-[#ded5c6] rounded-full overflow-hidden p-0.5 border border-[#cfc4b2]">
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
// MAIN CAR SHOWROOM MODAL COMPONENT (UNIFIED WARM BEIGE PALETTE)
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

  const handleStartDriving = () => {
    soundManager.playChime();
    closeCarSelect();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCarSelectOpen) {
        e.preventDefault();
        handleStartDriving();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCarSelectOpen]);

  if (!isCarSelectOpen) return null;

  const activeConfig = VEHICLES_DATA[hoveredVehicle || selectedVehicleId];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#e8dfd1] select-none font-['Plus_Jakarta_Sans',sans-serif] animate-fadeIn text-[#241e1a] overflow-hidden">
      {/* TOP HEADER BAR (WARM BEIGE ARCHITECTURAL HEADER) */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-[#d8cec0] bg-[#f4ece1]/90 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-black text-stone-950 text-base shadow-md shadow-orange-500/20">
            AG
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-[#1f1915] flex items-center gap-2">
              ANIKETH METROPOLIS{' '}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-700 font-bold border border-orange-500/30">
                VEHICLE SELECT
              </span>
            </h1>
            <p className="text-xs text-[#75685d] font-medium">
              Choose your ride to explore the interactive 3D engineering portfolio
            </p>
          </div>
        </div>

        {/* Quick Start / Skip Button */}
        <button
          onClick={handleStartDriving}
          className="px-4 py-2 text-xs font-bold text-[#42372e] hover:text-[#1f1915] bg-[#dfd6c7] hover:bg-[#d5caa8] rounded-xl transition border border-[#cfc4b2] flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          title="Press Esc to Skip to World"
        >
          <span>Skip to World ➔</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[#cfc4b2] text-[10px] text-[#42372e] font-mono font-bold">
            Esc
          </kbd>
        </button>
      </header>

      {/* MAIN SHOWROOM CONTENT (Split into 3D Stage + Vehicle Specs) */}
      <div className="flex-1 relative flex flex-col lg:flex-row items-stretch overflow-hidden">
        {/* 3D RESIDENTIAL GARAGE STAGE (Center / Left) */}
        <div className="flex-1 relative h-64 lg:h-auto flex items-center justify-center">
          {/* Static Three.js Canvas with Warm Beige Background (Zero Mouse Follow) */}
          <Canvas
            shadows
            camera={{ position: [2.5, 1.35, 2.3], fov: 40 }}
            className="w-full h-full"
          >
            <color attach="background" args={['#e8dfd1']} />
            <ShowroomStage
              vehicleId={hoveredVehicle || selectedVehicleId}
              color={selectedVehicleColor}
            />
          </Canvas>

          {/* Garage Status Badge (Matching Warm Beige Architectural Aesthetic) */}
          <div className="absolute top-4 left-6 px-3.5 py-1.5 rounded-full bg-[#f4ece1]/90 border border-[#d8cec0] text-xs font-bold text-[#9a3412] pointer-events-none flex items-center gap-2 shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>HOME GARAGE // READY TO ROLL</span>
          </div>
        </div>

        {/* SIDEBAR: VEHICLE SPECS & CUSTOMIZATION PANEL (Right) */}
        <div className="w-full lg:w-[420px] bg-[#f5efe6]/95 border-t lg:border-t-0 lg:border-l border-[#d8cec0] flex flex-col p-6 backdrop-blur-xl overflow-y-auto">
          {/* Vehicle Category Badge & Name */}
          <div className="mb-4">
            <span className="text-[11px] font-extrabold tracking-widest text-orange-700 uppercase bg-orange-500/15 px-2.5 py-1 rounded-md border border-orange-500/30">
              {activeConfig.category}
            </span>
            <h2 className="text-2xl font-black text-[#1f1915] tracking-tight mt-2">
              {activeConfig.name}
            </h2>
            <p className="text-xs font-bold text-sky-700 mt-0.5">
              {activeConfig.tagline}
            </p>
            <p className="text-xs text-[#5c5046] mt-2 leading-relaxed">
              {activeConfig.description}
            </p>
          </div>

          {/* COLOR PICKER PALETTE */}
          <div className="mb-6 bg-[#ede5d8] p-3.5 rounded-2xl border border-[#d8cec0]">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#5c5046]">
                Body Finish / Paint
              </span>
              <span className="text-[11px] font-mono text-[#75685d] uppercase font-bold">
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
                        ? 'ring-4 ring-orange-500 ring-offset-2 ring-offset-[#ede5d8] scale-110'
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
          <div className="space-y-3 mb-6 bg-[#ede5d8] p-4 rounded-2xl border border-[#d8cec0]">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#75685d] mb-2">
              Handling & Tuning Dynamics
            </h3>
            <StatBar label="Top Speed" value={activeConfig.stats.speed} color="#0284c7" />
            <StatBar label="Acceleration" value={activeConfig.stats.acceleration} color="#d97706" />
            <StatBar label="Handling" value={activeConfig.stats.handling} color="#16a34a" />
            <StatBar label="Drift Control" value={activeConfig.stats.drift} color="#ea580c" />
          </div>

          {/* PRIMARY CONFIRM & DRIVE BUTTON */}
          <div className="mt-auto pt-2">
            <button
              onClick={handleStartDriving}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 font-black text-sm tracking-wide text-stone-950 shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>IGNITE ENGINE & DRIVE</span>
              <span className="text-base">➔</span>
            </button>
            <p className="text-[11px] text-center text-[#8c7e73] font-medium mt-2">
              Use WASD or Arrow Keys to navigate the 3D portfolio world
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM CAROUSEL TABS (All 6 Vehicles) */}
      <footer className="relative z-10 px-6 py-4 border-t border-[#d8cec0] bg-[#f4ece1]/95 backdrop-blur-md">
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
                    ? 'bg-orange-500/15 border-orange-500 shadow-md shadow-orange-500/10 scale-102'
                    : 'bg-[#ede5d8] border-[#d8cec0] hover:bg-[#e4dcce] hover:border-[#cbbfad]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: isSelected ? selectedVehicleColor : v.defaultColor }}
                  />
                  <span className={`text-xs font-black ${isSelected ? 'text-orange-700' : 'text-[#2e2620]'}`}>
                    {v.name}
                  </span>
                </div>
                <div className="text-[10px] text-[#75685d] font-semibold mt-0.5">
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
