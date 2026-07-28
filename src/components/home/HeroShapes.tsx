"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroShapes() {
  const gridRef = useRef<SVGSVGElement>(null);
  const wireframeRef = useRef<SVGSVGElement>(null);
  const geoRefs = useRef<SVGSVGElement[]>([]);

  useGSAP(() => {
    // 1. Grid Animation: Moving the dashoffset to simulate data flow
    if (gridRef.current) {
      gsap.to(gridRef.current.querySelectorAll("path"), {
        strokeDashoffset: -100,
        duration: 3,
        ease: "none",
        repeat: -1,
      });
    }

    // 2. Wireframe Sphere Animation: Continuous slow 3D-like rotation
    if (wireframeRef.current) {
      gsap.to(wireframeRef.current, {
        rotateZ: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
      // Add subtle scale pulsing
      gsap.to(wireframeRef.current, {
        scale: 1.05,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }

    // 3. Floating Micro-Geometry
    geoRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: i % 2 === 0 ? -30 : 30,
        x: i % 3 === 0 ? 20 : -20,
        rotateZ: i % 2 === 0 ? 180 : -180,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      });
    });

  }, []);

  const addToGeoRef = (el: SVGSVGElement | null) => {
    if (el && !geoRefs.current.includes(el)) {
      geoRefs.current.push(el);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden perspective-[1000px]">
      
      {/* Abstract Glowing Grid */}
      <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center transform-style-3d">
        <svg
          ref={gridRef}
          viewBox="0 0 1000 1000"
          className="w-[200vw] h-[200vh] sm:w-[150vw] sm:h-[150vh] transform rotate-x-60 -rotate-z-45"
          style={{ strokeDasharray: "10 10", filter: "blur(0.5px)" }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <path
              key={`h-${i}`}
              d={`M0 ${i * 50} L1000 ${i * 50}`}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-primary"
            />
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <path
              key={`v-${i}`}
              d={`M${i * 50} 0 L${i * 50} 1000`}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-secondary"
            />
          ))}
        </svg>
      </div>

      {/* Centerpiece 3D Wireframe Sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 mix-blend-screen w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px]">
        <svg
          ref={wireframeRef}
          viewBox="0 0 100 100"
          className="w-full h-full text-text"
          style={{ filter: "drop-shadow(0 0 20px rgba(90,60,240,0.5))" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={`ellipse-${i}`}
              cx="50"
              cy="50"
              rx="45"
              ry="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={`ellipse-v-${i}`}
              cx="50"
              cy="50"
              rx="15"
              ry="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
        </svg>
      </div>

      {/* Floating Micro-Geometry */}
      <svg ref={addToGeoRef} viewBox="0 0 24 24" className="absolute top-[15%] right-[20%] w-8 h-8 text-primary opacity-30">
        <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      
      <svg ref={addToGeoRef} viewBox="0 0 24 24" className="absolute bottom-[20%] left-[10%] w-12 h-12 text-secondary opacity-20">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
      
      <svg ref={addToGeoRef} viewBox="0 0 24 24" className="absolute top-[40%] left-[25%] w-6 h-6 text-[#10b981] opacity-30">
        <path d="M12 2 L12 22 M2 12 L22 12" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      
      <svg ref={addToGeoRef} viewBox="0 0 24 24" className="absolute bottom-[30%] right-[15%] w-10 h-10 text-primary opacity-20">
        <rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 12 12)" />
      </svg>

    </div>
  );
}
