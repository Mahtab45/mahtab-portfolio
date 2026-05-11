import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ firstWord, secondWord, subtitle }) => {
  return (
    <div className="text-center mb-12 md:mb-16 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="group/heading"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          <span className="text-white">{firstWord}</span> <span className="text-primary">{secondWord}</span>
        </h2>
        
        <div className="relative mb-6 mx-auto w-20 md:w-24">
          <div className="relative h-1 w-full overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
            <motion.div 
              className="absolute inset-0 bg-white/40"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-4 bg-primary/20 blur-md opacity-0 group-hover/heading:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {subtitle && (
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SectionHeading;
