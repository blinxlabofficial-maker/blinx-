"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Section configurations aligned precisely to page.tsx HTML order and color contrasts
const sections = [
  { id: "hero", label: "Hero", color: "bg-voltage-yellow" },
  { id: "problem", label: "Problem", color: "bg-electric-red" },
  { id: "value-prop", label: "Why Us", color: "bg-voltage-yellow" },
  { id: "services", label: "Arsenal", color: "bg-electric-red" },
  { id: "process", label: "Process", color: "bg-ink-black" },
  { id: "testimonials", label: "Hit List", color: "bg-voltage-yellow" },
  { id: "work", label: "Work", color: "bg-electric-red" },
  { id: "differentiator", label: "Cult", color: "bg-voltage-yellow" },
  { id: "cta", label: "CTA", color: "bg-voltage-yellow" }
];

export default function DotNavigation() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    // Configure IntersectionObserver to detect when a card occupies the center 20% band of viewport
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-40% 0px -40% 0px", // focus scanner box in viewport center
      threshold: 0 // trigger as soon as section crosses the scan margin
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.replace("anchor-", "");
          setActiveId(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Register active observer on every target anchor ID
    sections.forEach((section) => {
      const element = document.getElementById(`anchor-${section.id}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`anchor-${id}`);
    if (element) {
      // Instantly highlight clicked dot for immediate visual user feedback
      setActiveId(id);
      
      // Leverage browser-native smooth snap-scroll transitions directly to start fold
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[200] hidden md:flex flex-col gap-4 items-center">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center justify-center w-6 h-6 focus:outline-none cursor-pointer"
            aria-label={`Scroll to ${section.label}`}
          >
            <motion.div 
              className={`rounded-full transition-colors duration-300 ${isActive ? section.color : 'bg-gray-400 group-hover:bg-studio-white mix-blend-difference'}`}
              animate={{ 
                width: isActive ? 14 : 8, 
                height: isActive ? 14 : 8 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            
            {/* Custom Brutalist Tooltip */}
            <div className="absolute right-10 px-3 py-1 bg-ink-black text-studio-white font-label-mono text-xs uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-2 border-surface-variant pointer-events-none">
              {section.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
