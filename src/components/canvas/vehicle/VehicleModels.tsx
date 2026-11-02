import React from 'react';
import * as THREE from 'three';
import { VehicleId } from '../../../data/vehiclesData';

interface VehicleModelProps {
  color: string;
  frontLeftRef?: React.RefObject<THREE.Group | null>;
  frontRightRef?: React.RefObject<THREE.Group | null>;
  rearLeftRef?: React.RefObject<THREE.Group | null>;
  rearRightRef?: React.RefObject<THREE.Group | null>;
  showHeadlightBeams?: boolean;
}

// -------------------------------------------------------------
// STANDARD WHEEL COMPONENT
// -------------------------------------------------------------
export const LowPolyWheel: React.FC<{
  position: [number, number, number];
  wheelRef?: React.RefObject<THREE.Group | null>;
  radius?: number;
  width?: number;
  rimColor?: string;
  tireColor?: string;
  isFront?: boolean;
}> = ({
  position,
  wheelRef,
  radius = 0.32,
  width = 0.22,
  rimColor = '#d1d5db',
  tireColor = '#1f2937'
}) => {
  const isLeftSide = position[0] < 0;
  return (
    <group position={position} ref={wheelRef}>
      {/* Outer Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[radius, radius, width, 16]} />
        <meshStandardMaterial color={tireColor} roughness={0.9} />
      </mesh>
      {/* Rim Hub */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[isLeftSide ? -0.02 : 0.02, 0, 0]}>
        <cylinderGeometry args={[radius * 0.55, radius * 0.55, width + 0.01, 12]} />
        <meshStandardMaterial color={rimColor} roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// 1. CLASSIC PICKUP MODEL
// -------------------------------------------------------------
export const PickupModel: React.FC<VehicleModelProps> = ({
  color,
  frontLeftRef,
  frontRightRef,
  rearLeftRef,
  rearRightRef,
  showHeadlightBeams = false
}) => {
  return (
    <group>
      {/* Main Lower Body & Truck Bed */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.45, 2.4]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Cabin / Roof */}
      <mesh position={[0, 0.72, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.4, 1.3]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Windshield (Dark Tinted Glass) */}
      <mesh position={[0, 0.72, -0.76]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.95, 0.32, 0.05]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Side Windows */}
      <mesh position={[0.53, 0.72, -0.1]}>
        <boxGeometry args={[0.02, 0.28, 1.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[-0.53, 0.72, -0.1]}>
        <boxGeometry args={[0.02, 0.28, 1.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Rear Window */}
      <mesh position={[0, 0.72, 0.56]}>
        <boxGeometry args={[0.9, 0.28, 0.05]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Truck Bed Interior Floor (Dark bed liner) */}
      <mesh position={[0, 0.46, 0.78]}>
        <boxGeometry args={[1.0, 0.05, 0.75]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* Front Bumper & Grill */}
      <mesh position={[0, 0.26, -1.22]}>
        <boxGeometry args={[1.1, 0.2, 0.08]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.42, 0.38, -1.21]}>
        <boxGeometry args={[0.22, 0.14, 0.06]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.42, 0.38, -1.21]}>
        <boxGeometry args={[0.22, 0.14, 0.06]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.8} />
      </mesh>

      {/* Optional In-Game Headlight Beams */}
      {showHeadlightBeams && (
        <>
          <mesh position={[-0.42, 0.25, -2.6]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.6, 2.8, 16]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
          </mesh>
          <mesh position={[0.42, 0.25, -2.6]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.6, 2.8, 16]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
          </mesh>
        </>
      )}

      {/* Taillights */}
      <mesh position={[-0.45, 0.42, 1.21]}>
        <boxGeometry args={[0.22, 0.12, 0.05]} />
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.45, 0.42, 1.21]}>
        <boxGeometry args={[0.22, 0.12, 0.05]} />
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.6} />
      </mesh>

      {/* 4 Wheels */}
      <LowPolyWheel position={[-0.72, 0.15, -0.75]} wheelRef={frontLeftRef} isFront />
      <LowPolyWheel position={[0.72, 0.15, -0.75]} wheelRef={frontRightRef} isFront />
      <LowPolyWheel position={[-0.72, 0.15, 0.75]} wheelRef={rearLeftRef} />
      <LowPolyWheel position={[0.72, 0.15, 0.75]} wheelRef={rearRightRef} />
    </group>
  );
};

