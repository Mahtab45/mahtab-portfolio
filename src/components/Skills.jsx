import React, { useEffect, useRef, useState, memo, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

const skillsData = [
    { name: 'PHP', slug: 'php', color: '#777BB4' },
    { name: 'CakePHP', slug: 'cakephp', color: '#D33C43' },
    { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
    { name: 'jQuery', slug: 'jquery', color: '#0769AD' },
    { name: 'HTML', slug: 'html5', color: '#E34F26' },
    { name: 'CSS', slug: 'css', color: '#1572B6' },
    { name: 'Bootstrap', slug: 'bootstrap', color: '#7952B3' },
    { name: 'MySQL', slug: 'mysql', color: '#4479A1' },
    { name: 'Python', slug: 'python', color: '#3776AB' },
    { name: 'Laravel', slug: 'laravel', color: '#FF2D20' },
    { name: 'WordPress', slug: 'wordpress', color: '#21759B' },
    { name: 'AJAX', slug: 'json', color: '#FFD700' }, 
    { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4' },
    { name: 'Github', slug: 'github', color: '#ffffff' },
];

const StableCanvasGlobe = memo(() => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const isInView = useInView(containerRef, { amount: 0.1 });

    const points = useRef([]);
    const rotation = useRef({ x: 0, y: 0 });
    const mouse = useRef({ x: 0, y: 0, isDown: false, isDragging: false, startX: 0, startY: 0, lastX: 0, lastY: 0, intentDecided: false });
    const momentum = useRef({ x: 0, y: 0.005 });
    const radius = useRef(150);
    const perspective = useRef(300);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });

        const n = skillsData.length;
        let processedCount = 0;

        const checkAllProcessed = () => {
            processedCount++;
            if (processedCount === n) setIsReady(true);
        };

        points.current = skillsData.map((skill, index) => {
            const phi = Math.acos(-1 + (2 * index) / n);
            const theta = Math.sqrt(n * Math.PI) * phi;

            const x = radius.current * Math.cos(theta) * Math.sin(phi);
            const y = radius.current * Math.sin(theta) * Math.sin(phi);
            const z = radius.current * Math.cos(phi);

            const img = new Image();
            const color = skill.color.replace('#', '');
            img.src = `https://cdn.simpleicons.org/${skill.slug}/${color}`;
            img.crossOrigin = "anonymous";

            img.onload = checkAllProcessed;
            img.onerror = () => {
                img.src = `https://cdn.simpleicons.org/codefire/${color}`;
                checkAllProcessed();
            };

            return { x, y, z, skill, img, currentScale: 1 };
        });

        const resize = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            radius.current = Math.min(rect.width, rect.height) * 0.35;
            perspective.current = radius.current * 2;
        };

        window.addEventListener('resize', resize);
        resize();

        let animationFrameId;

        const rotateX = (p, angle) => {
            const c = Math.cos(angle);
            const s = Math.sin(angle);
            const y1 = p.y * c - p.z * s;
            const z1 = p.z * c + p.y * s;
            p.y = y1; p.z = z1;
        };

        const rotateY = (p, angle) => {
            const c = Math.cos(angle);
            const s = Math.sin(angle);
            const x1 = p.x * c - p.z * s;
            const z1 = p.z * c + p.x * s;
            p.x = x1; p.z = z1;
        };

        const render = () => {
            if (!isInView) return;

            const rect = canvas.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            
            ctx.clearRect(0, 0, width, height);
            const centerX = width / 2;
            const centerY = height / 2;

            if (!mouse.current.isDown) {
                rotation.current.x = momentum.current.x;
                rotation.current.y = momentum.current.y;
                momentum.current.x *= 0.98;
                momentum.current.y = momentum.current.y * 0.98 + (0.005 * 0.02);
            }

            points.current.forEach(p => {
                rotateX(p, rotation.current.x);
                rotateY(p, rotation.current.y);
            });

            let closestIdx = -1;
            let minDis = 80;

            points.current.forEach((p, i) => {
                const f = perspective.current / (perspective.current + p.z);
                const px = p.x * f + centerX;
                const py = p.y * f + centerY;
                const d = Math.hypot(mouse.current.x - px, mouse.current.y - py);
                if (d < minDis) {
                    minDis = d;
                    closestIdx = i;
                }
            });

            const sorted = [...points.current].sort((a, b) => a.z - b.z);

            sorted.forEach((p) => {
                const originalIdx = points.current.indexOf(p);
                const isHovered = originalIdx === closestIdx;

                const targetS = isHovered ? 1.5 : 1.0;
                p.currentScale += (targetS - p.currentScale) * 0.15;

                const f = perspective.current / (perspective.current + p.z);
                const px = p.x * f + centerX;
                const py = p.y * f + centerY;

                const baseSize = 52;
                const depthScale = 0.8 + (p.z / radius.current) * 0.2 + 0.1;
                const renderScale = p.currentScale * depthScale;
                const size = baseSize * renderScale;

                if (isHovered) {
                    ctx.shadowBlur = 25;
                    ctx.shadowColor = p.skill.color;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.beginPath();
                ctx.arc(px, py, size / 1.8, 0, Math.PI * 2);
                ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)';
                ctx.fill();
                ctx.strokeStyle = isHovered ? p.skill.color : 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.globalAlpha = 1;
                ctx.drawImage(p.img, px - size / 2, py - size / 2, size, size);
            });

            if (closestIdx !== -1) {
                const p = points.current[closestIdx];
                const f = perspective.current / (perspective.current + p.z);
                const px = p.x * f + centerX;
                const py = p.y * f + centerY;
                const size = 52 * p.currentScale * (0.8 + (p.z / radius.current) * 0.2 + 0.1);

                ctx.save();
                ctx.translate(px, py + size / 2 + 20);
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 14px sans-serif';
                ctx.textAlign = 'center';
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.skill.color;
                ctx.fillText(p.skill.name.toUpperCase(), 0, 0);

                ctx.beginPath();
                ctx.moveTo(-15, 6);
                ctx.lineTo(15, 6);
                ctx.strokeStyle = p.skill.color;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(render);
        };


        render();

        const handlePointerDown = (e) => {
            canvas.setPointerCapture(e.pointerId);
            mouse.current.isDown = true;
            mouse.current.isDragging = false;
            mouse.current.intentDecided = false;
            mouse.current.startX = e.clientX;
            mouse.current.startY = e.clientY;
            mouse.current.lastX = e.clientX;
            mouse.current.lastY = e.clientY;
        };

        const handlePointerMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;

            if (!mouse.current.isDown) return;

            if (!mouse.current.isDragging && !mouse.current.intentDecided) {
                const dx = e.clientX - mouse.current.startX;
                const dy = e.clientY - mouse.current.startY;
                const absDx = Math.abs(dx);
                const absDy = Math.abs(dy);

                if (absDx > absDy && absDx > 8) {
                    mouse.current.isDragging = true;
                    mouse.current.intentDecided = true;
                } else if (absDy > absDx && absDy > 8) {
                    mouse.current.intentDecided = true;
                }
            }

            if (mouse.current.isDragging) {
                if (e.cancelable) {
                    e.preventDefault();
                }
                const dx = e.clientX - mouse.current.lastX;
                const dy = e.clientY - mouse.current.lastY;
                momentum.current.y = dx * 0.006;
                momentum.current.x = -dy * 0.006;
                rotation.current.x = momentum.current.x;
                rotation.current.y = momentum.current.y;
            }

            mouse.current.lastX = e.clientX;
            mouse.current.lastY = e.clientY;
        };

        const handlePointerUp = (e) => {
            try {
                if (canvas.hasPointerCapture(e.pointerId)) {
                    canvas.releasePointerCapture(e.pointerId);
                }
            } catch (err) {}
            mouse.current.isDown = false;
            mouse.current.isDragging = false;
        };

        const handlePointerLeave = () => {
            mouse.current.x = -1000;
            mouse.current.y = -1000;
            mouse.current.isDown = false;
            mouse.current.isDragging = false;
        };

        canvas.style.touchAction = "pan-y";
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointerleave', handlePointerLeave);
        canvas.addEventListener('pointermove', handlePointerMove, { passive: false });
        canvas.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointerleave', handlePointerLeave);
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isInView]);

    return (
        <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing transform-gpu">
            <canvas ref={canvasRef} className={`w-full h-full transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`} />

            {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
            )}

            <div className="absolute inset-0 m-auto w-36 h-36 bg-primary/10 blur-[100px] rounded-full pointer-events-none transform-gpu"></div>
        </div>
    );
});

