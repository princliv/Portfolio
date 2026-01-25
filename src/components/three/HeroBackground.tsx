import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// Shooting Star Component
function ShootingStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const startPosRef = useRef({
    x: (Math.random() - 0.5) * 20,
    y: Math.random() * 10 + 5,
    z: (Math.random() - 0.5) * 10,
  });
  const endPosRef = useRef({
    x: startPosRef.current.x - (Math.random() * 15 + 10),
    y: startPosRef.current.y - (Math.random() * 15 + 10),
    z: startPosRef.current.z - (Math.random() * 5),
  });
  const durationRef = useRef(Math.random() * 2 + 1);
  const delayRef = useRef(Math.random() * 5);

  useFrame((state) => {
    if (meshRef.current) {
      const elapsed = (state.clock.elapsedTime - delayRef.current) % (durationRef.current + 2);
      if (elapsed >= 0 && elapsed <= durationRef.current) {
        const progress = elapsed / durationRef.current;
        meshRef.current.position.x = startPosRef.current.x + (endPosRef.current.x - startPosRef.current.x) * progress;
        meshRef.current.position.y = startPosRef.current.y + (endPosRef.current.y - startPosRef.current.y) * progress;
        meshRef.current.position.z = startPosRef.current.z + (endPosRef.current.z - startPosRef.current.z) * progress;
        meshRef.current.visible = true;
        if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
          meshRef.current.material.opacity = 1 - progress;
        }
      } else {
        meshRef.current.visible = false;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[startPosRef.current.x, startPosRef.current.y, startPosRef.current.z]} visible={false}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={1}
      />
    </mesh>
  );
}

// Constellation Lines
function Constellation() {
  const { points, lines } = useMemo(() => {
    const count = 15;
    const positions = new Float32Array(count * 3);
    const pointArray: number[] = [];
    
    // Generate points and store in both Float32Array and regular array
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      pointArray.push(x, y, z);
    }

    // Generate lines using the point array
    const lineCount = 8;
    const linePositions: number[] = [];
    for (let i = 0; i < lineCount; i++) {
      const startIdx = Math.floor(Math.random() * count);
      const endIdx = Math.floor(Math.random() * count);
      
      // Ensure we don't use the same point
      if (startIdx === endIdx) continue;
      
      const startBase = startIdx * 3;
      const endBase = endIdx * 3;
      
      linePositions.push(
        pointArray[startBase] || 0,
        pointArray[startBase + 1] || 0,
        pointArray[startBase + 2] || 0,
        pointArray[endBase] || 0,
        pointArray[endBase + 1] || 0,
        pointArray[endBase + 2] || 0
      );
    }
    
    return {
      points: positions,
      lines: new Float32Array(linePositions)
    };
  }, []);

  // Only render if we have valid lines
  if (lines.length === 0) {
    return (
      <Points positions={points} stride={3}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    );
  }

  return (
    <>
      <Points positions={points} stride={3}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lines.length / 3}
            array={lines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.2}
        />
      </lineSegments>
    </>
  );
}

export function HeroBackground() {
  const [shootingStars] = useState(() => Array.from({ length: 8 }, (_, i) => i));

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ParticleField />
        <Constellation />
        {shootingStars.map((_, i) => (
          <ShootingStar key={i} />
        ))}
      </Canvas>
      
      {/* Cosmic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--background))_70%)]" />
      
      {/* Animated cosmic glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* CSS Shooting Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
