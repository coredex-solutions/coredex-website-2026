"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-10 h-10 rounded-xl bg-white/5 border border-white/10", className)} />
    );
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-12 h-12 md:w-10 md:h-10 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 group hover:scale-105",
        isDark 
          ? "bg-white/[0.05] border border-white/10 hover:bg-white/10 hover:border-white/20" 
          : "bg-black/[0.03] border border-black/10 hover:bg-black/[0.05] hover:border-black/20",
        className
      )}
      aria-label="Toggle Theme"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Sun 
          className={cn(
            "absolute w-5 h-5 transition-all duration-500",
            isDark ? "opacity-100 rotate-0 scale-100 text-[#40b4db]" : "opacity-0 -rotate-90 scale-50"
          )} 
        />
        <Moon 
          className={cn(
            "absolute w-5 h-5 transition-all duration-500",
            isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100 text-[#4263EB]"
          )} 
        />
      </div>
    </button>
  );
}
