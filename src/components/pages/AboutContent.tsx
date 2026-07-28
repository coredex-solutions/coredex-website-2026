"use client";

import { Lightbulb, Award, Shield, Handshake, Zap, RefreshCw } from "lucide-react";
import SectionReveal, { StaggerContainer, StaggerItem } from "@/components/ui/SectionReveal";
import Button from "@/components/ui/Button";
import type { Locale, Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const valueIcons = [Lightbulb, Award, Shield, Handshake, Zap, RefreshCw];

export default function AboutContent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="bg-bg text-text selection:bg-primary/30 transition-colors duration-300">
      
      {/* 2030 Cinematic Hero */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Massive Ambient Supernova */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] lg:w-[1200px] lg:h-[1200px] bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-full blur-[150px] pointer-events-none opacity-60" />
        
        {/* Deep Grid Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
          <SectionReveal>
            <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6 bg-primary/10 px-6 py-2 rounded-full backdrop-blur-md border border-primary/20 shadow-[0_0_30px_rgba(90,60,240,0.2)] transition-colors">
              {dict.about.heroTag}
            </span>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black font-[family-name:var(--font-heading)] mb-8 tracking-tighter drop-shadow-2xl leading-[1.1]">
              {dict.about.heroTitle}
            </h1>
            <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed transition-colors">
              {dict.about.heroSubtitle}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Our Story - The Glass Monolith */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <SectionReveal direction="left">
              <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4 transition-colors">
                {dict.about.storyTag}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] mb-8 tracking-tight">
                {dict.about.storyTitle}
              </h2>
              <div className="space-y-6 text-lg sm:text-xl text-text-secondary font-medium leading-relaxed transition-colors">
                <p>{dict.about.storyText}</p>
              </div>
            </SectionReveal>

            <SectionReveal direction="right" delay={0.2} className="relative group perspective-[1000px]">
              {/* Glowing Aura */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-3xl" />
              
              {/* The Monolith */}
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-surface border border-border shadow-2xl transition-colors">
                {/* Inner Glass */}
                <div className="absolute inset-2 rounded-[2rem] bg-surface/50 backdrop-blur-3xl border border-border p-8 flex flex-col items-center justify-center text-center transition-colors">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-primary to-secondary p-[2px] mb-8 shadow-[0_0_50px_rgba(90,60,240,0.4)]">
                    <div className="w-full h-full bg-bg rounded-3xl flex items-center justify-center transition-colors">
                      <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-text to-text/50 font-[family-name:var(--font-heading)] transition-colors">
                        C
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-[family-name:var(--font-heading)] mb-2">Coredex</h3>
                  <p className="text-text-secondary/70 font-medium tracking-widest uppercase text-sm transition-colors">Established for the Future</p>
                </div>
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* Mission & Vision - Twin Nebulas */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-y border-border bg-surface/30 transition-colors">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-text/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Card */}
            <SectionReveal>
              <div className="group relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative h-full bg-surface/50 backdrop-blur-2xl border border-border p-10 lg:p-14 rounded-[2.5rem] hover:bg-surface transition-colors duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(90,60,240,0.3)]">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black font-[family-name:var(--font-heading)] mb-6 tracking-tight">
                    {dict.about.missionTitle}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed font-medium transition-colors">
                    {dict.about.missionText}
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Vision Card */}
            <SectionReveal delay={0.2}>
              <div className="group relative h-full">
                <div className="absolute inset-0 bg-gradient-to-bl from-secondary/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative h-full bg-surface/50 backdrop-blur-2xl border border-border p-10 lg:p-14 rounded-[2.5rem] hover:bg-surface transition-colors duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/20 border border-secondary/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(66,99,235,0.3)]">
                    <Lightbulb className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black font-[family-name:var(--font-heading)] mb-6 tracking-tight">
                    {dict.about.visionTitle}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed font-medium transition-colors">
                    {dict.about.visionText}
                  </p>
                </div>
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* Core Values - The 2030 Bento Box */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#10b981]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal className="text-center mb-16 lg:mb-24">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#10b981] mb-6 bg-[#10b981]/10 px-6 py-2 rounded-full backdrop-blur-md border border-[#10b981]/20">
              {dict.about.valuesTag}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] mb-6 tracking-tight">
              {dict.about.valuesTitle}
            </h2>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {dict.about.values.map((value, i) => {
              const Icon = valueIcons[i] || Lightbulb;
              // Cycle through brand colors for a stunning glowing grid
              const colors = [
                { border: "group-hover:border-primary/50", shadow: "group-hover:shadow-[0_0_30px_rgba(90,60,240,0.2)]", text: "text-primary", hoverText: "group-hover:text-primary" },
                { border: "group-hover:border-secondary/50", shadow: "group-hover:shadow-[0_0_30px_rgba(66,99,235,0.2)]", text: "text-secondary", hoverText: "group-hover:text-secondary" },
                { border: "group-hover:border-[#10b981]/50", shadow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]", text: "text-[#10b981]", hoverText: "group-hover:text-[#10b981]" },
                { border: "group-hover:border-[#f59e0b]/50", shadow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]", text: "text-[#f59e0b]", hoverText: "group-hover:text-[#f59e0b]" },
                { border: "group-hover:border-[#ec4899]/50", shadow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]", text: "text-[#ec4899]", hoverText: "group-hover:text-[#ec4899]" },
                { border: "group-hover:border-primary/50", shadow: "group-hover:shadow-[0_0_30px_rgba(90,60,240,0.2)]", text: "text-primary", hoverText: "group-hover:text-primary" }
              ];
              const colorObj = colors[i % colors.length];

              return (
                <StaggerItem key={i}>
                  <div className={cn(
                    "group h-full bg-surface/50 backdrop-blur-xl border border-border p-8 lg:p-10 rounded-3xl transition-all duration-500",
                    colorObj.border,
                    colorObj.shadow
                  )}>
                    <div className="w-14 h-14 rounded-2xl bg-text/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Icon className={cn("w-7 h-7 transition-colors duration-500 text-text", colorObj.hoverText)} />
                    </div>
                    <h3 className="text-2xl font-black font-[family-name:var(--font-heading)] mb-4 tracking-wide text-text transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium group-hover:text-text transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 2030 Final CTA */}
      <section className="relative py-32 lg:py-48 overflow-hidden border-t border-border transition-colors duration-300">
        {/* Massive center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/20 to-[#ec4899]/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SectionReveal>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-[family-name:var(--font-heading)] mb-8 tracking-tighter text-text drop-shadow-xl transition-colors">
              {dict.cta.title}
            </h2>
            <p className="text-xl sm:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto font-medium transition-colors">
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
