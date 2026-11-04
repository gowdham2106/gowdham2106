import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { TECH_ARSENAL } from '../../data/portfolioData';
import { TechSkill } from '../../types';
import { soundFX } from '../../audio/soundFX';

interface TechArsenalHologramsProps {
  onSelectTech: (tech: TechSkill) => void;
  selectedTech: TechSkill | null;
}

const SingleTechHolo: React.FC<{
  skill: TechSkill;
  onSelect: (skill: TechSkill) => void;
  isSelected: boolean;
}> = ({ skill, onSelect, isSelected }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Subtle individual phase offset
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Rotation
      const spinSpeed = hovered ? 2.5 : 0.8;
      meshRef.current.rotation.y = t * spinSpeed + phase.current;
      meshRef.current.rotation.x = Math.sin(t * 0.5 + phase.current) * 0.2;

      // Bobbing
      const targetY = skill.position[1] + Math.sin(t * 1.5 + phase.current) * 0.05 + (hovered ? 0.12 : 0);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    }
  });

  const renderGeometry = () => {
    switch (skill.meshShape) {
      case 'octahedron':
        return <octahedronGeometry args={[0.09, 0]} />;
      case 'torus':
        return <torusGeometry args={[0.07, 0.025, 12, 24]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.06, 0.06, 0.12, 12]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.09, 0]} />;
      case 'sphere':
        return <sphereGeometry args={[0.08, 12, 12]} />;
      case 'cube':
      default:
        return <boxGeometry args={[0.11, 0.11, 0.11]} />;
    }
  };

  return (
    <group
      ref={meshRef}
      position={[skill.position[0], skill.position[1], skill.position[2]]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        soundFX.playHover();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        soundFX.playClick();
        onSelect(skill);
      }}
    >
      {/* 3D Geometry Core */}
      <mesh>
        {renderGeometry()}
        <meshStandardMaterial
          color="#040d1a"
          emissive={skill.color}
          emissiveIntensity={hovered || isSelected ? 1.5 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe Hologram Aura */}
      <mesh scale={1.25}>
        {renderGeometry()}
        <meshBasicMaterial
          color={hovered || isSelected ? '#ffffff' : skill.color}
          wireframe
          transparent
          opacity={hovered || isSelected ? 0.9 : 0.4}
        />
      </mesh>

      {/* Hover Information Badge Floating Above Object */}
      {hovered && (
        <group position={[0, 0.22, 0]}>
          <mesh>
            <planeGeometry args={[0.42, 0.14]} />
            <meshBasicMaterial color="#020712" transparent opacity={0.85} />
          </mesh>
          <Text
            position={[0, 0.02, 0.005]}
            fontSize={0.038}
            color={skill.color}
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
          <Text
            position={[0, -0.03, 0.005]}
            fontSize={0.022}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            {skill.status}
          </Text>
        </group>
      )}

      {/* Point Light for selected / hovered */}
      {(hovered || isSelected) && (
        <pointLight color={skill.color} intensity={1.5} distance={0.8} />
      )}
    </group>
  );
};

export const TechArsenalHolograms: React.FC<TechArsenalHologramsProps> = ({
  onSelectTech,
  selectedTech,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {TECH_ARSENAL.map((skill) => (
        <SingleTechHolo
          key={skill.name}
          skill={skill}
          onSelect={onSelectTech}
          isSelected={selectedTech?.name === skill.name}
        />
      ))}
    </group>
  );
};

