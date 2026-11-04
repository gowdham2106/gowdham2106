import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface SkyscraperData {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  hasNeonStrip: boolean;
  neonColor: string;
  hasAntenna: boolean;
  hasBillboard: boolean;
  billboardText?: string;
  billboardColor?: string;
}

export const CyberCity: React.FC = () => {
  const searchlightGroupRef = useRef<THREE.Group>(null);
  const beaconGroupRef = useRef<THREE.Group>(null);

  // Procedural city skyscraper generation
  const skyscrapers = useMemo<SkyscraperData[]>(() => {
    const list: SkyscraperData[] = [];
    const colors = ['#00f3ff', '#ff007f', '#8b00ff', '#0066ff', '#ffaa00'];
    const signs = ['NEO-KYOTO', 'CLAIMSHIELD', 'MAVERICK', 'CYBER // 2106', 'AI CORE', 'NET // GRID', 'C# .NET'];

    // Generate buildings in 4 depth layers
    const layers = [
      { zMin: -7, zMax: -12, count: 14, minH: 7, maxH: 15 },
      { zMin: -13, zMax: -20, count: 18, minH: 12, maxH: 22 },
      { zMin: -21, zMax: -30, count: 20, minH: 16, maxH: 28 },
      { zMin: -31, zMax: -45, count: 16, minH: 20, maxH: 36 },
    ];

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const x = (Math.random() - 0.5) * 44;
        const z = layer.zMin - Math.random() * (layer.zMax - layer.zMin);
        const width = 1.8 + Math.random() * 2.8;
        const depth = 1.8 + Math.random() * 2.8;
        const height = layer.minH + Math.random() * (layer.maxH - layer.minH);
        const neonColor = colors[Math.floor(Math.random() * colors.length)];
        const hasNeonStrip = Math.random() > 0.4;
        const hasAntenna = Math.random() > 0.5;
        const hasBillboard = Math.random() > 0.7 && height > 10;
        const billboardText = hasBillboard ? signs[Math.floor(Math.random() * signs.length)] : undefined;
        const billboardColor = hasBillboard ? colors[Math.floor(Math.random() * colors.length)] : undefined;

        list.push({
          x,
          z,
          width,
          depth,
          height,
          hasNeonStrip,
          neonColor,
          hasAntenna,
          hasBillboard,
          billboardText,
          billboardColor,
        });
      }
    });

    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Rotating searchlights
    if (searchlightGroupRef.current) {
      searchlightGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.5;
      searchlightGroupRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
    }

    // Flashing rooftop warning beacons
    if (beaconGroupRef.current) {
      const flash = (Math.floor(t * 2) % 2 === 0);
      beaconGroupRef.current.children.forEach((child) => {
        if ((child as THREE.Mesh).material) {
          ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = flash ? 1.0 : 0.15;
        }
      });
    }
  });

  return (
    <group position={[0, -4, 0]}>
      {/* Ground City Fog / Dark Ground */}
      <mesh position={[0, 0, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#02040b" roughness={0.9} />
      </mesh>

      {/* Skyscraper Buildings */}
      {skyscrapers.map((b, i) => (
        <group key={i} position={[b.x, b.height / 2, b.z]}>
          {/* Main Building Block */}
          <mesh>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial
              color="#040918"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Window Light Grids (Procedural Emissive Box Strips) */}
          <mesh position={[0, 0, b.depth / 2 + 0.02]}>
            <planeGeometry args={[b.width * 0.85, b.height * 0.8]} />
            <meshStandardMaterial
              color="#0a1428"
              emissive={b.neonColor}
              emissiveIntensity={0.25}
              roughness={0.4}
            />
          </mesh>

          {/* Vertical Neon Edge Accent */}
          {b.hasNeonStrip && (
            <mesh position={[b.width / 2 + 0.02, 0, b.depth / 2 + 0.02]}>
              <boxGeometry args={[0.08, b.height, 0.08]} />
              <meshBasicMaterial color={b.neonColor} />
            </mesh>
          )}

          {/* Rooftop Antenna Spire */}
          {b.hasAntenna && (
            <mesh position={[0, b.height / 2 + 1.2, 0]}>
              <cylinderGeometry args={[0.03, 0.08, 2.4, 6]} />
              <meshStandardMaterial color="#111827" metalness={0.9} />
            </mesh>
          )}

          {/* Rooftop Glowing Billboard */}
          {b.hasBillboard && b.billboardText && (
            <group position={[0, b.height / 2 + 1.0, 0]}>
              <mesh>
                <boxGeometry args={[b.width * 0.9, 0.8, 0.1]} />
                <meshStandardMaterial color="#080e22" />
              </mesh>
              <mesh position={[0, 0, 0.06]}>
                <planeGeometry args={[b.width * 0.85, 0.7]} />
                <meshBasicMaterial color="#000" />
              </mesh>
              <Text
                position={[0, 0, 0.08]}
                fontSize={0.22}
                color={b.billboardColor || '#00f3ff'}
                anchorX="center"
                anchorY="middle"
                maxWidth={b.width * 0.8}
              >
                {b.billboardText}
              </Text>
            </group>
          )}
        </group>
      ))}

      {/* Flashing Aircraft Warning Beacons */}
      <group ref={beaconGroupRef}>
        {skyscrapers.filter(b => b.hasAntenna).map((b, i) => (
          <mesh key={i} position={[b.x, b.height + 2.4, b.z]}>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshBasicMaterial color="#ff2244" transparent opacity={1.0} />
          </mesh>
        ))}
      </group>

      {/* Sky Searchlights */}
      <group ref={searchlightGroupRef} position={[0, 10, -25]}>
        <mesh position={[-8, 0, 0]} rotation={[0.4, 0, 0.3]}>
          <cylinderGeometry args={[0.1, 3.5, 25, 8, 1, true]} />
          <meshBasicMaterial
            color="#00f3ff"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[8, 0, 0]} rotation={[-0.3, 0, -0.4]}>
          <cylinderGeometry args={[0.1, 4.0, 28, 8, 1, true]} />
          <meshBasicMaterial
            color="#ff007f"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};

