"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ServiceCardProps {
  children: ReactNode;
  hoverColor: string; // e.g. "#FFD600" or a gradient string
  textColorOnHover?: string; // text color when hovered
  className?: string;
}

export default function ServiceCard({ children, hoverColor, textColorOnHover = "#1A1A1A", className = "" }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Update mouse position for the radial fill
    setMousePos({ x: mouseX, y: mouseY });

    // Normalize for 3D tilt
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // The radial gradient size: small when entering, full coverage when hovered
  const gradientSize = isHovered ? "150%" : "0%";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`interactive-card relative overflow-hidden transition-shadow duration-300 ${className}`}
    >
      {/* Radial color overlay that follows cursor */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${hoverColor} 0%, ${hoverColor} 60%, transparent 100%)`,
          opacity: isHovered ? 1 : 0,
          transform: `scale(${isHovered ? 2.5 : 0})`,
          transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          transformOrigin: `${mousePos.x}px ${mousePos.y}px`,
        }}
      />

      {/* Card content */}
      <div
        className="relative z-10 transition-colors duration-300"
        style={{
          color: isHovered ? textColorOnHover : undefined,
          transform: "translateZ(30px)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
