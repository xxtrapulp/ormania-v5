"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  #define PI 3.14159265359

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // Domain-warped flowing filaments
  float filament(vec2 uv, float t, float seed) {
    vec2 p = uv;
    // First domain warp
    vec2 q = vec2(
      fbm(p + vec2(0.0, 0.0) + seed),
      fbm(p + vec2(5.2, 1.3) + seed)
    );
    // Second domain warp with time
    vec2 r = vec2(
      fbm(p + 4.0 * q + vec2(1.7 + t * 0.15, 9.2)),
      fbm(p + 4.0 * q + vec2(8.3 - t * 0.12, 2.8))
    );
    float f = fbm(p + 3.0 * r);
    return f;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float t = uTime * 0.06;

    // Multiple filament layers at different scales and speeds
    float f1 = filament(p * 1.8, t * 1.0, 0.0);
    float f2 = filament(p * 2.5 + vec2(3.7), t * 0.8 + 10.0, 1.3);
    float f3 = filament(p * 3.2 + vec2(-2.1), t * 1.2 + 20.0, 2.7);

    // Combine filaments with thresholding to create thread-like lines
    float thread1 = smoothstep(0.35, 0.55, f1) * smoothstep(0.75, 0.55, f1);
    float thread2 = smoothstep(0.30, 0.50, f2) * smoothstep(0.70, 0.50, f2) * 0.7;
    float thread3 = smoothstep(0.40, 0.55, f3) * smoothstep(0.65, 0.55, f3) * 0.4;

    float threads = thread1 + thread2 + thread3;

    // Slow pulsing glow around threads
    float glow = smoothstep(0.2, 0.6, f1) * 0.15
               + smoothstep(0.15, 0.5, f2) * 0.1
               + smoothstep(0.25, 0.55, f3) * 0.08;

    // Colors — ink base + gold threads
    vec3 ink = vec3(0.035, 0.030, 0.025);
    vec3 inkDeep = vec3(0.02, 0.018, 0.015);
    vec3 gold = vec3(0.788, 0.663, 0.416);
    vec3 gold2 = vec3(0.851, 0.737, 0.522);
    vec3 goldDim = vec3(0.55, 0.45, 0.30);

    // Base with subtle noise variation
    float baseNoise = fbm(p * 3.0 + t * 0.3);
    vec3 color = mix(inkDeep, ink, baseNoise * 0.5 + 0.5);

    // Add dim gold glow
    color = mix(color, goldDim, glow);

    // Sharp gold threads on top
    color = mix(color, gold * 0.5, threads * 0.6);
    color = mix(color, gold2 * 0.7, thread1 * 0.35);

    // Occasional bright spark along dense thread intersections
    float sparkle = pow(max(0.0, noise(p * 12.0 + t * 2.0)), 18.0) * 0.5;
    color += gold2 * sparkle * (thread1 > 0.3 ? 1.0 : 0.0);

    // Vignette
    float vignette = 1.0 - smoothstep(0.4, 1.3, length(p));
    color *= 0.9 + vignette * 0.1;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane({ visible }: { visible: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    }),
    [viewport.width, viewport.height]
  );

  useFrame((state) => {
    if (!visible || !meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ScrollStoryShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "200px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    return (
      <div className="absolute inset-0 bg-ink" />
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: false }}
        style={{ position: "absolute", inset: 0, opacity: isVisible ? 1 : 0 }}
        dpr={[1, 1.5]}
      >
        <ShaderPlane visible={isVisible} />
      </Canvas>
    </div>
  );
}
