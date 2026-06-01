"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  if (pathname === "/contact") {
    return null;
  }

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="bg-surface dark:bg-surface-dim text-primary dark:text-primary-fixed-dim w-full top-0 sticky border-b-2 border-primary dark:border-primary z-50"
        id="main-nav"
      >
        {/* Desktop Navbar */}
        <div className="flex justify-between items-center w-full px-[120px] py-[8px] max-w-full mx-auto hidden md:flex">
          <Link
            className="interactive font-headline-md text-[40px] font-black text-primary dark:text-primary tracking-tighter hover:text-white transition-colors duration-300 flex items-center"
            href="/"
          >
            <Logo className="text-[32px] md:text-[40px] text-studio-white" />
          </Link>
          <div className="flex gap-[24px]">
            <Link
              className="interactive font-headline-md text-[40px] uppercase font-bold text-on-surface dark:text-on-background hover:text-primary transition-colors text-sm"
              href="/services"
            >
              Services
            </Link>
            <Link
              className="interactive font-headline-md text-[40px] uppercase font-bold text-on-surface dark:text-on-background hover:text-primary transition-colors text-sm"
              href="/portfolio"
            >
              Case Studies
            </Link>
            <Link
              className="interactive font-headline-md text-[40px] uppercase font-bold text-on-surface dark:text-on-background hover:text-primary transition-colors text-sm"
              href="/process"
            >
              Process
            </Link>
            <Link
              className="interactive font-headline-md text-[40px] uppercase font-bold text-on-surface dark:text-on-background hover:text-primary transition-colors text-sm"
              href="/about"
            >
              About
            </Link>
          </div>
          <Link
            className="interactive font-headline-md uppercase font-bold text-sm border-2 border-primary px-4 py-2 hover:bg-primary hover:text-surface-dim transition-all duration-300 scale-95 active:scale-90"
            href="/contact"
          >
            GET VOLTAGE
          </Link>
        </div>

        {/* Mobile Navbar Header Row */}
        <div className="flex justify-between items-center w-full px-6 py-3 md:hidden">
          <Link
            className="font-headline-md text-2xl font-black text-primary tracking-tighter flex items-center"
            href="/"
            onClick={() => setIsOpen(false)}
          >
            <Logo className="text-[28px] text-studio-white" />
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex items-center justify-center p-2 border-2 border-primary text-primary hover:bg-primary hover:text-surface-dim transition-all active:scale-90 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-2xl font-bold">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Drawer Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed inset-0 z-40 bg-ink-black flex flex-col justify-center px-8 border-b-8 border-electric-red md:hidden"
          >
            <div className="flex flex-col gap-8 items-start w-full">
              <Link
                onClick={() => setIsOpen(false)}
                className="font-headline-md text-[44px] uppercase font-black text-studio-white hover:text-electric-red transition-colors duration-200"
                href="/services"
              >
                Services
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="font-headline-md text-[44px] uppercase font-black text-studio-white hover:text-voltage-yellow transition-colors duration-200"
                href="/portfolio"
              >
                Case Studies
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="font-headline-md text-[44px] uppercase font-black text-studio-white hover:text-electric-red transition-colors duration-200"
                href="/process"
              >
                Process
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="font-headline-md text-[44px] uppercase font-black text-studio-white hover:text-voltage-yellow transition-colors duration-200"
                href="/about"
              >
                About
              </Link>
              <div className="w-full h-0.5 bg-studio-white/10 my-2"></div>
              <Link
                onClick={() => setIsOpen(false)}
                className="btn-primary font-headline-md text-2xl uppercase font-black px-8 py-4 border-4 border-ink-black w-full text-center"
                href="/contact"
              >
                GET VOLTAGE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
