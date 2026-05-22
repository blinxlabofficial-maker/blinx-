"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Logo from "@/components/Logo";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
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
      <div className="flex justify-between items-center w-full px-[80px] py-[8px] max-w-full mx-auto hidden md:flex">
        <Link
          className="interactive font-headline-md text-[40px] font-black text-primary dark:text-primary tracking-tighter hover:text-white transition-colors duration-300 flex items-center"
          href="/"
        >
          <Logo className="text-[40px] md:text-[50px]" />
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
    </motion.nav>
  );
}
