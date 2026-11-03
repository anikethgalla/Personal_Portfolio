import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

// -------------------------------------------------------------
// 1. STYLIZED LOW-POLY OAK / DECIDUOUS TREE
// -------------------------------------------------------------
interface OakTreeProps {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  color?: string;
  autumn?: boolean;
}

export const StylizedOakTree: React.FC<OakTreeProps> = ({
  position,
  scale = 1,
  rotation = [0, 0, 0],
  color,
  autumn = false
}) => {
  // Vibrant curated low-poly palette
  const foliageColor = useMemo(() => {
    if (color) return color;
    if (autumn) return '#f59e0b'; // Warm amber/gold
    return '#559c19'; // Rich moss emerald
  }, [color, autumn]);

  const secondaryColor = useMemo(() => {
    if (autumn) return '#ea580c';
    return '#3f7c10';
  }, [autumn]);

  const highlightColor = useMemo(() => {
    if (autumn) return '#fbbf24';
    return '#6cb324';
  }, [autumn]);

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Physics Solid Trunk Collider */}
      <RigidBody type="fixed" colliders="hull" friction={0.7}>
        {/* Tapered organic trunk with exposed root flair */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.42, 2.0, 7]} />
          <meshStandardMaterial color="#643b17" roughness={0.9} flatShading />
        </mesh>
        {/* Root flair bumps */}
        <mesh position={[0.25, 0.15, 0.15]} rotation={[0.4, 0.2, -0.3]}>
          <boxGeometry args={[0.22, 0.35, 0.3]} />
          <meshStandardMaterial color="#533013" roughness={0.95} flatShading />
        </mesh>
        <mesh position={[-0.2, 0.15, -0.2]} rotation={[-0.3, 0.4, 0.4]}>
          <boxGeometry args={[0.2, 0.32, 0.28]} />
          <meshStandardMaterial color="#533013" roughness={0.95} flatShading />
        </mesh>
        <mesh position={[-0.15, 0.12, 0.22]} rotation={[0.2, -0.4, 0.3]}>
          <boxGeometry args={[0.18, 0.28, 0.24]} />
          <meshStandardMaterial color="#533013" roughness={0.95} flatShading />
        </mesh>
      </RigidBody>

      {/* Multi-Tier Faceted Low-Poly Foliage Crown */}
      <group position={[0, 2.7, 0]}>
        {/* Main Central Crown (Faceted Icosahedron) */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial color={foliageColor} roughness={0.75} flatShading />
        </mesh>
        {/* Top-Right Secondary Cluster */}
        <mesh position={[0.45, 0.65, 0.3]} castShadow>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial color={highlightColor} roughness={0.75} flatShading />
        </mesh>
        {/* Left Lower Cluster */}
        <mesh position={[-0.55, -0.2, 0.35]} castShadow>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.75} flatShading />
        </mesh>
        {/* Rear Cluster */}
        <mesh position={[0.1, -0.15, -0.6]} castShadow>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.75} flatShading />
        </mesh>
        {/* Crown Peak Puff */}
        <mesh position={[-0.2, 0.95, -0.1]} castShadow>
          <icosahedronGeometry args={[0.75, 1]} />
          <meshStandardMaterial color={highlightColor} roughness={0.7} flatShading />
        </mesh>
      </group>
    </group>
  );
};

