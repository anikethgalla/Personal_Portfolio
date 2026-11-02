import React from 'react';
import { CuboidCollider } from '@react-three/rapier';

export const Boundaries: React.FC = () => {
  // Generous physics safety perimeter placed far beyond the visible landscape
  // Completely eliminates visible grey concrete walls so the world naturally flows into valleys and horizons!
  const arenaHalfSizeX = 130;
  const arenaHalfSizeZ = 135;
  const wallHeight = 15;

  return (
    <group>
      {/* North Invisible Physics Barrier (Behind the Northern Mountain Valley Pass) */}
      <CuboidCollider
        args={[arenaHalfSizeX, wallHeight / 2, 2]}
        position={[0, wallHeight / 2, -arenaHalfSizeZ]}
      />

      {/* South Invisible Physics Barrier (Behind the Southern Valley Foothills) */}
      <CuboidCollider
        args={[arenaHalfSizeX, wallHeight / 2, 2]}
        position={[0, wallHeight / 2, arenaHalfSizeZ]}
      />

      {/* East Invisible Physics Barrier (Behind the Eastern Mountain Range) */}
      <CuboidCollider
        args={[2, wallHeight / 2, arenaHalfSizeZ]}
        position={[arenaHalfSizeX, wallHeight / 2, 0]}
      />

      {/* West Invisible Physics Barrier (Deep in the Western Ocean Basin) */}
      <CuboidCollider
        args={[2, wallHeight / 2, arenaHalfSizeZ]}
        position={[-arenaHalfSizeX, wallHeight / 2, 0]}
      />
    </group>
  );
};
