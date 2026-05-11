import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, ChevronRight, Download, Briefcase, Code, CheckCircle2 } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

const stats = [
  { label: 'Years Experience', value: '2.0+', icon: Briefcase },
  { label: 'Projects Completed', value: '10+', icon: CheckCircle2 },
  { label: 'Technology Stack', value: '15+', icon: Code },
];

const themeGradients = {
  default: {
    gradient: "from-blue-400 via-purple-500 to-cyan-400",
    shadow: "drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
  },
  green: {
    gradient: "from-emerald-400 via-green-500 to-teal-400",
    shadow: "drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
  },
  sunset: {
    gradient: "from-orange-400 via-red-500 to-pink-400",
    shadow: "drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]"
  }
};

const Hero = ({ currentTheme = 'default' }) => {
  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Floating Parallax Transformations
  const floatX1 = useTransform(smoothX, [-1, 1], [-40, 40]);
  const floatY1 = useTransform(smoothY, [-1, 1], [-40, 40]);
  const floatX2 = useTransform(smoothX, [-1, 1], [40, -40]);
  const floatY2 = useTransform(smoothY, [-1, 1], [40, -40]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-32 px-6 overflow-hidden bg-[#030712]"
      onMouseMove={handleMouseMove}
    >
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Glow Blobs */}
        <motion.div
          style={{ x: floatX1, y: floatY1 }}
          className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"
        />
        <motion.div
          style={{ x: floatX2, y: floatY2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"
        />
        <div className="absolute top-[-20%] right-[-10%] w-[35vw] h-[35vw] bg-teal-500/5 rounded-full blur-[100px] animate-pulse delay-500" />

        {/* Floating Particles */}
        <FloatingParticles />
      </div>

      {/* CONTENT CONTAINER - 2 Column Layout */}
      <div className="max-w-7xl mx-auto z-10 relative w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* LEFT COLUMN - Text Content */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Top Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-1.5 text-[10px] font-black tracking-[0.3em] text-white/80 uppercase glass rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="absolute inset-0 blur-[80px] bg-primary/20 opacity-30 -z-10" />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-white">
              Hi, I'm <br />
              <span className={`bg-gradient-to-r ${themeGradients[currentTheme]?.gradient || themeGradients.default.gradient} bg-clip-text text-transparent animate-gradient-shift [background-size:200%] ${themeGradients[currentTheme]?.shadow || themeGradients.default.shadow}`}>
                Mahtab Alam
              </span>
            </h1>
          </motion.div>

          {/* Dynamic Role & Tagline */}
          <motion.div variants={itemVariants} className="mb-8 space-y-4 w-full">
            <div className="text-2xl md:text-3xl text-gray-400 font-medium flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span>I specialize in</span>
              <span className="text-white font-bold inline-block min-w-[200px] text-left">
                <Typewriter
                  words={["Software Engineer", "PHP Developer", "Full-Stack Developer"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </div>
            <p className="text-gray-500 text-base md:text-lg font-medium max-w-xl mx-auto lg:mx-0">
              Building scalable fintech & high-performance web applications
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 py-3.5 glass border border-white/10 text-gray-300 rounded-full font-bold flex items-center gap-2 transition-all duration-300 ease-in-out hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 py-3.5 bg-primary text-white rounded-full font-bold flex items-center gap-2 overflow-hidden shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 ease-in-out"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Download Resume <Download size={20} className="group-hover:translate-y-0.5 transition-transform duration-300" />
              </span>
            </motion.a>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-8 lg:mb-0">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glass p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden flex flex-col items-center text-center"
              >
                <stat.icon size={22} className="mb-2 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>


        </motion.div>

        {/* RIGHT COLUMN - Image Section */}
        <motion.div
          className="relative flex flex-col justify-center items-center lg:items-end mt-10 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 80 }}
        >
          {/* Image Container with subtle floating animation */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-md aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden group shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10 opacity-60" />
            <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/40 group-hover:border-primary/80 transition-colors duration-500 z-20 pointer-events-none" />

            <motion.img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
              alt="Mahtab Alam"
              className="w-full h-full object-cover rounded-[2rem]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />

            {/* Floating Glass Card Overlay */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 right-6 z-30 glass p-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl min-w-[200px]"
            >
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-sm">Software Engineer</span>
                <span className="text-primary text-xs font-semibold">Nov 2023 - Present</span>
                <span className="text-gray-400 text-xs">Syscom Softech</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Moved Social Icons */}
          <div className="flex justify-center gap-6 mt-8 z-20 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-md">
            <SocialIcon href="https://github.com/yourusername" icon={<Github size={24} />} />
            <SocialIcon href="https://linkedin.com/in/yourusername" icon={<Linkedin size={24} />} />
          </div>

          {/* Decorative Glow Behind Image */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none" />
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 6s ease infinite;
        }
      `}} />
    </section>
  );
};

const SocialIcon = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -5 }}
    className="p-3 glass rounded-full text-gray-400 border border-white/10 bg-white/5 transition-all duration-300 ease-in-out hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:shadow-xl hover:shadow-primary/30"
  >
    {icon}
  </motion.a>
);

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: Math.random() * 0.3,
            scale: Math.random() * 0.5 + 0.5,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%"
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [null, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 20
          }}
          className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

export default Hero;
