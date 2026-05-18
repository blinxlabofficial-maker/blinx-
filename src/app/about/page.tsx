import Image from 'next/image';

export default function AboutPage() {
  const values = [
    { title: "Social", desc: "Digital natives who understand culture, algorithms, and human connection." },
    { title: "Sharp", desc: "Strategic excellence paired with high-impact visual design." },
    { title: "Swift", desc: "Rapid iterations, flexible sprints, and fast delivery." }
  ];

  return (
    <main className="pt-32 pb-24 px-8 md:px-16 max-w-[1200px] mx-auto min-h-screen">
      
      {/* Hero Section */}
      <div className="mb-24">
        <div className="section-label text-red uppercase tracking-wider text-sm mb-4">Our Story</div>
        <h1 className="text-5xl md:text-7xl font-display text-white mb-8 max-w-4xl leading-tight">
          We build brands that dictate culture, not just follow it.
        </h1>
        <p className="text-gray-light max-w-2xl text-lg md:text-xl leading-relaxed">
          Blinx Lab is a forward-thinking digital agency born out of the need to bridge the gap between heavy strategic thinking and lightning-fast execution. We don't just create content; we engineer growth engines.
        </p>
      </div>

      {/* Values Section */}
      <div className="mb-32">
        <h2 className="text-3xl md:text-4xl font-display text-white mb-12">Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-ink2 p-8 rounded-2xl border border-white/5 hover:border-red/30 transition-colors">
              <div className="text-red font-display text-4xl mb-4">{(idx + 1).toString().padStart(2, '0')}</div>
              <h3 className="text-xl font-display text-white mb-3">{val.title}</h3>
              <p className="text-gray-light leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team / Mission Section */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-ink2 border border-white/5">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Agency team collaboration"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-display text-white mb-6">The Mission</h2>
          <p className="text-lg text-gray-light leading-relaxed mb-8">
            Our mission is to elevate your brand's digital presence through meticulous execution and data-driven creativity. We partner with founders and marketing teams who want to move faster and hit harder.
          </p>
          <div className="space-y-6">
            <div className="pl-6 border-l-2 border-red">
              <h4 className="text-white font-display text-xl mb-2">Why Blinx Lab?</h4>
              <p className="text-gray-light">Traditional agencies are too slow. Freelancers lack strategic depth. We provide the perfect middle ground: agency firepower with sprint-based agility.</p>
            </div>
            <div className="pl-6 border-l-2 border-yellow">
              <h4 className="text-white font-display text-xl mb-2">Our Vision</h4>
              <p className="text-gray-light">To be the default growth partner for the next generation of industry-defining brands globally.</p>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

