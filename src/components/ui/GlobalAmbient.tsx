"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlobalAmbient() {
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle background breathe animation
    gsap.to(bgRef.current, {
      opacity: 0.8,
      scale: 1.05,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Custom cursor glow tracking
    const cursor = cursorGlowRef.current;
    if (!cursor) return;

    // quickTo for ultra high performance 60fps tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      // center the glow on cursor
      xTo(e.clientX - 150); 
      yTo(e.clientY - 150);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* Fixed Ambient Background Gradient */}
      <div 
        ref={bgRef}
        className="fixed inset-0 z-[-1] pointer-events-none opacity-50 transition-opacity duration-1000"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Mouse Cursor Glow */}
      <div 
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-50 mix-blend-screen will-change-transform hidden md:block"
        style={{ transform: "translate(-150px, -150px)" }}
      />
      
      {/* Subtle Grid overlay across the whole site */}
      <div className="fixed inset-0 z-[-1] opacity-[0.02] dark:opacity-5 bg-[linear-gradient(rgba(184,192,224,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(184,192,224,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
    </>
  );
}
