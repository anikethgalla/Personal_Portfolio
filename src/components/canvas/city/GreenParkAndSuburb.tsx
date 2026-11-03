import React from 'react';
import { RigidBody } from '@react-three/rapier';
import {
  StylizedOakTree,
  StylizedPineTree,
  BloomingShrub,
  RiverRockCluster,
  WarmStreetLamp,
  StylizedParkBench,
  SidewalkPlanterBox
} from '../environment/StylizedNature';

export const GreenParkAndSuburb: React.FC = () => {
  return (
    <group>
      {/* ======================================================== */}
      {/* CLUSTER OF ARCHITECTURAL COTTAGES & VILLAS (SUBURB)      */}
      {/* ======================================================== */}

      {/* HOUSE 1: Country Cottage at [-26, 0, 14] */}
      <group position={[-26, 0, 14]}>
        <RigidBody type="fixed" friction={0.7}>
          {/* Stone Foundation Base */}
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.0, 0.5, 4.2]} />
            <meshStandardMaterial color="#64748b" roughness={0.9} />
          </mesh>

          {/* Warm Cream Stucco Main House Body */}
          <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.8, 2.5, 4.0]} />
            <meshStandardMaterial color="#fefaf6" roughness={0.65} />
          </mesh>

          {/* Roof Overhanging Eaves Base */}
          <mesh position={[0, 3.02, 0]} castShadow>
            <boxGeometry args={[5.25, 0.14, 4.45]} />
            <meshStandardMaterial color="#451a03" roughness={0.7} />
          </mesh>

          {/* Gabled Pitched Roof with Terracotta Tiles */}
          <mesh position={[-1.15, 3.82, 0]} rotation={[0, 0, 0.6]} castShadow>
            <boxGeometry args={[2.7, 0.16, 4.5]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>
          <mesh position={[1.15, 3.82, 0]} rotation={[0, 0, -0.6]} castShadow>
            <boxGeometry args={[2.7, 0.16, 4.5]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>

          {/* Brick Chimney with Stone Cap */}
          <group position={[1.4, 4.4, 0.8]}>
            <mesh castShadow>
              <boxGeometry args={[0.55, 1.4, 0.55]} />
              <meshStandardMaterial color="#991b1b" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.72, 0]} castShadow>
              <boxGeometry args={[0.65, 0.08, 0.65]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
            </mesh>
          </group>

          {/* Recessed Timber Front Door */}
          <mesh position={[2.42, 1.0, 0]}>
            <boxGeometry args={[0.08, 1.9, 0.95]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>
          {/* Front Porch Stone Step */}
          <mesh position={[2.7, 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.3, 1.5]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.75} />
          </mesh>

          {/* Front Glowing Windows with Timber Frame & Cross Mullions */}
          {/* Window Right (z = 1.2) */}
          <group position={[2.42, 1.9, 1.2]}>
            <mesh>
              <boxGeometry args={[0.06, 0.9, 0.8]} />
              <meshStandardMaterial
                color="#fef08a"
                emissive="#f59e0b"
                emissiveIntensity={0.85}
                roughness={0.2}
              />
            </mesh>
            {/* Dark wood frame */}
            <mesh position={[0.01, 0, 0]}>
              <boxGeometry args={[0.08, 0.96, 0.06]} />
              <meshStandardMaterial color="#451a03" />
            </mesh>
            <mesh position={[0.01, 0, 0]}>
              <boxGeometry args={[0.08, 0.06, 0.86]} />
              <meshStandardMaterial color="#451a03" />
            </mesh>
          </group>

          {/* Window Left (z = -1.2) */}
          <group position={[2.42, 1.9, -1.2]}>
            <mesh>
              <boxGeometry args={[0.06, 0.9, 0.8]} />
              <meshStandardMaterial
                color="#fef08a"
                emissive="#f59e0b"
                emissiveIntensity={0.85}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0.01, 0, 0]}>
              <boxGeometry args={[0.08, 0.96, 0.06]} />
              <meshStandardMaterial color="#451a03" />
            </mesh>
            <mesh position={[0.01, 0, 0]}>
              <boxGeometry args={[0.08, 0.06, 0.86]} />
              <meshStandardMaterial color="#451a03" />
            </mesh>
          </group>
        </RigidBody>

        {/* Garden Shrubs and Planters around House 1 */}
        <BloomingShrub position={[2.6, 0, 1.9]} scale={0.9} flowerColor="#f43f5e" />
        <BloomingShrub position={[2.6, 0, -1.9]} scale={0.9} flowerColor="#fbbf24" />
      </group>

      {/* HOUSE 2: Split-Level Modern Villa at [-32, 0, -16] */}
      <group position={[-32, 0, -16]}>
        <RigidBody type="fixed" friction={0.7}>
          {/* Main Slate-Gray Block */}
          <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.0, 4.4, 4.2]} />
            <meshStandardMaterial color="#475569" roughness={0.5} />
          </mesh>
          {/* Roof Parapet Cap */}
          <mesh position={[0, 4.45, 0]} castShadow>
            <boxGeometry args={[5.3, 0.25, 4.5]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>

          {/* Cantilevered Front Wing with Cedar Wood Cladding */}
          <mesh position={[0.2, 1.25, 3.2]} castShadow receiveShadow>
            <boxGeometry args={[4.4, 2.5, 2.4]} />
            <meshStandardMaterial color="#b45309" roughness={0.65} />
          </mesh>
          <mesh position={[0.2, 2.52, 3.2]} castShadow>
            <boxGeometry args={[4.6, 0.15, 2.6]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>

          {/* Floor-to-Ceiling Glowing Golden Glass Facade */}
          <mesh position={[2.52, 2.6, 0]}>
            <boxGeometry args={[0.06, 1.6, 2.4]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#f59e0b"
              emissiveIntensity={0.8}
              roughness={0.15}
            />
          </mesh>
        </RigidBody>
        <RiverRockCluster position={[2.8, 0, 1.6]} scale={1.2} />
      </group>

      {/* HOUSE 3: Craftsman Home at [-32, 0, -2] */}
      <group position={[-32, 0, -2]}>
        <RigidBody type="fixed" friction={0.7}>
          {/* Warm Amber Siding */}
          <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.4, 3.2, 4.6]} />
            <meshStandardMaterial color="#d97706" roughness={0.65} />
          </mesh>

          {/* Gabled Overhanging Timber Roof */}
          <mesh position={[-1.0, 3.95, 0]} rotation={[0, 0, 0.55]} castShadow>
            <boxGeometry args={[2.6, 0.18, 5.0]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>
          <mesh position={[1.0, 3.95, 0]} rotation={[0, 0, -0.55]} castShadow>
            <boxGeometry args={[2.6, 0.18, 5.0]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>

          {/* Front Porch Awning & Step */}
          <mesh position={[2.55, 1.7, 0]} rotation={[0, 0, -0.2]} castShadow>
            <boxGeometry args={[1.3, 0.1, 2.8]} />
            <meshStandardMaterial color="#92400e" roughness={0.6} />
          </mesh>
          <mesh position={[2.6, 0.15, 0]} castShadow>
            <boxGeometry args={[0.6, 0.3, 2.0]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
          </mesh>

          {/* Glowing Windows */}
          <mesh position={[2.22, 1.9, 1.4]}>
            <boxGeometry args={[0.06, 0.85, 0.75]} />
            <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[2.22, 1.9, -1.4]}>
            <boxGeometry args={[0.06, 0.85, 0.75]} />
            <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={0.8} />
          </mesh>
        </RigidBody>
      </group>

      {/* HOUSE 4: Cozy Garden Bungalow at [-18, 0, -28] (Moved back to open spacious Tech Playground) */}
      <group position={[-18, 0, -28]}>
        <RigidBody type="fixed" friction={0.7}>
          <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.2, 2.8, 3.6]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
          </mesh>
          <mesh position={[0, 3.2, 0]} rotation={[0.42, 0, 0]} castShadow>
            <boxGeometry args={[4.5, 0.16, 2.4]} />
            <meshStandardMaterial color="#ea580c" roughness={0.5} />
          </mesh>
          <mesh position={[0, 3.2, 0]} rotation={[-0.42, 0, 0]} castShadow>
            <boxGeometry args={[4.5, 0.16, 2.4]} />
            <meshStandardMaterial color="#ea580c" roughness={0.5} />
          </mesh>
          {/* Glowing Windows */}
          <mesh position={[0, 1.6, 1.82]}>
            <boxGeometry args={[1.2, 0.8, 0.05]} />
            <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={0.8} />
          </mesh>
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* 2. RICH STYLIZED TREES & PARK NATURE (MONUMENT VALLEY)   */}
      {/* ======================================================== */}

      {/* West Park & Nature Belt (Cleared runway corridor for Tech Stack Playground) */}
      <StylizedOakTree position={[-18, 0, -32]} scale={1.25} color="#4d7c0f" />
      <StylizedOakTree position={[-13, 0, 6]} scale={1.25} autumn />
      <StylizedPineTree position={[-13, 0, 15]} scale={1.2} />
      <StylizedOakTree position={[-28, 0, -23]} scale={1.35} autumn />
      <StylizedPineTree position={[-34, 0, -10]} scale={1.1} />
      <StylizedOakTree position={[-20, 0, 6]} scale={1.1} color="#559c19" />
      <StylizedOakTree position={[-20, 0, 18]} scale={1.3} color="#4d7c0f" />
      <StylizedOakTree position={[-29, 0, 20]} scale={1.3} autumn />
      <StylizedPineTree position={[-30, 0, 5]} scale={1.1} />
      <StylizedPineTree position={[-30, 0, -6]} scale={1.05} />
      <StylizedOakTree position={[-34, 0, 8]} scale={1.1} color="#3f6212" />
      <StylizedOakTree position={[-34, 0, -14]} scale={1.15} color="#559c19" />

      {/* Park Walkway Benches & Streetlamps */}
      <StylizedParkBench position={[-14.5, 0, 10]} rotation={[0, Math.PI / 2, 0]} />
      <WarmStreetLamp position={[-14.5, 0, 1.5]} rotationY={Math.PI / 2} />
      <WarmStreetLamp position={[-14.5, 0, 18]} rotationY={Math.PI / 2} />

      {/* Scattered River Rocks & Blossoming Shrubs (Clean perimeter framing) */}
      <RiverRockCluster position={[-16, 0, 4]} scale={0.9} />
      <BloomingShrub position={[-16, 0, 8]} scale={1.0} flowerColor="#fbbf24" />

      {/* North-East Park & Bowling Grandstand Trees */}
      <StylizedOakTree position={[8, 0, -10]} scale={1.2} color="#559c19" />
      <StylizedPineTree position={[14, 0, -10]} scale={1.15} />
      <StylizedOakTree position={[8, 0, -22]} scale={1.3} autumn />
      <StylizedPineTree position={[15, 0, -23]} scale={1.25} />

      {/* South-East Garden & Diner Parklet Trees */}
      <StylizedOakTree position={[8, 0, 10]} scale={1.25} color="#559c19" />
      <StylizedPineTree position={[14, 0, 10]} scale={1.1} />

      {/* Horizon Background Pine Trees (Far North) */}
      <StylizedPineTree position={[-24, 0, -36]} scale={1.4} />
      <StylizedPineTree position={[-14, 0, -36]} scale={1.45} />
      <StylizedPineTree position={[14, 0, -36]} scale={1.45} />
      <StylizedPineTree position={[24, 0, -36]} scale={1.4} />

      {/* South-West Trees (West of South Avenue) */}
      <StylizedOakTree position={[-10, 0, 28]} scale={1.2} color="#4d7c0f" />

      {/* Additional Park Benches & Street Lamps */}
      <StylizedParkBench position={[-20, 0, 3]} rotation={[0, Math.PI, 0]} />
      <StylizedParkBench position={[-30, 0, 1.5]} rotation={[0, -Math.PI / 2, 0]} />
      <StylizedParkBench position={[11, 0, -14]} rotation={[0, Math.PI / 2, 0]} />
      <StylizedParkBench position={[11, 0, 14]} rotation={[0, Math.PI / 2, 0]} />

      <WarmStreetLamp position={[7.5, 0, -7]} rotationY={Math.PI / 2} />
      <WarmStreetLamp position={[7.5, 0, 7]} rotationY={Math.PI / 2} />
      <WarmStreetLamp position={[16, 0, -7]} rotationY={-Math.PI / 2} />
      <WarmStreetLamp position={[16, 0, 7]} rotationY={-Math.PI / 2} />
      <WarmStreetLamp position={[-28, 0, -8]} rotationY={Math.PI / 2} />
      <WarmStreetLamp position={[-23, 0, 15]} rotationY={Math.PI / 2} />
    </group>
  );
};