import Link from "next/link";

export default function ServicePage({ params }: { params: { serviceSlug: string } }) {
  const serviceName = params.serviceSlug.replace("-", " ");
  
  return (
    <main className="flex-1 min-h-screen pt-32 pb-24 px-[80px] bg-ink-black flex flex-col justify-start">
      <div className="max-w-4xl">
        <Link href="/" className="interactive inline-flex items-center gap-2 text-electric-red hover:text-voltage-yellow font-label-mono uppercase tracking-widest transition-colors mb-12">
          <span className="material-symbols-outlined">arrow_back</span> Return to Base
        </Link>
        <h1 className="font-display-2xl text-[80px] md:text-[110px] text-studio-white uppercase leading-none mb-8 tracking-tighter">
          {serviceName}
        </h1>
        <div className="w-full h-1 bg-electric-red mb-12 opacity-50"></div>
        <p className="font-body-lg text-2xl text-gray-300 max-w-2xl mb-16 border-l-4 border-voltage-yellow pl-6">
          This is the dedicated service vault for {serviceName}. We deploy rigorous, high-impact architecture specific to this domain to aggressively capture market share.
        </p>
        <h2 className="font-headline-lg text-[40px] uppercase text-studio-white border-b-4 border-ink-black pb-4 mb-8">Related Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="interactive border-4 border-studio-white p-8 group hover:border-voltage-yellow transition-colors cursor-pointer bg-surface-container-highest">
            <h3 className="font-headline-md text-3xl uppercase text-studio-white mb-2">Project Alpha</h3>
            <p className="font-label-mono uppercase text-voltage-yellow group-hover:text-electric-red transition-colors">View Deployment</p>
          </div>
        </div>
      </div>
    </main>
  );
}