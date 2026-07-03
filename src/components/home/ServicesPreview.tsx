"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Share2, Film, Camera, TrendingUp } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";

const serviceIcons = [Globe, Share2, Film, Camera, TrendingUp];
const serviceKeys = ["webDev", "socialMedia", "videoEditing", "photography", "seo"] as const;

interface ServicesPreviewProps {
  locale: Locale;
  dict: Dictionary;
}

export default function ServicesPreview({ locale, dict }: ServicesPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative bg-surface pb-32">
      {/* Sticky Header */}
      <div className="sticky top-0 h-[30vh] flex items-center justify-center pointer-events-none z-10 pt-20">
        <div className="text-center">
          <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/10 px-4 py-2 rounded-full backdrop-blur-md">
            {dict.services.sectionTag}
          </span>
          <h2 className="text-5xl md:text-7xl font-black font-[family-name:var(--font-heading)] uppercase tracking-tighter mix-blend-difference text-text">
            {dict.services.sectionTitle}
          </h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-20 mt-[-10vh]">
        {serviceKeys.map((key, i) => {
          const Icon = serviceIcons[i];
          const service = dict.services[key];
          
          // Calculate card-specific transforms for stacking effect
          const targetScale = 1 - (serviceKeys.length - i) * 0.05;
          const range = [i * (1 / serviceKeys.length), 1];
          const scale = useTransform(scrollYProgress, range, [1, targetScale]);
          const opacity = useTransform(scrollYProgress, range, [1, 0.5]);

          return (
            <motion.div
              key={key}
              style={{
                scale,
                opacity,
                top: `calc(35vh + ${i * 30}px)`,
              }}
              className="sticky w-full h-[50vh] md:h-[60vh] rounded-[40px] p-8 md:p-16 mb-24 overflow-hidden border border-border/50 shadow-2xl origin-top flex flex-col md:flex-row gap-8 items-center justify-between"
              initial={{ backgroundColor: "var(--color-surface)" }}
              whileHover={{ backgroundColor: "var(--color-surface-elevated)" }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated Background Gradient inside Card */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary via-secondary to-transparent animate-gradient-shift blur-3xl -z-10" />

              <div className="flex-1 z-10">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-8 text-primary border border-border/50">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6 text-text">
                  {service.title}
                </h3>
                <p className="text-lg text-text-muted leading-relaxed max-w-lg mb-8">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {service.features.slice(0, 3).map((feature, j) => (
                    <span key={j} className="px-4 py-2 rounded-full bg-white border border-border/50 text-sm font-medium text-text-muted shadow-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Large Abstract Visual per Service */}
              <div className="hidden md:flex flex-1 items-center justify-center h-full w-full relative z-10">
                <motion.div
                  className="w-full h-full rounded-[20px] border border-border/50 bg-white/50 backdrop-blur-md shadow-inner flex items-center justify-center overflow-hidden relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Icon className="w-48 h-48 text-primary/10 absolute transition-transform duration-700 group-hover:scale-150 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,44,245,0.1),transparent)]" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
