"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import Logo from "@/components/Logo";
import { API_BASE_URL } from "@/lib/api";

// -----------------------------------------------------
// MONGODB-READY SCHEMA
// This mimics a flat collection returned from an API.
// -----------------------------------------------------
export type FlowNode = {
  id: string;
  parentId: string | null;
  type: "root" | "service" | "client" | "work";
  title: string;
  subtitle?: string;
  metrics?: { label: string; value: string }[];
  chips?: string[];
  color: string;
};

const MOCK_DB: FlowNode[] = [
  { id: "root", parentId: null, type: "root", title: "BLINX LAB", subtitle: "Creative Studio", color: "bg-studio-white", chips: ["HQ", "Global"] },
  
  // SERVICES
  { id: "srv-photo", parentId: "root", type: "service", title: "Photography", subtitle: "Editorial & Commercial", color: "bg-ink-black", metrics: [{ label: "Shoots", value: "18+" }] },
  { id: "srv-video", parentId: "root", type: "service", title: "Video Motion", subtitle: "Cinematic Campaigns", color: "bg-voltage-yellow", metrics: [{ label: "Films", value: "24" }] },
  { id: "srv-social", parentId: "root", type: "service", title: "Social Cult", subtitle: "Algorithmic Domination", color: "bg-electric-red", chips: ["Growth", "Viral"] },
  
  // CLIENTS (Photo)
  { id: "cli-nova", parentId: "srv-photo", type: "client", title: "Nova Fashion", subtitle: "Summer Lookbook", color: "bg-ink-black" },
  { id: "cli-apex", parentId: "srv-photo", type: "client", title: "Apex Gear", subtitle: "Product Stills", color: "bg-ink-black" },
  { id: "cli-luna", parentId: "srv-photo", type: "client", title: "Luna Cosmetics", subtitle: "Product Campaign", color: "bg-ink-black" },
  
  // CLIENTS (Video)
  { id: "cli-momentum", parentId: "srv-video", type: "client", title: "Momentum Gym", subtitle: "Launch Anthem", color: "bg-ink-black" },
  { id: "cli-horizon", parentId: "srv-video", type: "client", title: "Horizon Auto", subtitle: "EV Commercial", color: "bg-ink-black" },
  
  // CLIENTS (Social)
  { id: "cli-bloom", parentId: "srv-social", type: "client", title: "Bloom Skincare", subtitle: "TikTok Strategy", color: "bg-ink-black" },
  { id: "cli-pulse", parentId: "srv-social", type: "client", title: "Pulse Energy", subtitle: "Reels Growth", color: "bg-ink-black" },

  // WORK (Nova)
  { id: "work-nova-1", parentId: "cli-nova", type: "work", title: "Campaign Assets", subtitle: "32 Deliverables", color: "bg-electric-red", metrics: [{ label: "Conversion", value: "+14%" }] },
  { id: "work-nova-2", parentId: "cli-nova", type: "work", title: "Editorial Lookbook", subtitle: "Print & Web", color: "bg-electric-red", metrics: [{ label: "Reach", value: "1.2M" }] },
  
  // WORK (Apex)
  { id: "work-apex-1", parentId: "cli-apex", type: "work", title: "Studio E-comm", subtitle: "120 SKUs", color: "bg-electric-red" },
  
  // WORK (Luna)
  { id: "work-luna-1", parentId: "cli-luna", type: "work", title: "Holiday Launch", subtitle: "Hero Stills", color: "bg-electric-red" },

  // WORK (Momentum)
  { id: "work-mom-1", parentId: "cli-momentum", type: "work", title: "Hero Film 45s", subtitle: "Full Production", color: "bg-electric-red", metrics: [{ label: "Views", value: "2.1M" }] },
  { id: "work-mom-2", parentId: "cli-momentum", type: "work", title: "Social Cutdowns", subtitle: "3x 15s Shorts", color: "bg-electric-red" },

  // WORK (Horizon)
  { id: "work-hor-1", parentId: "cli-horizon", type: "work", title: "City Reveal", subtitle: "CGI + Live Action", color: "bg-electric-red", metrics: [{ label: "Shares", value: "45K" }] },

  // WORK (Bloom)
  { id: "work-bloom-1", parentId: "cli-bloom", type: "work", title: "Creator Network", subtitle: "20 Influencers", color: "bg-electric-red", metrics: [{ label: "Growth", value: "340%" }] },
  
  // WORK (Pulse)
  { id: "work-pulse-1", parentId: "cli-pulse", type: "work", title: "Energy Challenge", subtitle: "UGC Campaign", color: "bg-electric-red", metrics: [{ label: "UGC", value: "10K+" }] },
];

