import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export const StarBackground = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Prevent multiple renderers
    if (rendererRef.current) return;

    let starGeometry, starMaterial, stars;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true 
    });
    rendererRef.current = renderer;
    
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Stars
    starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    starMaterial = new THREE.PointsMaterial({
      color: 0x915eff,
      size: 0.05,
      transparent: true,
      opacity: 0.9,
    });

    stars = new THREE.Points(starGeometry, starMaterial);
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
      
      if (starGeometry) starGeometry.dispose();
      if (starMaterial) starMaterial.dispose();
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        rendererRef.current = null;
      }
      
      sceneRef.current = null;
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
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