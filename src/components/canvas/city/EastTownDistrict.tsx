import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import {
  StylizedOakTree,
  StylizedPineTree,
  FireHydrant,
  WarmStreetLamp,
  SidewalkPlanterBox
} from '../environment/StylizedNature';

export const EastTownDistrict: React.FC = () => {
  return (
    <group>
      {/* ======================================================== */}
      {/* 1. BACK-ALLEY AVENUE & TOWN ROADS                        */}
      {/* Runs North-South behind the buildings (x = 44)           */}
      {/* ======================================================== */}
      <mesh position={[44, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 54]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Cross-Alley Connecting to Projects Strip (Between Buildings) */}
      <mesh position={[35, 0.025, -14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      <mesh position={[35, 0.025, 14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Paved Sidewalk Walkway bordering the buildings */}
      <mesh position={[39.5, 0.028, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 52]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
      </mesh>

      {/* ======================================================== */}
      {/* 2. BUILDING 1: 3-STORY CLAY APARTMENT COMPLEX            */}
      {/* Located at [38, 0, -22]                                  */}
      {/* ======================================================== */}
      <group position={[38, 0, -22]}>
        <RigidBody type="fixed" friction={0.8}>
          {/* Main 3-Story Building Block */}
          <mesh position={[0, 3.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.2, 7.2, 7.5]} />
            <meshStandardMaterial color="#f5ede2" roughness={0.65} />
          </mesh>

          {/* Roof Parapet Cornice */}
          <mesh position={[0, 7.35, 0]} castShadow>
            <boxGeometry args={[6.6, 0.45, 7.9]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>

          {/* Ground Floor Entrance Portico */}
          <mesh position={[-3.15, 1.2, 0]} castShadow>
            <boxGeometry args={[0.3, 2.4, 1.8]} />
            <meshStandardMaterial color="#78350f" roughness={0.5} />
          </mesh>
          <mesh position={[-3.35, 2.5, 0]} castShadow>
            <boxGeometry args={[0.8, 0.15, 2.2]} />
            <meshStandardMaterial color="#ea580c" roughness={0.5} />
          </mesh>

          {/* Recessed Windows on Front Facade (-X side) with Warm Golden Glow */}
          {[-2.2, 0, 2.2].map((z, zi) =>
            [1.4, 3.6, 5.8].map((y, yi) => (
              <group key={`win-apt1-${zi}-${yi}`} position={[-3.12, y, z]}>
                <mesh>
                  <boxGeometry args={[0.06, 1.2, 1.1]} />
                  <meshStandardMaterial
                    color="#fef08a"
                    emissive="#f59e0b"
                    emissiveIntensity={0.85}
                    roughness={0.2}
                  />
                </mesh>
                {/* Dark wood cross mullions */}
                <mesh position={[0.01, 0, 0]}>
                  <boxGeometry args={[0.08, 1.25, 0.06]} />
                  <meshStandardMaterial color="#451a03" />
                </mesh>
                <mesh position={[0.01, 0, 0]}>
                  <boxGeometry args={[0.08, 0.06, 1.15]} />
                  <meshStandardMaterial color="#451a03" />
                </mesh>
              </group>
            ))
          )}

          {/* Window Sill Trim */}
          {[-2.2, 0, 2.2].map((z, zi) =>
            [1.4, 3.6, 5.8].map((y, yi) => (
              <mesh key={`sill-apt1-${zi}-${yi}`} position={[-3.18, y - 0.65, z]} castShadow>
                <boxGeometry args={[0.18, 0.1, 1.3]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
              </mesh>
            ))
          )}

          {/* Rooftop Wooden Water Tower */}
          <group position={[0.8, 7.6, 1.2]}>
            {/* 4 Stilt Legs */}
            {[-0.6, 0.6].map((sx) =>
              [-0.6, 0.6].map((sz) => (
                <mesh key={`stilt-${sx}-${sz}`} position={[sx, 0.8, sz]} castShadow>
                  <cylinderGeometry args={[0.06, 0.06, 1.6, 8]} />
                  <meshStandardMaterial color="#451a03" roughness={0.8} />
                </mesh>
              ))
            )}
            {/* Cedar Tank Cylinder */}
            <mesh position={[0, 2.2, 0]} castShadow>
              <cylinderGeometry args={[0.9, 0.9, 1.6, 16]} />
              <meshStandardMaterial color="#92400e" roughness={0.8} />
            </mesh>
            {/* Conical Roof */}
            <mesh position={[0, 3.3, 0]} castShadow>
              <coneGeometry args={[1.05, 0.7, 16]} />
              <meshStandardMaterial color="#78350f" roughness={0.7} />
            </mesh>
          </group>

          {/* Rooftop HVAC Vent Box */}
          <mesh position={[-1.2, 7.9, -1.8]} castShadow>
            <boxGeometry args={[1.6, 0.7, 1.4]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.5} />
          </mesh>
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* 3. BUILDING 2: INDUSTRIAL LOFT APARTMENTS                */}
      {/* Located at [39, 0, 8]                                    */}
      {/* ======================================================== */}
      <group position={[39, 0, 8]}>
        <RigidBody type="fixed" friction={0.8}>
          {/* Main Slate Clay Building Body */}
          <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.0, 6.4, 6.8]} />
            <meshStandardMaterial color="#57687d" roughness={0.7} />
          </mesh>

          {/* Parapet Roof Border */}
          <mesh position={[0, 6.55, 0]} castShadow>
            <boxGeometry args={[6.4, 0.35, 7.2]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>

          {/* Metal Fire Escape Balconies on Front Facade (-X side) */}
          {[2.4, 4.8].map((y, yi) => (
            <group key={`fire-esc-${yi}`} position={[-3.15, y, 0]}>
              {/* Balcony Platform */}
              <mesh castShadow>
                <boxGeometry args={[0.8, 0.08, 4.2]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
              </mesh>
              {/* Railing Bars */}
              <mesh position={[-0.38, 0.35, 0]} castShadow>
                <boxGeometry args={[0.04, 0.7, 4.2]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.35, -2.08]} castShadow>
                <boxGeometry args={[0.8, 0.7, 0.04]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.35, 2.08]} castShadow>
                <boxGeometry args={[0.8, 0.7, 0.04]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
              </mesh>
            </group>
          ))}

          {/* Large Multi-Pane Loft Windows with Warm Amber Interior */}
          {[-1.6, 1.6].map((z, zi) =>
            [1.5, 3.8, 5.5].map((y, yi) => (
              <group key={`loft-win-${zi}-${yi}`} position={[-3.02, y, z]}>
                <mesh>
                  <boxGeometry args={[0.06, 1.4, 1.5]} />
                  <meshStandardMaterial
                    color="#fef08a"
                    emissive="#f59e0b"
                    emissiveIntensity={0.8}
                    roughness={0.2}
                  />
                </mesh>
                <mesh position={[0.01, 0, 0]}>
                  <boxGeometry args={[0.08, 1.45, 0.05]} />
                  <meshStandardMaterial color="#0f172a" />
                </mesh>
                <mesh position={[0.01, 0, 0]}>
                  <boxGeometry args={[0.08, 0.05, 1.55]} />
                  <meshStandardMaterial color="#0f172a" />
                </mesh>
              </group>
            ))
          )}

          {/* Roof Chimney */}
          <mesh position={[1.4, 7.1, 1.8]} castShadow>
            <boxGeometry args={[0.7, 1.2, 0.7]} />
            <meshStandardMaterial color="#991b1b" roughness={0.8} />
          </mesh>
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* 4. BUILDING 3: HISTORIC BROWNSTONE ROW HOUSES            */}
      {/* Located at [38, 0, -6]                                   */}
      {/* ======================================================== */}
      <group position={[38, 0, -6]}>
        <RigidBody type="fixed" friction={0.8}>
          {/* Brownstone Main Facade */}
          <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.8, 5.2, 7.2]} />
            <meshStandardMaterial color="#9a3412" roughness={0.65} />
          </mesh>

          {/* Decorative Cornice Molding along the roof */}
          <mesh position={[0, 5.35, 0]} castShadow>
            <boxGeometry args={[6.2, 0.35, 7.6]} />
            <meshStandardMaterial color="#7c2d12" roughness={0.6} />
          </mesh>

          {/* Dual Front Stoop Staircases leading to elevated front doors */}
          {[-1.8, 1.8].map((z, zi) => (
            <group key={`stoop-${zi}`} position={[-3.1, 0, z]}>
              {/* Steps */}
              <mesh position={[-0.45, 0.22, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.9, 0.44, 1.4]} />
                <meshStandardMaterial color="#c5b9a8" roughness={0.7} />
              </mesh>
              <mesh position={[-0.15, 0.55, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.6, 0.66, 1.4]} />
                <meshStandardMaterial color="#c5b9a8" roughness={0.7} />
              </mesh>
              {/* Front Door */}
              <mesh position={[0.18, 1.35, 0]}>
                <boxGeometry args={[0.05, 1.8, 0.9]} />
                <meshStandardMaterial color="#1e293b" roughness={0.5} />
              </mesh>
            </group>
          ))}

          {/* Upper Windows with Warm Glow */}
          {[-2.2, -0.7, 0.7, 2.2].map((z, zi) =>
            [2.8, 4.3].map((y, yi) => (
              <mesh key={`brown-win-${zi}-${yi}`} position={[-2.92, y, z]}>
                <boxGeometry args={[0.06, 1.1, 0.9]} />
                <meshStandardMaterial
                  color="#fef08a"
                  emissive="#f59e0b"
                  emissiveIntensity={0.8}
                  roughness={0.2}
                />
              </mesh>
            ))
          )}
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* 5. BUILDING 4: CORNER BAKERY & CAFE SHOPFRONT            */}
      {/* Located at [38, 0, 22]                                   */}
      {/* ======================================================== */}
      <group position={[38, 0, 22]}>
        <RigidBody type="fixed" friction={0.8}>
          {/* Main 2-Story Shop Block */}
          <mesh position={[0, 2.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.6, 4.8, 6.2]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.6} />
          </mesh>

          {/* Roof Trim */}
          <mesh position={[0, 4.95, 0]} castShadow>
            <boxGeometry args={[6.0, 0.3, 6.6]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>

          {/* Striped Sun Awning over the ground-floor bakery front */}
          <group position={[-2.9, 2.5, 0]}>
            <mesh rotation={[0, 0, -0.35]} castShadow>
              <boxGeometry args={[1.6, 0.06, 5.2]} />
              <meshStandardMaterial color="#dc2626" roughness={0.5} />
            </mesh>
            {[-2.0, -1.0, 0, 1.0, 2.0].map((z, i) => (
              <mesh key={`bakery-stripe-${i}`} position={[0, 0.04, z]} rotation={[0, 0, -0.35]}>
                <boxGeometry args={[1.62, 0.07, 0.4]} />
                <meshStandardMaterial color="#ffffff" roughness={0.5} />
              </mesh>
            ))}
          </group>

          {/* Large Glass Display Windows underneath awning with Warm Interior Glow */}
          <group position={[-2.82, 1.2, 0]}>
            <mesh>
              <boxGeometry args={[0.06, 1.6, 4.6]} />
              <meshStandardMaterial
                color="#fef08a"
                emissive="#f59e0b"
                emissiveIntensity={0.85}
                roughness={0.2}
              />
            </mesh>
            {/* Wooden Window Panes */}
            {[-1.5, 0, 1.5].map((wz) => (
              <mesh key={`bakery-win-bar-${wz}`} position={[0.01, 0, wz]}>
                <boxGeometry args={[0.08, 1.65, 0.08]} />
                <meshStandardMaterial color="#78350f" />
              </mesh>
            ))}
          </group>

          {/* Shop Signboard: "TOWN CAFE & BAKERY" */}
          <group position={[-2.9, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[3.6, 0.6, 0.12]} />
              <meshStandardMaterial color="#78350f" roughness={0.6} />
            </mesh>
            <Text
              position={[0, 0, 0.08]}
              fontSize={0.24}
              fontWeight={800}
              color="#fef3c7"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.06}
            >
              TOWN BAKERY & CAFE
            </Text>
          </group>

          {/* Outdoor Sidewalk Bistro Tables */}
          {[-1.5, 1.5].map((z, zi) => (
            <group key={`table-${zi}`} position={[-4.0, 0, z]}>
              {/* Table Pedestal & Top */}
              <mesh position={[0, 0.4, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[0, 0.8, 0]} castShadow>
                <cylinderGeometry args={[0.55, 0.55, 0.06, 16]} />
                <meshStandardMaterial color="#ea580c" roughness={0.4} />
              </mesh>
              {/* Chairs Left and Right */}
              <mesh position={[-0.55, 0.35, 0]} castShadow>
                <boxGeometry args={[0.3, 0.06, 0.3]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[0.55, 0.35, 0]} castShadow>
                <boxGeometry args={[0.3, 0.06, 0.3]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </group>
          ))}
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* 6. TOWN STREET FURNITURE, TREES & VINTAGE LAMPS          */}
      {/* ======================================================== */}
      {/* Faceted Stylized Trees lining the sidewalk */}
      <StylizedOakTree position={[35, 0, -28]} scale={1.25} color="#4d7c0f" />
      <StylizedOakTree position={[35, 0, -18]} scale={1.15} autumn />
      <StylizedPineTree position={[35, 0, -10]} scale={1.2} />
      <StylizedOakTree position={[35, 0, 10]} scale={1.2} color="#559c19" />
      <StylizedOakTree position={[35, 0, 18]} scale={1.15} autumn />
      <StylizedPineTree position={[35, 0, 28]} scale={1.3} />

      {/* Back-Alley Avenue Trees */}
      <StylizedOakTree position={[47, 0, -20]} scale={1.3} color="#3f6212" />
      <StylizedOakTree position={[47, 0, 0]} scale={1.2} color="#4d7c0f" />
      <StylizedOakTree position={[47, 0, 20]} scale={1.35} autumn />

      {/* Glowing Vintage Street Lamps */}
      <WarmStreetLamp position={[34.5, 0, -22]} rotationY={Math.PI / 2} />
      <WarmStreetLamp position={[34.5, 0, -6]} rotationY={Math.PI / 2} />
      <WarmStreetLamp position={[34.5, 0, 8]} rotationY={Math.PI / 2} />
      <WarmStreetLamp position={[34.5, 0, 22]} rotationY={Math.PI / 2} />
      <WarmStreetLamp position={[46.5, 0, -12]} rotationY={-Math.PI / 2} />
      <WarmStreetLamp position={[46.5, 0, 12]} rotationY={-Math.PI / 2} />

      {/* Sidewalk Planter Boxes in front of Shops */}
      <SidewalkPlanterBox position={[35.2, 0, -25]} rotationY={Math.PI / 2} />
      <SidewalkPlanterBox position={[35.2, 0, 15]} rotationY={Math.PI / 2} />
      <FireHydrant position={[35.2, 0, -2]} rotationY={Math.PI / 2} />

      {/* ======================================================== */}
      {/* 7. ROLLING GREEN HILLS BACKDROP (Behind Apartments)      */}
      {/* Dramatic low-poly green ridges with pine trees & boulders*/}
      {/* ======================================================== */}
      {/* Primary Mountain Ridge (Tall background peaks rising 9m to 15m) */}
      <group position={[0, 0, 0]}>
        {/* Peak 1: North-East Ridge */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[57, 5.0, -32]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[14, 10, 12]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak 2: Mid-North Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[60, 6.5, -14]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[16, 13, 14]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak 3: Central Grand Summit (Directly behind the apartments) */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[62, 7.5, 4]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[18, 15, 14]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak 4: Mid-South Peak */}
        <RigidBody type="fixed" friction={0.9} colliders="hull" position={[59, 6.0, 22]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[16, 12, 12]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak 5: South-East Ridge */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[56, 5.0, 38]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[14, 10, 12]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Rolling Foothills (Gentle rolling mounds blending into the town floor) */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[51, 2.2, -22]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[8.5, 4.4, 10]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[52, 2.6, -3]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[9.5, 5.2, 10]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[51, 2.4, 14]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[9.0, 4.8, 10]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[50, 2.0, 30]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[8.0, 4.0, 10]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Mountain Ridge Stylized Pine Trees */}
        <StylizedPineTree position={[52, 2.5, -30]} scale={1.4} />
        <StylizedPineTree position={[55, 4.5, -20]} scale={1.5} />
        <StylizedPineTree position={[54, 3.8, -10]} scale={1.3} />
        <StylizedPineTree position={[56, 5.2, -2]} scale={1.6} />
        <StylizedPineTree position={[55, 4.8, 8]} scale={1.45} />
        <StylizedPineTree position={[53, 3.2, 18]} scale={1.35} />
        <StylizedPineTree position={[54, 4.0, 26]} scale={1.5} />
        <StylizedPineTree position={[51, 2.2, 34]} scale={1.25} />

        {/* Mountain Slope Clay Boulders */}
        <mesh position={[51, 0.6, -16]} rotation={[0.4, 0.6, 0.2]} castShadow>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color="#78716c" roughness={0.8} flatShading />
        </mesh>
        <mesh position={[53, 1.2, 2]} rotation={[0.2, 0.9, 0.5]} castShadow>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#a8a29e" roughness={0.8} flatShading />
        </mesh>
        <mesh position={[50, 0.5, 22]} rotation={[0.5, 0.3, 0.8]} castShadow>
          <dodecahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#78716c" roughness={0.8} flatShading />
        </mesh>
      </group>
    </group>
  );
};
