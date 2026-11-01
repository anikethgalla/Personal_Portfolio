import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraFollowProps {
  targetPosition: THREE.Vector3 | null;
}

export const CameraFollow: React.FC<CameraFollowProps> = ({ targetPosition }) => {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    if (!targetPosition) return;

    // Camera target: isometric perspective elevated behind and above
    const cameraOffset = new THREE.Vector3(0, 11.5, 14.5);
    const desiredPos = targetPosition.clone().add(cameraOffset);

    // Smooth spring lerp for camera position
    camera.position.lerp(desiredPos, delta * 3.5);

    // Smooth lookAt target tracking the car center
    const desiredLookAt = targetPosition.clone().add(new THREE.Vector3(0, 1.2, 0));
    currentLookAt.current.lerp(desiredLookAt, delta * 5.0);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

