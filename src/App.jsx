import React from "react";
import { Navbar, Hero, About, Experience, Tech, Works, Contact } from "./components";
import { StarBackground } from "./components/StarBackground";

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
      </div>
    </div>
  );
};

export default App;