import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { useIsMobile } from "../../utils/useIsMobile";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight 
        intensity={isMobile ? 0.1 : 0.15} 
        groundColor="black" 
      />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={isMobile ? 0.5 : 1}
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? 512 : 1024}
      />
      <pointLight intensity={isMobile ? 0.5 : 1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const isMobile = useIsMobile();

  return (
    <Canvas
      frameloop="demand"
      shadows={!isMobile} // Disable shadows on mobile
      dpr={isMobile ? [1, 1] : [1, 2]} // Lower pixel ratio on mobile
      camera={{ position: [20, 3, 5], fov: isMobile ? 35 : 25 }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: !isMobile, // Disable antialiasing on mobile
        powerPreference: isMobile ? "low-power" : "high-performance"
      }}
      performance={{ min: 0.5 }} // Maintain minimum 30fps
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={!isMobile} // Disable damping on mobile for better performance
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;