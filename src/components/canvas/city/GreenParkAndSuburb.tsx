import React from 'react';
import { RigidBody } from '@react-three/rapier';

interface TreeProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
}

const LowPolyTree: React.FC<TreeProps> = ({ position, scale = 1, color = '#65a30d' }) => {
  return (
    <group position={position} scale={scale}>
      {/* Solid Trunk Collider */}
      <RigidBody type="fixed" colliders="hull" friction={0.6}>
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.28, 1.6, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Fluffy Multi-Sphere Foliage Crown */}
      <group position={[0, 2.3, 0]}>
        {/* Main Center Sphere */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[1.2, 10, 8]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        {/* Top Sphere */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <sphereGeometry args={[0.85, 10, 8]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        {/* Side Clusters */}
        <mesh position={[0.45, -0.2, 0.35]} castShadow>
          <sphereGeometry args={[0.7, 8, 8]} />
          <meshStandardMaterial color="#4d7c0f" roughness={0.6} />
        </mesh>
        <mesh position={[-0.45, -0.2, -0.35]} castShadow>
          <sphereGeometry args={[0.7, 8, 8]} />
          <meshStandardMaterial color="#3f6212" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

const StreetLamp: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 2.8, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      {/* Curved arm */}
      <mesh position={[0.2, 2.7, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      {/* Glowing Lantern Bulb */}
      <mesh position={[0.35, 2.75, 0]}>
        <sphereGeometry args={[0.16, 12, 8]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

const ParkBench: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({
  position,
  rotation = [0, 0, 0]
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Wooden Slats Seat */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[1.4, 0.06, 0.45]} />
        <meshStandardMaterial color="#854d0e" roughness={0.7} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.55, -0.2]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[1.4, 0.35, 0.05]} />
        <meshStandardMaterial color="#854d0e" roughness={0.7} />
      </mesh>
      {/* Iron Legs */}
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} position={[x, 0.14, 0]} castShadow>
          <boxGeometry args={[0.06, 0.28, 0.4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};

export const GreenParkAndSuburb: React.FC = () => {
  return (
    <group>
      {/* ======================================================== */}
      {/* 1. GREEN GRASS LAWN PLATES (Drivable organic terrain)    */}
      {/* ======================================================== */}
      {/* Central Park Lawn surrounding the Skills Plaza */}
      <mesh position={[-16, 0.015, -4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 14]} />
        <meshStandardMaterial color="#65a30d" roughness={0.9} />
      </mesh>

      {/* Residential Suburb North Lawn */}
      <mesh position={[-20, 0.015, -14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#5ea508" roughness={0.9} />
      </mesh>

      {/* Residential Suburb South Lawn */}
      <mesh position={[-20, 0.015, 8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#65a30d" roughness={0.9} />
      </mesh>

      {/* East-West Garden Pathway / Parkway */}
      <mesh position={[-10, 0.018, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 18]} />
        <meshStandardMaterial color="#72a818" roughness={0.9} />
      </mesh>

      {/* ======================================================== */}
      {/* 2. CLUSTER OF LOW-POLY CLAY HOUSES (Decorative Scenery)  */}
      {/* ======================================================== */}

      {/* HOUSE 1: Country Cottage (Cream & Terracotta) at [-20, 0, 8] */}
      <group position={[-20, 0, 8]}>
        <RigidBody type="fixed" friction={0.7}>
          {/* Main Body */}
          <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.4, 2.8, 3.6]} />
            <meshStandardMaterial color="#fefaf6" roughness={0.6} />
          </mesh>

          {/* Gabled Roof (Terracotta Clay) */}
          <mesh position={[0, 3.2, 0]} rotation={[0, 0, 0]} castShadow>
            <boxGeometry args={[4.8, 0.15, 4.0]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>
          <mesh position={[-0.8, 3.65, 0]} rotation={[0, 0, 0.55]} castShadow>
            <boxGeometry args={[2.2, 0.15, 4.0]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>
          <mesh position={[0.8, 3.65, 0]} rotation={[0, 0, -0.55]} castShadow>
            <boxGeometry args={[2.2, 0.15, 4.0]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>

          {/* Brick Chimney */}
          <mesh position={[1.4, 4.2, 0.6]} castShadow>
            <boxGeometry args={[0.5, 1.2, 0.5]} />
            <meshStandardMaterial color="#991b1b" roughness={0.7} />
          </mesh>

          {/* Front Door & Stoop (Facing +X towards neighborhood street) */}
          <mesh position={[2.22, 0.9, 0]}>
            <boxGeometry args={[0.04, 1.8, 0.9]} />
            <meshStandardMaterial color="#78350f" roughness={0.5} />
          </mesh>
          <mesh position={[2.45, 0.15, 0]} castShadow>
            <boxGeometry args={[0.5, 0.3, 1.2]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
          </mesh>

          {/* Windows with White Frames */}
          <mesh position={[2.22, 1.8, 1.1]}>
            <boxGeometry args={[0.04, 0.8, 0.7]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[2.22, 1.8, -1.1]}>
            <boxGeometry args={[0.04, 0.8, 0.7]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>
        </RigidBody>
      </group>

      {/* HOUSE 2: Split-Level Villa (Slate Blue & Dark Roof) at [-21, 0, -11] */}
      <group position={[-21, 0, -11]}>
        <RigidBody type="fixed" friction={0.7}>
          {/* Main Two-Story Wing */}
          <mesh position={[0, 2.0, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.6, 4.0, 3.8]} />
            <meshStandardMaterial color="#64748b" roughness={0.6} />
          </mesh>
          {/* Flat Parapet Slate Roof */}
          <mesh position={[0, 4.1, 0]} castShadow>
            <boxGeometry args={[4.9, 0.3, 4.1]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>

          {/* Single-Story Garage / Sunroom Wing */}
          <mesh position={[0.2, 1.1, 2.8]} castShadow receiveShadow>
            <boxGeometry args={[4.0, 2.2, 2.0]} />
            <meshStandardMaterial color="#475569" roughness={0.6} />
          </mesh>
          <mesh position={[0.2, 2.25, 2.8]} castShadow>
            <boxGeometry args={[4.2, 0.2, 2.2]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          {/* Garage Door */}
          <mesh position={[2.22, 0.9, 2.8]}>
            <boxGeometry args={[0.04, 1.6, 1.6]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
          </mesh>

          {/* Large Modern Picture Windows */}
          <mesh position={[2.32, 2.4, 0]}>
            <boxGeometry args={[0.04, 1.2, 2.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
          </mesh>
        </RigidBody>
      </group>

      {/* HOUSE 3: Craftsman Home (Warm Ochre & Brown) at [-23, 0, -1] */}
      <group position={[-23, 0, -1]}>
        <RigidBody type="fixed" friction={0.7}>
          {/* Base Structure */}
          <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.0, 3.0, 4.2]} />
            <meshStandardMaterial color="#d97706" roughness={0.6} />
          </mesh>
          {/* Gabled Timber Roof */}
          <mesh position={[-0.7, 3.6, 0]} rotation={[0, 0, 0.5]} castShadow>
            <boxGeometry args={[2.2, 0.15, 4.5]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>
          <mesh position={[0.7, 3.6, 0]} rotation={[0, 0, -0.5]} castShadow>
            <boxGeometry args={[2.2, 0.15, 4.5]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>

          {/* Front Porch Awning */}
          <mesh position={[2.3, 1.6, 0]} rotation={[0, 0, -0.2]} castShadow>
            <boxGeometry args={[1.2, 0.08, 2.4]} />
            <meshStandardMaterial color="#92400e" roughness={0.6} />
          </mesh>
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* 3. FLUFFY LOW-POLY TREES (Park, Suburb & Street Scenery) */}
      {/* ======================================================== */}
      {/* Park Perimeter Trees */}
      <LowPolyTree position={[-11, 0, -10]} scale={1.1} color="#65a30d" />
      <LowPolyTree position={[-11, 0, -2]} scale={1.0} color="#4d7c0f" />
      <LowPolyTree position={[-10.5, 0, 5]} scale={1.2} color="#65a30d" />
      <LowPolyTree position={[-11, 0, 12]} scale={1.05} color="#3f6212" />

      {/* Inland Suburb Trees */}
      <LowPolyTree position={[-16, 0, -13]} scale={1.15} color="#4d7c0f" />
      <LowPolyTree position={[-23, 0, -16]} scale={1.3} color="#65a30d" />
      <LowPolyTree position={[-25, 0, -7]} scale={1.0} color="#3f6212" />
      <LowPolyTree position={[-16, 0, 5]} scale={0.95} color="#65a30d" />
      <LowPolyTree position={[-16, 0, 13]} scale={1.2} color="#4d7c0f" />
      <LowPolyTree position={[-23, 0, 14]} scale={1.25} color="#65a30d" />

      {/* Waterfront Promenade Trees */}
      <LowPolyTree position={[-22, 0, 2.8]} scale={0.9} color="#65a30d" />
      <LowPolyTree position={[-22, 0, -4.5]} scale={0.9} color="#4d7c0f" />

      {/* ======================================================== */}
      {/* 4. PARK FURNITURE & STREET LIGHTING                     */}
      {/* ======================================================== */}
      {/* Park Benches facing the Skills Wall Plaza */}
      <ParkBench position={[-13, 0, -4]} rotation={[0, -Math.PI / 2, 0]} />
      <ParkBench position={[-16, 0, -9.5]} rotation={[0, 0, 0]} />
      <ParkBench position={[-16, 0, 1.8]} rotation={[0, Math.PI, 0]} />

      {/* Streetlamps along the parkway and suburb street */}
      <StreetLamp position={[-12.5, 0, -7]} />
      <StreetLamp position={[-12.5, 0, 2]} />
      <StreetLamp position={[-19, 0, -2]} />
      <StreetLamp position={[-19, 0, 13]} />
      <StreetLamp position={[-21, 0, 4]} />
    </group>
  );
};
