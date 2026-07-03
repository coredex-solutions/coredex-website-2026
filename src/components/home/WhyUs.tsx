"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Target, Cpu, MapPin } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const icons = [Users, Target, Cpu, MapPin];
const colors = ["bg-[#FAFBFF]", "bg-[#F4F5FB]", "bg-[#E2E5F1]", "bg-[#FFFFFF]"];

interface WhyUsProps {
  locale: Locale;
  dict: Dictionary;
}

export default function WhyUs({ dict }: WhyUsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative bg-text text-bg overflow-hidden py-32">
      {/* Background Marquee Text */}
      <div className="absolute inset-0 z-0 flex flex-col justify-between py-20 pointer-events-none opacity-5">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap text-[15vw] font-black leading-none uppercase"
        >
          {dict.whyUs.sectionTag} &bull; {dict.whyUs.sectionTag} &bull; {dict.whyUs.sectionTag}
        </motion.div>
        <motion.div 
          animate={{ x: [-1000, 0] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap text-[15vw] font-black leading-none uppercase"
        >
          COREDEX &bull; COREDEX &bull; COREDEX &bull; COREDEX
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-32 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-black font-[family-name:var(--font-heading)] mb-6 uppercase tracking-tighter">
            {dict.whyUs.sectionTitle}
          </h2>
          <p className="text-xl md:text-2xl text-bg/70 max-w-2xl font-light">
            {dict.whyUs.sectionSubtitle}
          </p>
        </div>

        {/* Stacking Cards */}
        <div className="relative mt-20">
          {dict.whyUs.reasons.map((reason, i) => {
            const Icon = icons[i];
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(scrollYProgress, [i * 0.25, 1], [1, 1 - (dict.whyUs.reasons.length - i) * 0.05]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [i * 0.25, 1], [1, 0.5]);

            return (
              <motion.div
                key={i}
                style={{
                  scale,
                  opacity,
                  top: `calc(15vh + ${i * 40}px)`,
                }}
                className={cn(
                  "sticky w-full min-h-[40vh] md:min-h-[50vh] rounded-[3rem] p-8 md:p-16 mb-20 origin-top shadow-2xl flex flex-col md:flex-row gap-12 items-center justify-between text-text border border-text/10",
                  colors[i]
                )}
              >
                <div className="flex-1">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black font-[family-name:var(--font-heading)] mb-6 uppercase tracking-tighter">
                    {reason.title}
                  </h3>
                  <p className="text-lg md:text-xl text-text-muted leading-relaxed font-medium">
                    {reason.description}
                  </p>
                </div>
                
                <div className="hidden md:flex flex-1 justify-end h-full">
                  <div className="w-full h-full max-w-sm rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border border-primary/10 backdrop-blur-3xl flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-500" />
                    <Icon className="w-48 h-48 text-primary/30 group-hover:scale-110 transition-transform duration-700 group-hover:rotate-12" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
