"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale, Dictionary } from "@/lib/i18n";

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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Build the alternate locale path
  const altPath = pathname.replace(`/${locale}`, `/${altLocale}`);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-lg shadow-primary/5 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="relative z-10 flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-[family-name:var(--font-heading)]">
                C
              </span>
            </div>
            <span className="text-lg font-bold font-[family-name:var(--font-heading)] text-text hidden sm:block">
              Coredex
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
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
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {dict.nav[link.key as keyof typeof dict.nav]}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 gradient-bg rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Link
              href={altPath}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-muted hover:text-primary rounded-xl transition-colors duration-300"
              title={locale === "en" ? "العربية" : "English"}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase">
                {altLocale}
              </span>
            </Link>

            {/* CTA Button (Desktop) */}
            <Link
              href={`/${locale}/contact`}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-bg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              {dict.nav.getStarted}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-10 p-2 rounded-xl text-text hover:bg-surface-elevated transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-text/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-16 left-4 right-4 glass-strong rounded-2xl shadow-2xl p-4 overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const href = `/${locale}${link.href}`;
                  const isActive =
                    link.href === ""
                      ? pathname === `/${locale}` || pathname === `/${locale}/`
                      : pathname.startsWith(href);

                  return (
                    <motion.div
                      key={link.key}
                      initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive
                            ? "text-primary bg-primary/5"
                            : "text-text hover:bg-surface-elevated"
                        }`}
                      >
                        {dict.nav[link.key as keyof typeof dict.nav]}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-border-light">
                <Link
                  href={`/${locale}/contact`}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white rounded-xl gradient-bg"
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
