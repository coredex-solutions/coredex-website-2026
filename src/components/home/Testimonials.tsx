"use client";

import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import type { Locale, Dictionary } from "@/lib/i18n";

interface TestimonialsProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Testimonials({ dict }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Double the items for infinite scroll effect
  const items = [...dict.testimonials.items, ...dict.testimonials.items];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionReveal className="text-center mb-12 lg:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            {dict.testimonials.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            {dict.testimonials.sectionTitle}
          </h2>
        </SectionReveal>

        {/* Scrolling testimonials */}
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-6 overflow-x-hidden"
          style={{ scrollBehavior: "auto" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-80 sm:w-96 glass-card p-6 lg:p-8"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-text-muted">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
