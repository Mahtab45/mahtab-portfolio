import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Building2, Calendar, Briefcase, GraduationCap,
  TrendingUp, Zap, Code2, Users, Wrench, Monitor,
  ChevronRight, Star, Clock, ArrowRight
} from 'lucide-react';
import SectionHeading from './SectionHeading';

/* ─── DATA ─────────────────────────────────────────── */
const roles = [
  {
    id: 'intern',
    type: 'Internship',
    typeIcon: GraduationCap,
    role: 'Software Engineer Intern',
    company: 'Syscom Softech Pvt Ltd',
    from: 'Nov 2023',
    to: 'Mar 2024',
    duration: '5 months',
    status: 'completed',
    step: '01',
    theme: {
      text: 'text-secondary',
      bgLight: 'bg-secondary/10',
      bgMedium: 'bg-secondary/20',
      borderLight: 'border-secondary/20',
      glow: 'bg-secondary',
      lineGradient: 'from-transparent via-secondary to-transparent',
      shadowHover: 'hover:shadow-[0_0_40px_-10px_var(--color-secondary)] hover:border-secondary/40',
    },
    tasks: [
      { icon: Code2, text: 'Learned full-stack development with PHP & company framework' },
      { icon: Monitor, text: 'Built and tested UI components for internal web applications' },
      { icon: Wrench, text: 'Assisted in debugging and performance profiling' },
      { icon: Users, text: 'Participated in team meetings and code review sessions' },
    ],
    highlight: 'First professional experience — laid the foundation.',
  },
  {
    id: 'fulltime',
    type: 'Full-Time',
    typeIcon: Star,
    role: 'Software Engineer',
    company: 'Syscom Softech Pvt Ltd',
    from: 'Apr 2024',
    to: 'Present',
    duration: '2+ year',
    status: 'active',
    step: '02',
    theme: {
      text: 'text-primary',
      bgLight: 'bg-primary/10',
      bgMedium: 'bg-primary/20',
      borderLight: 'border-primary/20',
      glow: 'bg-primary',
      lineGradient: 'from-transparent via-primary to-transparent',
      shadowHover: 'hover:shadow-[0_0_40px_-10px_var(--color-primary)] hover:border-primary/40',
    },
    tasks: [
      { icon: Code2, text: 'Full-stack development using PHP and proprietary framework' },
      { icon: Zap, text: 'Performance optimization, caching strategies & debugging' },
      { icon: Users, text: 'Collaborating with cross-functional teams on product features' },
      { icon: Monitor, text: 'Implementing responsive, accessible user interfaces' },
    ],
    highlight: 'Promoted after internship — currently driving real product impact.',
  },
];

/* ─── STEP CONNECTOR ────────────────────────────────── */
const StepConnector = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="hidden lg:flex flex-col items-center justify-center px-2 pt-8 gap-2 shrink-0">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="relative w-20 h-px bg-gradient-to-r from-secondary/50 to-primary/50 origin-left overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 relative overflow-hidden group/badge hover:border-accent/40 hover:shadow-[0_0_15px_var(--color-accent)] transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300" />
        <TrendingUp size={11} className="text-accent relative z-10" />
        <span className="text-[9px] font-bold tracking-widest uppercase text-accent relative z-10">Promoted</span>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="relative w-20 h-px bg-gradient-to-r from-secondary/50 to-primary/50 origin-right overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      </motion.div>
    </div>
  );
};

