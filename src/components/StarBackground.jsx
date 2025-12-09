import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export const StarBackground = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    let starGeometry;
    let starMaterial;
    
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      
      renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true,
        antialias: false,
        powerPreference: "low-power"
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.position.z = 5;

      starGeometry = new THREE.BufferGeometry();
      const starCount = 800;
      const positions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
      }

      starGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      starMaterial = new THREE.PointsMaterial({
        color: 0x915eff,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        stars.rotation.x += 0.0002;
        stars.rotation.y += 0.0003;
        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        
        if (renderer) {
          renderer.dispose();
        }
        
        if (starGeometry) {
          starGeometry.dispose();
        }
        
        if (starMaterial) {
          starMaterial.dispose();
        }
      };
    } catch (error) {
      console.error("StarBackground error:", error);
      return () => {
        if (renderer) {
          renderer.dispose();
        }
        if (starGeometry) {
          starGeometry.dispose();
        }
        if (starMaterial) {
          starMaterial.dispose();
        }
      };
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export const FloatingOrb = ({ delay = 0 }) => {
  return (
    <div
      className="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
      style={{
        background: "radial-gradient(circle, #915eff 0%, transparent 70%)",
        animation: `float 6s ease-in-out ${delay}s infinite`,
      }}
    />
  );
};
