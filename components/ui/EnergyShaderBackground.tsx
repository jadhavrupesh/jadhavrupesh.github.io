import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;

  float fbm(vec2 uv) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
      value += sin(uv.x * 4.0 * frequency + time * 0.4 * frequency) *
               cos(uv.y * 3.0 * frequency - time * 0.3 * frequency) * amplitude;
      uv *= 1.7;
      amplitude *= 0.55;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;

    // Slightly stretch diagonally for silk-like flow
    uv.x += uv.y * 0.2;
    uv.y += uv.x * 0.1;

    float noise = fbm(uv * 2.0);

    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, vec3(0.0), 0.25); // keep it closer to black

    float vignette = 1.0 - length(uv - 0.5) * 1.6;
    vignette = clamp(vignette, 0.0, 1.0);
    vignette = pow(vignette, 1.8);

    gl_FragColor = vec4(color * vignette, vignette * 0.9);
  }
`;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
}

function ShaderPlane({
  position,
  color1 = '#d4d4d4',
  color2 = '#ffffff',
  opacity = 0.9,
}: {
  position: [number, number, number];
  color1?: string;
  color2?: string;
  opacity?: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    }),
    [color1, color2]
  );

  useFrame((state) => {
    uniforms.time.value = state.clock.elapsedTime;
    uniforms.intensity.value = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
  });

  React.useEffect(() => {
    // keep colors in sync if props change
    uniforms.color1.value.set(color1);
    uniforms.color2.value.set(color2);
  }, [color1, color2, uniforms.color1.value, uniforms.color2.value]);

  return (
    <mesh position={position}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={(m) => {
          materialRef.current = m;
        }}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function Scene() {
  // centered in clip space using an orthographic camera below
  return (
    <>
      <ShaderPlane position={[0, 0, -0.6]} color1="#5f5f5f" color2="#b5b5b5" opacity={0.85} />
      <ShaderPlane position={[0, 0, -0.9]} color1="#2b2b2b" color2="#858585" opacity={0.6} />
    </>
  );
}

export function EnergyShaderBackground({ className }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        orthographic
        camera={{ position: [0, 0, 2], zoom: 260 }}
      >
        <color attach="background" args={['#000000']} />
        <Scene />
      </Canvas>
    </div>
  );
}

