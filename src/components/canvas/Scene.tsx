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
import { EastTownDistrict } from './city/EastTownDistrict';
import { SkyDome } from './environment/SkyDome';
import { ScenicValleys } from './environment/ScenicValleys';

export const Scene: React.FC = () => {
  const [vehiclePos, setVehiclePos] = useState<THREE.Vector3 | null>(new THREE.Vector3(0, 1.0, 14));

  return (
    <div className="absolute inset-0 w-full h-full bg-[#7dd3fc]">
      <Canvas
        shadows
        camera={{ position: [0, 18, 24], fov: 48, near: 0.5, far: 450 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05
        }}
      >
        {/* Vibrant Blue Sky Background & Atmospheric Horizon Fog */}
        <color attach="background" args={['#7dd3fc']} />
        <fog attach="fog" args={['#bae6fd', 120, 380]} />

        {/* Vibrant Sky Dome & Drifting Puffy 3D Clay Clouds */}
        <SkyDome />

        {/* Warm Studio Lighting Setup - Sun and Sky Radiance */}
        <ambientLight intensity={0.7} color="#fffbeb" />

        {/* Primary Sun Light */}
        <directionalLight
          position={[35, 55, 30]}
          intensity={1.8}
          color="#fffdf7"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={180}
          shadow-camera-left={-75}
          shadow-camera-right={75}
          shadow-camera-top={75}
          shadow-camera-bottom={-75}
          shadow-bias={-0.0002}
        />

        {/* Soft Cool Sky Blue Secondary Fill Light */}
        <directionalLight position={[-20, 20, -20]} intensity={0.45} color="#bfdbfe" />

        {/* Camera Tracker */}
        <CameraFollow targetPosition={vehiclePos} />

        {/* Rapier Physics Simulation (Fixed 60Hz deterministic timestep for zero tunneling) */}
        <Physics gravity={[0, -20, 0]}>
          <Ground />
          <Boundaries />
          <ScenicValleys />
          <CoastalPort />
          <GreenParkAndSuburb />
          <EastTownDistrict />
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