// -------------------------------------------------------------
// 2. APEX SPORTS COUPE MODEL
// -------------------------------------------------------------
export const SportsCoupeModel: React.FC<VehicleModelProps> = ({
  color,
  frontLeftRef,
  frontRightRef,
  rearLeftRef,
  rearRightRef,
  showHeadlightBeams = false
}) => {
  return (
    <group>
      {/* Lower Sleek Aerodynamic Wedge Body */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.36, 0.32, 2.5]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.2} />
      </mesh>

      {/* Slanted Hood Scoop */}
      <mesh position={[0, 0.36, -0.65]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.9, 0.12, 0.95]} />
        <meshStandardMaterial color={color} roughness={0.2} />
      </mesh>

      {/* Low-Profile Aerodynamic Cabin */}
      <mesh position={[0, 0.58, -0.05]} rotation={[-0.05, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.08, 0.32, 1.35]} />
        <meshStandardMaterial color={color} roughness={0.2} />
      </mesh>

      {/* Raked Windshield */}
      <mesh position={[0, 0.58, -0.74]} rotation={[0.42, 0, 0]}>
        <boxGeometry args={[0.98, 0.3, 0.05]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Fastback Rear Glass */}
      <mesh position={[0, 0.56, 0.62]} rotation={[-0.38, 0, 0]}>
        <boxGeometry args={[0.95, 0.32, 0.05]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Side Glass Slits */}
      <mesh position={[0.55, 0.57, -0.05]}>
        <boxGeometry args={[0.02, 0.22, 1.05]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[-0.55, 0.57, -0.05]}>
        <boxGeometry args={[0.02, 0.22, 1.05]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Front Carbon Splitter */}
      <mesh position={[0, 0.14, -1.28]}>
        <boxGeometry args={[1.32, 0.06, 0.14]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      {/* High-Performance Rear Ducktail Spoiler */}
      <group position={[0, 0.54, 1.2]}>
        {/* Spoiler Wing Blade */}
        <mesh castShadow>
          <boxGeometry args={[1.32, 0.05, 0.24]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        {/* Left & Right Wing Mount Stems */}
        <mesh position={[-0.45, -0.12, 0]}>
          <boxGeometry args={[0.05, 0.22, 0.08]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.45, -0.12, 0]}>
          <boxGeometry args={[0.05, 0.22, 0.08]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Twin Chrome Exhaust Pipes */}
      <mesh position={[-0.25, 0.18, 1.26]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.12, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.25, 0.18, 1.26]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.12, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Razor LED Headlights */}
      <mesh position={[-0.45, 0.32, -1.26]}>
        <boxGeometry args={[0.3, 0.08, 0.06]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0.45, 0.32, -1.26]}>
        <boxGeometry args={[0.3, 0.08, 0.06]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.9} />
      </mesh>

      {showHeadlightBeams && (
        <>
          <mesh position={[-0.45, 0.25, -2.6]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.6, 2.8, 16]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.14} depthWrite={false} />
          </mesh>
          <mesh position={[0.45, 0.25, -2.6]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.6, 2.8, 16]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.14} depthWrite={false} />
          </mesh>
        </>
      )}

      {/* Horizontal LED Lightbar Taillight */}
      <mesh position={[0, 0.36, 1.26]}>
        <boxGeometry args={[1.15, 0.08, 0.04]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.9} />
      </mesh>

      {/* 4 Low-Profile Racing Wheels */}
      <LowPolyWheel position={[-0.72, 0.14, -0.76]} wheelRef={frontLeftRef} radius={0.3} rimColor="#e2e8f0" isFront />
      <LowPolyWheel position={[0.72, 0.14, -0.76]} wheelRef={frontRightRef} radius={0.3} rimColor="#e2e8f0" isFront />
      <LowPolyWheel position={[-0.72, 0.15, 0.76]} wheelRef={rearLeftRef} radius={0.32} rimColor="#e2e8f0" />
      <LowPolyWheel position={[0.72, 0.15, 0.76]} wheelRef={rearRightRef} radius={0.32} rimColor="#e2e8f0" />
    </group>
  );
};

