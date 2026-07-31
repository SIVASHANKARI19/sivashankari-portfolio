import React, { Suspense, lazy } from "react";
import { Navbar, Hero } from "./components";
import { StarBackground } from "./components/StarBackground";

// Below-the-fold sections are lazy-loaded: they aren't needed for first paint,
// so splitting them out of the initial bundle speeds up Time-to-Interactive,
// especially on mobile/slower connections.
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const Contact = lazy(() => import("./components/Contact"));

const SectionFallback = () => (
  <div className="w-full min-h-[40vh] flex items-center justify-center">
    <span className="text-secondary text-sm">Loading…</span>
  </div>
);

const App = () => {
  return (
    <div className="relative bg-black min-h-screen">
      {/* Single StarBackground for entire app - now with higher z-index */}
      <StarBackground />

      {/* All content with higher z-index */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>

        <Suspense fallback={<SectionFallback />}>
          <section id="about">
            <About />
          </section>

          <section id="experience">
            <Experience />
          </section>

          <section id="tech">
            <Tech />
          </section>

          <section id="work">
            <Works />
          </section>

          <section id="contact">
            <Contact />
          </section>
        </Suspense>
      </div>
    </div>
  );
};

export default App;