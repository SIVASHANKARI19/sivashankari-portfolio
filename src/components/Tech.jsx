import { motion } from "framer-motion";
import { StarBackground } from "./StarBackground";
import { styles } from "../style";
import { technologies } from "../constants";
import { TechCard} from "../utils/function";


// Main Tech Component
const Tech = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <StarBackground />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(145,94,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(145,94,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
 <div
        className="relative "
        style={{
          animation: 'fadeInDown 1s ease-out',
        }}
      >
        <h2 className={`${styles.sectionHeadText} font-semibold mb-4 text-[#915eff]`}>
          My Tech Stack
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent mx-auto mb-16" />
      </div>

      {/* Tech Grid */}
      <div className='relative  flex flex-wrap justify-center gap-8 max-w-6xl'>
        {technologies.map((technology, index) => (
          <TechCard 
            key={technology.name} 
            technology={technology} 
            index={index}
          />
        ))}
      </div>

      {/* Ambient Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Tech;