// -------------------------------------------------------------
// 3. TERRA 4X4 OFF-ROADER MODEL
// -------------------------------------------------------------
export const OffroaderModel: React.FC<VehicleModelProps> = ({
  color,
  frontLeftRef,
  frontRightRef,
  rearLeftRef,
  rearRightRef,
  showHeadlightBeams = false
}) => {
  return (
    <group>
      {/* Heavy-Duty Lifted Chassis */}
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.32, 0.48, 2.3]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      {/* Angular Boxy SUV Cabin */}
      <mesh position={[0, 0.94, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.14, 0.46, 1.45]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      {/* Upright Front Windshield */}
      <mesh position={[0, 0.94, -0.78]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[1.0, 0.36, 0.05]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.7} />
      </mesh>

      {/* Side Tinted Windows */}
      <mesh position={[0.58, 0.94, -0.05]}>
        <boxGeometry args={[0.02, 0.34, 1.25]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.7} />
      </mesh>
      <mesh position={[-0.58, 0.94, -0.05]}>
        <boxGeometry args={[0.02, 0.34, 1.25]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.7} />
      </mesh>

      {/* Steel Front Bull Bar with Winch Mount */}
      <group position={[0, 0.4, -1.24]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.32, 0.12]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        {/* Twin Amber Fog Spotlights on Bull Bar */}
        <mesh position={[-0.26, 0.18, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 10]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.26, 0.18, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 10]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Roof Luggage Rack with Mounted Spare Tire */}
      <group position={[0, 1.22, -0.05]}>
        {/* Metal Tube Frame */}
        <mesh castShadow>
          <boxGeometry args={[1.05, 0.08, 1.25]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        {/* Spare Tire Clamped to Roof */}
        <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.22, 14]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
      </group>

      {/* Main Square Off-Road Headlights */}
      <mesh position={[-0.42, 0.54, -1.16]}>
        <boxGeometry args={[0.22, 0.18, 0.05]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.85} />
      </mesh>
      <mesh position={[0.42, 0.54, -1.16]}>
        <boxGeometry args={[0.22, 0.18, 0.05]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.85} />
      </mesh>

      {showHeadlightBeams && (
        <>
          <mesh position={[-0.42, 0.38, -2.5]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.65, 2.8, 16]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
          </mesh>
          <mesh position={[0.42, 0.38, -2.5]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.65, 2.8, 16]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
          </mesh>
        </>
      )}

      {/* Chunky Rear Taillights */}
      <mesh position={[-0.46, 0.58, 1.16]}>
        <boxGeometry args={[0.18, 0.22, 0.05]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.46, 0.58, 1.16]}>
        <boxGeometry args={[0.18, 0.22, 0.05]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
      </mesh>

      {/* 4 Oversized Knobby Off-Road Tires with Lifted Stance */}
      <LowPolyWheel position={[-0.76, 0.22, -0.72]} wheelRef={frontLeftRef} radius={0.38} width={0.26} rimColor="#475569" isFront />
      <LowPolyWheel position={[0.76, 0.22, -0.72]} wheelRef={frontRightRef} radius={0.38} width={0.26} rimColor="#475569" isFront />
      <LowPolyWheel position={[-0.76, 0.22, 0.72]} wheelRef={rearLeftRef} radius={0.38} width={0.26} rimColor="#475569" />
      <LowPolyWheel position={[0.76, 0.22, 0.72]} wheelRef={rearRightRef} radius={0.38} width={0.26} rimColor="#475569" />
    </group>
  );
};

