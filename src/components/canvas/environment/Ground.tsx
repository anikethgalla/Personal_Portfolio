import React from 'react';
import { RigidBody } from '@react-three/rapier';

export const Ground: React.FC = () => {
  return (
    <group>
      {/* Physics Ground Plane */}
      <RigidBody type="fixed" friction={1.2} restitution={0.1}>
        <mesh position={[0, -0.25, 0]} receiveShadow>
          <boxGeometry args={[100, 0.5, 100]} />
          <meshStandardMaterial color="#ded7cb" roughness={0.9} metalness={0.05} />
        </mesh>
      </RigidBody>

      {/* Decorative Ground Decals / Track Markings */}
      {/* Central Roundabout */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[5, 5.25, 64]} />
        <meshBasicMaterial color="#cfc5b5" />
      </mesh>

      {/* Hero Driveway Lines */}
      <mesh position={[0, 0.01, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 4]} />
        <meshBasicMaterial color="#cfc5b5" />
      </mesh>

      {/* Zone Path to Projects (North East) */}
      <mesh position={[8, 0.01, -4]} rotation={[-Math.PI / 2, 0, -Math.PI / 4]}>
        <planeGeometry args={[1.5, 12]} />
        <meshBasicMaterial color="#d4c9b9" />
      </mesh>

      {/* Zone Path to Skills (North West) */}
      <mesh position={[-8, 0.01, -4]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[1.5, 12]} />
        <meshBasicMaterial color="#d4c9b9" />
      </mesh>

      {/* Zone Path to Contact (South) */}
      <mesh position={[0, 0.01, 10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 10]} />
        <meshBasicMaterial color="#d4c9b9" />
      </mesh>
    </group>
  );
};

