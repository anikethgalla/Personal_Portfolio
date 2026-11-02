import React from 'react';
import { RigidBody } from '@react-three/rapier';

export const Ground: React.FC = () => {
  return (
    <group>
      {/* 1. Large Physics Ground Plane (200m x 200m) */}
      <RigidBody type="fixed" friction={1.2} restitution={0.1}>
        <mesh position={[0, -0.25, 0]} receiveShadow>
          <boxGeometry args={[200, 0.5, 200]} />
          <meshStandardMaterial color="#dcd4c7" roughness={0.9} metalness={0.05} />
        </mesh>
      </RigidBody>

      {/* 2. City Road Network Decals */}
      {/* Central Traffic Roundabout */}
      <group position={[0, 0.015, 0]}>
        {/* Outer Roundabout Ring Road */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <ringGeometry args={[6.5, 12.5, 48]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        {/* Inner Island */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[6.4, 48]} />
          <meshStandardMaterial color="#65a30d" roughness={0.9} />
        </mesh>
        {/* Dashed Center Circle */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[9.4, 9.6, 48]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
      </group>

      {/* North Avenue: Speed Runway to Hero Ramp (width 6m) */}
      <mesh position={[0, 0.012, -22]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 32]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>
      {/* North Road Dashed Divider Line */}
      {[-12, -18, -24, -30].map((z) => (
        <mesh key={`n-dash-${z}`} position={[0, 0.016, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 3.2]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
      ))}

      {/* South Avenue: Route to Contact Garage */}
      <mesh position={[0, 0.012, 22]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 30]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>
      {/* South Road Dashed Divider Line */}
      {[14, 20, 26, 32].map((z) => (
        <mesh key={`s-dash-${z}`} position={[0, 0.016, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 3.2]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
      ))}

      {/* East Boulevard: Highway to Projects Strip */}
      <mesh position={[24, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[34, 6]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>
      {/* East Highway Dashed Divider */}
      {[14, 20, 26, 32, 38].map((x) => (
        <mesh key={`e-dash-${x}`} position={[x, 0.016, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.3, 3.2]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
      ))}

      {/* Projects Strip Frontage Road (North-South along the Diner, Food Truck, Cinema) */}
      <mesh position={[25, 0.013, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 44]} />
        <meshStandardMaterial color="#506175" roughness={0.8} />
      </mesh>

      {/* West Boulevard: Parkway to Suburb & Seaport */}
      <mesh position={[-24, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[34, 6]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>
      {/* West Highway Dashed Divider */}
      {[-14, -20, -26, -32].map((x) => (
        <mesh key={`w-dash-${x}`} position={[x, 0.016, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.3, 3.2]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
      ))}

      {/* Suburb Coastal Promenade Road (North-South through the suburb) */}
      <mesh position={[-24, 0.013, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 42]} />
        <meshStandardMaterial color="#506175" roughness={0.8} />
      </mesh>
    </group>
  );
};
