import React, { useEffect, memo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50, restDelta: 0.001 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50, restDelta: 0.001 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 md:block hidden transform-gpu"
      style={{
        background: `radial-gradient(600px at var(--x) var(--y), rgba(59, 130, 246, 0.05), transparent 80%)`,
        '--x': springX.get() + 'px',
        '--y': springY.get() + 'px',
      }}
    />
  );
};

// Use CSS variables for better performance via motion style
const CursorGlowOptimized = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 1000, damping: 100 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 md:block hidden transform-gpu"
      style={{
        backgroundImage: motion.interpolate(
          [springX, springY],
          (x, y) => `radial-gradient(600px at ${x}px ${y}px, rgba(59, 130, 246, 0.06), transparent 80%)`
        )
      }}
    />
  );
};

// Wait, interpolation is deprecated or different in newer framer motion versions.
// Let's use useTransform or just direct style object with motion values.

const CursorGlowFinal = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 md:block hidden transform-gpu"
      style={{
        background: `radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.06), transparent 80%)`,
        // @ts-ignore
        '--mouse-x': mouseX,
        // @ts-ignore
        '--mouse-y': mouseY
      }}
    />
  );
};

export default memo(CursorGlowFinal);

