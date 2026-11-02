import React from 'react';
import { RigidBody } from '@react-three/rapier';

interface TreeProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
}

const LowPolyTree: React.FC<TreeProps> = ({ position, scale = 1, color = '#65a30d' }) => {
  return (
    <group position={position} scale={scale}>
      {/* Solid Trunk Collider */}
      <RigidBody type="fixed" colliders="hull" friction={0.6}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.32, 1.8, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Fluffy Multi-Sphere Foliage Crown */}
      <group position={[0, 2.6, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[1.35, 10, 8]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.95, 10, 8]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        <mesh position={[0.55, -0.25, 0.4]} castShadow>
          <sphereGeometry args={[0.8, 8, 8]} />
          <meshStandardMaterial color="#4d7c0f" roughness={0.6} />
        </mesh>
        <mesh position={[-0.55, -0.25, -0.4]} castShadow>
          <sphereGeometry args={[0.8, 8, 8]} />
          <meshStandardMaterial color="#3f6212" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

const StreetLamp: React.FC<{ position: [number, number, number] }> = ({ position }) => {
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

const ParkBench: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({
  position,
  rotation = [0, 0, 0]
}) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.32, 0]} castShadow>
        <boxGeometry args={[1.6, 0.07, 0.5]} />
        <meshStandardMaterial color="#854d0e" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.62, -0.22]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[1.6, 0.38, 0.06]} />
        <meshStandardMaterial color="#854d0e" roughness={0.7} />
      </mesh>
      {[-0.7, 0.7].map((x) => (
        <mesh key={x} position={[x, 0.16, 0]} castShadow>
          <boxGeometry args={[0.07, 0.32, 0.45]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};

export const GreenParkAndSuburb: React.FC = () => {
  return (
    <group>
      {/* ======================================================== */}
      {/* 1. EXPANSIVE GREEN GRASS LAWNS                           */}
      {/* Cleanly bounded & positioned at y = 0.010 with           */}
      {/* polygonOffset to prevent any z-fighting with roads       */}
      {/* ======================================================== */}
      {/* Central Park & Skills Plaza Lawn (North of West Boulevard) */}
      <mesh position={[-23, 0.010, -14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[19, 18]} />
        <meshStandardMaterial
          color="#65a30d"
          roughness={0.9}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>

      {/* Residential Suburb South Lawn (South of West Boulevard) */}
      <mesh position={[-23, 0.010, 14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[19, 18]} />
        <meshStandardMaterial
          color="#65a30d"
          roughness={0.9}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>

      {/* Waterfront Promenade Lawn Strip (Far West near Coastal Pier) */}
      <mesh position={[-33, 0.010, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 48]} />
        <meshStandardMaterial
          color="#5ea508"
          roughness={0.9}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>

      {/* ======================================================== */}
      {/* 2. CLUSTER OF LOW-POLY CLAY HOUSES                       */}
      {/* ======================================================== */}

      {/* HOUSE 1: Country Cottage at [-26, 0, 14] */}
      <group position={[-26, 0, 14]}>
        <RigidBody type="fixed" friction={0.7}>
          <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.8, 3.0, 4.0]} />
            <meshStandardMaterial color="#fefaf6" roughness={0.6} />
          </mesh>
          <mesh position={[0, 3.5, 0]} castShadow>
            <boxGeometry args={[5.2, 0.16, 4.4]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>
          <mesh position={[-0.9, 3.95, 0]} rotation={[0, 0, 0.55]} castShadow>
            <boxGeometry args={[2.4, 0.16, 4.4]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>
          <mesh position={[0.9, 3.95, 0]} rotation={[0, 0, -0.55]} castShadow>
            <boxGeometry args={[2.4, 0.16, 4.4]} />
            <meshStandardMaterial color="#c2410c" roughness={0.5} />
          </mesh>
          <mesh position={[1.5, 4.5, 0.7]} castShadow>
            <boxGeometry args={[0.55, 1.3, 0.55]} />
            <meshStandardMaterial color="#991b1b" roughness={0.7} />
          </mesh>
          <mesh position={[2.42, 1.0, 0]}>
            <boxGeometry args={[0.04, 2.0, 1.0]} />
            <meshStandardMaterial color="#78350f" roughness={0.5} />
          </mesh>
          <mesh position={[2.65, 0.18, 0]} castShadow>
            <boxGeometry args={[0.6, 0.35, 1.4]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
          </mesh>
          <mesh position={[2.42, 2.0, 1.2]}>
            <boxGeometry args={[0.04, 0.9, 0.8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[2.42, 2.0, -1.2]}>
            <boxGeometry args={[0.04, 0.9, 0.8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>
        </RigidBody>
      </group>

      {/* HOUSE 2: Split-Level Villa at [-28, 0, -16] */}
      <group position={[-28, 0, -16]}>
        <RigidBody type="fixed" friction={0.7}>
          <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[5.0, 4.4, 4.2]} />
            <meshStandardMaterial color="#64748b" roughness={0.6} />
          </mesh>
          <mesh position={[0, 4.5, 0]} castShadow>
            <boxGeometry args={[5.4, 0.35, 4.6]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          <mesh position={[0.2, 1.2, 3.2]} castShadow receiveShadow>
            <boxGeometry args={[4.4, 2.4, 2.4]} />
            <meshStandardMaterial color="#475569" roughness={0.6} />
          </mesh>
          <mesh position={[0.2, 2.45, 3.2]} castShadow>
            <boxGeometry args={[4.6, 0.22, 2.6]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          <mesh position={[2.42, 1.0, 3.2]}>
            <boxGeometry args={[0.04, 1.8, 1.8]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
          </mesh>
          <mesh position={[2.52, 2.6, 0]}>
            <boxGeometry args={[0.04, 1.4, 2.4]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
          </mesh>
        </RigidBody>
      </group>

      {/* HOUSE 3: Craftsman Home at [-32, 0, -2] */}
      <group position={[-32, 0, -2]}>
        <RigidBody type="fixed" friction={0.7}>
          <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.4, 3.2, 4.6]} />
            <meshStandardMaterial color="#d97706" roughness={0.6} />
          </mesh>
          <mesh position={[-0.8, 3.9, 0]} rotation={[0, 0, 0.5]} castShadow>
            <boxGeometry args={[2.4, 0.16, 4.9]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>
          <mesh position={[0.8, 3.9, 0]} rotation={[0, 0, -0.5]} castShadow>
            <boxGeometry args={[2.4, 0.16, 4.9]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>
          <mesh position={[2.5, 1.7, 0]} rotation={[0, 0, -0.2]} castShadow>
            <boxGeometry args={[1.3, 0.09, 2.6]} />
            <meshStandardMaterial color="#92400e" roughness={0.6} />
          </mesh>
        </RigidBody>
      </group>

      {/* HOUSE 4: Cozy Garden Bungalow at [-18, 0, -22] */}
      <group position={[-18, 0, -22]}>
        <RigidBody type="fixed" friction={0.7}>
          <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.2, 2.8, 3.6]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.6} />
          </mesh>
          <mesh position={[0, 3.2, 0]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[4.5, 0.15, 2.2]} />
            <meshStandardMaterial color="#ea580c" roughness={0.5} />
          </mesh>
          <mesh position={[0, 3.2, 0]} rotation={[-0.4, 0, 0]} castShadow>
            <boxGeometry args={[4.5, 0.15, 2.2]} />
            <meshStandardMaterial color="#ea580c" roughness={0.5} />
          </mesh>
        </RigidBody>
      </group>

      {/* ======================================================== */}
      {/* 3. FLUFFY LOW-POLY TREES                                 */}
      {/* ======================================================== */}
      {/* Avenue & Boulevard Lining Trees */}
      <LowPolyTree position={[-13, 0, -12]} scale={1.2} color="#65a30d" />
      <LowPolyTree position={[-13, 0, -3]} scale={1.1} color="#4d7c0f" />
      <LowPolyTree position={[-13, 0, 6]} scale={1.25} color="#65a30d" />
      <LowPolyTree position={[-13, 0, 15]} scale={1.15} color="#3f6212" />

      {/* Suburb Garden Trees */}
      <LowPolyTree position={[-20, 0, -15]} scale={1.2} color="#4d7c0f" />
      <LowPolyTree position={[-28, 0, -23]} scale={1.35} color="#65a30d" />
      <LowPolyTree position={[-34, 0, -10]} scale={1.1} color="#3f6212" />
      <LowPolyTree position={[-20, 0, 6]} scale={1.05} color="#65a30d" />
      <LowPolyTree position={[-20, 0, 18]} scale={1.3} color="#4d7c0f" />
      <LowPolyTree position={[-29, 0, 20]} scale={1.3} color="#65a30d" />

      {/* Waterfront Promenade Trees */}
      <LowPolyTree position={[-30, 0, 5]} scale={1.05} color="#65a30d" />
      <LowPolyTree position={[-30, 0, -6]} scale={1.05} color="#4d7c0f" />
      <LowPolyTree position={[-34, 0, 8]} scale={1.1} color="#3f6212" />
      <LowPolyTree position={[-34, 0, -14]} scale={1.15} color="#65a30d" />

      {/* ======================================================== */}
      {/* 4. PARK FURNITURE & STREET LIGHTING                      */}
      {/* ======================================================== */}
      <ParkBench position={[-15, 0, -4]} rotation={[0, -Math.PI / 2, 0]} />
      <ParkBench position={[-20, 0, -11]} rotation={[0, 0, 0]} />
      <ParkBench position={[-20, 0, 3]} rotation={[0, Math.PI, 0]} />
      <ParkBench position={[-30, 0, 1.5]} rotation={[0, -Math.PI / 2, 0]} />

      <StreetLamp position={[-14.5, 0, -9]} />
      <StreetLamp position={[-14.5, 0, 3]} />
      <StreetLamp position={[-23, 0, -3]} />
      <StreetLamp position={[-23, 0, 15]} />
      <StreetLamp position={[-28, 0, 6]} />
      <StreetLamp position={[-30, 0, -2]} />
    </group>
  );
};
