import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { projectsData, Project } from '../../../data/projectsData';
import { useGame } from '../../../context/GameContext';

interface ProjectsZoneProps {
  vehiclePosition: THREE.Vector3 | null;
}

export const ProjectsZone: React.FC<ProjectsZoneProps> = ({ vehiclePosition }) => {
  const { setActiveProject, activeProject, markZoneDiscovered } = useGame();

  useFrame(() => {
    if (!vehiclePosition) return;

    let closestProject: Project | null = null;
    let minDistance = 3.6; // Trigger radius for parking spots

    projectsData.forEach((project) => {
      const projPos = new THREE.Vector3(...project.spawnPosition);
      const dist = projPos.distanceTo(vehiclePosition);

      if (dist < minDistance) {
        closestProject = project;
        minDistance = dist;
      }
    });

    if (closestProject !== activeProject) {
      setActiveProject(closestProject);
      if (closestProject) {
        markZoneDiscovered('projects');
      }
    }
  });

  const trueforgeProj = projectsData.find((p) => p.id === 'trueforge');
  const robosurgeProj = projectsData.find((p) => p.id === 'robosurge');
  const backendProj = projectsData.find((p) => p.id === 'distributed-backend');

  const isTrueforgeActive = activeProject?.id === 'trueforge';
  const isRobosurgeActive = activeProject?.id === 'robosurge';
  const isBackendActive = activeProject?.id === 'distributed-backend';

  return (
    <group>
      {/* Zone Title Sign */}
      <group position={[15, 6.2, 0]}>
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
          DRIVE INTO ANY PARKING BAY TO INSPECT
        </Text>
      </group>

      {/* ======================================================== */}
      {/* STRUCTURE 1: THE RETRO DRIVE-IN CINEMA (TrueForge)       */}
      {/* ======================================================== */}
      <group position={[16, 0, -12]}>
        {/* Drive-in Parking Bay at [10, 0, -12] (relative: [-6, 0, 0]) */}
        <group position={[-6, 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 36]} />
            <meshBasicMaterial
              color={isTrueforgeActive ? '#ea580c' : '#cfc5b5'}
              transparent
              opacity={isTrueforgeActive ? 0.9 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 4.6]} />
            <meshBasicMaterial
              color={isTrueforgeActive ? '#ea580c' : '#ded7cb'}
              transparent
              opacity={isTrueforgeActive ? 0.15 : 0.05}
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
            {isTrueforgeActive ? '★ PARKED AT TRUEFORGE ★' : 'DRIVE-IN CINEMA BAY'}
          </Text>

          {/* Drive-In Speaker Post Left */}
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

          {/* Drive-In Speaker Post Right */}
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
          {/* Main Frame */}
          <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 5.2, 8.8]} />
            <meshStandardMaterial color="#bdaea0" roughness={0.8} />
          </mesh>

          {/* Projection Screen Surface (Facing -X towards parking bay) */}
          <mesh position={[-0.42, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[8.2, 4.6]} />
            <meshStandardMaterial
              color="#fcfbf7"
              roughness={0.9}
              emissive="#fcfbf7"
              emissiveIntensity={0.08}
            />
          </mesh>

          {/* Screen Content Typography */}
          <group position={[-0.43, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <Text
              position={[0, 1.3, 0]}
              fontSize={0.62}
              fontWeight={800}
              color="#ea580c"
              anchorX="center"
              anchorY="middle"
            >
              TRUEFORGE
            </Text>
            <Text
              position={[0, 0.6, 0]}
              fontSize={0.28}
              fontWeight={700}
              color="#2c2520"
              anchorX="center"
              anchorY="middle"
            >
              AUTONOMOUS AGENT BENCHMARK
            </Text>
            <Text
              position={[0, -0.1, 0]}
              fontSize={0.2}
              fontWeight={500}
              color="#6b5e52"
              anchorX="center"
              anchorY="middle"
              maxWidth={7.2}
            >
              Docker Sandboxes • Test Harness • Multi-Repo Evaluation
            </Text>
            <mesh position={[0, -1.0, 0]}>
              <boxGeometry args={[3.2, 0.36, 0.02]} />
              <meshStandardMaterial
                color={isTrueforgeActive ? '#ea580c' : '#2c2520'}
                roughness={0.3}
              />
            </mesh>
            <Text
              position={[0, -1.0, 0.02]}
              fontSize={0.18}
              fontWeight={700}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {isTrueforgeActive ? '★ PARKED — TAP TO INSPECT ★' : 'PULL UP TO SCREEN TO VIEW'}
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
      {/* STRUCTURE 2: THE GOURMET FOOD TRUCK (Robosurge)          */}
      {/* Stationary Fixed Physics Body - Cannot be moved by WASD  */}
      {/* ======================================================== */}
      <group position={[18, 0, -2]}>
        {/* Customer Parking Bay at [14, 0, -2] (relative: [-4, 0, 0]) */}
        <group position={[-4, 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 36]} />
            <meshBasicMaterial
              color={isRobosurgeActive ? '#0284c7' : '#cfc5b5'}
              transparent
              opacity={isRobosurgeActive ? 0.9 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 4.6]} />
            <meshBasicMaterial
              color={isRobosurgeActive ? '#0284c7' : '#ded7cb'}
              transparent
              opacity={isRobosurgeActive ? 0.15 : 0.05}
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
            {isRobosurgeActive ? '★ PARKED AT ROBOSURGE ★' : 'FOOD TRUCK ORDER BAY'}
          </Text>
        </group>

        {/* Stationary Food Truck Physics Body (FIXED, IMMOVABLE) */}
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

          {/* Side Serving Window Opening Cutout & Counter (Facing -X towards customer bay) */}
          <mesh position={[-1.06, 1.55, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[2.8, 1.1]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>

          {/* Flipped-Up Serving Hatch Awning (Props up on two struts) */}
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
              fontSize={0.11}
              fontWeight={800}
              color="#0284c7"
              anchorX="center"
              anchorY="middle"
            >
              ROBOSURGE
            </Text>
            <Text
              position={[0, 0.22, 0.01]}
              fontSize={0.075}
              fontWeight={700}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              CV & ROBOTICS
            </Text>
            <Text
              position={[0, -0.05, 0.01]}
              fontSize={0.06}
              fontWeight={500}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.8}
            >
              • 60 FPS Dual-Cam{'\n'}• Surgical Tracking{'\n'}• SQLite WAL Log
            </Text>
          </group>

          {/* Roof Exhaust Vent Chimney */}
          <mesh position={[0.4, 2.95, -1.2]} castShadow>
            <cylinderGeometry args={[0.2, 0.25, 0.4, 12]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.6} />
          </mesh>

          {/* Stationary Wheels (Front & Rear, Left & Right) */}
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
      {/* STRUCTURE 3: THE CLASSIC CLAY DINER (Distributed Backend) */}
      {/* ======================================================== */}
      <group position={[18, 0, 10]}>
        {/* Drive-Up Parking Stall at [12, 0, 10] (relative: [-6, 0, 0]) */}
        <group position={[-6, 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 36]} />
            <meshBasicMaterial
              color={isBackendActive ? '#7c3aed' : '#cfc5b5'}
              transparent
              opacity={isBackendActive ? 0.9 : 0.4}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 4.6]} />
            <meshBasicMaterial
              color={isBackendActive ? '#7c3aed' : '#ded7cb'}
              transparent
              opacity={isBackendActive ? 0.15 : 0.05}
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
            {isBackendActive ? '★ PARKED AT BACKEND DINER ★' : 'DINER DRIVE-UP BAY'}
          </Text>
        </group>

        {/* Diner Architecture Physics Body (FIXED) */}
        <RigidBody type="fixed" friction={0.8} position={[0, 0, 0]}>
          {/* Main Clay Building Block */}
          <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.2, 3.6, 7.8]} />
            <meshStandardMaterial color="#ede6dc" roughness={0.7} />
          </mesh>

          {/* Roof Parapet Trim (Warm Terracotta Deco Styling) */}
          <mesh position={[0, 3.65, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.5, 0.4, 8.1]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>

          {/* Striped Clay Awning along the front (-X side) */}
          <group position={[-2.7, 2.65, 0]}>
            {/* Awning frame sloped downward */}
            <mesh rotation={[0, 0, -0.32]} castShadow>
              <boxGeometry args={[1.6, 0.06, 6.8]} />
              <meshStandardMaterial color="#ea580c" roughness={0.5} />
            </mesh>
            {/* Awning stripes visual */}
            {[-2.8, -1.8, -0.8, 0.2, 1.2, 2.2].map((z, i) => (
              <mesh key={`awn-stripe-${i}`} position={[0, 0.04, z]} rotation={[0, 0, -0.32]}>
                <boxGeometry args={[1.62, 0.07, 0.5]} />
                <meshStandardMaterial color="#fcfbf7" roughness={0.5} />
              </mesh>
            ))}
          </group>

          {/* Glazed Window Strip on Front (-X side) */}
          <mesh position={[-2.62, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[6.2, 1.4]} />
            <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
          </mesh>

          {/* Drive-Through Service Counter Window & Shelf */}
          <mesh position={[-2.75, 1.0, 0]} castShadow>
            <boxGeometry args={[0.4, 0.1, 2.6]} />
            <meshStandardMaterial color="#c5b9a8" roughness={0.5} />
          </mesh>

          {/* 3D Embossed Clay Roof Sign: "DINER" */}
          <group position={[-1.2, 4.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[4.2, 0.9, 0.25]} />
              <meshStandardMaterial color="#fcfbf7" roughness={0.6} />
            </mesh>
            <Text
              position={[0, 0.08, 0.14]}
              fontSize={0.48}
              fontWeight={900}
              color="#c2410c"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.08}
            >
              DINER
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
              24/7 BACKEND API
            </Text>
          </group>
        </RigidBody>
      </group>
    </group>
  );
};
