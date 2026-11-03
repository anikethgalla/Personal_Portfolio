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
    const skillsCenter = new THREE.Vector3(-20, 0, -14);
    if (vehiclePosition.distanceTo(skillsCenter) < 16) {
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

  // Chunky, substantial, eye-catching block dimensions
  const brickWidth = 3.4;
  const brickHeight = 1.35;
  const brickDepth = 1.2;

  return (
    <group position={[-20, 0, -14]}>
      {/* ======================================================== */}
      {/* 1. CLEAN HIGHLIGHTED DEMOLITION ARENA IMPACT COURT        */}
      {/* ======================================================== */}

      {/* Main Polished Dark Asphalt Impact Court */}
      <mesh position={[0, 0.015, 2.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16.8, 18]} />
        <meshStandardMaterial color="#1e293b" roughness={0.75} />
      </mesh>

      {/* Perimeter High-Visibility Border Lines */}
      {[-8.2, 8.2].map((bx, i) => (
        <mesh key={`court-border-x-${i}`} position={[bx, 0.022, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.25, 18]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      ))}
      {[-6.2, 11.8].map((bz, i) => (
        <mesh key={`court-border-z-${i}`} position={[0, 0.022, bz]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[16.65, 0.25]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      ))}

      {/* Runway Approach Guidance Chevrons */}
      <group position={[0, 0.028, 6.8]}>
        <Text
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.52}
          fontWeight={900}
          color="#facc15"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          ▲ ▲ ▲ RAM AT FULL SPEED ▲ ▲ ▲
        </Text>
      </group>
      <group position={[0, 0.028, 10.0]}>
        <Text
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.36}
          fontWeight={800}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.18}
        >
          DEMOLITION ARENA • IMPACT ZONE
        </Text>
      </group>

      {/* ======================================================== */}
      {/* 2. INDUSTRIAL OVERHEAD GANTRY ARCH & ILLUMINATED SIGN    */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Left & Right Heavy Steel Truss Pylons (Widened to 16.4m to frame the big wall) */}
        {[-8.2, 8.2].map((px, i) => (
          <group key={`gantry-pylon-${i}`} position={[px, 0, 0]}>
            {/* Concrete Footing Pedestal */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.6, 1.0]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.8} />
            </mesh>
            {/* Steel Column Shaft */}
            <mesh position={[0, 3.9, 0]} castShadow>
              <boxGeometry args={[0.26, 7.6, 0.26]} />
              <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
            </mesh>
            {/* Diagonal Gusset Bracing */}
            <mesh position={[px > 0 ? -0.55 : 0.55, 7.1, 0]} rotation={[0, 0, px > 0 ? 0.7 : -0.7]}>
              <boxGeometry args={[0.12, 1.6, 0.12]} />
              <meshStandardMaterial color="#475569" roughness={0.6} />
            </mesh>
          </group>
        ))}

        {/* Overhead Crossbeam Bridge Truss */}
        <mesh position={[0, 7.8, 0]} castShadow>
          <boxGeometry args={[17.2, 0.34, 0.34]} />
          <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
        </mesh>

        {/* Overhead Illuminated Gantry Signboard Plaque */}
        <group position={[0, 8.35, 0.2]}>
          {/* Backing Frame Board */}
          <mesh castShadow>
            <boxGeometry args={[12.8, 1.7, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
          {/* Glowing Amber Neon Rim Border */}
          <mesh position={[0, 0, 0.09]}>
            <boxGeometry args={[12.55, 1.52, 0.04]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={0.65}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.11]}>
            <boxGeometry args={[12.3, 1.3, 0.04]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>

          {/* Primary Illuminated Headline: TECH STACK PLAYGROUND */}
          <Text
            position={[0, 0.25, 0.16]}
            fontSize={0.96}
            fontWeight={900}
            color="#ffffff"
            outlineWidth={0.05}
            outlineColor="#020617"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.12}
          >
            TECH STACK PLAYGROUND
          </Text>

          {/* Subtitle Action Call: RAM INTO THE WALL TO SCATTER SKILLS! */}
          <Text
            position={[0, -0.32, 0.16]}
            fontSize={0.42}
            fontWeight={800}
            color="#facc15"
            outlineWidth={0.03}
            outlineColor="#020617"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.15}
          >
            RAM INTO THE WALL TO SCATTER SKILLS!
          </Text>
        </group>

        {/* Stadium Floodlight Fixtures Angled Downward at Wall */}
        {[-8.2, 8.2].map((fx, i) => (
          <group
            key={`flood-fixture-${i}`}
            position={[fx, 7.85, 0.6]}
            rotation={[Math.PI / 4.2, fx > 0 ? -0.28 : 0.28, 0]}
          >
            <mesh castShadow>
              <cylinderGeometry args={[0.22, 0.32, 0.5, 8]} />
              <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.255, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.02, 8]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#fef08a"
                emissiveIntensity={2.8}
                roughness={0.1}
              />
            </mesh>
          </group>
        ))}

        {/* Dynamic Dual Stadium Floodlights Illuminating the Bricks */}
        <pointLight position={[-6.0, 6.2, 4.0]} color="#fef08a" intensity={5.2} distance={24} decay={2} />
        <pointLight position={[6.0, 6.2, 4.0]} color="#38bdf8" intensity={5.2} distance={24} decay={2} />
        <pointLight position={[0, 1.8, 3.2]} color="#ffffff" intensity={3.2} distance={18} decay={2} />
      </group>

      {/* ======================================================== */}
      {/* 3. KNOCKABLE MULTI-COLORED TECH SKILL BRICK WALL         */}
      {/* ======================================================== */}
      <group key={`wall-${wallKey}`} position={[0, 0, 0]}>
        {rows.map((row, rowIndex) => {
          const rowY = rowIndex * (brickHeight + 0.04) + brickHeight / 2 + 0.03;
          const totalRowWidth = row.length * brickWidth + (row.length - 1) * 0.08;
          const startX = -totalRowWidth / 2 + brickWidth / 2;

          return (
            <React.Fragment key={`row-${rowIndex}`}>
              {row.map((skill, colIndex) => {
                const brickX = startX + colIndex * (brickWidth + 0.08);

                return (
                  <RigidBody
                    key={skill.id}
                    colliders="cuboid"
                    mass={6.5}
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

                    {/* Skill Label Text on Front Face */}
                    <Text
                      position={[0, 0, brickDepth / 2 + 0.03]}
                      fontSize={0.42}
                      fontWeight={800}
                      color="#ffffff"
                      outlineWidth={0.03}
                      outlineColor="#090d16"
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={brickWidth - 0.25}
                    >
                      {skill.name}
                    </Text>

                    {/* Skill Label Text on Back Face */}
                    <Text
                      position={[0, 0, -brickDepth / 2 - 0.03]}
                      rotation={[0, Math.PI, 0]}
                      fontSize={0.42}
                      fontWeight={800}
                      color="#ffffff"
                      outlineWidth={0.03}
                      outlineColor="#090d16"
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={brickWidth - 0.25}
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
