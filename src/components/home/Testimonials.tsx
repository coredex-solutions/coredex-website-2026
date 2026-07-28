"use client";

import { useRef } from "react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { Quote } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface TestimonialsProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Testimonials({ dict }: TestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Duplicate items heavily to ensure the infinite scroll has enough content to fill ultra-wide screens
  const originalItems = dict.testimonials.items;
  const scrollingItems = [...originalItems, ...originalItems, ...originalItems, ...originalItems];

  useGSAP(() => {
    // Header Reveal
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
    );

    // Infinite Marquee Loop via GSAP
    // We animate from 0 to -50% (since we duplicated items 4x, 50% is exactly 2 sets)
    const marqueeTween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 40,
      repeat: -1,
    });

    // Pause on Hover
    if (marqueeRef.current) {
      marqueeRef.current.addEventListener("mouseenter", () => marqueeTween.pause());
      marqueeRef.current.addEventListener("mouseleave", () => marqueeTween.play());
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-bg overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="absolute w-[1000px] h-[500px] rounded-full bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20 px-4 opacity-0">
          <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/10 px-6 py-2 rounded-full backdrop-blur-md border border-primary/20 shadow-[0_0_30px_rgba(90,60,240,0.2)] transition-colors">
            {dict.testimonials.sectionTag}
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-[family-name:var(--font-heading)] uppercase tracking-tighter rtl:tracking-normal text-text drop-shadow-2xl transition-colors">
            Client Voices
          </h2>
        </div>

        {/* Infinite Marquee Container */}
        <div 
          className="relative w-full flex overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          }}
        >
          <div
            ref={marqueeRef}
            className="flex gap-8 px-4 w-max will-change-transform hover:cursor-grab active:cursor-grabbing"
          >
            {scrollingItems.map((item, index) => (
              <div 
                key={index}
                className="relative group w-[85vw] sm:w-[500px] md:w-[600px] flex-shrink-0 p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-surface border border-border backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.2)] transition-all duration-500 hover:bg-surface/80 hover:border-primary/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(90,60,240,0.15)]"
              >
                {/* Glowing Quote Watermark */}
                <Quote className="absolute top-6 right-6 md:top-8 md:right-8 w-16 h-16 md:w-24 md:h-24 text-text opacity-5 transform group-hover:scale-125 group-hover:-rotate-12 group-hover:opacity-10 group-hover:text-primary transition-all duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full justify-between gap-8 md:gap-12">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] leading-snug md:leading-tight text-text-secondary group-hover:text-text transition-colors duration-300">
                    "{item.text}"
                  </h3>
                  
                  <div className="flex items-center gap-4 md:gap-6 mt-4">
                    {/* Glowing Avatar */}
                    <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] shadow-[0_0_20px_rgba(90,60,240,0.3)] transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      <div className="w-full h-full bg-bg rounded-full flex items-center justify-center text-lg md:text-xl font-black text-text transition-colors">
                        {item.name.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <p className="font-black text-lg md:text-xl text-text tracking-wide transition-colors leading-tight group-hover:text-primary">{item.name}</p>
                      <p className="text-xs md:text-sm text-secondary font-bold uppercase tracking-[0.2em] transition-colors mt-1">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
