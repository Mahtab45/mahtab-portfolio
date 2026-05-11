import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Server, Zap, Brain, CheckCircle2 } from 'lucide-react';

const whatIDo = [
  {
    icon: Server,
    title: 'Scalable Architecture',
    desc: 'Build scalable backend systems'
  },
  {
    icon: Zap,
    title: 'High Performance',
    desc: 'Optimize performance & speed'
  },
  {
    icon: Brain,
    title: 'Problem Solving',
    desc: 'Solve complex business logic'
  }
];

const approaches = [
  'Clean & maintainable code',
  'Problem-solving first mindset',
  'Performance-focused development',
  'Strong collaboration'
];

/* ── Reliable IntersectionObserver hook (threshold: 0 = fires the instant ANY pixel enters viewport) ── */
function useRevealOnEnter() {
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already visible (e.g. section is in view at page load)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      controls.start('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
          observer.disconnect();
        }
      },
      // rootMargin adds a 120px "early trigger" zone above the viewport bottom
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [controls]);

  return { ref, controls };
}

const leftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.12 }
  }
};

const rightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.15, staggerChildren: 0.12 }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const About = () => {
  const { ref: leftRef, controls: leftControls } = useRevealOnEnter();
  const { ref: rightRef, controls: rightControls } = useRevealOnEnter();

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden bg-[#030712]">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] transform-gpu" />
        <div className="absolute bottom-1/4 -left-1/4 w-[50vw] h-[50vw] bg-secondary/5 rounded-full blur-[80px] md:blur-[120px] transform-gpu" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Left Content Section */}
          <motion.div
            ref={leftRef}
            variants={leftVariants}
            initial="hidden"
            animate={leftControls}
            className="flex flex-col"
          >
            {/* Section Label */}
            <motion.span variants={childVariants} className="text-primary/70 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
              Discovery
            </motion.span>

            {/* Heading */}
            <motion.h2 variants={childVariants} className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight">
              About<span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Me</span>
            </motion.h2>

            {/* Description */}
            <motion.p variants={childVariants} className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl">
              I focus on building <span className="text-white font-bold">real-world solutions</span>, not just writing code. My mindset is centered around creating <span className="text-white font-bold">scalable</span> applications with a <span className="text-white font-bold">performance</span>-first approach. By leveraging <span className="text-white font-bold">clean architecture</span>, I ensure that the systems I build are robust, efficient, and ready to solve complex business challenges.
            </motion.p>

            {/* What I Do Section */}
            <div className="mb-10">
              <motion.h3 variants={childVariants} className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                What I Do
                <div className="h-px bg-white/10 flex-grow ml-4"></div>
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {whatIDo.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={childVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
                  >
                    <item.icon className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} strokeWidth={1.5} />
                    <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                    <div className="text-xs text-gray-400 leading-relaxed">{item.desc}</div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* My Approach Section */}
            <div>
              <motion.h3 variants={childVariants} className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                My Approach
                <div className="h-px bg-white/10 flex-grow ml-4"></div>
              </motion.h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {approaches.map((approach, idx) => (
                  <motion.li
                    key={idx}
                    variants={childVariants}
                    className="flex items-center gap-3 text-gray-400 text-sm font-medium group"
                  >
                    <CheckCircle2 size={16} className="text-primary group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-gray-300 transition-colors">{approach}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Premium Section */}
          <motion.div
            ref={rightRef}
            variants={rightVariants}
            initial="hidden"
            animate={rightControls}
            className="relative flex flex-col gap-6 mt-12 lg:mt-0"
          >
            {/* Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-purple-500/10 blur-3xl rounded-full opacity-40 -z-10 transform-gpu" />

            {/* Floating Experience Card */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl"
            >
              <div className="text-xs text-primary uppercase tracking-widest mb-2">Experience</div>
              <div className="text-white font-bold text-lg">Software Engineer</div>
              <div className="text-gray-400 text-sm">Syscom Softech</div>
              <div className="text-gray-500 text-xs mt-1">Nov 2023 - Present</div>
            </motion.div>

            {/* Approach Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { emoji: '⚡', title: 'Performance First', desc: 'Optimized & fast systems' },
                { emoji: '🧠', title: 'Problem Solver', desc: 'Complex logic simplified' },
                { emoji: '🏗', title: 'Clean Architecture', desc: 'Maintainable systems' },
                { emoji: '🚀', title: 'Scalable Systems', desc: 'Future-ready solutions' },
              ].map(({ emoji, title, desc }) => (
                <motion.div
                  key={title}
                  variants={childVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="text-white font-semibold mb-1">{emoji} {title}</div>
                  <div className="text-gray-400 text-xs">{desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Quote Block */}
            <motion.div variants={childVariants} className="glass p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
              <p className="text-gray-300 italic text-sm">
                "I don't just write code, I build systems that scale."
              </p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
