import React, { useEffect, useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Phone } from 'lucide-react';

/* ── X (formerly Twitter) SVG icon ── */
const XIcon = memo(({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
));

const socialLinks = [
  { icon: Github, label: 'GitHub Profile', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn Profile', href: 'https://linkedin.com' },
  { icon: XIcon, label: 'X Profile', href: 'https://x.com' },
  { icon: Mail, label: 'Email Me', href: 'mailto:mahtabalam2896@gmail.com' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Footer = () => {
  const canvasRef = useRef(null);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { amount: 0.1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const N = 30;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.2 + 0.4,
    }));

    const draw = () => {
      if (!isInView) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99,179,237,0.3)';
        ctx.fill();
      });
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(99,179,237,${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [isInView]);

  return (
    <motion.footer
      ref={footerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative bg-[#030712] mt-20 overflow-hidden transform-gpu"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.5 }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4 transform-gpu" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[90px] translate-y-1/3 -translate-x-1/4 transform-gpu" />
      </div>

      <div className="relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-[2px]" />

        <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 transform-gpu">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left transform-gpu">
              <span className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-widest mb-6">
                MAHTAB
              </span>

              <div className="mb-7">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md relative overflow-hidden group/status">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent -translate-x-full group-hover/status:translate-x-full transition-transform duration-1000 transform-gpu" />

                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  </span>
                  <span className="text-emerald-400 text-[10px] font-bold tracking-[0.15em] uppercase">Available for work</span>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-[260px] font-medium opacity-70 mb-8">
                Backend Engineer crafting clean, reliable, and scalable systems that solve real problems.
              </p>

              <div className="flex gap-3 justify-center md:justify-start">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-gray-400 transition-all duration-300 hover:text-primary hover:border-primary/30 hover:bg-primary/10 overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(var(--primary-rgb,59,130,246),0.15)] backdrop-blur-sm transform-gpu"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/20 to-transparent blur-md transform-gpu" />
                    <Icon size={16} className="relative z-10 transition-colors duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center transform-gpu">
              <div className="w-fit flex flex-col items-center">
                <div className="relative mb-8 group/title flex flex-col items-center">
                  <h3 className="text-white font-bold text-[11px] tracking-[0.25em] uppercase pb-2.5">
                    Explore
                  </h3>
                  <div className="relative h-px w-8 overflow-hidden mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
                    <motion.div
                      className="absolute inset-0 bg-white/40 transform-gpu"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-primary/20 blur-md opacity-0 group-hover/title:opacity-100 transition-opacity duration-500 pointer-events-none transform-gpu" />
                </div>

                <ul className="flex flex-col gap-2 items-start w-full">
                  {navLinks.map(({ label, href }, idx) => (
                    <motion.li
                      key={label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.07, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="transform-gpu"
                    >
                      <a
                        href={href}
                        className="group flex items-center py-2 text-gray-400 hover:text-white transition-all duration-300 w-fit"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-0 h-[2px] bg-primary group-hover:w-4 transition-all duration-300 ease-out rounded-full opacity-0 group-hover:opacity-100" />
                          <span className="text-sm font-medium tracking-wide transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/80">
                            {label}
                          </span>
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center md:items-end transform-gpu">
              <div className="w-full md:max-w-[260px] flex flex-col items-center md:items-start">
                <div className="relative mb-8 group/title flex flex-col items-center w-full">
                  <h3 className="text-white font-bold text-[11px] tracking-[0.25em] uppercase pb-2.5">
                    Get in touch
                  </h3>
                  <div className="relative h-px w-8 overflow-hidden mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
                    <motion.div
                      className="absolute inset-0 bg-white/40 transform-gpu"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-primary/20 blur-md opacity-0 group-hover/title:opacity-100 transition-opacity duration-500 pointer-events-none transform-gpu" />
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <motion.a
                    href="mailto:mahtabalam2896@gmail.com"
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-3 p-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-primary/5 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(var(--primary-rgb,59,130,246),0.08)] transition-all duration-300 transform-gpu"
                    aria-label="Email me at mahtabalam2896@gmail.com"
                  >
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail size={14} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-xs font-semibold">Email me</div>
                      <div className="text-gray-500 text-[11px] truncate">mahtabalam2896@gmail.com</div>
                    </div>
                    <ArrowUpRight size={13} className="text-gray-600 group-hover:text-primary ml-auto shrink-0 transition-colors" />
                  </motion.a>

                  <motion.a
                    href="tel:+919113130267"
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-3 p-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-primary/5 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(var(--primary-rgb,59,130,246),0.08)] transition-all duration-300 transform-gpu"
                    aria-label="Call me at +91 9113130267"
                  >
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone size={14} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-xs font-semibold">Call me</div>
                      <div className="text-gray-500 text-[11px]">+91 91131 30267</div>
                    </div>
                    <ArrowUpRight size={13} className="text-gray-600 group-hover:text-primary ml-auto shrink-0 transition-colors" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mb-6" />

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 text-[11px] sm:text-xs font-medium text-gray-500 transform-gpu"
          >
            <div className="flex items-center gap-2">
              <span className="tracking-wider uppercase">© {new Date().getFullYear()} Mahtab Alam.</span>
              <span className="hidden md:inline-block w-1 h-1 rounded-full bg-gray-700" />
              <span className="hidden md:inline-block tracking-wider uppercase">All rights reserved.</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-md shadow-sm">
              <span className="tracking-widest uppercase text-[10px]">Crafted with</span>
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-rose-500 inline-block text-[10px] drop-shadow-[0_0_8px_rgba(244,63,94,0.5)] transform-gpu"
              >
                ❤️
              </motion.span>
              <span className="tracking-widest uppercase text-[10px] text-gray-400">By Mahtab</span>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.05] hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 relative overflow-hidden"
              aria-label="Back to top"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out transform-gpu" />
              <span className="tracking-widest text-[10px] sm:text-xs font-semibold uppercase relative z-10">Back to top</span>
              <div className="w-6 h-6 rounded-full bg-white/[0.05] group-hover:bg-primary/20 flex items-center justify-center transition-colors relative z-10">
                <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300 transform-gpu" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </motion.footer>
  );
};

export default memo(Footer);