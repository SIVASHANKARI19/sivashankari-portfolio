import React, { useState, useRef } from "react";
import { StarBackground } from "../components/StarBackground.jsx";
import { projects } from "../constants";
import {handleScroll,scroll} from '../utils/function';

const styles = {
  sectionHeadText: "text-5xl md:text-6xl font-black",
  sectionSubText: "text-lg md:text-xl leading-relaxed",
};

const Works = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center px-6 py-16">
      <StarBackground />

      <div className="relative max-w-7xl w-full">
        {/* Title */}
        <div
          className="text-center mb-16"
          style={{ animation: "fadeInDown 0.9s ease-out both" }}
        >
          <h2
            className={`${styles.sectionHeadText} font-semibold mb-4 text-[#915eff]`}
          >
            My Work
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent mx-auto" />
        </div>
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-[#915eff]/20 hover:bg-[#915eff]/40 border border-[#915eff]/50 rounded-full transition-all duration-300 backdrop-blur-sm group"
              style={{ animation: "fadeIn 0.3s ease-out" }}
            >
              <svg
                className="w-6 h-6 text-[#915eff] group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-[#915eff]/20 hover:bg-[#915eff]/40 border border-[#915eff]/50 rounded-full transition-all duration-300 backdrop-blur-sm group"
              style={{ animation: "fadeIn 0.3s ease-out" }}
            >
              <svg
                className="w-6 h-6 text-[#915eff] group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 scrollbar-custom"
            onScroll={handleScroll}
          >
            <div className="flex gap-8 min-w-min">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="relative group flex-shrink-0 w-[350px] md:w-[400px]"
                  style={{
                    animation: `slideUp 0.8s ease-out ${index * 0.15}s both`,
                  }}
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Container */}
                  <div
                    className="relative bg-gradient-to-br from-[#1a1a1a] to-black border border-[#915eff]/30 rounded-2xl p-8 h-full overflow-hidden transition-all duration-500"
                    style={{
                      transform:
                        hoveredCard === project.id
                          ? "translateY(-10px)"
                          : "translateY(0)",
                      boxShadow:
                        hoveredCard === project.id
                          ? "0 20px 60px rgba(145,94,255,0.4)"
                          : "0 10px 30px rgba(145,94,255,0.1)",
                    }}
                  >
                    {/* Animated background glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(145,94,255,0.15) 0%, transparent 70%)",
                      }}
                    />

                    {/* Floating particles on hover */}
                    {hoveredCard === project.id && (
                      <>
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-[#915eff] rounded-full pointer-events-none"
                            style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              animation: `float ${
                                2 + Math.random() * 2
                              }s ease-in-out infinite`,
                              animationDelay: `${Math.random() * 2}s`,
                              opacity: 0.6,
                            }}
                          />
                        ))}
                      </>
                    )}

                    {/* Project Number Badge */}
                    <div className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full bg-[#915eff]/20 border border-[#915eff]/50"
                        style={{
                          animation:
                            hoveredCard === project.id
                              ? "pulse-ring 2s ease-in-out infinite"
                              : "none",
                        }}
                      />
                      <span className="relative text-[#915eff] font-bold text-lg">
                        {String(project.id).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Project Icon/Graphic */}
                      <div className="mb-6 relative w-16 h-16">
                        <div
                          className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#915eff]/30 to-[#915eff]/10 border border-[#915eff]/40"
                          style={{
                            transform:
                              hoveredCard === project.id
                                ? "rotate(12deg) scale(1.1)"
                                : "rotate(0deg) scale(1)",
                            transition:
                              "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-lg bg-[#915eff]/60" />
                        </div>
                      </div>

                      {/* Project Name */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#915eff] transition-colors duration-300">
                        {project.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium text-[#915eff] bg-[#915eff]/10 border border-[#915eff]/30 rounded-full hover:bg-[#915eff]/20 transition-colors duration-300"
                            style={{
                              animation:
                                hoveredCard === project.id
                                  ? `tagPulse 0.5s ease-out ${i * 0.1}s both`
                                  : "none",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Decorative line */}
                      <div
                        className="mt-6 h-1 bg-gradient-to-r from-[#915eff]/50 to-transparent rounded-full transition-all duration-500"
                        style={{
                          width: hoveredCard === project.id ? "100%" : "0%",
                        }}
                      />
                    </div>
                  </div>

                  {/* Outer glow ring on hover */}
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(145,94,255,0.3), transparent)",
                      filter: "blur(20px)",
                      zIndex: -1,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stats or call to action */}
        <div
          className="mt-20 text-center"
          style={{ animation: "fadeIn 1.2s ease-out 0.8s both" }}
        >
          <div className="inline-block px-8 py-4 bg-[#915eff]/10 border border-[#915eff]/30 rounded-2xl">
            <p className="text-gray-300 text-lg">
              <span className="text-[#915eff] font-bold">3</span> Real-World
              Projects •
              <span className="text-[#915eff] font-bold">
                {" "}
                Production Ready
              </span>{" "}
              •
              <span className="text-[#915eff] font-bold">
                {" "}
                Scalable Solutions
              </span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Custom scrollbar styling */
        .scrollbar-custom::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(26, 26, 26, 0.5);
          border-radius: 10px;
          margin: 0 100px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(
            90deg,
            rgba(145, 94, 255, 0.6),
            rgba(145, 94, 255, 0.8)
          );
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            90deg,
            rgba(145, 94, 255, 0.8),
            rgba(145, 94, 255, 1)
          );
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
};

export default Works;
