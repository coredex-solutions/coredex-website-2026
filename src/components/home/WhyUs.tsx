"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Rocket, Target } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const icons = [Zap, Shield, Rocket, Target];
const gradients = [
  "from-primary to-secondary",
  "from-secondary to-[#10b981]",
  "from-[#f59e0b] to-[#ef4444]",
  "from-[#ec4899] to-primary",
];
const hexColors = ["#5A3CF0", "#4263EB", "#f59e0b", "#ec4899"];
const fakeStats = [98, 99, 100, 95];

interface WhyUsProps {
  locale: Locale;
  dict: Dictionary;
}

export default function WhyUs({ dict }: WhyUsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // 1. Section Header Reveal
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: headerRef.current, start: "top 80%" } }
    );

    // 2. Card Stagger Reveal
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" }
      }
    );

  }, { scope: containerRef });

  // GSAP Counter for active item
  useGSAP(() => {
    const activeStat = document.querySelector(`.stat-number-${activeIndex}`);
    const activeBar = document.querySelector(`.stat-bar-${activeIndex}`);
    
    if (activeStat) {
      gsap.fromTo(activeStat, 
        { innerText: 0 }, 
        { 
          innerText: fakeStats[activeIndex], 
          duration: 1.5, 
          snap: { innerText: 1 }, 
          ease: "power2.out" 
        }
      );
    }

    if (activeBar) {
      gsap.fromTo(activeBar,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5, ease: "power3.inOut" }
      );
    }
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 bg-bg overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-24 opacity-0">
          <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4 bg-secondary/10 px-6 py-2 rounded-full backdrop-blur-md border border-secondary/20 shadow-[0_0_30px_rgba(66,99,235,0.2)]">
            {dict.whyUs.sectionTag}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-[family-name:var(--font-heading)] uppercase tracking-tighter rtl:tracking-normal text-text drop-shadow-2xl transition-colors">
            {dict.whyUs.sectionTitle}
          </h2>
        </div>

        {/* ===== MOBILE: Stacked Expandable Cards ===== */}
        <div className="flex flex-col gap-4 w-full md:hidden">
          {dict.whyUs.reasons.map((item, index) => {
            const Icon = icons[index % icons.length];
            const isActive = activeIndex === index;
            const gradient = gradients[index % gradients.length];
            const hex = hexColors[index % hexColors.length];
            const targetStat = fakeStats[index];

            return (
              <div
                key={index}
                ref={el => { cardsRef.current[index] = el; }}
                onClick={() => setActiveIndex(isActive ? -1 : index)}
                className={cn(
                  "relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 border opacity-0",
                  isActive ? "bg-surface border-border" : "bg-surface/50 border-border/50"
                )}
                style={{ boxShadow: isActive ? `0 0 40px ${hex}20` : "none" }}
              >
                {/* Active Background Gradient */}
                {isActive && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-0 pointer-events-none">
                    <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${gradient}`} />
                  </motion.div>
                )}

                {/* Card Header - Always Visible */}
                <div className="relative z-10 flex items-center gap-4 p-5">
                  <div 
                    className={cn(
                      "flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                      isActive ? `bg-gradient-to-br ${gradient} shadow-lg` : "bg-text/5"
                    )}
                    style={{ boxShadow: isActive ? `0 0 20px ${hex}40` : "none" }}
                  >
                    <Icon className={cn("transition-all duration-500", isActive ? "w-7 h-7 text-white" : "w-6 h-6 text-text/40")} />
                  </div>

                  <h3 className={cn("text-lg font-bold font-[family-name:var(--font-heading)] uppercase tracking-wide transition-colors duration-300 flex-1", isActive ? "text-text" : "text-text/50")}>
                    {item.title}
                  </h3>

                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300", isActive ? "border-text/20 bg-text/10 rotate-180" : "border-border bg-text/5")}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-text-secondary">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-0">
                        <div className="bg-bg/40 backdrop-blur-md border border-border rounded-2xl p-5 transition-colors">
                          <p className="text-base text-text-secondary leading-relaxed font-medium transition-colors mb-6">
                            {item.description}
                          </p>
                          
                          {/* Progress Stat */}
                          <div className="mt-4">
                            <div className="flex justify-between items-end mb-2">
                              <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Efficiency</span>
                              <span className="text-3xl font-black font-[family-name:var(--font-heading)] text-text">
                                <span className={`stat-number-${index}`}>0</span>%
                              </span>
                            </div>
                            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                              <div className={`stat-bar-${index} h-full bg-gradient-to-r ${gradient} w-full`} style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }} />
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Glow Line */}
                <div 
                  className={cn("absolute bottom-0 left-0 w-full h-0.5 transition-opacity duration-500", isActive ? "opacity-100" : "opacity-0")}
                  style={{ backgroundColor: hex, boxShadow: `0 0 15px ${hex}` }}
                />
              </div>
            );
          })}
        </div>

        {/* ===== DESKTOP: Horizontal Expanding Accordion ===== */}
        <div className="hidden md:flex w-full h-[550px] lg:h-[600px] gap-4 p-3 rounded-[2.5rem] bg-surface/30 border border-border backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.2)] transition-colors">
          {dict.whyUs.reasons.map((item, index) => {
            const Icon = icons[index % icons.length];
            const isActive = activeIndex === index;
            const gradient = gradients[index % gradients.length];
            const hex = hexColors[index % hexColors.length];

            return (
              <motion.div
                key={index}
                layout
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                transition={{ duration: 0.6, layout: { type: "spring", stiffness: 200, damping: 25 } }}
                ref={el => { cardsRef.current[index + dict.whyUs.reasons.length] = el; }}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] cursor-pointer flex flex-col justify-end transition-colors duration-500 opacity-0",
                  isActive ? "bg-surface border border-border" : "bg-surface/30 border border-transparent hover:bg-surface/60"
                )}
                style={{ flex: isActive ? 5 : 1, boxShadow: isActive ? `0 0 50px ${hex}15` : "none" }}
              >
                {/* Active State Background Effects */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-0 pointer-events-none">
                      <div className={`absolute inset-0 opacity-15 bg-gradient-to-br ${gradient}`} />
                      <div className="absolute -right-20 -bottom-20 opacity-[0.08] transform group-hover:scale-110 transition-transform duration-1000">
                        <Icon className="w-80 h-80 lg:w-96 lg:h-96" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glowing Bottom Bar */}
                <div 
                  className={cn("absolute bottom-0 left-0 w-full h-1 transition-opacity duration-500 z-20", isActive ? "opacity-100" : "opacity-0")}
                  style={{ backgroundColor: hex, boxShadow: `0 0 20px ${hex}` }}
                />

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-row">
                  
                  {/* Icon & Title */}
                  <div className={cn("flex flex-col items-center justify-between p-6 lg:p-8 transition-all duration-500 min-w-[80px]", isActive ? "w-2/5 lg:w-1/3 items-start justify-start gap-6" : "h-full justify-end")}>
                    <motion.div 
                      layout="position"
                      className={cn("flex items-center justify-center rounded-2xl transition-all duration-500", isActive ? `w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${gradient}` : "w-12 h-12 bg-text/5 group-hover:bg-text/10")}
                      style={{ boxShadow: isActive ? `0 0 30px ${hex}40` : "none" }}
                    >
                      <Icon className={cn("transition-colors duration-500", isActive ? "w-8 h-8 lg:w-10 lg:h-10 text-white" : "w-6 h-6 text-text/50 group-hover:text-text")} />
                    </motion.div>
                    
                    <motion.h3 
                      layout="position"
                      className={cn("font-black uppercase tracking-widest whitespace-nowrap transition-all duration-500", isActive ? "text-2xl lg:text-4xl xl:text-5xl text-text whitespace-normal" : "text-lg text-text-secondary -rotate-90 origin-left translate-y-full -translate-x-4 mb-20")}
                    >
                      {item.title}
                    </motion.h3>
                  </div>

                  {/* Description & Stats (Only visible when active) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4, delay: 0.2 }}
                        className="flex-1 p-6 lg:p-12 pl-0 lg:pl-0 flex items-center"
                      >
                        <div className="backdrop-blur-md bg-bg/40 border border-border p-6 lg:p-8 rounded-3xl w-full transition-colors flex flex-col justify-center">
                          <p className="text-lg lg:text-2xl text-text-secondary leading-relaxed font-medium transition-colors mb-12">
                            {item.description}
                          </p>

                          {/* GSAP Progress Reveal */}
                          <div className="w-full">
                            <div className="flex justify-between items-end mb-4">
                              <span className="text-sm lg:text-base font-bold text-text-secondary uppercase tracking-widest">Target Achievement</span>
                              <span className="text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] text-text drop-shadow-md">
                                <span className={`stat-number-${index}`}>0</span>%
                              </span>
                            </div>
                            <div className="h-3 w-full bg-border rounded-full overflow-hidden shadow-inner">
                              <div className={`stat-bar-${index} h-full bg-gradient-to-r ${gradient} w-full shadow-[0_0_20px_currentColor]`} style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }} />
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

