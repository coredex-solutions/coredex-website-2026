"use client";

import { useRef } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import Button from "@/components/ui/Button";
import type { Locale, Dictionary } from "@/lib/i18n";
import { useEffect } from "react";

interface CtaBannerProps {
  locale: Locale;
  dict: Dictionary;
}

export default function CtaBanner({ locale, dict }: CtaBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Magnetic Button Physics for Desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 15, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen
      const x = (e.clientX - window.innerWidth / 2) * 0.05; // 5% pull strength
      const y = (e.clientY - window.innerHeight / 2) * 0.05;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 lg:py-48 bg-bg overflow-hidden flex flex-col items-center justify-center border-t border-border transition-colors duration-300">
      
      {/* The Supernova Glow Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.4, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] rounded-full blur-[100px] md:blur-[150px]"
          style={{
            background: "radial-gradient(circle at center, rgba(90,60,240,0.8) 0%, rgba(66,99,235,0.4) 50%, transparent 80%)"
          }}
        />
      </div>

      {/* Floating 2030 Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none perspective-[1000px]">
        {isInView && [...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-text rounded-full opacity-20 shadow-lg transition-colors"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, Math.random() * 0.8 + 0.2, 0],
              scale: [0, Math.random() * 2 + 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Animated Tag */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.15em] md:tracking-[0.3em] text-secondary mb-6 md:mb-8 bg-secondary/10 px-4 md:px-6 py-1.5 md:py-2 rounded-full backdrop-blur-md border border-secondary/20 shadow-[0_0_30px_rgba(66,99,235,0.2)]"
        >
          {dict.cta.sectionTag}
        </motion.span>
        
        {/* Massive 2030 Typography with Mobile-First Viewport Scaling */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full text-[12vw] sm:text-[10vw] md:text-8xl lg:text-[10rem] font-black font-[family-name:var(--font-heading)] text-transparent bg-clip-text bg-gradient-to-b from-text to-text/50 mb-6 md:mb-8 uppercase tracking-tighter rtl:tracking-normal leading-[0.85] drop-shadow-2xl transition-colors break-words"
        >
          {dict.cta.title}
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-2xl lg:text-3xl text-text-secondary mb-10 md:mb-16 max-w-[90%] md:max-w-3xl mx-auto font-medium transition-colors leading-relaxed"
        >
          {dict.cta.subtitle}
        </motion.p>
        
        {/* Magnetic Glow Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
          style={{ x: springX, y: springY }}
          className="inline-block relative group perspective-[1000px]"
        >
          {/* Intense Outer Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
          
          <Button
            href={`/${locale}/contact`}
            variant="primary"
            size="lg"
            icon
            className="relative bg-text text-bg border-text hover:bg-text/90 shadow-2xl scale-110 md:scale-125 transform-style-3d group-hover:rotate-x-12 group-hover:-translate-y-2 transition-all duration-300"
          >
            <span className="font-bold tracking-widest">{dict.cta.button}</span>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
