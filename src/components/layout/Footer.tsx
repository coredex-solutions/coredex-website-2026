"use client";

import { useRef } from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Twitter } from "@/components/ui/SocialIcons";
import type { Locale, Dictionary } from "@/lib/i18n";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Staggered reveal for footer columns
    gsap.fromTo(".footer-col",
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        }
      }
    );

    // Parallax effect for the massive watermark
    gsap.fromTo(watermarkRef.current,
      { y: 100 },
      {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // Reveal bottom bar
    gsap.fromTo(".footer-bottom",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      }
    );
  }, { scope: footerRef });

  const companyLinks = [
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.services, href: `/${locale}/services` },
    { label: dict.nav.projects, href: `/${locale}/projects` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  const serviceLinks = [
    { label: dict.services.webDev.title, href: `/${locale}/services` },
    { label: dict.services.socialMedia.title, href: `/${locale}/services` },
    { label: dict.services.videoEditing.title, href: `/${locale}/services` },
    { label: dict.services.photography.title, href: `/${locale}/services` },
    { label: dict.services.seo.title, href: `/${locale}/services` },
  ];

  const legalLinks = [
    { label: dict.footer.privacy, href: `/${locale}/privacy` },
    { label: dict.footer.terms, href: `/${locale}/terms` },
    { label: dict.footer.cookies, href: `/${locale}/cookies` },
  ];

  return (
    <footer ref={footerRef} className="relative bg-bg text-text overflow-hidden border-t border-border pt-16 lg:pt-24 transition-colors duration-300">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-[150px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      {/* Massive Typography Watermark */}
      <div ref={watermarkRef} className="absolute bottom-[-5%] left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none z-0">
        <span className="text-[20vw] opacity-25 font-black blur-sm font-[family-name:var(--font-heading)] leading-none text-text/[0.02] tracking-tighter whitespace-nowrap">
          COREDEX
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-6 lg:pb-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 lg:gap-8 mb-12 lg:mb-20">
          
          {/* Brand Column (Spans full width on mobile, 4 on Desktop) */}
          <div className="footer-col col-span-2 lg:col-span-4 flex flex-col items-start opacity-0">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6 group">
              <div className="relative w-48 md:w-64 h-12 md:h-16 transition-transform duration-300 group-hover:scale-105 origin-left">
                <img 
                  src="/logo/colored%20logo.png" 
                  alt="Coredex Logo" 
                  className="w-full h-full object-contain object-left block dark:hidden" 
                />
                <img 
                  src="/logo/white%20logo.png" 
                  alt="Coredex Logo" 
                  className="w-full h-full object-contain object-left hidden dark:block" 
                />
              </div>
            </Link>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-sm font-medium">
              {dict.footer.description}
            </p>
            
            {/* 2030 Social Links */}
            <div className="flex items-center gap-3 md:gap-4">
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-[#ec4899] hover:border-[#ec4899] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:-translate-y-1 transition-all duration-300">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-[#3b5998] hover:border-[#3b5998] hover:shadow-[0_0_20px_rgba(59,89,152,0.5)] hover:-translate-y-1 transition-all duration-300">
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] hover:shadow-[0_0_20px_rgba(0,119,181,0.5)] hover:-translate-y-1 transition-all duration-300">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:shadow-[0_0_20px_rgba(29,161,242,0.5)] hover:-translate-y-1 transition-all duration-300">
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Company Links (Spans 1 col on mobile) */}
          <div className="footer-col col-span-1 lg:col-span-2 opacity-0">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-text mb-4 md:mb-6 font-[family-name:var(--font-heading)]">
              {dict.footer.company}
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm md:text-base text-text-secondary hover:text-primary font-medium transition-colors duration-300"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links (Spans 1 col on mobile) */}
          <div className="footer-col col-span-1 lg:col-span-3 opacity-0">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-text mb-4 md:mb-6 font-[family-name:var(--font-heading)]">
              {dict.footer.servicesTitle}
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm md:text-base text-text-secondary hover:text-primary font-medium transition-colors duration-300"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact (Spans full width on mobile) */}
          <div className="footer-col col-span-2 lg:col-span-2 flex flex-col sm:flex-row lg:flex-col justify-between sm:gap-8 lg:gap-0 mt-4 lg:mt-0 opacity-0">
            <div className="w-full sm:w-1/2 lg:w-full">
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-text mb-4 md:mb-6 font-[family-name:var(--font-heading)]">
                {dict.footer.legal}
              </h4>
              <ul className="space-y-3 md:space-y-4 mb-8 lg:mb-10">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm md:text-base text-text-secondary hover:text-primary font-medium transition-colors duration-300"
                    >
                      <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-full">
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-text mb-3 md:mb-4 font-[family-name:var(--font-heading)]">
                {dict.footer.contactTitle}
              </h4>
              <div className="space-y-2">
                <a href={`mailto:${dict.contact.info.email}`} className="block text-sm md:text-base text-text-secondary hover:text-primary font-medium transition-colors duration-300 break-all">
                  {dict.contact.info.email}
                </a>
                <a href={`tel:${dict.contact.info.phone.replace(/\s+/g, '')}`} className="block text-sm md:text-base text-text-secondary hover:text-[#10b981] font-medium transition-colors duration-300">
                  {dict.contact.info.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom opacity-0 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-text-secondary text-center md:text-left">
            © {currentYear} Coredex Solutions. {dict.footer.rights}
          </p>
          <p className="text-sm font-medium text-text-secondary text-center md:text-right flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            Based in {dict.contact.info.address}
          </p>
        </div>

      </div>
    </footer>
  );
}
