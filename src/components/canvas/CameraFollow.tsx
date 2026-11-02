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
  const { fpvProject } = useGame();
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
    // 1. FPV Camera Mode (Inside Food Truck, Drive-In, or Diner)
    // ========================================================
    if (fpvProject) {
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }

      let desiredFpvPos = new THREE.Vector3(14.6, 1.62, -2.0);
      let desiredFpvLookAt = new THREE.Vector3(17.4, 1.62, -2.0);

      if (fpvProject.id === 'robosurge') {
        // Food Truck FPV: Facing counter terminal monitor
        desiredFpvPos.set(25.8, 1.62, 0.0);
        desiredFpvLookAt.set(29.12, 1.62, 0.0);
      } else if (fpvProject.id === 'trueforge') {
        // Drive-In Cinema FPV: Driver seat looking up at billboard
        desiredFpvPos.set(19.0, 1.8, -16.0);
        desiredFpvLookAt.set(27.58, 3.2, -16.0);
      } else if (fpvProject.id === 'distributed-backend') {
        // Diner FPV: Peering into diner counter
        desiredFpvPos.set(22.2, 1.65, 16.0);
        desiredFpvLookAt.set(25.55, 1.65, 16.0);
      }

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