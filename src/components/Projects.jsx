import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

const projects = [

  {
    title: "NCB-ACE",
    desc: "A sports management and coaching platform designed to track player performance, manage training programs, and streamline academy operations.",
    image: "https://images.pexels.com/photos/30387496/pexels-photo-30387496.jpeg",
    link: "https://ncbace.com",
    tags: ["SportsTech", "Performance Tracking", "Management System"]
  },
  {
    title: "Wine Cave",
    desc: "A tourism and hospitality website showcasing wine experiences, cave tours, and booking services with rich visual storytelling.",
    image: "https://hendersoncastle.com/application/files/1217/0301/5327/Wine-Tasting-Banner-Henderson-Castle-Best-Bed-and-Breafast-Michigan-8.jpg",
    link: "https://www.kvareliwinecave.com",
    tags: ["Tourism", "Hospitality", "Booking", "WordPress", "UI/UX"]
  },
  {
    title: "Disha Classes",
    desc: "An educational platform offering course management, student engagement, and online learning resources for academic growth.",
    image: "https://images.pexels.com/photos/8199166/pexels-photo-8199166.jpeg",
    link: "https://dishaclasses.org/",
    tags: ["EdTech", "Course Management", "Learning Platform", "Responsive Design"]
  },
  {
    title: "Gopien",
    desc: "A digital wallet and fintech platform enabling secure transactions, wallet management, saving groups, and peer-to-peer payments.",
    image: "https://media.istockphoto.com/id/1424168753/photo/concept-for-online-shopping-and-e-commerce-using-a-laptop-computer-and-a-delivery-vehicle-to.jpg?s=612x612&w=0&k=20&c=pYXVpbwMDv2jKBZjPDCHBzA8LhqtV4_Au7OkCBNWa1c=",
    link: "https://gopien.com",
    tags: ["FinTech", "Digital Wallet", "Payments", "Security"]
  },
  {
    title: "WebDesignRoma",
    desc: "A digital agency website focused on web design, branding, and online business solutions with a modern and responsive layout.",
    image: "https://images.pexels.com/photos/6476257/pexels-photo-6476257.jpeg",
    link: "http://webdesignroma.com/",
    tags: ["Web Design", "Agency", "Branding", "Responsive", "UI/UX"]
  },
  {
    title: "Sapleston",
    desc: "Manufacturer of innovative natural stone veneer products offering flexible, lightweight stone sheets used for interior and exterior wall design, cladding, and architectural applications.",
    image: "https://plus.unsplash.com/premium_photo-1670168827639-033c8baa538e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://www.sapleston.com",
    tags: ["Construction", "Stone Veneer", "Architecture", "Interior Design", "Manufacturing"]
  }
];

const categories = ["All", "FinTech", "EdTech", "SportsTech", "Management", "Wordpress"];

const getTagColor = (tag) => {
  const t = tag.toLowerCase();
  if (t.includes('fintech')) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
  if (t.includes('edtech')) return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
  if (t.includes('sports')) return 'text-green-400 bg-green-400/10 border-green-400/20';
  if (t.includes('management')) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
  if (t.includes('wordpress')) return 'text-pink-400 bg-pink-400/10 border-pink-400/20';
  if (t.includes('agency')) return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
  if (t.includes('architecture')) return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
  return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
};

const ProjectCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative h-[480px] rounded-2xl overflow-hidden glass border border-white/10 bg-white/5 backdrop-blur-lg flex flex-col cursor-pointer"
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="px-6 py-2.5 bg-white text-dark rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Visit Website <ArrowUpRight size={18} />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span
                key={tag}
                className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-auto line-clamp-3">
            {project.desc}
          </p>

          <div className="mt-6">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary group/link"
            >
              View Details
              <motion.span className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform">
                <ArrowUpRight size={16} />
              </motion.span>
            </a>
          </div>
        </div>
      </div>

      {/* Card Glow Effect */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:shadow-[0_0_40px_rgba(var(--primary-rgb,59,130,246),0.25)] transition-shadow duration-500" />
    </motion.div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p =>
        p.tags.some(tag => tag.toLowerCase().includes(activeTab.toLowerCase()))
      ));
    }
  }, [activeTab]);

  return (
    <section id="projects" className="py-20 md:py-24 px-6 relative overflow-hidden bg-gradient-to-b from-dark/50 to-dark">
      {/* Background Glow Blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] opacity-20 animate-pulse delay-700" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeading
          firstWord="My"
          secondWord="Projects"
          subtitle="Some of my recent work showcasing my expertise in building modern, performant, and delightful web experiences."
        />

        {/* Filter System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${activeTab === cat
                ? "text-white border-transparent"
                : "text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
            >
              {activeTab === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full -z-10 shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
