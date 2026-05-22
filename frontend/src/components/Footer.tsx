"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-ink-black text-studio-white border-t-8 border-electric-red relative overflow-hidden z-20">
      {/* Top Section */}
      <div className="px-margin-desktop py-24 flex flex-col md:flex-row justify-between items-start gap-16 border-b-4 border-surface-variant">
        {/* Left Side: Massive Branding */}
        <div className="flex-1">
          <Logo className="text-[80px] md:text-[130px] mb-4 text-studio-white" />
          <p className="font-body-lg text-2xl font-bold max-w-md text-gray-400">
            High Velocity Creative. Designed to disrupt the algorithm and build cults.
          </p>
        </div>

        {/* Right Side: Links & Contact */}
        <div className="flex flex-col sm:flex-row gap-16 md:gap-32">
          {/* Navigation Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-label-mono text-electric-red uppercase tracking-widest text-sm mb-2">Explore</h3>
            <Link href="/#services" className="interactive font-headline-md text-3xl uppercase hover:text-voltage-yellow transition-colors hover:translate-x-2 transform duration-200">
              Arsenal
            </Link>
            <Link href="/#work" className="interactive font-headline-md text-3xl uppercase hover:text-voltage-yellow transition-colors hover:translate-x-2 transform duration-200">
              Work
            </Link>
            <Link href="/#process" className="interactive font-headline-md text-3xl uppercase hover:text-voltage-yellow transition-colors hover:translate-x-2 transform duration-200">
              Process
            </Link>
            <Link href="/#differentiator" className="interactive font-headline-md text-3xl uppercase hover:text-voltage-yellow transition-colors hover:translate-x-2 transform duration-200">
              Cult
            </Link>
          </div>

          {/* Socials & Contact */}
          <div className="flex flex-col gap-6">
            <h3 className="font-label-mono text-electric-red uppercase tracking-widest text-sm mb-2">Connect</h3>
            <a href="#" className="interactive font-headline-md text-3xl uppercase hover:text-voltage-yellow transition-colors hover:translate-x-2 transform duration-200">
              Instagram
            </a>
            <a href="#" className="interactive font-headline-md text-3xl uppercase hover:text-voltage-yellow transition-colors hover:translate-x-2 transform duration-200">
              LinkedIn
            </a>
            <a href="#" className="interactive font-headline-md text-3xl uppercase hover:text-voltage-yellow transition-colors hover:translate-x-2 transform duration-200">
              X (Twitter)
            </a>
            <a href="mailto:hello@blinxlab.com" className="interactive font-headline-md text-3xl uppercase hover:text-electric-red transition-colors hover:translate-x-2 transform duration-200 mt-4">
              hello@blinxlab.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Marquee / Copyright */}
      <div className="bg-voltage-yellow text-ink-black py-4 overflow-hidden relative flex items-center">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap font-label-mono uppercase tracking-widest text-sm font-bold items-center gap-8"
        >
          <span>© {new Date().getFullYear()} BLINX_ LAB. ALL RIGHTS RESERVED.</span>
          <span className="material-symbols-outlined text-xl">bolt</span>
          <span>WE BUILD CULTS. NOT JUST AUDIENCES.</span>
          <span className="material-symbols-outlined text-xl">bolt</span>
          <span>© {new Date().getFullYear()} BLINX_ LAB. ALL RIGHTS RESERVED.</span>
          <span className="material-symbols-outlined text-xl">bolt</span>
          <span>WE BUILD CULTS. NOT JUST AUDIENCES.</span>
          <span className="material-symbols-outlined text-xl">bolt</span>
          <span>© {new Date().getFullYear()} BLINX_ LAB. ALL RIGHTS RESERVED.</span>
          <span className="material-symbols-outlined text-xl">bolt</span>
          <span>WE BUILD CULTS. NOT JUST AUDIENCES.</span>
          <span className="material-symbols-outlined text-xl">bolt</span>
        </motion.div>
      </div>
    </footer>
  );
}
