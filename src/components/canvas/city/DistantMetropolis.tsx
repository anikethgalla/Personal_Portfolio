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
          {/* Base Front Windows (+X face towards water and player) */}
          <mesh position={[width * 0.51, height * 0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[depth * 0.85, height * 0.42]} />
            <meshStandardMaterial color={windowColor} roughness={0.2} metalness={0.7} />
          </mesh>

          {/* Middle Tier */}
          <mesh position={[0, height * 0.62, 0]}>
            <boxGeometry args={[width * 0.78, height * 0.32, depth * 0.78]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
          {/* Middle Front Windows (+X face) */}
          <mesh position={[width * 0.395, height * 0.62, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[depth * 0.66, height * 0.26]} />
            <meshStandardMaterial color={windowColor} roughness={0.2} metalness={0.7} />
          </mesh>

          {/* Upper Crown Tier */}
          <mesh position={[0, height * 0.88, 0]}>
            <boxGeometry args={[width * 0.55, height * 0.22, depth * 0.55]} />
            <meshStandardMaterial color="#475569" roughness={0.4} />
          </mesh>
          <mesh position={[width * 0.28, height * 0.88, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[depth * 0.45, height * 0.16]} />
            <meshStandardMaterial color={windowColor} roughness={0.2} metalness={0.8} />
          </mesh>
        </>
      ) : (
        // Single Sleek Monolithic Tower
        <>
          <mesh position={[0, height * 0.5, 0]}>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Front Window Surface (+X face towards bay & player) */}
          <mesh position={[width * 0.51, height * 0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[depth * 0.84, height * 0.88]} />
            <meshStandardMaterial color={windowColor} roughness={0.2} metalness={0.75} />
          </mesh>
          {/* Side Window Strips (+Z and -Z) */}
          <mesh position={[0, height * 0.5, depth * 0.51]}>
            <planeGeometry args={[width * 0.82, height * 0.88]} />
            <meshStandardMaterial color={windowColor} roughness={0.2} metalness={0.75} />
          </mesh>
          <mesh position={[0, height * 0.5, -depth * 0.51]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[width * 0.82, height * 0.88]} />
            <meshStandardMaterial color={windowColor} roughness={0.2} metalness={0.75} />
          </mesh>
        </>
      )}

      {/* Rooftop Spire & Flashing Aircraft Safety Beacon */}
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
// 2. GRAND SUSPENSION BAY BRIDGE (NORTHERN STRAIT)
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
// 3. LUXURY MODERN YACHTS & BAY VESSELS
// -------------------------------------------------------------
interface YachtProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  length?: number;
  hullColor?: string;
  accentColor?: string;
  isSuperyacht?: boolean;
}

const LuxuryYacht: React.FC<YachtProps> = ({
  position,
  rotation = [0, 0, 0],
  length = 14,
  hullColor = '#ffffff',
  accentColor = '#0f172a',
  isSuperyacht = false
}) => {
  const width = length * 0.32;
  const hullHeight = length * 0.12;

  return (
    <group position={position} rotation={rotation}>
      {/* Lower Waterline Hull Trim */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[length, hullHeight * 0.5, width]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Main Sleek Hull (Pointed Bow at +X) */}
      <mesh position={[-length * 0.08, hullHeight * 0.75, 0]}>
        <boxGeometry args={[length * 0.84, hullHeight * 0.8, width]} />
        <meshStandardMaterial color={hullColor} roughness={0.3} />
      </mesh>
      {/* Aerodynamic Pointed Bow Wedge */}
      <mesh position={[length * 0.42, hullHeight * 0.75, 0]} rotation={[0, 0, -0.32]}>
        <boxGeometry args={[length * 0.28, hullHeight * 0.9, width * 0.92]} />
        <meshStandardMaterial color={hullColor} roughness={0.3} />
      </mesh>

      {/* Teak Wood Aft Swim Platform (Stern at -X) */}
      <mesh position={[-length * 0.52, 0.28, 0]}>
        <boxGeometry args={[length * 0.1, 0.08, width * 0.85]} />
        <meshStandardMaterial color="#c28b58" roughness={0.8} />
      </mesh>
      {/* Teak Main Deck Surface */}
      <mesh position={[-length * 0.05, hullHeight * 1.15, 0]}>
        <boxGeometry args={[length * 0.78, 0.05, width * 0.92]} />
        <meshStandardMaterial color="#c28b58" roughness={0.8} />
      </mesh>

      {/* Main Cabin / Salon with Panoramic Tinted Glass */}
      <group position={[-length * 0.08, hullHeight * 1.55, 0]}>
        {/* White Cabin Shell */}
        <mesh>
          <boxGeometry args={[length * 0.52, hullHeight * 0.75, width * 0.75]} />
          <meshStandardMaterial color={hullColor} roughness={0.3} />
        </mesh>
        {/* Slanted Front Windshield */}
        <mesh position={[length * 0.24, 0.05, 0]} rotation={[0, 0, -0.45]}>
          <boxGeometry args={[length * 0.14, hullHeight * 0.65, width * 0.72]} />
          <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Wraparound Side Panoramic Windows */}
        {[-width * 0.38, width * 0.38].map((wz, wi) => (
          <mesh key={`win-${wi}`} position={[0, 0.05, wz]}>
            <boxGeometry args={[length * 0.44, hullHeight * 0.42, 0.04]} />
            <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Flybridge Upper Sun Deck */}
      <group position={[-length * 0.14, hullHeight * 2.1, 0]}>
        {/* Flybridge Deck Floor */}
        <mesh>
          <boxGeometry args={[length * 0.36, 0.12, width * 0.62]} />
          <meshStandardMaterial color={hullColor} roughness={0.3} />
        </mesh>
        {/* Flybridge Deflector Windshield */}
        <mesh position={[length * 0.16, 0.22, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.08, 0.32, width * 0.58]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Swept-back Radar Arch / Mast */}
        <mesh position={[-length * 0.12, 0.65, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[length * 0.08, 0.95, width * 0.56]} />
          <meshStandardMaterial color={hullColor} roughness={0.4} />
        </mesh>
        {/* White Satellite Comms / Radar Dome */}
        <mesh position={[-length * 0.12, 1.25, 0]}>
          <sphereGeometry args={[length * 0.035, 12, 8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Chrome Navigation Mast Spire */}
        <mesh position={[-length * 0.12, 1.55, 0]}>
          <cylinderGeometry args={[0.02, 0.03, 0.6, 6]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Forward Bow Sunpad Lounge Cushions (Luxury Orange Accents) */}
      <mesh position={[length * 0.22, hullHeight * 1.22, 0]} rotation={[0, 0, -0.06]}>
        <boxGeometry args={[length * 0.18, 0.08, width * 0.48]} />
        <meshStandardMaterial color="#ea580c" roughness={0.6} />
      </mesh>

      {/* Superyacht Extra Tier: Aft Jacuzzi / Lounge Deck */}
      {isSuperyacht && (
        <group position={[-length * 0.36, hullHeight * 1.35, 0]}>
          {/* Teak Jacuzzi Ring */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[width * 0.2, width * 0.22, 0.25, 12]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
          </mesh>
          {/* Glowing Turquoise Spa Water */}
          <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[width * 0.18, 12]} />
            <meshStandardMaterial color="#06b6d4" roughness={0.1} emissive="#06b6d4" emissiveIntensity={0.25} />
          </mesh>
          {/* Twin Satellite Domes on Flybridge */}
          <mesh position={[length * 0.08, hullHeight * 1.3, -width * 0.22]}>
            <sphereGeometry args={[length * 0.03, 10, 8]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.2} />
          </mesh>
          <mesh position={[length * 0.08, hullHeight * 1.3, width * 0.22]}>
            <sphereGeometry args={[length * 0.03, 10, 8]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// 4. LOW-POLY BAY WATER VESSELS (YACHTS, FREIGHTERS & SAILBOATS)
// -------------------------------------------------------------
const BayVessels: React.FC = () => {
  return (
    <group>
      {/* ======================================================= */}
      {/* LUXURY YACHTS FLEET                                     */}
      {/* ======================================================= */}
      {/* 1. Flagship 18m Triple-Deck Superyacht (Directly in Central Bay view) */}
      <LuxuryYacht
        position={[49, 0, -6]}
        rotation={[0, 0.35, 0]}
        length={18}
        hullColor="#ffffff"
        accentColor="#0f172a"
        isSuperyacht={true}
      />

      {/* 2. 14m Luxury Flybridge Yacht (Northern Cape off Lighthouse) */}
      <LuxuryYacht
        position={[61, 0, -32]}
        rotation={[0, -0.55, 0]}
        length={14}
        hullColor="#ffffff"
        accentColor="#0369a1"
        isSuperyacht={false}
      />

      {/* 3. 12m Sport Cruiser Yacht (Mid-Bay Center) */}
      <LuxuryYacht
        position={[43, 0, 16]}
        rotation={[0, 0.6, 0]}
        length={12}
        hullColor="#f8fafc"
        accentColor="#b45309"
        isSuperyacht={false}
      />

      {/* 4. 16m Luxury Mega Yacht (Southern Bay off Contact Zone) */}
      <LuxuryYacht
        position={[53, 0, 48]}
        rotation={[0, 0.25, 0]}
        length={16}
        hullColor="#ffffff"
        accentColor="#1e3a8a"
        isSuperyacht={true}
      />

      {/* 5. 11m Express Cruiser Yacht (Far South Bay) */}
      <LuxuryYacht
        position={[57, 0, 84]}
        rotation={[0, 0.45, 0]}
        length={11}
        hullColor="#ffffff"
        accentColor="#0f766e"
        isSuperyacht={false}
      />

      {/* 6. 10m Modern Cruiser Yacht (North Bay near Bridge) */}
      <LuxuryYacht
        position={[47, 0, -62]}
        rotation={[0, -0.4, 0]}
        length={10}
        hullColor="#f1f5f9"
        accentColor="#dc2626"
        isSuperyacht={false}
      />

      {/* ======================================================= */}
      {/* COMMERCIAL FREIGHTERS & SAILBOATS                       */}
      {/* ======================================================= */}
      {/* Vessel 1: Central Container Cargo Ship */}
      <group position={[46, 0, -25]} rotation={[0, -0.25, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[24, 0.7, 5.4]} />
          <meshStandardMaterial color="#991b1b" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <boxGeometry args={[24.2, 0.5, 5.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
        <mesh position={[12.8, 0.7, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[2.4, 1.2, 5.0]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
        {/* Deckhouse */}
        <group position={[-8.5, 2.2, 0]}>
          <mesh>
            <boxGeometry args={[3.8, 2.2, 4.4]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.5} />
          </mesh>
          <mesh position={[0.6, 0.65, 0]}>
            <boxGeometry args={[2.8, 0.45, 4.5]} />
            <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[-1.2, 1.6, 0]}>
            <cylinderGeometry args={[0.45, 0.55, 1.6, 8]} />
            <meshStandardMaterial color="#dc2626" roughness={0.5} />
          </mesh>
        </group>
        {/* Containers */}
        {[-3.5, 0.5, 4.5, 8.5].map((cx, i) => (
          <group key={`c1-stack-${i}`} position={[cx, 1.7, 0]}>
            <mesh position={[0, 0, -1.2]}>
              <boxGeometry args={[3.6, 1.1, 2.2]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#0284c7' : '#ea580c'} roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, 1.2]}>
              <boxGeometry args={[3.6, 1.1, 2.2]} />
              <meshStandardMaterial color={i % 3 === 0 ? '#16a34a' : '#d97706'} roughness={0.6} />
            </mesh>
            <mesh position={[0, 1.1, 0]}>
              <boxGeometry args={[3.6, 1.1, 2.2]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#dc2626' : '#2563eb'} roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Vessel 2: Southern Coastal Cargo Freighter (Visible behind Contact Zone) */}
      <group position={[44, 0, 56]} rotation={[0, 0.32, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[22, 0.7, 5.0]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <boxGeometry args={[22.2, 0.5, 5.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
        <mesh position={[11.8, 0.7, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[2.2, 1.2, 4.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
        {/* Deckhouse */}
        <group position={[-7.5, 2.1, 0]}>
          <mesh>
            <boxGeometry args={[3.6, 2.0, 4.0]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
          <mesh position={[-1.0, 1.5, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 1.4, 8]} />
            <meshStandardMaterial color="#eab308" roughness={0.5} />
          </mesh>
        </group>
        {/* Containers */}
        {[-2.8, 1.2, 5.2, 8.2].map((cx, i) => (
          <group key={`c2-stack-${i}`} position={[cx, 1.6, 0]}>
            <mesh position={[0, 0, -1.0]}>
              <boxGeometry args={[3.2, 1.0, 2.0]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#ea580c' : '#0284c7'} roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, 1.0]}>
              <boxGeometry args={[3.2, 1.0, 2.0]} />
              <meshStandardMaterial color={i % 3 === 0 ? '#16a34a' : '#ef4444'} roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Vessel 3: Northern White Sailboat (Behind Lighthouse) */}
      <group position={[50, 0, -52]} rotation={[0, -0.5, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[6.2, 0.65, 1.8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        <mesh position={[0.4, 3.6, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 6.0, 8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-1.1, 3.8, 0]} rotation={[0, 0, 0.15]}>
          <coneGeometry args={[1.6, 5.0, 3]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Vessel 4: Central Sailboat (Azure & Yellow) */}
      <group position={[56, 0, 12]} rotation={[0, 0.45, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[5.6, 0.6, 1.7]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
        <mesh position={[0.3, 3.4, 0]}>
          <cylinderGeometry args={[0.04, 0.07, 5.6, 8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-1.0, 3.6, 0]} rotation={[0, 0, 0.15]}>
          <coneGeometry args={[1.5, 4.6, 3]} />
          <meshStandardMaterial color="#fde047" roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Vessel 5: Southern Sailboat (Behind South Gateway & Contact Zone) */}
      <group position={[52, 0, 80]} rotation={[0, 0.6, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[5.8, 0.6, 1.7]} />
          <meshStandardMaterial color="#ea580c" roughness={0.4} />
        </mesh>
        <mesh position={[0.3, 3.4, 0]}>
          <cylinderGeometry args={[0.04, 0.07, 5.6, 8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-1.0, 3.6, 0]} rotation={[0, 0, 0.15]}>
          <coneGeometry args={[1.5, 4.6, 3]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

// -------------------------------------------------------------
// 4. MAIN CONTINUOUS DISTANT METROPOLIS (NORTH, CENTER & SOUTH)
// -------------------------------------------------------------
export const DistantMetropolis: React.FC = () => {
  return (
    <group position={[-115, 0, 0]}>
      {/* Expansive Distant Waterfront Shoreline Seawall (Spans z = -115 to +115) */}
      <mesh position={[0, 0.6, 0]} receiveShadow>
        <boxGeometry args={[32, 1.2, 232]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>
      {/* Continuous Waterfront Promenade Band */}
      <mesh position={[15.2, 1.25, 0]}>
        <boxGeometry args={[2.0, 0.1, 232]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
      </mesh>

      {/* Coastal Container Port Cranes along Waterfront Edge */}
      {[-85, -65, -45, -25, 25, 48, 70, 92].map((cz, ci) => (
        <group key={`crane-${ci}`} position={[12.5, 1.2, cz]} rotation={[0, Math.PI / 2, 0]}>
          {/* A-frame base */}
          <mesh position={[0, 3.0, 0]}>
            <cylinderGeometry args={[0.2, 0.8, 6.0, 4]} />
            <meshStandardMaterial color={ci % 2 === 0 ? '#ea580c' : '#f97316'} roughness={0.5} />
          </mesh>
          {/* Crane Boom Arm extending over water */}
          <mesh position={[0, 6.2, 3.5]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[0.6, 0.6, 8.5]} />
            <meshStandardMaterial color={ci % 2 === 0 ? '#f97316' : '#ea580c'} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ======================================================= */}
      {/* 1. NORTHERN SKYLINE DISTRICT (z = -105 to z = -25)       */}
      {/* Visible directly behind Lighthouse & Tech Playground     */}
      {/* ======================================================= */}
      <Skyscraper
        position={[2, 1.2, -102]}
        width={7.4}
        depth={7.0}
        height={24}
        color="#334155"
        windowColor="#38bdf8"
      />
      <Skyscraper
        position={[-3, 1.2, -92]}
        width={8.2}
        depth={8.0}
        height={34}
        color="#1e293b"
        windowColor="#0284c7"
        hasSpire={true}
        setbacks={true}
      />
      <Skyscraper
        position={[3, 1.2, -82]}
        width={7.8}
        depth={7.5}
        height={27}
        color="#475569"
        windowColor="#38bdf8"
        hasHelipad={true}
      />
      <Skyscraper
        position={[-2, 1.2, -72]}
        width={8.0}
        depth={7.8}
        height={31}
        color="#1e293b"
        windowColor="#0284c7"
        hasSpire={true}
      />
      <Skyscraper
        position={[2, 1.2, -62]}
        width={7.6}
        depth={7.2}
        height={26}
        color="#334155"
        windowColor="#38bdf8"
        setbacks={true}
      />
      <Skyscraper
        position={[-3, 1.2, -50]}
        width={8.5}
        depth={8.2}
        height={33}
        color="#1e293b"
        windowColor="#0284c7"
        hasHelipad={true}
        setbacks={true}
      />
      <Skyscraper
        position={[2, 1.2, -40]}
        width={7.4}
        depth={7.0}
        height={25}
        color="#475569"
        windowColor="#38bdf8"
      />
      <Skyscraper
        position={[-3, 1.2, -30]}
        width={7.8}
        depth={7.5}
        height={30}
        color="#1e293b"
        windowColor="#0284c7"
        hasSpire={true}
      />

      {/* ======================================================= */}
      {/* 2. CENTRAL DOWNTOWN FINANCIAL CORE (z = -25 to z = +25)  */}
      {/* Flagship Centerpiece Spires and Twin Financial Plaza     */}
      {/* ======================================================= */}
      <Skyscraper
        position={[2, 1.2, -22]}
        width={7.8}
        depth={7.5}
        height={29}
        color="#334155"
        windowColor="#0284c7"
        hasHelipad={true}
      />
      {/* Flagship Centerpiece: Apex Metropolis Spire Tower */}
      <Skyscraper
        position={[-2, 1.2, -10]}
        width={9.4}
        depth={8.8}
        height={38}
        color="#0f172a"
        windowColor="#38bdf8"
        hasSpire={true}
        setbacks={true}
      />
      <Skyscraper
        position={[4, 1.2, 0]}
        width={8.5}
        depth={7.8}
        height={26}
        color="#1e293b"
        windowColor="#38bdf8"
        setbacks={true}
      />
      <Skyscraper
        position={[-1, 1.2, 12]}
        width={8.4}
        depth={8.2}
        height={32}
        color="#334155"
        windowColor="#0284c7"
        hasHelipad={true}
      />
      <Skyscraper
        position={[3, 1.2, 24]}
        width={7.6}
        depth={7.2}
        height={25}
        color="#475569"
        windowColor="#38bdf8"
        hasSpire={true}
      />

      {/* ======================================================= */}
      {/* 3. SOUTHERN SKYLINE DISTRICT (z = +25 to z = +105)       */}
      {/* Visible directly behind Contact Zone / South Gateway     */}
      {/* ======================================================= */}
      <Skyscraper
        position={[-2, 1.2, 34]}
        width={7.8}
        depth={7.6}
        height={28}
        color="#334155"
        windowColor="#0284c7"
        setbacks={true}
      />
      {/* South Flagship Centerpiece: South Metropolitan Apex Spire */}
      <Skyscraper
        position={[2, 1.2, 45]}
        width={8.8}
        depth={8.4}
        height={36}
        color="#0f172a"
        windowColor="#38bdf8"
        hasSpire={true}
        setbacks={true}
      />
      <Skyscraper
        position={[-3, 1.2, 56]}
        width={8.2}
        depth={7.8}
        height={31}
        color="#1e293b"
        windowColor="#0284c7"
        hasHelipad={true}
      />
      <Skyscraper
        position={[3, 1.2, 66]}
        width={7.8}
        depth={7.4}
        height={27}
        color="#475569"
        windowColor="#38bdf8"
        setbacks={true}
      />
      <Skyscraper
        position={[-2, 1.2, 76]}
        width={8.4}
        depth={8.0}
        height={33}
        color="#1e293b"
        windowColor="#0284c7"
        hasSpire={true}
      />
      <Skyscraper
        position={[2, 1.2, 86]}
        width={7.6}
        depth={7.2}
        height={26}
        color="#334155"
        windowColor="#38bdf8"
        hasHelipad={true}
      />
      <Skyscraper
        position={[-3, 1.2, 96]}
        width={8.0}
        depth={7.6}
        height={29}
        color="#1e293b"
        windowColor="#0284c7"
        setbacks={true}
      />
      <Skyscraper
        position={[1, 1.2, 105]}
        width={7.2}
        depth={7.0}
        height={23}
        color="#475569"
        windowColor="#38bdf8"
      />

      {/* ======================================================= */}
      {/* 4. DENSE INLAND SECOND ROW (Multi-Layer Depth)           */}
      {/* Positioned recessed at x = -10 across entire coast       */}
      {/* ======================================================= */}
      {[-96, -82, -68, -54, -40, -26, -12, 2, 16, 30, 44, 58, 72, 86, 100].map((sz, si) => (
        <Skyscraper
          key={`inland-tower-${si}`}
          position={[-11, 1.2, sz]}
          width={7.0}
          depth={7.0}
          height={18 + ((si * 3) % 13)}
          color={si % 2 === 0 ? '#1e293b' : '#334155'}
          windowColor={si % 3 === 0 ? '#38bdf8' : '#0284c7'}
        />
      ))}

      {/* Grand Suspension Bay Bridge Connecting Across Northern Bay */}
      <SuspensionBayBridge />

      {/* Cruising Bay Water Vessels (Spread across North, Center, and South waters) */}
      <BayVessels />
    </group>
  );
};
