import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './Lighting';
import { CyberCity } from './CyberCity';
import { RainSystem } from './RainSystem';
import { WorkstationDesk } from './WorkstationDesk';
import { CyberLaptop } from './CyberLaptop';
import { FloatingHoloDisplays } from './FloatingHoloDisplays';
import { TechArsenalHolograms } from './TechArsenalHolograms';
import { CyberParticles } from './CyberParticles';
import { CameraRig } from './CameraRig';
import { NavSection, TechSkill } from '../../types';

interface SceneContainerProps {
  currentSection: NavSection;
  reducedMotion: boolean;
  onNavigate: (section: NavSection) => void;
  onSelectTech: (tech: TechSkill) => void;
  selectedTech: TechSkill | null;
}

function SceneLoader() {
  return (
    <group position={[0, 1.2, 0]}>
      <mesh>
        <octahedronGeometry args={[0.25, 0]} />
        <meshBasicMaterial color="#00f3ff" wireframe />
      </mesh>
    </group>
  );
}

export const SceneContainer: React.FC<SceneContainerProps> = ({
  currentSection,
  reducedMotion,
  onNavigate,
  onSelectTech,
  selectedTech,
}) => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-cyber-950">
      <Canvas
        camera={{ position: [0, 1.8, 3.8], fov: 48, near: 0.1, far: 200 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* Subtle Cyberpunk Atmospheric Fog */}
        <color attach="background" args={['#02040b']} />
        <fog attach="fog" args={['#02040b', 4, 55]} />

        <Suspense fallback={<SceneLoader />}>
          {/* Dynamic Cyber Lighting */}
          <Lighting />

          {/* Rainy Cyberpunk Metropolis Skyward Outside */}
          <CyberCity />

          {/* Falling 3D Rain Streaks & Glass Window Partition */}
          <RainSystem />

          {/* Futuristic Cyberpunk Workstation Desk */}
          <WorkstationDesk />

          {/* Detailed Futuristic Laptop with Glowing Keyboard & Screen */}
          <CyberLaptop onOpenProjects={() => onNavigate('projects')} />

          {/* Floating Hologram Displays & Pedestal Hologram */}
          <FloatingHoloDisplays
            onOpenProfile={() => onNavigate('profile')}
            onOpenProjects={() => onNavigate('projects')}
            onOpenGitHub={() => onNavigate('github')}
          />

          {/* 3D Floating Tech Arsenal Constellation */}
          <TechArsenalHolograms
            onSelectTech={(tech) => {
              onSelectTech(tech);
              onNavigate('arsenal');
            }}
            selectedTech={selectedTech}
          />

          {/* Floating Cyber Dust & Digital Motes */}
          <CyberParticles />

          {/* Mouse Parallax & Smooth Section Lerp Camera Rig */}
          <CameraRig
            currentSection={currentSection}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
