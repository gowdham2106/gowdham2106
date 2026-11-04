import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CyberParticles: React.FC = () => {
  const count = 450;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 6; // X
      pos[i * 3 + 1] = 0.5 + Math.random() * 3.5; // Y (around desk level)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4; // Z

      scl[i] = Math.random() * 0.04 + 0.01;
    }
    return [pos, scl];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Gentle upwards drift
      pos[i * 3 + 1] += 0.12 * delta;
      // Slight sinusoidal sway
      pos[i * 3 + 0] += Math.sin(t + i) * 0.002;

      // Wrap back to bottom
      if (pos[i * 3 + 1] > 4.0) {
        pos[i * 3 + 1] = 0.5;
        pos[i * 3 + 0] = (Math.random() - 0.5) * 6;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#00f3ff"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

