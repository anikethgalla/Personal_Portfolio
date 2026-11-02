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
    const skillsCenter = new THREE.Vector3(-20, 0, -4);
    if (vehiclePosition.distanceTo(skillsCenter) < 12) {
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

  const brickWidth = 2.4;
  const brickHeight = 0.9;
  const brickDepth = 0.8;

  return (
    <group position={[-20, 0, -4]}>
      {/* Zone Sign */}
      <group position={[0, 5.8, -3]}>
        <Text
          fontSize={1.3}
          fontWeight={800}
          color="#332d29"
          anchorX="center"
          anchorY="middle"
        >
          TECH STACK PLAYGROUND
        </Text>
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.42}
          fontWeight={600}
          color="#786c62"
          anchorX="center"
          anchorY="middle"
        >
          RAM INTO THE WALL TO SCATTER SKILLS!
        </Text>
      </group>

      {/* Knockable Brick Wall */}
      <group key={`wall-${wallKey}`} position={[0, 0, 0]}>
        {rows.map((row, rowIndex) => {
          const rowY = rowIndex * (brickHeight + 0.04) + brickHeight / 2 + 0.03;
          const totalRowWidth = row.length * brickWidth;
          const startX = -totalRowWidth / 2 + brickWidth / 2;

          return (
            <React.Fragment key={`row-${rowIndex}`}>
              {row.map((skill, colIndex) => {
                const brickX = startX + colIndex * (brickWidth + 0.06);

                return (
                  <RigidBody
                    key={skill.id}
                    colliders="cuboid"
                    mass={4.0}
                    friction={0.8}
                    restitution={0.1}
                    linearDamping={0.6}
                    angularDamping={1.0}
                    position={[brickX, rowY, 0]}
                  >
                    <mesh castShadow receiveShadow>
                      <boxGeometry args={[brickWidth, brickHeight, brickDepth]} />
                      <meshStandardMaterial
                        color={skill.color}
                        roughness={0.4}
                        metalness={0.15}
                      />
                    </mesh>

                    {/* Skill Label Text on Front Face */}
                    <Text
                      position={[0, 0, brickDepth / 2 + 0.02]}
                      fontSize={0.28}
                      fontWeight={700}
                      color="#ffffff"
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={brickWidth - 0.2}
                    >
                      {skill.name}
                    </Text>

                    {/* Skill Label Text on Back Face */}
                    <Text
                      position={[0, 0, -brickDepth / 2 - 0.02]}
                      rotation={[0, Math.PI, 0]}
                      fontSize={0.28}
                      fontWeight={700}
                      color="#ffffff"
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={brickWidth - 0.2}
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

      {/* Target Floor Marker */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 4]} />
        <meshBasicMaterial color="#cfc5b5" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

