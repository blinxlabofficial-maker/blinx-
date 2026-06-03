"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/api";


export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    brand: "",
    budget: "10k",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          brand: "",
          budget: "10k",
          message: ""
        });
      } else {
        const err = await response.json();
        setError(err.error || "Failed to transmit signal.");
      }
    } catch (err) {
      setError("Transmission error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="w-full md:w-1/2 p-8 md:p-16 bg-studio-white text-ink-black flex flex-col justify-center relative">
        
        {success ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl mx-auto text-center flex flex-col items-center justify-center p-12 border-4 border-ink-black bg-voltage-yellow brutalist-shadow-white"
          >
            <span className="material-symbols-outlined text-[80px] text-ink-black mb-6 animate-bounce">bolt</span>
            <h2 className="font-display-2xl text-5xl uppercase leading-none mb-4 text-ink-black">
              Signal <br/>Transmitted.
            </h2>
            <p className="font-headline-md text-lg uppercase font-bold max-w-md mb-8 text-ink-black">
              Protocol code loaded into core matrix. Our high-velocity agents are auditing your brand stack right now.
            </p>
            <button 
              className="action-btn text-studio-white font-headline-md text-xl uppercase border-2 border-studio-white bg-ink-black px-6 py-3 cursor-pointer hover:bg-electric-red transition-all"
              onClick={() => setSuccess(false)}
            >
              Transmit Another Signal
            </button>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
            <div className="border-b-4 border-ink-black pb-4 mb-2">
              <h2 className="font-display-2xl text-[45px] md:text-[55px] leading-none uppercase mb-2 text-ink-black">
                Transmit Signal
              </h2>
              <p className="font-label-mono text-sm uppercase tracking-widest text-gray-600">
                Establish core connection vector
              </p>
            </div>

            <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
              
              {error && (
                <div className="border-4 border-electric-red bg-electric-red bg-opacity-20 p-4 font-label-mono text-sm uppercase tracking-widest text-electric-red font-bold text-center">
                  ⚠ {error}
                </div>
              )}

              <div className="group">
                <label className="font-label-mono text-sm uppercase tracking-widest block mb-2 text-ink-black opacity-60 group-focus-within:opacity-100 group-focus-within:text-electric-red transition-colors">
                  Agent Identity (Name) *
                </label>
                <input 
                  type="text" 
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b-4 border-ink-black py-4 font-headline-md text-3xl uppercase outline-none text-ink-black focus:border-electric-red focus:bg-electric-red focus:bg-opacity-10 transition-all placeholder:text-gray-400"
                  placeholder="John Doe"
                />
              </div>

              <div className="group">
                <label className="font-label-mono text-sm uppercase tracking-widest block mb-2 text-ink-black opacity-60 group-focus-within:opacity-100 group-focus-within:text-electric-red transition-colors">
                  Transmission Vector (Email) *
                </label>
                <input 
                  type="email" 
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b-4 border-ink-black py-4 font-headline-md text-3xl uppercase outline-none text-ink-black focus:border-electric-red focus:bg-electric-red focus:bg-opacity-10 transition-all placeholder:text-gray-400"
                  placeholder="john@brand.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="font-label-mono text-sm uppercase tracking-widest block mb-2 text-ink-black opacity-60 group-focus-within:opacity-100 group-focus-within:text-electric-red transition-colors">
                    Brand Designation *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={form.brand}
                    onChange={e => setForm({ ...form, brand: e.target.value })}
                    className="w-full bg-transparent border-b-4 border-ink-black py-4 font-headline-md text-2xl uppercase outline-none text-ink-black focus:border-electric-red focus:bg-electric-red focus:bg-opacity-10 transition-all placeholder:text-gray-400"
                    placeholder="Acme Corp"
                  />
                </div>
                
                <div className="group">
                  <label className="font-label-mono text-sm uppercase tracking-widest block mb-2 text-ink-black opacity-60 group-focus-within:opacity-100 group-focus-within:text-electric-red transition-colors">
                    Monthly Ammo (Budget) *
                  </label>
                  <select 
                    value={form.budget}
                    onChange={e => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-transparent border-b-4 border-ink-black py-4 font-headline-md text-2xl uppercase outline-none text-ink-black focus:border-electric-red focus:bg-electric-red focus:bg-opacity-10 transition-all cursor-pointer appearance-none"
                  >
                    <option value="10k" className="text-ink-black bg-studio-white">Under $10K</option>
                    <option value="50k" className="text-ink-black bg-studio-white">$10K - $50K</option>
                    <option value="100k" className="text-ink-black bg-studio-white">$50K - $100K</option>
                    <option value="max" className="text-ink-black bg-studio-white">$100K+</option>
                  </select>
                </div>
              </div>

              <div className="group">
                <label className="font-label-mono text-sm uppercase tracking-widest block mb-2 text-ink-black opacity-60 group-focus-within:opacity-100 group-focus-within:text-electric-red transition-colors">
                  The Objective *
                </label>
                <textarea 
                  rows={4}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b-4 border-ink-black py-4 font-body-lg text-xl outline-none text-ink-black focus:border-electric-red focus:bg-electric-red focus:bg-opacity-10 transition-all placeholder:text-gray-400 resize-none"
                  placeholder="Tell us what's broken and how fast you want to scale..."
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="mt-8 btn-primary interactive font-headline-md text-headline-md text-3xl md:text-5xl uppercase px-12 py-8 border-4 border-ink-black w-full bg-ink-black text-studio-white hover:bg-electric-red hover:text-ink-black transition-colors"
              >
                {loading ? "TRANSMITTING..." : "Transmit Signal"}
              </motion.button>
              
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
