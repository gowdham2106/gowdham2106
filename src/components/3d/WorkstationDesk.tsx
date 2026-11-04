import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const WorkstationDesk: React.FC = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Tabletop Surface */}
      <mesh position={[0, 0.95, 0]} receiveShadow>
        <boxGeometry args={[4.4, 0.08, 1.8]} />
        <meshStandardMaterial
          color="#060b17"
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Cyberpunk Table Bevel / Front Lip */}
      <mesh position={[0, 0.92, 0.91]}>
        <boxGeometry args={[4.42, 0.06, 0.04]} />
        <meshStandardMaterial color="#0b152b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Glowing Neon Edge Running Across Tablefront */}
      <mesh position={[0, 0.93, 0.935]}>
        <boxGeometry args={[4.3, 0.02, 0.015]} />
        <meshBasicMaterial color="#00f3ff" />
      </mesh>

      {/* Side Neon Accent Strips */}
      <mesh position={[-2.21, 0.93, 0]}>
        <boxGeometry args={[0.015, 0.02, 1.7]} />
        <meshBasicMaterial color="#ff007f" />
      </mesh>
      <mesh position={[2.21, 0.93, 0]}>
        <boxGeometry args={[0.015, 0.02, 1.7]} />
        <meshBasicMaterial color="#ff007f" />
      </mesh>

      {/* Hologram Projector Emitter Base on Desk */}
      <group position={[0, 0.995, -0.1]}>
        {/* Metal Base Disk */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.38, 0.02, 32]} />
          <meshStandardMaterial color="#0a1224" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Inner Glowing Ring */}
        <mesh ref={ringRef} position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 0.26, 32]} />
          <meshBasicMaterial color="#00f3ff" side={THREE.DoubleSide} />
        </mesh>

        {/* Center Optical Lens */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.16, 32]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Desk Legs / Support Pillars */}
      {/* Left Pillar */}
      <group position={[-1.8, 0.45, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.95, 1.4]} />
          <meshStandardMaterial color="#060c1c" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <boxGeometry args={[0.01, 0.8, 0.05]} />
          <meshBasicMaterial color="#00f3ff" />
        </mesh>
      </group>

      {/* Right Pillar */}
      <group position={[1.8, 0.45, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.95, 1.4]} />
          <meshStandardMaterial color="#060c1c" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[-0.08, 0, 0]}>
          <boxGeometry args={[0.01, 0.8, 0.05]} />
          <meshBasicMaterial color="#00f3ff" />
        </mesh>
      </group>

      {/* Cable Conduits under desk */}
      <mesh position={[0, 0.35, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 3.2, 12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.30, -0.45]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 3.2, 12]} />
        <meshStandardMaterial color="#080e1e" roughness={0.6} />
      </mesh>

      {/* Floor Grid Surface */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          color="#030611"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Floor Grid Line Details */}
      <gridHelper args={[14, 28, '#00f3ff', '#0a1630']} position={[0, -0.04, 0]} />
    </group>
  );
};

