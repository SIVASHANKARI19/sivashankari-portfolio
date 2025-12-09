import React, { useRef, useEffect, useState } from "react";
import { Star, Code, Rocket, Work } from "@mui/icons-material";
import { experienceTimeline } from "../constants";
import { StarBackground, FloatingOrb } from "../components/StarBackground.jsx";

const styles = {
  sectionHeadText: "text-5xl md:text-6xl font-black text-center"
};


const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col items-center px-6 py-16 overflow-hidden">
      <StarBackground />
      
      <div className="absolute top-20 left-10">
        <FloatingOrb delay={0} />
      </div>
      <div className="absolute bottom-40 right-20">
        <FloatingOrb delay={2} />
      </div>

      <div
        className="relative "
        style={{
          animation: 'fadeInDown 1s ease-out',
        }}
      >
        <h2 className={`${styles.sectionHeadText} font-semibold mb-4 text-[#915eff]`}>
          Experience
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent mx-auto mb-16" />
      </div>

      <div ref={containerRef} className="flex flex-col gap-20 max-w-5xl w-full relative ">
        {experienceTimeline.map((item, index) => {
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
              {index !== experienceTimeline.length - 1 && (
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
                                    <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(145, 94, 255, 0.1) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div className="relative ">
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
    </section>
  );
};

export default Experience;