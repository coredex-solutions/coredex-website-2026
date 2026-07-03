"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Instagram, Facebook, Linkedin, Twitter } from "@/components/ui/SocialIcons";
import SectionReveal from "@/components/ui/SectionReveal";
import Button from "@/components/ui/Button";
import type { Locale, Dictionary } from "@/lib/i18n";

export default function ContactContent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add locale to the data
    data.locale = locale;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,44,245,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Form Side */}
          <SectionReveal direction="left">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {dict.contact.heroTag}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-6">
              {dict.contact.heroTitle}
            </h1>
            <p className="text-lg text-text-muted mb-10">
              {dict.contact.heroSubtitle}
            </p>

            <div className="glass-card p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      {dict.contact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border-light focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      {dict.contact.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border-light focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                      {dict.contact.form.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border-light focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text mb-2">
                      {dict.contact.form.company}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border-light focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-text mb-2">
                    {dict.contact.form.service}
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border-light focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none"
                  >
                    <option value="">Select a service</option>
                    <option value="webDev">{dict.contact.form.serviceOptions.webDev}</option>
                    <option value="socialMedia">{dict.contact.form.serviceOptions.socialMedia}</option>
                    <option value="videoEditing">{dict.contact.form.serviceOptions.videoEditing}</option>
                    <option value="photography">{dict.contact.form.serviceOptions.photography}</option>
                    <option value="seo">{dict.contact.form.serviceOptions.seo}</option>
                    <option value="other">{dict.contact.form.serviceOptions.other}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    {dict.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border-light focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                  ></textarea>
                </div>

                {status === "success" && (
                  <div className="p-4 rounded-xl bg-green-50 text-green-600 text-sm font-medium">
                    {dict.contact.form.success}
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
                    {dict.contact.form.error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full"
                >
                  {status === "loading" ? dict.contact.form.sending : dict.contact.form.submit}
                </Button>
              </form>
            </div>
          </SectionReveal>

          {/* Info Side */}
          <SectionReveal direction="right" delay={0.2} className="lg:pl-10">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
                  {dict.contact.info.title}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-muted mb-1">Email</p>
                      <a href={`mailto:${dict.contact.info.email}`} className="text-base font-semibold hover:text-primary transition-colors">
                        {dict.contact.info.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-muted mb-1">Phone</p>
                      <a href={`tel:${dict.contact.info.phone.replace(/\s+/g, '')}`} className="text-base font-semibold hover:text-primary transition-colors">
                        {dict.contact.info.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-muted mb-1">Location</p>
                      <p className="text-base font-semibold">
                        {dict.contact.info.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-6">
                  {dict.contact.social.title}
                </h3>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-xl border border-border-light flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl border border-border-light flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl border border-border-light flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl border border-border-light flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
