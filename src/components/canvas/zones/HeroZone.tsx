import React from 'react';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

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

      {/* High-Speed Physics Launch Ramp */}
      {/* Ramp rises from z = -2 (ground level) to z = -8 (height 1.7m) */}
      <RigidBody type="fixed" friction={0.4} position={[0, 0.85, -5.0]}>
        <mesh rotation={[0.26, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.8, 0.28, 6.8]} />
          <meshStandardMaterial color="#ea580c" roughness={0.4} />
        </mesh>
      </RigidBody>

      {/* Structural Support under ramp */}
      <mesh position={[0, 0.8, -8.2]} castShadow receiveShadow>
        <boxGeometry args={[5.8, 1.6, 0.8]} />
        <meshStandardMaterial color="#c2410c" roughness={0.5} />
      </mesh>

      {/* Bowling Pins - Placed at landing zone past the ramp (z = -16 to -21) */}
      {/* Elevated to y = 0.92 so cylinder base (y = 0.02) rests perfectly on the ground without floor penetration */}
      <group position={[0, 0, -6]}>
        {/* Row 1 - 1 pin (Head pin) */}
        <RigidBody
          colliders="hull"
          mass={2.0}
          friction={0.6}
          restitution={0.2}
          linearDamping={0.4}
          angularDamping={0.8}
          position={[0, 0.92, -10.5]}
        >
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.26, 0.32, 1.8, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.16, 16]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </RigidBody>

        {/* Row 2 - 2 pins */}
        {[-0.85, 0.85].map((x, i) => (
          <RigidBody
            key={`r2-${i}`}
            colliders="hull"
            mass={2.0}
            friction={0.6}
            restitution={0.2}
            linearDamping={0.4}
            angularDamping={0.8}
            position={[x, 0.92, -11.8]}
          >
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.26, 0.32, 1.8, 16]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.16, 16]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </RigidBody>
        ))}

        {/* Row 3 - 3 pins */}
        {[-1.7, 0, 1.7].map((x, i) => (
          <RigidBody
            key={`r3-${i}`}
            colliders="hull"
            mass={2.0}
            friction={0.6}
            restitution={0.2}
            linearDamping={0.4}
            angularDamping={0.8}
            position={[x, 0.92, -13.1]}
          >
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.26, 0.32, 1.8, 16]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.16, 16]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </RigidBody>
        ))}

        {/* Row 4 - 4 pins */}
        {[-2.55, -0.85, 0.85, 2.55].map((x, i) => (
          <RigidBody
            key={`r4-${i}`}
            colliders="hull"
            mass={2.0}
            friction={0.6}
            restitution={0.2}
            linearDamping={0.4}
            angularDamping={0.8}
            position={[x, 0.92, -14.4]}
          >
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.26, 0.32, 1.8, 16]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.16, 16]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </RigidBody>
        ))}
      </group>
    </group>
  );
};
