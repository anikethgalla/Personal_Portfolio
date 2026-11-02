import React from 'react';
import { RigidBody } from '@react-three/rapier';

export const Boundaries: React.FC = () => {
  const arenaHalfSize = 35;
  const wallHeight = 2.5;
  const wallThickness = 2.0;

  return (
    <group>
      {/* North Wall */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[0, wallHeight / 2, -arenaHalfSize]} castShadow receiveShadow>
          <boxGeometry args={[arenaHalfSize * 2 + wallThickness, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#cbbfae" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* South Wall */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[0, wallHeight / 2, arenaHalfSize]} castShadow receiveShadow>
          <boxGeometry args={[arenaHalfSize * 2 + wallThickness, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#cbbfae" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* East Wall */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[arenaHalfSize, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, arenaHalfSize * 2]} />
          <meshStandardMaterial color="#cbbfae" roughness={0.7} />
        </mesh>
      </RigidBody>

      {/* West Wall - Adjusted outward to accommodate the coastal seaport basin */}
      <RigidBody type="fixed" friction={0.6}>
        <mesh position={[-40, wallHeight / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, arenaHalfSize * 2]} />
          <meshStandardMaterial color="#cbbfae" roughness={0.7} />
        </mesh>
      </RigidBody>
    </group>
  );
};

