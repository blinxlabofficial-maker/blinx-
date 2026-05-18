'use client';

export default function ServicesGrid() {
  const services = [
    {
      num: '01',
      name: 'Overall Brand Management',
      desc: 'End-to-end brand identity across all digital touchpoints. Visual consistency, brand voice, cross-platform narrative.',
      delay: 'reveal-delay-1',
    },
    {
      num: '02',
      name: 'Social Media Marketing',
      desc: 'Full-service SMM including platform strategy, content calendars, scheduling, community management, and analytics.',
      delay: 'reveal-delay-2',
    },
    {
      num: '03',
      name: 'Influencer Marketing',
      desc: 'End-to-end influencer campaigns: sourcing, briefing, negotiations, UGC direction, and performance tracking.',
      delay: 'reveal-delay-3',
    },
    {
      num: '04',
      name: 'Reel Shoots',
      desc: 'Professional short-form video production for Instagram Reels, YouTube Shorts. Scripting, talent, shoot & edit.',
      delay: 'reveal-delay-1',
    },
    {
      num: '05',
      name: 'Product Shoots',
      desc: 'E-commerce and lifestyle product photography. Studio and on-location with art direction and retouching.',
      delay: 'reveal-delay-2',
    },
    {
      num: '06',
      name: 'Video Editing',
      desc: 'Post-production editing for brand videos, reels, and ads. Colour grading, motion graphics, captions, sound design.',
      delay: 'reveal-delay-3',
    },
    {
      num: '07',
      name: 'Website Development',
      desc: 'Mobile-first, SEO-ready brand websites, landing pages, and e-commerce stores built for performance.',
      delay: 'reveal-delay-1',
    },
    {
      num: '08',
      name: 'SEO Management',
      desc: 'Technical SEO audits, keyword strategy, on-page optimisation, link building, and monthly rank tracking.',
      delay: 'reveal-delay-2',
    },
    {
      num: '09',
      name: 'AIO Management',
      desc: 'AI-Optimised Content strategy: adapting brand content for AI search discovery, LLM citations, and next-gen SEO.',
      delay: 'reveal-delay-3',
    },
  ];

  return (
    <section className="services" id="services">
      <div className="section-inner">
        <div className="services-head reveal visible">
          <div className="section-label">What We Do</div>
          <h2>Full-spectrum social media for growth-focused brands.</h2>
        </div>
        <div className="services-grid">
          {services.map((svc) => (
            <div key={svc.num} className={`service-card reveal visible ${svc.delay}`}>
              <span className="service-num">{svc.num}</span>
              <div className="service-name">{svc.name}</div>
              <div className="service-desc">{svc.desc}</div>
              <div className="service-arrow">Learn more →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}