// -------------------------------------------------------------
// 4. LIGHTNING GO-KART MODEL
// -------------------------------------------------------------
export const GoKartModel: React.FC<VehicleModelProps> = ({
  color,
  frontLeftRef,
  frontRightRef,
  rearLeftRef,
  rearRightRef,
  showHeadlightBeams = false
}) => {
  return (
    <group>
      {/* Low-Slung Tubular Chassis Floor */}
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.08, 0.14, 2.1]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Front Nose Aerodynamic Wedge */}
      <mesh position={[0, 0.22, -0.78]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.76, 0.12, 0.65]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Front Bumper Splitter Bar */}
      <mesh position={[0, 0.14, -1.18]}>
        <boxGeometry args={[1.25, 0.08, 0.16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>

      {/* Exposed Racing Bucket Seat */}
      <group position={[0, 0.38, 0.08]}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.34, 0.45]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Seat Backrest */}
        <mesh position={[0, 0.26, 0.2]} rotation={[-0.18, 0, 0]} castShadow>
          <boxGeometry args={[0.52, 0.42, 0.1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
      </group>

      {/* Small Race Steering Wheel Column */}
      <group position={[0, 0.45, -0.32]} rotation={[0.45, 0, 0]}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.26, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.14, 0.03, 8, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
      </group>

      {/* Rear High Downforce Spoiler Wing */}
      <group position={[0, 0.68, 0.95]}>
        <mesh castShadow>
          <boxGeometry args={[1.22, 0.05, 0.25]} />
          <meshStandardMaterial color={color} roughness={0.3} />
        </mesh>
        {/* Dual Wing Struts */}
        <mesh position={[-0.32, -0.22, 0]}>
          <boxGeometry args={[0.04, 0.42, 0.06]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.32, -0.22, 0]}>
          <boxGeometry args={[0.04, 0.42, 0.06]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Exposed Chrome Rear Engine & Air Pod */}
      <group position={[0.26, 0.32, 0.58]}>
        <mesh castShadow>
          <boxGeometry args={[0.32, 0.25, 0.35]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Air Filter Cone */}
        <mesh position={[0, 0.18, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.08, 0.18, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.6} />
        </mesh>
      </group>

      {/* Front Nose Round Mini-Headlights */}
      <mesh position={[-0.26, 0.24, -1.08]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0.26, 0.24, -1.08]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.9} />
      </mesh>

      {showHeadlightBeams && (
        <>
          <mesh position={[-0.26, 0.2, -2.4]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.5, 2.5, 14]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
          </mesh>
          <mesh position={[0.26, 0.2, -2.4]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.5, 2.5, 14]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
          </mesh>
        </>
      )}

      {/* 4 Exposed Slick Kart Wheels */}
      <LowPolyWheel position={[-0.68, 0.14, -0.68]} wheelRef={frontLeftRef} radius={0.24} width={0.18} rimColor="#facc15" isFront />
      <LowPolyWheel position={[0.68, 0.14, -0.68]} wheelRef={frontRightRef} radius={0.24} width={0.18} rimColor="#facc15" isFront />
      <LowPolyWheel position={[-0.72, 0.16, 0.68]} wheelRef={rearLeftRef} radius={0.28} width={0.24} rimColor="#facc15" />
      <LowPolyWheel position={[0.72, 0.16, 0.68]} wheelRef={rearRightRef} radius={0.28} width={0.24} rimColor="#facc15" />
    </group>
  );
};

