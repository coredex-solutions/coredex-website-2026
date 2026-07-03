"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import type { Locale, Dictionary } from "@/lib/i18n";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Hero({ locale, dict }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Typography parallax
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Center expanding element
  const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 20]);
  const opacityCenter = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-bg">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#802cf5 1px, transparent 1px), linear-gradient(90deg, #802cf5 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Massive Typography */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 w-full px-4 text-center pointer-events-none mix-blend-difference"
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] leading-none font-black font-[family-name:var(--font-heading)] uppercase tracking-tighter text-white"
          >
            {dict.hero.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-xl mx-auto">
              {dict.hero.subtitle}
            </p>
          </motion.div>
        </motion.div>

        {/* Expanding Center Mask */}
        <motion.div
          style={{ scale: scaleCenter, opacity: opacityCenter }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full overflow-hidden z-0"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift blur-xl scale-150" />
        </motion.div>

        {/* Floating Interactive Elements */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto flex gap-4">
            <Button
              href={`/${locale}/contact`}
              variant="primary"
              size="lg"
              className="magnetic backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
              {dict.hero.cta}
            </Button>
            <Button
              href={`/${locale}/projects`}
              variant="secondary"
              size="lg"
              className="magnetic backdrop-blur-md bg-transparent border-white/20 hover:bg-white/10 text-white"
            >
              {dict.hero.ctaSecondary}
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
