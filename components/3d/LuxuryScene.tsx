"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

const marble = {
  color: "#efe6d6",
  roughness: 0.18,
  metalness: 0.04,
  clearcoat: 0.35,
  clearcoatRoughness: 0.28,
} as const;

const brass = {
  color: "#b08d57",
  roughness: 0.22,
  metalness: 0.88,
} as const;

function MarblePillar() {
  const ref = useRef<Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, -0.1, 0]} castShadow>
      <cylinderGeometry args={[0.52, 0.6, 2.35, 64]} />
      <meshPhysicalMaterial {...marble} />
    </mesh>
  );
}

function Scales() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.12;
    ref.current.position.y = 1.32 + Math.sin(state.clock.elapsedTime * 0.55) * 0.035;
  });
  return (
    <group ref={ref} position={[0, 1.32, 0]}>
      <mesh>
        <cylinderGeometry args={[0.028, 0.028, 0.68, 16]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 1.05, 16]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      <mesh position={[-0.5, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.16, 0.035, 32]} />
        <meshStandardMaterial color="#d9c7a3" metalness={0.45} roughness={0.32} />
      </mesh>
      <mesh position={[0.5, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.16, 0.035, 32]} />
        <meshStandardMaterial color="#d9c7a3" metalness={0.45} roughness={0.32} />
      </mesh>
    </group>
  );
}

function Books() {
  return (
    <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.2}>
      <group position={[-1.5, -0.38, 0.32]} rotation={[0.08, 0.38, 0.04]}>
        <mesh>
          <boxGeometry args={[0.55, 0.12, 0.38]} />
          <meshStandardMaterial color="#5e4633" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <boxGeometry args={[0.52, 0.1, 0.36]} />
          <meshStandardMaterial color="#214032" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.5, 0.08, 0.34]} />
          <meshStandardMaterial color="#12324a" roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function PenSealPapers() {
  return (
    <>
      <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh position={[1.42, 0.18, 0.18]} rotation={[0.4, 0.2, -0.8]}>
          <cylinderGeometry args={[0.022, 0.018, 0.68, 14]} />
          <meshStandardMaterial color="#2a2927" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[1.58, -0.08, 0.3]} rotation={[0.4, 0.2, -0.8]}>
          <coneGeometry args={[0.028, 0.11, 12]} />
          <meshStandardMaterial {...brass} />
        </mesh>
      </Float>
      <Float speed={0.55} floatIntensity={0.18}>
        <mesh position={[1.12, -0.52, 0.52]} rotation={[Math.PI / 2, 0, 0.2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.045, 40]} />
          <meshStandardMaterial color="#6e2b2b" roughness={0.42} />
        </mesh>
      </Float>
      <mesh position={[0.82, -0.7, 0.12]} rotation={[-0.48, 0.28, 0.08]}>
        <boxGeometry args={[0.46, 0.01, 0.32]} />
        <meshStandardMaterial color="#f7f1e6" roughness={0.72} />
      </mesh>
      <mesh position={[0.9, -0.68, 0.08]} rotation={[-0.4, 0.18, 0.12]}>
        <boxGeometry args={[0.42, 0.01, 0.3]} />
        <meshStandardMaterial color="#fffaf3" roughness={0.7} />
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.05} color="#fff6ea" castShadow />
      <pointLight position={[-3, 2, 2]} intensity={0.3} color="#b08d57" />
      <Sparkles count={28} scale={5.5} size={1.1} speed={0.22} opacity={0.35} color="#b08d57" />
      <MarblePillar />
      <Scales />
      <Books />
      <PenSealPapers />
      <ContactShadows position={[0, -1.32, 0]} opacity={0.32} blur={2.6} scale={8} />
      <Environment preset="apartment" environmentIntensity={0.5} />
    </>
  );
}

export function LuxuryScene({ compact = false }: { compact?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className={compact ? "relative h-full min-h-[380px] w-full" : "relative h-[420px] w-full md:h-[560px]"}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0.35, compact ? 4.8 : 5.2], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
        frameloop={visible ? "always" : "demand"}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
