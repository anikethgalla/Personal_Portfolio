import React from 'react';
import { Text } from '@react-three/drei';

export const HeroZone: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 3D Elevated Hero Typography - Positioned grandly on the northern city horizon */}
      <group position={[0, 5.2, -28]}>
        <Text
          fontSize={3.2}
          fontWeight={800}
          color="#332d29"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          ANIKETH GALLA
        </Text>
        <Text
          position={[0, -2.0, 0]}
          fontSize={1.0}
          fontWeight={600}
          color="#786c62"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          BACKEND SYSTEMS & AUTONOMOUS AI AGENTS
        </Text>
      </group>

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
