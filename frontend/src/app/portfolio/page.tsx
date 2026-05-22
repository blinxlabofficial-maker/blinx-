import FlowCanvas from "@/components/FlowCanvas";

export const metadata = {
  title: "Portfolio Map | Blinx Lab",
  description: "Interactive flowchart portfolio of Blinx Lab's creative services and case studies.",
};

export default function PortfolioPage() {
  return (
    <main className="w-full h-[calc(100vh-85px)] overflow-hidden bg-ink-black relative selection:bg-electric-red selection:text-ink-black">
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#F7F5F0 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      />
      
      {/* Absolute HUD Overlay */}
      <div className="absolute top-16 left-0 right-0 p-8 z-40 pointer-events-none flex justify-between items-start">
        <div className="pointer-events-auto">
          <h1 className="font-display-2xl text-[40px] md:text-[60px] text-electric-red uppercase leading-none">
            Portfolio <br/><span className="text-studio-white">Map</span>
          </h1>
          <p className="font-label-mono text-gray-400 mt-2 uppercase tracking-widest text-xs">
            Drag to pan • Ctrl + Scroll to zoom • Click nodes to expand
          </p>
        </div>
      </div>

      {/* Interactive Canvas */}
      <FlowCanvas />
    </main>
  );
}
