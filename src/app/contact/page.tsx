'use client';

export default function ContactPage() {
  return (
    <main className="pt-32 pb-24 px-8 md:px-16 max-w-[1200px] mx-auto min-h-screen">
      <div className="section-label text-red uppercase tracking-wider text-sm mb-4">Start Your Sprint</div>
      <h1 className="text-5xl md:text-7xl font-display text-white max-w-4xl mb-16 leading-tight">
        Drop the agency lag. Let's move fast and break metrics.
      </h1>

      <div className="grid lg:grid-cols-2 gap-24">
        {/* Contact Info Side */}
        <div className="space-y-16 lg:pr-12">
          
          <div>
            <h2 className="text-3xl font-display text-white mb-6">Let's talk growth.</h2>
            <p className="text-xl text-gray-light leading-relaxed">
              Whether you need strategic branding, a full social takeover, 
              or a dedicated growth funnel, our sprint team is ready.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-ink2 p-8 rounded-2xl border border-white/5 hover:border-yellow/30 transition-all cursor-pointer group">
              <div className="text-yellow text-sm font-ui uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow animate-pulse"></span>
                Fastest Response
              </div>
              <h3 className="text-2xl font-display text-white mb-2 group-hover:text-yellow transition-colors">WhatsApp Us</h3>
              <p className="text-gray-light font-ui mb-4">Chat directly with a strategist right now.</p>
              <a href="https://wa.me/91XXXXXXXXXX" className="text-white hover:text-yellow inline-flex items-center gap-2 transition-colors">
                +91 999 999 9999 <span>→</span>
              </a>
            </div>

            <div className="bg-ink2 p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-display text-white mb-2">Book a Discovery Call</h3>
              <p className="text-gray-light font-ui mb-4">Schedule a 30-min strategy session securely via Calendly.</p>
              <a href="https://calendly.com" target="_blank" rel="noreferrer" className="text-white hover:text-red inline-flex items-center gap-2 transition-colors">
                View Calendar <span>→</span>
              </a>
            </div>
            
            <div>
              <h4 className="text-gray tracking-widest uppercase text-xs mb-2">Email</h4>
              <a href="mailto:hello@blinxlab.com" className="text-xl text-white hover:text-red transition-colors font-display">hello@blinxlab.com</a>
            </div>
            
            <div>
              <h4 className="text-gray tracking-widest uppercase text-xs mb-2">HQ</h4>
              <p className="text-lg text-white font-ui">
                123 Digital Ave, Tech Hub<br/>
                Mumbai, MH 400001
              </p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-ink2 p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative h-fit">
          <div className="absolute top-0 right-12 -mt-4 bg-red text-white text-xs font-ui uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
            Lead Capture
          </div>
          <h2 className="text-2xl font-display text-white mb-8">Send an Inquiry</h2>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray font-ui uppercase tracking-wide">First Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 pb-3 mt-1 text-white outline-none focus:border-red transition-colors font-ui" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray font-ui uppercase tracking-wide">Last Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 pb-3 mt-1 text-white outline-none focus:border-red transition-colors font-ui" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray font-ui uppercase tracking-wide">Work Email</label>
              <input type="email" className="w-full bg-transparent border-b border-white/20 pb-3 mt-1 text-white outline-none focus:border-red transition-colors font-ui" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray font-ui uppercase tracking-wide">Company / Brand</label>
              <input type="text" className="w-full bg-transparent border-b border-white/20 pb-3 mt-1 text-white outline-none focus:border-red transition-colors font-ui" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray font-ui uppercase tracking-wide">How can we help?</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-white/20 pb-3 mt-1 text-white outline-none focus:border-red transition-colors font-ui resize-none" required></textarea>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-white text-ink hover:bg-yellow hover:text-ink font-display text-lg py-4 rounded-full transition-all flex items-center justify-center gap-2 group">
                Submit Request
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
            <p className="text-xs text-gray text-center mt-4 font-ui">
              We typically respond within 2-4 hours during business days.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

