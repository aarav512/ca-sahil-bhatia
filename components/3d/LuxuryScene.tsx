"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

const marble = {
  color: "#efe6d6",
  roughness: 0.16,
  metalness: 0.05,
  clearcoat: 0.42,
  clearcoatRoughness: 0.24,
} as const;

const brass = {
  color: "#b08d57",
  roughness: 0.2,
  metalness: 0.9,
} as const;

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x += (Math.sin(t * 0.12) * 0.18 - camera.position.x) * 0.02;
    camera.position.y += (0.35 + Math.sin(t * 0.08) * 0.06 - camera.position.y) * 0.02;
    camera.lookAt(0, 0.15, 0);
  });
  return null;
}

function MarblePillars() {
  const a = useRef<Mesh>(null);
  const b = useRef<Mesh>(null);
  useFrame((_, d) => {
    if (a.current) a.current.rotation.y += d * 0.07;
    if (b.current) b.current.rotation.y -= d * 0.05;
  });
  return (
    <>
      <mesh ref={a} position={[0, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.58, 2.3, 64]} />
        <meshPhysicalMaterial {...marble} />
      </mesh>
      <mesh ref={b} position={[-1.85, -0.35, -0.55]} scale={0.55} castShadow>
        <cylinderGeometry args={[0.5, 0.56, 2.1, 48]} />
        <meshPhysicalMaterial {...marble} />
      </mesh>
    </>
  );
}

function Scales() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.14;
    ref.current.position.y = 1.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
  });
  return (
    <group ref={ref} position={[0, 1.3, 0]}>
      <mesh>
        <cylinderGeometry args={[0.028, 0.028, 0.68, 16]} />
        <meshStandardMaterial {...brass} emissive="#b08d57" emissiveIntensity={0.12} />
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
    <Float speed={0.65} rotationIntensity={0.1} floatIntensity={0.18}>
      <group position={[-1.45, -0.32, 0.38]} rotation={[0.08, 0.38, 0.04]}>
        <mesh>
          <boxGeometry args={[0.55, 0.12, 0.38]} />
          <meshStandardMaterial color="#5e4633" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <boxGeometry args={[0.52, 0.1, 0.36]} />
          <meshStandardMaterial color="#284435" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.5, 0.08, 0.34]} />
          <meshStandardMaterial color="#17324d" roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function PenSealPapersRing() {
  return (
    <>
      <Float speed={0.85} rotationIntensity={0.14} floatIntensity={0.22}>
        <mesh position={[1.42, 0.2, 0.18]} rotation={[0.4, 0.2, -0.8]}>
          <cylinderGeometry args={[0.022, 0.018, 0.68, 14]} />
          <meshStandardMaterial color="#2a2927" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[1.58, -0.06, 0.3]} rotation={[0.4, 0.2, -0.8]}>
          <coneGeometry args={[0.028, 0.11, 12]} />
          <meshStandardMaterial {...brass} />
        </mesh>
      </Float>
      <Float speed={0.5} floatIntensity={0.16}>
        <mesh position={[1.12, -0.5, 0.52]} rotation={[Math.PI / 2, 0, 0.2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.045, 40]} />
          <meshStandardMaterial color="#6e2b2b" roughness={0.42} />
        </mesh>
      </Float>
      <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.12}>
        <mesh position={[1.7, 0.55, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.018, 16, 48]} />
          <meshStandardMaterial {...brass} emissive="#c8a96b" emissiveIntensity={0.18} />
        </mesh>
      </Float>
      <mesh position={[0.82, -0.68, 0.12]} rotation={[-0.48, 0.28, 0.08]}>
        <boxGeometry args={[0.46, 0.01, 0.32]} />
        <meshStandardMaterial color="#f7f1e6" roughness={0.72} />
      </mesh>
      <mesh position={[0.9, -0.66, 0.08]} rotation={[-0.4, 0.18, 0.12]}>
        <boxGeometry args={[0.42, 0.01, 0.3]} />
        <meshStandardMaterial color="#fffaf3" roughness={0.7} />
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.48} />
      <hemisphereLight args={["#fff6ea", "#cbbda6", 0.35]} />
      <spotLight
        position={[3.5, 7, 2]}
        angle={0.45}
        penumbra={0.8}
        intensity={1.35}
        color="#fff4dc"
        castShadow
      />
      <pointLight position={[-3, 2, 2]} intensity={0.32} color="#c8a96b" />
      <Sparkles count={36} scale={6} size={1.05} speed={0.18} opacity={0.32} color="#c8a96b" />
      <MarblePillars />
      <Scales />
      <Books />
      <PenSealPapersRing />
      <ContactShadows position={[0, -1.32, 0]} opacity={0.3} blur={2.8} scale={8} />
      <Environment preset="apartment" environmentIntensity={0.48} />
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
      className={compact ? "relative h-full min-h-[380px] w-full" : "relative h-[440px] w-full md:h-[580px]"}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0.35, compact ? 4.7 : 5.1], fov: 32 }}
        dpr={[1, 1.4]}
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
