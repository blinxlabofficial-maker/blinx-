import Link from "next/link";

export default async function ProjectPage({ params }: { params: { projectSlug: string } }) {
  const { projectSlug } = await params;
  
  // Here we would typically fetch the project data from the Node.js backend / MongoDB
  const projectTitle = projectSlug.replace(/-/g, " ").toUpperCase();

  return (
    <main className="min-h-screen pt-32 px-margin-desktop py-section-gap bg-ink-black text-studio-white border-t-4 border-voltage-yellow reveal active">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-voltage-yellow hover:text-studio-white uppercase font-label-mono mb-8 transition-colors duration-300">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </Link>
        
        <h1 className="font-display-2xl text-[60px] md:text-[90px] leading-none uppercase mb-6">
          {projectTitle}
        </h1>
        
        <div className="aspect-video w-full bg-electric-red border-4 border-studio-white mb-12 flex items-center justify-center">
          {/* Placeholder for project media (S3 bucket image/video) */}
          <span className="material-symbols-outlined text-[90px] text-ink-black opacity-50">image</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="col-span-2">
            <h2 className="font-headline-md text-headline-md uppercase mb-4 text-electric-red">Project Overview</h2>
            <p className="font-body-lg text-body-lg text-gray-300 mb-8">
              This is a dynamic project page for {projectTitle}. It will eventually fetch details like the description, media URLs (from AWS S3), and other metadata from the MongoDB database via our Express Node.js API.
            </p>
            <p className="font-body-lg text-gray-300">
              We engineer high-velocity creative for brands ready to break the algorithm. Stop posting. Start dominating.
            </p>
          </div>
          
          <div className="border-l-4 border-voltage-yellow pl-8">
            <div className="mb-8">
              <h3 className="font-label-mono text-voltage-yellow uppercase mb-2">Service</h3>
              <p className="font-body-md font-bold uppercase">High-Velocity Ads</p>
            </div>
            <div className="mb-8">
              <h3 className="font-label-mono text-voltage-yellow uppercase mb-2">Client</h3>
              <p className="font-body-md font-bold uppercase">Disruptor Brand</p>
            </div>
            <div>
              <h3 className="font-label-mono text-voltage-yellow uppercase mb-2">Impact</h3>
              <p className="font-body-md font-bold uppercase text-electric-red text-2xl">10x ROAS</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
