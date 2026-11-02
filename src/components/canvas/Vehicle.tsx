import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, RapierRigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../audio/soundManager';

interface VehicleProps {
  onPositionUpdate?: (pos: THREE.Vector3) => void;
}

export const Vehicle: React.FC<VehicleProps> = ({ onPositionUpdate }) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const chassisRef = useRef<THREE.Group>(null);

  // Wheel refs for visual steering and spin
  const frontLeftWheelRef = useRef<THREE.Group>(null);
  const frontRightWheelRef = useRef<THREE.Group>(null);
  const rearLeftWheelRef = useRef<THREE.Group>(null);
  const rearRightWheelRef = useRef<THREE.Group>(null);

  const {
    touchControls,
    resetVehicleTrigger,
    teleportTarget,
    clearTeleport,
    fpvProject,
    exitFpv
  } = useGame();

  // Keyboard input state
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false
  });

  useEffect(() => {
    // Focus window so keyboard events are captured immediately
    window.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'Escape' && fpvProject) {
        exitFpv();
        return;
      }

      const code = e.code;
      const key = e.key.toLowerCase();

      if (code === 'KeyW' || code === 'ArrowUp' || key === 'w' || key === 'arrowup') {
        keys.current.forward = true;
      }
      if (code === 'KeyS' || code === 'ArrowDown' || key === 's' || key === 'arrowdown') {
        keys.current.backward = true;
      }
      if (code === 'KeyA' || code === 'ArrowLeft' || key === 'a' || key === 'arrowleft') {
        keys.current.left = true;
      }
      if (code === 'KeyD' || code === 'ArrowRight' || key === 'd' || key === 'arrowright') {
        keys.current.right = true;
      }
      if (code === 'Space' || key === ' ') {
        keys.current.brake = true;
      }
      if (code === 'KeyR' || key === 'r') {
        resetVehicle();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fpvProject) {
        exitFpv();
        return;
      }

      const code = e.code;
      const key = e.key.toLowerCase();

      if (code === 'KeyW' || code === 'ArrowUp' || key === 'w' || key === 'arrowup') {
        keys.current.forward = false;
      }
      if (code === 'KeyS' || code === 'ArrowDown' || key === 's' || key === 'arrowdown') {
        keys.current.backward = false;
      }
      if (code === 'KeyA' || code === 'ArrowLeft' || key === 'a' || key === 'arrowleft') {
        keys.current.left = false;
      }
      if (code === 'KeyD' || code === 'ArrowRight' || key === 'd' || key === 'arrowright') {
        keys.current.right = false;
      }
      if (code === 'Space' || key === ' ') {
        keys.current.brake = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const resetVehicle = (customPosition?: [number, number, number]) => {
    if (!rigidBodyRef.current) return;
    const pos = customPosition || [0, 1.0, 6];
    rigidBodyRef.current.setTranslation({ x: pos[0], y: pos[1], z: pos[2] }, true);
    rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    currentForwardSpeed.current = 0;
    soundManager.playChime();
  };

  useEffect(() => {
    if (resetVehicleTrigger > 0) {
      resetVehicle();
    }
  }, [resetVehicleTrigger]);

  useEffect(() => {
    if (teleportTarget) {
      resetVehicle([teleportTarget[0], 1.2, teleportTarget[2]]);
      clearTeleport();
    }
  }, [teleportTarget]);

  // Driving velocity tracking
  const currentForwardSpeed = useRef(0);
  const currentSteer = useRef(0);

  useFrame((_, delta) => {
    if (!rigidBodyRef.current) return;

    // Freeze driving physics while exploring FPV screen inside the food truck/diner/cinema
    if (fpvProject) {
      const linvel = rigidBodyRef.current.linvel();
      rigidBodyRef.current.setLinvel({ x: 0, y: linvel.y, z: 0 }, true);
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      soundManager.updateEngine(0);
      return;
    }

    // Merge keyboard + touch controls
    const inputForward =
      (keys.current.forward ? 1 : 0) - (keys.current.backward ? 1 : 0) + touchControls.forward;
    const inputTurn =
      (keys.current.left ? 1 : 0) - (keys.current.right ? 1 : 0) + touchControls.turn;
    const isBraking = keys.current.brake || touchControls.brake;

    const rotation = rigidBodyRef.current.rotation();
    const threeQuat = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

    // Check if flipped (up vector pointing downward)
    const upVector = new THREE.Vector3(0, 1, 0).applyQuaternion(threeQuat);
    if (upVector.y < 0.25) {
      // Auto righting torque
      rigidBodyRef.current.applyTorqueImpulse({ x: 0, y: 0, z: 1.5 }, true);
    }

    // Forward direction in world space (-Z is front of car)
    const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(threeQuat);

    // Current physics linear velocity
    const linvel = rigidBodyRef.current.linvel();

    // Smooth arcade acceleration / braking model
    const maxForwardSpeed = 18;
    const maxReverseSpeed = -9;
    const acceleration = 32;
    const deceleration = 24;

    if (inputForward > 0.05 && !isBraking) {
      currentForwardSpeed.current = Math.min(
        currentForwardSpeed.current + acceleration * delta,
        maxForwardSpeed
      );
    } else if (inputForward < -0.05 && !isBraking) {
      currentForwardSpeed.current = Math.max(
        currentForwardSpeed.current - deceleration * delta,
        maxReverseSpeed
      );
    } else {
      // Natural rolling friction / coasting
      currentForwardSpeed.current = THREE.MathUtils.lerp(
        currentForwardSpeed.current,
        0,
        delta * 3.5
      );
    }

    if (isBraking) {
      currentForwardSpeed.current = THREE.MathUtils.lerp(
        currentForwardSpeed.current,
        0,
        delta * 9.0
      );
    }

    // Steering model: turns when moving, with slight turning ability when stationary
    let targetAngvel = 0;
    if (Math.abs(inputTurn) > 0.05) {
      const speedMagnitude = Math.abs(currentForwardSpeed.current);
      const speedFactor = Math.min(Math.max(speedMagnitude / 3, 0.4), 1.2);
      const direction = currentForwardSpeed.current < -0.2 ? -inputTurn : inputTurn;
      targetAngvel = direction * 4.4 * speedFactor;
    }

    // Apply linear velocity: X and Z are driven, Y preserves gravity and jump physics!
    const targetVelX = forwardVector.x * currentForwardSpeed.current;
    const targetVelZ = forwardVector.z * currentForwardSpeed.current;

    rigidBodyRef.current.setLinvel(
      {
        x: targetVelX,
        y: linvel.y, // Keep gravity and ramp jumps intact!
        z: targetVelZ
      },
      true
    );

    // Apply angular velocity for clean steering
    rigidBodyRef.current.setAngvel(
      {
        x: 0,
        y: targetAngvel,
        z: 0
      },
      true
    );

    // Update sound
    const speedRatio = Math.min(Math.abs(currentForwardSpeed.current) / maxForwardSpeed, 1);
    soundManager.updateEngine(speedRatio);

    // Visual Wheel Animations
    const targetSteerAngle = inputTurn * 0.45;
    currentSteer.current = THREE.MathUtils.lerp(currentSteer.current, targetSteerAngle, delta * 12);

    if (frontLeftWheelRef.current && frontRightWheelRef.current) {
      frontLeftWheelRef.current.rotation.y = currentSteer.current;
      frontRightWheelRef.current.rotation.y = currentSteer.current;
    }

    const spinAngleDelta = (currentForwardSpeed.current * delta) / 0.35;
    [frontLeftWheelRef, frontRightWheelRef, rearLeftWheelRef, rearRightWheelRef].forEach(ref => {
      if (ref.current) {
        ref.current.rotation.x -= spinAngleDelta;
      }
    });

    // Notify position to parent / camera
    const translation = rigidBodyRef.current.translation();
    if (onPositionUpdate) {
      onPositionUpdate(new THREE.Vector3(translation.x, translation.y, translation.z));
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      canSleep={false}
      mass={12}
      friction={0.1}
      restitution={0.2}
      linearDamping={0.3}
      angularDamping={1.5}
      position={[0, 1.0, 6]}
      onCollisionEnter={(payload) => {
        const totalVel = payload.target.rigidBody?.linvel();
        if (totalVel) {
          const speed = Math.sqrt(totalVel.x ** 2 + totalVel.y ** 2 + totalVel.z ** 2);
          if (speed > 2.0) {
            soundManager.playImpact(speed / 6);
          }
        }
      }}
    >
      {/* Explicit Cuboid Collider - perfectly fitting the car body without ground dragging */}
      <CuboidCollider args={[0.65, 0.22, 1.15]} position={[0, 0.35, 0]} friction={0.1} restitution={0.2} />

      {/* Visual Car Model - Bruno Simon Style Warm Pastel Toy Car */}
      <group ref={chassisRef}>
        {/* Main Body */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.45, 2.4]} />
          <meshStandardMaterial color="#f97316" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Cabin / Roof */}
        <mesh position={[0, 0.72, -0.1]} castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.4, 1.3]} />
          <meshStandardMaterial color="#ea580c" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Windshield (Dark Glass) */}
        <mesh position={[0, 0.72, -0.76]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.95, 0.32, 0.05]} />
          <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
        </mesh>

        {/* Side Windows */}
        <mesh position={[0.53, 0.72, -0.1]}>
          <boxGeometry args={[0.02, 0.28, 1.1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
        </mesh>
        <mesh position={[-0.53, 0.72, -0.1]}>
          <boxGeometry args={[0.02, 0.28, 1.1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
        </mesh>

        {/* Front Grill / Bumper */}
        <mesh position={[0, 0.26, -1.22]}>
          <boxGeometry args={[1.1, 0.2, 0.08]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>

        {/* Headlights */}
        <mesh position={[-0.42, 0.38, -1.21]}>
          <boxGeometry args={[0.22, 0.14, 0.06]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.42, 0.38, -1.21]}>
          <boxGeometry args={[0.22, 0.14, 0.06]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.8} />
        </mesh>

        {/* Headlight Cones (Visual Only) */}
        <mesh position={[-0.42, 0.25, -2.6]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.6, 2.8, 16]} />
          <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
        </mesh>
        <mesh position={[0.42, 0.25, -2.6]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.6, 2.8, 16]} />
          <meshBasicMaterial color="#fef08a" transparent opacity={0.12} depthWrite={false} />
        </mesh>

        {/* Taillights */}
        <mesh position={[-0.45, 0.42, 1.21]}>
          <boxGeometry args={[0.22, 0.12, 0.05]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.45, 0.42, 1.21]}>
          <boxGeometry args={[0.22, 0.12, 0.05]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.6} />
        </mesh>

        {/* 4 Wheels */}
        {/* Front Left */}
        <group position={[-0.72, 0.15, -0.75]} ref={frontLeftWheelRef}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 18]} />
            <meshStandardMaterial color="#1f2937" roughness={0.9} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.02, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.23, 12]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.4} />
          </mesh>
        </group>

        {/* Front Right */}
        <group position={[0.72, 0.15, -0.75]} ref={frontRightWheelRef}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 18]} />
            <meshStandardMaterial color="#1f2937" roughness={0.9} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.02, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.23, 12]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.4} />
          </mesh>
        </group>

        {/* Rear Left */}
        <group position={[-0.72, 0.15, 0.75]} ref={rearLeftWheelRef}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 18]} />
            <meshStandardMaterial color="#1f2937" roughness={0.9} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.02, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.23, 12]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.4} />
          </mesh>
        </group>

        {/* Rear Right */}
        <group position={[0.72, 0.15, 0.75]} ref={rearRightWheelRef}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 18]} />
            <meshStandardMaterial color="#1f2937" roughness={0.9} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.02, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.23, 12]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.4} />
          </mesh>
        </group>
      </group>
    </RigidBody>
  );
};
