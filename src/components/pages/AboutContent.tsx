"use client";

import { Lightbulb, Award, Shield, Handshake, Zap, RefreshCw } from "lucide-react";
import SectionReveal, { StaggerContainer, StaggerItem } from "@/components/ui/SectionReveal";
import GradientBlob from "@/components/ui/GradientBlob";
import Button from "@/components/ui/Button";
import type { Locale, Dictionary } from "@/lib/i18n";

const valueIcons = [Lightbulb, Award, Shield, Handshake, Zap, RefreshCw];

export default function AboutContent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,44,245,0.06),transparent_60%)]" />
        <GradientBlob className="w-[400px] h-[400px] -top-20 -right-40 opacity-40" color="primary" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SectionReveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {dict.about.heroTag}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-6">
              {dict.about.heroTitle}
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              {dict.about.heroSubtitle}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionReveal direction="left">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                {dict.about.storyTag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-6">
                {dict.about.storyTitle}
              </h2>
              <p className="text-text-muted leading-relaxed">
                {dict.about.storyText}
              </p>
            </SectionReveal>

            <SectionReveal direction="right" delay={0.2}>
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-border-light">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-white font-[family-name:var(--font-heading)]">C</span>
                    </div>
                    <p className="text-sm font-medium text-text-muted">Coredex Solutions</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding relative overflow-hidden bg-surface-elevated/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <SectionReveal>
              <div className="glass-card p-8 lg:p-10 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">
                  {dict.about.missionTitle}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {dict.about.missionText}
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="glass-card p-8 lg:p-10 h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Lightbulb className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">
                  {dict.about.visionTitle}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {dict.about.visionText}
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding relative overflow-hidden">
        <GradientBlob className="w-[300px] h-[300px] -bottom-20 -right-20 opacity-30" color="accent" />

        <div className="relative max-w-7xl mx-auto">
          <SectionReveal className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {dict.about.valuesTag}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
              {dict.about.valuesTitle}
            </h2>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {dict.about.values.map((value, i) => {
              const Icon = valueIcons[i] || Lightbulb;
              return (
                <StaggerItem key={i}>
                  <div className="glass-card p-6 lg:p-8">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-4">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden bg-surface-elevated/50">
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
              {dict.cta.title}
            </h2>
            <p className="text-text-muted mb-8 max-w-xl mx-auto">
              {dict.cta.subtitle}
            </p>
            <Button href={`/${locale}/contact`} variant="primary" size="lg" icon>
              {dict.cta.button}
            </Button>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
