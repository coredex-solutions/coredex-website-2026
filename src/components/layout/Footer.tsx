import Link from "next/link";
import { Instagram, Facebook, Linkedin, Twitter } from "@/components/ui/SocialIcons";
import type { Locale, Dictionary } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

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

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="relative bg-text text-white overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px gradient-bg" />

      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6 lg:pt-16 lg:pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-[family-name:var(--font-heading)]">
                  C
                </span>
              </div>
              <span className="text-lg font-bold font-[family-name:var(--font-heading)]">
                Coredex
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              {dict.footer.description}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4 font-[family-name:var(--font-heading)]">
              {dict.footer.company}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4 font-[family-name:var(--font-heading)]">
              {dict.footer.servicesTitle}
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4 font-[family-name:var(--font-heading)]">
              {dict.footer.legal}
            </h4>
            <ul className="space-y-2.5 mb-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-3 font-[family-name:var(--font-heading)]">
              {dict.footer.contactTitle}
            </h4>
            <p className="text-sm text-white/50">{dict.contact.info.email}</p>
            <p className="text-sm text-white/50">{dict.contact.info.phone}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {currentYear} Coredex Solutions. {dict.footer.rights}
          </p>
          <p className="text-xs text-white/30">
            {dict.contact.info.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
