"use client";

import { useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import type { Locale, Dictionary } from "@/lib/i18n";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Zap, Activity, ShieldCheck } from "lucide-react";
import RaycastBeams from "./RaycastBeams";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Hero({ locale, dict }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // 1. Split text for high-tension cinematic reveal
    // IMPORTANT: Arabic is a connected script. Splitting by 'chars' breaks ligatures and reverses text.
    // We only split by 'words' for Arabic to preserve perfect cursive rendering.
    const splitTitle = new SplitType(titleRef.current as HTMLElement, { 
      types: locale === 'ar' ? 'words' : 'chars,words' 
    });
    
    const splitTargets = locale === 'ar' ? splitTitle.words : splitTitle.chars;
    
    // 2. Cinematic Timeline Entry
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    
    // Set initial states
    gsap.set(splitTargets, { opacity: 0, y: 150, scale: 0.8, rotateZ: 10 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 30, filter: "blur(10px)" });
    gsap.set(buttonsRef.current, { opacity: 0, y: 40 });
    gsap.set(indicatorRef.current, { opacity: 0 });
    gsap.set(badgesRef.current, { opacity: 0, scale: 0.5, y: 50 });

    // Sequence
    tl.to(splitTargets, { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateZ: 0,
      duration: 1.5, 
      stagger: locale === 'ar' ? 0.1 : 0.02,
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.5,
    }, "-=1.2")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
    }, "-=1.2")
    .to(badgesRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "back.out(1.5)"
    }, "-=1.0")
    .to(indicatorRef.current, {
      opacity: 0.5,
      duration: 1
    }, "-=0.5");

    // Continuous Scroll Indicator Loop
    gsap.to(indicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Floating animation for badges
    badgesRef.current.forEach((badge, i) => {
      gsap.to(badge, {
        y: (i % 2 === 0 ? -15 : 15),
        duration: 2 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });

    // 3. Scroll Parallax Effects
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    scrollTl.to(textWrapperRef.current, {
      yPercent: 40,
      opacity: 0,
      filter: "blur(20px)",
      scale: 0.95,
      ease: "none"
    }, 0);

    // Parallax badges
    badgesRef.current.forEach((badge, i) => {
      scrollTl.to(badge, {
        yPercent: -50 * (i + 1),
        opacity: 0,
        ease: "none"
      }, 0);
    });

    // 4. Dynamic Mouse Tracking Glow (Desktop only)
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (!glowRef.current || !containerRef.current) return;
      
      const xTo = gsap.quickTo(glowRef.current, "left", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(glowRef.current, "top", { duration: 0.6, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        xTo(clientX);
        yTo(clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    });

    return () => {
      splitTitle.revert();
    };

  }, { scope: containerRef });

  const addToBadgesRef = (el: HTMLDivElement | null) => {
    if (el && !badgesRef.current.includes(el)) {
      badgesRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="relative h-[120vh] bg-bg text-text selection:bg-primary/30 transition-colors duration-300 overflow-hidden">
      
      {/* High-Performance Mouse Glow */}
      <div 
        ref={glowRef}
        className="hidden md:block absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 mix-blend-screen -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          background: "radial-gradient(circle, rgba(90,60,240,0.4) 0%, rgba(90,60,240,0.1) 40%, transparent 70%)",
          left: "50%",
          top: "50%"
        }}
      />

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center perspective-[1000px] z-10 w-full px-4 sm:px-6">
        
        {/* Raycast-style Cinematic Beams Background */}
        <RaycastBeams />

        {/* Floating Micro-UI Badges */}
        <div ref={addToBadgesRef} className="absolute top-[20%] left-[10%] md:left-[15%] lg:left-[20%] z-20 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface/50 backdrop-blur-xl border border-border shadow-2xl">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-text-secondary tracking-widest uppercase">Next.js 15 Ready</span>
        </div>

        <div ref={addToBadgesRef} className="absolute top-[35%] right-[5%] md:right-[10%] lg:right-[15%] z-20 hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface/50 backdrop-blur-xl border border-border shadow-2xl">
          <Activity className="w-4 h-4 text-secondary" />
          <span className="text-xs font-bold text-text-secondary tracking-widest uppercase">60FPS Optimized</span>
        </div>

        <div ref={addToBadgesRef} className="absolute bottom-[25%] left-[5%] md:left-[15%] z-20 hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface/50 backdrop-blur-xl border border-border shadow-2xl">
          <ShieldCheck className="w-4 h-4 text-[#10b981]" />
          <span className="text-xs font-bold text-text-secondary tracking-widest uppercase">99.9% Uptime</span>
        </div>

        {/* Central Content */}
        <div 
          ref={textWrapperRef}
          className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Pre-title Label */}
          <div className="mb-6 opacity-0" ref={(el) => { if(el && !badgesRef.current.includes(el)) badgesRef.current.push(el) }}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              Premium Software Solutions
            </span>
          </div>

          {/* Masked Title Container */}
          <div className="overflow-hidden w-full pb-4 sm:pb-8">
            <h1
              ref={titleRef}
              className="text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] font-black font-[family-name:var(--font-heading)] uppercase tracking-tighter rtl:tracking-normal text-text drop-shadow-2xl will-change-transform pb-2"
            >
              {dict.hero.title}
            </h1>
          </div>

          <div
            ref={subtitleRef}
            className="mt-4 md:mt-8 max-w-2xl lg:max-w-3xl px-4"
          >
            <p className="text-base sm:text-xl md:text-2xl text-text-secondary font-medium leading-relaxed drop-shadow-md">
              {dict.hero.subtitle}
            </p>
          </div>
          
          {/* Floating Interactive Elements */}
          <div 
            ref={buttonsRef}
            className="mt-12 md:mt-16 pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-8 sm:px-0"
          >
            <Magnetic>
              <div className="w-full sm:w-auto">
                <Button
                  href={`/${locale}/contact`}
                  className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 text-base sm:text-lg bg-text text-bg hover:scale-105 transition-transform duration-300 rounded-2xl font-bold flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  {dict.hero.cta}
                </Button>
              </div>
            </Magnetic>
            
            <Magnetic>
              <div className="w-full sm:w-auto">
                <Button
                  href={`/${locale}/projects`}
                  variant="secondary"
                  className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 text-base sm:text-lg rounded-2xl font-bold flex items-center justify-center bg-surface/50 backdrop-blur-xl border border-border hover:bg-surface/80 hover:border-primary/50 hover:scale-105 transition-all duration-300"
                >
                  {dict.hero.ctaSecondary}
                </Button>
              </div>
            </Magnetic>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={indicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-text-secondary font-bold">Scroll</span>
          <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-text-secondary to-transparent" />
        </div>

      </div>
    </section>
  );
}
