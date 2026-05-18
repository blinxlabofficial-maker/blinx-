import Link from 'next/link';

export default function ServicesPage() {
  const clusters = [
    {
      title: "Brand & Social",
      services: [
        "Overall Brand Management",
        "Social Media Marketing",
        "Influencer Marketing",
        "Meta & Google Ads"
      ]
    },
    {
      title: "Content Production",
      services: [
        "Reel Shoots",
        "Product Shoots",
        "Video Editing",
        "Graphic Design"
      ]
    },
    {
      title: "Digital Growth",
      services: [
        "Website Development",
        "SEO Management",
        "AIO Management"
      ]
    }
  ];

  return (
    <main className="pt-32 pb-24 px-8 md:px-16 max-w-[1200px] mx-auto min-h-screen">
      <div className="section-label text-red uppercase tracking-wider text-sm mb-4">Our Services</div>
      <h1 className="text-5xl md:text-7xl font-display text-white mb-16 max-w-4xl">
        Comprehensive execution across the digital spectrum.
      </h1>
      
      <div className="space-y-12">
        {clusters.map((cluster, clusterIdx) => (
          <div key={clusterIdx} className="border-t border-white/10 pt-8">
            <h2 className="text-3xl font-display text-white mb-8">{cluster.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cluster.services.map((service, idx) => (
                <div key={idx} className="group relative bg-ink2 p-8 rounded-2xl border border-white/5 hover:border-red transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <h3 className="text-xl font-display text-white mb-2">{service}</h3>
                  <p className="text-gray-light text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Learn more about our {service.toLowerCase()} process and how it drives value.
                  </p>
                  <div className="absolute bottom-8 right-8 text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                    →
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <Link href="/contact" className="inline-block bg-white text-ink font-display px-8 py-4 rounded-full hover:bg-yellow transition-colors">
          Start Your Sprint Today
        </Link>
      </div>
    </main>
  );
}
