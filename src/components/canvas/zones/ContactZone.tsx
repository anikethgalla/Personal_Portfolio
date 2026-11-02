import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { profileData } from '../../../data/profileData';
import { useGame } from '../../../context/GameContext';

interface ContactZoneProps {
  vehiclePosition: THREE.Vector3 | null;
}

export const ContactZone: React.FC<ContactZoneProps> = ({ vehiclePosition }) => {
  const { markZoneDiscovered, setIsRecruiterDrawerOpen } = useGame();

  useFrame(() => {
    if (!vehiclePosition) return;
    const contactCenter = new THREE.Vector3(0, 0, 32);
    if (vehiclePosition.distanceTo(contactCenter) < 10) {
      markZoneDiscovered('contact');
    }
  });

  return (
    <group position={[0, 0, 32]}>
      {/* Zone Sign Elevated Cleanly Above Garage Roof */}
      <group position={[0, 5.8, -1]}>
        <Text
          fontSize={1.3}
          fontWeight={800}
          color="#332d29"
          anchorX="center"
          anchorY="middle"
        >
          CONTACT GARAGE
        </Text>
        <Text
          position={[0, -0.65, 0]}
          fontSize={0.4}
          fontWeight={600}
          color="#786c62"
          anchorX="center"
          anchorY="middle"
        >
          GET IN TOUCH OR GRAB RESUME
        </Text>
        {/* Support Struts */}
        <mesh position={[-3.2, -0.7, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
          <meshStandardMaterial color="#475569" roughness={0.6} />
        </mesh>
        <mesh position={[3.2, -0.7, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
          <meshStandardMaterial color="#475569" roughness={0.6} />
        </mesh>
      </group>

      {/* Low-Poly Garage Structure */}
      {/* Back Wall */}
      <RigidBody type="fixed" friction={0.8} position={[0, 2, -4.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[12, 4, 0.6]} />
          <meshStandardMaterial color="#c5b9a8" roughness={0.6} />
        </mesh>
      </RigidBody>

      {/* Left Wall */}
      <RigidBody type="fixed" friction={0.8} position={[-5.8, 2, -1]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.6, 4, 7]} />
          <meshStandardMaterial color="#c5b9a8" roughness={0.6} />
        </mesh>
      </RigidBody>

      {/* Right Wall */}
      <RigidBody type="fixed" friction={0.8} position={[5.8, 2, -1]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.6, 4, 7]} />
          <meshStandardMaterial color="#c5b9a8" roughness={0.6} />
        </mesh>
      </RigidBody>

      {/* Roof */}
      <mesh position={[0, 4.2, -1]} castShadow receiveShadow>
        <boxGeometry args={[12.6, 0.5, 7.6]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>

      {/* Parking Floor Bay */}
      <mesh position={[0, 0.02, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshBasicMaterial color="#e5ded4" />
      </mesh>

      {/* 3 Interactive Portals / Pedestals inside the garage */}
      {/* 1. GitHub Portal */}
      <RigidBody type="fixed" friction={0.6} position={[-3.2, 0.6, -2.8]}>
        <mesh
          castShadow
          receiveShadow
          onClick={() => window.open(profileData.github, '_blank')}
        >
          <boxGeometry args={[2.0, 1.2, 1.2]} />
          <meshStandardMaterial color="#24292e" roughness={0.3} />
        </mesh>
        <Text
          position={[0, 0.1, 0.62]}
          fontSize={0.28}
          fontWeight={700}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          GITHUB
        </Text>
        <Text
          position={[0, -0.25, 0.62]}
          fontSize={0.16}
          fontWeight={500}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          CLICK TO OPEN
        </Text>
      </RigidBody>

      {/* 2. Email Portal */}
      <RigidBody type="fixed" friction={0.6} position={[0, 0.6, -2.8]}>
        <mesh
          castShadow
          receiveShadow
          onClick={() => {
            navigator.clipboard.writeText(profileData.email);
            window.location.href = `mailto:${profileData.email}`;
          }}
        >
          <boxGeometry args={[2.0, 1.2, 1.2]} />
          <meshStandardMaterial color="#ea580c" roughness={0.3} />
        </mesh>
        <Text
          position={[0, 0.1, 0.62]}
          fontSize={0.28}
          fontWeight={700}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          EMAIL
        </Text>
        <Text
          position={[0, -0.25, 0.62]}
          fontSize={0.16}
          fontWeight={500}
          color="#fed7aa"
          anchorX="center"
          anchorY="middle"
        >
          CLICK TO SEND
        </Text>
      </RigidBody>

      {/* 3. Resume / Recruiter Portal */}
      <RigidBody type="fixed" friction={0.6} position={[3.2, 0.6, -2.8]}>
        <mesh
          castShadow
          receiveShadow
          onClick={() => setIsRecruiterDrawerOpen(true)}
        >
          <boxGeometry args={[2.0, 1.2, 1.2]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} />
        </mesh>
        <Text
          position={[0, 0.1, 0.62]}
          fontSize={0.28}
          fontWeight={700}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          RESUME
        </Text>
        <Text
          position={[0, -0.25, 0.62]}
          fontSize={0.16}
          fontWeight={500}
          color="#bae6fd"
          anchorX="center"
          anchorY="middle"
        >
          VIEW DOSSIER
        </Text>
      </RigidBody>
    </group>
  );
};

