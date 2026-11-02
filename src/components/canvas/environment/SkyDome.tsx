import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Low-poly puffy clay cloud component composed of intersecting clay spheres
interface CloudData {
  position: [number, number, number];
  scale: number;
  speed: number;
}

const PuffyClayCloud: React.FC<{ data: CloudData }> = ({ data }) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialPos = useMemo(() => new THREE.Vector3(...data.position), [data.position]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Gentle wind drift towards East (+X)
    groupRef.current.position.x += data.speed * delta;

    // Loop wrap seamlessly across the city boundaries (-75m to +75m)
    if (groupRef.current.position.x > 80) {
      groupRef.current.position.x = -80;
    }
  });

  return (
    <group ref={groupRef} position={data.position} scale={data.scale}>
      {/* Central main sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[2.8, 10, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Left puff */}
      <mesh position={[-2.1, -0.4, 0.4]} castShadow>
        <sphereGeometry args={[2.0, 9, 7]} />
        <meshStandardMaterial color="#fefefe" roughness={0.7} />
      </mesh>
      {/* Right puff */}
      <mesh position={[2.2, -0.3, -0.3]} castShadow>
        <sphereGeometry args={[2.2, 9, 7]} />
        <meshStandardMaterial color="#fefefe" roughness={0.7} />
      </mesh>
      {/* Top crown puff */}
      <mesh position={[0.4, 1.3, 0.2]} castShadow>
        <sphereGeometry args={[1.8, 8, 7]} />
        <meshStandardMaterial color="#ffffff" roughness={0.65} />
      </mesh>
      {/* Flattened underside puff */}
      <mesh position={[-0.2, -1.0, -0.2]} scale={[1.4, 0.6, 1.2]}>
        <sphereGeometry args={[1.9, 8, 6]} />
        <meshStandardMaterial color="#ede7df" roughness={0.8} />
      </mesh>
    </group>
  );
};

export const SkyDome: React.FC = () => {
  // Generate stylized clouds scattered above the city
  const clouds = useMemo<CloudData[]>(() => [
    { position: [-45, 26, -30], scale: 1.3, speed: 1.2 },
    { position: [-15, 30, -20], scale: 1.6, speed: 1.5 },
    { position: [20, 28, -25], scale: 1.4, speed: 1.1 },
    { position: [50, 32, -15], scale: 1.2, speed: 1.4 },
    { position: [-55, 29, 5], scale: 1.5, speed: 1.3 },
    { position: [-25, 27, 12], scale: 1.2, speed: 1.0 },
    { position: [10, 33, 18], scale: 1.7, speed: 1.4 },
    { position: [40, 28, 22], scale: 1.3, speed: 1.2 },
    { position: [-35, 34, 32], scale: 1.4, speed: 1.3 },
    { position: [5, 25, 35], scale: 1.2, speed: 1.1 },
    { position: [45, 31, 35], scale: 1.5, speed: 1.5 },
    { position: [-10, 35, 0], scale: 1.8, speed: 1.2 },
  ], []);

  // Create smooth vertical gradient canvas texture for the sky dome
  const skyTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 512);
      // Top: Soft Bruno Simon atmospheric pastel sky
      gradient.addColorStop(0, '#a5c4d8');
      // Mid-sky: Soft warm morning sky
      gradient.addColorStop(0.45, '#cce0ee');
      // Horizon haze: Warm pastel clay cream
      gradient.addColorStop(0.8, '#ede3d5');
      // Ground horizon base: Studio matte clay tone
      gradient.addColorStop(1.0, '#ded6cb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 2, 512);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);

  return (
    <group>
      {/* 1. Large Warm Bruno Simon Studio Sky Dome (Inverted Hemisphere) */}
      <mesh position={[0, -5, 0]}>
        <sphereGeometry args={[140, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial map={skyTexture} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* 2. Stylized Low-Poly Clay Sun Orb on Horizon */}
      <group position={[70, 48, -60]}>
        <mesh>
          <sphereGeometry args={[5.5, 16, 16]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        {/* Soft glowing sun aura halo */}
        <mesh scale={1.25}>
          <sphereGeometry args={[5.5, 16, 16]} />
          <meshBasicMaterial color="#fed7aa" transparent opacity={0.35} />
        </mesh>
      </group>

      {/* 3. Floating Drifting Puffy 3D Clay Clouds */}
      {clouds.map((cloud, idx) => (
        <PuffyClayCloud key={`cloud-${idx}`} data={cloud} />
      ))}
    </group>
  );
};