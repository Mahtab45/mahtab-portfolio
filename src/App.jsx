import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import CursorGlow from './components/CursorGlow';
import Hero from './components/Hero';
import PageLoader from './components/PageLoader';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';


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
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />



      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[60] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}

export default App;
