import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { NavSection } from '../../types';

interface CameraRigProps {
  currentSection: NavSection;
  reducedMotion: boolean;
}

export const CameraRig: React.FC<CameraRigProps> = ({ currentSection, reducedMotion }) => {
  const { camera, pointer } = useThree();

  const currentLookAt = useRef(new THREE.Vector3(0, 1.15, 0));

  // Target configurations per section
  const sectionTargets: Record<NavSection, { pos: [number, number, number]; look: [number, number, number] }> = {
    workstation: {
      pos: [0, 1.8, 3.8],
      look: [0, 1.15, 0],
    },
    profile: {
      pos: [-1.2, 1.65, 1.8],
      look: [-1.45, 1.65, -0.1],
    },
    arsenal: {
      pos: [0, 2.3, 2.6],
      look: [0, 1.6, -0.4],
    },
    projects: {
      pos: [1.2, 1.65, 1.8],
      look: [1.45, 1.65, -0.1],
    },
    github: {
      pos: [-0.75, 1.9, 2.5],
      look: [-0.4, 1.4, 0],
    },
    missions: {
      pos: [0.75, 1.9, 2.5],
      look: [0.4, 1.4, 0],
    },
    contact: {
      pos: [0, 1.38, 1.6],
      look: [0, 1.05, 0.1],
    },
  };

  useFrame((_, delta) => {
    const target = sectionTargets[currentSection] || sectionTargets.workstation;

    // Mouse parallax offsets (subtle)
    const parallaxX = reducedMotion ? 0 : pointer.x * 0.28;
    const parallaxY = reducedMotion ? 0 : pointer.y * 0.16;

    const desiredX = target.pos[0] + parallaxX;
    const desiredY = target.pos[1] + parallaxY;
    const desiredZ = target.pos[2];

    // Lerp camera position
    const lerpFactor = THREE.MathUtils.clamp(delta * 2.8, 0, 1);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, lerpFactor);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredY, lerpFactor);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredZ, lerpFactor);

    // Lerp lookAt target
    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, target.look[0], lerpFactor);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, target.look[1], lerpFactor);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, target.look[2], lerpFactor);

    camera.lookAt(currentLookAt.current);
  });

  return null;
};

