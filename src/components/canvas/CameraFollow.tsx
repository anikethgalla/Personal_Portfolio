import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';

interface CameraFollowProps {
  targetPosition: THREE.Vector3 | null;
}

export const CameraFollow: React.FC<CameraFollowProps> = ({ targetPosition }) => {
  const { camera } = useThree();
  const { fpvProject, fpvExperience } = useGame();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isDriving = useRef(false);

  // Detect when user is actively driving via keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        isDriving.current = true;
      }
    };
    const handleKeyUp = () => {
      // Small timeout to allow coasting before releasing camera
      setTimeout(() => {
        isDriving.current = false;
      }, 800);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    // ========================================================
    // 1. FPV Camera Mode (Drive-In Cinema Screen)
    // ========================================================
    if (fpvProject) {
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }

      // Drive-In Cinema FPV: Driver seat looking directly up at the billboard screen
      const desiredFpvPos = new THREE.Vector3(19.2, 2.0, -16.0);
      const desiredFpvLookAt = new THREE.Vector3(27.58, 3.2, -16.0);

      camera.position.lerp(desiredFpvPos, delta * 4.8);
      currentLookAt.current.lerp(desiredFpvLookAt, delta * 6.0);
      camera.lookAt(currentLookAt.current);
      return;
    }

    // ========================================================
    // 2. FPV Camera Mode (Experience & Societies Diner)
    // ========================================================
    if (fpvExperience) {
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }

      // Diner FPV: Driver seat looking directly at the Diner counter showcase
      const desiredFpvPos = new THREE.Vector3(20.2, 1.65, 16.0);
      const desiredFpvLookAt = new THREE.Vector3(25.55, 1.62, 16.0);

      camera.position.lerp(desiredFpvPos, delta * 4.8);
      currentLookAt.current.lerp(desiredFpvLookAt, delta * 6.0);
      camera.lookAt(currentLookAt.current);
      return;
    }

    // ========================================================
    // 2. Interactive Orbit & Pan Camera Mode
    // ========================================================
    if (controlsRef.current) {
      controlsRef.current.enabled = true;

      // When the user drives the car, smoothly track the car's position
      if (targetPosition) {
        const targetLookAt = new THREE.Vector3(
          targetPosition.x,
          targetPosition.y + 1.2,
          targetPosition.z
        );

        if (isDriving.current) {
          // Actively driving: smoothly pull the orbit focal target with the car
          controlsRef.current.target.lerp(targetLookAt, delta * 4.5);
        } else {
          // Stationary/inspecting: gently maintain proximity if car moved
          const dist = controlsRef.current.target.distanceTo(targetLookAt);
          if (dist > 35) {
            controlsRef.current.target.lerp(targetLookAt, delta * 2.0);
          }
        }

        controlsRef.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.8}
      panSpeed={0.9}
      zoomSpeed={1.0}
      minDistance={6}
      maxDistance={75}
      minPolarAngle={Math.PI / 10}
      maxPolarAngle={Math.PI / 2.15}
    />
  );
};