// -------------------------------------------------------------
// 5. MONTEREY VINTAGE ROADSTER MODEL
// -------------------------------------------------------------
export const RoadsterModel: React.FC<VehicleModelProps> = ({
  color,
  frontLeftRef,
  frontRightRef,
  rearLeftRef,
  rearRightRef,
  showHeadlightBeams = false
}) => {
  return (
    <group>
      {/* Sculpted Curvaceous Body */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.28, 0.36, 2.45]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
      </mesh>

      {/* Front Rounded Hood */}
      <mesh position={[0, 0.42, -0.62]} rotation={[0.06, 0, 0]} castShadow>
        <boxGeometry args={[0.98, 0.22, 1.1]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
      </mesh>

      {/* Upright Chrome Vertical Grill */}
      <mesh position={[0, 0.38, -1.24]}>
        <boxGeometry args={[0.48, 0.34, 0.08]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Curved Chrome Windshield Trim */}
      <group position={[0, 0.58, -0.22]} rotation={[0.32, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.05, 0.28, 0.04]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.8} transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.08, 0.03, 0.06]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Open Two-Seater Cockpit Interior */}
      <mesh position={[0, 0.44, 0.16]}>
        <boxGeometry args={[0.95, 0.18, 0.7]} />
        <meshStandardMaterial color="#78350f" roughness={0.8} />
      </mesh>
      {/* Dual Tan Headrests */}
      <mesh position={[-0.24, 0.58, 0.46]} castShadow>
        <boxGeometry args={[0.3, 0.22, 0.12]} />
        <meshStandardMaterial color="#9a3412" roughness={0.7} />
      </mesh>
      <mesh position={[0.24, 0.58, 0.46]} castShadow>
        <boxGeometry args={[0.3, 0.22, 0.12]} />
        <meshStandardMaterial color="#9a3412" roughness={0.7} />
      </mesh>

      {/* Classic Chrome Curved Front & Rear Bumpers */}
      <mesh position={[0, 0.22, -1.26]}>
        <boxGeometry args={[1.32, 0.08, 0.1]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.24, 1.25]}>
        <boxGeometry args={[1.32, 0.08, 0.1]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Prominent Round Classic Headlights */}
      <group position={[-0.42, 0.42, -1.22]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 14]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, -0.05]}>
          <sphereGeometry args={[0.11, 10, 10]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.8} />
        </mesh>
      </group>
      <group position={[0.42, 0.42, -1.22]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 14]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, -0.05]}>
          <sphereGeometry args={[0.11, 10, 10]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {showHeadlightBeams && (
        <>
          <mesh position={[-0.42, 0.25, -2.6]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.6, 2.8, 16]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
          </mesh>
          <mesh position={[0.42, 0.25, -2.6]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.6, 2.8, 16]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
          </mesh>
        </>
      )}

      {/* Retro Round Taillights */}
      <mesh position={[-0.45, 0.42, 1.24]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.45, 0.42, 1.24]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.8} />
      </mesh>

      {/* 4 Classic White-Wall Wheels with Chrome Spoke Hubs */}
      <LowPolyWheel position={[-0.72, 0.15, -0.74]} wheelRef={frontLeftRef} radius={0.32} rimColor="#f8fafc" isFront />
      <LowPolyWheel position={[0.72, 0.15, -0.74]} wheelRef={frontRightRef} radius={0.32} rimColor="#f8fafc" isFront />
      <LowPolyWheel position={[-0.72, 0.15, 0.74]} wheelRef={rearLeftRef} radius={0.32} rimColor="#f8fafc" />
      <LowPolyWheel position={[0.72, 0.15, 0.74]} wheelRef={rearRightRef} radius={0.32} rimColor="#f8fafc" />
    </group>
  );
};

