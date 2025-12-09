import  { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../style";
import { BackgroundCanvas } from "./canvas/FloatingSphere";
import {AnimatedInput} from "../utils/function";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // EmailJS configuration - Replace with your credentials
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Your Name",
          from_email: form.email,
          to_email: "sivashankari19115@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          setForm({ name: "", email: "", message: "" });
          
          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

 
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">

      {/* ------------------ HEADING ------------------ */}
      <div className="text-center pt-24" style={{ animation: "fadeInDown 1s ease-out" }}>
        <h2 className={`${styles.sectionHeadText} font-semibold mb-4 text-[#915eff]`}>
          Contact
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent mx-auto mb-16" />
      </div>

      {/* Background Grid */}
      <BackgroundCanvas mousePosition={mousePosition} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(145,94,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(145,94,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* ------------------ MOUSE FOLLOW CIRCLES ------------------ */}
      <motion.div
        className="fixed w-4 h-4 bg-[#915eff] rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed w-8 h-8 border-2 border-[#915eff] rounded-full pointer-events-none z-50"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* ------------------ MAIN GRID ------------------ */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT SIDE - CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            {[
              { icon: "📧", label: "Email", value: "sivashankari19115@gmail.com" },
              { icon: "📍", label: "Location", value: "Erode, Tamil Nadu, IN" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 bg-black/30 backdrop-blur-sm border border-[#915eff]/30 rounded-xl p-4 hover:border-[#915eff]/50 transition-all"
              >
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE - FORM */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-[#915eff] rounded-3xl opacity-20 blur-2xl"
            animate={{
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative bg-black/40 backdrop-blur-xl border border-[#915eff]/40 rounded-3xl p-8 shadow-2xl">
            <div className="space-y-6">

              <AnimatedInput label="Your Name" type="text" name="name" value={form.name} onChange={handleChange} required />

              <AnimatedInput label="Your Email" type="email" name="email" value={form.email} onChange={handleChange} required />

              <AnimatedInput label="Your Message" name="message" value={form.message} onChange={handleChange} required isTextarea />

              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 text-white font-bold py-4 rounded-xl relative overflow-hidden group disabled:opacity-50"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                <span className="relative z-10">
                  {loading ? "Sending..." : "Send Message"}
                </span>
              </motion.button>
            </div>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mt-6 bg-green-500/20 border border-green-500 rounded-xl p-4 text-center"
              >
                <p className="text-green-400 font-semibold">Message sent successfully!</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* FLOATING PARTICLES */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
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

export default Contact;
