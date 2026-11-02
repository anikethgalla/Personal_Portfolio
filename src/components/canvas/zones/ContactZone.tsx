import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { profileData } from '../../../data/profileData';
import { useGame } from '../../../context/GameContext';
import confetti from 'canvas-confetti';

interface ContactZoneProps {
  vehiclePosition: THREE.Vector3 | null;
}

export const ContactZone: React.FC<ContactZoneProps> = ({ vehiclePosition }) => {
  const { markZoneDiscovered, setIsRecruiterDrawerOpen } = useGame();
  const [copiedEmail, setCopiedEmail] = useState(false);

  useFrame(() => {
    if (!vehiclePosition) return;
    const stationCenter = new THREE.Vector3(13, 0, 26);
    if (vehiclePosition.distanceTo(stationCenter) < 14) {
      markZoneDiscovered('contact');
    }
  });

  const handleEmailClick = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    try {
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }
    setTimeout(() => {
      window.location.href = `mailto:${profileData.email}`;
      setCopiedEmail(false);
    }, 400);
  };

  return (
    <group>
      {/* ======================================================== */}
      {/* 1. PETROL BUNK (GAS STATION) — ON LEFT SIDE OF ROAD (x=13)*/}
      {/* Facing West (-X) towards South Avenue roadway            */}
      {/* ======================================================== */}
      <group position={[13, 0, 26]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Overhead Canopy Roof */}
        <group position={[0, 4.4, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[13.5, 0.45, 8.5]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>

          {/* Terracotta Decorative Trim around Canopy */}
          <mesh position={[0, 0, -4.26]} castShadow>
            <boxGeometry args={[13.6, 0.55, 0.1]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 4.26]} castShadow>
            <boxGeometry args={[13.6, 0.55, 0.1]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
          <mesh position={[-6.76, 0, 0]} castShadow>
            <boxGeometry args={[0.1, 0.55, 8.5]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
          <mesh position={[6.76, 0, 0]} castShadow>
            <boxGeometry args={[0.1, 0.55, 8.5]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>

          {/* 3D Elevated Retro Gas Station Sign Facing the Road */}
          <group position={[0, 0.95, -4.25]}>
            <mesh castShadow>
              <boxGeometry args={[8.8, 1.2, 0.2]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
            </mesh>
            <Text
              position={[0, 0.18, -0.12]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.48}
              fontWeight={900}
              color="#ea580c"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.08}
            >
              CONTACT & REFUEL
            </Text>
            <Text
              position={[0, -0.25, -0.12]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.18}
              fontWeight={700}
              color="#38bdf8"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.1}
            >
              PULL UP TO PUMPS // GITHUB • EMAIL • RESUME
            </Text>
          </group>
        </group>

        {/* 4 Canopy Support Pillars */}
        {[-5.4, 5.4].map((px) =>
          [-3.2, 3.2].map((pz) => (
            <mesh key={`col-${px}-${pz}`} position={[px, 2.1, pz]} castShadow receiveShadow>
              <cylinderGeometry args={[0.16, 0.18, 4.2, 12]} />
              <meshStandardMaterial color="#475569" roughness={0.5} metalness={0.4} />
            </mesh>
          ))
        )}

        {/* Concrete Fuel Pump Island */}
        <mesh position={[0, 0.12, 0]} receiveShadow>
          <boxGeometry args={[9.6, 0.24, 2.6]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
        </mesh>
        <mesh position={[-4.82, 0.12, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.25, 16, 1, false, Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color="#eab308" roughness={0.6} />
        </mesh>
        <mesh position={[4.82, 0.12, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.25, 16, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color="#eab308" roughness={0.6} />
        </mesh>

        {/* PUMP 1: GITHUB FUEL PUMP (Left) */}
        <group
          position={[-2.8, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            window.open(profileData.github, '_blank');
          }}
        >
          <RigidBody type="fixed" friction={0.6} position={[0, 1.25, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.2, 2.0, 0.85]} />
              <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[0, 1.25, 0]}>
              <sphereGeometry args={[0.26, 16, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#f8fafc" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[0, 0.45, -0.44]}>
              <planeGeometry args={[0.9, 0.55]} />
              <meshStandardMaterial color="#020617" roughness={0.2} emissive="#0284c7" emissiveIntensity={0.15} />
            </mesh>
            <Text
              position={[0, 0.55, -0.46]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.14}
              fontWeight={900}
              color="#38bdf8"
              anchorX="center"
              anchorY="middle"
            >
              GITHUB OCTANE
            </Text>
            <Text
              position={[0, 0.35, -0.46]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.1}
              fontWeight={700}
              color="#a5f3fc"
              anchorX="center"
              anchorY="middle"
            >
              CODE REPOSITORIES
            </Text>
            <mesh position={[0, -0.15, -0.44]}>
              <boxGeometry args={[0.85, 0.32, 0.04]} />
              <meshStandardMaterial color="#ea580c" roughness={0.3} />
            </mesh>
            <Text
              position={[0, -0.15, -0.47]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.11}
              fontWeight={800}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              TAP TO PUMP CODE
            </Text>
            <mesh position={[-0.65, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 1.3, 8]} />
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
            <mesh position={[-0.65, -0.5, 0]} castShadow>
              <boxGeometry args={[0.08, 0.25, 0.15]} />
              <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.8} />
            </mesh>
          </RigidBody>
        </group>

        {/* PUMP 2: EMAIL PREMIUM PUMP (Center) */}
        <group
          position={[0, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            handleEmailClick();
          }}
        >
          <RigidBody type="fixed" friction={0.6} position={[0, 1.25, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.2, 2.0, 0.85]} />
              <meshStandardMaterial color="#c2410c" roughness={0.3} metalness={0.3} />
            </mesh>
            <mesh position={[0, 1.25, 0]}>
              <sphereGeometry args={[0.26, 16, 16]} />
              <meshStandardMaterial color="#ea580c" emissive="#ea580c" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[0, 0.45, -0.44]}>
              <planeGeometry args={[0.9, 0.55]} />
              <meshStandardMaterial color="#020617" roughness={0.2} emissive="#ea580c" emissiveIntensity={0.2} />
            </mesh>
            <Text
              position={[0, 0.55, -0.46]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.14}
              fontWeight={900}
              color="#fb923c"
              anchorX="center"
              anchorY="middle"
            >
              EMAIL PREMIUM
            </Text>
            <Text
              position={[0, 0.35, -0.46]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.1}
              fontWeight={700}
              color="#fed7aa"
              anchorX="center"
              anchorY="middle"
            >
              DIRECT PIPELINE
            </Text>
            <mesh position={[0, -0.15, -0.44]}>
              <boxGeometry args={[0.85, 0.32, 0.04]} />
              <meshStandardMaterial color="#1e293b" roughness={0.3} />
            </mesh>
            <Text
              position={[0, -0.15, -0.47]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.11}
              fontWeight={800}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {copiedEmail ? 'COPIED TO CLIPBOARD!' : 'TAP TO DISPATCH'}
            </Text>
            <mesh position={[-0.65, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 1.3, 8]} />
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
            <mesh position={[-0.65, -0.5, 0]} castShadow>
              <boxGeometry args={[0.08, 0.25, 0.15]} />
              <meshStandardMaterial color="#ea580c" roughness={0.4} />
            </mesh>
          </RigidBody>
        </group>

        {/* PUMP 3: RESUME SUPER PUMP (Right) */}
        <group
          position={[2.8, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setIsRecruiterDrawerOpen(true);
          }}
        >
          <RigidBody type="fixed" friction={0.6} position={[0, 1.25, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.2, 2.0, 0.85]} />
              <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.4} />
            </mesh>
            <mesh position={[0, 1.25, 0]}>
              <sphereGeometry args={[0.26, 16, 16]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[0, 0.45, -0.44]}>
              <planeGeometry args={[0.9, 0.55]} />
              <meshStandardMaterial color="#020617" roughness={0.2} emissive="#0284c7" emissiveIntensity={0.2} />
            </mesh>
            <Text
              position={[0, 0.55, -0.46]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.14}
              fontWeight={900}
              color="#38bdf8"
              anchorX="center"
              anchorY="middle"
            >
              RESUME SUPER
            </Text>
            <Text
              position={[0, 0.35, -0.46]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.1}
              fontWeight={700}
              color="#bae6fd"
              anchorX="center"
              anchorY="middle"
            >
              RECRUITER DOSSIER
            </Text>
            <mesh position={[0, -0.15, -0.44]}>
              <boxGeometry args={[0.85, 0.32, 0.04]} />
              <meshStandardMaterial color="#ea580c" roughness={0.3} />
            </mesh>
            <Text
              position={[0, -0.15, -0.47]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.11}
              fontWeight={800}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              TAP FOR DOSSIER
            </Text>
            <mesh position={[0.65, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 1.3, 8]} />
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
            <mesh position={[0.65, -0.5, 0]} castShadow>
              <boxGeometry args={[0.08, 0.25, 0.15]} />
              <meshStandardMaterial color="#38bdf8" roughness={0.4} />
            </mesh>
          </RigidBody>
        </group>

        {/* 24/7 Roadside Convenience Mart Behind Pumps */}
        <group position={[0, 0, 6.2]}>
          <RigidBody type="fixed" friction={0.8}>
            <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
              <boxGeometry args={[11.5, 3.6, 4.2]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.6} />
            </mesh>
            <mesh position={[0, 3.65, 0]} castShadow>
              <boxGeometry args={[11.8, 0.3, 4.4]} />
              <meshStandardMaterial color="#ea580c" roughness={0.5} />
            </mesh>
            {[-3.2, 3.2].map((wx) => (
              <mesh key={`mart-win-${wx}`} position={[wx, 1.5, -2.12]}>
                <boxGeometry args={[3.2, 1.8, 0.05]} />
                <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
              </mesh>
            ))}
            <mesh position={[0, 1.25, -2.12]}>
              <boxGeometry args={[1.8, 2.3, 0.05]} />
              <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
            </mesh>
            <group position={[0, 3.0, -2.15]}>
              <mesh castShadow>
                <boxGeometry args={[5.8, 0.65, 0.1]} />
                <meshStandardMaterial color="#0f172a" roughness={0.4} />
              </mesh>
              <Text
                position={[0, 0, -0.06]}
                rotation={[0, Math.PI, 0]}
                fontSize={0.22}
                fontWeight={800}
                color="#facc15"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.06}
              >
                24/7 MART & SERVICES
              </Text>
            </group>
            <mesh position={[-4.8, 0.5, -2.6]} castShadow>
              <boxGeometry args={[1.2, 0.9, 0.8]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
            </mesh>
            <mesh position={[4.8, 0.9, -2.6]} castShadow>
              <boxGeometry args={[0.9, 1.8, 0.7]} />
              <meshStandardMaterial color="#dc2626" roughness={0.4} />
            </mesh>
          </RigidBody>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 2. SOUTHERN CORPORATE & APARTMENT SKYLINE (Background)   */}
      {/* Imposing multi-story offices & high-rises (z = 44 to 48) */}
      {/* ======================================================== */}

      {/* TOWER 1: Tech Tower / Systems HQ (5-story office tower) at center [0, 0, 46] */}
      <group position={[0, 0, 46]}>
        <RigidBody type="fixed" friction={0.8}>
          <mesh position={[0, 7.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[9.5, 15, 8.5]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>
          {/* Glass curtain wall window grid on front facade (-Z side) */}
          {[-3.0, -1.0, 1.0, 3.0].map((wx, wi) =>
            [2.5, 5.5, 8.5, 11.5, 14.0].map((wy, wyi) => (
              <mesh key={`hq-win-${wi}-${wyi}`} position={[wx, wy, -4.28]}>
                <boxGeometry args={[1.4, 1.8, 0.06]} />
                <meshStandardMaterial color="#0284c7" roughness={0.15} metalness={0.8} />
              </mesh>
            ))
          )}
          {/* Entrance Atrium */}
          <mesh position={[0, 1.4, -4.3]} castShadow>
            <boxGeometry args={[3.2, 2.6, 0.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} />
          </mesh>
          {/* 3D Roof Sign: SYSTEMS HQ */}
          <group position={[0, 15.6, -4.2]}>
            <mesh castShadow>
              <boxGeometry args={[6.8, 0.9, 0.2]} />
              <meshStandardMaterial color="#0f172a" roughness={0.4} />
            </mesh>
            <Text
              position={[0, 0, -0.12]}
              fontSize={0.34}
              fontWeight={900}
              color="#38bdf8"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.08}
            >
              SYSTEMS HQ
            </Text>
          </group>
          {/* Rooftop Communications Spire Antenna */}
          <mesh position={[0, 18.0, 0]}>
            <cylinderGeometry args={[0.08, 0.16, 6.0, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
          </mesh>
          <mesh position={[0, 21.1, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </RigidBody>
      </group>

      {/* TOWER 2: Modern Corporate Center (4-story) at [-12, 0, 44] */}
      <group position={[-12, 0, 44]}>
        <RigidBody type="fixed" friction={0.8}>
          <mesh position={[0, 6.0, 0]} castShadow receiveShadow>
            <boxGeometry args={[8.8, 12, 7.5]} />
            <meshStandardMaterial color="#475569" roughness={0.65} />
          </mesh>
          {/* Tinted glass ribbon windows */}
          {[2.5, 5.5, 8.5, 11.0].map((wy, wyi) => (
            <mesh key={`corp-ribbon-${wyi}`} position={[0, wy, -3.78]}>
              <boxGeometry args={[7.6, 1.4, 0.06]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.85} />
            </mesh>
          ))}
          {/* Terracotta Decorative Parapet */}
          <mesh position={[0, 12.2, 0]} castShadow>
            <boxGeometry args={[9.2, 0.4, 7.9]} />
            <meshStandardMaterial color="#ea580c" roughness={0.5} />
          </mesh>
        </RigidBody>
      </group>

      {/* TOWER 3: Executive Tower & Helipad at [13, 0, 45] */}
      <group position={[13, 0, 45]}>
        <RigidBody type="fixed" friction={0.8}>
          <mesh position={[0, 6.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[9.0, 13, 8.0]} />
            <meshStandardMaterial color="#52525b" roughness={0.6} />
          </mesh>
          {[-2.5, 2.5].map((wx, wi) =>
            [2.5, 5.5, 8.5, 11.5].map((wy, wyi) => (
              <mesh key={`exec-win-${wi}-${wyi}`} position={[wx, wy, -4.03]}>
                <boxGeometry args={[2.2, 1.6, 0.06]} />
                <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.8} />
              </mesh>
            ))
          )}
          {/* Rooftop Helipad Pad */}
          <mesh position={[0, 13.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[3.2, 24]} />
            <meshStandardMaterial color="#27272a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 13.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.8, 3.0, 24]} />
            <meshBasicMaterial color="#facc15" />
          </mesh>
          <Text
            position={[0, 13.13, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={1.4}
            fontWeight={900}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            H
          </Text>
        </RigidBody>
      </group>

      {/* BUILDING 4: South City Apartments (West) at [-23, 0, 42] */}
      <group position={[-23, 0, 42]}>
        <RigidBody type="fixed" friction={0.8}>
          <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[8.0, 9.0, 6.5]} />
            <meshStandardMaterial color="#c2410c" roughness={0.6} />
          </mesh>
          <mesh position={[0, 9.2, 0]} castShadow>
            <boxGeometry args={[8.4, 0.35, 6.9]} />
            <meshStandardMaterial color="#7c2d12" roughness={0.5} />
          </mesh>
          {/* Balconies */}
          {[-2.0, 2.0].map((bx, bi) =>
            [3.0, 6.0].map((by, byi) => (
              <mesh key={`apt-balc-${bi}-${byi}`} position={[bx, by, -3.4]} castShadow>
                <boxGeometry args={[2.4, 0.6, 0.6]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            ))
          )}
        </RigidBody>
      </group>

      {/* BUILDING 5: South City Apartments (East) at [25, 0, 42] */}
      <group position={[25, 0, 42]}>
        <RigidBody type="fixed" friction={0.8}>
          <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[8.0, 9.0, 6.5]} />
            <meshStandardMaterial color="#d97706" roughness={0.6} />
          </mesh>
          <mesh position={[0, 9.2, 0]} castShadow>
            <boxGeometry args={[8.4, 0.35, 6.9]} />
            <meshStandardMaterial color="#78350f" roughness={0.5} />
          </mesh>
          {/* Windows */}
          {[-2.0, 2.0].map((wx, wi) =>
            [2.5, 5.0, 7.5].map((wy, wyi) => (
              <mesh key={`east-apt-win-${wi}-${wyi}`} position={[wx, wy, -3.28]}>
                <boxGeometry args={[1.5, 1.2, 0.05]} />
                <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.7} />
              </mesh>
            ))
          )}
        </RigidBody>
      </group>

      {/* Street Trees & Lamps along Corporate Skyline Promenade */}
      {[-18, -6, 6, 18].map((tx) => (
        <group key={`skyline-tree-${tx}`} position={[tx, 0, 36.5]}>
          <mesh position={[0, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.26, 1.6, 8]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          <mesh position={[0, 2.3, 0]} castShadow>
            <sphereGeometry args={[1.2, 9, 8]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.6} />
          </mesh>
        </group>
      ))}
      {[-12, 0, 12].map((lx) => (
        <group key={`skyline-lamp-${lx}`} position={[lx, 0, 35.5]}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.08, 3.0, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 3.0, 0]}>
            <sphereGeometry args={[0.16, 10, 8]} />
            <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};