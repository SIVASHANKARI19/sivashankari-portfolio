import React, { useRef, useEffect, useState } from "react";
import { Star, Code, Rocket, Work } from "@mui/icons-material";
import * as THREE from "three";

const styles = {
  sectionHeadText: "text-5xl md:text-6xl font-black text-center"
};

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

const timeline = [
  {
    title: "Full-Stack Development Workshop — Crayon'd, Chennai",
    period: "2022 – 2023",
    description: [
      "Gained hands-on experience in React.js, Next.js, and Git workflows.",
      "Built scalable applications following industry development patterns.",
      "Collaborated on real-time product features improving teamwork.",
    ],
    skills: ["React", "Next.js", "Git"],
    icon: Code,
  },
  {
    title: "Student Special Group (SSG) Member",
    period: "2023 – 2027",
    description: [
      "Built the S7 Project — an event management platform for students & admins.",
      "Developed a real-time code editor for HTML/CSS/JS using React.",
      "Worked on UI components, logic handling, and deployment tasks.",
    ],
    skills: ["React", "Frontend Dev", "Project Development"],
    icon: Rocket,
  },
];

const FloatingOrb = ({ delay = 0 }) => {
  return (
    <div
      className="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
      style={{
        background: 'radial-gradient(circle, #915eff 0%, transparent 70%)',
        animation: `float 6s ease-in-out ${delay}s infinite`,
      }}
    />
  );
};

const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col items-center px-6 py-16 overflow-hidden">
      <StarBackground />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10">
        <FloatingOrb delay={0} />
      </div>
      <div className="absolute bottom-40 right-20">
        <FloatingOrb delay={2} />
      </div>

      <div
        className="relative z-10"
        style={{
          animation: 'fadeInDown 1s ease-out',
        }}
      >
        <h2 className={`${styles.sectionHeadText} font-semibold mb-4 text-[#915eff]`}>
          Experience
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent mx-auto mb-16" />
      </div>

      <div ref={containerRef} className="flex flex-col gap-20 max-w-5xl w-full relative z-10">
        {timeline.map((item, index) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`,
              }}
            >
              {/* Connecting Line with Glow */}
              {index !== timeline.length - 1 && (
                <div className="absolute left-1/2 top-full w-0.5 h-20 -translate-x-1/2 mt-4">
                  <div 
                    className="w-full h-full bg-gradient-to-b from-[#915eff] to-transparent"
                    style={{
                      boxShadow: isHovered ? '0 0 20px #915eff' : 'none',
                      transition: 'box-shadow 0.3s ease',
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Animated Icon Circle */}
                <div className="relative flex-shrink-0">
                  <div
                    className="absolute inset-0 rounded-full bg-[#915eff] blur-xl"
                    style={{
                      opacity: isHovered ? 0.6 : 0.3,
                      transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                      transition: 'all 0.4s ease',
                    }}
                  />
                  <div
                    className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#915eff] to-[#6d28d9] flex items-center justify-center"
                    style={{
                      transform: isHovered ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                      transition: 'transform 0.6s ease',
                      boxShadow: isHovered ? '0 0 40px rgba(145, 94, 255, 0.8)' : '0 0 20px rgba(145, 94, 255, 0.4)',
                    }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Orbiting Particles */}
                  {isHovered && (
                    <>
                      {[0, 120, 240].map((angle) => (
                        <div
                          key={angle}
                          className="absolute w-2 h-2 bg-[#915eff] rounded-full"
                          style={{
                            top: '50%',
                            left: '50%',
                            animation: `orbit 2s linear infinite`,
                            animationDelay: `${angle / 120}s`,
                            transformOrigin: '0 0',
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>

                {/* Card with 3D Effect */}
                <div
                  className="flex-1 bg-gradient-to-br from-[#1e1e1e] to-[#0a0a0a] rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: isHovered 
                      ? '0 20px 60px rgba(145, 94, 255, 0.4), 0 0 40px rgba(145, 94, 255, 0.2) inset'
                      : '0 10px 30px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.4s ease',
                    border: isHovered ? '1px solid rgba(145, 94, 255, 0.5)' : '1px solid transparent',
                  }}
                >
                  {/* Animated Background Gradient */}
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(145, 94, 255, 0.1) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <div
                      style={{
                        transform: isHovered ? 'translateX(10px)' : 'translateX(0)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        {item.title}
                        <Star 
                          className="w-5 h-5 text-[#915eff]"
                          style={{
                            transform: isHovered ? 'rotate(144deg) scale(1.3)' : 'rotate(0deg) scale(1)',
                            transition: 'transform 0.5s ease',
                          }}
                        />
                      </h3>
                      <p className="text-[#915eff] font-semibold mb-5 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#915eff] rounded-full animate-pulse" />
                        {item.period}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {item.description.map((point, i) => (
                        <li
                          key={i}
                          className="text-gray-300 flex items-start gap-3 group"
                          style={{
                            animation: isHovered ? `slideInRight 0.3s ease-out ${i * 0.1}s both` : 'none',
                          }}
                        >
                          <span className="w-1.5 h-1.5 bg-[#915eff] rounded-full mt-2 group-hover:scale-150 transition-transform" />
                          <span className="flex-1">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill Tags with Hover Effects */}
                    <div className="flex flex-wrap gap-3">
                      {item.skills.map((skill, i) => (
                        <div
                          key={i}
                          className="group relative px-4 py-2 bg-[#915eff]/10 rounded-lg border border-[#915eff]/30 hover:bg-[#915eff]/20 hover:border-[#915eff]/60 transition-all duration-300 cursor-pointer"
                          style={{
                            animation: isHovered ? `scaleIn 0.3s ease-out ${i * 0.1}s both` : 'none',
                          }}
                        >
                          <div className="absolute inset-0 bg-[#915eff]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative flex items-center gap-2 text-[#915eff] font-medium">
                            <Work sx={{ fontSize: 16 }} />
                            {skill}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;