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

    // Loop wrap seamlessly across the expanded world boundaries (-130m to +130m)
    if (groupRef.current.position.x > 130) {
      groupRef.current.position.x = -130;
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
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      {/* Right puff */}
      <mesh position={[2.2, -0.3, -0.3]} castShadow>
        <sphereGeometry args={[2.2, 9, 7]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      {/* Top crown puff */}
      <mesh position={[0.4, 1.3, 0.2]} castShadow>
        <sphereGeometry args={[1.8, 8, 7]} />
        <meshStandardMaterial color="#ffffff" roughness={0.65} />
      </mesh>
      {/* Flattened underside puff with soft blue-sky shadow */}
      <mesh position={[-0.2, -1.0, -0.2]} scale={[1.4, 0.6, 1.2]}>
        <sphereGeometry args={[1.9, 8, 6]} />
        <meshStandardMaterial color="#e0f2fe" roughness={0.8} />
      </mesh>
    </group>
  );
};

export const SkyDome: React.FC = () => {
  // Generate stylized clouds scattered above the city and valleys
  const clouds = useMemo<CloudData[]>(() => [
    { position: [-70, 28, -70], scale: 1.5, speed: 1.3 },
    { position: [-25, 32, -60], scale: 1.7, speed: 1.4 },
    { position: [30, 30, -55], scale: 1.4, speed: 1.1 },
    { position: [75, 34, -65], scale: 1.6, speed: 1.5 },
    { position: [-55, 29, -25], scale: 1.3, speed: 1.2 },
    { position: [-15, 33, -15], scale: 1.8, speed: 1.5 },
    { position: [20, 28, -20], scale: 1.4, speed: 1.1 },
    { position: [60, 32, -10], scale: 1.5, speed: 1.4 },
    { position: [-65, 31, 15], scale: 1.6, speed: 1.3 },
    { position: [-25, 27, 20], scale: 1.2, speed: 1.0 },
    { position: [15, 35, 25], scale: 1.7, speed: 1.4 },
    { position: [55, 29, 30], scale: 1.3, speed: 1.2 },
    { position: [-45, 32, 55], scale: 1.5, speed: 1.3 },
    { position: [5, 26, 65], scale: 1.4, speed: 1.1 },
    { position: [50, 33, 60], scale: 1.6, speed: 1.5 },
    { position: [-30, 30, 95], scale: 1.5, speed: 1.2 },
    { position: [25, 34, 105], scale: 1.7, speed: 1.4 },
    { position: [0, 36, 125], scale: 1.9, speed: 1.3 },
  ], []);

  // Create smooth vertical gradient canvas texture for the breathtaking Golden Hour sky dome
  const skyTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 512);
      // Top/Zenith: Deep cornflower blue
      gradient.addColorStop(0.0, '#1e40af');
      // Upper-sky: Clear twilight blue
      gradient.addColorStop(0.25, '#3b82f6');
      // Mid-sky: Soft pastel peach-pink transition
      gradient.addColorStop(0.55, '#f472b6');
      // Lower-sky: Warm honey amber
      gradient.addColorStop(0.78, '#fb923c');
      // Near horizon: Golden peach glow
      gradient.addColorStop(0.92, '#fde047');
      // Horizon base: Luminous soft sunset gold
      gradient.addColorStop(1.0, '#fef3c7');
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
      {/* 1. Large Vibrant Blue Sky Dome (Inverted Hemisphere with 320m radius) */}
      <mesh position={[0, -10, 0]}>
        <sphereGeometry args={[320, 48, 28, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial map={skyTexture} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* 2. Stylized Low-Poly Clay Sun Orb on Horizon */}
      <group position={[100, 65, -90]}>
        <mesh>
          <sphereGeometry args={[7.5, 16, 16]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        {/* Soft glowing warm sun aura halo */}
        <mesh scale={1.35}>
          <sphereGeometry args={[7.5, 16, 16]} />
          <meshBasicMaterial color="#fde047" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* 3. Floating Drifting Puffy 3D Clay Clouds */}
      {clouds.map((cloud, idx) => (
        <PuffyClayCloud key={`cloud-${idx}`} data={cloud} />
      ))}
    </group>
  );
};
