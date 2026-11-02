import React from 'react';
import { RigidBody } from '@react-three/rapier';

export const Boundaries: React.FC = () => {
  // Expanded arena half size for a much larger, more navigable city with rolling hills
  const arenaHalfSizeX = 75;
  const arenaHalfSizeZ = 60;
  const wallHeight = 3.2;
  const wallThickness = 2.0;

  return (
    <group>
      {/* North Wall */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[0, wallHeight / 2, -arenaHalfSizeZ]} castShadow receiveShadow>
          <boxGeometry args={[arenaHalfSizeX * 2 + wallThickness, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* South Wall */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[0, wallHeight / 2, arenaHalfSizeZ]} castShadow receiveShadow>
          <boxGeometry args={[arenaHalfSizeX * 2 + wallThickness, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* East Wall (Behind the Rolling Hills) */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[arenaHalfSizeX, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, arenaHalfSizeZ * 2]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* West Wall (Holding the Seaport Water Basin) */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[-arenaHalfSizeX, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, arenaHalfSizeZ * 2]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>
      </RigidBody>
    </group>
  );
};
