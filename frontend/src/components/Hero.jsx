import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollRevealMultiple } from '../hooks/useScrollReveal';
import './Hero.css';

const Hero = () => {
  useScrollRevealMultiple();

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero" data-testid="hero-section">
      <div className="hero-inner container">
        <div className="hero-content">
          <div className="label hero-label hero-label-top reveal" data-testid="hero-label-top">DIGITAL GROWTH FOR REAL BUSINESSES</div>
          <h1 className="hero-heading reveal reveal-delay-1" data-testid="hero-heading">
            Small businesses deserve to be seen.
          </h1>
          <p className="hero-subtext reveal reveal-delay-2" data-testid="hero-subtext">
            Blinx Lab builds the digital presence that helps ambitious businesses get seen, trusted, and chosen.
          </p>
          <div className="hero-ctas reveal reveal-delay-3" data-testid="hero-ctas">
            <a href="#growth-audit" className="btn-primary" onClick={(e) => scrollToSection(e, 'growth-audit')} data-testid="primary-cta">
              Get a free growth audit <ArrowRight size={20} />
            </a>
            <a href="#approach" className="btn-secondary" onClick={(e) => scrollToSection(e, 'approach')} data-testid="secondary-cta">
              See how we think
            </a>
          </div>
          <div className="label hero-label hero-label-bottom reveal reveal-delay-4" data-testid="hero-label-bottom">MAKE IT COUNT.</div>
        </div>
        <div className="hero-image-wrap reveal reveal-delay-2" data-testid="hero-image-wrap">
          <img src="/images/hero.jpg" alt="Small business owner working at their desk in a craft workshop" className="hero-image" data-testid="hero-image" />
          <div className="label hero-label hero-label-image" data-testid="hero-label-image">STRATEGY FIRST</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
