"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function RaycastBeams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !beamsRef.current) return;

    // Continuous slow drift of the beams
    gsap.to(beamsRef.current, {
      xPercent: -5,
      yPercent: -5,
      duration: 20,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Parallax mouse tracking
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
      const xTo = gsap.quickTo(beamsRef.current, "x", { duration: 1, ease: "power3.out" });
      const yTo = gsap.quickTo(beamsRef.current, "y", { duration: 1, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 60; // max shift 30px
        const y = (e.clientY / innerHeight - 0.5) * 60;
        xTo(x);
        yTo(y);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-bg transition-colors duration-300">
      
      {/* SVG Noise Filter Definition */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.6" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Rotating Beams Container */}
      <div 
        ref={beamsRef}
        className="absolute inset-[-50%] flex gap-8 md:gap-16 items-center justify-center origin-center opacity-90"
        style={{ transform: "rotate(-35deg) scale(1.5)" }}
      >
        {/* Beam 1: Primary Blue */}
        <div className="w-[15%] h-[200%] bg-gradient-to-t from-transparent via-[#4263EB] to-transparent blur-[80px] md:blur-[120px]" />
        
        {/* Beam 2: Deep Indigo / Violet */}
        <div className="w-[20%] h-[200%] bg-gradient-to-b from-transparent via-[#5A3CF0] to-transparent blur-[80px] md:blur-[120px] translate-y-[10%]" />
        
        {/* Beam 3: Hot Pink / Purple (accent) */}
        <div className="w-[10%] h-[200%] bg-gradient-to-t from-transparent via-[#D946EF] to-transparent blur-[80px] md:blur-[120px] -translate-y-[15%]" />
        
        {/* Beam 4: Cyan (highlight) */}
        <div className="w-[15%] h-[200%] bg-gradient-to-b from-transparent via-[#06B6D4] to-transparent blur-[80px] md:blur-[120px] translate-y-[5%]" />
        
        {/* Beam 5: Primary Blue again for balance */}
        <div className="w-[25%] h-[200%] bg-gradient-to-t from-transparent via-[#4263EB] to-transparent blur-[80px] md:blur-[120px] -translate-y-[10%]" />
      </div>

      {/* Grain Overlay */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-[0.4]" 
        style={{ filter: "url(#noiseFilter)" }}
      />
      
      {/* Secondary Grain for extra crispness (hard-light) */}
      <div 
        className="absolute inset-0 mix-blend-hard-light opacity-[0.15]" 
        style={{ filter: "url(#noiseFilter)" }}
      />

      {/* Theme-adaptive vignette to focus the center text */}
      <div 
        className="absolute inset-0 opacity-80 transition-colors duration-300"
        style={{ background: "radial-gradient(ellipse at center, transparent 0%, var(--bg) 100%)" }}
      />
    </div>
  );
}
