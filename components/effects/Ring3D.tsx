"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GoldTorus({
  radius,
  tube,
  speed,
  mouse,
  position = [0, 0, 0],
}: {
  radius: number;
  tube: number;
  speed: number;
  mouse: { x: number; y: number };
  position?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseRot = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x =
      baseRot + Math.sin(t * 0.15) * 0.15 + mouse.y * 0.3;
    meshRef.current.rotation.y += speed * 0.008;
    meshRef.current.rotation.z = mouse.x * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.3 + baseRot) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, tube, 48, 128]} />
      <meshStandardMaterial
        color="#c9a86a"
        metalness={0.95}
        roughness={0.15}
        emissive="#8a6e3e"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function Scene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 10]} intensity={2} color="#fff5e6" />
      <pointLight position={[-6, -4, 4]} intensity={0.8} color="#c9a86a" />
      <pointLight position={[0, -8, 2]} intensity={0.4} color="#8a6e3e" />
      <GoldTorus radius={2.0} tube={0.045} speed={0.3} mouse={mouse} />
      <GoldTorus radius={2.45} tube={0.03} speed={-0.2} mouse={mouse} />
      <GoldTorus radius={1.55} tube={0.035} speed={0.45} mouse={mouse} />
    </>
  );
}

export function Ring3D({
  mouse,
  className,
}: {
  mouse: { x: number; y: number };
  className?: string;
}) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
