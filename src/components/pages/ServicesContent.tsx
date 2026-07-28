"use client";

import { Globe, Share2, Film, Camera, TrendingUp, Search, Palette, BarChart3, Sparkles } from "lucide-react";
import SectionReveal, { StaggerContainer, StaggerItem } from "@/components/ui/SectionReveal";
import Button from "@/components/ui/Button";
import type { Locale, Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const serviceKeys = ["webDev", "socialMedia", "videoEditing", "photography", "seo"] as const;

// 2030 Brand Colors Mapping
const serviceData = [
  { 
    icon: Globe, 
    colorHex: "#5A3CF0", // Purple
    gradient: "from-primary to-secondary",
  },
  { 
    icon: Share2, 
    colorHex: "#4263EB", // Cyan
    gradient: "from-secondary to-[#10b981]",
  },
  { 
    icon: Film, 
    colorHex: "#ec4899", // Pink
    gradient: "from-[#ec4899] to-primary",
  },
  { 
    icon: Camera, 
    colorHex: "#f59e0b", // Amber
    gradient: "from-[#f59e0b] to-[#ec4899]",
  },
  { 
    icon: TrendingUp, 
    colorHex: "#10b981", // Green
    gradient: "from-[#10b981] to-secondary",
  },
];

const processIcons = [Search, Palette, Sparkles, BarChart3];

export default function ServicesContent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="bg-bg text-text selection:bg-primary/30 transition-colors duration-300">
      
      {/* 2030 Cinematic Hero */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Massive Ambient Supernova */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] lg:w-[1200px] lg:h-[1200px] bg-gradient-to-br from-secondary/20 via-primary/10 to-transparent rounded-full blur-[150px] pointer-events-none opacity-60" />
        
        {/* Deep Grid Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
          <SectionReveal>
            <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-6 bg-secondary/10 px-6 py-2 rounded-full backdrop-blur-md border border-secondary/20 shadow-[0_0_30px_rgba(66,99,235,0.2)] transition-colors">
              {dict.services.sectionTag}
            </span>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black font-[family-name:var(--font-heading)] mb-8 tracking-tighter drop-shadow-2xl leading-[1.1] transition-colors">
              {dict.services.sectionTitle}
            </h1>
            <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed transition-colors">
              {dict.services.sectionSubtitle}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Services Zig-Zags - The Glass Monoliths */}
      <div className="relative border-t border-border bg-surface/30 transition-colors">
        {serviceKeys.map((key, i) => {
          const service = dict.services[key];
          const data = serviceData[i];
          const Icon = data.icon;
          const isReversed = i % 2 !== 0;

          return (
            <section
              key={key}
              id={key}
              className={cn(
                "relative py-24 lg:py-32 overflow-hidden border-b border-border transition-colors",
                isReversed ? "bg-bg" : "bg-surface/30"
              )}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className={cn(
                  "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center",
                  isReversed ? "lg:direction-reverse" : ""
                )}>
                  
                  {/* Content Side */}
                  <SectionReveal direction={isReversed ? "right" : "left"} className={cn(isReversed ? "lg:order-2" : "")}>
                    <div 
                      className="w-16 h-16 rounded-2xl border flex items-center justify-center mb-8 shadow-lg"
                      style={{ 
                        backgroundColor: `${data.colorHex}20`, // 20% opacity background
                        borderColor: `${data.colorHex}40`,     // 40% opacity border
                        boxShadow: `0 0 30px ${data.colorHex}40` 
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: data.colorHex }} />
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] mb-6 tracking-tight transition-colors">
                      {service.title}
                    </h2>
                    
                    <p className="text-lg sm:text-xl text-text-secondary font-medium leading-relaxed mb-10 transition-colors">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-4 text-base sm:text-lg font-medium text-text transition-colors">
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0 shadow-lg"
                            style={{ backgroundColor: data.colorHex, boxShadow: `0 0 10px ${data.colorHex}` }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div style={{ boxShadow: `0 0 20px ${data.colorHex}40` }} className="inline-block rounded-xl">
                      <Button 
                        href={`/${locale}/contact`} 
                        className="h-14 px-8 text-lg bg-text text-bg hover:bg-text/90 hover:scale-105 transition-all duration-300 rounded-xl font-bold w-full"
                      >
                        {dict.nav.getStarted}
                      </Button>
                    </div>
                  </SectionReveal>

                  {/* Visual Side - The Glowing Monolith */}
                  <SectionReveal
                    direction={isReversed ? "left" : "right"}
                    delay={0.2}
                    className={cn("relative group perspective-[1000px]", isReversed ? "lg:order-1" : "")}
                  >
                    {/* Intense Background Nebula */}
                    <div className={cn(
                      "absolute -inset-10 blur-[100px] opacity-30 group-hover:opacity-60 transition-opacity duration-700 rounded-full",
                      `bg-gradient-to-tr ${data.gradient}`
                    )} />
                    
                    {/* The Monolith Pane */}
                    <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-surface border border-border shadow-2xl transition-colors">
                      {/* Inner Glass */}
                      <div className="absolute inset-2 rounded-[2rem] bg-surface/50 backdrop-blur-3xl border border-border flex items-center justify-center group-hover:bg-surface transition-colors duration-500">
                        {/* 3D Floating Icon Crest */}
                        <div className={cn(
                          "w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] p-[2px] shadow-2xl transition-transform duration-700 group-hover:scale-110",
                          `bg-gradient-to-br ${data.gradient}`
                        )} style={{ boxShadow: `0 0 80px ${data.colorHex}60` }}>
                          <div className="w-full h-full bg-bg rounded-[2.5rem] flex items-center justify-center backdrop-blur-md transition-colors">
                            <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-text drop-shadow-md transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* The Process Grid - Glowing 3D Cards */}
      <section className="relative py-24 lg:py-40 overflow-hidden bg-bg transition-colors">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal className="text-center mb-16 lg:mb-24">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6 bg-primary/10 px-6 py-2 rounded-full backdrop-blur-md border border-primary/20 shadow-[0_0_30px_rgba(90,60,240,0.2)] transition-colors">
              {dict.services.processTag}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] tracking-tight transition-colors">
              {dict.services.processTitle}
            </h2>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {(["discovery", "strategy", "execution", "results"] as const).map((step, i) => {
              const ProcessIcon = processIcons[i];
              return (
                <StaggerItem key={step}>
                  <div className="group relative h-full pt-6">
                    {/* Massive Glowing Number Badge */}
                    <div className="absolute top-0 left-8 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[1px] shadow-[0_0_30px_rgba(90,60,240,0.4)] z-10 group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="w-full h-full bg-bg rounded-2xl flex items-center justify-center transition-colors">
                        <span className="text-2xl font-black text-text transition-colors">{i + 1}</span>
                      </div>
                    </div>
                    
                    {/* Glass Card */}
                    <div className="relative h-full bg-surface/50 backdrop-blur-2xl border border-border p-8 pt-12 lg:p-10 lg:pt-14 rounded-3xl hover:bg-surface transition-colors duration-500">
                      <div className="w-12 h-12 rounded-xl bg-text/5 flex items-center justify-center mb-6 transition-colors">
                        <ProcessIcon className="w-6 h-6 text-text group-hover:text-secondary transition-colors duration-300" />
                      </div>
                      <h3 className="text-2xl font-black font-[family-name:var(--font-heading)] mb-4 tracking-wide transition-colors">
                        {dict.services.process[step].title}
                      </h3>
                      <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium group-hover:text-text transition-colors duration-300">
                        {dict.services.process[step].description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 2030 Final CTA */}
      <section className="relative py-32 lg:py-48 overflow-hidden border-t border-border bg-bg transition-colors">
        {/* Massive center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/20 to-[#ec4899]/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SectionReveal>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-[family-name:var(--font-heading)] mb-8 tracking-tighter text-text drop-shadow-xl transition-colors">
              {dict.cta.title}
            </h2>
            <p className="text-xl sm:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto font-medium leading-relaxed transition-colors">
              {dict.cta.subtitle}
            </p>
            <Button 
              href={`/${locale}/contact`} 
              className="h-16 px-10 text-xl bg-text text-bg hover:bg-text/90 hover:scale-105 shadow-2xl transition-all duration-300 rounded-2xl font-bold"
            >
              {dict.cta.button}
            </Button>
          </SectionReveal>
        </div>
      </section>

    </div>
  );
}
