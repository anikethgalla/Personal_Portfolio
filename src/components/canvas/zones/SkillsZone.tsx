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

  // Proximity check for zone discovery (centered at moved arena position)
  useFrame(() => {
    if (!vehiclePosition) return;
    const skillsCenter = new THREE.Vector3(-20, 0, -14);
    if (vehiclePosition.distanceTo(skillsCenter) < 14) {
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
    <group position={[-20, 0, -14]}>
      {/* ======================================================== */}
      {/* 1. HIGHLIGHTED DEMOLITION ARENA IMPACT COURT & RUNWAY     */}
      {/* ======================================================== */}

      {/* Main Polished Dark Asphalt Impact Court */}
      <mesh position={[0, 0.015, 2.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[13.5, 17]} />
        <meshStandardMaterial color="#1e293b" roughness={0.75} />
      </mesh>

      {/* High-Visibility Painted Hazard Border Lines */}
      {[-6.6, 6.6].map((bx, i) => (
        <mesh key={`court-border-x-${i}`} position={[bx, 0.022, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.25, 17]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      ))}
      {[-6.0, 11.0].map((bz, i) => (
        <mesh key={`court-border-z-${i}`} position={[0, 0.022, bz]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[13.4, 0.25]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      ))}

      {/* Impact Target Concentric Rings Directly Under the Wall */}
      <group position={[0, 0.025, 0]}>
        {/* Outer Cyan Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.2, 4.45, 36]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Middle Amber Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.2, 2.45, 36]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
        {/* Center Target Spot */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.7, 24]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Runway Approach Guidance Chevrons & Impact Label */}
      <group position={[0, 0.028, 6.2]}>
        <Text
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.46}
          fontWeight={900}
          color="#facc15"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          ▲ ▲ ▲ RAM AT FULL SPEED ▲ ▲ ▲
        </Text>
      </group>
      <group position={[0, 0.028, 9.2]}>
        <Text
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.34}
          fontWeight={800}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.16}
        >
          DEMOLITION ARENA • IMPACT ZONE
        </Text>
      </group>

      {/* ======================================================== */}
      {/* 2. INDUSTRIAL OVERHEAD GANTRY ARCH & ILLUMINATED SIGN    */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Left & Right Heavy Steel Truss Pylons */}
        {[-5.8, 5.8].map((px, i) => (
          <group key={`gantry-pylon-${i}`} position={[px, 0, 0]}>
            {/* Concrete Footing Pedestal */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.5, 0.8]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.8} />
            </mesh>
            {/* Steel Column Shaft */}
            <mesh position={[0, 3.1, 0]} castShadow>
              <boxGeometry args={[0.22, 5.7, 0.22]} />
              <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
            </mesh>
            {/* Diagonal Gusset Bracing */}
            <mesh position={[px > 0 ? -0.4 : 0.4, 5.4, 0]} rotation={[0, 0, px > 0 ? 0.7 : -0.7]}>
              <boxGeometry args={[0.1, 1.2, 0.1]} />
              <meshStandardMaterial color="#475569" roughness={0.6} />
            </mesh>
          </group>
        ))}

        {/* Overhead Crossbeam Bridge Truss */}
        <mesh position={[0, 5.85, 0]} castShadow>
          <boxGeometry args={[12.2, 0.28, 0.28]} />
          <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
        </mesh>

        {/* Overhead Illuminated Gantry Signboard Plaque */}
        <group position={[0, 6.2, 0.18]}>
          {/* Backing Frame Board */}
          <mesh castShadow>
            <boxGeometry args={[10.6, 1.5, 0.18]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
          {/* Glowing Amber Neon Rim Border */}
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[10.4, 1.35, 0.04]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[10.15, 1.15, 0.04]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>

          {/* Primary Illuminated Headline: TECH STACK PLAYGROUND */}
          <Text
            position={[0, 0.22, 0.15]}
            fontSize={0.78}
            fontWeight={900}
            color="#ffffff"
            outlineWidth={0.04}
            outlineColor="#020617"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            TECH STACK PLAYGROUND
          </Text>

          {/* Subtitle Action Call: RAM INTO THE WALL TO SCATTER SKILLS! */}
          <Text
            position={[0, -0.28, 0.15]}
            fontSize={0.34}
            fontWeight={800}
            color="#facc15"
            outlineWidth={0.025}
            outlineColor="#020617"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.14}
          >
            RAM INTO THE WALL TO SCATTER SKILLS!
          </Text>
        </group>

        {/* Stadium Floodlight Fixtures Angled Downward at Wall */}
        {[-5.8, 5.8].map((fx, i) => (
          <group
            key={`flood-fixture-${i}`}
            position={[fx, 5.9, 0.5]}
            rotation={[Math.PI / 4.2, fx > 0 ? -0.25 : 0.25, 0]}
          >
            <mesh castShadow>
              <cylinderGeometry args={[0.2, 0.28, 0.45, 8]} />
              <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.23, 0]}>
              <cylinderGeometry args={[0.18, 0.18, 0.02, 8]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#fef08a"
                emissiveIntensity={2.5}
                roughness={0.1}
              />
            </mesh>
          </group>
        ))}

        {/* Dynamic Dual Stadium Floodlights Illuminating the Bricks */}
        <pointLight position={[-4.5, 5.0, 3.5]} color="#fef08a" intensity={4.5} distance={20} decay={2} />
        <pointLight position={[4.5, 5.0, 3.5]} color="#38bdf8" intensity={4.5} distance={20} decay={2} />
        <pointLight position={[0, 1.2, 2.5]} color="#ffffff" intensity={2.8} distance={14} decay={2} />
      </group>

      {/* ======================================================== */}
      {/* 3. KNOCKABLE MULTI-COLORED TECH SKILL BRICK WALL         */}
      {/* ======================================================== */}
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
                    restitution={0.15}
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

                    {/* Skill Label Text on Front Face */}
                    <Text
                      position={[0, 0, brickDepth / 2 + 0.02]}
                      fontSize={0.29}
                      fontWeight={800}
                      color="#ffffff"
                      outlineWidth={0.02}
                      outlineColor="#090d16"
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
                      fontSize={0.29}
                      fontWeight={800}
                      color="#ffffff"
                      outlineWidth={0.02}
                      outlineColor="#090d16"
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
    </group>
  );
};
