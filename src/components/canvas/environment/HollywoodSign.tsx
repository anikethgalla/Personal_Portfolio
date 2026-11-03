import React from 'react';
import { Text } from '@react-three/drei';

interface HollywoodSignProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

/**
 * HollywoodSign: An iconic hillside landmark sign perched on the mountain ridge.
 * Features crisp white block typography, structural scaffolding trusses,
 * diagonal rear hillside anchors, concrete foundation pads, maintenance catwalk,
 * and upward-angled spotlights.
 */
export const HollywoodSign: React.FC<HollywoodSignProps> = ({
  position = [21, 9.4, -60],
  rotation = [0.06, -0.34, 0],
  scale = 1
}) => {
  // 11 structural vertical truss posts across 21.5 meters width
  const postXPositions = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10];
  const floodlightXPositions = [-8, -4, 0, 4, 8];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* ======================================================== */}
      {/* 1. STRUCTURAL SCAFFOLDING & TIMBER/STEEL FRAMEWORK       */}
      {/* ======================================================== */}

      {/* Concrete Foundation Footing Blocks */}
      {postXPositions.map((x, i) => (
        <mesh key={`footing-${i}`} position={[x, -2.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.65, 0.5, 0.65]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} />
        </mesh>
      ))}

      {/* Heavy Vertical Support Truss Columns */}
      {postXPositions.map((x, i) => (
        <mesh key={`post-${i}`} position={[x, 0, 0]} castShadow>
          <boxGeometry args={[0.14, 5.2, 0.14]} />
          <meshStandardMaterial color="#475569" roughness={0.6} metalness={0.5} />
        </mesh>
      ))}

      {/* Horizontal Mounting I-Beams (Top, Mid, Bottom Rails) */}
      {[-2.2, -0.4, 1.4, 2.5].map((y, i) => (
        <mesh key={`rail-${i}`} position={[0, y, -0.08]} castShadow>
          <boxGeometry args={[21.8, 0.12, 0.12]} />
          <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}

      {/* Diagonal X-Braces between Adjacent Columns */}
      {postXPositions.slice(0, -1).map((x, i) => {
        const nextX = postXPositions[i + 1];
        const midX = (x + nextX) / 2;
        return (
          <group key={`x-brace-${i}`} position={[midX, 0.5, -0.1]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.06, 3.2, 0.06]} />
              <meshStandardMaterial color="#64748b" roughness={0.7} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.06, 3.2, 0.06]} />
              <meshStandardMaterial color="#64748b" roughness={0.7} />
            </mesh>
          </group>
        );
      })}

      {/* Rear Diagonal Kickers / Mountain Hillside Anchors */}
      {/* Angling backward into the slope for authentic billboard structural realism */}
      {postXPositions.map((x, i) => (
        <group key={`kicker-${i}`} position={[x, 1.8, -1.8]}>
          <mesh rotation={[-Math.PI / 3.8, 0, 0]} castShadow>
            <boxGeometry args={[0.1, 0.1, 4.4]} />
            <meshStandardMaterial color="#475569" roughness={0.6} metalness={0.4} />
          </mesh>
          {/* Hillside Anchor Anchor Pad */}
          <mesh position={[0, -1.7, -1.8]}>
            <boxGeometry args={[0.5, 0.35, 0.5]} />
            <meshStandardMaterial color="#64748b" roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* Maintenance Catwalk Decking & Safety Railing along Bottom */}
      <group position={[0, -2.15, 0.4]}>
        {/* Catwalk Floor Planks */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[21.4, 0.1, 0.85]} />
          <meshStandardMaterial color="#78716c" roughness={0.8} />
        </mesh>
        {/* Safety Handrail Stanchions */}
        {postXPositions.map((x, i) => (
          <mesh key={`stanchion-${i}`} position={[x, 0.45, 0.38]}>
            <cylinderGeometry args={[0.03, 0.03, 0.9, 6]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.7} />
          </mesh>
        ))}
        {/* Top Safety Handrail Pipe */}
        <mesh position={[0, 0.9, 0.38]}>
          <boxGeometry args={[21.4, 0.05, 0.05]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. ICONIC HOLLYWOOD WHITE BLOCK TYPOGRAPHY               */}
      {/* ======================================================== */}

      {/* Primary Landmark Text: ANIKETH GALLA */}
      <Text
        position={[0, 0.85, 0.15]}
        fontSize={2.65}
        fontWeight={900}
        color="#ffffff"
        outlineWidth={0.07}
        outlineColor="#090d16"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.14}
        castShadow
      >
        ANIKETH GALLA
      </Text>

      {/* Subtitle Landmark Text: FULL STACK DEVELOPER */}
      <Text
        position={[0, -1.2, 0.15]}
        fontSize={1.22}
        fontWeight={800}
        color="#f8fafc"
        outlineWidth={0.045}
        outlineColor="#090d16"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
        castShadow
      >
        FULL STACK DEVELOPER
      </Text>

      {/* ======================================================== */}
      {/* 3. UPWARD GROUND FLOODLIGHTS / SPOTLIGHTS                */}
      {/* ======================================================== */}
      {floodlightXPositions.map((x, i) => (
        <group key={`floodlight-${i}`} position={[x, -2.1, 0.75]}>
          {/* Mounting Bracket */}
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.1, 0.24, 0.1]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          {/* Fixture Canister (Angled +42 degrees upward toward letters) */}
          <group position={[0, 0.28, 0]} rotation={[Math.PI / 4.2, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.13, 0.19, 0.32, 8]} />
              <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
            </mesh>
            {/* Luminous Glowing Lens */}
            <mesh position={[0, 0.165, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.02, 8]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#fef08a"
                emissiveIntensity={1.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        </group>
      ))}

      {/* Dynamic Warm Hollywood Floodlights Illumination */}
      <pointLight position={[0, 0.5, 2.5]} color="#fffbeb" intensity={3.0} distance={26} decay={2} />
      <pointLight position={[-7, 0.5, 2.2]} color="#fffbeb" intensity={2.2} distance={20} decay={2} />
      <pointLight position={[7, 0.5, 2.2]} color="#fffbeb" intensity={2.2} distance={20} decay={2} />
    </group>
  );
};

