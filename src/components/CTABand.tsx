'use client';

export default function CTABand() {
  return (
    <section className="cta-section" id="contact">
      <div className="section-inner">
        <div className="cta-inner reveal visible">
          <h2>Your audience is scrolling right now. Are you ready?</h2>
          <p className="cta-sub">
            Book a free 30-minute strategy call. No fluff. Just a clear plan to grow your brand.
          </p>
          <div className="cta-actions">
            <a href="mailto:hello@blinxlab.com" className="btn-white">
              Book a Free Strategy Call
            </a>
            <a href="https://wa.me/91" className="btn-outline-white">
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}