// -------------------------------------------------------------
// 2. STYLIZED LOW-POLY PINE / EVERGREEN TREE
// -------------------------------------------------------------
export const StylizedPineTree: React.FC<{
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}> = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Trunk */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.28, 1.5, 6]} />
        <meshStandardMaterial color="#533013" roughness={0.9} flatShading />
      </mesh>

      {/* Tier 1 (Bottom Broad Tier) */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <coneGeometry args={[1.65, 1.9, 7]} />
        <meshStandardMaterial color="#274614" roughness={0.7} flatShading />
      </mesh>
      {/* Tier 2 (Middle Tier) */}
      <mesh position={[0, 2.9, 0]} castShadow>
        <coneGeometry args={[1.3, 1.7, 7]} />
        <meshStandardMaterial color="#33581a" roughness={0.7} flatShading />
      </mesh>
      {/* Tier 3 (Top Spire Tier) */}
      <mesh position={[0, 3.95, 0]} castShadow>
        <coneGeometry args={[0.85, 1.4, 7]} />
        <meshStandardMaterial color="#426e22" roughness={0.65} flatShading />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// 3. BLOOMING GARDEN SHRUB / FLOWER BUSH
// -------------------------------------------------------------
export const BloomingShrub: React.FC<{
  position: [number, number, number];
  scale?: number;
  flowerColor?: string;
}> = ({ position, scale = 1, flowerColor = '#f43f5e' }) => {
  return (
    <group position={position} scale={scale}>
      {/* Base Bush (Faceted Icosahedron) */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshStandardMaterial color="#4d7c0f" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0.22, 0.28, 0.15]} castShadow>
        <icosahedronGeometry args={[0.36, 1]} />
        <meshStandardMaterial color="#3f6212" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[-0.2, 0.26, -0.1]} castShadow>
        <icosahedronGeometry args={[0.34, 1]} />
        <meshStandardMaterial color="#65a30d" roughness={0.8} flatShading />
      </mesh>

      {/* Colorful Flower Blossoms scattered across bush */}
      {[
        [-0.15, 0.55, 0.3],
        [0.25, 0.48, 0.25],
        [0.05, 0.72, 0.05],
        [-0.28, 0.38, -0.18],
        [0.32, 0.35, -0.12]
      ].map(([x, y, z], i) => (
        <mesh key={`flower-${i}`} position={[x, y, z]}>
          <dodecahedronGeometry args={[0.075, 0]} />
          <meshStandardMaterial color={flowerColor} roughness={0.4} emissive={flowerColor} emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  );
};

// -------------------------------------------------------------
// 4. RIVER PEBBLE & ROCK CLUSTER
// -------------------------------------------------------------
export const RiverRockCluster: React.FC<{
  position: [number, number, number];
  scale?: number;
}> = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.18, 0]} rotation={[0.2, 0.5, 0.1]} castShadow>
        <dodecahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0.32, 0.12, 0.2]} rotation={[-0.3, 0.2, 0.4]} castShadow>
        <dodecahedronGeometry args={[0.24, 0]} />
        <meshStandardMaterial color="#64748b" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[-0.26, 0.09, -0.15]} rotation={[0.4, -0.3, 0.2]} castShadow>
        <dodecahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} flatShading />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// 5. MICRO-DETAIL STREET FURNITURE: FIRE HYDRANT
