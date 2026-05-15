import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Palette, ChevronDown, Check } from 'lucide-react';
import { cn } from '../utils/cn';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const themes = [
  { id: 'default', name: 'Blue/Purple', color: 'bg-blue-500' },
  { id: 'green', name: 'Emerald', color: 'bg-emerald-500' },
  { id: 'sunset', name: 'Sunset', color: 'bg-orange-500' },
];

const Navbar = ({ currentTheme, onThemeChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.name.toLowerCase());
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu or theme modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isThemeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isThemeOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      {/* Dynamic Background Element - Separated to avoid containing block issues for children */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500 -z-10",
        isScrolled ? "bg-dark/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )} />

      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 px-6",
        isScrolled ? "py-3" : "py-6"
      )}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tighter cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          MAHTAB
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-xs font-black uppercase tracking-widest transition-all hover:text-primary relative group",
                  activeSection === link.name.toLowerCase() ? "text-primary" : "text-gray-400"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300",
                  activeSection === link.name.toLowerCase() ? "w-full" : "w-0 group-hover:w-full"
                )}></span>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-6 pl-6 border-l border-white/10">
            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="p-2 glass rounded-full text-gray-400 hover:text-primary transition-colors flex items-center gap-2 px-3 border-white/5"
              >
                <Palette size={18} />
                <ChevronDown size={14} className={cn("transition-transform duration-300", isThemeOpen ? "rotate-180" : "")} />
              </button>

              <AnimatePresence>
                {isThemeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-48 glass rounded-2xl border-white/5 p-2 shadow-2xl backdrop-blur-2xl"
                  >
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          onThemeChange(theme.id);
                          setIsThemeOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-xl transition-all text-xs font-bold uppercase tracking-widest",
                          currentTheme === theme.id ? "bg-primary/20 text-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn("w-3 h-3 rounded-full", theme.color)}></div>
                          {theme.name}
                        </div>
                        {currentTheme === theme.id && <Check size={14} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => {
              setIsThemeOpen(!isThemeOpen);
              setIsMobileMenuOpen(false);
            }}
            className="p-2 glass rounded-full text-gray-400"
          >
            <Palette size={20} />
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsThemeOpen(false);
            }}
            className="text-gray-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlays - Positioned as children of fixed nav but outside the blur div */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Full screen overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-dark/60 backdrop-blur-md z-[110] md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-dark/95 backdrop-blur-2xl border-l border-white/5 md:hidden z-[120] shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-8 border-b border-white/5">
                  <span className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">MENU</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400"><X size={28} /></button>
                </div>

                <div className="flex flex-col p-8 space-y-6 overflow-y-auto">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-4xl font-black uppercase tracking-tighter transition-all py-2",
                        activeSection === link.name.toLowerCase() ? "text-primary translate-x-4" : "text-gray-500 hover:text-white"
                      )}
                    >
                      {link.name}
                    </motion.a>
                  ))}

                  <div className="pt-10 border-t border-white/5 flex gap-4">
                    <a href="#" className="flex-1 py-4 glass rounded-2xl text-gray-400 flex items-center justify-center gap-2 hover:text-white transition-colors">
                      <Github size={20} /> <span className="text-xs font-bold uppercase tracking-widest">Github</span>
                    </a>
                    <a href="#" className="flex-1 py-4 glass rounded-2xl text-gray-400 flex items-center justify-center gap-2 hover:text-white transition-colors">
                      <Linkedin size={20} /> <span className="text-xs font-bold uppercase tracking-widest">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Theme Selection Modal */}
      <AnimatePresence>
        {isThemeOpen && (
          <div className="md:hidden fixed inset-0 z-[120] flex items-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsThemeOpen(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full glass rounded-t-[2.5rem] p-8 border-t border-white/10 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6" />
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Choose Theme</h3>
                <button onClick={() => setIsThemeOpen(false)} className="p-2 text-gray-400 hover:text-white"><X size={24} /></button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsThemeOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between p-5 rounded-2xl transition-all text-sm font-bold uppercase tracking-widest",
                      currentTheme === theme.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 text-gray-400 border border-white/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-4 h-4 rounded-full", theme.color)}></div>
                      {theme.name}
                    </div>
                    {currentTheme === theme.id && <Check size={20} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default memo(Navbar);
