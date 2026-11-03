import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { projectsData } from '../../../data/projectsData';
import { experienceData } from '../../../data/experienceData';
import { useGame } from '../../../context/GameContext';

interface ProjectsZoneProps {
  vehiclePosition: THREE.Vector3 | null;
}

export const ProjectsZone: React.FC<ProjectsZoneProps> = ({ vehiclePosition }) => {
  const {
    setActiveProject,
    activeProject,
    markZoneDiscovered,
    currentProjectIndex,
    nextProject,
    prevProject,
    enterFpv,
    exitFpv,
    fpvProject,
    activeExperience,
    setActiveExperience,
    currentExperienceIndex,
    nextExperience,
    prevExperience,
    enterExperienceFpv,
    exitExperienceFpv,
    fpvExperience
  } = useGame();

  const driveInBayPos = new THREE.Vector3(20, 0, -16);
  const dinerBayPos = new THREE.Vector3(20, 0, 16);

  const isParkedAtCinema = vehiclePosition ? driveInBayPos.distanceTo(vehiclePosition) < 5.2 : false;
  const isParkedAtDiner = vehiclePosition ? dinerBayPos.distanceTo(vehiclePosition) < 5.2 : false;

  const currentProject = projectsData[currentProjectIndex] || projectsData[0];
  const currentExp = experienceData[currentExperienceIndex] || experienceData[0];

  const hasAutoEnteredCinema = React.useRef(false);
  const hasAutoEnteredDiner = React.useRef(false);

  useFrame(() => {
    if (!vehiclePosition) return;

    // 1. Cinema Bay Detection
    const distCinema = driveInBayPos.distanceTo(vehiclePosition);
    if (distCinema < 5.2) {
      if (activeProject !== currentProject) {
        setActiveProject(currentProject);
        markZoneDiscovered('projects');
      }
      if (!hasAutoEnteredCinema.current) {
        hasAutoEnteredCinema.current = true;
        if (!fpvProject) {
          enterFpv(currentProject);
        }
      }
    } else if (distCinema > 7.0) {
      hasAutoEnteredCinema.current = false;
      if (activeProject) {
        setActiveProject(null);
      }
      if (fpvProject) {
        exitFpv();
      }
    }

    // 2. Diner Bay Detection (Experience & Societies)
    const distDiner = dinerBayPos.distanceTo(vehiclePosition);
    if (distDiner < 5.2) {
      if (activeExperience !== currentExp) {
        setActiveExperience(currentExp);
        markZoneDiscovered('projects');
      }
      if (!hasAutoEnteredDiner.current) {
        hasAutoEnteredDiner.current = true;
        if (!fpvExperience) {
          enterExperienceFpv(currentExp);
        }
      }
    } else if (distDiner > 7.0) {
      hasAutoEnteredDiner.current = false;
      if (activeExperience) {
        setActiveExperience(null);
      }
      if (fpvExperience) {
        exitExperienceFpv();
      }
    }
  });

  return (
    <group>
      {/* Zone Title Sign */}
      <group position={[25, 6.8, 0]}>
        <Text
          fontSize={1.4}
          fontWeight={800}
          color="#332d29"
          anchorX="center"
          anchorY="middle"
        >
          PROJECTS STRIP
        </Text>
        <Text
          position={[0, -0.75, 0]}
          fontSize={0.42}
          fontWeight={600}
          color="#786c62"
          anchorX="center"
          anchorY="middle"
        >
          DRIVE-IN: ALL PROJECTS • DINER: EXPERIENCE & SOCIETIES
        </Text>
      </group>

      {/* ======================================================== */}
      {/* STRUCTURE 1: THE DRIVE-IN CINEMA SCREEN (ALL PROJECTS)   */}
      {/* ======================================================== */}
      <group position={[28, 0, -16]}>
        {/* Drive-in Parking Bay at [20, 0, -16] (relative: [-8, 0, 0]) */}
        <group position={[-8, 0.035, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 36]} />
            <meshBasicMaterial
              color={isParkedAtCinema ? '#f59e0b' : '#cfc5b5'}
              transparent
              opacity={isParkedAtCinema ? 0.95 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 4.6]} />
            <meshBasicMaterial
              color={isParkedAtCinema ? '#f59e0b' : '#ded7cb'}
              transparent
              opacity={isParkedAtCinema ? 0.18 : 0.05}
            />
          </mesh>
          <Text
            position={[0, 0.01, 1.8]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.24}
            fontWeight={700}
            color="#786c62"
            anchorX="center"
            anchorY="middle"
          >
            {isParkedAtCinema ? '★ PARKED AT DRIVE-IN THEATER ★' : 'DRIVE-IN CINEMA BAY'}
          </Text>

          {/* Speaker Posts Left & Right */}
          <group position={[-1.7, 0, -1.2]}>
            <mesh position={[0, 0.6, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.05, 1.2, 8]} />
              <meshStandardMaterial color="#475569" roughness={0.7} />
            </mesh>
            <mesh position={[0, 1.25, 0]} castShadow>
              <boxGeometry args={[0.22, 0.28, 0.16]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.4} />
            </mesh>
          </group>

          <group position={[1.7, 0, -1.2]}>
            <mesh position={[0, 0.6, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.05, 1.2, 8]} />
              <meshStandardMaterial color="#475569" roughness={0.7} />
            </mesh>
            <mesh position={[0, 1.25, 0]} castShadow>
              <boxGeometry args={[0.22, 0.28, 0.16]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.4} />
            </mesh>
          </group>
        </group>

        {/* Billboard Screen Rigid Body (Fixed) */}
        <RigidBody type="fixed" friction={0.8} position={[0, 0, 0]}>
          {/* Main Outer Billboard Frame */}
          <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 5.2, 9.6]} />
            <meshStandardMaterial color="#bdaea0" roughness={0.8} />
          </mesh>

          {/* Projection Screen Surface (Facing -X towards parking bay) */}
          <mesh position={[-0.42, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[9.1, 4.8]} />
            <meshStandardMaterial color="#0b1120" roughness={0.9} />
          </mesh>

          {/* 3D Native Cinema Screen Dynamic Project Typography */}
          <group position={[-0.44, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            {/* Slide Index & Category Badge */}
            <Text
              position={[0, 1.85, 0]}
              fontSize={0.17}
              fontWeight={800}
              color="#f59e0b"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.12}
            >
              {`[ PROJECT ${currentProjectIndex + 1} OF ${projectsData.length} ] • ${currentProject.category.toUpperCase()}`}
            </Text>

            {/* Project Title */}
            <Text
              position={[0, 1.35, 0]}
              fontSize={0.52}
              fontWeight={900}
              color="#38bdf8"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.03}
              maxWidth={7.8}
            >
              {currentProject.title.toUpperCase()}
            </Text>

            {/* Project Short Description / Tagline */}
            <Text
              position={[0, 0.72, 0]}
              fontSize={0.24}
              fontWeight={700}
              color="#f8fafc"
              anchorX="center"
              anchorY="middle"
              maxWidth={7.6}
            >
              {currentProject.shortDesc}
            </Text>

            {/* Tech Stack List */}
            <Text
              position={[0, 0.12, 0]}
              fontSize={0.19}
              fontWeight={600}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
              maxWidth={7.8}
            >
              {currentProject.tags.join(' • ')}
            </Text>

            {/* Key Metrics / Highlights */}
            <Text
              position={[0, -0.42, 0]}
              fontSize={0.17}
              fontWeight={500}
              color="#cbd5e1"
              anchorX="center"
              anchorY="middle"
              maxWidth={7.6}
            >
              {`✓ ${currentProject.metrics[0]}   |   ✓ ${currentProject.metrics[1]}`}
            </Text>

            {/* Bottom Status / Navigation Guidance Pill */}
            <mesh position={[0, -1.3, 0]}>
              <boxGeometry args={[6.8, 0.44, 0.04]} />
              <meshStandardMaterial
                color={isParkedAtCinema ? '#d97706' : '#1e293b'}
                roughness={0.3}
              />
            </mesh>
            <Text
              position={[0, -1.3, 0.03]}
              fontSize={0.18}
              fontWeight={800}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {isParkedAtCinema
                ? 'USE ◀ ARROWS ▶ TO FLIP PROJECTS • PRESS ESC TO EXIT'
                : 'PULL INTO BAY FOR FPV SCREEN'}
            </Text>
          </group>

          {/* Interactive Left Arrow Button Next to Screen (3D Clickable) */}
          <group
            position={[-0.45, 3.2, -5.1]}
            rotation={[0, -Math.PI / 2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              prevProject();
            }}
          >
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.12, 24]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.3} emissive="#f59e0b" emissiveIntensity={0.2} />
            </mesh>
            <Text
              position={[0, 0, 0.08]}
              fontSize={0.42}
              fontWeight={900}
              color="#0f172a"
              anchorX="center"
              anchorY="middle"
            >
              ◀
            </Text>
          </group>

          {/* Interactive Right Arrow Button Next to Screen (3D Clickable) */}
          <group
            position={[-0.45, 3.2, 5.1]}
            rotation={[0, -Math.PI / 2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              nextProject();
            }}
          >
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.12, 24]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.3} emissive="#f59e0b" emissiveIntensity={0.2} />
            </mesh>
            <Text
              position={[0, 0, 0.08]}
              fontSize={0.42}
              fontWeight={900}
              color="#0f172a"
              anchorX="center"
              anchorY="middle"
            >
              ▶
            </Text>
          </group>

          {/* Rear Structural A-Frame Trusses */}
          <mesh position={[1.4, 2.2, -2.8]} rotation={[0, 0, -0.3]} castShadow>
            <boxGeometry args={[0.35, 4.8, 0.35]} />
            <meshStandardMaterial color="#8a796b" roughness={0.9} />
          </mesh>
          <mesh position={[1.4, 2.2, 2.8]} rotation={[0, 0, -0.3]} castShadow>
            <boxGeometry args={[0.35, 4.8, 0.35]} />
            <meshStandardMaterial color="#8a796b" roughness={0.9} />
          </mesh>
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* STRUCTURE 2: THE ROADSIDE STREET FOOD TRUCK              */}
      {/* Authentic Town Food Truck                                */}
      {/* ======================================================== */}
      <group position={[30, 0, 0]}>
        <RigidBody type="fixed" friction={0.9} position={[0, 0, 0]}>
          {/* Main Truck Body Box (Rear Kitchen) */}
          <mesh position={[0.2, 1.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 2.4, 5.0]} />
            <meshStandardMaterial color="#4a7c82" roughness={0.5} metalness={0.1} />
          </mesh>

          {/* Front Cab */}
          <mesh position={[0.2, 1.15, 3.2]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 1.5, 1.6]} />
            <meshStandardMaterial color="#3f6c71" roughness={0.5} metalness={0.1} />
          </mesh>

          {/* Cab Windshield */}
          <mesh position={[0.2, 1.45, 3.9]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[2.1, 0.75, 0.05]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Front Bumper & Headlights */}
          <mesh position={[0.2, 0.45, 4.05]} castShadow>
            <boxGeometry args={[2.5, 0.25, 0.2]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          <mesh position={[-0.7, 0.65, 4.06]}>
            <boxGeometry args={[0.3, 0.2, 0.05]} />
            <meshStandardMaterial color="#fef08a" roughness={0.3} />
          </mesh>
          <mesh position={[1.1, 0.65, 4.06]}>
            <boxGeometry args={[0.3, 0.2, 0.05]} />
            <meshStandardMaterial color="#fef08a" roughness={0.3} />
          </mesh>

          {/* Flipped-Up Serving Hatch Awning */}
          <mesh position={[-1.5, 2.2, 0]} rotation={[0, 0, -0.45]} castShadow>
            <boxGeometry args={[0.1, 0.05, 3.0]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
          <mesh position={[-1.5, 2.2, 0]} rotation={[0, 0, -0.45]} castShadow>
            <planeGeometry args={[0.9, 2.9]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} side={THREE.DoubleSide} />
          </mesh>

          {/* Serving Counter Ledge */}
          <mesh position={[-1.2, 1.0, 0]} castShadow>
            <boxGeometry args={[0.35, 0.08, 3.0]} />
            <meshStandardMaterial color="#f1ece4" roughness={0.4} />
          </mesh>

          {/* Menu Chalkboard next to window */}
          <group position={[-1.07, 1.6, -1.8]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh>
              <planeGeometry args={[0.9, 1.4]} />
              <meshStandardMaterial color="#1e242b" roughness={0.9} />
            </mesh>
            <Text
              position={[0, 0.45, 0.01]}
              fontSize={0.095}
              fontWeight={800}
              color="#f59e0b"
              anchorX="center"
              anchorY="middle"
            >
              STREET FOOD
            </Text>
            <Text
              position={[0, 0.24, 0.01]}
              fontSize={0.07}
              fontWeight={700}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              TACOS & BURGERS
            </Text>
            <Text
              position={[0, -0.08, 0.01]}
              fontSize={0.055}
              fontWeight={500}
              color="#cbd5e1"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.8}
            >
              • Smash Burger{'\n'}• Birria Tacos{'\n'}• Fresh Horchata{'\n'}• Cold Brew Coffee
            </Text>
          </group>

          {/* In-Counter Kitchen Serving Window Display */}
          <group position={[-0.88, 1.62, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[2.5, 1.3, 0.08]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.045]}>
              <planeGeometry args={[2.4, 1.2]} />
              <meshStandardMaterial color="#080d1a" roughness={0.2} emissive="#f59e0b" emissiveIntensity={0.05} />
            </mesh>
            <Text
              position={[0, 0.35, 0.05]}
              fontSize={0.14}
              fontWeight={800}
              color="#fbbf24"
              anchorX="center"
              anchorY="middle"
            >
              TOWN STREET KITCHEN
            </Text>
            <Text
              position={[0, 0.12, 0.05]}
              fontSize={0.09}
              fontWeight={700}
              color="#10b981"
              anchorX="center"
              anchorY="middle"
            >
              ● KITCHEN GRILL OPEN
            </Text>
            <Text
              position={[0, -0.12, 0.05]}
              fontSize={0.08}
              fontWeight={500}
              color="#cbd5e1"
              anchorX="center"
              anchorY="middle"
            >
              Handcrafted Burgers & Tacos
            </Text>
            <mesh position={[0, -0.38, 0.05]}>
              <boxGeometry args={[1.8, 0.22, 0.01]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
            <Text
              position={[0, -0.38, 0.06]}
              fontSize={0.075}
              fontWeight={800}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              OPEN DAILY 11AM - 10PM
            </Text>
          </group>

          {/* Roof Exhaust Vent Chimney */}
          <mesh position={[0.4, 2.95, -1.2]} castShadow>
            <cylinderGeometry args={[0.2, 0.25, 0.4, 12]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.6} />
          </mesh>

          {/* Stationary Wheels */}
          {[-1.05, 1.45].map((x) =>
            [-1.4, 2.0].map((z) => (
              <group key={`wheel-${x}-${z}`} position={[x, 0.38, z]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                  <cylinderGeometry args={[0.38, 0.38, 0.25, 16]} />
                  <meshStandardMaterial color="#1f2937" roughness={0.9} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} position={[x < 0 ? -0.02 : 0.02, 0, 0]}>
                  <cylinderGeometry args={[0.22, 0.22, 0.26, 12]} />
                  <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
                </mesh>
              </group>
            ))
          )}
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* STRUCTURE 3: THE EXPERIENCE & SOCIETIES DINER            */}
      {/* Dedicated Experience & Leadership FPV Showcase           */}
      {/* ======================================================== */}
      <group position={[28, 0, 16]}>
        {/* Drive-Up Parking Stall at [20, 0, 16] (relative: [-8, 0, 0]) */}
        <group position={[-8, 0.035, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 36]} />
            <meshBasicMaterial
              color={isParkedAtDiner ? '#10b981' : '#cfc5b5'}
              transparent
              opacity={isParkedAtDiner ? 0.95 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 4.6]} />
            <meshBasicMaterial
              color={isParkedAtDiner ? '#10b981' : '#ded7cb'}
              transparent
              opacity={isParkedAtDiner ? 0.18 : 0.05}
            />
          </mesh>
          <Text
            position={[0, 0.01, 1.8]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.24}
            fontWeight={700}
            color="#786c62"
            anchorX="center"
            anchorY="middle"
          >
            {isParkedAtDiner ? '★ PARKED AT EXPERIENCE DINER ★' : 'EXPERIENCE & SOCIETIES BAY'}
          </Text>
        </group>

        {/* Diner Architecture Physics Body (FIXED) */}
        <RigidBody type="fixed" friction={0.8} position={[0, 0, 0]}>
          {/* Main Building Block */}
          <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.2, 3.6, 7.8]} />
            <meshStandardMaterial color="#ede6dc" roughness={0.7} />
          </mesh>

          {/* Roof Parapet Trim */}
          <mesh position={[0, 3.65, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.5, 0.4, 8.1]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>

          {/* Striped Awning along the front (-X side) */}
          <group position={[-2.7, 2.65, 0]}>
            <mesh rotation={[0, 0, -0.32]} castShadow>
              <boxGeometry args={[1.6, 0.06, 6.8]} />
              <meshStandardMaterial color="#10b981" roughness={0.5} />
            </mesh>
            {[-2.8, -1.8, -0.8, 0.2, 1.2, 2.2].map((z, i) => (
              <mesh key={`awn-stripe-${i}`} position={[0, 0.04, z]} rotation={[0, 0, -0.32]}>
                <boxGeometry args={[1.62, 0.07, 0.5]} />
                <meshStandardMaterial color="#fcfbf7" roughness={0.5} />
              </mesh>
            ))}
          </group>

          {/* Drive-Through Service Counter Window & Shelf */}
          <mesh position={[-2.75, 1.0, 0]} castShadow>
            <boxGeometry args={[0.4, 0.1, 2.6]} />
            <meshStandardMaterial color="#c5b9a8" roughness={0.5} />
          </mesh>

          {/* 3D Embossed Roof Sign: "EXPERIENCE DINER" */}
          <group position={[-1.2, 4.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[4.4, 0.9, 0.25]} />
              <meshStandardMaterial color="#fcfbf7" roughness={0.6} />
            </mesh>
            <Text
              position={[0, 0.08, 0.14]}
              fontSize={0.38}
              fontWeight={900}
              color="#047857"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.06}
            >
              EXPERIENCE DINER
            </Text>
            <Text
              position={[0, -0.25, 0.14]}
              fontSize={0.16}
              fontWeight={700}
              color="#786c62"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.12}
            >
              WORK HISTORY & SOCIETIES
            </Text>
          </group>

          {/* In-Counter Terminal Display Mesh (Dynamic Experience Showcase) */}
          <group position={[-2.45, 1.62, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[3.2, 1.5, 0.08]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.045]}>
              <planeGeometry args={[3.1, 1.4]} />
              <meshStandardMaterial color="#06121e" roughness={0.2} emissive="#10b981" emissiveIntensity={0.06} />
            </mesh>

            {/* Slide Index & Category Badge */}
            <Text
              position={[0, 0.52, 0.05]}
              fontSize={0.09}
              fontWeight={800}
              color="#10b981"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.08}
            >
              {`[ ${currentExperienceIndex + 1} / ${experienceData.length} ] • ${currentExp.category.toUpperCase()}`}
            </Text>

            {/* Role & Organization Title */}
            <Text
              position={[0, 0.26, 0.05]}
              fontSize={0.14}
              fontWeight={900}
              color="#f8fafc"
              anchorX="center"
              anchorY="middle"
              maxWidth={3.0}
            >
              {`${currentExp.role.toUpperCase()} @ ${currentExp.organization.toUpperCase()}`}
            </Text>

            {/* Period & Location */}
            <Text
              position={[0, 0.02, 0.05]}
              fontSize={0.09}
              fontWeight={700}
              color="#38bdf8"
              anchorX="center"
              anchorY="middle"
            >
              {`${currentExp.period} • ${currentExp.location}`}
            </Text>

            {/* Highlights Summary */}
            <Text
              position={[0, -0.22, 0.05]}
              fontSize={0.08}
              fontWeight={500}
              color="#cbd5e1"
              anchorX="center"
              anchorY="middle"
              maxWidth={2.9}
            >
              {currentExp.highlights[0]}
            </Text>

            {/* Bottom Status / Navigation Guidance Pill */}
            <mesh position={[0, -0.52, 0.05]}>
              <boxGeometry args={[2.8, 0.22, 0.01]} />
              <meshStandardMaterial color={isParkedAtDiner ? '#059669' : '#1e293b'} />
            </mesh>
            <Text
              position={[0, -0.52, 0.06]}
              fontSize={0.075}
              fontWeight={800}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {isParkedAtDiner
                ? 'USE ◀ ARROWS ▶ TO FLIP EXPERIENCE • PRESS ESC TO EXIT'
                : 'PULL INTO BAY FOR FPV EXPERIENCE'}
            </Text>
          </group>

          {/* 3D Interactive Left Arrow Button Next to Counter Window */}
          <group
            position={[-2.48, 1.62, -1.8]}
            rotation={[0, -Math.PI / 2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              prevExperience();
            }}
          >
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.24, 0.24, 0.08, 20]} />
              <meshStandardMaterial color="#10b981" roughness={0.3} emissive="#10b981" emissiveIntensity={0.25} />
            </mesh>
            <Text
              position={[0, 0, 0.05]}
              fontSize={0.24}
              fontWeight={900}
              color="#06121e"
              anchorX="center"
              anchorY="middle"
            >
              ◀
            </Text>
          </group>

          {/* 3D Interactive Right Arrow Button Next to Counter Window */}
          <group
            position={[-2.48, 1.62, 1.8]}
            rotation={[0, -Math.PI / 2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              nextExperience();
            }}
          >
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.24, 0.24, 0.08, 20]} />
              <meshStandardMaterial color="#10b981" roughness={0.3} emissive="#10b981" emissiveIntensity={0.25} />
            </mesh>
            <Text
              position={[0, 0, 0.05]}
              fontSize={0.24}
              fontWeight={900}
              color="#06121e"
              anchorX="center"
              anchorY="middle"
            >
              ▶
            </Text>
          </group>
        </RigidBody>
      </group>
    </group>
  );
};
