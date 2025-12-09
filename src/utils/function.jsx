import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";



export const RotatingCard = ({ texture, isHovered }) => {
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
export const TechCanvas = ({ icon, isHovered }) => {
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
export const TechCard = ({ technology, index }) => {
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




  export const AnimatedInput = ({ label, type, name, value, onChange, required, isTextarea = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
  
    useEffect(() => {
      setHasValue(value.length > 0);
    }, [value]);
  
    const InputComponent = isTextarea ? motion.textarea : motion.input;
  
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-600  rounded-xl opacity-0 blur group-hover:opacity-50 transition-opacity"
          animate={isFocused ? { opacity: 0.7 } : {}}
        />
  
        <div className="relative">
          <InputComponent
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full bg-black/50 backdrop-blur-sm border-2 rounded-xl px-6 py-4 text-white placeholder-transparent focus:outline-none transition-all ${
              isFocused ? 'border-[#915eff] shadow-lg shadow-purple-500/50' : 'border-purple-900/50'
            } ${isTextarea ? 'min-h-[150px] resize-none' : ''}`}
            placeholder={label}
            rows={isTextarea ? 6 : undefined}
            whileFocus={{ scale: 1.02 }}
          />
          
          <motion.label
            animate={{
              y: isFocused || hasValue ? -40 : 0,
              scale: isFocused || hasValue ? 0.85 : 1,
              color: isFocused ? '#915eff' : '#9ca3af',
            }}
            className="absolute left-6 top-4 pointer-events-none font-medium"
          >
            {label}
          </motion.label>
  
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 "
            initial={{ width: '0%' }}
            animate={{ width: isFocused ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    );
  };
  