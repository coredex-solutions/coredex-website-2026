"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import type { Locale, Dictionary } from "@/lib/i18n";

const categories = ["all", "webDev", "socialMedia", "videoEditing", "photography", "seo"] as const;

const sampleProjects = [
  { id: "1", titleEn: "Bloom E-Commerce Platform", titleAr: "منصة بلوم للتجارة الإلكترونية", category: "webDev", gradient: "from-primary/15 via-secondary/10 to-accent/15" },
  { id: "2", titleEn: "TechVentures Social Campaign", titleAr: "حملة تك فينتشرز الرقمية", category: "socialMedia", gradient: "from-secondary/15 via-accent/10 to-primary/15" },
  { id: "3", titleEn: "Elevate Media Brand Video", titleAr: "فيديو علامة إليفيت ميديا", category: "videoEditing", gradient: "from-accent/15 via-primary/10 to-secondary/15" },
  { id: "4", titleEn: "Noor Restaurant Brand Shoot", titleAr: "جلسة تصوير مطعم نور", category: "photography", gradient: "from-primary/15 via-accent/10 to-secondary/15" },
  { id: "5", titleEn: "Cedar Holdings SEO Strategy", titleAr: "استراتيجية SEO لسيدار هولدينغز", category: "seo", gradient: "from-secondary/15 via-primary/10 to-accent/15" },
  { id: "6", titleEn: "Beirut Wellness App", titleAr: "تطبيق بيروت ويلنس", category: "webDev", gradient: "from-accent/15 via-secondary/10 to-primary/15" },
  { id: "7", titleEn: "Layla Cosmetics Social Growth", titleAr: "نمو ليلى كوزماتيكس الرقمي", category: "socialMedia", gradient: "from-primary/15 via-accent/10 to-secondary/15" },
  { id: "8", titleEn: "Summit Conference Highlights", titleAr: "أبرز لحظات مؤتمر سوميت", category: "videoEditing", gradient: "from-secondary/15 via-primary/10 to-accent/15" },
  { id: "9", titleEn: "Heritage Hotel Portfolio", titleAr: "محفظة فندق التراث", category: "photography", gradient: "from-accent/15 via-secondary/10 to-primary/15" },
];

const categoryLabels: Record<string, { en: string; ar: string }> = {
  webDev: { en: "Web Development", ar: "تطوير المواقع" },
  socialMedia: { en: "Social Media", ar: "وسائل التواصل" },
  videoEditing: { en: "Video Editing", ar: "المونتاج" },
  photography: { en: "Photography", ar: "التصوير" },
  seo: { en: "SEO", ar: "SEO" },
};

export default function ProjectsContent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects =
    activeFilter === "all"
      ? sampleProjects
      : sampleProjects.filter((p) => p.category === activeFilter);

  const filterKeys = categories;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(64,180,219,0.06),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SectionReveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {dict.projects.heroTag}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-6">
              {dict.projects.heroTitle}
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              {dict.projects.heroSubtitle}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filterKeys.map((key) => {
              const label =
                key === "all"
                  ? dict.projects.filterAll
                  : dict.projects[`filter${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof typeof dict.projects] as string;

              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    activeFilter === key
                      ? "text-white"
                      : "text-text-muted hover:text-text bg-surface-elevated hover:bg-surface"
                  }`}
                >
                  {activeFilter === key && (
                    <motion.div
                      layoutId="filter-bg"
                      className="absolute inset-0 gradient-bg rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-border-light bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5">
                    <div
                      className={`relative aspect-[4/3] bg-gradient-to-br ${project.gradient} overflow-hidden`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                          <span className="text-xl font-bold font-[family-name:var(--font-heading)] text-text/40">
                            {project.titleEn.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {locale === "ar"
                          ? categoryLabels[project.category]?.ar
                          : categoryLabels[project.category]?.en}
                      </span>
                      <h3 className="text-base font-bold font-[family-name:var(--font-heading)] mt-1">
                        {locale === "ar" ? project.titleAr : project.titleEn}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <p className="text-center text-text-muted py-12">{dict.projects.noProjects}</p>
          )}
        </div>
      </section>
    </>
  );
}
