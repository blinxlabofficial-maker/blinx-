"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate transforms based on scroll progress (0 to 1)
  
  // GROWTH: slides in from left and scales
  const growthX = useTransform(scrollYProgress, [0, 0.4], ["-50vw", "0vw"]);
  const growthScale = useTransform(scrollYProgress, [0.4, 0.8], [1, 1.5]);
  const growthOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  // REACH: slides in from right and scales
  const reachX = useTransform(scrollYProgress, [0.1, 0.5], ["50vw", "0vw"]);
  const reachScale = useTransform(scrollYProgress, [0.5, 0.9], [1, 1.5]);
  const reachOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.9, 1], [0, 1, 1, 0.8]);

  // SCALE: slides in from bottom and scales
  const scaleY = useTransform(scrollYProgress, [0.2, 0.6], ["50vh", "0vh"]);
  const scaleScale = useTransform(scrollYProgress, [0.6, 1], [1, 1.8]);
  const scaleOpacity = useTransform(scrollYProgress, [0.2, 0.4, 1], [0, 1, 1]);

  // Video fade in
  const videoOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.1, 0.3, 0.6]);

  // Text container offset so it moves up slightly at the end
  const containerY = useTransform(scrollYProgress, [0.8, 1], ["0%", "-10%"]);

  return (
    <section id="hero" ref={containerRef} className="relative h-[300vh] bg-ink-black">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-margin-desktop">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F7F5F0 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Background Video */}
        <motion.div 
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen"
          style={{ opacity: videoOpacity }}
        >
          <video autoPlay className="w-full h-full object-cover" id="hero-vid" loop muted playsInline>
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Animated Text Sequence */}
        <motion.div 
          className="relative z-10 flex flex-col items-start gap-4"
          style={{ y: containerY }}
        >
          <h1 className="font-display-2xl text-[80px] md:text-[130px] leading-none uppercase tracking-tighter flex flex-col">
            <motion.span 
              className="block text-transparent bg-clip-text" 
              style={{ 
                WebkitTextStroke: '2px rgb(247, 245, 240)',
                x: growthX,
                scale: growthScale,
                opacity: growthOpacity,
                transformOrigin: "left center"
              }}
            >
              GROWTH
            </motion.span>
            
            <motion.span 
              className="block text-electric-red"
              style={{ 
                x: reachX,
                scale: reachScale,
                opacity: reachOpacity,
                transformOrigin: "left center"
              }}
            >
              REACH
            </motion.span>
            
            <motion.span 
              className="block text-voltage-yellow"
              style={{ 
                y: scaleY,
                scale: scaleScale,
                opacity: scaleOpacity,
                transformOrigin: "left center"
              }}
            >
              SCALE
            </motion.span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8"
          >
            <p className="font-body-lg text-body-lg max-w-2xl border-l-4 border-electric-red pl-6">
              We engineer high-velocity creative for brands ready to break the algorithm. Stop posting. Start dominating.
            </p>
            <div className="mt-12 flex gap-6">
              <Link href="/contact" className="btn-primary interactive font-headline-md text-headline-md text-2xl md:text-3xl uppercase px-12 py-6 inline-block border-4 border-ink-black">
                <span className="button-text">Get Voltage</span>
              </Link>
              <Link className="btn-ghost interactive font-headline-md text-headline-md text-xl md:text-2xl uppercase px-8 py-4 inline-block" href="#work">
                View Work
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 right-margin-desktop"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <span className="material-symbols-outlined text-4xl">arrow_downward</span>
        </motion.div>

      </div>
    </section>
  );
}
