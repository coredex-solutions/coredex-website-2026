"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale, Dictionary } from "@/lib/i18n";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

const navLinks = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const altLocale = locale === "en" ? "ar" : "en";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const altPath = pathname.replace(`/${locale}`, `/${altLocale}`);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* --- DESKTOP FLOATING ISLAND NAVBAR --- */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 md:pt-8 pointer-events-none animate-fade-in-down"
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between rounded-[2rem] border transition-all duration-500 relative w-full will-change-[max-width,padding,background-color]",
            scrolled 
              ? "bg-surface/40 border-black/5 dark:border-white/5 backdrop-blur-3xl max-w-[1200px] py-3 px-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)]" 
              : "bg-transparent border-transparent backdrop-blur-md max-w-[1200px] py-4 px-8 shadow-none"
          )}
        >
          {/* subtle ambient glow inside the navbar */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 transition-opacity duration-500" style={{ opacity: scrolled ? 1 : 0 }} />
          </div>

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="relative z-10 flex items-center gap-3 group flex-shrink-0"
          >
            <div className="relative w-40 md:w-56 h-10 md:h-14 transition-transform duration-500 group-hover:scale-105 origin-left">
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

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 relative z-10">
            {navLinks.map((link) => {
              const href = `/${locale}${link.href}`;
              const isActive =
                link.href === ""
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(href);

              return (
                <Link
                  key={link.key}
                  href={href}
                  className="relative px-4 py-2 text-sm font-semibold transition-colors duration-300 group flex items-center justify-center rounded-full overflow-hidden"
                >
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-primary" : "text-text-secondary group-hover:text-text"}`}>
                    {dict.nav[link.key as keyof typeof dict.nav]}
                  </span>
                  
                  {/* Hover Background Pill */}
                  <div className="absolute inset-0 bg-text/5 transform scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 rounded-full" />
                  
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-dot"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(90,60,240,0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4 relative z-10 flex-shrink-0">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <Link
               href={altPath}
               className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-text-secondary hover:text-text bg-text/5 hover:bg-text/10 rounded-full transition-all duration-300"
               title={locale === "en" ? "العربية" : "English"}
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{altLocale}</span>
            </Link>

            {/* CTA Button (Desktop) */}
            <div className="hidden lg:block">
              <Link
                href={`/${locale}/contact`}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_rgba(90,60,240,0.4)] transition-all duration-300 hover:scale-105 whitespace-nowrap will-change-transform"
              >
                {dict.nav.getStarted}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden relative z-10 p-2.5 rounded-full bg-text/5 text-text hover:bg-text/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE CINEMATIC OVERLAY MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            className="fixed inset-0 z-[100] lg:hidden bg-bg/95 backdrop-blur-3xl flex flex-col"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="relative w-40 h-10 transition-transform duration-500 hover:scale-105 origin-left">
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
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-full bg-text/10 text-text hover:bg-text/20 transition-colors hover:rotate-90 duration-300"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Huge Menu Links */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 gap-6">
              {navLinks.map((link, i) => {
                const href = `/${locale}${link.href}`;
                const isActive =
                  link.href === ""
                    ? pathname === `/${locale}` || pathname === `/${locale}/`
                    : pathname.startsWith(href);

                return (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, y: 40, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -40, rotateX: -20, transition: { delay: i * 0.05 } }}
                    transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                    style={{ perspective: 1000 }}
                  >
                    <Link
                      href={href}
                      className="group flex items-center gap-4"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={`text-5xl md:text-7xl font-black font-[family-name:var(--font-heading)] uppercase tracking-tighter transition-colors duration-500 ${
                        isActive ? "text-text" : "text-text-secondary group-hover:text-text"
                      }`}>
                        {dict.nav[link.key as keyof typeof dict.nav]}
                      </span>
                      {isActive && (
                        <ArrowRight className="w-10 h-10 text-primary animate-pulse" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Actions Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="p-8 pb-12 flex flex-col gap-6"
            >
              <div className="w-full h-px bg-border" />
              <div className="flex items-center justify-between">
                <Link
                  href={altPath}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-text bg-text/5 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Globe className="w-5 h-5" />
                  <span className="uppercase">{altLocale}</span>
                </Link>
                
                <Link
                  href={`/${locale}/contact`}
                  className="flex items-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20"
                  onClick={() => setIsOpen(false)}
                >
                  {dict.nav.getStarted}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
