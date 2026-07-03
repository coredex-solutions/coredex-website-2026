"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionReveal from "@/components/ui/SectionReveal";
import type { Locale, Dictionary } from "@/lib/i18n";

const stats = [
  { value: 150, suffix: "+", key: "projects" as const },
  { value: 80, suffix: "+", key: "clients" as const },
  { value: 5, suffix: "+", key: "years" as const },
  { value: 8, suffix: "+", key: "countries" as const },
];

interface StatsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export default function StatsSection({ dict }: StatsSectionProps) {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-bg opacity-[0.97]" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-sm text-white/70">{dict.stats[stat.key]}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
