import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, RapierRigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../audio/soundManager';
import { VEHICLES_DATA } from '../../data/vehiclesData';
import { VehicleModelSwitch } from './vehicle/VehicleModels';

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
    exitFpv,
    selectedVehicleId,
    selectedVehicleColor
  } = useGame();

  const vehicleConfig = VEHICLES_DATA[selectedVehicleId] || VEHICLES_DATA.pickup;

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
    const pos = customPosition || [0, 1.0, 14];
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

    // Smooth arcade acceleration / braking model (Tuned per vehicle class)
    const maxForwardSpeed = vehicleConfig.physics.maxSpeed;
    const maxReverseSpeed = -vehicleConfig.physics.maxSpeed * 0.45;
    const acceleration = vehicleConfig.physics.acceleration;
    const deceleration = vehicleConfig.physics.acceleration * 0.72;

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
      targetAngvel = direction * 1.5 * vehicleConfig.physics.turnSpeed * speedFactor;
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

    // Void safety net: If car ever falls through or drops below -3m, instantly respawn
    const translation = rigidBodyRef.current.translation();
    if (translation.y < -3.0) {
      resetVehicle();
      return;
    }

    // Notify position to parent / camera
    if (onPositionUpdate) {
      onPositionUpdate(new THREE.Vector3(translation.x, translation.y, translation.z));
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      ccd={true}
      canSleep={false}
      mass={12}
      friction={0.2}
      restitution={0.1}
      linearDamping={0.4}
      angularDamping={2.0}
      position={[0, 0.8, 14]}
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
      {/* Explicit Stable Cuboid Collider - wide base, sits perfectly on wheels, zero floor clipping */}
      <CuboidCollider args={[0.72, 0.35, 1.15]} position={[0, 0.20, 0]} friction={0.2} restitution={0.1} />

      {/* Dynamic 3D Vehicle Model Switcher */}
      <group ref={chassisRef}>
        <VehicleModelSwitch
          vehicleId={selectedVehicleId}
          color={selectedVehicleColor}
          frontLeftRef={frontLeftWheelRef}
          frontRightRef={frontRightWheelRef}
          rearLeftRef={rearLeftWheelRef}
          rearRightRef={rearRightWheelRef}
          showHeadlightBeams={true}
        />
      </group>
    </RigidBody>
  );
};
