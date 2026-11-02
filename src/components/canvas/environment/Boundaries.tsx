import React from 'react';
import { RigidBody } from '@react-three/rapier';

export const Boundaries: React.FC = () => {
  // Expanded arena half size for a much larger, more navigable city
  const arenaHalfSizeX = 65;
  const arenaHalfSizeZ = 55;
  const wallHeight = 3.0;
  const wallThickness = 2.0;

  return (
    <group>
      {/* North Wall */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[0, wallHeight / 2, -arenaHalfSizeZ]} castShadow receiveShadow>
          <boxGeometry args={[arenaHalfSizeX * 2 + wallThickness, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#cbbfae" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* South Wall */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[0, wallHeight / 2, arenaHalfSizeZ]} castShadow receiveShadow>
          <boxGeometry args={[arenaHalfSizeX * 2 + wallThickness, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#cbbfae" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* East Wall */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[arenaHalfSizeX, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, arenaHalfSizeZ * 2]} />
          <meshStandardMaterial color="#cbbfae" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* West Wall (Holding the Seaport Water Basin) */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[-arenaHalfSizeX, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, arenaHalfSizeZ * 2]} />
          <meshStandardMaterial color="#cbbfae" roughness={0.7} />
        </mesh>
      </RigidBody>
    </group>
  );
};
