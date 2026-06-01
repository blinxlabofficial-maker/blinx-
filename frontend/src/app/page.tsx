"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import InteractiveCard from "@/components/InteractiveCard";
import ServiceCard from "@/components/ServiceCard";
import Logo from "@/components/Logo";
import DotNavigation from "@/components/DotNavigation";
import KineticResetWrapper from "@/components/KineticResetWrapper";

// Staggered reveal animation variant
const revealVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Premium focal blur kinetic reset variants for elite responsiveness
const kineticSectionVariants = {
  initial: { opacity: 0, y: 80, scale: 0.94, filter: "blur(4px)" },
  animated: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  reset: { opacity: 0.75, y: 25, scale: 0.98, filter: "blur(0.8px)" }
};

const kineticCardVariants = {
  initial: { opacity: 0, scale: 0.82, y: 50, rotate: -2 },
  animated: { opacity: 1, scale: 1, y: 0, rotate: 0 },
  reset: { opacity: 0.8, scale: 0.96, y: 15, rotate: -0.5 }
};

const kineticHeaderVariants = {
  initial: { opacity: 0, x: -60, filter: "blur(3px)" },
  animated: { opacity: 1, x: 0, filter: "blur(0px)" },
  reset: { opacity: 0.7, x: -20, filter: "blur(0.5px)" }
};

