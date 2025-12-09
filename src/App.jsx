import React from 'react'
import { Navbar, Hero, About, Experience, Tech, Works, Contact } from './components'
import { StarBackground } from './components/StarBackground'

const App = () => {
  return (
    <div className="relative z-0 bg-primary">
      
        {/* <StarBackground /> */}
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
  )
}

export default App
