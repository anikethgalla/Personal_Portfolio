import React from 'react';
import * as THREE from 'three';

// -------------------------------------------------------------
// 1. INDIVIDUAL PROCEDURAL SKYSCRAPER BUILDINGS
// -------------------------------------------------------------
interface BuildingProps {
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
  color?: string;
  windowColor?: string;
  hasSpire?: boolean;
  hasHelipad?: boolean;
  setbacks?: boolean;
}

const Skyscraper: React.FC<BuildingProps> = ({
  position,
  width,
  depth,
  height,
  color = '#334155',
  windowColor = '#0284c7',
  hasSpire = false,
  hasHelipad = false,
  setbacks = false
}) => {
  const [x, y, z] = position;
  const tiers = setbacks ? 3 : 1;

  return (
    <group position={[x, y, z]}>
      {setbacks ? (
        // Tiered set-back architecture
        <>
          {/* Base Tier */}
          <mesh position={[0, height * 0.25, 0]}>
            <boxGeometry args={[width, height * 0.5, depth]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Base Window Bands */}
          <mesh position={[0, height * 0.25, depth * 0.51]}>
            <planeGeometry args={[width * 0.85, height * 0.42]} />
            <meshStandardMaterial color={windowColor} roughness={0.2} metalness={0.7} />
          </mesh>

          {/* Middle Tier */}
          <mesh position={[0, height * 0.62, 0]}>
            <boxGeometry args={[width * 0.78, height * 0.32, depth * 0.78]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
          <mesh position={[0, height * 0.62, depth * 0.4]}>
            <planeGeometry args={[width * 0.65, height * 0.26]} />
            <meshStandardMaterial color={windowColor} roughness={0.2} metalness={0.7} />
          </mesh>

          {/* Upper Crown Tier */}
          <mesh position={[0, height * 0.88, 0]}>
            <boxGeometry args={[width * 0.55, height * 0.22, depth * 0.55]} />
            <meshStandardMaterial color="#475569" roughness={0.4} />
          </mesh>
        </>
      ) : (
        // Single Sleek Monolithic Tower
        <>
          <mesh position={[0, height * 0.5, 0]}>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Front Window Strips */}
          <mesh position={[0, height * 0.5, depth * 0.51]}>
            <planeGeometry args={[width * 0.82, height * 0.88]} />
            <meshStandardMaterial color={windowColor} roughness={0.2} metalness={0.75} />
          </mesh>
          {/* Back Window Strips */}
          <mesh position={[0, height * 0.5, -depth * 0.51]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[width * 0.82, height * 0.88]} />
            <meshStandardMaterial color={windowColor} roughness={0.2} metalness={0.75} />
          </mesh>
        </>
      )}

      {/* Rooftop Spire & Beacon */}
      {hasSpire && (
        <group position={[0, height, 0]}>
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.08, 0.25, 5, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 5.1, 0]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      )}

      {/* Rooftop Helipad */}
      {hasHelipad && (
        <group position={[0, height + 0.05, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[Math.min(width, depth) * 0.38, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <ringGeometry
              args={[
                Math.min(width, depth) * 0.32,
                Math.min(width, depth) * 0.36,
                16
              ]}
            />
            <meshBasicMaterial color="#facc15" />
          </mesh>
        </group>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// 2. GRAND SUSPENSION BAY BRIDGE
// -------------------------------------------------------------
const SuspensionBayBridge: React.FC = () => {
  return (
    <group position={[32, 0, -68]} rotation={[0, 0.4, 0]}>
      {/* Elevated Highway Deck (Spanning 75 units across the bay) */}
      <mesh position={[0, 7.2, 0]}>
        <boxGeometry args={[75, 0.8, 4.2]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
      {/* Deck Roadway Surface */}
      <mesh position={[0, 7.62, 0]}>
        <boxGeometry args={[75, 0.05, 3.6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      {/* Center Yellow Dividing Strip */}
      <mesh position={[0, 7.66, 0]}>
        <boxGeometry args={[74, 0.02, 0.15]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Concrete Approach Piers Beneath Deck */}
      {[-32, -20, 20, 32].map((px, i) => (
        <mesh key={`pier-${i}`} position={[px, 3.6, 0]}>
          <boxGeometry args={[2.0, 7.2, 3.8]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
      ))}

      {/* Dual Main Suspension Towers (Tower 1 at x=-10, Tower 2 at x=10) */}
      {[-10, 10].map((tx, idx) => (
        <group key={`tower-${idx}`} position={[tx, 0, 0]}>
          {/* Submerged Concrete Foundation Caisson */}
          <mesh position={[0, 1.8, 0]}>
            <boxGeometry args={[4.2, 3.6, 6.2]} />
            <meshStandardMaterial color="#475569" roughness={0.9} />
          </mesh>

          {/* Dual Vertical Steel Pillars */}
          {[-2.0, 2.0].map((pz, pzi) => (
            <mesh key={`p-${pzi}`} position={[0, 13.5, pz]}>
              <boxGeometry args={[1.4, 21, 1.4]} />
              <meshStandardMaterial color="#c2410c" roughness={0.5} />
            </mesh>
          ))}

          {/* Upper Cross Strut */}
          <mesh position={[0, 21.5, 0]}>
            <boxGeometry args={[1.5, 1.2, 5.0]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>
          {/* Middle Cross Strut above deck */}
          <mesh position={[0, 14.5, 0]}>
            <boxGeometry args={[1.5, 1.0, 5.0]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>

          {/* Red Safety Beacon on Tower Top */}
          <mesh position={[0, 24.3, 0]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      ))}

      {/* Main Sweeping Suspension Cables */}
      {[-2.0, 2.0].map((cz, ci) => (
        <group key={`cable-${ci}`} position={[0, 0, cz]}>
          {/* Center Sagging Cable Span */}
          <mesh position={[0, 17.5, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[20, 0.22, 0.22]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
          {/* Left Anchor Cable Span */}
          <mesh position={[-23, 15.5, 0]} rotation={[0, 0, 0.42]}>
            <boxGeometry args={[28, 0.22, 0.22]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
          {/* Right Anchor Cable Span */}
          <mesh position={[23, 15.5, 0]} rotation={[0, 0, -0.42]}>
            <boxGeometry args={[28, 0.22, 0.22]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// -------------------------------------------------------------
// 3. LOW-POLY BAY WATER VESSELS (CARGO SHIPS & SAILBOATS)
// -------------------------------------------------------------
const BayVessels: React.FC = () => {
  return (
    <group>
      {/* Vessel 1: Large Distant Container Cargo Ship cruising the bay */}
      <group position={[46, 0, -36]} rotation={[0, -0.25, 0]}>
        {/* Red Anti-Fouling Lower Hull */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[24, 0.7, 5.4]} />
          <meshStandardMaterial color="#991b1b" roughness={0.7} />
        </mesh>
        {/* Black Upper Hull */}
        <mesh position={[0, 0.95, 0]}>
          <boxGeometry args={[24.2, 0.5, 5.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
        {/* Slanted Bow (Front) */}
        <mesh position={[12.8, 0.7, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[2.4, 1.2, 5.0]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>

        {/* Multi-Story Stern Bridge Deckhouse */}
        <group position={[-8.5, 2.2, 0]}>
          <mesh>
            <boxGeometry args={[3.8, 2.2, 4.4]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.5} />
          </mesh>
          {/* Bridge Windows */}
          <mesh position={[0.6, 0.65, 0]}>
            <boxGeometry args={[2.8, 0.45, 4.5]} />
            <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Smokestack Funnel */}
          <mesh position={[-1.2, 1.6, 0]}>
            <cylinderGeometry args={[0.45, 0.55, 1.6, 8]} />
            <meshStandardMaterial color="#dc2626" roughness={0.5} />
          </mesh>
        </group>

        {/* Stacked Cargo Containers on Deck */}
        {[-3.5, 0.5, 4.5, 8.5].map((cx, i) => (
          <group key={`container-stack-${i}`} position={[cx, 1.7, 0]}>
            {/* Lower Tier Containers */}
            <mesh position={[0, 0, -1.2]}>
              <boxGeometry args={[3.6, 1.1, 2.2]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#0284c7' : '#ea580c'}
                roughness={0.6}
              />
            </mesh>
            <mesh position={[0, 0, 1.2]}>
              <boxGeometry args={[3.6, 1.1, 2.2]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? '#16a34a' : '#d97706'}
                roughness={0.6}
              />
            </mesh>
            {/* Upper Tier Container */}
            <mesh position={[0, 1.1, 0]}>
              <boxGeometry args={[3.6, 1.1, 2.2]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#dc2626' : '#2563eb'}
                roughness={0.6}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Vessel 2: Elegant White Sailboat Cruising Bay Waters */}
      <group position={[56, 0, 20]} rotation={[0, 0.45, 0]}>
        {/* Sleek Boat Hull */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[6.2, 0.65, 1.8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        {/* Wood Deck Trim */}
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[5.8, 0.08, 1.6]} />
          <meshStandardMaterial color="#d4a373" roughness={0.7} />
        </mesh>
        {/* Tall Mast */}
        <mesh position={[0.4, 3.6, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 6.0, 8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Triangular Main Sail */}
        <mesh position={[-1.1, 3.8, 0]} rotation={[0, 0, 0.15]}>
          <coneGeometry args={[1.6, 5.0, 3]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Vessel 3: Second Sailboat on Northern Water */}
      <group position={[48, 0, -12]} rotation={[0, -0.6, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[5.2, 0.6, 1.6]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
        <mesh position={[0.2, 3.2, 0]}>
          <cylinderGeometry args={[0.04, 0.07, 5.2, 8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-0.9, 3.4, 0]} rotation={[0, 0, 0.12]}>
          <coneGeometry args={[1.4, 4.4, 3]} />
          <meshStandardMaterial
            color="#fef08a"
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};

// -------------------------------------------------------------
// 4. MAIN DISTANT METROPOLIS SKYLINE CLUSTER
// -------------------------------------------------------------
export const DistantMetropolis: React.FC = () => {
  return (
    <group position={[-115, 0, 0]}>
      {/* Distant Shoreline Embankment / Seawall Foundation */}
      <mesh position={[0, 0.6, -15]} receiveShadow>
        <boxGeometry args={[26, 1.2, 145]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>
      {/* Waterfront Promenade Band */}
      <mesh position={[12.2, 1.25, -15]}>
        <boxGeometry args={[1.5, 0.1, 145]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
      </mesh>

      {/* Coastal Container Port Cranes along Waterfront Edge */}
      {[-55, -40, 20, 35].map((cz, ci) => (
        <group key={`crane-${ci}`} position={[9.5, 1.2, cz]} rotation={[0, Math.PI / 2, 0]}>
          {/* A-frame base */}
          <mesh position={[0, 3.0, 0]}>
            <cylinderGeometry args={[0.2, 0.8, 6.0, 4]} />
            <meshStandardMaterial color="#ea580c" roughness={0.5} />
          </mesh>
          {/* Crane Boom Arm extending over water */}
          <mesh position={[0, 6.2, 3.5]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[0.6, 0.6, 8.5]} />
            <meshStandardMaterial color="#f97316" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ======================================================= */}
      {/* DENSE HIGH-RISE & SKYSCRAPER SKYLINE CLUSTER             */}
      {/* Positioned along Z from -80 to +40, heights 15 to 36m    */}
      {/* ======================================================= */}

      {/* 1. APEX METROPOLIS SPIRE TOWER (Flagship Centerpiece at z=-12) */}
      <Skyscraper
        position={[-2, 1.2, -12]}
        width={9.2}
        depth={8.5}
        height={36}
        color="#1e293b"
        windowColor="#38bdf8"
        hasSpire={true}
        setbacks={true}
      />

      {/* 2. TWIN FINANCIAL PLAZA A (z=-24) */}
      <Skyscraper
        position={[2, 1.2, -24]}
        width={7.8}
        depth={7.5}
        height={28}
        color="#334155"
        windowColor="#0284c7"
        hasHelipad={true}
      />

      {/* 3. TWIN FINANCIAL PLAZA B (z=-34) */}
      <Skyscraper
        position={[-3, 1.2, -34]}
        width={7.8}
        depth={7.5}
        height={30}
        color="#1e293b"
        windowColor="#0284c7"
        hasSpire={true}
      />

      {/* 4. HARBOR GLASS TOWER (z=0) */}
      <Skyscraper
        position={[4, 1.2, 0]}
        width={8.5}
        depth={7.8}
        height={25}
        color="#0f172a"
        windowColor="#38bdf8"
        setbacks={true}
      />

      {/* 5. METRO CORPORATE CENTER (z=12) */}
      <Skyscraper
        position={[-1, 1.2, 12]}
        width={8.2}
        depth={8.2}
        height={29}
        color="#334155"
        windowColor="#0284c7"
        hasHelipad={true}
      />

      {/* 6. BAY VIEW EXECUTIVE TOWER (z=25) */}
      <Skyscraper
        position={[3, 1.2, 25]}
        width={7.5}
        depth={7.2}
        height={22}
        color="#475569"
        windowColor="#38bdf8"
        hasSpire={true}
      />

      {/* 7. SOUTH COASTAL TOWER (z=38) */}
      <Skyscraper
        position={[-2, 1.2, 38]}
        width={7.2}
        depth={7.0}
        height={19}
        color="#334155"
        windowColor="#0284c7"
      />

      {/* 8. NORTH WATERFRONT HIGH-RISE 1 (z=-46) */}
      <Skyscraper
        position={[2, 1.2, -46]}
        width={7.4}
        depth={6.8}
        height={24}
        color="#1e293b"
        windowColor="#38bdf8"
        setbacks={true}
      />

      {/* 9. NORTH GATEWAY TOWER (Near Bridge Approach, z=-58) */}
      <Skyscraper
        position={[-3, 1.2, -58]}
        width={8.0}
        depth={7.5}
        height={27}
        color="#334155"
        windowColor="#0284c7"
        hasSpire={true}
      />

      {/* 10. BRIDGE TERMINAL TOWER (z=-70) */}
      <Skyscraper
        position={[1, 1.2, -70]}
        width={7.0}
        depth={6.8}
        height={21}
        color="#475569"
        windowColor="#38bdf8"
      />

      {/* SECOND ROW / INLAND DENSITY SKYLINE (Recessed behind front line) */}
      {[-62, -50, -38, -20, -5, 8, 20, 32].map((sz, si) => (
        <Skyscraper
          key={`inland-tower-${si}`}
          position={[-9, 1.2, sz]}
          width={6.8}
          depth={6.8}
          height={17 + ((si * 3) % 11)}
          color={si % 2 === 0 ? '#1e293b' : '#334155'}
          windowColor="#0284c7"
        />
      ))}

      {/* Grand Suspension Bay Bridge Connecting Across the Bay */}
      <SuspensionBayBridge />

      {/* Cruising Bay Water Vessels */}
      <BayVessels />
    </group>
  );
};

