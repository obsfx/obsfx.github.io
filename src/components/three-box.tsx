'use client';

import { Outlines } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import * as THREE from 'three';

export function ThreeBox({
  meshRef,
  ...props
}: JSX.IntrinsicElements['mesh'] & { meshRef: React.MutableRefObject<THREE.Mesh> }) {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta / 1.2;
    meshRef.current.rotation.y += delta / 1.5;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={2}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'white'} />
      <Outlines thickness={0.05} color='#f4f4f4' />
    </mesh>
  );
}
