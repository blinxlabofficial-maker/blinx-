"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/Logo";

// MOCK MONGODB DATA
const MOCK_SERVICES_DB = [
  {
    id: "high-velocity-ads",
    title: "High-Velocity Ads",
    subtitle: "Performance creative that scales.",
    description: "We test fast, kill losers, and hyper-scale winners. Our performance creative is designed to exploit algorithms and drive massive ROAS. No vanity metrics, just pure bottom-line impact.",
    color: "bg-electric-red",
    textColor: "text-ink-black",
    metrics: [{ label: "Avg ROAS", value: "10x" }, { label: "Creative Tests/Mo", value: "200+" }]
  },
  {
    id: "content-engines",
    title: "Content Engines",
    subtitle: "Build a cult. Not an audience.",
    description: "Organic content strategies that build cult-like followings and massive brand equity. We engineer content pillars that generate compounding interest for your brand's attention economy.",
    color: "bg-ink-black",
    textColor: "text-studio-white",
    metrics: [{ label: "Viral Rate", value: "32%" }, { label: "Organic Reach", value: "50M+" }]
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    subtitle: "Designed for the scroll.",
    description: "Visual systems built to survive and dominate the digital feed. Bold, aggressive, and impossible to ignore. We don't do subtle; we do memorable.",
    color: "bg-voltage-yellow",
    textColor: "text-ink-black",
    metrics: [{ label: "Rebrands", value: "45" }, { label: "Recall Lift", value: "85%" }]
  },
  {
    id: "growth-strategy",
    title: "Growth Strategy",
    subtitle: "Hijack the algorithm.",
    description: "Data-driven roadmaps to hijack algorithms and force multiplicative growth. We identify the specific levers in your funnel that are bleeding cash and plug them with high-converting funnels.",
    color: "bg-studio-white",
    textColor: "text-ink-black",
    metrics: [{ label: "CPA Reduction", value: "-60%" }, { label: "LTV Increase", value: "3x" }]
  },
  // New services requested
  {
    id: "social-media-management",
    title: "Social Media Management",
    subtitle: "Dominate the conversation.",
    description: "Full‑stack strategy, content creation, and community engagement that turns social platforms into profit generators.",
    color: "bg-electric-red",
    textColor: "text-ink-black",
    metrics: [{ label: "Engagement ↑", value: "200%" }, { label: "Followers ↑", value: "5x" }]
  },
  {
    id: "meta-ads",
    title: "Meta Ads",
    subtitle: "Unleash Facebook & Instagram power.",
    description: "High‑impact paid campaigns on Meta channels, optimized for ROAS and rapid scaling.",
    color: "bg-ink-black",
    textColor: "text-studio-white",
    metrics: [{ label: "CPC", value: "$0.75" }, { label: "ROAS", value: "12x" }]
  },
  {
    id: "google-ads",
    title: "Google Ads",
    subtitle: "Capture intent at scale.",
    description: "Search, Shopping, and Display campaigns that dominate the SERP and turn clicks into customers.",
    color: "bg-voltage-yellow",
    textColor: "text-ink-black",
    metrics: [{ label: "Avg CPC", value: "$1.20" }, { label: "Conversion Rate", value: "8%" }]
  },
  {
    id: "seo",
    title: "SEO",
    subtitle: "Own the organic battlefield.",
    description: "Technical, on‑page, and off‑page SEO that drives sustainable, high‑volume traffic without ad spend.",
    color: "bg-studio-white",
    textColor: "text-ink-black",
    metrics: [{ label: "Traffic ↑", value: "300%" }, { label: "Keyword Rankings", value: "Top 3" }]
  },
  {
    id: "aio",
    title: "AIO",
    subtitle: "All‑in‑one growth engine.",
    description: "Integrated campaigns that combine ads, SEO, and content to create a self‑reinforcing growth loop.",
    color: "bg-electric-red",
    textColor: "text-ink-black",
    metrics: [{ label: "Growth Velocity", value: "5x" }, { label: "Cost per Lead", value: "$15" }]
  },
  {
    id: "photo-shoots",
    title: "Photo Shoots",
    subtitle: "High‑impact visual assets.",
    description: "Professional photography that creates assets perfect for ads, social, and branding.",
    color: "bg-ink-black",
    textColor: "text-studio-white",
    metrics: [{ label: "Assets Produced", value: "50+" }, { label: "Turnaround", value: "48h" }]
  },
  {
    id: "video-shoots",
    title: "Video Shoots",
    subtitle: "Cinematic brand storytelling.",
    description: "Full‑service video production—from concept to final cut—optimized for performance across platforms.",
    color: "bg-voltage-yellow",
    textColor: "text-ink-black",
    metrics: [{ label: "Views ↑", value: "5x" }, { label: "Engagement ↑", value: "300%" }]
  },
  {
    id: "influencer-marketing",
    title: "Influencer Marketing",
    subtitle: "Leverage cultural leaders.",
    description: "Strategic partnerships with influencers that amplify your brand's reach and credibility.",
    color: "bg-studio-white",
    textColor: "text-ink-black",
    metrics: [{ label: "Reach", value: "10M+" }, { label: "ROI", value: "15x" }]
  },
  {
    id: "web-dev",
    title: "Web Development",
    subtitle: "Build brutalist digital fronts.",
    description: "Fast, responsive, and high‑impact websites that convert visitors into customers.",
    color: "bg-electric-red",
    textColor: "text-ink-black",
    metrics: [{ label: "Speed Score", value: "90+" }, { label: "Launch Time", value: "2 weeks" }]
  },
  {
    id: "app-dev",
    title: "App Development",
    subtitle: "Native experiences, aggressive performance.",
    description: "iOS and Android apps built for maximum user retention and monetization.",
    color: "bg-ink-black",
    textColor: "text-studio-white",
    metrics: [{ label: "DAU ↑", value: "4x" }, { label: "Retention", value: "70%" }]
  },
  {
    id: "editing",
    title: "Editing",
    subtitle: "Polish every pixel.",
    description: "Professional photo and video editing that adds the final brutalist edge to your assets.",
    color: "bg-voltage-yellow",
    textColor: "text-ink-black",
    metrics: [{ label: "Turnaround", value: "24h" }, { label: "Satisfaction", value: "99%" }]
  }
];