const KineticWord = ({ text, colorClass = "", stroke = false }: { text: string, colorClass?: string, stroke?: boolean }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <span className={`inline-flex ${colorClass}`} style={stroke ? { WebkitTextStroke: '2px rgb(26, 26, 26)' } : {}}>
      {text.split('').map((char, index) => {
        // Prevent hydration warning by serving standard 0 offsets during server pre-rendering,
        // then initializing high-fidelity random offsets on actual client mount.
        const initialX = mounted ? (Math.random() - 0.5) * 50 : 0;
        const initialY = mounted ? (Math.random() - 0.5) * 100 : 0;
        const initialRotate = mounted ? (Math.random() - 0.5) * 90 : 0;

        return (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ y: initialY, x: initialX, opacity: 0, rotate: initialRotate }}
            whileInView={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: index * 0.05
            }}
            whileHover={{
              y: mounted ? (Math.random() - 0.5) * 20 : 0,
              x: mounted ? (Math.random() - 0.5) * 20 : 0,
              rotate: mounted ? (Math.random() - 0.5) * 30 : 0,
              color: "#FF3C5A",
              transition: { duration: 0.1 }
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </span>
  );
};


export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamic root scroll snapping manager for homepage stacking cards
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("snap-layout");
      return () => {
        document.documentElement.classList.remove("snap-layout");
      };
    }
  }, []);

  useEffect(() => {
    // Particle Effect for Differentiator section
    const canvas = canvasRef.current;
    let animationFrameId: number;
    let initParticles: () => void;
    
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let width = 0;
        let height = 0;
        let particles: any[] = [];

        initParticles = () => {
          width = canvas.width = canvas.offsetWidth;
          height = canvas.height = canvas.offsetHeight;
          particles = Array.from({ length: 80 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 1,
            size: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? "#FFD600" : "#FF3C5A",
          }));
        };

        let mouseX = width / 2;
        let mouseY = height / 2;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          mouseX = e.clientX - rect.left;
          mouseY = e.clientY - rect.top;
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        const drawParticles = () => {
          ctx.clearRect(0, 0, width, height);
          particles.forEach((p) => {
            // Add slight attraction to mouse for a dynamic feel
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              p.vx += dx * 0.0001;
              p.vy += dy * 0.0001;
            }

            // Apply friction and basic movement
            p.vx *= 0.99;
            p.vy *= 0.99;
            p.x += p.vx + (Math.random() - 0.5) * 0.5;
            p.y += p.vy - 0.5; // Default upward drift

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          });
          animationFrameId = window.requestAnimationFrame(drawParticles);
        };

        initParticles();
        window.addEventListener("resize", initParticles);
        drawParticles();

        return () => {
          window.removeEventListener("resize", initParticles);
          canvas.removeEventListener("mousemove", handleMouseMove);
          if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
        };
      }
    }
  }, []);

  return (
    <main className="relative">
      {/* Scroll Snap & Navigation Anchors */}
      <div id="anchor-hero" className="snap-anchor" style={{ top: "0vh", height: "300vh" }} />
      <div id="anchor-problem" className="snap-anchor" style={{ top: "300vh", height: "100vh" }} />
      <div id="anchor-value-prop" className="snap-anchor" style={{ top: "400vh", height: "100vh" }} />
      <div id="anchor-services" className="snap-anchor" style={{ top: "500vh", height: "100vh" }} />
      <div id="anchor-process" className="snap-anchor" style={{ top: "600vh", height: "100vh" }} />
      <div id="anchor-testimonials" className="snap-anchor" style={{ top: "700vh", height: "100vh" }} />
      <div id="anchor-work" className="snap-anchor" style={{ top: "800vh", height: "100vh" }} />
      <div id="anchor-differentiator" className="snap-anchor" style={{ top: "900vh", height: "100vh" }} />
      <div id="anchor-cta" className="snap-anchor" style={{ top: "1000vh", height: "100vh" }} />

      <DotNavigation />
      {/* 1. Hero Section (Framer Motion Enhanced) */}
      <HeroSection />

      {/* 2. Problem / Pain Points */}
      <section 
        className="px-margin-desktop sticky top-0 h-[100vh] overflow-y-auto overflow-x-hidden w-full z-[20] flex flex-col justify-center py-24 bg-studio-white text-ink-black border-y-4 border-electric-red" 
        id="problem"
      >
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex flex-wrap gap-4 items-center justify-center content-start py-8">
          {[...Array(50)].map((_, i) => (
            <motion.span
              key={`noise-${i}`}
              animate={{
                x: [0, (Math.random() - 0.5) * 30, 0],
                y: [0, (Math.random() - 0.5) * 30, 0],
                opacity: [0.1, 1, 0.1],
              }}
              transition={{
                duration: 0.1 + Math.random() * 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
              }}
              className="font-headline-lg text-5xl md:text-8xl text-ink-black uppercase tracking-tighter"
            >
              NOISE
            </motion.span>
          ))}
        </div>
        <KineticResetWrapper variants={kineticSectionVariants} resetTimeout={4000}>
          <div className="relative z-10">
            <h2 className="font-headline-lg text-[60px] md:text-[90px] leading-none uppercase border-b-4 border-ink-black pb-4 mb-16">The Noise is Loud.</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-ink-black">
              <InteractiveCard className="p-8 border-b-4 md:border-b-0 md:border-r-4 border-ink-black hover:bg-electric-red hover:text-studio-white transition-colors duration-300 group">
                <span className="material-symbols-outlined text-6xl mb-6 block group-hover:scale-110 transition-transform">trending_down</span>
                <h3 className="font-headline-md text-headline-md mb-4 uppercase">Flat Reach</h3>
                <p className="font-body-md text-body-md font-bold">You're posting constantly, but the algorithm ignores you. Your content is invisible.</p>
              </InteractiveCard>
              <InteractiveCard className="p-8 border-b-4 md:border-b-0 md:border-r-4 border-ink-black hover:bg-voltage-yellow hover:text-ink-black transition-colors duration-300 group">
                <span className="material-symbols-outlined text-6xl mb-6 block group-hover:scale-110 transition-transform">water_drop</span>
                <h3 className="font-headline-md text-headline-md mb-4 uppercase">Bland Creative</h3>
                <p className="font-body-md text-body-md font-bold">Your brand looks like everyone else's. No edge, no hook, no reason to stop scrolling.</p>
              </InteractiveCard>
              <InteractiveCard className="p-8 hover:bg-ink-black hover:text-studio-white transition-colors duration-300 group">
                <span className="material-symbols-outlined text-6xl mb-6 block group-hover:scale-110 transition-transform">money_off</span>
                <h3 className="font-headline-md text-headline-md mb-4 uppercase">Wasted Ad Spend</h3>
                <p className="font-body-md text-body-md font-bold">Pouring money into campaigns that don't convert because the strategy is weak.</p>
              </InteractiveCard>
            </div>
          </div>
        </KineticResetWrapper>
      </section>

      {/* 3. Value Proposition */}
      <section 
        className="px-margin-desktop sticky top-0 h-[100vh] overflow-y-auto overflow-x-hidden w-full z-[30] flex flex-col justify-center py-24 bg-electric-red text-ink-black border-b-4 border-ink-black" 
        id="value-prop"
      >
        <KineticResetWrapper variants={kineticSectionVariants} resetTimeout={3500}>
          <h2 className="font-headline-lg text-[60px] md:text-[90px] leading-none uppercase border-b-4 border-ink-black pb-4 mb-16">Why You Need Us</h2>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="font-display-2xl text-[60px] md:text-[90px] leading-none uppercase max-w-5xl flex flex-wrap gap-x-4">
                <KineticWord text="You" />
                <KineticWord text="want" />
                <KineticWord text="to" />
                <KineticWord text="dominate." colorClass="text-studio-white" stroke={true} />
                <br/>
                <KineticWord text="We" />
                <KineticWord text="give" />
                <KineticWord text="you" />
                <KineticWord text="the" />
                <KineticWord text="voltage." colorClass="text-voltage-yellow" stroke={true} />
              </div>
              <p className="font-body-lg text-body-lg max-w-3xl mt-8 font-bold">
                Average creative gets average results. We deploy high-velocity, algorithm-breaking content designed to capture attention violently and refuse to let go.
              </p>
            </div>
          </div>
        </KineticResetWrapper>
      </section>

      {/* 4. Services */}
      <section 
        className="px-6 md:px-margin-desktop sticky top-0 h-[100vh] overflow-y-auto overflow-x-hidden w-full z-[40] flex flex-col justify-start md:justify-center pt-8 md:pt-0 py-24 bg-studio-white text-ink-black border-b-4 border-electric-red" 
        id="services"
      >
        <KineticResetWrapper variants={kineticSectionVariants} resetTimeout={4500}>
          <h2 className="font-display-2xl text-[60px] md:text-[90px] leading-none uppercase border-b-4 border-ink-black pb-4 mb-16">Our Arsenal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/services" className="block cursor-pointer">
              <ServiceCard hoverColor="#FFD600" className="border-4 border-ink-black p-8 h-full">
                <h3 className="font-headline-md text-headline-md uppercase mb-4">High-Velocity Ads</h3>
                <p className="font-body-md text-body-md font-bold mb-6">Performance creative that scales. We test fast, kill losers, and hyper-scale winners.</p>
                <span className="material-symbols-outlined text-4xl">bolt</span>
              </ServiceCard>
            </Link>
            <Link href="/services" className="block cursor-pointer">
              <ServiceCard hoverColor="#FF3C5A" textColorOnHover="#F7F5F0" className="border-4 border-ink-black p-8 h-full">
                <h3 className="font-headline-md text-headline-md uppercase mb-4">Content Engines</h3>
                <p className="font-body-md text-body-md font-bold mb-6">Organic content strategies that build cult-like followings and massive brand equity.</p>
                <span className="material-symbols-outlined text-4xl">videocam</span>
              </ServiceCard>
            </Link>
            <Link href="/services" className="block cursor-pointer">
              <ServiceCard hoverColor="#1A1A1A" textColorOnHover="#F7F5F0" className="border-4 border-ink-black p-8 h-full">
                <h3 className="font-headline-md text-headline-md uppercase mb-4">Brand Identity</h3>
                <p className="font-body-md text-body-md font-bold mb-6">Visual systems designed for the scroll. Bold, aggressive, and impossible to ignore.</p>
                <span className="material-symbols-outlined text-4xl">format_paint</span>
              </ServiceCard>
            </Link>
            <Link href="/services" className="block cursor-pointer">
              <ServiceCard hoverColor="#FFD600" className="border-4 border-ink-black p-8 h-full">
                <h3 className="font-headline-md text-headline-md uppercase mb-4">Growth Strategy</h3>
                <p className="font-body-md text-body-md font-bold mb-6">Data-driven roadmaps to hijack algorithms and force multiplicative growth.</p>
                <span className="material-symbols-outlined text-4xl">rocket_launch</span>
              </ServiceCard>
            </Link>
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="btn-ghost !border-ink-black !text-ink-black hover:!bg-ink-black hover:!text-studio-white interactive font-headline-md text-headline-md text-2xl uppercase px-8 py-4 inline-block mx-auto">
              View Full Arsenal
            </Link>
          </div>
        </KineticResetWrapper>
      </section>

      {/* 5. Process */}
      {/* 5. Process */}
      <section 
        className="px-margin-desktop sticky top-0 h-[100vh] overflow-y-auto overflow-x-hidden w-full z-[50] flex flex-col justify-center py-24 bg-voltage-yellow text-ink-black border-b-4 border-ink-black relative" 
        id="process"
      >
        {/* Voltage Strike Draw SVG */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[800px] pointer-events-none opacity-20 z-0 hidden md:block">
          <motion.svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 400" 
            preserveAspectRatio="none"
          >
            <motion.path 
              d="M50,0 L30,120 L70,160 L20,280 L60,320 L40,400" 
              stroke="#FF3C5A" 
              strokeWidth="6" 
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true, margin: "-200px" }}
            />
          </motion.svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start mb-16">
          <h2 className="font-headline-lg text-[60px] md:text-[90px] leading-none uppercase border-b-4 border-ink-black pb-4 flex-1">How It Works</h2>
        </div>
        <div className="relative z-10 flex flex-col gap-12">
          <KineticResetWrapper variants={{
            initial: { opacity: 0, x: 100, filter: "blur(4px)" },
            animated: { opacity: 1, x: 0, filter: "blur(0px)" },
            reset: { opacity: 0.8, x: 20, filter: "blur(0.8px)" }
          }} resetTimeout={3500}>
            <div className="flex flex-col md:flex-row gap-8 items-start group">
              <div className="font-display-2xl text-[80px] leading-none text-electric-red group-hover:scale-110 transition-transform">01</div>
              <div>
                <h3 className="font-headline-md text-headline-md uppercase mb-2">Audit &amp; Attack Plan</h3>
                <p className="font-body-md text-body-md font-bold max-w-2xl">We dissect your current strategy, identify the weak points, and map out a high-impact offensive to capture market share.</p>
              </div>
            </div>
          </KineticResetWrapper>
          <div className="w-full h-1 bg-ink-black opacity-20"></div>
          <KineticResetWrapper variants={{
            initial: { opacity: 0, x: -100, filter: "blur(4px)" },
            animated: { opacity: 1, x: 0, filter: "blur(0px)" },
            reset: { opacity: 0.8, x: -20, filter: "blur(0.8px)" }
          }} resetTimeout={4000}>
            <div className="flex flex-col md:flex-row gap-8 items-start group">
              <div className="font-display-2xl text-[80px] leading-none text-electric-red group-hover:scale-110 transition-transform">02</div>
              <div>
                <h3 className="font-headline-md text-headline-md uppercase mb-2">Creative Production</h3>
                <p className="font-body-md text-body-md font-bold max-w-2xl">Our studio shifts into high gear, pumping out brutal, attention-grabbing assets engineered for specific platforms.</p>
              </div>
            </div>
          </KineticResetWrapper>
          <div className="w-full h-1 bg-ink-black opacity-20"></div>
          <KineticResetWrapper variants={{
            initial: { opacity: 0, x: 100, filter: "blur(4px)" },
            animated: { opacity: 1, x: 0, filter: "blur(0px)" },
            reset: { opacity: 0.8, x: 20, filter: "blur(0.8px)" }
          }} resetTimeout={4500}>
            <div className="flex flex-col md:flex-row gap-8 items-start group">
              <div className="font-display-2xl text-[80px] leading-none text-electric-red group-hover:scale-110 transition-transform">03</div>
              <div>
                <h3 className="font-headline-md text-headline-md uppercase mb-2">Deploy &amp; Optimize</h3>
                <p className="font-body-md text-body-md font-bold max-w-2xl">We push the creative live, ruthlessly monitor the data, and iterate at lightspeed to scale the winners.</p>
              </div>
            </div>
          </KineticResetWrapper>
        </div>
      </section>

      {/* 6. Testimonials & Brands */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariant}
        className="sticky top-0 h-[100vh] overflow-y-auto overflow-x-hidden w-full z-[60] flex flex-col justify-center py-24 bg-ink-black text-voltage-yellow border-b-4 border-electric-red" 
        id="testimonials"
      >
        {/* Review Marquee */}
        <div className="relative w-full border-y-4 border-voltage-yellow py-6 mb-24 bg-electric-red text-ink-black transform -rotate-1 scale-105 flex">
          <div className="marquee-content font-headline-lg text-[40px] md:text-[60px] uppercase flex gap-12 items-center pr-12">
            {[...Array(10)].map((_, i) => (
              <div key={`review-1-${i}`} className="flex gap-12 items-center">
                <span>"They built us a cult."</span>
                <span className="text-studio-white">///</span>
                <span>"300% Growth in 6 months."</span>
                <span className="text-studio-white">///</span>
                <span>"Absolutely brutal creative."</span>
                <span className="text-studio-white">///</span>
              </div>
            ))}
          </div>
          <div className="marquee-content font-headline-lg text-[40px] md:text-[60px] uppercase flex gap-12 items-center pr-12" aria-hidden="true">
            {[...Array(10)].map((_, i) => (
              <div key={`review-2-${i}`} className="flex gap-12 items-center">
                <span>"They built us a cult."</span>
                <span className="text-studio-white">///</span>
                <span>"300% Growth in 6 months."</span>
                <span className="text-studio-white">///</span>
                <span>"Absolutely brutal creative."</span>
                <span className="text-studio-white">///</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Logos Grid */}
        <div className="px-margin-desktop max-w-7xl mx-auto">
          <motion.h2 variants={itemVariant} className="font-headline-lg text-[60px] md:text-[90px] leading-none uppercase mb-16 text-center text-studio-white">The Hit List</motion.h2>
          <motion.div variants={itemVariant} className="grid grid-cols-2 md:grid-cols-4 gap-0 border-4 border-voltage-yellow">
            <Link href="/portfolio" className="p-8 border-b-4 md:border-b-0 md:border-r-4 border-voltage-yellow flex items-center justify-center group hover:bg-voltage-yellow hover:text-ink-black transition-colors cursor-pointer">
              <span className="font-display-2xl text-3xl md:text-5xl uppercase tracking-widest">Disrupt</span>
            </Link>
            <Link href="/portfolio" className="p-8 border-b-4 md:border-b-0 md:border-r-4 border-voltage-yellow flex items-center justify-center group hover:bg-voltage-yellow hover:text-ink-black transition-colors cursor-pointer">
              <span className="font-display-2xl text-3xl md:text-5xl uppercase font-bold italic">VENOM</span>
            </Link>
            <Link href="/portfolio" className="p-8 border-r-4 md:border-r-4 border-voltage-yellow flex items-center justify-center group hover:bg-voltage-yellow hover:text-ink-black transition-colors cursor-pointer">
              <span className="font-display-2xl text-3xl md:text-5xl uppercase tracking-tighter">Onyx</span>
            </Link>
            <Link href="/portfolio" className="p-8 flex items-center justify-center group hover:bg-voltage-yellow hover:text-ink-black transition-colors cursor-pointer">
              <span className="font-display-2xl text-3xl md:text-5xl uppercase">Apex.</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* 7. Portfolio / Work */}
      <section 
        className="px-margin-desktop sticky top-0 h-[100vh] overflow-y-auto overflow-x-hidden w-full z-[70] flex flex-col justify-center py-24 bg-studio-white text-ink-black border-b-4 border-ink-black" 
        id="work"
      >
        <KineticResetWrapper variants={kineticSectionVariants} resetTimeout={4000}>
          <h2 className="font-headline-lg text-[60px] md:text-[90px] leading-none uppercase border-b-4 border-ink-black pb-4 mb-12">Recent Voltage</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div whileHover="hover" className="relative group cursor-pointer block">
              <Link href="/projects/neon-nights" className="relative overflow-hidden border-4 border-ink-black aspect-video bg-ink-black block h-full w-full group-hover:border-electric-red transition-colors duration-300">
                <motion.div variants={{ hover: { rotate: 180, scale: 2 } }} transition={{ duration: 0.5 }} className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
                  <span className="material-symbols-outlined text-[300px] text-electric-red">close</span>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center text-studio-white opacity-50 group-hover:scale-150 transition-transform duration-500">
                  <motion.span variants={{ hover: { opacity: 0 } }} className="material-symbols-outlined text-6xl">play_circle</motion.span>
                </div>
                <motion.div variants={{ hover: { y: 0 } }} initial={{ y: "100%" }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="absolute inset-0 flex flex-col justify-end p-8 bg-electric-red text-ink-black">
                  <h3 className="font-display-2xl text-[40px] md:text-[60px] leading-none uppercase mix-blend-color-burn">Neon Nights</h3>
                  <p className="font-label-mono uppercase text-ink-black font-bold">Apparel Campaign</p>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div whileHover="hover" className="relative group cursor-pointer block">
              <Link href="/projects/liquid-gold" className="relative overflow-hidden border-4 border-ink-black aspect-video bg-electric-red block h-full w-full group-hover:border-voltage-yellow transition-colors duration-300">
                <motion.div variants={{ hover: { rotate: -180, scale: 2 } }} transition={{ duration: 0.5 }} className="absolute -left-20 -bottom-20 opacity-10 pointer-events-none">
                  <span className="material-symbols-outlined text-[300px] text-voltage-yellow">add</span>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center text-ink-black opacity-50 group-hover:scale-150 transition-transform duration-500">
                  <motion.span variants={{ hover: { opacity: 0 } }} className="material-symbols-outlined text-6xl">play_circle</motion.span>
                </div>
                <motion.div variants={{ hover: { y: 0 } }} initial={{ y: "100%" }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="absolute inset-0 flex flex-col justify-end p-8 bg-voltage-yellow text-ink-black">
                  <h3 className="font-display-2xl text-[40px] md:text-[60px] leading-none uppercase mix-blend-color-burn">Liquid Gold</h3>
                  <p className="font-label-mono uppercase text-ink-black font-bold">Beverage Launch</p>
                </motion.div>
              </Link>
            </motion.div>
          </div>
          <div className="mt-12 text-center">
              <Link href="/portfolio" className="btn-ghost !border-ink-black !text-ink-black hover:!bg-ink-black hover:!text-studio-white interactive font-headline-md text-headline-md text-2xl uppercase px-8 py-4 inline-block mx-auto">View Full Archive</Link>
          </div>
        </KineticResetWrapper>
      </section>


      {/* 9. Differentiator */}
      <section 
        className="sticky top-0 h-[100vh] overflow-y-auto overflow-x-hidden w-full z-[90] flex flex-col justify-center py-24 bg-ink-black border-b-4 border-ink-black relative" 
        id="differentiator"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50 pointer-events-none" id="particles-canvas" width="300" height="150"></canvas>
        <div className="relative z-10 marquee-container bg-voltage-yellow text-ink-black py-4 border-y-4 border-ink-black transform -rotate-2 scale-110 mb-24 flex">
          <div className="marquee-content font-headline-lg text-[60px] md:text-[90px] leading-none uppercase flex gap-12 items-center pr-12">
            {[...Array(15)].map((_, i) => (
              <div key={`marquee-1-${i}`} className="flex gap-12 items-center">
                <Logo className="!text-ink-black text-[24px] md:text-[32px] uppercase-none tracking-normal" />
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
            ))}
          </div>
          <div className="marquee-content font-headline-lg text-[60px] md:text-[90px] leading-none uppercase flex gap-12 items-center pr-12" aria-hidden="true">
            {[...Array(15)].map((_, i) => (
              <div key={`marquee-2-${i}`} className="flex gap-12 items-center">
                <Logo className="!text-ink-black text-[24px] md:text-[32px] uppercase-none tracking-normal" />
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
            ))}
          </div>
        </div>
        <KineticResetWrapper variants={kineticSectionVariants} resetTimeout={4000}>
          <div className="relative z-10 px-margin-desktop text-center max-w-5xl mx-auto">
            <motion.h2 whileHover="hover" className="font-display-2xl text-[60px] md:text-[110px] leading-none uppercase text-studio-white mb-8 cursor-pointer relative z-20">
              We Build{" "}
              <span className="text-voltage-yellow inline-flex">
                {["C", "U", "L", "T", "S", "."].map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hover: {
                        x: (Math.random() - 0.5) * 300,
                        y: (Math.random() - 0.5) * 300,
                        rotate: (Math.random() - 0.5) * 180,
                        scale: 1 + Math.random() * 0.5,
                        color: i % 2 === 0 ? "#FF3C5A" : "#F7F5F0",
                        transition: { type: "spring", stiffness: 100, damping: 10 }
                      }
                    }}
                    className="inline-block transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <br />Not Just Audiences.
            </motion.h2>
            <p className="font-body-lg text-body-lg text-gray-400">We don't do "best practices." We do high-impact, ruthlessly optimized creative designed to monopolize attention and drive aggressive growth.</p>
          </div>
        </KineticResetWrapper>
      </section>

      {/* 10. Final Call-To-Action */}
      <section 
        className="px-margin-desktop sticky top-0 h-[100vh] w-full z-[100] flex flex-col justify-center bg-electric-red text-ink-black text-center" 
        id="cta"
      >
        <KineticResetWrapper variants={kineticSectionVariants} resetTimeout={4500}>
          <h2 className="font-display-2xl text-[60px] md:text-[130px] leading-none uppercase mb-12">Ready to<br/>Dominate?</h2>
          <p className="font-body-lg text-xl font-bold mb-12 max-w-2xl mx-auto">Stop wasting budget on invisible creative. Let's build something loud.</p>
          <Link href="/contact" className="btn-primary interactive font-headline-md text-headline-md text-2xl md:text-4xl uppercase px-16 py-8 flex items-center justify-center mx-auto inline-block border-4 border-ink-black">
            <span className="button-text">GET VOLTAGE</span>
          </Link>
        </KineticResetWrapper>
      </section>
    </main>
  );
}