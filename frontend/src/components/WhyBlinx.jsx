import React from 'react';
import { useScrollRevealMultiple } from '../hooks/useScrollReveal';
import './WhyBlinx.css';

const WhyBlinx = () => {
  useScrollRevealMultiple();

  return (
    <section id="why-blinx" className="why-blinx" data-testid="why-blinx-section">
      <div className="why-blinx-inner container">
        <div className="label why-blinx-label reveal" data-testid="why-blinx-label">WHY BLINX</div>
        <h2 className="why-blinx-heading reveal reveal-delay-1" data-testid="why-blinx-heading">
          Your digital presence should feel like your best salesperson.
        </h2>
        <p className="why-blinx-copy reveal reveal-delay-2" data-testid="why-blinx-copy">
          At Blinx Lab, we merge strategic insight, compelling creative, and robust technology to help ambitious small businesses stand out and compete online. We cut through the noise, dropping the confusing jargon and unnecessary complexity, to deliver solutions that drive real growth and measurable results for your bottom line.
        </p>
      </div>
    </section>
  );
};

export default WhyBlinx;
