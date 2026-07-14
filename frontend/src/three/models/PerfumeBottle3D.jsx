import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * PerfumeBottle3D — Reusable procedural perfume bottle component.
 * Accepts color props to customize per-fragrance look.
 * Uses parametric geometry when no GLB model is available.
 */
export default function PerfumeBottle3D({
  productName = 'Verdara',
  liquidColor = '#2d6a4f',
  glassTint = '#d8f3dc',
  capColor = '#1b2e1f',
  labelColor = '#1b4332',
  accentColor = '#c9a84c',
  glowColor = '#52b788',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) {
  const groupRef = useRef();
  const liquidRef = useRef();
  const glowRef = useRef();

  // Parse hex colors to Three.js
  const glassColor = useMemo(() => new THREE.Color(glassTint), [glassTint]);
  const liquidCol = useMemo(() => new THREE.Color(liquidColor), [liquidColor]);
  const capCol = useMemo(() => new THREE.Color(capColor), [capColor]);
  const labelCol = useMemo(() => new THREE.Color(labelColor), [labelColor]);
  const accentCol = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  const glowCol = useMemo(() => new THREE.Color(glowColor), [glowColor]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Gentle floating
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
      // Very slow auto-rotation
      groupRef.current.rotation.y += 0.003;
    }

    if (glowRef.current) {
      glowRef.current.material.opacity = 0.3 + Math.sin(t * 1.2) * 0.1;
    }
  });

  const scaleVal = typeof scale === 'number' ? [scale, scale, scale] : scale;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scaleVal}
    >
      {/* ─── Cap ────────────────────────────────────────────────────── */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.35, 24]} />
        <meshPhysicalMaterial
          color={capCol}
          metalness={0.9}
          roughness={0.15}
          reflectivity={1}
        />
      </mesh>

      {/* Cap top flat disc */}
      <mesh position={[0, 1.225, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.02, 24]} />
        <meshPhysicalMaterial color={accentCol} metalness={1} roughness={0.1} />
      </mesh>

      {/* ─── Neck ───────────────────────────────────────────────────── */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.18, 0.35, 24]} />
        <meshPhysicalMaterial
          color={glassColor}
          transmission={0.9}
          transparent
          opacity={0.75}
          roughness={0.05}
          metalness={0}
          ior={1.5}
          thickness={0.3}
          reflectivity={0.3}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* ─── Body ───────────────────────────────────────────────────── */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        {/* Slightly tapered elegant bottle body */}
        <cylinderGeometry args={[0.35, 0.3, 1.5, 32, 1, false]} />
        <meshPhysicalMaterial
          color={glassColor}
          transmission={0.88}
          transparent
          opacity={0.8}
          roughness={0.04}
          metalness={0}
          ior={1.52}
          thickness={0.5}
          reflectivity={0.4}
          envMapIntensity={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ─── Liquid Inside ──────────────────────────────────────────── */}
      <mesh ref={liquidRef} position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.28, 0.24, 1.2, 32]} />
        <meshPhysicalMaterial
          color={liquidCol}
          transmission={0.7}
          transparent
          opacity={0.85}
          roughness={0.1}
          metalness={0}
          ior={1.4}
          thickness={0.8}
          emissive={liquidCol}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* ─── Label ──────────────────────────────────────────────────── */}
      <mesh position={[0, 0.05, 0.32]}>
        <planeGeometry args={[0.55, 0.5]} />
        <meshStandardMaterial
          color={labelCol}
          roughness={0.8}
          metalness={0.05}
          opacity={0.95}
          transparent
        />
      </mesh>

      {/* Label accent line */}
      <mesh position={[0, 0.05, 0.321]}>
        <planeGeometry args={[0.5, 0.02]} />
        <meshStandardMaterial color={accentCol} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* ─── Bottom Disc ────────────────────────────────────────────── */}
      <mesh position={[0, -0.86, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
        <meshPhysicalMaterial
          color={glassColor}
          transmission={0.7}
          transparent
          opacity={0.8}
          roughness={0.05}
          metalness={0}
        />
      </mesh>

      {/* ─── Glow Halo ──────────────────────────────────────────────── */}
      <mesh ref={glowRef} position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color={glowCol}
          transparent
          opacity={0.25}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ─── Shadow Disc ────────────────────────────────────────────── */}
      <mesh position={[0, -0.92, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ellipseGeometry args={[0.4, 0.2, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.25} depthWrite={false} />
      </mesh>
    </group>
  );
}
