import React from "react";
import { motion } from "framer-motion";
import { styles } from "../style";
import { ComputersCanvas } from "./canvas";
import { section } from "framer-motion/m";

const Hero = () => {
  return (
    <section className="relative w-full h-screen h-[100dvh] mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]"></div>
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi , I'm <span className="text-[#915eff]">Sivashankari</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I'm a Frontend Developer <br /> and Passionate about AI & ML{" "}
          </p>
        </div>
      </div>

      {/* Direct child of <section>, which has a definite w-full/h-screen size,
          so the Canvas's internal width:100%/height:100% resolves reliably
          at every viewport instead of collapsing as an unsized flex item. */}
      <ComputersCanvas />
    </section>
  );
};

export default Hero;