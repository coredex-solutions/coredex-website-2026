"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, animate, useMotionTemplate, useMotionValue } from "framer-motion";
import { Layers, Users, Clock, Globe } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";

const stats = [
  { value: 150, suffix: "+", key: "projects" as const, Icon: Layers, color: "from-primary to-secondary", shadow: "rgba(90,60,240,0.4)" },
  { value: 80, suffix: "+", key: "clients" as const, Icon: Users, color: "from-secondary to-[#10b981]", shadow: "rgba(66,99,235,0.4)" },
  { value: 5, suffix: "+", key: "years" as const, Icon: Clock, color: "from-[#f59e0b] to-[#ef4444]", shadow: "rgba(245,158,11,0.4)" },
  { value: 8, suffix: "+", key: "countries" as const, Icon: Globe, color: "from-[#ec4899] to-primary", shadow: "rgba(236,72,153,0.4)" },
];

interface StatsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export default function StatsSection({ dict }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section ref={sectionRef} className="relative py-32 bg-bg overflow-hidden transition-colors duration-300">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4 bg-secondary/10 px-6 py-2 rounded-full backdrop-blur-md border border-secondary/20 shadow-[0_0_30px_rgba(66,99,235,0.2)]"
          >
            {dict.stats.sectionTag}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black font-[family-name:var(--font-heading)] uppercase tracking-tighter rtl:tracking-normal text-text transition-colors"
          >
            {dict.stats.sectionTitle}
          </motion.h2>
        </div>

        {/* 2030 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {stats.map((stat, i) => (
            <StatCard 
              key={stat.key}
              stat={stat} 
              label={dict.stats[stat.key]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ 
  stat, 
  label, 
  index,
}: { 
  stat: typeof stats[0], 
  label: string, 
  index: number,
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Interactive Flashlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Counter Animation
  useEffect(() => {
    if (isInView && nodeRef.current) {
      animate(0, stat.value, {
        duration: 2.5,
        delay: index * 0.1, // Stagger effect
        ease: [0.22, 1, 0.36, 1], // Custom snappy easing
        onUpdate: (value) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${Math.floor(value)}${stat.suffix}`;
          }
        }
      });
    }
  }, [isInView, stat.value, stat.suffix, index]);

  const Icon = stat.Icon;

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col items-center text-center p-8 md:p-10 rounded-3xl bg-surface border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:-translate-y-2 hover:shadow-2xl"
      style={{ boxShadow: `0 10px 40px -10px ${stat.shadow}` }}
    >
      {/* Interactive Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(184,192,224,0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Hexagon Icon Container */}
      <div className={`relative mb-8 p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-[0_0_30px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}>
        <div className="absolute inset-0 bg-bg rounded-[14px] m-[2px] flex items-center justify-center transition-colors">
          <Icon className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-br ${stat.color}`} style={{ color: "white" }} />
        </div>
      </div>

      {/* Animated Counter */}
      <h3 
        ref={nodeRef}
        className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-text to-text/50 mb-3 tabular-nums select-none transition-colors"
      >
        0{stat.suffix}
      </h3>
      
      {/* Label */}
      <p className="text-sm md:text-base text-text-secondary uppercase tracking-[0.2em] font-semibold mt-auto transition-colors">
        {label}
      </p>
    </motion.div>
  );
}
