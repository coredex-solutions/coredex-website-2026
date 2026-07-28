"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function GsapLenisSync({ children }: { children: ReactNode }) {
  // Sync GSAP ScrollTrigger with Lenis
  useLenis((lenis) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Ensure GSAP ticker is synced with Lenis to prevent jitter
    gsap.ticker.add((time) => {
      // Lenis handles its own RAF, but we might want to ensure ScrollTrigger refreshes on resize
    });
    return () => gsap.ticker.remove(() => {});
  }, []);

  return <>{children}</>;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1.2, smoothWheel: true }}>
      <GsapLenisSync>{children}</GsapLenisSync>
    </ReactLenis>
  );
}
