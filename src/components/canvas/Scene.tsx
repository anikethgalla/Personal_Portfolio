import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import * as THREE from 'three';
import { Ground } from './environment/Ground';
import { Boundaries } from './environment/Boundaries';
import { Vehicle } from './Vehicle';
import { CameraFollow } from './CameraFollow';
import { HeroZone } from './zones/HeroZone';
import { ProjectsZone } from './zones/ProjectsZone';
import { SkillsZone } from './zones/SkillsZone';
import { ContactZone } from './zones/ContactZone';
import { CoastalPort } from './city/CoastalPort';
import { GreenParkAndSuburb } from './city/GreenParkAndSuburb';

export const Scene: React.FC = () => {
  const [vehiclePos, setVehiclePos] = useState<THREE.Vector3 | null>(new THREE.Vector3(0, 1.0, 6));

  return (
    <div className="absolute inset-0 w-full h-full bg-[#ded6cb]">
      <Canvas
        shadows
        camera={{ position: [0, 12, 16], fov: 45, near: 0.1, far: 200 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05
        }}
      >
        {/* Warm Studio Lighting Setup - Bruno Simon Palette */}
        <ambientLight intensity={0.7} color="#fff7ed" />

        {/* Primary Sun / Studio Key Light */}
        <directionalLight
          position={[25, 35, 20]}
          intensity={1.8}
          color="#fffdf7"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={120}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={40}
          shadow-camera-bottom={-40}
          shadow-bias={-0.0002}
        />

        {/* Soft Secondary Fill Light */}
        <directionalLight position={[-20, 20, -20]} intensity={0.4} color="#e2e8f0" />

        {/* Camera Tracker */}
        <CameraFollow targetPosition={vehiclePos} />

        {/* Rapier Physics Simulation */}
        <Physics gravity={[0, -20, 0]} timeStep="vary">
          <Ground />
          <Boundaries />
          <CoastalPort />
          <GreenParkAndSuburb />
          <HeroZone />
          <ProjectsZone vehiclePosition={vehiclePos} />
          <SkillsZone vehiclePosition={vehiclePos} />
          <ContactZone vehiclePosition={vehiclePos} />
          <Vehicle onPositionUpdate={setVehiclePos} />
        </Physics>
      </Canvas>
    </div>
  );
};

