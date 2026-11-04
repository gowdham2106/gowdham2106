import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { soundFX } from '../../audio/soundFX';

interface CyberLaptopProps {
  onOpenProjects: () => void;
}

export const CyberLaptop: React.FC<CyberLaptopProps> = ({ onOpenProjects }) => {
  const [hovered, setHovered] = useState(false);
  const cursorRef = useRef<THREE.Mesh>(null);
  const keyLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cursorRef.current) {
      cursorRef.current.visible = Math.floor(t * 2.5) % 2 === 0;
    }
    if (keyLightRef.current) {
      keyLightRef.current.intensity = hovered ? 3.0 : 1.8 + Math.sin(t * 3) * 0.2;
    }
  });

  return (
    <group
      position={[0, 0.99, 0.25]}
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
        onOpenProjects();
      }}
    >
      {/* LAPTOP BASE CHASSIS */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[1.1, 0.03, 0.74]} />
        <meshStandardMaterial
          color={hovered ? '#0b162e' : '#070d1c'}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Cyber Edge Glow on Laptop Body */}
      <mesh position={[0, 0.015, 0.372]}>
        <boxGeometry args={[1.08, 0.01, 0.005]} />
        <meshBasicMaterial color={hovered ? '#ff007f' : '#00f3ff'} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.031, 0.2]}>
        <planeGeometry args={[0.34, 0.22]} />
        <meshStandardMaterial
          color="#030610"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Trackpad border glow */}
      <mesh position={[0, 0.032, 0.2]}>
        <ringGeometry args={[0.16, 0.165, 4]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.4} />
      </mesh>

      {/* KEYBOARD WELL & GLOWING KEYS */}
      <mesh position={[0, 0.0305, -0.09]}>
        <planeGeometry args={[0.96, 0.38]} />
        <meshStandardMaterial color="#02040a" roughness={0.8} />
      </mesh>

      {/* Keyboard Grid Keys */}
      {[-0.14, -0.07, 0, 0.07, 0.14].map((rowY, rIdx) => (
        <group key={rIdx} position={[0, 0.033, -0.09 + rowY]}>
          {[-0.42, -0.32, -0.22, -0.12, -0.02, 0.08, 0.18, 0.28, 0.38].map((colX, cIdx) => (
            <mesh key={cIdx} position={[colX, 0, 0]}>
              <boxGeometry args={[0.078, 0.006, 0.052]} />
              <meshStandardMaterial
                color="#060e20"
                emissive={hovered ? '#ff007f' : '#00f3ff'}
                emissiveIntensity={0.65}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Keyboard Point Light */}
      <pointLight
        ref={keyLightRef}
        position={[0, 0.12, -0.09]}
        color={hovered ? '#ff007f' : '#00f3ff'}
        distance={1.2}
      />

      {/* LAPTOP SCREEN LID (Angled at ~105 deg) */}
      <group position={[0, 0.03, -0.37]} rotation={[0.26, 0, 0]}>
        {/* Screen Back Casing */}
        <mesh position={[0, 0.36, -0.015]}>
          <boxGeometry args={[1.1, 0.72, 0.02]} />
          <meshStandardMaterial
            color="#050a17"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Casing Logo Glowing Cyber Glyphs on Back */}
        <mesh position={[0, 0.36, -0.026]} rotation={[0, Math.PI, 0]}>
          <ringGeometry args={[0.06, 0.09, 6]} />
          <meshBasicMaterial color="#00f3ff" />
        </mesh>

        {/* Screen Bezel */}
        <mesh position={[0, 0.36, 0.001]}>
          <planeGeometry args={[1.08, 0.70]} />
          <meshStandardMaterial color="#020409" roughness={0.9} />
        </mesh>

        {/* Active OLED Display */}
        <mesh position={[0, 0.36, 0.003]}>
          <planeGeometry args={[1.0, 0.62]} />
          <meshBasicMaterial color="#020612" />
        </mesh>

        {/* Screen Header Line */}
        <mesh position={[0, 0.64, 0.004]}>
          <planeGeometry args={[0.96, 0.03]} />
          <meshBasicMaterial color="#08142a" />
        </mesh>
        <Text
          position={[-0.45, 0.64, 0.005]}
          fontSize={0.018}
          color="#00f3ff"
          anchorX="left"
          anchorY="middle"
        >
          ● DEV_ENV :: ASP.NET CORE / REACT 18
        </Text>
        <Text
          position={[0.45, 0.64, 0.005]}
          fontSize={0.018}
          color="#ff007f"
          anchorX="right"
          anchorY="middle"
        >
          CPU: 18% | PORT: 3000
        </Text>

        {/* Display Code Editor Text */}
        <group position={[-0.46, 0.58, 0.005]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.024}
            color="#38bdf8"
            anchorX="left"
            anchorY="top"
            lineHeight={1.4}
            maxWidth={0.92}
          >
            {`// GOWDHAM GOKUL // SYSTEM KERNEL\nusing Microsoft.AspNetCore.Builder;\n\nvar app = WebApplication.Create();\napp.MapGet("/api/projects", () => new {\n  Project1 = "ClaimShield (ASP.NET + React)",\n  Project2 = "Mission Mavericks Hub (Supabase)",\n  Telemetry = "Active / Continuous Growth"\n});\napp.Run();`}
          </Text>

          {/* Interactive Prompt Hint on screen */}
          <Text
            position={[0, -0.22, 0]}
            fontSize={0.022}
            color={hovered ? '#ff007f' : '#00ffaa'}
            anchorX="left"
            anchorY="top"
          >
            {hovered ? '&gt; [CLICK TO LAUNCH PROJECT UNIVERSE]' : '&gt; SYSTEM READY // AWAITING COMMAND_'}
          </Text>

          {/* Blinking Terminal Cursor */}
          <mesh ref={cursorRef} position={[0.42, -0.23, 0]}>
            <planeGeometry args={[0.016, 0.022]} />
            <meshBasicMaterial color="#00f3ff" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