// -------------------------------------------------------------
// 6. METRO DELIVERY VAN MODEL
// -------------------------------------------------------------
export const DeliveryVanModel: React.FC<VehicleModelProps> = ({
  color,
  frontLeftRef,
  frontRightRef,
  rearLeftRef,
  rearRightRef,
  showHeadlightBeams = false
}) => {
  return (
    <group>
      {/* Lower Sturdy Van Base */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.34, 0.45, 2.6]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>

      {/* High-Roof Cargo Body Box */}
      <mesh position={[0, 0.88, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[1.28, 0.65, 2.2]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>

      {/* Cab Roof Slope & Front Visor Brow */}
      <mesh position={[0, 1.08, -0.74]} rotation={[0.18, 0, 0]} castShadow>
        <boxGeometry args={[1.24, 0.1, 0.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Large Wide Panoramic Front Windshield */}
      <mesh position={[0, 0.82, -1.04]} rotation={[0.22, 0, 0]}>
        <boxGeometry args={[1.16, 0.44, 0.05]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Side Cab Windows */}
      <mesh position={[0.65, 0.84, -0.56]}>
        <boxGeometry args={[0.02, 0.38, 0.58]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[-0.65, 0.84, -0.56]}>
        <boxGeometry args={[0.02, 0.38, 0.58]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Contrast White/Gold Side Graphic Accent Panel */}
      <mesh position={[0.65, 0.82, 0.42]}>
        <boxGeometry args={[0.02, 0.35, 1.25]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      <mesh position={[-0.65, 0.82, 0.42]}>
        <boxGeometry args={[0.02, 0.35, 1.25]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>

      {/* Rear Split Cargo Doors Detail */}
      <mesh position={[0, 0.84, 1.19]}>
        <boxGeometry args={[0.04, 0.62, 0.02]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      {/* Door Handles */}
      <mesh position={[-0.08, 0.72, 1.2]}>
        <boxGeometry args={[0.05, 0.04, 0.03]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.72, 1.2]}>
        <boxGeometry args={[0.05, 0.04, 0.03]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.8} />
      </mesh>

      {/* Front Heavy Utility Bumper & Black Grille */}
      <mesh position={[0, 0.28, -1.32]}>
        <boxGeometry args={[1.28, 0.24, 0.12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>

      {/* Large Rectangular Headlights */}
      <mesh position={[-0.44, 0.42, -1.31]}>
        <boxGeometry args={[0.24, 0.16, 0.05]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.85} />
      </mesh>
      <mesh position={[0.44, 0.42, -1.31]}>
        <boxGeometry args={[0.24, 0.16, 0.05]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.85} />
      </mesh>

      {showHeadlightBeams && (
        <>
          <mesh position={[-0.44, 0.28, -2.7]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.65, 2.8, 16]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
          </mesh>
          <mesh position={[0.44, 0.28, -2.7]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.65, 2.8, 16]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
          </mesh>
        </>
      )}

      {/* Vertical Pillar Taillights */}
      <mesh position={[-0.56, 0.85, 1.18]}>
        <boxGeometry args={[0.1, 0.42, 0.04]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.56, 0.85, 1.18]}>
        <boxGeometry args={[0.1, 0.42, 0.04]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
      </mesh>

      {/* 4 Sturdy Solid Rim Wheels */}
      <LowPolyWheel position={[-0.74, 0.16, -0.82]} wheelRef={frontLeftRef} radius={0.34} width={0.24} rimColor="#cbd5e1" isFront />
      <LowPolyWheel position={[0.74, 0.16, -0.82]} wheelRef={frontRightRef} radius={0.34} width={0.24} rimColor="#cbd5e1" isFront />
      <LowPolyWheel position={[-0.74, 0.16, 0.82]} wheelRef={rearLeftRef} radius={0.34} width={0.24} rimColor="#cbd5e1" />
      <LowPolyWheel position={[0.74, 0.16, 0.82]} wheelRef={rearRightRef} radius={0.34} width={0.24} rimColor="#cbd5e1" />
    </group>
  );
};

// -------------------------------------------------------------
// MASTER VEHICLE RENDERER
// -------------------------------------------------------------
export const VehicleModelSwitch: React.FC<{
  vehicleId: VehicleId;
  color: string;
  frontLeftRef?: React.RefObject<THREE.Group | null>;
  frontRightRef?: React.RefObject<THREE.Group | null>;
  rearLeftRef?: React.RefObject<THREE.Group | null>;
  rearRightRef?: React.RefObject<THREE.Group | null>;
  showHeadlightBeams?: boolean;
}> = ({
  vehicleId,
  color,
  frontLeftRef,
  frontRightRef,
  rearLeftRef,
  rearRightRef,
  showHeadlightBeams = false
}) => {
  switch (vehicleId) {
    case 'sports':
      return (
        <SportsCoupeModel
          color={color}
          frontLeftRef={frontLeftRef}
          frontRightRef={frontRightRef}
          rearLeftRef={rearLeftRef}
          rearRightRef={rearRightRef}
          showHeadlightBeams={showHeadlightBeams}
        />
      );
    case 'offroad':
      return (
        <OffroaderModel
          color={color}
          frontLeftRef={frontLeftRef}
          frontRightRef={frontRightRef}
          rearLeftRef={rearLeftRef}
          rearRightRef={rearRightRef}
          showHeadlightBeams={showHeadlightBeams}
        />
      );
    case 'kart':
      return (
        <GoKartModel
          color={color}
          frontLeftRef={frontLeftRef}
          frontRightRef={frontRightRef}
          rearLeftRef={rearLeftRef}
          rearRightRef={rearRightRef}
          showHeadlightBeams={showHeadlightBeams}
        />
      );
    case 'roadster':
      return (
        <RoadsterModel
          color={color}
          frontLeftRef={frontLeftRef}
          frontRightRef={frontRightRef}
          rearLeftRef={rearLeftRef}
          rearRightRef={rearRightRef}
          showHeadlightBeams={showHeadlightBeams}
        />
      );
    case 'van':
      return (
        <DeliveryVanModel
          color={color}
          frontLeftRef={frontLeftRef}
          frontRightRef={frontRightRef}
          rearLeftRef={rearLeftRef}
          rearRightRef={rearRightRef}
          showHeadlightBeams={showHeadlightBeams}
        />
      );
    case 'pickup':
    default:
      return (
        <PickupModel
          color={color}
          frontLeftRef={frontLeftRef}
          frontRightRef={frontRightRef}
          rearLeftRef={rearLeftRef}
          rearRightRef={rearRightRef}
          showHeadlightBeams={showHeadlightBeams}
        />
      );
  }
};
