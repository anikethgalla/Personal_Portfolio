import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';

interface CameraFollowProps {
  targetPosition: THREE.Vector3 | null;
}

export const CameraFollow: React.FC<CameraFollowProps> = ({ targetPosition }) => {
  const { camera } = useThree();
  const { fpvProject } = useGame();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    // 1. FPV Camera Mode (Inside Food Truck, Drive-In, or Diner)
    if (fpvProject) {
      let desiredFpvPos = new THREE.Vector3(14.6, 1.62, -2.0);
      let desiredFpvLookAt = new THREE.Vector3(17.4, 1.62, -2.0);

      if (fpvProject.id === 'robosurge') {
        // Food Truck FPV: Right in front of the serving counter looking inside at the terminal monitor
        desiredFpvPos.set(25.8, 1.62, 0.0);
        desiredFpvLookAt.set(29.12, 1.62, 0.0);
      } else if (fpvProject.id === 'trueforge') {
        // Drive-In Cinema FPV: Driver's seat looking up at the giant projection screen
        desiredFpvPos.set(19.0, 1.8, -16.0);
        desiredFpvLookAt.set(27.58, 3.2, -16.0);
      } else if (fpvProject.id === 'distributed-backend') {
        // Diner FPV: Peering into the diner drive-through counter monitor
        desiredFpvPos.set(22.2, 1.65, 16.0);
        desiredFpvLookAt.set(25.55, 1.65, 16.0);
      }

      // Smooth cinematic camera glide
      camera.position.lerp(desiredFpvPos, delta * 4.8);
      currentLookAt.current.lerp(desiredFpvLookAt, delta * 6.0);
      camera.lookAt(currentLookAt.current);
      return;
    }

    // 2. Standard Vehicle Follow Mode (Expanded City Bird's-Eye View)
    if (!targetPosition) return;

    const cameraOffset = new THREE.Vector3(0, 16.5, 20.5);
    const desiredPos = targetPosition.clone().add(cameraOffset);

    camera.position.lerp(desiredPos, delta * 3.5);

    const desiredLookAt = targetPosition.clone().add(new THREE.Vector3(0, 1.2, 0));
    currentLookAt.current.lerp(desiredLookAt, delta * 5.0);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
