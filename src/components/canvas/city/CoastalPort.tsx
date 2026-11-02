import React from 'react';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export const CoastalPort: React.FC = () => {
  return (
    <group>
      {/* 1. Low-Poly Water Basin (West Coast) */}
      <group position={[-30, 0.06, 0]}>
        {/* Water Surface Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[16, 55]} />
          <meshStandardMaterial
            color="#0ea5e9"
            roughness={0.12}
            metalness={0.8}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Shoreline Stone Pier Embankment / Quay Wall */}
        <mesh position={[7.8, 0.12, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.45, 55]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} />
        </mesh>
      </group>

      {/* 2. Drivable Wooden Pier Deck & Ramp */}
      <group position={[-25, 0, 0]}>
        {/* Gentle Shore Ramp: Leads from ground (y=0) up to pier deck (y=0.28) */}
        <RigidBody type="fixed" friction={0.9} position={[3.5, 0.14, 0]}>
          <mesh rotation={[0, 0, 0.07]} castShadow receiveShadow>
            <boxGeometry args={[4.2, 0.15, 6.2]} />
            <meshStandardMaterial color="#854d0e" roughness={0.7} />
          </mesh>
        </RigidBody>

        {/* Main Wooden Pier Deck (Extends over water from x = -21.5 to -31.5) */}
        <RigidBody type="fixed" friction={0.9} position={[-2.5, 0.28, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[8.5, 0.22, 6.2]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>

          {/* Planks visual detail (decorative wooden cross-slats) */}
          {[-3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5].map((px, i) => (
            <mesh key={`plank-${i}`} position={[px, 0.12, 0]}>
              <boxGeometry args={[0.08, 0.02, 6.18]} />
              <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
          ))}
        </RigidBody>

        {/* Pier Safety Curbs & Bollards */}
        {/* North Edge Curb */}
        <RigidBody type="fixed" friction={0.6} position={[-2.5, 0.45, -3.0]}>
          <mesh castShadow>
            <boxGeometry args={[8.5, 0.18, 0.2]} />
            <meshStandardMaterial color="#a16207" roughness={0.6} />
          </mesh>
        </RigidBody>

        {/* South Edge Curb */}
        <RigidBody type="fixed" friction={0.6} position={[-2.5, 0.45, 3.0]}>
          <mesh castShadow>
            <boxGeometry args={[8.5, 0.18, 0.2]} />
            <meshStandardMaterial color="#a16207" roughness={0.6} />
          </mesh>
        </RigidBody>

        {/* West End Stop Curb */}
        <RigidBody type="fixed" friction={0.6} position={[-6.65, 0.45, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.18, 6.2]} />
            <meshStandardMaterial color="#a16207" roughness={0.6} />
          </mesh>
        </RigidBody>

        {/* Timber Pilings underneath pier into the water */}
        {[-6.0, -3.0, 0.0].map((x) =>
          [-2.6, 2.6].map((z) => (
            <mesh key={`pile-${x}-${z}`} position={[x, -0.2, z]} castShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.9, 10]} />
              <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
          ))
        )}

        {/* Mooring Bollards */}
        {[-5.5, -2.0].map((x) =>
          [-2.7, 2.7].map((z) => (
            <group key={`bollard-${x}-${z}`} position={[x, 0.45, z]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.12, 0.14, 0.28, 12]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
              </mesh>
              <mesh position={[0, 0.14, 0]}>
                <sphereGeometry args={[0.14, 12, 8]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
              </mesh>
            </group>
          ))
        )}

        {/* Port Signboard on Pier Ramp Entrance */}
        <group position={[4.2, 1.8, 3.6]} rotation={[0, -Math.PI / 6, 0]}>
          <mesh castShadow>
            <boxGeometry args={[2.2, 0.9, 0.1]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          <Text
            position={[0, 0.16, 0.06]}
            fontSize={0.24}
            fontWeight={800}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            WEST HARBOR
          </Text>
          <Text
            position={[0, -0.16, 0.06]}
            fontSize={0.14}
            fontWeight={600}
            color="#cbd5e1"
            anchorX="center"
            anchorY="middle"
          >
            PORT OF ANIKETH
          </Text>
          {/* Post */}
          <mesh position={[0, -0.9, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1.8, 8]} />
            <meshStandardMaterial color="#475569" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* 3. Moored Fishing Boat / Tugboat (Parked at South Pier Edge) */}
      <group position={[-28, 0, 7.8]}>
        <RigidBody type="fixed" friction={0.6}>
          {/* Boat Hull */}
          <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.4, 0.7, 2.2]} />
            <meshStandardMaterial color="#0369a1" roughness={0.5} />
          </mesh>
          {/* Pointed Bow */}
          <mesh position={[2.5, 0.32, 0]} rotation={[0, 0, 0.3]} castShadow>
            <coneGeometry args={[1.1, 1.4, 4]} />
            <meshStandardMaterial color="#0284c7" roughness={0.5} />
          </mesh>

          {/* Wooden Deck Trim */}
          <mesh position={[0, 0.65, 0]}>
            <boxGeometry args={[4.2, 0.08, 2.0]} />
            <meshStandardMaterial color="#78350f" roughness={0.7} />
          </mesh>

          {/* Wheelhouse Cabin */}
          <mesh position={[-0.4, 1.25, 0]} castShadow>
            <boxGeometry args={[1.8, 1.1, 1.4]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          {/* Cabin Roof */}
          <mesh position={[-0.4, 1.85, 0]} castShadow>
            <boxGeometry args={[2.0, 0.12, 1.6]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
          {/* Windows */}
          <mesh position={[0.51, 1.35, 0]}>
            <planeGeometry args={[0.02, 0.5, 1.0]} />
            <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.9} />
          </mesh>

          {/* Smokestack */}
          <mesh position={[-1.6, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.18, 1.2, 12]} />
            <meshStandardMaterial color="#ea580c" roughness={0.3} />
          </mesh>
          <mesh position={[-1.6, 2.05, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>

          {/* Lifebuoy on Cabin Wall */}
          <mesh position={[-0.4, 1.3, 0.72]}>
            <torusGeometry args={[0.2, 0.06, 8, 16]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} />
          </mesh>
        </RigidBody>
      </group>

      {/* 4. Classic Striped Lighthouse (Rocky North-West Point) */}
      <group position={[-25, 0, -18]}>
        <RigidBody type="fixed" friction={0.6}>
          {/* Stone Base Plinth */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[2.8, 3.2, 0.8, 12]} />
            <meshStandardMaterial color="#64748b" roughness={0.8} />
          </mesh>

          {/* Lighthouse Tower Shaft (Tapered, Alternating Red and White Rings) */}
          {/* Ring 1 (Bottom, Red) */}
          <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[2.2, 2.6, 2.0, 16]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
          {/* Ring 2 (White) */}
          <mesh position={[0, 3.8, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.8, 2.2, 2.0, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>
          {/* Ring 3 (Red) */}
          <mesh position={[0, 5.8, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.8, 2.0, 16]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
          {/* Ring 4 (White) */}
          <mesh position={[0, 7.6, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.3, 1.5, 1.6, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>

          {/* Gallery Balcony Deck */}
          <mesh position={[0, 8.55, 0]} castShadow>
            <cylinderGeometry args={[1.8, 1.8, 0.3, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>

          {/* Lantern Room (Glass with Warm Beacon Glow) */}
          <mesh position={[0, 9.3, 0]}>
            <cylinderGeometry args={[1.1, 1.1, 1.2, 12]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#fef08a"
              emissiveIntensity={0.8}
              roughness={0.1}
            />
          </mesh>

          {/* Conical Copper Cap */}
          <mesh position={[0, 10.4, 0]} castShadow>
            <coneGeometry args={[1.5, 1.1, 16]} />
            <meshStandardMaterial color="#047857" roughness={0.4} />
          </mesh>
        </RigidBody>
      </group>
    </group>
  );
};
