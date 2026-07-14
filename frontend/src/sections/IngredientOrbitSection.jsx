import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isLowPoweredDevice } from '../utils/helpers';

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  { name: 'Rose', color: '#f48fb1', radius: 2.2, speed: 0.4, y: 0.2 },
  { name: 'Vetiver', color: '#a5d6a7', radius: 1.8, speed: -0.35, y: -0.3 },
  { name: 'Bergamot', color: '#ffcc02', radius: 2.5, speed: 0.28, y: 0.4 },
  { name: 'Oud', color: '#c8960c', radius: 1.5, speed: -0.5, y: 0.1 },
  { name: 'Lavender', color: '#ce93d8', radius: 2.8, speed: 0.32, y: -0.5 },
  { name: 'Cedarwood', color: '#bcaaa4', radius: 2.0, speed: -0.22, y: 0.6 },
  { name: 'Jasmine', color: '#fff9c4', radius: 1.6, speed: 0.45, y: -0.2 },
  { name: 'Sea Salt', color: '#80deea', radius: 3.0, speed: -0.18, y: 0.3 },
];

function OrbitingSphere({ ingredient, index }) {
  const meshRef = useRef();
  const orbitRef = useRef();

  const initialAngle = (index / ingredients.length) * Math.PI * 2;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const angle = initialAngle + t * ingredient.speed;
    if (meshRef.current) {
      meshRef.current.position.set(
        Math.cos(angle) * ingredient.radius,
        ingredient.y + Math.sin(t * 0.5 + index) * 0.15,
        Math.sin(angle) * ingredient.radius
      );
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshPhysicalMaterial
        color={ingredient.color}
        emissive={ingredient.color}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function CenterGlow() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial color="#c9a84c" transparent opacity={0.15} />
    </mesh>
  );
}

function OrbitRings() {
  return (
    <>
      {[1.5, 2.2, 2.9].map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2 + i * 0.1, 0, i * 0.2]}>
          <ringGeometry args={[r - 0.01, r, 64]} />
          <meshBasicMaterial color="#c9a84c" transparent opacity={0.06} />
        </mesh>
      ))}
    </>
  );
}

export default function IngredientOrbitSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lowPower = isLowPoweredDevice();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-verdara-charcoal overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <p className="section-label text-verdara-gold mb-4">Ingredients</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,6rem)] text-verdara-cream mb-4">
            From Earth to Essence.
          </h2>
          <p className="text-verdara-cream/50 font-body font-300 max-w-md mx-auto">
            Every Verdara bottle contains only what nature intended — botanical extracts and essential oils orbiting in harmony.
          </p>
        </div>

        {/* 3D Orbit Canvas */}
        <div
          className="relative mx-auto"
          style={{ height: '60vh', maxWidth: '700px' }}
        >
          <Canvas
            camera={{ position: [0, 2, 6], fov: 50 }}
            dpr={lowPower ? [1, 1] : [1, 2]}
            gl={{ antialias: !lowPower, alpha: true }}
            aria-label="Rotating ingredient orbit"
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} color="#c9a84c" />
              <pointLight position={[0, 3, 0]} intensity={1.5} color="#ffffff" />
              <pointLight position={[0, -2, 0]} intensity={0.8} color="#c9a84c" />
              <CenterGlow />
              <OrbitRings />
              {ingredients.map((ing, i) => (
                <OrbitingSphere key={ing.name} ingredient={ing} index={i} />
              ))}
            </Suspense>
          </Canvas>

          {/* Ingredient labels around canvas */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {ingredients.map((ing, i) => {
              const angle = (i / ingredients.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(angle) * 44;
              const y = 50 + Math.sin(angle) * 38;
              return (
                <div
                  key={ing.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div
                    className="w-2 h-2 rounded-full mx-auto mb-1"
                    style={{ background: ing.color }}
                  />
                  <span
                    className="section-label text-verdara-cream/50 text-[9px]"
                    style={{ fontSize: '9px' }}
                  >
                    {ing.name.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
