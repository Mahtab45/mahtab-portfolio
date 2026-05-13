import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Brain, CheckCircle2 } from 'lucide-react';

const whatIDo = [
    {
        icon: Server,
        title: 'Backend Development',
        desc: 'Build secure and reliable server-side systems'
    },
    {
        icon: Zap,
        title: 'System Optimization',
        desc: 'Improve speed and overall efficiency'
    },
    {
        icon: Brain,
        title: 'Business Logic',
        desc: 'Handle complex workflows and real-world problems'
    }
];

const approaches = [
    'Write clean and structured code',
    'Focus on real-world problem solving',
    'Keep user experience in mind',
    'Work closely with teams & feedback'
];

/* ── Shared animation variants ── */
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
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

const About = () => {

    return (
        <section id="about" className="py-20 md:py-24 px-6 relative overflow-visible bg-[#030712]">

            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] transform-gpu" />
                <div className="absolute bottom-1/4 -left-1/4 w-[50vw] h-[50vw] bg-secondary/5 rounded-full blur-[80px] md:blur-[120px] transform-gpu" />
            </div>

            <div className="max-w-7xl mx-auto overflow-visible">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center" style={{ overflow: 'visible' }}>

                    {/* LEFT SIDE */}
                    <div className="overflow-visible" style={{ overflow: 'visible' }}>
                        <motion.div
                            variants={leftVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                        >
                            {/* Label */}
                            <motion.span variants={childVariants} className="text-primary/70 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
                                Discovery
                            </motion.span>

                            {/* Heading */}
                            <motion.h2 variants={childVariants} className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white">
                                About <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Me</span>
                            </motion.h2>

                            {/* Description https://vercel.com/mahtab-alam-s-projects/mahtab-portfolio/settings/domains*/}
                            <motion.p variants={childVariants} className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl">
                                I focus on solving <span className="text-white font-bold">real-world problems</span>, not just writing code.
                                I enjoy turning complex ideas into simple, usable solutions that create real impact.
                                <br /><br />
                                My work is driven by <span className="text-white font-bold">clarity, usability, and reliability</span>,
                                ensuring everything I build is practical, efficient, and easy to maintain.
                            </motion.p>

                            {/* WHAT I DO */}
                            <div className="mb-10">
                                <motion.h3 variants={childVariants} className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                    What I Do
                                    <div className="h-px bg-white/10 flex-grow ml-4"></div>
                                </motion.h3>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-2 px-1 overflow-visible" style={{ overflow: 'visible' }}>
                                    {whatIDo.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={childVariants}
                                            whileHover={{ y: -4, scale: 1.02, zIndex: 20 }}
                                            className="glass p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-[background-color,border-color,box-shadow] duration-300 ease-out group will-change-transform origin-center hover:z-20 transform-gpu"
                                        >
                                            <item.icon className="text-primary mb-3 group-hover:scale-110 transition-transform duration-300" size={24} />
                                            <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.title}</div>
                                            <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* APPROACH */}
                            <div>
                                <motion.h3 variants={childVariants} className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                    My Approach
                                    <div className="h-px bg-white/10 flex-grow ml-4"></div>
                                </motion.h3>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-visible">
                                    {approaches.map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            variants={childVariants}
                                            className="flex items-center gap-3 text-gray-400 text-sm"
                                        >
                                            <CheckCircle2 size={16} className="text-primary shrink-0" />
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                        </motion.div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="overflow-visible" style={{ overflow: 'visible' }}>
                        <motion.div
                            variants={rightVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                            className="flex flex-col gap-6"
                        >

                            {/* Experience Card */}
                            <motion.div variants={childVariants}>
                                <div className="overflow-visible py-2">
                                    <motion.div
                                        animate={{ y: [-8, 8, -8] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative group will-change-transform transform-gpu"
                                    >
                                        <motion.div
                                            whileHover={{ y: -4, scale: 1.02, zIndex: 20 }}
                                            className="glass p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-[background-color,border-color,box-shadow] duration-300 ease-out origin-center hover:z-20"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                                            <div className="relative z-10">
                                                <div className="text-xs text-primary uppercase mb-2 font-bold tracking-wider">Experience</div>
                                                <div className="text-white font-bold text-xl mb-1 group-hover:text-primary transition-colors">Software Engineer</div>
                                                <div className="text-gray-400 text-sm mb-2">Syscom Softech</div>
                                                <div className="text-gray-500 text-xs font-mono">Nov 2023 - Present</div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* UNIQUE CARDS */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2 px-1 overflow-visible" style={{ overflow: 'visible' }}>

                                <motion.div variants={childVariants} whileHover={{ y: -4, scale: 1.02, zIndex: 20 }} className="glass p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-[background-color,border-color,box-shadow] duration-300 ease-out group will-change-transform origin-center hover:z-20 transform-gpu">
                                    <div className="text-white font-semibold flex items-center gap-2 group-hover:text-primary transition-colors"><span className="text-xl">⚡</span> Fast Delivery</div>
                                    <div className="text-gray-400 text-xs mt-1">Quick turnaround</div>
                                </motion.div>

                                <motion.div variants={childVariants} whileHover={{ y: -4, scale: 1.02, zIndex: 20 }} className="glass p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-[background-color,border-color,box-shadow] duration-300 ease-out group will-change-transform origin-center hover:z-20 transform-gpu">
                                    <div className="text-white font-semibold flex items-center gap-2 group-hover:text-primary transition-colors"><span className="text-xl">🤝</span> Team Work</div>
                                    <div className="text-gray-400 text-xs mt-1">Collaborative mindset</div>
                                </motion.div>

                                <motion.div variants={childVariants} whileHover={{ y: -4, scale: 1.02, zIndex: 20 }} className="glass p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-[background-color,border-color,box-shadow] duration-300 ease-out group will-change-transform origin-center hover:z-20 transform-gpu">
                                    <div className="text-white font-semibold flex items-center gap-2 group-hover:text-primary transition-colors"><span className="text-xl">📦</span> Clean Code</div>
                                    <div className="text-gray-400 text-xs mt-1">Readable & maintainable</div>
                                </motion.div>

                                <motion.div variants={childVariants} whileHover={{ y: -4, scale: 1.02, zIndex: 20 }} className="glass p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-[background-color,border-color,box-shadow] duration-300 ease-out group will-change-transform origin-center hover:z-20 transform-gpu">
                                    <div className="text-white font-semibold flex items-center gap-2 group-hover:text-primary transition-colors"><span className="text-xl">🎯</span> User Focus</div>
                                    <div className="text-gray-400 text-xs mt-1">Built for real users</div>
                                </motion.div>

                            </div>

                            {/* QUOTE */}
                            <motion.div variants={childVariants} whileHover={{ y: -4, scale: 1.02, zIndex: 20 }} className="glass p-6 rounded-2xl border border-white/10 bg-white/5 text-center hover:bg-white/10 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-[background-color,border-color,box-shadow] duration-300 ease-out will-change-transform origin-center hover:z-20 transform-gpu">
                                <p className="text-gray-300 italic text-sm">
                                    "I focus on solving problems, not just writing code."
                                </p>
                            </motion.div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;