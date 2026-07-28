"use client";

import { useRef, useEffect } from "react";
import { Globe, Share2, Film, Camera, TrendingUp } from "lucide-react";
import Image from "next/image";
import type { Locale, Dictionary } from "@/lib/i18n";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const serviceIcons = [Globe, Share2, Film, Camera, TrendingUp];
const serviceKeys = ["webDev", "socialMedia", "videoEditing", "photography", "seo"] as const;
const serviceImages = [
  "/images/services/web_dev.png",
  "/images/services/social_media.png",
  "/images/services/video_editing.png",
  "/images/services/photography.png",
  "/images/services/seo.png"
];

interface ServicesPreviewProps {
  locale: Locale;
  dict: Dictionary;
}

export default function ServicesPreview({ locale, dict }: ServicesPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Cinematic Header Reveal
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      }
    );

    // Advanced Stacking Cards via GSAP ScrollTrigger + CSS Sticky
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    wrappersRef.current.forEach((wrapper, index) => {
      if (!wrapper) return;
      const innerCard = wrapper.querySelector('.inner-card') as HTMLElement;
      if (!innerCard) return;

      const total = wrappersRef.current.length;
      
      // Card Mouse Tracking Glow (Linear effect)
      const glow = innerCard.querySelector('.card-glow') as HTMLElement;
      if (glow && !isMobile) {
        const xTo = gsap.quickTo(glow, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(glow, "y", { duration: 0.4, ease: "power3" });

        innerCard.addEventListener("mousemove", (e) => {
          const rect = innerCard.getBoundingClientRect();
          xTo(e.clientX - rect.left - 300); // 300 is half the glow size
          yTo(e.clientY - rect.top - 300);
        });
      }

      // The last card stays fully visible on top, no scale down needed
      if (index === total - 1) return;

      // As user scrolls past this card, push the inner card back in 3D space
      gsap.to(innerCard, {
        scale: isMobile ? 1 : 1 - (total - index) * 0.05,
        yPercent: isMobile ? -5 : -10,
        filter: "brightness(0.4)", // Darken as it goes to the back
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: `top ${10 + index * 2}vh`, // Animation starts when it sticks
          endTrigger: containerRef.current,
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-bg pb-32 transition-colors duration-300">
      {/* Header */}
      <div ref={headerRef} className="flex items-center justify-center z-10 pt-24 pb-16 opacity-0">
        <div className="text-center px-4">
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4 bg-secondary/10 px-6 py-2 rounded-full backdrop-blur-md border border-secondary/20 shadow-[0_0_30px_rgba(66,99,235,0.2)]">
            {dict.services.sectionTag}
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-[family-name:var(--font-heading)] uppercase tracking-tighter rtl:tracking-normal text-text drop-shadow-[0_0_30px_rgba(90,60,240,0.15)] transition-colors">
            {dict.services.sectionTitle}
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20 perspective-[2000px]">
        {serviceKeys.map((key, i) => {
          const service = dict.services[key];
          const Icon = serviceIcons[i];
          const imageSrc = serviceImages[i];

          return (
            <div 
              key={key}
              ref={el => { wrappersRef.current[i] = el; }}
              className="w-full mb-12 md:mb-24 sticky z-10"
              style={{ top: `${10 + i * 2}vh` }}
            >
              <div className="inner-card w-full min-h-[450px] md:h-[550px] rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-12 overflow-hidden border border-border flex flex-col md:flex-row gap-8 items-center justify-between group transform-style-3d bg-surface relative will-change-transform transition-[border-color,box-shadow,background-color] duration-700 ease-out hover:shadow-[0_30px_80px_rgba(90,60,240,0.2)] hover:border-primary/40 shadow-xl origin-top">
                {/* GSAP Mouse Tracking Glow */}
                <div className="card-glow absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 mix-blend-screen" />
                
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-20 bg-[linear-gradient(rgba(184,192,224,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(184,192,224,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                {/* Content Area */}
                <div className="flex-1 z-10 relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-text/5 backdrop-blur-md shadow-lg flex items-center justify-center mb-6 md:mb-8 text-secondary border border-border group-hover:scale-110 transition-transform duration-500 group-hover:border-secondary group-hover:bg-secondary/10 group-hover:text-primary">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_15px_rgba(66,99,235,0.5)] transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-[family-name:var(--font-heading)] mb-4 md:mb-6 text-text tracking-tight drop-shadow-md transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg mb-6 md:mb-8 font-medium transition-colors">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {service.features.slice(0, 3).map((feature: string, j: number) => (
                      <span key={j} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-text/5 border border-border text-xs sm:text-sm font-semibold text-text shadow-[0_0_20px_rgba(90,60,240,0.05)] group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2030-Style AI Image Visual */}
                <div className="hidden md:flex flex-1 items-center justify-center h-full w-full relative z-10 p-4">
                  <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-border shadow-2xl group-hover:shadow-[0_0_50px_rgba(90,60,240,0.3)] transition-all duration-700">
                    <Image 
                      src={imageSrc} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Glass Overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay pointer-events-none group-hover:opacity-50 transition-opacity duration-700" />
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
