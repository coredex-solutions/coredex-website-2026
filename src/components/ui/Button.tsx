import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  icon = false,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-8 py-4 text-sm",
    lg: "px-10 py-5 text-base",
  };

  const variantClasses = {
    primary:
      "bg-text text-bg hover:bg-primary hover:text-white shadow-[0_0_0_0_rgba(90,60,240,0)] hover:shadow-[0_0_30px_0_rgba(90,60,240,0.5)]",
    secondary:
      "bg-surface border border-border text-text hover:border-text/50 hover:bg-text/5",
    ghost:
      "bg-transparent text-text-secondary hover:text-primary hover:bg-primary/5",
  };

  // We add an inner `overflow-hidden` for ripple effects (if needed later) and a clean transition
  const baseClasses = "relative group inline-flex items-center justify-center gap-3 font-bold rounded-[2rem] transition-all duration-500 will-change-transform";

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <Magnetic>
        <div className="inline-block">
          <Link href={href} className={classes}>
            <span className="relative z-10">{children}</span>
            {icon && <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />}
          </Link>
        </div>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <div className="inline-block">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={classes}
        >
          <span className="relative z-10">{children}</span>
          {icon && <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />}
        </button>
      </div>
    </Magnetic>
  );
}
