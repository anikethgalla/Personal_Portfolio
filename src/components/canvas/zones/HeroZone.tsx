import React from 'react';
import { Text } from '@react-three/drei';
import { HollywoodSign } from '../environment/HollywoodSign';

export const HeroZone: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Iconic Hollywood-Style Mountain Landmark Sign */}
      {/* Perched on the eastern mountain slope (Peak E1) overlooking the valley & town */}
      <HollywoodSign position={[21, 9.4, -60]} rotation={[0.06, -0.34, 0]} />

      {/* Starting Grid Decal on Floor (Spacious starting zone) */}
      <group position={[0, 0.032, 14]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 6]} />
          <meshBasicMaterial
            color="#cbd5e1"
            transparent
            opacity={0.5}
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
        <Text
          position={[0, 0, -4]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.55}
          fontWeight={800}
          color="#facc15"
          anchorX="center"
          anchorY="middle"
        >
          ▲ FULL SPEEDWAY AHEAD ▲
        </Text>
      </group>
    </group>
  );
};
