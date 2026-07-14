import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '../../context/StoreContext';
import PerfumeBottle3D from '../models/PerfumeBottle3D';
import fragrances from '../../data/fragrances';
import { isLowPoweredDevice, lerp } from '../../utils/helpers';

// ─── Lerp-based color helper (avoids null ref crash) ─────────────────────
const _color = new THREE.Color();

// ─── Scene Controller — moves camera with scroll + pointer ────────────────
function SceneController() {
  const { camera } = useThree();
  const scrollProgress = useSceneStore((s) => s.scrollProgress);
  const pointerX = useSceneStore((s) => s.pointerX);
  const pointerY = useSceneStore((s) => s.pointerY);

  const target = useRef(new THREE.Vector3(0, 0, 6));
  const current = useRef(new THREE.Vector3(0, 0, 8));

  useFrame(() => {
    target.current.set(
      pointerX * 0.8,
      scrollProgress * 0.5 + pointerY * 0.3,
      6 - scrollProgress * 1.5
    );
    current.current.lerp(target.current, 0.04);
    camera.position.copy(current.current);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Animated bottle — tilts with pointer ────────────────────────────────
function AnimatedBottle() {
  const groupRef = useRef();
  const currentFragrance = useSceneStore((s) => s.currentFragrance);
  const pointerX = useSceneStore((s) => s.pointerX);
  const pointerY = useSceneStore((s) => s.pointerY);

  const fragrance = fragrances[currentFragrance] || fragrances[0];

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, pointerY * 0.2, 0.05);
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, pointerX * 0.3, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <PerfumeBottle3D
          liquidColor={fragrance.liquidColor}
          glassTint={fragrance.glassTint}
          capColor={fragrance.capColor}
          labelColor={fragrance.labelColor}
          accentColor={fragrance.accentColor}
          glowColor={fragrance.glowColor}
          productName={fragrance.name}
          scale={1.2}
        />
      </Float>
    </group>
  );
}

// ─── Sparkle particles ────────────────────────────────────────────────────
function EnvironmentParticles() {
  const currentFragrance = useSceneStore((s) => s.currentFragrance);
  const fragrance = fragrances[currentFragrance] || fragrances[0];
  const lowPower = isLowPoweredDevice();

  return (
    <Sparkles
      count={lowPower ? 25 : 70}
      scale={6}
      size={1.5}
      speed={0.4}
      color={fragrance.particleColor || '#c9a84c'}
      opacity={0.5}
    />
  );
}

// ─── Dynamic lighting — lerps color toward current fragrance ──────────────
function DynamicLighting() {
  const currentFragrance = useSceneStore((s) => s.currentFragrance);
  const fragrance = fragrances[currentFragrance] || fragrances[0];

  // Use state-driven colors via uniforms-free approach (R3F updates lights each frame)
  const ambientRef = useRef();
  const keyRef = useRef();

  useFrame(() => {
    const targetColor = new THREE.Color(fragrance.lightColor || '#ffffff');
    if (ambientRef.current) {
      ambientRef.current.color.lerp(targetColor, 0.04);
    }
    if (keyRef.current) {
      keyRef.current.color.lerp(targetColor, 0.04);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.45} color={fragrance.lightColor || '#ffffff'} />
      <directionalLight
        ref={keyRef}
        position={[3, 5, 4]}
        intensity={1.8}
        color={fragrance.lightColor || '#ffffff'}
        castShadow={false}
      />
      <directionalLight
        position={[-3, 2, -3]}
        intensity={0.5}
        color={fragrance.glowColor || '#c9a84c'}
      />
      <pointLight
        position={[0, -1, 2]}
        intensity={1.2}
        color={fragrance.glowColor || '#c9a84c'}
        distance={5}
      />
    </>
  );
}

// ─── Main exported canvas ─────────────────────────────────────────────────
export default function MainCanvas({ style, className }) {
  const setPointer = useSceneStore((s) => s.setPointer);
  const setSceneReady = useSceneStore((s) => s.setSceneReady);
  const lowPower = isLowPoweredDevice();

  const handlePointerMove = (e) => {
    setPointer(
      (e.clientX / window.innerWidth) * 2 - 1,
      -((e.clientY / window.innerHeight) * 2 - 1)
    );
  };

  return (
    <div
      onMouseMove={handlePointerMove}
      style={style}
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={lowPower ? [1, 1] : [1, 2]}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        shadows={false}
        onCreated={() => setSceneReady()}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <SceneController />
          <DynamicLighting />
          <AnimatedBottle />
          <EnvironmentParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
