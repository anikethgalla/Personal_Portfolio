import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { Text } from '@react-three/drei';

interface TreeProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
}

const TownTree: React.FC<TreeProps> = ({ position, scale = 1, color = '#65a30d' }) => {
  return (
    <group position={position} scale={scale}>
      <RigidBody type="fixed" colliders="hull" friction={0.6}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.24, 0.3, 1.8, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
      </RigidBody>
      <group position={[0, 2.5, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[1.3, 9, 8]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow>
          <sphereGeometry args={[0.9, 9, 8]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        <mesh position={[0.45, -0.2, 0.35]} castShadow>
          <sphereGeometry args={[0.75, 8, 7]} />
          <meshStandardMaterial color="#4d7c0f" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

const TownLamp: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 3.2, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      <mesh position={[0.25, 3.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      <mesh position={[0.42, 3.15, 0]}>
        <sphereGeometry args={[0.18, 12, 8]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

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

          {/* Recessed Windows on Front Facade (-X side) */}
          {[-2.2, 0, 2.2].map((z, zi) =>
            [1.4, 3.6, 5.8].map((y, yi) => (
              <mesh key={`win-apt1-${zi}-${yi}`} position={[-3.12, y, z]}>
                <boxGeometry args={[0.06, 1.2, 1.1]} />
                <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.7} />
              </mesh>
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

          {/* Large Multi-Pane Loft Windows */}
          {[-1.6, 1.6].map((z, zi) =>
            [1.5, 3.8, 5.5].map((y, yi) => (
              <mesh key={`loft-win-${zi}-${yi}`} position={[-3.02, y, z]}>
                <boxGeometry args={[0.06, 1.4, 1.5]} />
                <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.7} />
              </mesh>
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

          {/* Upper Windows */}
          {[-2.2, -0.7, 0.7, 2.2].map((z, zi) =>
            [2.8, 4.3].map((y, yi) => (
              <mesh key={`brown-win-${zi}-${yi}`} position={[-2.92, y, z]}>
                <boxGeometry args={[0.06, 1.1, 0.9]} />
                <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.7} />
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

          {/* Large Glass Display Windows underneath awning */}
          <mesh position={[-2.82, 1.2, 0]}>
            <boxGeometry args={[0.06, 1.6, 4.6]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.8} />
          </mesh>

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
      {/* Street Trees lining the sidewalk */}
      <TownTree position={[35, 0, -28]} scale={1.25} color="#4d7c0f" />
      <TownTree position={[35, 0, -18]} scale={1.15} color="#65a30d" />
      <TownTree position={[35, 0, -10]} scale={1.2} color="#3f6212" />
      <TownTree position={[35, 0, 10]} scale={1.2} color="#65a30d" />
      <TownTree position={[35, 0, 18]} scale={1.15} color="#4d7c0f" />
      <TownTree position={[35, 0, 28]} scale={1.3} color="#65a30d" />

      {/* Back-Alley Avenue Trees */}
      <TownTree position={[47, 0, -20]} scale={1.3} color="#3f6212" />
      <TownTree position={[47, 0, 0]} scale={1.2} color="#4d7c0f" />
      <TownTree position={[47, 0, 20]} scale={1.35} color="#65a30d" />

      {/* Glowing Vintage Street Lamps */}
      <TownLamp position={[34.5, 0, -22]} />
      <TownLamp position={[34.5, 0, -6]} />
      <TownLamp position={[34.5, 0, 8]} />
      <TownLamp position={[34.5, 0, 22]} />
      <TownLamp position={[46.5, 0, -12]} />
      <TownLamp position={[46.5, 0, 12]} />
    </group>
  );
};