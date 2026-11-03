import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { RiverRockCluster, StylizedPineTree } from '../environment/StylizedNature';

// -------------------------------------------------------------
// LOW-POLY ANIMATED VERTEX WAVE WATER MESH
// -------------------------------------------------------------
const AnimatedWaterMesh: React.FC = () => {
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  useFrame(({ clock }) => {
    if (!geomRef.current) return;
    const time = clock.getElapsedTime() * 1.4;
    const pos = geomRef.current.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      // Dual rolling sine-cosine waves for natural low-poly surf
      const z =
        Math.sin(u * 0.08 + time) * 0.18 +
        Math.cos(v * 0.12 + time * 0.8) * 0.14 +
        Math.sin((u + v) * 0.06 + time * 1.2) * 0.08;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    geomRef.current.computeVertexNormals();
  });

  return (
    <mesh position={[-58, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry ref={geomRef} args={[210, 280, 42, 42]} />
      <meshStandardMaterial
        color="#0284c7"
        roughness={0.15}
        metalness={0.65}
        transparent
        opacity={0.88}
        flatShading
      />
    </mesh>
  );
};

// Rotating Warm Lighthouse Spotlight Beam
const RotatingLighthouseBeam: React.FC = () => {
  const beamRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (beamRef.current) {
      beamRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={beamRef} position={[0, 11.2, 0]}>
      {/* Golden Warm Spotlight casting over the bay */}
      <spotLight
        color="#fed7aa"
        intensity={8.0}
        distance={90}
        angle={Math.PI / 6}
        penumbra={0.4}
        position={[0, 0, 0]}
        target-position={[40, -4, 0]}
      />
      {/* Visual Light Cone Mesh */}
      <mesh position={[14, -1.0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[4.5, 28, 12, 1, true]} />
        <meshBasicMaterial
          color="#fef08a"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export const CoastalPort: React.FC = () => {
  return (
    <group>
      {/* 1. Expansive Ocean Water Basin (Extends out to Western Horizon) */}
      <group position={[-78, 0, 0]}>
        {/* Ocean Deep Seabed Floor (Replaces grass beneath ocean all the way to horizon) */}
        <mesh position={[-58, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[210, 280]} />
          <meshStandardMaterial color="#075985" roughness={0.9} />
        </mesh>

        {/* Ocean Water Animated Surface Plane (Boundless Open Sea to Western Horizon) */}
        <AnimatedWaterMesh />

        {/* Shoreline Surf Foam Fringe (Gentle white ribbon along quay wall) */}
        <mesh position={[45.2, 0.1, -4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.4, 118]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.42} />
        </mesh>
        {/* Pier Surf Foam Fringe */}
        <mesh position={[38.5, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[14, 10]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>

        {/* Shoreline Stone Quay Embankment Wall (Shoreline at x = -32.2) */}
        {/* North Sea Wall Section (z = -63 to -4) */}
        <RigidBody type="fixed" friction={0.8} position={[45.8, 0.25, -33.5]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.6, 59]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.8} />
          </mesh>
        </RigidBody>

        {/* South Sea Wall Section (z = 4 to +63) */}
        <RigidBody type="fixed" friction={0.8} position={[45.8, 0.25, 33.5]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.6, 59]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.8} />
          </mesh>
        </RigidBody>
      </group>

      {/* 2. Drivable Wooden Pier Deck & Ramp */}
      <group position={[-38, 0, 0]}>
        {/* Gentle Shore Ramp: Leads from shoreline (x = -31, y = 0) up to pier deck (y = 0.3) */}
        <RigidBody type="fixed" friction={0.9} position={[5.5, 0.15, 0]}>
          <mesh rotation={[0, 0, 0.06]} castShadow receiveShadow>
            <boxGeometry args={[5.5, 0.16, 7.8]} />
            <meshStandardMaterial color="#854d0e" roughness={0.7} />
          </mesh>
        </RigidBody>

        {/* Main Wooden Pier Deck (Extends out over open water from x = -33 to x = -47) */}
        <RigidBody type="fixed" friction={0.9} position={[-2.5, 0.3, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[11.5, 0.24, 7.8]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>

          {/* Planks visual detail (decorative wooden cross-slats) */}
          {[-5, -4, -3, -2, -1, 0, 1, 2, 3].map((px) => (
            <mesh key={`plank-${px}`} position={[px, 0.13, 0]}>
              <boxGeometry args={[0.09, 0.02, 7.78]} />
              <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
          ))}
        </RigidBody>

        {/* Pier Safety Curbs & Bollards */}
        {/* North Edge Curb */}
        <RigidBody type="fixed" friction={0.6} position={[-2.5, 0.48, -3.8]}>
          <mesh castShadow>
            <boxGeometry args={[11.5, 0.22, 0.25]} />
            <meshStandardMaterial color="#a16207" roughness={0.6} />
          </mesh>
        </RigidBody>

        {/* South Edge Curb */}
        <RigidBody type="fixed" friction={0.6} position={[-2.5, 0.48, 3.8]}>
          <mesh castShadow>
            <boxGeometry args={[11.5, 0.22, 0.25]} />
            <meshStandardMaterial color="#a16207" roughness={0.6} />
          </mesh>
        </RigidBody>

        {/* West End Stop Curb */}
        <RigidBody type="fixed" friction={0.6} position={[-8.15, 0.48, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.25, 0.22, 7.8]} />
            <meshStandardMaterial color="#a16207" roughness={0.6} />
          </mesh>
        </RigidBody>

        {/* Timber Pilings underneath pier into the water */}
        {[-7.5, -4.5, -1.5, 1.5].map((x) =>
          [-3.4, 3.4].map((z) => (
            <mesh key={`pile-${x}-${z}`} position={[x, -0.3, z]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 1.1, 10]} />
              <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
          ))
        )}

        {/* Mooring Bollards */}
        {[-7.0, -3.5, 0.0].map((x) =>
          [-3.5, 3.5].map((z) => (
            <group key={`bollard-${x}-${z}`} position={[x, 0.5, z]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.14, 0.16, 0.32, 12]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
              </mesh>
              <mesh position={[0, 0.16, 0]}>
                <sphereGeometry args={[0.16, 12, 8]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
              </mesh>
            </group>
          ))
        )}

        {/* Port Signboard at Pier Entrance */}
        <group position={[6.8, 1.8, 4.4]} rotation={[0, -Math.PI / 6, 0]}>
          <mesh castShadow>
            <boxGeometry args={[2.6, 1.1, 0.12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          <Text
            position={[0, 0.2, 0.07]}
            fontSize={0.28}
            fontWeight={800}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            WEST HARBOR
          </Text>
          <Text
            position={[0, -0.2, 0.07]}
            fontSize={0.16}
            fontWeight={600}
            color="#cbd5e1"
            anchorX="center"
            anchorY="middle"
          >
            PORT OF ANIKETH
          </Text>
          {/* Post */}
          <mesh position={[0, -1.1, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 2.2, 8]} />
            <meshStandardMaterial color="#475569" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* 3. Moored Fishing Boat / Tugboat (Parked at South Pier Edge) */}
      <group position={[-42, 0, 10.5]}>
        <RigidBody type="fixed" friction={0.6}>
          {/* Boat Hull */}
          <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.2, 0.8, 2.6]} />
            <meshStandardMaterial color="#0369a1" roughness={0.5} />
          </mesh>
          {/* Pointed Bow */}
          <mesh position={[3.0, 0.36, 0]} rotation={[0, 0, 0.3]} castShadow>
            <coneGeometry args={[1.3, 1.6, 4]} />
            <meshStandardMaterial color="#0284c7" roughness={0.5} />
          </mesh>

          {/* Wooden Deck Trim */}
          <mesh position={[0, 0.75, 0]}>
            <boxGeometry args={[5.0, 0.09, 2.4]} />
            <meshStandardMaterial color="#78350f" roughness={0.7} />
          </mesh>

          {/* Wheelhouse Cabin */}
          <mesh position={[-0.5, 1.45, 0]} castShadow>
            <boxGeometry args={[2.2, 1.3, 1.6]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          {/* Cabin Roof */}
          <mesh position={[-0.5, 2.15, 0]} castShadow>
            <boxGeometry args={[2.4, 0.14, 1.8]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
          {/* Windows */}
          <mesh position={[0.61, 1.55, 0]}>
            <planeGeometry args={[0.02, 0.6, 1.2]} />
            <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.9} />
          </mesh>

          {/* Smokestack */}
          <mesh position={[-1.8, 1.8, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.22, 1.4, 12]} />
            <meshStandardMaterial color="#ea580c" roughness={0.3} />
          </mesh>
          <mesh position={[-1.8, 2.45, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.18, 12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>

          {/* Lifebuoy on Cabin Wall */}
          <mesh position={[-0.5, 1.5, 0.82]}>
            <torusGeometry args={[0.22, 0.07, 8, 16]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} />
          </mesh>
        </RigidBody>
      </group>

      {/* 4. Classic Striped Lighthouse (Rocky North-West Coastal Bluff) */}
      <group position={[-36, 0, -25]}>
        <RigidBody type="fixed" friction={0.6}>
          {/* Stone Base Plinth */}
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[3.4, 3.8, 1.0, 12]} />
            <meshStandardMaterial color="#64748b" roughness={0.8} />
          </mesh>

          {/* Lighthouse Tower Shaft (Tapered, Alternating Red and White Rings) */}
          <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[2.6, 3.0, 2.4, 16]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
          <mesh position={[0, 4.6, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[2.2, 2.6, 2.4, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>
          <mesh position={[0, 7.0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.8, 2.2, 2.4, 16]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
          <mesh position={[0, 9.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.8, 2.0, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>

          {/* Gallery Balcony Deck */}
          <mesh position={[0, 10.35, 0]} castShadow>
            <cylinderGeometry args={[2.2, 2.2, 0.35, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>

          {/* Lantern Room (Glass with Warm Beacon Glow) */}
          <mesh position={[0, 11.2, 0]}>
            <cylinderGeometry args={[1.3, 1.3, 1.4, 12]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#f59e0b"
              emissiveIntensity={1.2}
              roughness={0.1}
            />
          </mesh>

          {/* Rotating Animated Lighthouse Spotlight Beam */}
          <RotatingLighthouseBeam />

          {/* Conical Copper Cap */}
          <mesh position={[0, 12.5, 0]} castShadow>
            <coneGeometry args={[1.8, 1.3, 16]} />
            <meshStandardMaterial color="#047857" roughness={0.4} />
          </mesh>
        </RigidBody>

        {/* Coastal Bluff Rocks & Shoreline Pines */}
        <RiverRockCluster position={[-4.5, 0, -2]} scale={1.8} />
        <RiverRockCluster position={[3.8, 0, 3.5]} scale={1.4} />
        <StylizedPineTree position={[4.5, 0, -3]} scale={1.3} />
        <StylizedPineTree position={[-3.5, 0, 4]} scale={1.1} />
      </group>
    </group>
  );
};
