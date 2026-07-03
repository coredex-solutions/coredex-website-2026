import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary:
      "gradient-bg text-white hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5",
    secondary:
      "bg-surface border border-border text-text hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-text-muted hover:text-primary hover:bg-primary/5",
  };

  const classes = `inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {icon && <ArrowRight className="w-4 h-4" />}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
      {icon && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}
