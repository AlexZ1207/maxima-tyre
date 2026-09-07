import { cn } from "@/lib/utils";

interface TireSilhouetteProps {
  className?: string;
  variant?: "hero" | "card";
}

export function TireSilhouette({
  className,
  variant = "card",
}: TireSilhouetteProps) {
  const size = variant === "hero" ? 420 : 160;

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("text-primary", className)}
    >
      <circle cx="100" cy="100" r="92" fill="oklch(0.16 0.02 40)" />
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.55"
      />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const x1 = Math.round((100 + Math.cos(a) * 78) * 100) / 100;
        const y1 = Math.round((100 + Math.sin(a) * 78) * 100) / 100;
        const x2 = Math.round((100 + Math.cos(a) * 88) * 100) / 100;
        const y2 = Math.round((100 + Math.sin(a) * 88) * 100) / 100;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="2.5"
            opacity="0.7"
          />
        );
      })}
      <circle
        cx="100"
        cy="100"
        r="48"
        fill="oklch(0.2 0.015 50)"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle cx="100" cy="100" r="18" fill="oklch(0.32 0.04 52)" />
    </svg>
  );
}
