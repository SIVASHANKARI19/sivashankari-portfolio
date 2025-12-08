import React, { useRef, useEffect } from "react";
import * as THREE from "three";
 const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 800;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({ 
      color: 0x915eff, 
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0002;
      stars.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default StarBackground