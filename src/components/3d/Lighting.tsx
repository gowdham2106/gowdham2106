import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Lighting: React.FC = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const spotRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lightRef.current) {
      // Subtle rhythmic neon breathing
      lightRef.current.intensity = 2.8 + Math.sin(t * 1.5) * 0.4;
    }
  });

  return (
    <>
      {/* Deep Cyber Ambient */}
      <ambientLight color="#081026" intensity={1.2} />

      {/* Cyber Desk Screen Key Light (Cyan) */}
      <pointLight
        ref={lightRef}
        position={[0, 1.6, 0.4]}
        color="#00f3ff"
        intensity={3.2}
        distance={7}
        decay={2}
      />

      {/* Secondary Rim Light (Electric Magenta) */}
      <pointLight
        position={[2.5, 2.0, 1.2]}
        color="#ff007f"
        intensity={2.8}
        distance={9}
        decay={2}
      />

      {/* Deep Blue Fill Light */}
      <pointLight
        position={[-2.5, 1.8, 1.0]}
        color="#0066ff"
        intensity={2.5}
        distance={8}
        decay={2}
      />

      {/* Under-desk Neon Floor Wash */}
      <pointLight
        position={[0, -0.4, 0]}
        color="#00f3ff"
        intensity={1.8}
        distance={4}
        decay={2}
      />

      {/* Dramatic Overhead Spotlight focusing on Laptop & Holograms */}
      <spotLight
        ref={spotRef}
        position={[0, 4.5, 1.5]}
        target-position={[0, 1.0, 0]}
        color="#cceeff"
        intensity={2.0}
        angle={0.65}
        penumbra={0.8}
      />

      {/* Distant City Sky Glow (Neon Purple) */}
      <directionalLight
        position={[0, 5, -15]}
        color="#7000ff"
        intensity={1.5}
      />
    </>
  );
};

