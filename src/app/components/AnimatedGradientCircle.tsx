"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GradientMeshProps {
  size: number;
}

function GradientMesh({ size }: GradientMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Shader material for animated gradient
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size, size) },
    }),
    [size]
  );

  const vertexShader = `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_resolution;

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      
      // Create smooth gradients that change over time
      float gradient1 = sin(u_time * 1.2 + uv.x * 3.14159) * 0.5 + 0.5;
      float gradient2 = cos(u_time * 0.8 + uv.y * 3.14159) * 0.5 + 0.5;
      float gradient3 = sin(u_time * 1.5 + (uv.x + uv.y) * 3.14159) * 0.5 + 0.5;
      
      // Retro pixel art color palette
      vec3 color1 = vec3(0.1137, 0.1686, 0.3255); // #1D2B53 - Dark blue
      vec3 color2 = vec3(1.0, 0.0, 0.3020); // #FF004D - Bright red/pink
      vec3 color3 = vec3(0.1608, 0.6784, 1.0); // #29ADFF - Bright blue
      
      vec3 finalColor = mix(
        mix(color1, color2, gradient1),
        color3,
        gradient2 * gradient3
      );
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

interface AnimatedGradientCircleProps {
  size?: number;
  className?: string;
}

export default function AnimatedGradientCircle({
  size = 48,
  className = "",
}: AnimatedGradientCircleProps) {
  return (
    <div className="relative bg-black/25 rounded-full overflow-hidden hover:scale-[2.75] transition-all duration-500 ease-in-out">
      {/* Base Three.js animation */}
      <div
        className={`rounded-full overflow-hidden ${className}`}
        style={{ width: size, height: size }}
      >
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          style={{ width: "100%", height: "100%" }}
        >
          <GradientMesh size={size} />
        </Canvas>
      </div>
      
      {/* Glossy highlight layers */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ width: size, height: size }}
      >
        {/* Main highlight */}
        <div 
          className="absolute rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent blur-sm"
          style={{
            width: size * 0.6,
            height: size * 0.6,
            top: size * 0.1,
            left: size * 0.15,
          }}
        />
        
        {/* Secondary smaller highlight */}
        <div 
          className="absolute rounded-full bg-gradient-to-br from-white/60 via-white/20 to-transparent blur-xs"
          style={{
            width: size * 0.25,
            height: size * 0.25,
            top: size * 0.15,
            left: size * 0.25,
          }}
        />
        
        {/* Edge shine */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/5 to-white/20 blur-sm"
          style={{ width: size, height: size }}
        />
      </div>
    </div>
  );
}
