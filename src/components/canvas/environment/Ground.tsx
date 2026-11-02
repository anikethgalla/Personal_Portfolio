import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

export const Ground: React.FC = () => {
  return (
    <group>
      {/* 1. Impenetrable Physics Ground Bedrock (10m thick, full lush green grass landscape) */}
      <RigidBody type="fixed" colliders={false} friction={1.2} restitution={0.1}>
        <CuboidCollider args={[150, 5, 150]} position={[0, -5, 0]} friction={1.2} restitution={0.1} />
        <mesh position={[0, -0.25, 0]} receiveShadow>
          <boxGeometry args={[200, 0.5, 200]} />
          <meshStandardMaterial color="#5ea508" roughness={0.9} metalness={0.05} />
        </mesh>
      </RigidBody>

      {/* ======================================================== */}
      {/* 2. COMPREHENSIVE ASPHALT ROADWAY NETWORK                 */}
      {/* Elevated at y = 0.025 with polygonOffset for zero flicker*/}
      {/* ======================================================== */}

      {/* Central Traffic Roundabout */}
      <group position={[0, 0, 0]}>
        {/* Outer Roundabout Ring Road (Radius 6.5m to 12.5m) */}
        <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <ringGeometry args={[6.5, 12.5, 64]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.75}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>

        {/* Inner Island Green Lawn (Radius 6.4m) */}
        <mesh position={[0, 0.028, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[6.4, 48]} />
          <meshStandardMaterial
            color="#65a30d"
            roughness={0.85}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>

        {/* Roundabout Island Decorative Curb Trim */}
        <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[6.35, 6.5, 48]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
        </mesh>

        {/* Dashed Center Circle (16 genuine arc dashes) */}
        {Array.from({ length: 16 }).map((_, i) => (
          <mesh
            key={`rb-dash-${i}`}
            position={[0, 0.032, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry
              args={[
                9.35,
                9.65,
                16,
                1,
                i * ((Math.PI * 2) / 16),
                ((Math.PI * 2) / 16) * 0.55
              ]}
            />
            <meshBasicMaterial
              color="#facc15"
              polygonOffset
              polygonOffsetFactor={-2}
              polygonOffsetUnits={-2}
            />
          </mesh>
        ))}
      </group>

      {/* North Speedway Boulevard: Touches North Perimeter Wall at z = -60 (width 8m) */}
      <mesh position={[0, 0.025, -32.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 55]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      {/* North Road Dashed Divider Lines (All the way to North Wall) */}
      {[-12, -18, -24, -30, -36, -42, -48, -54].map((z) => (
        <mesh key={`n-dash-${z}`} position={[0, 0.032, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.35, 3.4]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* South Avenue: Route to Corporate Skyline & Touches South Wall at z = 60 (width 8m) */}
      <mesh position={[0, 0.025, 32.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 55]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      {/* South Road Dashed Divider Lines (All the way to South Wall) */}
      {[12, 18, 24, 30, 36, 42, 48, 54].map((z) => (
        <mesh key={`s-dash-${z}`} position={[0, 0.032, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.35, 3.4]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* East Projects Highway: Roundabout to Projects Concourse (width 8m) */}
      <mesh position={[20, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 8]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      {/* East Highway Dashed Divider */}
      {[14, 19, 24, 29].map((x) => (
        <mesh key={`e-dash-${x}`} position={[x, 0.032, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.35, 3.4]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* ======================================================== */}
      {/* 3. PROJECTS CONCOURSE & DRIVE-IN ASPHALT APRON           */}
      {/* Expansive paved plaza surrounding Cinema, Food Truck & Diner */}
      {/* ======================================================== */}
      <mesh position={[28, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 54]} />
        <meshStandardMaterial
          color="#3b4859"
          roughness={0.8}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Projects Strip Parking Stall Linings */}
      {/* Cinema Bay Parking Stall Lines at z = -16 */}
      <group position={[20, 0.032, -16]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.2, 0.18]} />
          <meshBasicMaterial color="#facc15" polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
        <mesh position={[-2.1, 0, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.18, 5.6]} />
          <meshBasicMaterial color="#facc15" polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
        <mesh position={[2.1, 0, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.18, 5.6]} />
          <meshBasicMaterial color="#facc15" polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
      </group>

      {/* Food Truck Order Bay Stall Lines at z = 0 */}
      <group position={[23, 0.032, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.2, 0.18]} />
          <meshBasicMaterial color="#38bdf8" polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
        <mesh position={[-2.1, 0, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.18, 5.6]} />
          <meshBasicMaterial color="#38bdf8" polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
        <mesh position={[2.1, 0, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.18, 5.6]} />
          <meshBasicMaterial color="#38bdf8" polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
      </group>

      {/* Diner Drive-Up Stall Lines at z = 16 */}
      <group position={[20, 0.032, 16]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.2, 0.18]} />
          <meshBasicMaterial color="#c084fc" polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
        <mesh position={[-2.1, 0, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.18, 5.6]} />
          <meshBasicMaterial color="#c084fc" polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
        <mesh position={[2.1, 0, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.18, 5.6]} />
          <meshBasicMaterial color="#c084fc" polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
      </group>

      {/* West Boulevard: Parkway to Suburb & Seaport (width 8m) */}
      <mesh position={[-24, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[34, 8]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      {/* West Highway Dashed Divider */}
      {[-14, -20, -26, -32].map((x) => (
        <mesh key={`w-dash-${x}`} position={[x, 0.032, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.35, 3.4]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* Suburb Coastal Promenade Road (North-South continuous coastal avenue from z = -44 to z = 50) */}
      <mesh position={[-24, 0.026, 3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 94]} />
        <meshStandardMaterial
          color="#3b4859"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      {/* Suburb Coastal Promenade Dashed Lines */}
      {[-36, -30, -24, -18, -12, 12, 18, 24, 30, 36, 42].map((z) => (
        <mesh key={`sub-dash-${z}`} position={[-24, 0.032, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 3.0]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* South-West Coastal Connector: Links Suburb Promenade directly to South City Apartments and Coastal Embankment */}
      <mesh position={[-30, 0.026, 40]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 7]} />
        <meshStandardMaterial
          color="#3b4859"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* North-West Lighthouse Scenic Spur (Connecting Promenade to Lighthouse at x = -36, z = -25) */}
      <mesh position={[-30, 0.026, -25]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial
          color="#3b4859"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Gas Station & Petrol Pump Drive-In Apron (Left / East of South Avenue) */}
      <mesh position={[13, 0.025, 26]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial
          color="#3b4859"
          roughness={0.8}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Corporate Skyline Plaza Apron at South End (Touching South Wall at z = 60) */}
      <mesh position={[0, 0.025, 50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[56, 20]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.75}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>


    </group>
  );
};