import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Utility to detect mobile
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

export const FloatingSphere = ({ mousePosition }) => {
  const sphereRef = useRef();
  const particlesRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      // Only do mouse tracking on desktop
      if (!isMobile) {
        sphereRef.current.position.x = THREE.MathUtils.lerp(
          sphereRef.current.position.x,
          (mousePosition.x / window.innerWidth - 0.5) * 2,
          0.05
        );
        sphereRef.current.position.y = THREE.MathUtils.lerp(
          sphereRef.current.position.y,
          -(mousePosition.y / window.innerHeight - 0.5) * 2,
          0.05
        );
      }
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  // Reduce particles on mobile (300 vs 1000)
  const particleCount = isMobile ? 300 : 1000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 3 + Math.random() * 2;
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#915eff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#915eff" />

      <mesh ref={sphereRef}>
        {/* Lower geometry quality on mobile (16 vs 32 segments) */}
        <sphereGeometry args={[1, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
        <meshStandardMaterial
          color="#915eff"
          emissive="#915eff"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          wireframe
        />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.03 : 0.02}
          color="#915eff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const BackgroundCanvas = ({ mousePosition }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={isMobile ? [1, 1] : [1, 2]} // Lower pixel ratio on mobile
        gl={{
          antialias: !isMobile, // Disable antialiasing on mobile
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance"
        }}
        performance={{ min: 0.5 }} // Maintain minimum 30fps
      >
        <FloatingSphere mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};