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
      {/* Strictly on land (x > -30) to preserve open coastal ocean*/}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Peak W1: Front Left Mountain Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-17, 7.0, -68]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[12, 14, 12]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak W2: Tall Mid Mountain Summit */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-18, 8.5, -84]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[12, 17, 12]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak W3: Valley Wall Shoulder Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-17, 5.5, -98]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[12, 11, 10]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak W4: Deep North-West Summit (Safely inland at z = -140 north of ocean) */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-30, 12.0, -140]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[22, 24, 14]} />
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
      <AlpinePine position={[-20, 4.5, -86]} scale={1.4} />
      <AlpinePine position={[-14, 2.0, -94]} scale={1.1} />
      <AlpinePine position={[-18, 4.0, -72]} scale={1.4} />
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
      {/* Continuous Interstate Highway from z = 60 to 210         */}
      {/* Elevated Viaduct Overpass at z = 135 & Mountain Pass     */}
      {/* ======================================================== */}

      {/* Highway Pavement Leading South (Continuous Open Interstate z = 60 to 210) */}
      <mesh position={[0, 0.025, 135]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 150]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* South Valley Divider Dashes (Every 6m from z = 60 to 204) */}
      {[
        60, 66, 72, 78, 84, 90, 96, 102, 108, 114,
        120, 126, 132, 138, 144, 150, 156, 162, 168, 174, 180, 186, 192, 198, 204
      ].map((z) => (
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

      {/* Highway Steel Guardrails Framing Mountain Pass Shoulders (Continuous 150m) */}
      {[-4.2, 4.2].map((gx) => (
        <group key={`s-guard-${gx}`} position={[gx, 0.35, 135]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.45, 150]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Support Posts along Guardrail */}
          {[-70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70].map((pz) => (
            <mesh key={`s-post-${gx}-${pz}`} position={[0, -0.2, pz]}>
              <boxGeometry args={[0.18, 0.5, 0.18]} />
              <meshStandardMaterial color="#475569" roughness={0.6} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ======================================================== */}
      {/* 5. ELEVATED HIGHWAY OVERPASS VIADUCT (at z = 135)        */}
      {/* Visual storytelling: Connects to regional road transit  */}
      {/* ======================================================== */}
      <group position={[0, 0, 135]}>
        {/* Concrete Bridge Deck Span (64m wide, spanning east-west) */}
        <mesh position={[0, 6.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[64, 1.2, 7.5]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        {/* Asphalt Roadway on Overpass */}
        <mesh position={[0, 6.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[64, 6.8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.75} />
        </mesh>
        {/* Overpass Yellow Center Line */}
        {[-24, -18, -12, -6, 0, 6, 12, 18, 24].map((ox) => (
          <mesh key={`overpass-dash-${ox}`} position={[ox, 6.83, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <planeGeometry args={[0.3, 3.2]} />
            <meshBasicMaterial color="#facc15" />
          </mesh>
        ))}
        {/* Side Concrete Safety Barriers */}
        {[-3.6, 3.6].map((bz) => (
          <mesh key={`viaduct-barrier-${bz}`} position={[0, 7.25, bz]} castShadow>
            <boxGeometry args={[64, 0.9, 0.28]} />
            <meshStandardMaterial color="#64748b" roughness={0.6} />
          </mesh>
        ))}

        {/* 4 Heavy Concrete Support Piers */}
        {[-9, 9].map((px) => (
          <mesh key={`pier-center-${px}`} position={[px, 2.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 5.8, 4.2]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
        ))}
        {[-24, 24].map((px) => (
          <mesh key={`pier-outer-${px}`} position={[px, 2.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 5.8, 4.2]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
        ))}

        {/* Directional Highway Sign Mounted on North Facade of Overpass (Facing approaching car) */}
        <group position={[0, 8.2, -3.85]} rotation={[0, Math.PI, 0]}>
          <mesh castShadow>
            <boxGeometry args={[13.5, 1.6, 0.2]} />
            <meshStandardMaterial color="#166534" roughness={0.4} />
          </mesh>
          <Text
            position={[0, 0.24, 0.12]}
            fontSize={0.34}
            fontWeight={900}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            INTERSTATE 80 • METRO CIRCUMFERENTIAL
          </Text>
          <Text
            position={[0, -0.24, 0.12]}
            fontSize={0.19}
            fontWeight={700}
            color="#facc15"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            ◀ WEST HARBOR BYPASS | EAST MOUNTAIN SUMMIT ▶
          </Text>
        </group>

        {/* Low-Poly Semi-Truck Driving Eastbound on the Overpass */}
        <group position={[-5, 7.4, -1.6]}>
          {/* Blue Truck Cab */}
          <mesh position={[2.6, 0.65, 0]} castShadow>
            <boxGeometry args={[1.8, 1.3, 1.5]} />
            <meshStandardMaterial color="#0284c7" roughness={0.4} />
          </mesh>
          <mesh position={[3.2, 0.8, 0]}>
            <boxGeometry args={[0.65, 0.6, 1.4]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.7} />
          </mesh>
          {/* White Cargo Container Trailer */}
          <mesh position={[-0.8, 0.85, 0]} castShadow>
            <boxGeometry args={[4.8, 1.7, 1.55]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.5} />
          </mesh>
          {/* Truck Wheels */}
          {[-2.4, -1.2, 0.8, 2.6].map((wx) =>
            [-0.75, 0.75].map((wz) => (
              <mesh key={`truck-w-${wx}-${wz}`} position={[wx, 0.16, wz]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.32, 0.32, 0.25, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
              </mesh>
            ))
          )}
        </group>

        {/* Low-Poly Sedan Driving Westbound on the Overpass */}
        <group position={[14, 7.2, 1.6]}>
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[2.6, 0.6, 1.3]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
          <mesh position={[-0.2, 0.75, 0]} castShadow>
            <boxGeometry args={[1.5, 0.45, 1.15]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.7} />
          </mesh>
          {[-0.8, 0.8].map((cx) =>
            [-0.65, 0.65].map((cz) => (
              <mesh key={`car-w-${cx}-${cz}`} position={[cx, 0.14, cz]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.26, 0.26, 0.2, 10]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
              </mesh>
            ))
          )}
        </group>
      </group>

      {/* ======================================================== */}
      {/* 6. MAJESTIC SOUTHERN MOUNTAIN PASS (Framed in the Gateway)*/}
      {/* Direct line of sight through x in [-15, 15]               */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Peak S1: West Valley Pass Shoulder (Kept on land x > -28) */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-14, 8.0, 80]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[13, 16, 12]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak S2: East Valley Pass Shoulder */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[15, 8.0, 80]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[16, 16, 12]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak S3: West Mid Valley Summit (Kept on land x > -29) */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-15, 11.5, 115]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[14, 23, 14]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak S4: East Mid Valley Summit */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[18, 11.5, 115]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[20, 23, 14]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak S5: West High Alpine Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-15, 15.0, 160]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[24, 30, 16]} />
            <meshStandardMaterial color="#365314" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak S6: East High Alpine Peak */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[15, 15.0, 160]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[24, 30, 16]} />
            <meshStandardMaterial color="#365314" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak S7: MASSIVE HORIZON PEAK CENTERED ON HIGHWAY VISTA */}
        {/* Tightly terminates the highway vanishing point with natural beauty */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[0, 17.5, 205]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[34, 35, 18]} />
            <meshStandardMaterial color="#2d4a1d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Gentle Green Foothills Banking onto Highway Shoulders */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-8.0, 2.4, 68]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[7.2, 4.8, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[8.0, 2.4, 68]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[7.2, 4.8, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-8.5, 2.8, 92]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[7.8, 5.6, 8]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[8.5, 2.8, 92]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[7.8, 5.6, 8]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-8.8, 3.2, 116]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[8.2, 6.4, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[8.8, 3.2, 116]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[8.2, 6.4, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-9.0, 3.5, 150]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[8.5, 7.0, 8]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[9.0, 3.5, 150]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[8.5, 7.0, 8]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[-9.2, 3.8, 178]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[9.0, 7.6, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[9.2, 3.8, 178]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[9.0, 7.6, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
      </group>

      {/* Alpine Pine Trees Dotting Southern Valley Slopes & Highway Pass */}
      <AlpinePine position={[-10.5, 1.8, 64]} scale={1.2} />
      <AlpinePine position={[10.5, 1.8, 64]} scale={1.2} />
      <AlpinePine position={[-13.5, 3.2, 76]} scale={1.4} />
      <AlpinePine position={[13.5, 3.2, 76]} scale={1.4} />
      <AlpinePine position={[-11.0, 2.2, 88]} scale={1.3} />
      <AlpinePine position={[11.0, 2.2, 88]} scale={1.3} />
      <AlpinePine position={[-15.0, 4.5, 104]} scale={1.5} />
      <AlpinePine position={[15.0, 4.5, 104]} scale={1.5} />
      <AlpinePine position={[-11.5, 2.5, 122]} scale={1.3} />
      <AlpinePine position={[11.5, 2.5, 122]} scale={1.3} />
      <AlpinePine position={[-12.0, 2.8, 146]} scale={1.4} />
      <AlpinePine position={[12.0, 2.8, 146]} scale={1.4} />
      <AlpinePine position={[-16.0, 5.0, 165]} scale={1.6} />
      <AlpinePine position={[16.0, 5.0, 165]} scale={1.6} />
      <AlpinePine position={[-12.5, 3.0, 185]} scale={1.3} />
      <AlpinePine position={[12.5, 3.0, 185]} scale={1.3} />

      {/* Modern Stylized Highway Lamp Posts along South Avenue Extension */}
      {[66, 90, 114, 146, 170, 194].map((lz) => (
        <group key={`s-lamp-group-${lz}`}>
          {[-4.7, 4.7].map((lx) => (
            <group key={`s-lamp-${lx}-${lz}`} position={[lx, 0, lz]}>
              <mesh position={[0, 1.8, 0]} castShadow>
                <cylinderGeometry args={[0.07, 0.09, 3.6, 8]} />
                <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
              </mesh>
              <mesh position={[lx > 0 ? -0.3 : 0.3, 3.5, 0]} rotation={[0, 0, lx > 0 ? 0.3 : -0.3]}>
                <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
              </mesh>
              <mesh position={[lx > 0 ? -0.6 : 0.6, 3.6, 0]}>
                <sphereGeometry args={[0.16, 10, 8]} />
                <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.8} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* ======================================================== */}
      {/* 7. SOUTH-EAST HORIZON MOUNTAIN RANGE                     */}
      {/* Directly behind the Petrol Bunk & South City Apartments  */}
      {/* Eliminates the empty background gap on the horizon       */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Peak SE1: Direct Backdrop Behind Brown Apartments (Rises 20m) */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[32, 10.0, 65]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[18, 20, 14]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak SE2: Peak in Gap Between Brown Building & Executive Tower */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[24, 8.5, 76]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[16, 17, 12]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak SE3: Grand Summit Left of Apartments & Behind Petrol Bunk */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[42, 12.0, 58]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[22, 24, 14]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak SE4: Ridge Linking to East Town District Mountains at z = 38 */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[52, 10.5, 48]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[20, 21, 14]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak SE5: Deep Majestic South-East Summit (Towers 28m) */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[58, 14.0, 70]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[26, 28, 16]} />
            <meshStandardMaterial color="#365314" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak SE6: Massive Horizon Alpine Peak (Towers 31m) */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[46, 15.5, 95]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[28, 31, 16]} />
            <meshStandardMaterial color="#2d4a1d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak SE7: Distant Outer Ridge Summit */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[32, 13.5, 110]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[24, 27, 14]} />
            <meshStandardMaterial color="#3f6212" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Peak SE8: Eastern Flank Mountain */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[68, 16.0, 85]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[30, 32, 16]} />
            <meshStandardMaterial color="#2d4a1d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>

        {/* Gentle Rolling Foothills Banking Behind the Petrol Bunk & Apartments */}
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[26, 3.8, 56]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[10, 7.6, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[36, 4.5, 50]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[12, 9.0, 8]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[46, 5.0, 42]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[13, 10.0, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[38, 4.8, 72]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[12, 9.6, 8]} />
            <meshStandardMaterial color="#5ea508" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="hull" friction={0.9} position={[28, 5.2, 90]}>
          <mesh castShadow receiveShadow>
            <coneGeometry args={[14, 10.4, 8]} />
            <meshStandardMaterial color="#65a30d" roughness={0.85} flatShading />
          </mesh>
        </RigidBody>
      </group>

      {/* Alpine Pines Dotting South-East Mountain Slopes Behind Petrol Bunk */}
      <AlpinePine position={[26, 3.2, 54]} scale={1.3} />
      <AlpinePine position={[30, 4.5, 60]} scale={1.4} />
      <AlpinePine position={[35, 5.2, 52]} scale={1.5} />
      <AlpinePine position={[40, 6.0, 55]} scale={1.6} />
      <AlpinePine position={[45, 7.0, 65]} scale={1.5} />
      <AlpinePine position={[50, 5.5, 46]} scale={1.4} />
      <AlpinePine position={[25, 4.0, 72]} scale={1.35} />
      <AlpinePine position={[32, 6.2, 80]} scale={1.5} />
      <AlpinePine position={[38, 5.8, 88]} scale={1.4} />
      <AlpinePine position={[44, 7.5, 98]} scale={1.6} />
    </group>
  );
};

