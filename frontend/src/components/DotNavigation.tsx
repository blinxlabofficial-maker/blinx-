"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Hero", color: "bg-electric-red" },
  { id: "problem", label: "Problem", color: "bg-ink-black" },
  { id: "value-prop", label: "Why Us", color: "bg-ink-black" },
  { id: "services", label: "Arsenal", color: "bg-electric-red" },
  { id: "process", label: "Process", color: "bg-ink-black" },
  { id: "results", label: "Proof", color: "bg-voltage-yellow" },
  { id: "work", label: "Work", color: "bg-electric-red" },
  { id: "testimonials", label: "Hit List", color: "bg-voltage-yellow" },
  { id: "differentiator", label: "Cult", color: "bg-studio-white" },
  { id: "cta", label: "CTA", color: "bg-ink-black" }
];

export default function DotNavigation() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Find the active section by checking offsetTop
      let currentActive = "hero";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          // offsetTop represents the original document flow position, even when sticky
          if (scrollPosition >= element.offsetTop) {
            currentActive = section.id;
          }
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const main = document.querySelector('main');
    
    if (element) {
      // Calculate absolute position: the element's offset relative to main + main's offset from the top of the page.
      // This perfectly accounts for the Navbar's height.
      const mainOffset = main ? main.offsetTop : 0;
      const targetScroll = mainOffset + element.offsetTop;

      window.scrollTo({
        top: targetScroll,
        behavior: "auto" // Instantly and directly jumps to the section
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
            className="group relative flex items-center justify-center w-6 h-6 focus:outline-none"
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
            
            {/* Tooltip */}
            <div className={`absolute right-10 px-3 py-1 bg-ink-black text-studio-white font-label-mono text-xs uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-2 border-surface-variant pointer-events-none`}>
              {section.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
