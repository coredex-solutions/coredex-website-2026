"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface FeaturedProjectsProps {
  locale: Locale;
  dict: Dictionary;
}

const mockProjects = [
  { id: 1, title: "Nexus Fintech", category: "Web Development", image: "/images/projects/nexus.png", color: "#5A3CF0" },
  { id: 2, title: "Lumina Brand", category: "Social Media", image: "/images/projects/lumina.png", color: "#4263EB" },
  { id: 3, title: "Echo Campaign", category: "Video Production", image: "/images/projects/echo.png", color: "#ec4899" },
  { id: 4, title: "Vortex App", category: "UI/UX Design", image: "/images/projects/vortex.png", color: "#f59e0b" },
];

export default function FeaturedProjects({ locale, dict }: FeaturedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightColRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Reveal
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
    );

    // Advanced Parallax Scrubbing
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (!isMobile) {
      // Left Column Parallax (Moves down slightly)
      leftColRefs.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true }
        });
      });

      // Right Column Parallax (Moves up slightly)
      rightColRefs.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true }
        });
      });
    }

    // Card Clip-Path Wipe Reveal
    gsap.utils.toArray(".project-card").forEach((card: any) => {
      gsap.fromTo(card,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0, y: 100 },
        { 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          opacity: 1, y: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: card, start: "top 85%" }
        }
      );
    });

    // View All Button Reveal
    gsap.fromTo(buttonRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)", scrollTrigger: { trigger: buttonRef.current, start: "top 90%" } }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-bg overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-32 opacity-0">
          <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-6 bg-secondary/10 px-6 py-2 rounded-full backdrop-blur-md border border-secondary/20 shadow-[0_0_30px_rgba(66,99,235,0.2)]">
            {dict.featuredProjects.sectionTag}
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black font-[family-name:var(--font-heading)] uppercase tracking-tighter rtl:tracking-normal text-text drop-shadow-2xl transition-colors">
            {dict.nav.projects}
          </h2>
        </div>

        {/* The Parallax Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 w-full">
          {mockProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                ref={el => {
                  if (isEven) leftColRefs.current.push(el);
                  else rightColRefs.current.push(el);
                }}
                className={cn(
                  "project-card relative group w-full aspect-square md:aspect-[4/5] lg:aspect-square flex-shrink-0 origin-bottom opacity-0",
                  !isEven && "md:mt-32"
                )}
              >
                <Link href={`/${locale}/projects/${project.id}`} className="block w-full h-full relative z-10">
                  <div 
                    className="w-full h-full rounded-[2.5rem] overflow-hidden bg-surface border border-border relative shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-primary/50"
                    style={{ 
                      boxShadow: `0 20px 50px -20px ${project.color}60`
                    }}
                  >
                    
                    {/* AI Generated Image Background */}
                    <div className="absolute inset-0 bg-bg transition-colors">
                      <Image 
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-60 transition-transform duration-[2000ms] group-hover:scale-110 group-hover:opacity-100"
                      />
                    </div>
                    
                    {/* Deep Inner Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-70" />
                    
                    {/* Glowing Interactive Border */}
                    <div 
                      className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ backgroundColor: project.color, boxShadow: `0 0 30px ${project.color}` }}
                    />

                    {/* Content Area */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      
                      <div className="flex items-center justify-between mb-4">
                        <span 
                          className="inline-block px-4 py-1.5 rounded-full bg-text/10 backdrop-blur-md border border-text/20 text-xs font-bold text-text uppercase tracking-widest shadow-lg transition-colors"
                          style={{ borderColor: `${project.color}60` }}
                        >
                          {project.category}
                        </span>
                        
                        {/* Mobile-Friendly Glowing Button */}
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-text backdrop-blur-md border border-border transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 md:-translate-x-4 md:group-hover:translate-x-0"
                          style={{ backgroundColor: `${project.color}40`, boxShadow: `0 0 20px ${project.color}60` }}
                        >
                          <ArrowRight className="w-5 h-5 transform -rotate-45" />
                        </div>
                      </div>

                      <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] text-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-tight transition-colors">
                        {project.title}
                      </h3>
                    </div>

                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div 
          ref={buttonRef}
          className="mt-20 md:mt-40 text-center w-full sm:w-auto opacity-0"
        >
           <Link 
             href={`/${locale}/projects`}
             className="group flex flex-col items-center gap-6 hover:scale-105 transition-transform duration-500 w-full sm:w-auto"
           >
             <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-border bg-surface backdrop-blur-md shadow-lg flex items-center justify-center text-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:border-transparent group-hover:shadow-[0_0_50px_rgba(90,60,240,0.5)] group-hover:text-white transition-all duration-500">
               <ArrowUpRight className="w-10 h-10 md:w-12 md:h-12" />
             </div>
             <span className="text-xl md:text-2xl font-bold uppercase tracking-widest rtl:tracking-normal text-text-secondary group-hover:text-text transition-colors duration-300">
               {dict.featuredProjects.viewAllWork}
             </span>
           </Link>
        </div>

      </div>
    </section>
  );
}
