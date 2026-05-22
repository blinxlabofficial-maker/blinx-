"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across the entire page for the SVG line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress into the pathLength of the SVG
  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <main ref={containerRef} className="relative bg-ink-black text-studio-white min-h-screen">
      
      {/* Header */}
      <div className="w-full p-6 flex justify-between items-center absolute top-0 z-[100] mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/">
            <Logo className="text-3xl text-studio-white" />
          </Link>
        </div>
        <div className="font-label-mono text-sm uppercase tracking-widest text-voltage-yellow">
          The Process
        </div>
      </div>

      {/* 1. Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center p-8 relative z-10 border-b-4 border-surface-variant">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <h1 className="font-display-2xl text-[80px] md:text-[130px] leading-none uppercase text-voltage-yellow mb-8">
            How It Works
          </h1>
          <p className="font-body-lg text-xl md:text-3xl max-w-3xl mx-auto text-gray-300 font-bold uppercase">
            We don't guess. We audit, attack, and scale.
          </p>
        </motion.div>
      </section>

      {/* 2. The Timeline Container */}
      <div className="relative w-full max-w-7xl mx-auto py-32 px-6">
        
        {/* The Voltage Strike SVG Line (Desktop) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] hidden md:block">
          <div className="w-full h-full bg-surface-variant opacity-30 absolute top-0 left-0" />
          <motion.div 
            className="w-full bg-electric-red absolute top-0 left-0 origin-top"
            style={{ scaleY: pathLength }}
          />
        </div>

        {/* Phase 01 */}
        <section className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-32 min-h-[70vh]">
          <div className="flex-1 md:text-right">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="font-display-2xl text-[90px] md:text-[130px] leading-none text-electric-red">01</h2>
              <h3 className="font-headline-md text-4xl uppercase mb-6">Audit & Attack Plan</h3>
              <p className="font-body-lg text-xl text-gray-400">
                We dissect your current strategy, identify the exact points where you are bleeding cash, and map out a high-impact offensive to capture market share. No fluff, just raw data and actionable intelligence.
              </p>
            </motion.div>
          </div>
          
          <div className="hidden md:flex w-8 h-8 rounded-full bg-ink-black border-4 border-electric-red z-20 items-center justify-center absolute left-1/2 -translate-x-1/2">
             <div className="w-2 h-2 bg-electric-red rounded-full" />
          </div>
          
          <div className="flex-1">
             <div className="aspect-square bg-surface-variant border-4 border-electric-red opacity-30 flex items-center justify-center p-8">
               <span className="font-label-mono uppercase tracking-widest text-center text-sm">Media Placeholder / Blueprint Phase</span>
             </div>
          </div>
        </section>

        {/* Phase 02 */}
        <section className="relative z-10 flex flex-col md:flex-row-reverse items-center gap-12 md:gap-32 min-h-[70vh]">
          <div className="flex-1 md:text-left">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="font-display-2xl text-[90px] md:text-[130px] leading-none text-voltage-yellow">02</h2>
              <h3 className="font-headline-md text-4xl uppercase mb-6">Creative Production</h3>
              <p className="font-body-lg text-xl text-gray-400">
                Our studio shifts into high gear, pumping out brutal, attention-grabbing assets engineered for specific algorithms. We build systems and variations, allowing us to test relentlessly and find the absolute highest converters.
              </p>
            </motion.div>
          </div>
          
          <div className="hidden md:flex w-8 h-8 rounded-full bg-ink-black border-4 border-voltage-yellow z-20 items-center justify-center absolute left-1/2 -translate-x-1/2">
             <div className="w-2 h-2 bg-voltage-yellow rounded-full" />
          </div>
          
          <div className="flex-1">
             <div className="aspect-square bg-surface-variant border-4 border-voltage-yellow opacity-30 flex items-center justify-center p-8">
               <span className="font-label-mono uppercase tracking-widest text-center text-sm">Media Placeholder / Studio BTS</span>
             </div>
          </div>
        </section>

        {/* Phase 03 */}
        <section className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-32 min-h-[70vh]">
          <div className="flex-1 md:text-right">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="font-display-2xl text-[90px] md:text-[130px] leading-none text-studio-white">03</h2>
              <h3 className="font-headline-md text-4xl uppercase mb-6">Deploy & Optimize</h3>
              <p className="font-body-lg text-xl text-gray-400">
                We push the creative live, ruthlessly monitor the data, and iterate at lightspeed to scale the winners. Losers are killed instantly. Winners are scaled until the market taps out.
              </p>
            </motion.div>
          </div>
          
          <div className="hidden md:flex w-8 h-8 rounded-full bg-ink-black border-4 border-studio-white z-20 items-center justify-center absolute left-1/2 -translate-x-1/2">
             <div className="w-2 h-2 bg-studio-white rounded-full" />
          </div>
          
          <div className="flex-1">
             <div className="aspect-square bg-surface-variant border-4 border-studio-white opacity-30 flex items-center justify-center p-8">
               <span className="font-label-mono uppercase tracking-widest text-center text-sm">Media Placeholder / Analytics Dashboard</span>
             </div>
          </div>
        </section>

      </div>

      {/* CTA Footer Block */}
      <section className="py-32 px-6 text-center border-t-4 border-electric-red bg-electric-red text-ink-black">
        <h2 className="font-display-2xl text-[60px] md:text-[90px] leading-none uppercase mb-12">Stop Bleeding Cash.</h2>
        <Link href="/contact" className="inline-block btn-primary interactive font-headline-md text-headline-md text-2xl uppercase px-16 py-8 border-4 border-ink-black bg-ink-black !text-electric-red hover:!bg-studio-white hover:!text-ink-black">
          Initiate Protocol
        </Link>
      </section>

    </main>
  );
}
