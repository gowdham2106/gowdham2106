import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { soundFX } from '../../audio/soundFX';

interface FloatingHoloDisplaysProps {
  onOpenProfile: () => void;
  onOpenProjects: () => void;
  onOpenGitHub: () => void;
}

export const FloatingHoloDisplays: React.FC<FloatingHoloDisplaysProps> = ({
  onOpenProfile,
  onOpenProjects,
  onOpenGitHub,
}) => {
  const leftScreenRef = useRef<THREE.Group>(null);
  const rightScreenRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Group>(null);

  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);
  const [hoverOrb, setHoverOrb] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Floating bobbing effect
    if (leftScreenRef.current) {
      leftScreenRef.current.position.y = 1.75 + Math.sin(t * 1.8) * 0.04;
      leftScreenRef.current.rotation.z = Math.sin(t * 1.2) * 0.015;
    }

    if (rightScreenRef.current) {
      rightScreenRef.current.position.y = 1.75 + Math.sin(t * 1.8 + 1.5) * 0.04;
      rightScreenRef.current.rotation.z = Math.cos(t * 1.2) * 0.015;
    }

    if (orbRef.current) {
      orbRef.current.rotation.y = t * 0.8;
      orbRef.current.rotation.x = Math.sin(t * 0.6) * 0.3;
      orbRef.current.position.y = 1.22 + Math.sin(t * 2) * 0.03;
    }
  });

  return (
    <group>
      {/* ◈ LEFT HOLOGRAPHIC MONITOR: DEVELOPER IDENTITY ◈ */}
      <group
        ref={leftScreenRef}
        position={[-1.75, 1.75, -0.2]}
        rotation={[0.08, 0.45, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoverLeft(true);
          soundFX.playHover();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoverLeft(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          soundFX.playClick();
          onOpenProfile();
        }}
      >
        {/* Hologram Glass Backing */}
        <mesh>
          <planeGeometry args={[1.5, 0.95]} />
          <meshPhysicalMaterial
            color="#001830"
            transmission={0.8}
            opacity={hoverLeft ? 0.8 : 0.6}
            transparent
            roughness={0.2}
            reflectivity={0.9}
          />
        </mesh>

        {/* Holo Wireframe Border */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[1.52, 0.97]} />
          <meshBasicMaterial
            color={hoverLeft ? '#00f3ff' : '#00a3cc'}
            wireframe
            transparent
            opacity={hoverLeft ? 0.9 : 0.45}
          />
        </mesh>

        {/* Corner Neon Brackets */}
        <mesh position={[-0.7, 0.42, 0.01]}>
          <planeGeometry args={[0.08, 0.01]} />
          <meshBasicMaterial color="#00f3ff" />
        </mesh>
        <mesh position={[0.7, 0.42, 0.01]}>
          <planeGeometry args={[0.08, 0.01]} />
          <meshBasicMaterial color="#00f3ff" />
        </mesh>

        {/* Header bar */}
        <Text
          position={[-0.68, 0.38, 0.01]}
          fontSize={0.045}
          color="#00f3ff"
          anchorX="left"
          anchorY="top"
        >
          ◈ IDENTITY MATRIX
        </Text>
        <Text
          position={[0.68, 0.38, 0.01]}
          fontSize={0.035}
          color="#a5f3fc"
          anchorX="right"
          anchorY="top"
        >
          SYS: 2106
        </Text>

        {/* Body Text */}
        <Text
          position={[-0.68, 0.26, 0.01]}
          fontSize={0.065}
          color="#ffffff"
          anchorX="left"
          anchorY="top"
        >
          GOWDHAM GOKUL
        </Text>
        <Text
          position={[-0.68, 0.16, 0.01]}
          fontSize={0.038}
          color="#00e5ff"
          anchorX="left"
          anchorY="top"
        >
          GRADUATE TRAINEE // FULL-STACK
        </Text>
        <Text
          position={[-0.68, 0.06, 0.01]}
          fontSize={0.032}
          color="#94a3b8"
          anchorX="left"
          anchorY="top"
          maxWidth={1.3}
          lineHeight={1.3}
        >
          Specialized in C#, ASP.NET Core APIs, modern React, TypeScript & PostgreSQL.
        </Text>

        {/* Action Prompt */}
        <Text
          position={[0, -0.32, 0.01]}
          fontSize={0.038}
          color={hoverLeft ? '#ff007f' : '#00f3ff'}
          anchorX="center"
          anchorY="middle"
        >
          {hoverLeft ? '▶ CLICK TO INITIALIZE PROFILE' : '[CLICK TO EXPAND IDENTITY]'}
        </Text>
      </group>

      {/* ◈ RIGHT HOLOGRAPHIC MONITOR: PROJECT UNIVERSE ◈ */}
      <group
        ref={rightScreenRef}
        position={[1.75, 1.75, -0.2]}
        rotation={[0.08, -0.45, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoverRight(true);
          soundFX.playHover();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoverRight(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          soundFX.playClick();
          onOpenProjects();
        }}
      >
        {/* Hologram Glass Backing */}
        <mesh>
          <planeGeometry args={[1.5, 0.95]} />
          <meshPhysicalMaterial
            color="#200028"
            transmission={0.8}
            opacity={hoverRight ? 0.8 : 0.6}
            transparent
            roughness={0.2}
            reflectivity={0.9}
          />
        </mesh>

        {/* Holo Wireframe Border */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[1.52, 0.97]} />
          <meshBasicMaterial
            color={hoverRight ? '#ff007f' : '#b30059'}
            wireframe
            transparent
            opacity={hoverRight ? 0.9 : 0.45}
          />
        </mesh>

        {/* Header bar */}
        <Text
          position={[-0.68, 0.38, 0.01]}
          fontSize={0.045}
          color="#ff007f"
          anchorX="left"
          anchorY="top"
        >
          ◈ PROJECT UNIVERSE
        </Text>
        <Text
          position={[0.68, 0.38, 0.01]}
          fontSize={0.035}
          color="#f472b6"
          anchorX="right"
          anchorY="top"
        >
          2 REPOSITORIES
        </Text>

        {/* Project 1 Highlight */}
        <Text
          position={[-0.68, 0.25, 0.01]}
          fontSize={0.048}
          color="#00f3ff"
          anchorX="left"
          anchorY="top"
        >
          01. CLAIMSHIELD
        </Text>
        <Text
          position={[-0.68, 0.17, 0.01]}
          fontSize={0.03}
          color="#cbd5e1"
          anchorX="left"
          anchorY="top"
        >
          Motor Insurance Claims // ASP.NET Core + React
        </Text>

        {/* Project 2 Highlight */}
        <Text
          position={[-0.68, 0.04, 0.01]}
          fontSize={0.048}
          color="#ff007f"
          anchorX="left"
          anchorY="top"
        >
          02. MISSION MAVERICKS HUB
        </Text>
        <Text
          position={[-0.68, -0.04, 0.01]}
          fontSize={0.03}
          color="#cbd5e1"
          anchorX="left"
          anchorY="top"
        >
          Team Collaboration Portal // React + Supabase
        </Text>

        {/* Action Prompt */}
        <Text
          position={[0, -0.32, 0.01]}
          fontSize={0.038}
          color={hoverRight ? '#00f3ff' : '#ff007f'}
          anchorX="center"
          anchorY="middle"
        >
          {hoverRight ? '▶ CLICK TO OPEN PROJECTS' : '[CLICK TO ACCESS PROJECTS]'}
        </Text>
      </group>

      {/* ◈ DESK HOLOGRAPHIC EMITTER ORB ◈ */}
      <group
        ref={orbRef}
        position={[0, 1.25, -0.1]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoverOrb(true);
          soundFX.playHover();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoverOrb(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          soundFX.playClick();
          onOpenProfile();
        }}
      >
        {/* Core Glowing Holographic Shape */}
        <mesh>
          <icosahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial
            color={hoverOrb ? '#ff007f' : '#00f3ff'}
            wireframe
          />
        </mesh>

        {/* Outer concentric rings */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[0.12, 0.13, 24]} />
          <meshBasicMaterial
            color="#0066ff"
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <ringGeometry args={[0.15, 0.158, 24]} />
          <meshBasicMaterial
            color="#ff007f"
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Hologram Light */}
        <pointLight
          color={hoverOrb ? '#ff007f' : '#00f3ff'}
          intensity={1.5}
          distance={1.0}
        />
      </group>

      {/* ◈ TOP STATUS BANNER OVERHEAD ◈ */}
      <group position={[0, 2.5, -0.5]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.07}
          color="#00f3ff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          NEO-KYOTO WORKSTATION // GOWDHAM GOKUL
        </Text>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[3.0, 0.008, 0.008]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
};

