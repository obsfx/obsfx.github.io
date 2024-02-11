'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

import { ThreeBox } from '@/components/three-box';
import { cn } from '@/lib/utils';

export function ThreeCubeCanvas() {
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <div
      className={cn(
        'group relative h-16 w-16 select-none overflow-hidden rounded-lg bg-gray-50 bg-gradient-to-br transition-all ease-in-out hover:cursor-move',
      )}
    >
      <Canvas>
        <color attach='background' args={['#facc15']} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.5}
          penumbra={0.25}
          decay={0.5}
          intensity={Math.PI}
        />
        <pointLight position={[10, -10, 10]} decay={0} intensity={Math.PI} />
        <pointLight position={[10, 0, 10]} decay={0} intensity={Math.PI} />
        <ambientLight intensity={1} />
        <ThreeBox position={[0, 0, 0]} meshRef={meshRef} />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
