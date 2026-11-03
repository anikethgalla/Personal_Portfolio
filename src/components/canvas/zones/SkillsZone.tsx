import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { skillsList } from '../../../data/skillsData';
import { useGame } from '../../../context/GameContext';

interface SkillsZoneProps {
  vehiclePosition: THREE.Vector3 | null;
}

export const SkillsZone: React.FC<SkillsZoneProps> = ({ vehiclePosition }) => {
  const { resetSkillsTrigger, markZoneDiscovered } = useGame();
  const [wallKey, setWallKey] = useState(0);

  // Proximity check for zone discovery
  useFrame(() => {
    if (!vehiclePosition) return;
    const skillsCenter = new THREE.Vector3(-19, 0, -14);
    if (vehiclePosition.distanceTo(skillsCenter) < 18) {
      markZoneDiscovered('skills');
    }
  });

  // Re-mount wall when reset is triggered
  useEffect(() => {
    setWallKey((k) => k + 1);
  }, [resetSkillsTrigger]);

  // Construct a pyramid / stacked brick wall layout
  // 4 rows: Row 0 (bottom, 4 bricks), Row 1 (4 bricks), Row 2 (3 bricks), Row 3 (top, 2 bricks)
  const rows = [
    skillsList.slice(0, 4),
    skillsList.slice(4, 8),
    skillsList.slice(8, 12),
    skillsList.slice(12, 15)
  ];

  // Truly very big, monumental, satisfying brick dimensions
  const brickWidth = 4.2;
  const brickHeight = 1.8;
  const brickDepth = 1.4;

  return (
    <group position={[-19, 0, -14]}>
      {/* ======================================================== */}
      {/* 1. CLEAN DARK ASPHALT PAD UNDER THE BLOCKS               */}
      {/* ======================================================== */}
      <mesh position={[0, 0.015, 2.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18.5, 18]} />
        <meshStandardMaterial color="#1e293b" roughness={0.75} />
      </mesh>

      {/* Runway Approach Direction Marker (Clean & subtle on the asphalt) */}
      <group position={[0, 0.025, 9.2]}>
        <Text
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.52}
          fontWeight={900}
          color="#facc15"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          ▲ ▲ ▲ RAM TO SCATTER SKILLS ▲ ▲ ▲
        </Text>
      </group>

      {/* ======================================================== */}
      {/* 2. DYNAMIC UPLIGHTS (ILLUMINATING THE GIANT BLOCKS)      */}
      {/* ======================================================== */}
      {/* Ground Spotlights Angled Up at the Giant Wall */}
      {[-7.0, 7.0].map((lx, i) => (
        <group key={`spot-fixture-${i}`} position={[lx, 0, 4.5]}>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.3, 0.24, 0.3]} />
            <meshStandardMaterial color="#334155" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.26, 0]} rotation={[Math.PI / 5, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.24, 0.35, 8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.35, -0.05]} rotation={[Math.PI / 5, 0, 0]}>
            <cylinderGeometry args={[0.17, 0.17, 0.04, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#fef08a"
              emissiveIntensity={2.5}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Dynamic Warm Illumination casting vivid colors onto the wall */}
      <pointLight position={[-6.0, 2.5, 4.0]} color="#fef08a" intensity={5.5} distance={22} decay={2} />
      <pointLight position={[6.0, 2.5, 4.0]} color="#38bdf8" intensity={5.5} distance={22} decay={2} />
      <pointLight position={[0, 4.0, 3.5]} color="#ffffff" intensity={3.5} distance={20} decay={2} />

      {/* ======================================================== */}
      {/* 3. MONUMENTAL KNOCKABLE TECH SKILL BRICK WALL            */}
      {/* ======================================================== */}
      <group key={`wall-${wallKey}`} position={[0, 0, 0]}>
        {rows.map((row, rowIndex) => {
          const rowY = rowIndex * (brickHeight + 0.05) + brickHeight / 2 + 0.03;
          const totalRowWidth = row.length * brickWidth + (row.length - 1) * 0.1;
          const startX = -totalRowWidth / 2 + brickWidth / 2;

          return (
            <React.Fragment key={`row-${rowIndex}`}>
              {row.map((skill, colIndex) => {
                const brickX = startX + colIndex * (brickWidth + 0.1);

                return (
                  <RigidBody
                    key={skill.id}
                    colliders="cuboid"
                    mass={8.5}
                    friction={0.8}
                    restitution={0.18}
                    linearDamping={0.5}
                    angularDamping={0.9}
                    position={[brickX, rowY, 0]}
                  >
                    <mesh castShadow receiveShadow>
                      <boxGeometry args={[brickWidth, brickHeight, brickDepth]} />
                      <meshStandardMaterial
                        color={skill.color}
                        roughness={0.25}
                        metalness={0.2}
                      />
                    </mesh>

                    {/* Skill Label Text on Front Face (Very big, ultra-legible) */}
                    <Text
                      position={[0, 0, brickDepth / 2 + 0.03]}
                      fontSize={0.55}
                      fontWeight={800}
                      color="#ffffff"
                      outlineWidth={0.035}
                      outlineColor="#090d16"
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={brickWidth - 0.3}
                    >
                      {skill.name}
                    </Text>

                    {/* Skill Label Text on Back Face */}
                    <Text
                      position={[0, 0, -brickDepth / 2 - 0.03]}
                      rotation={[0, Math.PI, 0]}
                      fontSize={0.55}
                      fontWeight={800}
                      color="#ffffff"
                      outlineWidth={0.035}
                      outlineColor="#090d16"
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={brickWidth - 0.3}
                    >
                      {skill.name}
                    </Text>
                  </RigidBody>
                );
              })}
            </React.Fragment>
          );
        })}
      </group>
    </group>
  );
};
