import React, { useState } from "react";
import { aboutContent } from "../constants";
import { StarBackground } from "../components/StarBackground.jsx";

const styles = {
  sectionHeadText: "text-5xl md:text-6xl font-black",
  sectionSubText: "text-lg md:text-xl leading-relaxed"
};

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12; // smaller tilt
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMousePosition({ x, y });
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex items-center mx-auto justify-center px-6 py-16">
      <StarBackground />

      <div className="relative max-w-6xl w-full">
        {/* Title */}
        <div className="text-center mb-16" style={{ animation: "fadeInDown 0.9s ease-out both" }}>
          <h2 className={`${styles.sectionHeadText} font-semibold mb-4 text-[#915eff]`}>
            {aboutContent.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image Section */}
          <div
            className="flex justify-center relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{ animation: "slideInLeft 0.9s ease-out both" }}
          >
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Outer rotating ring */}
              <div
                className="absolute w-full h-full rounded-full border-2 border-[#915eff]/30"
                style={{
                  animation: "spin 28s linear infinite",
                  top: 0,
                  left: 0,
                }}
              />

              {/* Middle pulsing ring */}
              <div
                className="absolute w-[90%] h-[90%] rounded-full border-2 border-[#915eff]/50"
                style={{
                  animation: "pulse-ring 3s ease-in-out infinite",
                  top: "5%",
                  left: "5%",
                }}
              />

              {/* Glow background */}
              <div
                className="absolute w-full h-full rounded-full opacity-30 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(145,94,255,0.4) 0%, transparent 60%)",
                  transition: "transform 0.45s ease",
                  transform: isHovered ? "scale(1.18)" : "scale(1)",
                }}
              />

              {/* Orbiting particles - position them at center and let orbit keyframe handle rotation */}
              {isHovered &&
                [0, 72, 144, 216, 288].map((angle, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-[#915eff] pointer-events-none"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 0",
                      // each particle uses same animation but different delays for a spread
                      animation: `orbit 3.6s linear infinite ${i * 0.12}s`,
                      boxShadow: "0 0 10px #915eff",
                    }}
                  />
                ))}

              {/* Profile Image (the interactive element) */}
              <div
                className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
                style={{
                  transform: isHovered
                    ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.05)`
                    : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
                  transition: "transform 0.25s ease",
                  boxShadow: isHovered ? "0 20px 60px rgba(145,94,255,0.55)" : "0 10px 40px rgba(145,94,255,0.18)",
                }}
              >
                <img
                  src={aboutContent.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />

                {/* subtle overlay gradient */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(145,94,255,0.12), transparent 60%)",
                    opacity: isHovered ? 1 : 0,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="text-white flex flex-col justify-center space-y-6" style={{ animation: "slideInRight 0.9s ease-out both" }}>
            <div className="space-y-4">
              {aboutContent.description.map((text, i) => (
                <p key={i} className={`${styles.sectionSubText} text-gray-300 leading-relaxed`}>
                  {text}
                </p>
              ))}
            </div>

            {/* Stats/Highlights */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {aboutContent.stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 bg-[#915eff]/10 rounded-xl border border-[#915eff]/30 hover:bg-[#915eff]/20 hover:border-[#915eff]/60 transition-all duration-300 cursor-pointer"
                  style={{
                    animation: `scaleIn 0.5s ease-out ${i * 0.08}s both`,
                    animationName: "scaleIn, statPop",
                  }}
                >
                  <div className="text-3xl font-bold text-[#915eff] mb-1 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
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
