import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import SectionHeading from './SectionHeading';

const EducationItem = memo(({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between mb-16 pl-16 pr-4 md:px-0 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} transform-gpu`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`w-full md:w-[45%] bg-white/5 p-6 rounded-3xl border border-white/5 group hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px] hover:shadow-primary/40 transition-all duration-300 ease-in-out transform-gpu`}
      >
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="text-primary group-hover:scale-110 transition-transform duration-300" size={24} />
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">{item.degree}</h3>
        </div>

        <p className="text-primary font-medium mb-2 group-hover:text-white transition-colors duration-300">{item.institution}</p>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1 group-hover:text-gray-300 transition-colors duration-300">
            <Calendar size={14} />
            <span>{item.year}</span>
          </div>
          {item.result && (
            <div className="flex items-center gap-1 group-hover:text-gray-300 transition-colors duration-300">
              <Award size={14} />
              <span>{item.result}</span>
            </div>
          )}
        </div>

        {item.description && <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{item.description}</p>}
      </motion.div>

      {/* Center Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full glass border-2 border-primary z-10 flex items-center justify-center p-1 transform-gpu"
        style={{ x: '-50%' }}
      >
        <div className="w-full h-full bg-primary rounded-full shadow-[0_0_10px] shadow-primary/50"></div>
      </motion.div>
    </div>
  );
});

const Education = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const educationData = [
    {
      degree: "B.Tech in Computer Science",
      institution: "Dr. APJ Abdul Kalam Technical University",
      year: "2023",
      result: "CGPA: 8.0",
      description: "Focused on software engineering, data structures, and web technologies."
    },
    {
      degree: "12th Standard",
      institution: "R.B.J College, Patna",
      year: "2019",
      result: "78%",
      description: "Science stream with PCM"
    },
    {
      degree: "10th Standard",
      institution: "R.Y. High School, Budhnagra",
      year: "2017",
      result: "71%",
      description: "General high school education."
    }
  ];

  return (
    <section id="education" className="py-20 md:py-24 px-6 relative overflow-hidden transform-gpu" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading firstWord="My" secondWord="Education" />

        <div className="relative max-w-5xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full overflow-hidden" style={{ x: '-50%' }}>
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-primary shadow-[0_0_15px] shadow-primary/30 transform-gpu"
            />
          </div>

          {educationData.map((item, index) => (
            <EducationItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Education);

