"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/Logo";
import { API_BASE_URL } from "@/lib/api";

// MOCK MONGODB DATA FOR TEAM
const MOCK_TEAM_DB = [
  { id: "team-1", name: "J. D.", role: "Creative Director", specialty: "Visual Aggression", color: "bg-electric-red" },
  { id: "team-2", name: "A. K.", role: "Growth Architect", specialty: "Algorithm Exploitation", color: "bg-voltage-yellow" },
  { id: "team-3", name: "S. M.", role: "Lead Producer", specialty: "High-Velocity Output", color: "bg-studio-white" },
  { id: "team-4", name: "R. B.", role: "Copy Chief", specialty: "Weaponized Words", color: "bg-electric-red" },
];

export default function AboutPage() {
  const [team, setTeam] = useState(MOCK_TEAM_DB);

  useEffect(() => {
    fetch(`${API_BASE_URL}/team`)
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTeam(data);
        }
      })
      .catch(() => {
        // Fall back silently to mock DB if backend offline
      });
  }, []);

  return (
    <main className="relative bg-ink-black text-studio-white min-h-screen selection:bg-electric-red selection:text-ink-black">
      
      {/* 1. Hero / Manifesto Declaration */}
      <section className="relative min-h-screen flex flex-col justify-center py-24 bg-ink-black border-b-4 border-electric-red overflow-hidden">
        
        <div className="relative z-10 px-6 text-center max-w-7xl mx-auto">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="font-display-2xl text-[80px] md:text-[160px] leading-none uppercase text-studio-white mb-8"
          >
            We Build <br/>
            <span className="text-electric-red inline-flex">
              {["C", "U", "L", "T", "S", "."].map((char, i) => (
                <motion.span
                  key={i}
                  whileHover={{
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    rotate: (Math.random() - 0.5) * 90,
                    color: i % 2 === 0 ? "#FFD600" : "#F7F5F0",
                    transition: { type: "spring", stiffness: 100, damping: 10 }
                  }}
                  className="inline-block transition-colors cursor-pointer"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body-lg text-2xl md:text-4xl text-gray-400 font-bold max-w-4xl mx-auto uppercase"
          >
            Not Just Audiences.
          </motion.p>
        </div>
      </section>

      {/* 2. Core Tenets (Rules) */}
      <section className="py-32 px-6 bg-studio-white text-ink-black border-b-4 border-ink-black relative overflow-hidden">
        
        {/* Background Marquee */}
        <div className="absolute top-10 left-0 right-0 marquee-container opacity-10 pointer-events-none rotate-2">
          <div className="marquee-content font-display-2xl text-[180px] leading-none text-ink-black flex gap-12 items-center pr-12">
            {[...Array(10)].map((_, i) => (
              <span key={`rule-marq1-${i}`}>THE RULES ///</span>
            ))}
          </div>
          <div className="marquee-content font-display-2xl text-[180px] leading-none text-ink-black flex gap-12 items-center pr-12" aria-hidden="true">
            {[...Array(10)].map((_, i) => (
              <span key={`rule-marq2-${i}`}>THE RULES ///</span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-display-2xl text-[60px] md:text-[90px] leading-none uppercase mb-16 border-b-4 border-ink-black pb-4">Studio Tenets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-ink-black">
            <div className="p-12 border-b-4 md:border-b-0 md:border-r-4 border-ink-black hover:bg-electric-red hover:text-studio-white transition-colors duration-300 group">
              <span className="font-display-2xl text-6xl text-electric-red group-hover:text-voltage-yellow mb-6 block">01</span>
              <h3 className="font-headline-md text-4xl uppercase mb-4">Attention is Violence</h3>
              <p className="font-body-lg text-xl font-bold">In a feed of endless noise, being quiet is a death sentence. We design to disrupt, attack, and monopolize the user's attention instantly.</p>
            </div>
            
            <div className="p-12 border-b-4 md:border-b-0 md:border-b-4 border-ink-black hover:bg-voltage-yellow hover:text-ink-black transition-colors duration-300 group">
              <span className="font-display-2xl text-6xl text-voltage-yellow group-hover:text-electric-red mb-6 block">02</span>
              <h3 className="font-headline-md text-4xl uppercase mb-4">Average is Dead</h3>
              <p className="font-body-lg text-xl font-bold">Best practices are for brands that want to remain invisible. We break the rules because algorithms punish the predictable.</p>
            </div>

            <div className="p-12 border-b-4 md:border-b-0 md:border-r-4 border-ink-black hover:bg-ink-black hover:text-studio-white transition-colors duration-300 group">
              <span className="font-display-2xl text-6xl text-ink-black group-hover:text-electric-red mb-6 block">03</span>
              <h3 className="font-headline-md text-4xl uppercase mb-4">Speed Kills</h3>
              <p className="font-body-lg text-xl font-bold">We don't spend months in boardrooms. We ship, test, kill the losers, and pour gasoline on the winners before the market reacts.</p>
            </div>
            
            <div className="p-12 hover:bg-electric-red hover:text-ink-black transition-colors duration-300 group">
              <span className="font-display-2xl text-6xl text-electric-red group-hover:text-voltage-yellow mb-6 block">04</span>
              <h3 className="font-headline-md text-4xl uppercase mb-4">Data is God</h3>
              <p className="font-body-lg text-xl font-bold">Opinions don't scale. We let the numbers dictate the creative direction. If it doesn't convert, it's garbage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Hit Squad (Team Grid) */}
      <section className="py-32 px-6 bg-ink-black text-studio-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display-2xl text-[60px] md:text-[90px] leading-none uppercase mb-16 border-b-4 border-studio-white pb-4 text-voltage-yellow">The Hit Squad</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="relative aspect-[3/4] border-4 border-studio-white group overflow-hidden cursor-pointer">
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-surface-variant flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                   <span className="font-label-mono text-xs uppercase text-gray-500 tracking-widest text-center px-4">MongoDB<br/>Image Asset</span>
                </div>
                
                {/* Hover Reveal Card */}
                <motion.div 
                  className={`absolute inset-0 flex flex-col justify-end p-6 ${member.color} ${member.color === 'bg-studio-white' || member.color === 'bg-voltage-yellow' || member.color === 'bg-electric-red' ? 'text-ink-black' : 'text-studio-white'}`}
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <h3 className="font-display-2xl text-[50px] leading-none uppercase mb-2 mix-blend-color-burn">{member.name}</h3>
                  <div className="font-headline-md text-xl uppercase font-bold mb-4">{member.role}</div>
                  <div className="mt-auto border-t-2 border-current border-opacity-30 pt-4">
                    <span className="font-label-mono text-[10px] uppercase tracking-widest block mb-1">Weapon of Choice</span>
                    <span className="font-headline-md text-lg uppercase">{member.specialty}</span>
                  </div>
                </motion.div>
                
                {/* Default Bottom Bar (Hidden on hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-ink-black border-t-4 border-studio-white group-hover:translate-y-full transition-transform duration-300">
                  <h3 className="font-headline-md text-2xl uppercase text-studio-white">{member.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
