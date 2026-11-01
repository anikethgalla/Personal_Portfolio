import React from 'react';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export const HeroZone: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 3D Elevated Hero Typography - Positioned grandly behind the landing zone */}
      <group position={[0, 4.2, -18]}>
        <Text
          fontSize={2.5}
          fontWeight={800}
          color="#332d29"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          ANIKETH GALLA
        </Text>
        <Text
          position={[0, -1.6, 0]}
          fontSize={0.8}
          fontWeight={600}
          color="#786c62"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          BACKEND SYSTEMS & AUTONOMOUS AI AGENTS
        </Text>
      </group>

      {/* Starting Grid Decal on Floor */}
      <group position={[0, 0.02, 6]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 4]} />
          <meshBasicMaterial color="#cfc5b5" transparent opacity={0.35} />
        </mesh>
        <Text
          position={[0, 0, -2.5]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.45}
          fontWeight={800}
          color="#a89a88"
          anchorX="center"
          anchorY="middle"
        >
          ▲ DRIVE FORWARD TO HIT RAMP ▲
        </Text>
      </group>

      {/* Physics Launch Ramp */}
      {/* Ramp rises from z = 0 (ground level) to z = -5.0 (height 1.3m) */}
      <RigidBody type="fixed" friction={0.5} position={[0, 0.65, -2.5]}>
        <mesh rotation={[0.26, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.8, 0.25, 5.2]} />
          <meshStandardMaterial color="#ea580c" roughness={0.4} />
        </mesh>
      </RigidBody>

      {/* Structural Support under the highest part of the ramp */}
      <mesh position={[0, 0.6, -4.8]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 1.25, 0.6]} />
        <meshStandardMaterial color="#c2410c" roughness={0.5} />
      </mesh>

      {/* Bowling Pins - Placed at landing zone past the ramp (z = -10 to -14) */}
      <group position={[0, 0, 0]}>
        {/* Row 1 - 1 pin (Head pin) */}
        <RigidBody colliders="hull" mass={1.8} friction={0.6} restitution={0.3} position={[0, 0.8, -10.5]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.26, 1.6, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.23, 0.23, 0.15, 16]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </RigidBody>

        {/* Row 2 - 2 pins */}
        {[-0.7, 0.7].map((x, i) => (
          <RigidBody key={`r2-${i}`} colliders="hull" mass={1.8} friction={0.6} restitution={0.3} position={[x, 0.8, -11.6]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.22, 0.26, 1.6, 16]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.23, 0.23, 0.15, 16]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </RigidBody>
        ))}

        {/* Row 3 - 3 pins */}
        {[-1.4, 0, 1.4].map((x, i) => (
          <RigidBody key={`r3-${i}`} colliders="hull" mass={1.8} friction={0.6} restitution={0.3} position={[x, 0.8, -12.7]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.22, 0.26, 1.6, 16]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.23, 0.23, 0.15, 16]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </RigidBody>
        ))}

        {/* Row 4 - 4 pins */}
        {[-2.1, -0.7, 0.7, 2.1].map((x, i) => (
          <RigidBody key={`r4-${i}`} colliders="hull" mass={1.8} friction={0.6} restitution={0.3} position={[x, 0.8, -13.8]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.22, 0.26, 1.6, 16]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.23, 0.23, 0.15, 16]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </RigidBody>
        ))}
      </group>
    </group>
  );
};
