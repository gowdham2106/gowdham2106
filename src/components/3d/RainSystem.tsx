import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RainSystem: React.FC = () => {
  const count = 2200;
  const pointsRef = useRef<THREE.Points>(null);

  // Generate rain drops
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute rain across a wide volume outside the window
      pos[i * 3 + 0] = (Math.random() - 0.5) * 35; // X
      pos[i * 3 + 1] = Math.random() * 25 - 5;    // Y
      pos[i * 3 + 2] = -3 - Math.random() * 22;   // Z (outside window)

      spd[i] = 12 + Math.random() * 10;           // High falling velocity
    }

    return [pos, spd];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Move down with wind angle
      pos[i * 3 + 1] -= speeds[i] * delta;
      pos[i * 3 + 0] -= speeds[i] * 0.15 * delta; // slight wind slant

      // Reset to top if fallen past ground
      if (pos[i * 3 + 1] < -6) {
        pos[i * 3 + 1] = 18 + Math.random() * 4;
        pos[i * 3 + 0] = (Math.random() - 0.5) * 35;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Falling Rain Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#8be9fd"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Glass Window Partition separating the Cyberpunk Room from the City Rain */}
      <mesh position={[0, 4, -2.2]}>
        <planeGeometry args={[26, 16]} />
        <meshPhysicalMaterial
          color="#040b1e"
          transmission={0.88}
          opacity={0.35}
          transparent
          roughness={0.15}
          metalness={0.1}
          reflectivity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Cyber Window Frame Beams */}
      <mesh position={[-6.5, 4, -2.18]}>
        <boxGeometry args={[0.2, 16, 0.2]} />
        <meshStandardMaterial color="#080e22" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[6.5, 4, -2.18]}>
        <boxGeometry args={[0.2, 16, 0.2]} />
        <meshStandardMaterial color="#080e22" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 4, -2.18]}>
        <boxGeometry args={[0.25, 16, 0.2]} />
        <meshStandardMaterial color="#080e22" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 4.5, -2.18]}>
        <boxGeometry args={[26, 0.2, 0.2]} />
        <meshStandardMaterial color="#080e22" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Window Frame Neon Accent Strip */}
      <mesh position={[0, -1.2, -2.15]}>
        <boxGeometry args={[26, 0.04, 0.05]} />
        <meshBasicMaterial color="#00f3ff" />
      </mesh>
      <mesh position={[0, 9.8, -2.15]}>
        <boxGeometry args={[26, 0.04, 0.05]} />
        <meshBasicMaterial color="#ff007f" />
      </mesh>
    </group>
  );
};

