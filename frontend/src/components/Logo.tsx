import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LogoProps {
  className?: string;
  forceDark?: boolean;
}

export default function Logo({ className, forceDark }: LogoProps) {
  return (
    <div className={cn("lowercase tracking-tight flex items-baseline font-black", forceDark ? "text-ink-black" : "text-ink-black dark:text-studio-white", className)}>
      <span style={{ fontFamily: "Arial, sans-serif" }} className="text-inherit">blin</span>
      <span className="text-electric-red" style={{ fontFamily: "Arial, sans-serif" }}>x</span>
      {/* Adding a small margin to match the spacing in the original logo */}
      <span className={cn("ml-1 translate-y-[2px]", forceDark ? "text-ink-black" : "text-voltage-yellow")} style={{ fontFamily: "Calibri, sans-serif" }}>_</span>
    </div>
  );
}
