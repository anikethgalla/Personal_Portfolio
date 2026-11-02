import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { profileData } from '../../../data/profileData';
import { useGame } from '../../../context/GameContext';
import confetti from 'canvas-confetti';

interface ContactZoneProps {
  vehiclePosition: THREE.Vector3 | null;
}

export const ContactZone: React.FC<ContactZoneProps> = ({ vehiclePosition }) => {
  const { markZoneDiscovered, setIsRecruiterDrawerOpen } = useGame();
  const [copiedEmail, setCopiedEmail] = useState(false);

  useFrame(() => {
    if (!vehiclePosition) return;
    const contactCenter = new THREE.Vector3(0, 0, 32);
    if (vehiclePosition.distanceTo(contactCenter) < 12) {
      markZoneDiscovered('contact');
    }
  });

  const handleEmailClick = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    try {
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }
    setTimeout(() => {
      window.location.href = `mailto:${profileData.email}`;
      setCopiedEmail(false);
    }, 400);
  };

  return (
    <group position={[0, 0, 32]}>
      {/* ======================================================== */}
      {/* 1. OVERHEAD CANOPY ROOF & RETRO STATION SIGN             */}
      {/* Faces North (-Z) towards the approaching South Avenue car */}
      {/* ======================================================== */}
      <group position={[0, 4.4, 0]}>
        {/* Main Canopy Roof Slab */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[13.5, 0.45, 8.5]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>

        {/* Terracotta Decorative Fascia Trim around Canopy */}
        <mesh position={[0, 0, -4.26]} castShadow>
          <boxGeometry args={[13.6, 0.55, 0.1]} />
          <meshStandardMaterial color="#ea580c" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 4.26]} castShadow>
          <boxGeometry args={[13.6, 0.55, 0.1]} />
          <meshStandardMaterial color="#ea580c" roughness={0.4} />
        </mesh>
        <mesh position={[-6.76, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.55, 8.5]} />
          <meshStandardMaterial color="#ea580c" roughness={0.4} />
        </mesh>
        <mesh position={[6.76, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.55, 8.5]} />
          <meshStandardMaterial color="#ea580c" roughness={0.4} />
        </mesh>

        {/* 3D Elevated Retro Gas Station Sign Facing North */}
        <group position={[0, 0.95, -4.25]}>
          <mesh castShadow>
            <boxGeometry args={[8.8, 1.2, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
          </mesh>
          <Text
            position={[0, 0.18, -0.12]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.48}
            fontWeight={900}
            color="#ea580c"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            CONTACT & REFUEL
          </Text>
          <Text
            position={[0, -0.25, -0.12]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.18}
            fontWeight={700}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            PULL UP TO PUMPS // GITHUB • EMAIL • RESUME
          </Text>
        </group>
      </group>

      {/* 4 Canopy Support Pillars */}
      {[-5.4, 5.4].map((px) =>
        [-3.2, 3.2].map((pz) => (
          <mesh key={`col-${px}-${pz}`} position={[px, 2.1, pz]} castShadow receiveShadow>
            <cylinderGeometry args={[0.16, 0.18, 4.2, 12]} />
            <meshStandardMaterial color="#475569" roughness={0.5} metalness={0.4} />
          </mesh>
        ))
      )}

      {/* ======================================================== */}
      {/* 2. CONCRETE FUEL PUMP ISLAND                             */}
      {/* Raised curb island with drive-through lanes on both sides*/}
      {/* ======================================================== */}
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[9.6, 0.24, 2.6]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
      </mesh>

      {/* Island Curb Yellow/Black Safety Striping on Ends */}
      <mesh position={[-4.82, 0.12, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.25, 16, 1, false, Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color="#eab308" roughness={0.6} />
      </mesh>
      <mesh position={[4.82, 0.12, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.25, 16, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color="#eab308" roughness={0.6} />
      </mesh>

      {/* ======================================================== */}
      {/* 3. THREE VINTAGE INTERACTIVE PETROL PUMPS                */}
      {/* ======================================================== */}

      {/* PUMP 1: GITHUB FUEL PUMP (Left / West) */}
      <group
        position={[-2.8, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          window.open(profileData.github, '_blank');
        }}
      >
        <RigidBody
          type="fixed"
          friction={0.6}
          position={[0, 1.25, 0]}
        >
          {/* Pump Main Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 2.0, 0.85]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
          </mesh>

          {/* Glowing Top Globe (Vintage 50s Petrol Globe) */}
          <mesh position={[0, 1.25, 0]}>
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#f8fafc" emissiveIntensity={0.8} />
          </mesh>

          {/* Digital Pump Meter Screen (Facing North toward driver) */}
          <mesh position={[0, 0.45, -0.44]}>
            <planeGeometry args={[0.9, 0.55]} />
            <meshStandardMaterial color="#020617" roughness={0.2} emissive="#0284c7" emissiveIntensity={0.15} />
          </mesh>
          <Text
            position={[0, 0.55, -0.46]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.14}
            fontWeight={900}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            GITHUB OCTANE
          </Text>
          <Text
            position={[0, 0.35, -0.46]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.1}
            fontWeight={700}
            color="#a5f3fc"
            anchorX="center"
            anchorY="middle"
          >
            CODE REPOSITORIES
          </Text>

          {/* Action Button Strip */}
          <mesh position={[0, -0.15, -0.44]}>
            <boxGeometry args={[0.85, 0.32, 0.04]} />
            <meshStandardMaterial color="#ea580c" roughness={0.3} />
          </mesh>
          <Text
            position={[0, -0.15, -0.47]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.11}
            fontWeight={800}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            TAP TO PUMP CODE
          </Text>

          {/* Hanging Fuel Hose on the side */}
          <mesh position={[-0.65, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.3, 8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} />
          </mesh>
          {/* Nozzle */}
          <mesh position={[-0.65, -0.5, 0]} castShadow>
            <boxGeometry args={[0.08, 0.25, 0.15]} />
            <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.8} />
          </mesh>
        </RigidBody>
      </group>

      {/* PUMP 2: EMAIL PREMIUM PUMP (Center) */}
      <group
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          handleEmailClick();
        }}
      >
        <RigidBody
          type="fixed"
          friction={0.6}
          position={[0, 1.25, 0]}
        >
          {/* Pump Main Body (Warm Terracotta / Flame Orange) */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 2.0, 0.85]} />
            <meshStandardMaterial color="#c2410c" roughness={0.3} metalness={0.3} />
          </mesh>

          {/* Glowing Top Globe */}
          <mesh position={[0, 1.25, 0]}>
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshStandardMaterial color="#ea580c" emissive="#ea580c" emissiveIntensity={0.8} />
          </mesh>

          {/* Meter Screen */}
          <mesh position={[0, 0.45, -0.44]}>
            <planeGeometry args={[0.9, 0.55]} />
            <meshStandardMaterial color="#020617" roughness={0.2} emissive="#ea580c" emissiveIntensity={0.2} />
          </mesh>
          <Text
            position={[0, 0.55, -0.46]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.14}
            fontWeight={900}
            color="#fb923c"
            anchorX="center"
            anchorY="middle"
          >
            EMAIL PREMIUM
          </Text>
          <Text
            position={[0, 0.35, -0.46]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.1}
            fontWeight={700}
            color="#fed7aa"
            anchorX="center"
            anchorY="middle"
          >
            DIRECT PIPELINE
          </Text>

          {/* Action Button Strip */}
          <mesh position={[0, -0.15, -0.44]}>
            <boxGeometry args={[0.85, 0.32, 0.04]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} />
          </mesh>
          <Text
            position={[0, -0.15, -0.47]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.11}
            fontWeight={800}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {copiedEmail ? 'COPIED TO CLIPBOARD!' : 'TAP TO DISPATCH'}
          </Text>

          {/* Side Hose & Nozzle */}
          <mesh position={[-0.65, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.3, 8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} />
          </mesh>
          <mesh position={[-0.65, -0.5, 0]} castShadow>
            <boxGeometry args={[0.08, 0.25, 0.15]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
        </RigidBody>
      </group>

      {/* PUMP 3: RESUME SUPER PUMP (Right / East) */}
      <group
        position={[2.8, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setIsRecruiterDrawerOpen(true);
        }}
      >
        <RigidBody
          type="fixed"
          friction={0.6}
          position={[0, 1.25, 0]}
        >
          {/* Pump Main Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 2.0, 0.85]} />
            <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.4} />
          </mesh>

          {/* Glowing Top Globe */}
          <mesh position={[0, 1.25, 0]}>
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
          </mesh>

          {/* Meter Screen */}
          <mesh position={[0, 0.45, -0.44]}>
            <planeGeometry args={[0.9, 0.55]} />
            <meshStandardMaterial color="#020617" roughness={0.2} emissive="#0284c7" emissiveIntensity={0.2} />
          </mesh>
          <Text
            position={[0, 0.55, -0.46]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.14}
            fontWeight={900}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            RESUME SUPER
          </Text>
          <Text
            position={[0, 0.35, -0.46]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.1}
            fontWeight={700}
            color="#bae6fd"
            anchorX="center"
            anchorY="middle"
          >
            RECRUITER DOSSIER
          </Text>

          {/* Action Button Strip */}
          <mesh position={[0, -0.15, -0.44]}>
            <boxGeometry args={[0.85, 0.32, 0.04]} />
            <meshStandardMaterial color="#ea580c" roughness={0.3} />
          </mesh>
          <Text
            position={[0, -0.15, -0.47]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.11}
            fontWeight={800}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            TAP FOR DOSSIER
          </Text>

          {/* Side Hose & Nozzle */}
          <mesh position={[0.65, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.3, 8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} />
          </mesh>
          <mesh position={[0.65, -0.5, 0]} castShadow>
            <boxGeometry args={[0.08, 0.25, 0.15]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.4} />
          </mesh>
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* 4. ROADSIDE CONVENIENCE MART & CASHIER BOOTH             */}
      {/* Positioned in the background at z = 6.0                  */}
      {/* ======================================================== */}
      <group position={[0, 0, 6.2]}>
        <RigidBody type="fixed" friction={0.8}>
          {/* Main Mart Building Block */}
          <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[11.5, 3.6, 4.2]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.6} />
          </mesh>

          {/* Roof Parapet Trim */}
          <mesh position={[0, 3.65, 0]} castShadow>
            <boxGeometry args={[11.8, 0.3, 4.4]} />
            <meshStandardMaterial color="#ea580c" roughness={0.5} />
          </mesh>

          {/* Front Showcase Windows Facing North */}
          {[-3.2, 3.2].map((wx) => (
            <mesh key={`mart-win-${wx}`} position={[wx, 1.5, -2.12]}>
              <boxGeometry args={[3.2, 1.8, 0.05]} />
              <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
            </mesh>
          ))}

          {/* Glass Entrance Double Doors in the Center */}
          <mesh position={[0, 1.25, -2.12]}>
            <boxGeometry args={[1.8, 2.3, 0.05]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Mart Sign: "24/7 MINI MART & SNACKS" */}
          <group position={[0, 3.0, -2.15]}>
            <mesh castShadow>
              <boxGeometry args={[5.8, 0.65, 0.1]} />
              <meshStandardMaterial color="#0f172a" roughness={0.4} />
            </mesh>
            <Text
              position={[0, 0, -0.06]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.22}
              fontWeight={800}
              color="#facc15"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.06}
            >
              24/7 MART & SERVICES
            </Text>
          </group>

          {/* Ice Cooler Box on Front Sidewalk */}
          <mesh position={[-4.8, 0.5, -2.6]} castShadow>
            <boxGeometry args={[1.2, 0.9, 0.8]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
          </mesh>

          {/* Soda Vending Machine */}
          <mesh position={[4.8, 0.9, -2.6]} castShadow>
            <boxGeometry args={[0.9, 1.8, 0.7]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
        </RigidBody>
      </group>
    </group>
  );
};