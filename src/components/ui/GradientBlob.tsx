export default function GradientBlob({
  className = "",
  color = "primary",
}: {
  className?: string;
  color?: "primary" | "secondary" | "accent";
}) {
  const colorMap = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    accent: "bg-accent/10",
  };

  return (
    <div
      className={`absolute rounded-full blur-3xl animate-blob pointer-events-none ${colorMap[color]} ${className}`}
      aria-hidden="true"
    />
  );
}
