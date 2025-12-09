import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";
import { StarBackground } from "./StarBackground";
import { styles } from "../style";

// 3D Rotating Card with Icon
const RotatingCard = ({ texture, isHovered }) => {
  const meshRef = useRef();
  const particlesRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += isHovered ? 0.03 : 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      if (isHovered) {
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0.5, 0.1);
      } else {
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0, 0.1);
      }
    }

    if (particlesRef.current && isHovered) {
      particlesRef.current.rotation.y += 0.02;
    }
  });

  // Create particle ring
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
  }

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#915eff" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ff1eff" />
      
      {/* Main Card */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
          emissive="#915eff"
          emissiveIntensity={isHovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Icon Plane */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial map={texture} transparent opacity={isHovered ? 1 : 0.8} />
      </mesh>

      {/* Particle Ring */}
      {isHovered && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.05} color="#915eff" transparent opacity={0.8} />
        </points>
      )}
    </group>
  );
};

// 3D Canvas Component
const TechCanvas = ({ icon, isHovered }) => {
  const [texture, setTexture] = useState(null);

  React.useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(icon, setTexture);
  }, [icon]);

  if (!texture) return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <RotatingCard texture={texture} isHovered={isHovered} />
    </Canvas>
  );
};

// Tech Card Component
const TechCard = ({ technology, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-purple-600   rounded-3xl opacity-0 group-hover:opacity-70 blur-xl transition-opacity"
        animate={isHovered ? {
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Card Container */}
      <div className="relative w-40 h-40 bg-gradient-to-br from-purple-900/50 via-black/80 to-purple-950/50 backdrop-blur-md rounded-2xl border border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-300 overflow-hidden shadow-2xl">
        
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <TechCanvas icon={technology.icon} isHovered={isHovered} />
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(45deg, transparent, #915eff, transparent)",
            opacity: 0,
          }}
          animate={isHovered ? { 
            opacity: [0, 0.5, 0],
            rotate: [0, 360],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Tech Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/95 to-transparent backdrop-blur-sm py-3 text-center"
        >
          <p className="text-white font-bold text-sm">{technology.name}</p>
        </motion.div>

        {/* Corner Accent */}
        <motion.div
          className="absolute top-0 right-0 w-16 h-16"
          style={{
            background: "radial-gradient(circle at top right, #915eff, transparent)",
          }}
          animate={isHovered ? {
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Floating Particles */}
      {isHovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, (Math.cos(i * Math.PI / 4) * 60)],
                y: [0, (Math.sin(i * Math.PI / 4) * 60)],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

// Main Tech Component
const Tech = () => {
  const technologies = [
    {
      name: "HTML 5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS 3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <StarBackground />
      {/* Animated Background Orbs */}
      
     

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(145,94,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(145,94,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
 <div
        className="relative "
        style={{
          animation: 'fadeInDown 1s ease-out',
        }}
      >
        <h2 className={`${styles.sectionHeadText} font-semibold mb-4 text-[#915eff]`}>
          My Tech Stack
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent mx-auto mb-16" />
      </div>

      {/* Tech Grid */}
      <div className='relative  flex flex-wrap justify-center gap-8 max-w-6xl'>
        {technologies.map((technology, index) => (
          <TechCard 
            key={technology.name} 
            technology={technology} 
            index={index}
          />
        ))}
      </div>

      {/* Ambient Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Tech;