// -------------------------------------------------------------
export const FireHydrant: React.FC<{ position: [number, number, number]; rotationY?: number }> = ({
  position,
  rotationY = 0
}) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Base Flange */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.12, 8]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Main Hydrant Body */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.52, 8]} />
        <meshStandardMaterial color="#ef4444" roughness={0.35} metalness={0.2} />
      </mesh>
      {/* Domed Cap */}
      <mesh position={[0, 0.68, 0]} castShadow>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} />
      </mesh>
      {/* Top Nut */}
      <mesh position={[0, 0.81, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.06, 5]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Side Brass Hose Nozzles */}
      {[-0.15, 0.15].map((x) => (
        <group key={`nozzle-${x}`} position={[x, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 8]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, x > 0 ? 0.045 : -0.045, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.02, 5]} />
            <meshStandardMaterial color="#d97706" roughness={0.4} metalness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// -------------------------------------------------------------
// 6. MICRO-DETAIL STREET FURNITURE: WARM ARCHITECTURAL STREET LAMP
// -------------------------------------------------------------
export const WarmStreetLamp: React.FC<{
  position: [number, number, number];
  rotationY?: number;
}> = ({ position, rotationY = 0 }) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Ornamental Cast-Iron Base */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.28, 0.5, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.18, 0.12, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Main Fluted Pole */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.095, 3.2, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Curved Gooseneck Arm */}
      <group position={[0.3, 3.75, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.85, 8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      {/* Hanging Vintage Lantern Housing */}
      <group position={[0.62, 3.72, 0]}>
        {/* Lantern Hood Cap */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <coneGeometry args={[0.32, 0.2, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Glowing Amber Glass Bulb with Golden Hour Warmth */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.16, 0.12, 0.26, 8]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#fbbf24"
            emissiveIntensity={1.8}
            roughness={0.1}
            transparent
            opacity={0.92}
          />
        </mesh>
        {/* Subtle Warm Amber Glow Light Source */}
        <pointLight position={[0, -0.05, 0]} color="#fbbf24" intensity={1.2} distance={8} decay={2} />
      </group>
    </group>
  );
};

// -------------------------------------------------------------
// 7. MICRO-DETAIL STREET FURNITURE: WOODEN PARK BENCH
// -------------------------------------------------------------
export const StylizedParkBench: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Cast-Iron Legs */}
      {[-0.8, 0.8].map((x) => (
        <group key={`leg-${x}`} position={[x, 0, 0]}>
          <mesh position={[0, 0.22, 0]} castShadow>
            <boxGeometry args={[0.08, 0.44, 0.48]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.58, -0.22]} rotation={[0.12, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 0.42, 0.08]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.6} />
          </mesh>
          {/* Curved Armrest */}
          <mesh position={[0, 0.48, 0.04]} castShadow>
            <boxGeometry args={[0.08, 0.08, 0.44]} />
            <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Rich Teak Wood Seat Slats */}
      {[-0.14, 0.0, 0.14].map((z, idx) => (
        <mesh key={`seat-slat-${idx}`} position={[0, 0.43, z]} castShadow>
          <boxGeometry args={[1.85, 0.05, 0.11]} />
          <meshStandardMaterial color="#854d0e" roughness={0.7} />
        </mesh>
      ))}

      {/* Backrest Slats */}
      {[0.58, 0.72].map((y, idx) => (
        <mesh key={`back-slat-${idx}`} position={[0, y, -0.22]} rotation={[0.12, 0, 0]} castShadow>
          <boxGeometry args={[1.85, 0.11, 0.04]} />
          <meshStandardMaterial color="#854d0e" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
};

// -------------------------------------------------------------
// 8. SIDEWALK FLOWER PLANTER BOX
// -------------------------------------------------------------
export const SidewalkPlanterBox: React.FC<{
  position: [number, number, number];
  rotationY?: number;
}> = ({ position, rotationY = 0 }) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Terracotta/Concrete Trough */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.44, 0.55]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.32, 0.05, 0.48]} />
        <meshStandardMaterial color="#451a03" roughness={0.95} />
      </mesh>
      {/* Lush Foliage & Flowers */}
      {[-0.45, -0.15, 0.15, 0.45].map((x, i) => (
        <group key={`planter-plant-${i}`} position={[x, 0.46, (i % 2 === 0 ? 0.06 : -0.06)]}>
          <mesh castShadow>
            <sphereGeometry args={[0.18, 7, 6]} />
            <meshStandardMaterial color="#65a30d" roughness={0.7} flatShading />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <dodecahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#f43f5e' : '#fbbf24'}
              emissive={i % 2 === 0 ? '#f43f5e' : '#fbbf24'}
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// -------------------------------------------------------------
// 9. GRAND STYLIZED TIERED WATER FOUNTAIN
// -------------------------------------------------------------
export const StylizedFountain: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  const waterJetRef = useRef<THREE.Group>(null);
  const rippleRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (waterJetRef.current) {
      waterJetRef.current.scale.y = 1 + Math.sin(t * 7) * 0.09;
      waterJetRef.current.rotation.y = t * 0.4;
    }
    if (rippleRef.current) {
      const s = 1 + Math.sin(t * 3.5) * 0.025;
      rippleRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Stone Plaza Cobblestone Apron Ring */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[5.2, 5.4, 0.04, 36]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.75} />
      </mesh>

      {/* Physics Solid Basin Wall */}
      <RigidBody type="fixed" colliders="hull" friction={0.8}>
        {/* Outer Stone Basin Wall */}
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[4.1, 4.3, 0.74, 32]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>
        {/* Carved Beveled Outer Rim Lip */}
        <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[4.28, 4.08, 0.14, 32]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
        </mesh>
      </RigidBody>

      {/* Main Lower Basin Water Pool (Shimmering Cyan) */}
      <mesh ref={rippleRef} position={[0, 0.68, 0]} receiveShadow>
        <cylinderGeometry args={[3.92, 3.92, 0.04, 32]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.06}
          metalness={0.75}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Central Pedestal Column */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 1.35, 0.8, 16]} />
        <meshStandardMaterial color="#64748b" roughness={0.75} />
      </mesh>
      <mesh position={[0, 1.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.7, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.65} />
      </mesh>

      {/* Tier 2 Middle Carved Stone Bowl */}
      <mesh position={[0, 1.78, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 0.8, 0.4, 24]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.94, 0]} castShadow>
        <cylinderGeometry args={[2.3, 2.15, 0.09, 24]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
      </mesh>
      {/* Tier 2 Water Surface */}
      <mesh position={[0, 1.88, 0]}>
        <cylinderGeometry args={[2.08, 2.08, 0.04, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.08}
          metalness={0.7}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Tier 2 to Tier 3 Column */}
      <mesh position={[0, 2.3, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.5, 0.72, 12]} />
        <meshStandardMaterial color="#64748b" roughness={0.7} />
      </mesh>

      {/* Tier 3 Top Carved Stone Bowl */}
      <mesh position={[0, 2.72, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.15, 0.45, 0.32, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
      </mesh>
      <mesh position={[0, 2.82, 0]}>
        <cylinderGeometry args={[1.08, 1.08, 0.04, 16]} />
        <meshStandardMaterial color="#7dd3fc" roughness={0.08} metalness={0.8} />
      </mesh>

      {/* Top Golden Finial Spire */}
      <mesh position={[0, 3.05, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.22, 0.38, 12]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0, 3.28, 0]} castShadow>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Animated Upward Water Geyser Jet */}
      <group ref={waterJetRef} position={[0, 3.36, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <coneGeometry args={[0.24, 1.0, 12]} />
          <meshStandardMaterial
            color="#bae6fd"
            emissive="#38bdf8"
            emissiveIntensity={0.6}
            roughness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <sphereGeometry args={[0.28, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#e0f2fe"
            emissiveIntensity={0.8}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>

      {/* Cascading Water Streams: Top Bowl into Middle Bowl (4 streams) */}
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => {
        const sx = Math.cos(angle) * 1.1;
        const sz = Math.sin(angle) * 1.1;
        return (
          <mesh key={`stream-top-${i}`} position={[sx, 2.3, sz]}>
            <cylinderGeometry args={[0.045, 0.085, 0.85, 6]} />
            <meshStandardMaterial
              color="#e0f2fe"
              emissive="#38bdf8"
              emissiveIntensity={0.5}
              transparent
              opacity={0.75}
            />
          </mesh>
        );
      })}

      {/* Cascading Water Streams: Middle Bowl into Lower Basin (8 streams) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const sx = Math.cos(angle) * 2.15;
        const sz = Math.sin(angle) * 2.15;
        return (
          <mesh key={`stream-mid-${i}`} position={[sx, 1.25, sz]}>
            <cylinderGeometry args={[0.05, 0.11, 1.1, 6]} />
            <meshStandardMaterial
              color="#e0f2fe"
              emissive="#38bdf8"
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}

      {/* Under-Water Point Light (Glows with rich turquoise-cyan light in the evening) */}
      <pointLight position={[0, 1.4, 0]} color="#38bdf8" intensity={2.2} distance={8} decay={2} />
    </group>
  );
};