const AutoCodingTerminal = memo(() => {
    const [typedCode, setTypedCode] = useState('');

    const fullCode = `> node app.js

const dev = {
  name: "Mahtab Alam",
  role: "Full Stack Developer"
};

function start(dev) {
  return \`\${dev.name} is building scalable apps 🚀\`;
}

> start(dev)
✔ Mahtab Alam is building scalable apps 🚀`;

    useEffect(() => {
        let currentLength = 0;
        let timeout;

        const type = () => {
            if (currentLength <= fullCode.length) {
                setTypedCode(fullCode.slice(0, currentLength));

                let delay = Math.random() * 20 + 20;

                if (currentLength > 0 && currentLength < fullCode.length) {
                    const lastChar = fullCode[currentLength - 1];
                    const nextChar = fullCode[currentLength];

                    if (lastChar === '\n') {
                        delay = 200 + Math.random() * 150;
                        if (nextChar === '>') delay = 500 + Math.random() * 200;
                        if (nextChar === '✔') delay = 1200 + Math.random() * 400;
                    } else if (lastChar === '>') {
                        delay = 300;
                    } else if (lastChar === '.') {
                        delay = 150;
                    } else if (lastChar === '{' || lastChar === '}') {
                        delay = 200;
                    }
                }

                currentLength++;
                timeout = setTimeout(type, delay);
            } else {
                timeout = setTimeout(() => {
                    setTypedCode('');
                    currentLength = 0;
                    type();
                }, 5000);
            }
        };

        timeout = setTimeout(type, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const colorizeCode = (code) => {
        return code.split('\n').map(line => {
            let hLine = line.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if (hLine.startsWith('&gt;')) return `<span class="text-cyan-400">${hLine}</span>`;
            if (hLine.startsWith('✔')) return `<span class="text-emerald-400 font-bold">${hLine}</span>`;

            hLine = hLine
                .replace(/\b(const|let|var|function|return|if)\b/g, '<span class="text-purple-400">$1</span>')
                .replace(/("[^"]*"?)/g, '<span class="text-emerald-300">$1</span>')
                .replace(/(\`[^\`]*\`)/g, '<span class="text-emerald-300">$1</span>')
                .replace(/\b(dev|name|role|start|app)\b/g, '<span class="text-blue-400">$1</span>')
                .replace(/\b(true|false)\b/g, '<span class="text-orange-400">$1</span>');

            return hLine;
        }).join('\n');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-lg transform-gpu"
        >
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#020617] border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden h-[450px] md:h-[450px] flex flex-col transform-gpu"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[80px] pointer-events-none rounded-full" />

                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4 relative z-10 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-gray-400 text-xs font-mono ml-2">app.js</span>
                </div>

                <div
                    className="font-mono text-xs md:text-sm text-gray-300 whitespace-pre-wrap break-words relative z-10 overflow-hidden leading-relaxed"
                >
                    <span dangerouslySetInnerHTML={{ __html: colorizeCode(typedCode) }} />
                    <span className="inline-block w-[2px] h-[1.1em] bg-blue-400 ml-1 align-middle animate-blink" />
                </div>
            </motion.div>
            <p className="text-center text-gray-500 text-xs mt-6 uppercase tracking-widest font-semibold">Crafting performant and reliable systems</p>

            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s ease-in-out infinite;
        }
      `}</style>
        </motion.div>
    );
});


const Skills = () => {
    return (
        <section id="skills" className="py-20 md:py-24 px-6 relative overflow-hidden flex items-center justify-center min-h-[90vh]">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">

                <div className="relative z-10 flex flex-col items-start w-full transform-gpu">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-primary/70 font-bold tracking-widest uppercase text-xs mb-4 block"
                    >
                        Tech Stack
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black mb-6 leading-[0.9] tracking-tighter"
                    >
                        Building With <br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Modern Technologies</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md"
                    >
                        I turn ideas into scalable, real-world applications using modern tools and clean engineering practices.
                    </motion.p>

                    <AutoCodingTerminal />
                </div>

                <div className="relative h-[600px] md:h-[700px] w-full bg-dark/20 rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl backdrop-blur-xl transform-gpu">
                    <StableCanvasGlobe />

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-gray-600 font-bold pointer-events-none">
                        Interactive Technical Sphere
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(Skills);

