import React, { useState } from "react";
import { aboutContent } from "../constants";
import StarBackground from "./StarBackground.jsx";

const styles = {
  sectionHeadText: "text-5xl md:text-6xl font-black",
  sectionSubText: "text-lg md:text-xl leading-relaxed"
};

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center px-6 py-16">
      
      <StarBackground />

      <div className="relative z-20 max-w-6xl w-full">
        
        {/* Title */}
        <div className="text-center mb-16" style={{ animation: "fadeInDown 1s ease-out" }}>
          <h2 className={`${styles.sectionHeadText} font-semibold mb-4 text-[#915eff]`}>
            {aboutContent.title}
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Image Section */}
          <div
            className="flex justify-center relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{ animation: "slideInLeft 1s ease-out" }}
          >
            <div className="relative w-80 h-80 flex items-center justify-center">

              {/* Rings + effects unchanged */}

              <div
                className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
                style={{
                  transform: isHovered 
                    ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.05)`
                    : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
                  transition: "transform 0.3s ease",
                }}
              >
                <img
                  src={aboutContent.profileImage}
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="text-white flex flex-col justify-center space-y-6" style={{ animation: "slideInRight 1s ease-out" }}>

            {/* Description paragraphs */}
            <div className="space-y-4">
              {aboutContent.description.map((text, i) => (
                <p key={i} className={`${styles.sectionSubText} text-gray-300 leading-relaxed`}>
                  {text}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {aboutContent.stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 bg-[#915eff]/10 rounded-xl border border-[#915eff]/30 hover:bg-[#915eff]/20 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-[#915eff] mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
