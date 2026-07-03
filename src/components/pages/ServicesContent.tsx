"use client";

import { Globe, Share2, Film, Camera, TrendingUp, Search, Palette, BarChart3, Sparkles } from "lucide-react";
import SectionReveal, { StaggerContainer, StaggerItem } from "@/components/ui/SectionReveal";
import GradientBlob from "@/components/ui/GradientBlob";
import Button from "@/components/ui/Button";
import type { Locale, Dictionary } from "@/lib/i18n";

const serviceKeys = ["webDev", "socialMedia", "videoEditing", "photography", "seo"] as const;

const serviceData = [
  { icon: Globe, color: "primary" as const, gradient: "from-primary/8 to-secondary/5", bgClass: "bg-primary/10", textClass: "text-primary", textMutedClass: "text-primary/60" },
  { icon: Share2, color: "secondary" as const, gradient: "from-secondary/8 to-accent/5", bgClass: "bg-secondary/10", textClass: "text-secondary", textMutedClass: "text-secondary/60" },
  { icon: Film, color: "accent" as const, gradient: "from-accent/8 to-primary/5", bgClass: "bg-accent/10", textClass: "text-accent", textMutedClass: "text-accent/60" },
  { icon: Camera, color: "primary" as const, gradient: "from-primary/8 to-accent/5", bgClass: "bg-primary/10", textClass: "text-primary", textMutedClass: "text-primary/60" },
  { icon: TrendingUp, color: "secondary" as const, gradient: "from-secondary/8 to-primary/5", bgClass: "bg-secondary/10", textClass: "text-secondary", textMutedClass: "text-secondary/60" },
];

const processIcons = [Search, Palette, Sparkles, BarChart3];

export default function ServicesContent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(61,90,227,0.06),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SectionReveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {dict.services.sectionTag}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-6">
              {dict.services.sectionTitle}
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              {dict.services.sectionSubtitle}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Service Sections */}
      {serviceKeys.map((key, i) => {
        const service = dict.services[key];
        const data = serviceData[i];
        const Icon = data.icon;
        const isReversed = i % 2 !== 0;

        return (
          <section
            key={key}
            id={key}
            className={`section-padding relative overflow-hidden ${
              i % 2 === 0 ? "" : "bg-surface-elevated/50"
            }`}
          >
            <div className="max-w-6xl mx-auto">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  isReversed ? "lg:direction-reverse" : ""
                }`}
              >
                {/* Content */}
                <SectionReveal direction={isReversed ? "right" : "left"} className={isReversed ? "lg:order-2" : ""}>
                  <div className={`w-14 h-14 rounded-2xl ${data.bgClass} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${data.textClass}`} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
                    {service.title}
                  </h2>
                  <p className="text-text-muted leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full gradient-bg flex-shrink-0" />
                        <span className="text-text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href={`/${locale}/contact`} variant="primary" icon>
                    {dict.nav.getStarted}
                  </Button>
                </SectionReveal>

                {/* Visual */}
                <SectionReveal
                  direction={isReversed ? "left" : "right"}
                  delay={0.15}
                  className={isReversed ? "lg:order-1" : ""}
                >
                  <div className={`relative aspect-[4/3] rounded-3xl bg-gradient-to-br ${data.gradient} border border-border-light overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-3xl bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                        <Icon className={`w-10 h-10 ${data.textMutedClass}`} />
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* Process */}
      <section className="section-padding relative overflow-hidden">
        <GradientBlob className="w-[400px] h-[400px] -top-32 left-1/2 -translate-x-1/2 opacity-30" color="secondary" />

        <div className="relative max-w-6xl mx-auto">
          <SectionReveal className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {dict.services.processTag}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)]">
              {dict.services.processTitle}
            </h2>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {(["discovery", "strategy", "execution", "results"] as const).map((step, i) => {
              const ProcessIcon = processIcons[i];
              return (
                <StaggerItem key={step}>
                  <div className="glass-card p-6 text-center relative">
                    {/* Step number */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full gradient-bg flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{i + 1}</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4 mt-2">
                      <ProcessIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2">
                      {dict.services.process[step].title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {dict.services.process[step].description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white mb-4">
              {dict.cta.title}
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl mx-auto">
              {dict.cta.subtitle}
            </p>
            <Button
              href={`/${locale}/contact`}
              variant="secondary"
              size="lg"
              icon
              className="bg-white text-text border-white hover:bg-white/90"
            >
              {dict.cta.button}
            </Button>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
