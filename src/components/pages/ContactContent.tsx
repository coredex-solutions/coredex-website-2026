"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { Instagram, Facebook, Linkedin, Twitter } from "@/components/ui/SocialIcons";
import SectionReveal from "@/components/ui/SectionReveal";
import Magnetic from "@/components/ui/Magnetic";
import type { Locale, Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactContent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    data.locale = locale;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const inputContainerClasses = "relative group w-full";
  const inputClasses = "peer w-full px-5 pb-3 pt-7 rounded-xl bg-surface border border-border text-text placeholder-transparent focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-surface/80 transition-all duration-300";
  const labelClasses = "absolute left-5 top-2.5 text-xs font-bold text-text-secondary/70 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-text-secondary peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-primary cursor-text";

  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen bg-bg transition-colors duration-300">
      
      {/* 2030 Ambient Glow Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 blur-[150px] -translate-x-1/4 -translate-y-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Form Side */}
          <SectionReveal direction="left">
            
            <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6 bg-primary/10 px-6 py-2 rounded-full backdrop-blur-md border border-primary/20 shadow-[0_0_30px_rgba(90,60,240,0.2)] transition-colors">
              {dict.contact.heroTag}
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-[family-name:var(--font-heading)] mb-6 text-text tracking-tight drop-shadow-xl transition-colors">
              {dict.contact.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl font-medium leading-relaxed transition-colors">
              {dict.contact.heroSubtitle}
            </p>

            <div className="relative group perspective-[1000px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl rounded-[2.5rem] opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              
              <div className="relative bg-surface/50 backdrop-blur-2xl border border-border p-6 sm:p-10 md:p-12 rounded-[2.5rem] shadow-2xl transition-colors overflow-hidden min-h-[500px] flex items-center justify-center">
                
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success-state"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="flex flex-col items-center justify-center text-center w-full py-12"
                    >
                      {/* Premium Lottie-style SVG Checkmark Animation */}
                      <div className="w-32 h-32 mb-8 relative flex items-center justify-center">
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                          className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-20 blur-xl"
                        />
                        <motion.svg 
                          viewBox="0 0 100 100" 
                          className="w-full h-full text-primary drop-shadow-[0_0_20px_rgba(90,60,240,0.5)] relative z-10"
                        >
                          <motion.circle 
                            cx="50" cy="50" r="45" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                          />
                          <motion.path 
                            d="M30 50 L45 65 L70 35" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                          />
                        </motion.svg>
                      </div>
                      
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="text-4xl font-black font-[family-name:var(--font-heading)] mb-4 text-text drop-shadow-md"
                      >
                        Message Sent!
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                        className="text-lg text-text-secondary font-medium"
                      >
                        {dict.contact.form.success}
                      </motion.p>
                      
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                        onClick={() => setStatus("idle")}
                        className="mt-10 px-8 py-3 rounded-full bg-text/5 hover:bg-text/10 text-text font-bold transition-all border border-border"
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="contact-form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6 w-full"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className={inputContainerClasses}>
                          <input type="text" id="name" name="name" required className={inputClasses} placeholder="John Doe" />
                          <label htmlFor="name" className={labelClasses}>{dict.contact.form.name}</label>
                        </div>
                        <div className={inputContainerClasses}>
                          <input type="email" id="email" name="email" required className={inputClasses} placeholder="john@example.com" />
                          <label htmlFor="email" className={labelClasses}>{dict.contact.form.email}</label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className={inputContainerClasses}>
                          <input type="tel" id="phone" name="phone" className={inputClasses} placeholder="+1 (555) 000-0000" />
                          <label htmlFor="phone" className={labelClasses}>{dict.contact.form.phone}</label>
                        </div>
                        <div className={inputContainerClasses}>
                          <input type="text" id="company" name="company" className={inputClasses} placeholder="Acme Corp" />
                          <label htmlFor="company" className={labelClasses}>{dict.contact.form.company}</label>
                        </div>
                      </div>

                      <div className={inputContainerClasses}>
                        <div className="relative">
                          <select id="service" name="service" className={cn(inputClasses, "appearance-none cursor-pointer pt-7 pb-3 px-5 text-text")}>
                            <option value="" className="bg-bg text-text">Select a service</option>
                            <option value="webDev" className="bg-bg text-text">{dict.contact.form.serviceOptions.webDev}</option>
                            <option value="socialMedia" className="bg-bg text-text">{dict.contact.form.serviceOptions.socialMedia}</option>
                            <option value="videoEditing" className="bg-bg text-text">{dict.contact.form.serviceOptions.videoEditing}</option>
                            <option value="photography" className="bg-bg text-text">{dict.contact.form.serviceOptions.photography}</option>
                            <option value="seo" className="bg-bg text-text">{dict.contact.form.serviceOptions.seo}</option>
                            <option value="other" className="bg-bg text-text">{dict.contact.form.serviceOptions.other}</option>
                          </select>
                          <label htmlFor="service" className="absolute left-5 top-2.5 text-xs font-bold text-text-secondary/70 pointer-events-none">{dict.contact.form.service}</label>
                          <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-text-secondary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>

                      <div className={inputContainerClasses}>
                        <textarea id="message" name="message" required rows={5} className={cn(inputClasses, "resize-none pt-7")} placeholder="Tell us about your goals..."></textarea>
                        <label htmlFor="message" className={labelClasses}>{dict.contact.form.message}</label>
                      </div>

                      {status === "error" && (
                        <div className="p-5 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20 text-[#ef4444] text-sm font-bold flex items-center gap-3 backdrop-blur-md">
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          {dict.contact.form.error}
                        </div>
                      )}

                      <Magnetic>
                        <button type="submit" disabled={status === "loading"} className="w-full h-14 mt-4 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_30px_rgba(90,60,240,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1">
                          {status === "loading" ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              {dict.contact.form.sending}
                            </span>
                          ) : (
                            dict.contact.form.submit
                          )}
                        </button>
                      </Magnetic>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </SectionReveal>

          {/* Info Side */}
          <SectionReveal direction="right" delay={0.2} className="xl:pl-12 pt-8 xl:pt-32">
            <div className="space-y-16">
              
              <div>
                <h3 className="text-3xl font-black font-[family-name:var(--font-heading)] mb-10 text-text tracking-wide transition-colors">
                  {dict.contact.info.title}
                </h3>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[1px] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(90,60,240,0.3)]">
                      <div className="w-full h-full bg-bg rounded-2xl flex items-center justify-center transition-colors">
                        <Mail className="w-6 h-6 text-text group-hover:text-secondary transition-colors" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-secondary mb-1 uppercase tracking-widest transition-colors">Email</p>
                      <a href={`mailto:${dict.contact.info.email}`} className="text-xl font-bold text-text hover:text-secondary transition-colors">
                        {dict.contact.info.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-[#10b981] p-[1px] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(66,99,235,0.3)]">
                      <div className="w-full h-full bg-bg rounded-2xl flex items-center justify-center transition-colors">
                        <Phone className="w-6 h-6 text-text group-hover:text-[#10b981] transition-colors" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-secondary mb-1 uppercase tracking-widest transition-colors">Phone</p>
                      <a href={`tel:${dict.contact.info.phone.replace(/\s+/g, '')}`} className="text-xl font-bold text-text hover:text-[#10b981] transition-colors">
                        {dict.contact.info.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] p-[1px] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                      <div className="w-full h-full bg-bg rounded-2xl flex items-center justify-center transition-colors">
                        <MapPin className="w-6 h-6 text-text group-hover:text-[#ef4444] transition-colors" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-secondary mb-1 uppercase tracking-widest transition-colors">Location</p>
                      <p className="text-xl font-bold text-text transition-colors">
                        {dict.contact.info.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black font-[family-name:var(--font-heading)] mb-8 text-text tracking-wide transition-colors">
                  {dict.contact.social.title}
                </h3>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-[#ec4899] hover:border-[#ec4899] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:-translate-y-1 transition-all duration-300">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-[#3b5998] hover:border-[#3b5998] hover:shadow-[0_0_20px_rgba(59,89,152,0.5)] hover:-translate-y-1 transition-all duration-300">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] hover:shadow-[0_0_20px_rgba(0,119,181,0.5)] hover:-translate-y-1 transition-all duration-300">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:shadow-[0_0_20px_rgba(29,161,242,0.5)] hover:-translate-y-1 transition-all duration-300">
                    <Twitter className="w-6 h-6" />
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
