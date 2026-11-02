import React from 'react';
import { RigidBody } from '@react-three/rapier';

export const Ground: React.FC = () => {
  return (
    <group>
      {/* 1. Large Physics Ground Plane (200m x 200m) at y = 0 */}
      <RigidBody type="fixed" friction={1.2} restitution={0.1}>
        <mesh position={[0, -0.25, 0]} receiveShadow>
          <boxGeometry args={[200, 0.5, 200]} />
          <meshStandardMaterial color="#dcd4c7" roughness={0.9} metalness={0.05} />
        </mesh>
      </RigidBody>

      {/* 2. City Road Network Decals (Elevated to y = 0.025 to completely prevent z-fighting with terrain) */}
      
      {/* Central Traffic Roundabout */}
      <group position={[0, 0, 0]}>
        {/* Outer Roundabout Ring Road (Radius 6.5m to 12.5m) */}
        <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <ringGeometry args={[6.5, 12.5, 64]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.8}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>

        {/* Inner Island (Radius 6.4m) */}
        <mesh position={[0, 0.028, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[6.4, 48]} />
          <meshStandardMaterial
            color="#65a30d"
            roughness={0.9}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>

        {/* Dashed Center Circle (16 genuine arc dashes elevated to y = 0.032 with polygonOffset) */}
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

      {/* North Avenue: Speed Runway to Hero Ramp (width 6m) */}
      <mesh position={[0, 0.025, -22]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 32]} />
        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      {/* North Road Dashed Divider Lines */}
      {[-12, -18, -24, -30].map((z) => (
        <mesh key={`n-dash-${z}`} position={[0, 0.032, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 3.2]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* South Avenue: Route to Contact Garage */}
      <mesh position={[0, 0.025, 22]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 30]} />
        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      {/* South Road Dashed Divider Lines */}
      {[14, 20, 26, 32].map((z) => (
        <mesh key={`s-dash-${z}`} position={[0, 0.032, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 3.2]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* East Boulevard: Highway to Projects Strip */}
      <mesh position={[24, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[34, 6]} />
        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      {/* East Highway Dashed Divider */}
      {[14, 20, 26, 32, 38].map((x) => (
        <mesh key={`e-dash-${x}`} position={[x, 0.032, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.3, 3.2]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* Projects Strip Frontage Road (North-South along the Diner, Food Truck, Cinema) */}
      <mesh position={[25, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 44]} />
        <meshStandardMaterial
          color="#506175"
          roughness={0.8}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* West Boulevard: Parkway to Suburb & Seaport */}
      <mesh position={[-24, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[34, 6]} />
        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      {/* West Highway Dashed Divider */}
      {[-14, -20, -26, -32].map((x) => (
        <mesh key={`w-dash-${x}`} position={[x, 0.032, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.3, 3.2]} />
          <meshBasicMaterial
            color="#facc15"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      ))}

      {/* Suburb Coastal Promenade Road (North-South through the suburb) */}
      <mesh position={[-24, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 42]} />
        <meshStandardMaterial
          color="#506175"
          roughness={0.8}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
    </group>
  );
};