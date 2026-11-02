import React from 'react';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

// Stylized low-poly alpine pine tree
const AlpinePine: React.FC<{ position: [number, number, number]; scale?: number }> = ({
  position,
  scale = 1.0
}) => {
  return (
    <group position={position} scale={scale}>
      {/* Wooden Trunk */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 1.8, 8]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      {/* Tier 1 Pine Cone */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <coneGeometry args={[1.6, 2.2, 7]} />
        <meshStandardMaterial color="#14532d" roughness={0.8} flatShading />
      </mesh>
      {/* Tier 2 Pine Cone */}
      <mesh position={[0, 3.4, 0]} castShadow>
        <coneGeometry args={[1.25, 1.9, 7]} />
        <meshStandardMaterial color="#166534" roughness={0.8} flatShading />
      </mesh>
      {/* Tier 3 Pine Cone Peak */}
      <mesh position={[0, 4.4, 0]} castShadow>
        <coneGeometry args={[0.85, 1.6, 7]} />
        <meshStandardMaterial color="#15803d" roughness={0.75} flatShading />
      </mesh>
    </group>
  );
};

export const ScenicValleys: React.FC = () => {
  return (
    <group>
      {/* ======================================================== */}
      {/* 1. NORTH VALLEY PASS: HIGHWAY CONTINUATION INTO HORIZON */}
      {/* Directly eliminates the artificial North Wall cutoff     */}
      {/* ======================================================== */}

      {/* Highway Pavement into the Mountain Valley (Continuous Open Highway z = -60 to -190) */}
      <mesh position={[0, 0.025, -125]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 130]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Yellow Center Dashed Divider Lines through Valley to Horizon */}
      {[
        -60, -66, -72, -78, -84, -90, -96, -102, -108, -114,
        -120, -126, -132, -138, -144, -150, -156, -162, -168, -174, -180, -186
      ].map((z) => (
        <mesh key={`val-dash-${z}`} position={[0, 0.032, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.35, 3.4]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* Highway Steel Guardrails Framing Mountain Pass Shoulders (Continuous 130m) */}
      {[-4.2, 4.2].map((gx) => (
        <group key={`guard-${gx}`} position={[gx, 0.35, -125]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.45, 130]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Support Posts along Guardrail */}
          {[-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60].map((pz) => (
            <mesh key={`post-${gx}-${pz}`} position={[0, -0.2, pz]}>
              <boxGeometry args={[0.18, 0.5, 0.18]} />
              <meshStandardMaterial color="#475569" roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Overhead Highway Valley Pass Gantry Sign (at z = -58) */}
      <group position={[0, 4.2, -58]}>
        {/* Support Steel Trusses */}
        {[-4.5, 4.5].map((tx) => (
          <mesh key={`gantry-col-${tx}`} position={[tx, -1.8, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.16, 4.8, 8]} />
            <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.8} />
          </mesh>
        ))}
        {/* Overhead Green Sign Board */}
        <mesh castShadow>
          <boxGeometry args={[9.2, 1.4, 0.25]} />
          <meshStandardMaterial color="#166534" roughness={0.4} />
        </mesh>
        <Text
          position={[0, 0.22, 0.14]}
          fontSize={0.34}
          fontWeight={900}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          NORTH VALLEY SCENIC PASS
        </Text>
        <Text
          position={[0, -0.25, 0.14]}
          fontSize={0.2}
          fontWeight={700}
          color="#facc15"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          ▲ ROUTE 101 • CONTINUOUS HORIZON ▲
        </Text>
      </group>

      {/* ======================================================== */}
      {/* 2. WEST RIDGE OF THE VALLEY PASS (Low-Poly Mountain Peaks) */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Peak W1: Front Left Mountain Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-20, 7.0, -68]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[16, 14, 12]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak W2: Tall Mid Mountain Summit */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-30, 9.5, -84]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[20, 19, 14]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak W3: Valley Wall Shoulder Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-18, 5.5, -98]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[14, 11, 10]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak W4: Deep West Majestic Ridge */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-44, 12.0, -74]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[24, 24, 14]} />
            <meshStandardMaterial color="#365314" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak W5: Distant North-West Summit */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-26, 10.0, -125]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[18, 17, 12]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak W6: Horizon Ridge Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-32, 13.0, -160]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[22, 22, 14]} />
            <meshStandardMaterial color="#365314" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Gentle Green Foothills Banking onto Road Shoulder */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-11, 2.2, -62]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[7.0, 4.4, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-12, 2.6, -76]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[8.0, 5.2, 8]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-11, 2.4, -90]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[7.5, 4.8, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-11, 2.5, -120]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[7.5, 5.0, 8]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-12, 2.8, -150]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[8.0, 5.4, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* 3. EAST RIDGE OF THE VALLEY PASS (Low-Poly Mountain Peaks) */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Peak E1: Front Right Mountain Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[20, 7.0, -68]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[16, 14, 12]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak E2: Tall Mid Mountain Summit */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[30, 9.5, -84]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[20, 19, 14]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak E3: Valley Wall Shoulder Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[18, 5.5, -98]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[14, 11, 10]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak E4: Deep East Majestic Ridge */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[44, 12.0, -74]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[24, 24, 14]} />
            <meshStandardMaterial color="#365314" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak E5: Distant North-East Summit */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[26, 10.0, -125]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[18, 17, 12]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak E6: Horizon Ridge Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[32, 13.0, -160]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[22, 22, 14]} />
            <meshStandardMaterial color="#365314" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Gentle Green Foothills Banking onto Road Shoulder */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[11, 2.2, -62]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[7.0, 4.4, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[12, 2.6, -76]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[8.0, 5.2, 8]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[11, 2.4, -90]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[7.5, 4.8, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[11, 2.5, -120]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[7.5, 5.0, 8]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[12, 2.8, -150]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[8.0, 5.4, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
      </group>

      {/* Alpine Pine Trees Dotting Northern Valley Slopes */}
      <AlpinePine position={[-13, 1.8, -65]} scale={1.2} />
      <AlpinePine position={[-16, 3.4, -77]} scale={1.4} />
      <AlpinePine position={[-24, 5.5, -86]} scale={1.5} />
      <AlpinePine position={[-14, 2.0, -94]} scale={1.1} />
      <AlpinePine position={[-28, 7.0, -72]} scale={1.6} />
      <AlpinePine position={[-13, 2.0, -120]} scale={1.3} />
      <AlpinePine position={[-16, 3.5, -145]} scale={1.4} />
      <AlpinePine position={[-14, 2.2, -170]} scale={1.2} />
      <AlpinePine position={[13, 1.8, -65]} scale={1.2} />
      <AlpinePine position={[16, 3.4, -77]} scale={1.4} />
      <AlpinePine position={[24, 5.5, -86]} scale={1.5} />
      <AlpinePine position={[14, 2.0, -94]} scale={1.1} />
      <AlpinePine position={[28, 7.0, -72]} scale={1.6} />
      <AlpinePine position={[13, 2.0, -120]} scale={1.3} />
      <AlpinePine position={[16, 3.5, -145]} scale={1.4} />
      <AlpinePine position={[14, 2.2, -170]} scale={1.2} />

      {/* ======================================================== */}
      {/* 4. SOUTHERN VALLEY & HORIZON FOOTHILLS                   */}
      {/* Extending South Avenue past Corporate Towers to Horizon  */}
      {/* ======================================================== */}

      {/* Highway Pavement Leading South (z = 60 to 105) */}
      <mesh position={[0, 0.025, 82.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 45]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      {/* South Valley Divider Dashes */}
      {[66, 72, 78, 84, 90, 96, 102].map((z) => (
        <mesh key={`s-val-dash-${z}`} position={[0, 0.032, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.35, 3.4]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* Rolling Southern Horizon Foothills Framing the Highway */}
      <group position={[0, 0, 0]}>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-22, 5.0, 78]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[14, 10, 10]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[22, 5.0, 78]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[14, 10, 10]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-36, 7.5, 94]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[18, 15, 12]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[36, 7.5, 94]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[18, 15, 12]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
      </group>

      {/* Southern Route Alpine Pines */}
      <AlpinePine position={[-15, 1.8, 72]} scale={1.2} />
      <AlpinePine position={[15, 1.8, 72]} scale={1.2} />
      <AlpinePine position={[-20, 3.2, 85]} scale={1.4} />
      <AlpinePine position={[20, 3.2, 85]} scale={1.4} />
    </group>
  );
};