// -----------------------------------------------------
// LAYOUT ALGORITHM
// -----------------------------------------------------
type PositionedNode = FlowNode & { x: number; y: number };
type Edge = { id: string; x1: number; y1: number; x2: number; y2: number };

export default function FlowCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [db, setDb] = useState<FlowNode[]>(MOCK_DB);

  useEffect(() => {
    fetch(`${API_BASE_URL}/portfolio`)
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDb(data);
        }
      })
      .catch(() => {
        // Fall back silently to mock DB if backend offline
      });
  }, []);

  // State: which nodes have been "clicked" to expand their children
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["root"]));
  const [scale, setScale] = useState(1);

  // Motion values for responsive draggable canvas coordinates
  const canvasX = useMotionValue(100);
  const canvasY = useMotionValue(0);

  // Dynamically calculate mobile canvas dimensions and start scale zoom level
  useEffect(() => {
    if (typeof window !== "undefined") {
      canvasY.set(window.innerHeight / 2 - 60);
      if (window.innerWidth < 768) {
        setScale(0.45); // Automatically zoom out on mobile viewports so nodes are visible
      } else {
        setScale(0.9);
      }
    }
  }, []);

  // Handle Ctrl + Scroll for Zooming
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); // Prevent native browser zoom
        const zoomSpeed = 0.002;
        const delta = -e.deltaY * zoomSpeed;
        setScale(prev => Math.min(Math.max(0.2, prev + delta), 2.5));
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Calculate layout dynamically based on expanded state
  const { nodes, edges } = useMemo(() => {
    const positionedNodes: PositionedNode[] = [];
    const calculatedEdges: Edge[] = [];
    
    const NODE_WIDTH = 300;
    const NODE_HEIGHT = 120;
    const X_SPACING = 400;
    const Y_SPACING = 240;

    // Recursive layout function
    const layoutTree = (nodeId: string, depth: number, startY: number): number => {
      const nodeData = db.find(n => n.id === nodeId);
      if (!nodeData) return startY;

      const children = db.filter(n => n.parentId === nodeId);
      const isExpanded = expandedIds.has(nodeId);
      
      let currentY = startY;
      let childrenTotalHeight = 0;

      if (isExpanded && children.length > 0) {
        let childStartY = startY;
        children.forEach((child) => {
          const childSubtreeHeight = layoutTree(child.id, depth + 1, childStartY);
          childStartY = childSubtreeHeight;
        });
        childrenTotalHeight = childStartY - startY;
        currentY = startY + (childrenTotalHeight / 2) - (NODE_HEIGHT / 2);
      } else {
        currentY = startY;
        childrenTotalHeight = Y_SPACING;
      }

      const x = depth * X_SPACING;
      const y = currentY;

      positionedNodes.push({ ...nodeData, x, y });

      if (isExpanded && children.length > 0) {
        children.forEach(child => {
          const childNode = positionedNodes.find(n => n.id === child.id);
          if (childNode) {
            calculatedEdges.push({
              id: `${nodeId}-${child.id}`,
              x1: x + NODE_WIDTH, // right side of parent
              y1: y + NODE_HEIGHT / 2, // middle of parent
              x2: childNode.x, // left side of child
              y2: childNode.y + NODE_HEIGHT / 2 // middle of child
            });
          }
        });
      }

      return startY + Math.max(Y_SPACING, childrenTotalHeight);
    };

    // Calculate layout starting from root
    layoutTree("root", 0, 0);

    // Center the whole tree to starting coordinates
    const rootNode = positionedNodes.find(n => n.id === "root");
    if (rootNode) {
      const yOffset = -rootNode.y; // shift tree so root is at y=0
      positionedNodes.forEach(n => n.y += yOffset);
      calculatedEdges.forEach(e => { e.y1 += yOffset; e.y2 += yOffset; });
    }

    return { nodes: positionedNodes, edges: calculatedEdges };
  }, [expandedIds, db]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        // Optional: recursively collapse all descendants to keep state clean
        const collapseRecursive = (parentId: string) => {
          next.delete(parentId);
          db.filter(n => n.parentId === parentId).forEach(c => collapseRecursive(c.id));
        };
        collapseRecursive(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const centerMap = () => {
    const targetX = 100;
    const targetY = typeof window !== "undefined" ? window.innerHeight / 2 - 60 : 0;
    animate(canvasX, targetX, { type: "spring", stiffness: 200, damping: 25 });
    animate(canvasY, targetY, { type: "spring", stiffness: 200, damping: 25 });
    setScale(window.innerWidth < 768 ? 0.45 : 0.9);
  };

  return (
    <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative">
      {/* Infinite Draggable Canvas Layer */}
      <motion.div 
        drag 
        dragConstraints={containerRef}
        dragElastic={0.2}
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="absolute w-[8000px] h-[8000px] left-[-4000px] top-[-4000px]"
        style={{ x: canvasX, y: canvasY, originX: 0.5, originY: 0.5 }}
      >
        {/* Origin container to center coordinates within the 8000x8000 canvas */}
        <div className="absolute left-[4000px] top-[4000px]">
          
          {/* SVG Edges */}
          <svg className="absolute overflow-visible pointer-events-none z-0">
            {edges.map(edge => {
              // Cubic bezier curve calculation for smooth branching
              const controlPointOffset = Math.max(Math.abs(edge.x2 - edge.x1) / 2, 50);
              const pathData = `M ${edge.x1} ${edge.y1} C ${edge.x1 + controlPointOffset} ${edge.y1}, ${edge.x2 - controlPointOffset} ${edge.y2}, ${edge.x2} ${edge.y2}`;
              return (
                <motion.path
                  key={edge.id}
                  d={pathData}
                  fill="none"
                  stroke="#2f2a22"
                  strokeWidth="4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              );
            })}
          </svg>
 
          {/* HTML Nodes */}
          {nodes.map(node => {
            const hasChildren = db.some(n => n.parentId === node.id);
            const isExpanded = expandedIds.has(node.id);
            
            // Map text colors based on background
            const textColor = ["bg-studio-white", "bg-voltage-yellow", "bg-primary", "bg-electric-red"].includes(node.color) ? "text-ink-black" : "text-studio-white";
            const isRoot = node.type === "root";

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8, x: node.x - 50, y: node.y }}
                animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="absolute group z-10 hover:z-20 w-[300px]"
                style={{ left: 0, top: 0 }}
              >
                {/* The Sharp Offset Shadow (like GET VOLTAGE button) */}
                <div className="absolute inset-0 bg-voltage-yellow border-2 border-ink-black transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2 -z-10" />

                {/* The Interactive Node Content */}
                <div
                  className={`relative w-full h-full p-6 border-2 border-ink-black ${node.color} ${textColor} transition-all duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-studio-white group-hover:text-ink-black cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent drag trigger
                    if (node.type === "work") {
                      // Navigate to the dynamic case study page
                      router.push(`/portfolio/${node.id}`);
                    } else if (hasChildren) {
                      toggleExpand(node.id);
                    }
                  }}
                >
                  <div className="font-label-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">
                    {node.type}
                  </div>
                  <div className={`font-headline-md font-bold leading-none ${isRoot ? 'text-4xl' : 'text-2xl'} mb-2`}>
                    {isRoot ? <Logo className="text-[40px] text-current" forceDark /> : node.title}
                  </div>
                  {node.subtitle && (
                    <div className="font-body-lg text-sm opacity-80 mb-4">
                      {node.subtitle}
                    </div>
                  )}
                  
                  {/* Dynamic Metrics or Chips */}
                  {(node.metrics || node.chips) && (
                    <div className="flex gap-2 flex-wrap mt-4 border-t border-current pt-4 border-opacity-20">
                      {node.metrics?.map(m => (
                        <div key={m.label} className="flex flex-col">
                          <span className="font-headline-md text-xl font-bold">{m.value}</span>
                          <span className="font-label-mono text-[9px] uppercase tracking-wider">{m.label}</span>
                        </div>
                      ))}
                      {node.chips?.map(c => (
                        <div key={c} className="px-2 py-1 text-[10px] uppercase font-label-mono border border-current border-opacity-30">
                          {c}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Expand Indicator */}
                  {hasChildren && (
                    <div className="absolute right-4 top-4 w-8 h-8 border-2 border-current flex items-center justify-center cursor-pointer hover:bg-current hover:text-studio-white transition-colors">
                      <span className="font-headline-md font-bold text-xl leading-none -mt-1">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Floating Action Button to Center Map */}
      <div className="absolute bottom-6 right-6 z-[30]">
        <button
          onClick={centerMap}
          className="px-4 py-3 bg-voltage-yellow text-ink-black border-2 border-ink-black font-label-mono text-xs uppercase font-bold tracking-wider hover:bg-studio-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#FF3C5A] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all duration-150 flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm font-bold">filter_center_focus</span>
          Center Map
        </button>
      </div>
    </div>
  );
}
