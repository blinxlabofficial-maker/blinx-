'use client';

export default function Testimonials() {
  const testimonials = [
    {
      stars: '★★★★★',
      quote:
        '"Blinx Lab transformed our Instagram from a ghost town to our #1 lead source in 60 days. The strategy was sharp and the execution was flawless."',
      name: 'Aakash Mehta',
      company: 'Founder, Kova Skincare',
    },
    {
      stars: '★★★★★',
      quote:
        '"The reel shoots and editing quality were next level. Our content finally looks like a premium brand. 3x more saves and shares since we started."',
      name: 'Priya Sharma',
      company: 'CMO, Urban Roots',
    },
    {
      stars: '★★★★★',
      quote:
        '"Zero guesswork. They came in, understood our audience, and built a content system that runs like clockwork. Our engagement tripled in the first sprint."',
      name: 'Ravi Nair',
      company: 'CEO, Stackflow SaaS',
    },
    {
      stars: '★★★★★',
      quote:
        '"Best decision we made. Our LinkedIn went from 400 followers to over 12K in 90 days. The thought leadership content they create is genuinely exceptional."',
      name: 'Neha Kapoor',
      company: 'Director, Nexus Ventures',
    },
    {
      stars: '★★★★★',
      quote:
        '"They don\'t just post, they think. Every piece of content is intentional and on-brand. Our DMs went from quiet to full of genuine enquiries."',
      name: 'Sameer Joshi',
      company: 'Owner, Joshi Organics',
    },
  ];

  return (
    <section className="testimonials">
      <div className="section-inner">
        <div className="reveal visible">
          <div className="section-label">What Clients Say</div>
          <h2>Trusted by brands that mean business.</h2>
        </div>
      </div>
      <div className="testi-track-wrap">
        <div className="testi-track">
          {/* Render twice for infinite loop */}
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div key={idx} className="testi-card">
              <div className="testi-stars">{t.stars}</div>
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-name">{t.name}</div>
              <div className="testi-company">{t.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}