/* ─── ROLE CARD ──────────────────────────────────────── */
const RoleCard = ({ role, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const t = role.theme;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      className="flex-1 min-w-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.01 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={`relative h-full rounded-3xl overflow-hidden border border-white/[0.06] bg-[#07101f]/90 backdrop-blur-xl transition-all duration-500 group/card ${t.shadowHover}`}
      >
        {/* Glow behind the card content */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Animated Gradient border top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${t.lineGradient}`}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Soft corner glow */}
        <motion.div
          animate={{ opacity: hovered ? 0.2 : 0.05 }}
          transition={{ duration: 0.4 }}
          className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none ${t.glow}`}
        />

        {/* Step number — large watermark */}
        <div className={`absolute top-4 right-6 text-8xl font-black select-none pointer-events-none leading-none opacity-5 ${t.text}`}>
          {role.step}
        </div>

        <div className="relative z-10 p-7 flex flex-col h-full gap-6">

          {/* ── TOP META ROW ── */}
          <div className="flex items-start justify-between gap-3">
            {/* Type badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide border ${t.bgLight} ${t.borderLight} ${t.text}`}>
              <role.typeIcon size={12} />
              {role.type}
            </div>

            {/* Status dot */}
            <div className="flex items-center gap-1.5">
              {role.status === 'active' ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-emerald-400 text-[10px] font-semibold tracking-wide">Active</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-gray-500" />
                  <span className="text-white-500 text-[10px] font-semibold tracking-wide">Completed</span>
                </>
              )}
            </div>
          </div>

          {/* ── ROLE & COMPANY ── */}
          <div>
            <h3 className="text-xl font-black text-white mb-1.5 leading-tight group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-white group-hover/card:to-gray-400 transition-all">
              {role.role}
            </h3>
            <div className={`flex items-center gap-2 text-sm ${t.text}`}>
              <Building2 size={13} />
              <span className="font-medium text-gray-400">{role.company}</span>
            </div>
          </div>

          {/* ── DURATION STRIP ── */}
          <div className={`flex items-center justify-between px-4 py-3 rounded-2xl border ${t.bgLight} ${t.borderLight}`}>
            <div className={`flex items-center gap-2 text-xs font-medium ${t.text}`}>
              <Calendar size={12} />
              <span className="text-gray-300">{role.from} → {role.to}</span>
            </div>
            <div className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg ${t.bgMedium} ${t.text}`}>
              <Clock size={10} />
              {role.duration}
            </div>
          </div>

          {/* ── TASKS ── */}
          <div className="flex flex-col gap-2.5 flex-1">
            {role.tasks.map((task, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.07 + index * 0.15 }}
                className="flex items-start gap-3 group/t"
              >
                <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 transition-all duration-300 group-hover/t:scale-110 group-hover/t:shadow-lg border ${t.bgLight} ${t.borderLight}`}>
                  <task.icon size={12} className={t.text} />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed group-hover/t:text-white transition-colors duration-200">
                  {task.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* ── HIGHLIGHT QUOTE ── */}
          <div className="mt-auto pt-5 border-t border-white/5">
            <p className={`text-[12px] leading-relaxed italic opacity-80 ${t.text}`}>
              "{role.highlight}"
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── COMPANY HEADER BAND ───────────────────────────── */
const CompanyBand = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full max-w-2xl mx-auto mb-12 group/band cursor-default"
    >
      <div className="relative flex items-center gap-5 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-colors hover:border-white/[0.15] hover:bg-white/[0.04]">

        {/* Animated background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-primary/5 opacity-0 group-hover/band:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* left accent bar */}
        <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-secondary to-primary group-hover/band:shadow-[0_0_15px_var(--color-primary)] transition-shadow duration-500" />

        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 border border-white/10 flex items-center justify-center shrink-0 ml-3 group-hover/band:scale-110 group-hover/band:rotate-3 transition-transform duration-300">
          <Building2 size={20} className="text-white" />
        </div>

        <div className="flex-1 min-w-0 relative z-10">
          <div className="text-white font-black text-base truncate">Syscom Softech Pvt Ltd</div>
          <div className="text-gray-500 text-xs mt-0.5 group-hover/band:text-gray-400 transition-colors">Nov 2023 – Present</div>
        </div>

        <div className="flex items-center gap-2 shrink-0 relative z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/20">
            <TrendingUp size={12} className="text-accent" />
            <span className="text-accent text-[11px] font-bold">Intern → Engineer</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── STATS ROW ─────────────────────────────────────── */
const StatsRow = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    { value: '5 mo', label: 'Internship', textClass: 'text-secondary', shadowClass: 'hover:shadow-[0_0_25px_-5px_var(--color-secondary)] hover:border-secondary/30', glowBase: 'bg-secondary' },
    { value: '2+ yr', label: 'Full-Time', textClass: 'text-primary', shadowClass: 'hover:shadow-[0_0_25px_-5px_var(--color-primary)] hover:border-primary/30', glowBase: 'bg-primary' },
    { value: '2', label: 'Roles', textClass: 'text-accent', shadowClass: 'hover:shadow-[0_0_25px_-5px_var(--color-accent)] hover:border-accent/30', glowBase: 'bg-accent' },
    { value: '∞', label: 'Growth', textClass: 'text-white', shadowClass: 'hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.4)] hover:border-white/30', glowBase: 'bg-white' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-10 grid grid-cols-4 gap-3 max-w-lg mx-auto"
    >
      {stats.map(({ value, label, textClass, shadowClass, glowBase }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 200 }}
          whileHover={{ y: -5, scale: 1.05 }}
          className={`flex flex-col items-center py-4 px-2 rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 group/stat relative overflow-hidden backdrop-blur-md cursor-default ${shadowClass}`}
        >
          {/* subtle radial background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <span className={`text-xl font-black mb-0.5 relative z-10 ${textClass}`}>{value}</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest text-center relative z-10 group-hover/stat:text-gray-300 transition-colors">{label}</span>

          {/* subtle moving light reflection */}
          <div className="absolute inset-0 -translate-x-full group-hover/stat:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        </motion.div>
      ))}
    </motion.div>
  );
};

/* ─── MAIN ──────────────────────────────────────────── */
const Experience = () => {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-28 overflow-hidden bg-[#030712]"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[130px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] opacity-80" />

        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        <SectionHeading firstWord="Work" secondWord="Experience" />

        {/* Company band */}
        <CompanyBand />

        {/* ── CARDS ROW ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {roles.map((role, idx) => (
            <React.Fragment key={role.id}>
              <RoleCard role={role} index={idx} />
              {idx < roles.length - 1 && <StepConnector />}
            </React.Fragment>
          ))}
        </div>

        {/* Stats */}
        <StatsRow />

      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
};

export default Experience;