import Image from "next/image";
import CaseStudyWindow from "@/components/CaseStudyWindow";

export default function WorkPage() {
  return (
    <main className="pt-32 pb-24 px-8 md:px-16 max-w-[1200px] mx-auto min-h-screen">
      <div className="section-label text-red uppercase tracking-wider text-sm mb-4">Our Work</div>
      <h1 className="text-5xl md:text-7xl font-display text-white max-w-4xl mb-16 leading-tight">
        Brands we've built.
        <br />
        <span className="text-gray-light">Cultures we've shaped.</span>
      </h1>

      <div className="flex gap-4 mb-16 overflow-x-auto pb-4 hide-scrollbar">
        <button className="whitespace-nowrap px-6 py-2 rounded-full border border-white text-white font-ui text-sm hover:bg-white hover:text-ink transition-colors">
          All Work
        </button>
        <button className="whitespace-nowrap px-6 py-2 rounded-full border border-white/20 text-gray-light font-ui text-sm hover:border-white transition-colors">
          Brand Management
        </button>
        <button className="whitespace-nowrap px-6 py-2 rounded-full border border-white/20 text-gray-light font-ui text-sm hover:border-white transition-colors">
          Content Production
        </button>
        <button className="whitespace-nowrap px-6 py-2 rounded-full border border-white/20 text-gray-light font-ui text-sm hover:border-white transition-colors">
          Digital Growth
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink2 mb-6">
              <Image 
                src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80&sig=${item}`}
                alt={`Project Image ${item}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-ink/40 group-hover:bg-transparent transition-colors z-10"></div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-display text-white mb-2 group-hover:text-red transition-colors">Project Name {item}</h3>
                <p className="text-gray-light font-ui">Brand Architecture &amp; Social</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-red group-hover:border-red transition-all">
                →
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 py-16 border-t border-white/10 text-center">
        <h2 className="text-3xl font-display text-white mb-6">Ready to join the list?</h2>
        <p className="text-gray-light mb-8 max-w-lg mx-auto">We're selective about who we partner with. If you're serious about growth, let's talk.</p>
        <a href="/contact" className="inline-block bg-white text-ink px-8 py-4 rounded-full font-display hover:bg-yellow transition-colors">
          Start Your Sprint
        </a>
      </div>
    </main>
  );
}

