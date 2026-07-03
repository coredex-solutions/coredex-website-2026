"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      {/* @ts-expect-error - React 19 type mismatch with Lenis React 18 peer deps */}
      {children}
    </ReactLenis>
  );
}
