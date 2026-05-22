import Link from "next/link";
import { notFound } from "next/navigation";
import { FlowNode } from "@/components/FlowCanvas";

// In a real app, this would be fetched from MongoDB
const MOCK_DB: FlowNode[] = [
  { id: "work-nova-1", parentId: "cli-nova", type: "work", title: "Campaign Assets", subtitle: "32 Deliverables", color: "bg-electric-red", metrics: [{ label: "Conversion", value: "+14%" }] },
  { id: "work-nova-2", parentId: "cli-nova", type: "work", title: "Editorial Lookbook", subtitle: "Print & Web", color: "bg-electric-red", metrics: [{ label: "Reach", value: "1.2M" }] },
  { id: "work-apex-1", parentId: "cli-apex", type: "work", title: "Studio E-comm", subtitle: "120 SKUs", color: "bg-electric-red" },
  { id: "work-luna-1", parentId: "cli-luna", type: "work", title: "Holiday Launch", subtitle: "Hero Stills", color: "bg-electric-red" },
  { id: "work-mom-1", parentId: "cli-momentum", type: "work", title: "Hero Film 45s", subtitle: "Full Production", color: "bg-electric-red", metrics: [{ label: "Views", value: "2.1M" }] },
  { id: "work-mom-2", parentId: "cli-momentum", type: "work", title: "Social Cutdowns", subtitle: "3x 15s Shorts", color: "bg-electric-red" },
  { id: "work-hor-1", parentId: "cli-horizon", type: "work", title: "City Reveal", subtitle: "CGI + Live Action", color: "bg-electric-red", metrics: [{ label: "Shares", value: "45K" }] },
  { id: "work-bloom-1", parentId: "cli-bloom", type: "work", title: "Creator Network", subtitle: "20 Influencers", color: "bg-electric-red", metrics: [{ label: "Growth", value: "340%" }] },
  { id: "work-pulse-1", parentId: "cli-pulse", type: "work", title: "Energy Challenge", subtitle: "UGC Campaign", color: "bg-electric-red", metrics: [{ label: "UGC", value: "10K+" }] },
];

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = MOCK_DB.find(p => p.id === resolvedParams.id);
  
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-ink-black text-studio-white relative overflow-hidden">
      {/* Brutalist Navigation Bar */}
      <nav className="w-full border-b-2 border-surface-variant p-6 flex justify-between items-center bg-ink-black sticky top-0 z-50">
        <Link href="/portfolio" className="font-headline-md text-2xl uppercase hover:text-electric-red transition-colors flex items-center gap-2">
          <span>←</span> Back to Map
        </Link>
        <div className="font-label-mono text-xs uppercase tracking-widest text-gray-400">
          Case Study // {project.id}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="mb-24">
          <h1 className="font-display-2xl text-[60px] md:text-[90px] leading-none uppercase text-electric-red mb-4">
            {project.title}
          </h1>
          <h2 className="font-headline-md text-[30px] md:text-[40px] uppercase text-gray-300">
            {project.subtitle}
          </h2>
          
          {/* Metrics Bar */}
          {project.metrics && (
            <div className="flex gap-8 mt-12 pt-12 border-t-2 border-surface-variant">
              {project.metrics.map(m => (
                <div key={m.label} className="flex flex-col">
                  <span className="font-display-2xl text-[50px] text-voltage-yellow leading-none">{m.value}</span>
                  <span className="font-label-mono text-sm uppercase tracking-widest mt-2">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Description Placeholder */}
        <div className="max-w-3xl mb-16">
          <h3 className="font-headline-md text-3xl uppercase text-electric-red mb-6">The Brief</h3>
          <p className="font-body-lg text-lg text-gray-300 leading-relaxed">
            This is a placeholder for the rich text description that will be loaded from your MongoDB backend. When you build your admin panel, you can inject full paragraphs detailing the creative process, the challenges faced, and how the studio executed the final deliverables.
          </p>
        </div>

        {/* Dynamic MongoDB Content Placeholder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="aspect-square bg-surface-variant border-2 border-ink-black relative group overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center font-label-mono text-gray-400 uppercase tracking-widest opacity-50">
              MongoDB Image Asset 1
            </div>
          </div>
          <div className="aspect-[4/3] bg-surface-variant border-2 border-ink-black relative group overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center font-label-mono text-gray-400 uppercase tracking-widest opacity-50">
              MongoDB Image Asset 2
            </div>
          </div>
          <div className="aspect-video md:col-span-2 bg-surface-variant border-2 border-ink-black relative group overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center font-label-mono text-gray-400 uppercase tracking-widest opacity-50">
              MongoDB Video Asset
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
