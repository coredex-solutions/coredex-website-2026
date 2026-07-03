"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface FeaturedProjectsProps {
  locale: Locale;
  dict: Dictionary;
}

const mockProjects = [
  { id: 1, title: "Nexus Fintech", category: "Web Development", gradient: "from-blue-500 to-cyan-500", speed: 0.1 },
  { id: 2, title: "Lumina Brand", category: "Social Media", gradient: "from-purple-500 to-pink-500", speed: -0.1 },
  { id: 3, title: "Echo Campaign", category: "Video Production", gradient: "from-orange-500 to-red-500", speed: 0.2 },
  { id: 4, title: "Vortex App", category: "UI/UX Design", gradient: "from-emerald-500 to-teal-500", speed: -0.2 },
];

export default function FeaturedProjects({ locale, dict }: FeaturedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const cursorX = useSpring(0, { stiffness: 300, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only update on desktop
    if (window.innerWidth >= 768) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[150vh] bg-bg py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-24 relative z-10">
        <h2 className="text-6xl md:text-8xl font-black font-[family-name:var(--font-heading)] uppercase tracking-tighter text-text">
          {dict.nav.projects}
        </h2>
        <div className="w-full h-[1px] bg-border mt-8" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10 flex flex-col gap-8 md:gap-0">
        {mockProjects.map((project, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const y = useTransform(scrollYProgress, [0, 1], [0, window.innerHeight * project.speed]);
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              style={{ y }}
              className={cn(
                "relative group w-full md:w-[45%] flex flex-col",
                isEven ? "md:self-start md:mt-0" : "md:self-end md:-mt-32"
              )}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link href={`/${locale}/projects`} className="magnetic block relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-surface-elevated cursor-none">
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80 mix-blend-multiply transition-transform duration-700 group-hover:scale-110", project.gradient)} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]" />
              </Link>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-text group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-text-muted mt-2 uppercase tracking-widest text-xs font-bold">
                    {project.category}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Image Cursor Reveal Effect */}
      <motion.div
        className="fixed top-0 left-0 w-80 h-96 rounded-2xl pointer-events-none z-[90] overflow-hidden hidden md:block border border-white/20 shadow-2xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: hoveredProject !== null ? 1 : 0,
          opacity: hoveredProject !== null ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-opacity duration-300",
              project.gradient,
              hoveredProject === project.id ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white/50 font-bold text-4xl uppercase mix-blend-overlay">
              View
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
