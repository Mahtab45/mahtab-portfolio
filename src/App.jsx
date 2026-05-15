import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import CursorGlow from './components/CursorGlow';
import Hero from './components/Hero';
import PageLoader from './components/PageLoader';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// Lazy load heavy components for better performance
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Minimal premium loading fallback
const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loaderDone, setLoaderDone] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Drive the loader for 2.8s (matches progress animation + 400ms pause + 700ms exit)
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="relative overflow-x-hidden selection:bg-primary/30 selection:text-white transition-colors duration-500">
      <PageLoader onComplete={() => setLoaderDone(true)} />

      <Background />
      <CursorGlow />
      <Navbar currentTheme={theme} onThemeChange={toggleTheme} />

      <main className="relative z-10 pt-10">
        <Hero currentTheme={theme} />
        <Suspense fallback={<SectionLoader />}>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[60] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}

export default App;

