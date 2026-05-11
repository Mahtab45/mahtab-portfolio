import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

/* ── Easing curves ── */
const easeOutExpo = [0.16, 1, 0.3, 1];

/* ── Loading phrases ── */
const phrases = [
  'Initializing systems...',
  'Loading portfolio...',
  'Configuring interface...',
  'Almost there...',
  'Welcome.',
];

/* ── Ambient particle ── */
const Particle = ({ delay, x, size, opacity }) => (
  <motion.div
    className="absolute rounded-full bg-primary"
    style={{ width: size, height: size, left: `${x}%`, bottom: 0, opacity }}
    animate={{ y: [0, -180, 0], opacity: [0, opacity, 0] }}
    transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const PageLoader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [done, setDone] = useState(false);
  const progressRef = useRef(0);

  /* ── Smooth realistic progress curve ── */
  useEffect(() => {
    let raf;
    let start = null;
    const totalDuration = 2200; // ms to reach 100%

    // Non-linear easing: fast at start, slow in middle, fast at end
    const easeProgress = (t) => {
      if (t < 0.5) return 2 * t * t;
      return -1 + (4 - 2 * t) * t;
    };

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const linearT = Math.min(elapsed / totalDuration, 1);
      const easedT = easeProgress(linearT);
      const newPercent = Math.floor(easedT * 100);

      if (newPercent !== progressRef.current) {
        progressRef.current = newPercent;
        setPercent(newPercent);

        // Update phrase based on progress
        if (newPercent < 20) setPhraseIdx(0);
        else if (newPercent < 45) setPhraseIdx(1);
        else if (newPercent < 70) setPhraseIdx(2);
        else if (newPercent < 90) setPhraseIdx(3);
        else setPhraseIdx(4);
      }

      if (linearT < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Short pause at 100% before exit
        setTimeout(() => setDone(true), 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Notify parent when exit animation completes ── */
  const handleExitComplete = () => {
    if (onComplete) onComplete();
  };

  /* ── SVG ring dimensions ── */
  const R = 54;
  const C = 2 * Math.PI * R;
  const strokeDash = C - (percent / 100) * C;

  const particles = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.4,
    x: 5 + i * 8,
    size: 2 + (i % 3),
    opacity: 0.2 + (i % 4) * 0.1,
  }));

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="fixed inset-0 z-[200] bg-[#030712] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* ── Ambient atmosphere ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] transform-gpu"
            />
            <motion.div
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] transform-gpu"
            />
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            {/* Ambient particles */}
            {particles.map((p, i) => <Particle key={i} {...p} />)}
          </div>

          {/* ── Main loader card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="relative flex flex-col items-center gap-10 z-10"
          >
            {/* ── SVG circular progress ring ── */}
            <div className="relative flex items-center justify-center">
              <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--secondary)" />
                    <stop offset="100%" stopColor="var(--primary)" />
                  </linearGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Track (Very subtle) */}
                <circle
                  cx="70" cy="70" r={R}
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  opacity="0.03"
                />

                {/* Outer soft glow duplicate */}
                <motion.circle
                  cx="70" cy="70" r={R}
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.1"
                  animate={{ strokeDashoffset: strokeDash }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  style={{
                    strokeDasharray: C,
                    filter: 'blur(10px)',
                  }}
                />

                {/* Main progress arc */}
                <motion.circle
                  cx="70" cy="70" r={R}
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: strokeDash }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  style={{
                    strokeDasharray: C,
                    boxShadow: '0 0 15px var(--primary)',
                  }}
                />

                {/* Leading-edge shine (Active tip) */}
                <motion.circle
                  cx="70" cy="70" r={R}
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: strokeDash }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  style={{
                    strokeDasharray: `0.1 ${C}`,
                    filter: 'blur(2px) drop-shadow(0 0 5px white)',
                  }}
                />
              </svg>

              {/* ── Center: percent + initials ── */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                {/* Logo initials */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-[11px] font-black tracking-[0.3em] uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                  MA.
                </motion.span>

                {/* Percentage number */}
                <motion.div
                  key={percent}
                  className="text-3xl font-black text-white leading-none tabular-nums"
                >
                  {percent}
                </motion.div>
                <span className="text-[10px] text-gray-600 font-bold tracking-widest">%</span>
              </div>
            </div>

            {/* ── Progress bar strip ── */}
            <div className="w-64 md:w-80 flex flex-col gap-3">
              <div className="relative h-[2px] w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${percent}%`,
                    background: 'linear-gradient(90deg, var(--secondary), var(--primary))',
                    transition: 'width 0.08s linear',
                    boxShadow: '0 0 12px var(--primary)',
                  }}
                />
                {/* Moving shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* ── Loading phrase ── */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="text-center text-[11px] font-medium tracking-[0.18em] uppercase text-gray-500"
                >
                  {phrases[phraseIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Bottom wordmark ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2"
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-gray-700">Portfolio {new Date().getFullYear()}</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
