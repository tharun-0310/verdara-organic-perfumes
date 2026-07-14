import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Float } from '@react-three/drei';
import PerfumeBottle3D from '../models/PerfumeBottle3D';
import { isLowPoweredDevice } from '../../utils/helpers';

function BottleScene({ product }) {
  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.4} color={product.lightColor || '#ffffff'} />

      {/* Key light */}
      <directionalLight
        position={[2, 4, 3]}
        intensity={1.5}
        color={product.lightColor || '#ffffff'}
        castShadow
      />

      {/* Rim light */}
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.6}
        color={product.glowColor || '#c9a84c'}
      />

      {/* Point glow */}
      <pointLight
        position={[0, -1, 2]}
        intensity={0.8}
        color={product.glowColor || '#c9a84c'}
        distance={4}
      />

      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <PerfumeBottle3D
          liquidColor={product.liquidColor}
          glassTint={product.glassTint}
          capColor={product.capColor}
          labelColor={product.labelColor}
          accentColor={product.accentColor}
          glowColor={product.glowColor}
          productName={product.name}
          scale={1.4}
        />
      </Float>
    </>
  );
}

export default function ProductBottleCanvas({ product }) {
  const lowPower = isLowPoweredDevice();

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={lowPower ? [1, 1.5] : [1, 2]}
      gl={{ antialias: !lowPower, alpha: true }}
      shadows={!lowPower}
      style={{ width: '100%', height: '100%' }}
      aria-label={`3D view of ${product?.name}`}
    >
      <Suspense fallback={null}>
        <BottleScene product={product || {}} />
      </Suspense>
    </Canvas>
  );
}
