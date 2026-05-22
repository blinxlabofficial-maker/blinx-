"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="relative bg-ink-black text-studio-white min-h-screen selection:bg-electric-red selection:text-ink-black flex flex-col md:flex-row">
      
      {/* Left Column - Branding & Manifesto */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen bg-electric-red text-ink-black p-8 md:p-16 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-ink-black relative overflow-hidden">
        
        <div className="relative z-10 hidden">
          {/* Logo removed as requested */}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative z-10 my-16 md:my-0"
        >
          <h1 className="font-display-2xl text-[60px] md:text-[110px] leading-none uppercase mb-6">
            Initiate <br/>Protocol.
          </h1>
          <p className="font-body-lg text-xl md:text-2xl font-bold max-w-md">
            If you're ready to break the algorithm and monopolize your market, transmit your signal. We only partner with brands ready to scale aggressively.
          </p>
        </motion.div>

        {/* Decorative Background Elements */}
        <div className="absolute -bottom-20 -left-20 opacity-10 pointer-events-none transform rotate-12">
           <span className="material-symbols-outlined text-[400px]">bolt</span>
        </div>
      </div>

      {/* Right Column - The Transmission Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16 bg-studio-white text-ink-black flex flex-col justify-center">
        
        <form className="w-full max-w-2xl mx-auto flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          
          <div className="group">
            <label className="font-label-mono text-sm uppercase tracking-widest block mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-electric-red transition-colors">
              Agent Identity (Name)
            </label>
            <input 
              type="text" 
              required
              className="w-full bg-transparent border-b-4 border-ink-black py-4 font-headline-md text-3xl uppercase outline-none focus:border-electric-red focus:bg-electric-red focus:bg-opacity-10 transition-all placeholder:text-gray-400"
              placeholder="John Doe"
            />
          </div>

          <div className="group">
            <label className="font-label-mono text-sm uppercase tracking-widest block mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-electric-red transition-colors">
              Transmission Vector (Email)
            </label>
            <input 
              type="email" 
              required
              className="w-full bg-transparent border-b-4 border-ink-black py-4 font-headline-md text-3xl uppercase outline-none focus:border-electric-red focus:bg-electric-red focus:bg-opacity-10 transition-all placeholder:text-gray-400"
              placeholder="john@brand.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <label className="font-label-mono text-sm uppercase tracking-widest block mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-electric-red transition-colors">
                Brand Designation
              </label>
              <input 
                type="text" 
                required
                className="w-full bg-transparent border-b-4 border-ink-black py-4 font-headline-md text-2xl uppercase outline-none focus:border-electric-red focus:bg-electric-red focus:bg-opacity-10 transition-all placeholder:text-gray-400"
                placeholder="Acme Corp"
              />
            </div>
            
            <div className="group">
              <label className="font-label-mono text-sm uppercase tracking-widest block mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-electric-red transition-colors">
                Monthly Ammo (Budget)
              </label>
              <select className="w-full bg-transparent border-b-4 border-ink-black py-4 font-headline-md text-2xl uppercase outline-none focus:border-electric-red focus:bg-electric-red focus:bg-opacity-10 transition-all cursor-pointer appearance-none">
                <option value="10k">Under $10K</option>
                <option value="50k">$10K - $50K</option>
                <option value="100k">$50K - $100K</option>
                <option value="max">$100K+</option>
              </select>
            </div>
          </div>

          <div className="group">
            <label className="font-label-mono text-sm uppercase tracking-widest block mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-electric-red transition-colors">
              The Objective
            </label>
            <textarea 
              rows={4}
              required
              className="w-full bg-transparent border-b-4 border-ink-black py-4 font-body-lg text-xl outline-none focus:border-electric-red focus:bg-electric-red focus:bg-opacity-10 transition-all placeholder:text-gray-400 resize-none"
              placeholder="Tell us what's broken and how fast you want to scale..."
            ></textarea>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 btn-primary interactive font-headline-md text-headline-md text-3xl md:text-5xl uppercase px-12 py-8 border-4 border-ink-black w-full"
          >
            Transmit Signal
          </motion.button>
          
        </form>
      </div>
    </main>
  );
}