export default function ServicesPage() {
  return (
    <main className="relative bg-ink-black text-studio-white min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="sticky top-[85px] h-[calc(100vh-85px)] z-0 flex flex-col justify-center items-center text-center p-8 bg-ink-black border-b-4 border-surface-variant overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <h1 className="font-display-2xl text-[80px] md:text-[130px] leading-none uppercase text-studio-white mix-blend-difference z-10 relative">
            Our <br/><span className="text-electric-red">Arsenal</span>
          </h1>
          <p className="font-body-lg text-xl md:text-2xl mt-8 max-w-2xl mx-auto text-gray-400 font-bold">
            We don't do "best practices". We deploy brutal, high-impact strategies engineered to monopolize attention and force massive scale.
          </p>
        </motion.div>
      </section>

      {/* 3. Sticky Service Sections */}
      {MOCK_SERVICES_DB.map((service, index) => (
        <section 
          key={service.id} 
          className={`sticky top-[85px] h-[calc(100vh-85px)] z-${(index + 1) * 10} flex flex-col justify-center px-6 md:px-24 py-12 ${service.color} ${service.textColor} border-t-4 border-ink-black overflow-y-auto`}
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Text & Details */}
            <div>
              <div className="font-label-mono text-sm uppercase tracking-widest opacity-60 mb-6">
                Service 0{index + 1}
              </div>
              <h2 className="font-display-2xl text-[60px] md:text-[90px] leading-none uppercase mb-6">
                {service.title}
              </h2>
              <h3 className="font-headline-md text-3xl uppercase opacity-80 mb-8">
                {service.subtitle}
              </h3>
              <p className="font-body-lg text-xl font-bold leading-relaxed opacity-90 max-w-xl">
                {service.description}
              </p>

              {/* Metrics */}
              <div className="flex gap-12 mt-12 pt-8 border-t-4 border-current border-opacity-20">
                {service.metrics.map(m => (
                  <div key={m.label} className="flex flex-col">
                    <span className="font-display-2xl text-[40px] md:text-[60px] leading-none">{m.value}</span>
                    <span className="font-label-mono text-xs uppercase tracking-widest mt-2 opacity-80">{m.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                 <Link href="/portfolio" className={`inline-block border-4 border-current px-8 py-4 font-headline-md text-2xl uppercase hover:bg-current ${service.textColor === 'text-ink-black' ? 'hover:text-studio-white' : 'hover:text-ink-black'} transition-colors`}>
                   View Case Studies
                 </Link>
              </div>
            </div>

            {/* Media Placeholder Grid for MongoDB Assets */}
            <div className="grid grid-cols-2 gap-4 h-[50vh] md:h-[70vh]">
              <div className="border-4 border-current opacity-30 relative flex items-center justify-center p-4">
                <span className="font-label-mono text-center uppercase text-sm">MongoDB Image/Video Asset 1</span>
              </div>
              <div className="grid grid-rows-2 gap-4">
                <div className="border-4 border-current opacity-30 relative flex items-center justify-center p-4">
                  <span className="font-label-mono text-center uppercase text-sm">Asset 2</span>
                </div>
                <div className="border-4 border-current opacity-30 relative flex items-center justify-center p-4">
                  <span className="font-label-mono text-center uppercase text-sm">Asset 3</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      ))}
      
      {/* 4. Bottom Padding to ensure the last sticky section rests nicely before footer, if we add one */}
    </main>
  );
}
