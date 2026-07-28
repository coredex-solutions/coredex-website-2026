"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import type { Locale, Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const categories = ["all", "webDev", "socialMedia", "videoEditing", "photography", "seo"] as const;

// Map categories to 2030 Brand Colors
const categoryColors: Record<string, { hex: string, gradient: string }> = {
  webDev: { hex: "#5A3CF0", gradient: "from-primary to-secondary" },      // Purple
  socialMedia: { hex: "#4263EB", gradient: "from-secondary to-[#10b981]" }, // Cyan
  videoEditing: { hex: "#ec4899", gradient: "from-[#ec4899] to-primary" },// Pink
  photography: { hex: "#f59e0b", gradient: "from-[#f59e0b] to-[#ec4899]" }, // Amber
  seo: { hex: "#10b981", gradient: "from-[#10b981] to-secondary" },         // Green
};

const sampleProjects = [
  { id: "1", titleEn: "Bloom E-Commerce Platform", titleAr: "منصة بلوم للتجارة الإلكترونية", category: "webDev" },
  { id: "2", titleEn: "TechVentures Social Campaign", titleAr: "حملة تك فينتشرز الرقمية", category: "socialMedia" },
  { id: "3", titleEn: "Elevate Media Brand Video", titleAr: "فيديو علامة إليفيت ميديا", category: "videoEditing" },
  { id: "4", titleEn: "Noor Restaurant Brand Shoot", titleAr: "جلسة تصوير مطعم نور", category: "photography" },
  { id: "5", titleEn: "Cedar Holdings SEO Strategy", titleAr: "استراتيجية SEO لسيدار هولدينغز", category: "seo" },
  { id: "6", titleEn: "Beirut Wellness App", titleAr: "تطبيق بيروت ويلنس", category: "webDev" },
  { id: "7", titleEn: "Layla Cosmetics Social Growth", titleAr: "نمو ليلى كوزماتيكس الرقمي", category: "socialMedia" },
  { id: "8", titleEn: "Summit Conference Highlights", titleAr: "أبرز لحظات مؤتمر سوميت", category: "videoEditing" },
  { id: "9", titleEn: "Heritage Hotel Portfolio", titleAr: "محفظة فندق التراث", category: "photography" },
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
    <div className="bg-bg text-text min-h-screen selection:bg-primary/30 transition-colors duration-300">
      {/* 2030 Cinematic Hero */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden flex items-center justify-center">
        {/* Massive Ambient Supernova */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] lg:w-[1200px] lg:h-[1200px] bg-gradient-to-bl from-[#ec4899]/20 via-primary/10 to-transparent rounded-full blur-[150px] pointer-events-none opacity-60" />
        
        {/* Deep Grid Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
          <SectionReveal>
            <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#ec4899] mb-6 bg-[#ec4899]/10 px-6 py-2 rounded-full backdrop-blur-md border border-[#ec4899]/20 shadow-[0_0_30px_rgba(236,72,153,0.2)] transition-colors">
              {dict.projects.heroTag}
            </span>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black font-[family-name:var(--font-heading)] mb-8 tracking-tighter drop-shadow-2xl leading-[1.1] transition-colors">
              {dict.projects.heroTitle}
            </h1>
            <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed transition-colors">
              {dict.projects.heroSubtitle}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="relative py-12 lg:py-24 border-t border-border bg-surface/30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* 2030 Neon Filter Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 lg:mb-24">
            {filterKeys.map((key) => {
              const label =
                key === "all"
                  ? dict.projects.filterAll
                  : dict.projects[`filter${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof typeof dict.projects] as string;

              const isActive = activeFilter === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={cn(
                    "relative px-6 py-3 text-sm sm:text-base font-bold rounded-2xl transition-all duration-300 backdrop-blur-md border",
                    isActive
                      ? "text-text border-transparent"
                      : "text-text-secondary border-border bg-surface/50 hover:bg-surface hover:text-text"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="filter-bg"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-[0_0_20px_rgba(90,60,240,0.4)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 tracking-wide transition-colors">{label}</span>
                </button>
              );
            })}
          </div>

          {/* The Glass Grid (Projects) */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const colorData = categoryColors[project.category];
                
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <div 
                      className="relative rounded-[2.5rem] overflow-hidden bg-surface border border-border shadow-2xl transition-all duration-500 hover:-translate-y-2"
                      style={{ 
                        // Dynamically set hover glow color based on category
                        // We use a CSS variable trick or inline style on hover via Tailwind group-hover if possible, 
                        // but since inline hover is hard, we'll use standard group-hover for border and a glowing backdrop.
                      }}
                    >
                      {/* Deep Inner Glass */}
                      <div className="absolute inset-0 bg-surface/50 backdrop-blur-3xl group-hover:bg-surface transition-colors duration-500 z-0" />
                      
                      {/* The Gradient Visual Pane */}
                      <div className="relative z-10 p-2">
                        <div className={cn(
                          "relative aspect-[4/3] rounded-[2rem] overflow-hidden transition-all duration-700 group-hover:scale-[1.02]",
                          `bg-gradient-to-br ${colorData.gradient}`
                        )}>
                          {/* Inner Overlay Glow */}
                          <div className="absolute inset-0 bg-bg/20 group-hover:bg-transparent transition-colors duration-500" />
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] bg-surface/50 backdrop-blur-md border border-border flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                              <span className="text-3xl sm:text-4xl font-black font-[family-name:var(--font-heading)] text-text drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                {project.titleEn.charAt(0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="relative z-10 p-8 pt-6">
                        <div 
                          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border"
                          style={{ 
                            color: colorData.hex, 
                            backgroundColor: `${colorData.hex}10`,
                            borderColor: `${colorData.hex}30`
                          }}
                        >
                          {locale === "ar"
                            ? categoryLabels[project.category]?.ar
                            : categoryLabels[project.category]?.en}
                        </div>
                        <h3 className="text-2xl font-black font-[family-name:var(--font-heading)] text-text tracking-wide leading-tight group-hover:text-text/90 transition-colors">
                          {locale === "ar" ? project.titleAr : project.titleEn}
                        </h3>
                      </div>
                      
                      {/* Interactive Bottom Glow */}
                      <div 
                        className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundColor: colorData.hex, boxShadow: `0 0 20px ${colorData.hex}` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <p className="text-center text-text-secondary text-xl font-medium py-24 transition-colors">{dict.projects.noProjects}</p>
          )}
        </div>
      </section>
    </div>
  );
}
